import { Metrics, MetricUnit } from '@aws-lambda-powertools/metrics';
import {
  APIGatewayProxyEventV2, APIGatewayProxyResultV2,
} from 'aws-lambda';
import { proxyHttpRequest } from './proxy-http-request';
import { WarmerPayload } from '../proxy-warmer';

const AWS_SPECIFIC_HEADERS = [
  'authorization',
  'x-amz-date',
  'host',
  'x-amz-content-sha256',
];

export function logError(...args: any[]) {
  console.error('[tailscale-proxy] ERROR', ...args);
}
export function logInfo(...args: any[]) {
  console.log('[tailscale-proxy] INFO', ...args);
}
export function logDebug(...args: any[]) {
  if (process.env.DEBUG) {
    console.log('[tailscale-proxy] DEBUG', ...args);
  }
}

export async function handler(event: APIGatewayProxyEventV2 | WarmerPayload): Promise<APIGatewayProxyResultV2 | any> {

  if ('warmer' in event) {
    logDebug(`Warmer invocation detected (index: ${event.warmerIndex}, timestamp: ${event.warmerTimestamp})`);
    return { success: true };
  }

  logDebug('Event:', JSON.stringify(event, null, 2));
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

    // Create target headers by filtering out AWS-specific and ts-* headers
    const targetHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(event.headers)) {
      if (!key.startsWith('ts-') && !AWS_SPECIFIC_HEADERS.includes(key.toLowerCase())) {
        targetHeaders[key] = value as string;
      }
    }

    // Handle AWS SigV4 header replacements if they exist
    if (event.headers['ts-authorization']) {
      targetHeaders.Authorization = event.headers['ts-authorization'] as string;
    }
    if (event.headers['ts-x-amz-date']) {
      targetHeaders['x-amz-date'] = event.headers['ts-x-amz-date'] as string;
    }
    if (event.headers['ts-host']) {
      targetHeaders.host = event.headers['ts-host'] as string;
    }
    if (event.headers['ts-x-amz-content-sha256']) {
      targetHeaders['x-amz-content-sha256'] = event.headers['ts-x-amz-content-sha256'] as string;
    }

    const body = event.body
      ? (event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf-8') : event.body)
      : undefined;
    const response = await proxyHttpRequest({
      hostname: event.headers['ts-target-ip'],
      port: event.headers['ts-target-port'],
    }, isHttps,
    {
      path: event.requestContext.http.path,
      headers: targetHeaders,
      method: event.requestContext.http.method,
      body: body,
    });

    metrics?.addMetric('success', MetricUnit.Count, 1);

    logDebug('Response', JSON.stringify(response, null, 2));
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