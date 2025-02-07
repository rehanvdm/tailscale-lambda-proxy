import * as http from 'http';
import * as https from 'https';
import { Metrics, MetricUnit } from '@aws-lambda-powertools/metrics';
import {
  APIGatewayProxyEventV2, APIGatewayProxyResultV2,
} from 'aws-lambda';
import { SocksProxyAgent } from 'socks-proxy-agent';

async function proxyHttpRequest(
  target: Pick<http.RequestOptions, 'hostname' | 'port'>,
  isHttps: boolean | undefined,
  request: {
    path: string;
    method: string;
    headers: Record<string, string>;
    body: string | undefined;
  },
): Promise<APIGatewayProxyResultV2> {

  async function requestPromise(): Promise<APIGatewayProxyResultV2> {
    const socksProxyAgent = new SocksProxyAgent('socks://localhost:1055');
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      const httpLib = isHttps == undefined ?
        (target.port == 443 ? https : http) :
        (isHttps ? https : http);
      const apiRequest = httpLib.request({
        ...target,
        agent: socksProxyAgent,
        path: request.path,
        method: request.method,
        headers: request.headers,
      }, (res: http.IncomingMessage) => {
        res.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });
        res.on('end', () => {
          const responseBody = Buffer.concat(chunks);
          resolve({
            statusCode: res.statusCode || 500,
            headers: res.headers as Record<string, string>,
            body: responseBody.toString('base64'),
            isBase64Encoded: true,
          });
        });
        res.on('error', (error: Error): void => {
          console.error('Error receiving response:', error);
          reject(error);
        });
      });

      apiRequest.on('error', (error: Error): void => {
        console.error('Error sending request:', error);
        reject(error);
      });

      if (request.body != null) {
        apiRequest.write(request.body);
      }
      apiRequest.end();
    });
  }


  const connectionRetryDelays = [10, 50, 100, 500, 1000, 2000, 3000];
  let attempt = 0;
  let success = false;
  let response: APIGatewayProxyResultV2;

  do {
    try {
      response = await requestPromise();
      success = true;
    } catch (error) {
      if (error == 'Error: Socks5 proxy rejected connection - Failure' && attempt < connectionRetryDelays.length) {
        console.error('Error: Socks5 proxy rejected connection - Failure');
        console.log('Retrying in', connectionRetryDelays[attempt], 'ms');
        await new Promise((resolve) => setTimeout(resolve, connectionRetryDelays[attempt]));
        attempt++;
      } else {
        throw error;
      }
    }
  } while (!success && attempt < connectionRetryDelays.length);

  if (attempt > 0) {
    console.log('Error: Socks5 proxy rejected connection - Failure - RESOLVED - attempt:', attempt, 'total delay time:', connectionRetryDelays.slice(0, attempt).reduce((a, b) => a + b, 0));
  }

  return response!;
}

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  let metrics: Metrics | undefined;
  try {
    let isHttps = undefined; // Auto-detect, will be set for port 443
    if (!event.headers['ts-target-ip']) {
      return {
        statusCode: 400,
        headers: {
          'ts-error': "Missing header 'ts-target-ip'",
        },
      };
    }
    if (!event.headers['ts-target-port']) {
      return {
        statusCode: 400,
        headers: {
          'ts-error': "Missing header 'ts-target-port'",
        },
      };
    }
    if (event.headers['ts-https']) {
      isHttps = event.headers['ts-https'] === 'true';
    }
    if (event.headers['ts-metric-service']) {
      metrics = new Metrics({ namespace: 'tailscale-service', serviceName: event.headers['ts-metric-service'] });
      if (event.headers['ts-metric-dimension-name'] && event.headers['ts-metric-dimension-value']) {
        metrics.addDimensions({
          [event.headers['ts-metric-dimension-name']]: event.headers['ts-metric-dimension-value'],
        });
      }
    }

    const targetHeaders = { ...event.headers } as Record<string, string>;
    delete targetHeaders['ts-target-ip'];
    delete targetHeaders['ts-target-port'];
    if (targetHeaders['ts-metric-service']) {delete targetHeaders['ts-metric-service'];}
    if (targetHeaders['ts-metric-dimension-name']) {delete targetHeaders['ts-metric-dimension-name'];}
    if (targetHeaders['ts-metric-dimension-value']) {delete targetHeaders['ts-metric-dimension-value'];}

    const response = await proxyHttpRequest({
      hostname: event.headers['ts-target-ip'],
      port: event.headers['ts-target-port'],
    }, isHttps,
    {
      path: event.requestContext.http.path,
      headers: targetHeaders,
      method: event.requestContext.http.method,
      body: event.body,
    });

    metrics?.addMetric('success', MetricUnit.Count, 1);
    return response;
  } catch (_err) {
    metrics?.addMetric('error', MetricUnit.Count, 1);
    const err = _err as Error;
    return {
      statusCode: 500,
      headers: {
        'ts-error-name': err.name,
        'ts-error-message': err.message,
      },
    };
  } finally {
    metrics?.publishStoredMetrics();
  }
}