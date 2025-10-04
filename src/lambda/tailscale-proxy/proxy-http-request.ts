import * as http from 'http';
import * as https from 'https';
import { APIGatewayProxyResultV2 } from 'aws-lambda';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { logDebug, logInfo, logError } from './index';

export async function proxyHttpRequest(
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
    logDebug('proxyHttpRequest', JSON.stringify({ target, isHttps, request }, null, 2));
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
          logDebug('requestPromise.end responseBody', responseBody);
          resolve({
            statusCode: res.statusCode || 500,
            headers: res.headers as Record<string, string>,
            body: responseBody.toString('base64'),
            isBase64Encoded: true,
          });
        });
        res.on('error', (error: Error): void => {
          logError('Error receiving response:', error);
          reject(error);
        });
      });

      apiRequest.on('error', (error: Error): void => {
        logError('Error sending request:', error);
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
        logError('Error: Socks5 proxy rejected connection - Failure');
        logInfo('Retrying in', connectionRetryDelays[attempt], 'ms');
        await new Promise((resolve) => setTimeout(resolve, connectionRetryDelays[attempt]));
        attempt++;
      } else {
        throw error;
      }
    }
  } while (!success && attempt < connectionRetryDelays.length);

  if (attempt > 0) {
    logInfo('Error: Socks5 proxy rejected connection - Failure - RESOLVED - attempt:', attempt, 'total delay time:', connectionRetryDelays.slice(0, attempt).reduce((a, b) => a + b, 0));
  }

  return response!;
}
