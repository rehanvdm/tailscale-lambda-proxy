import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { handler } from '../src/lambda/tailscale-proxy';
import * as proxyHttpRequest from '../src/lambda/tailscale-proxy/proxy-http-request';

function createMockSigv4InvocationEvent(ip: string, port: string, method: string, path: string, body?: string,
  headers?: Record<string, string>): APIGatewayProxyEventV2 {
  return {
    version: '2.0',
    routeKey: 'ANY /{proxy+}',
    rawPath: path,
    rawQueryString: '',
    headers: {
      'ts-target-ip': ip,
      'ts-target-port': port,
      ...headers,

      // Headers needed to call the Lamba with Sigv4
      'Authorization': 'AWS4-HMAC-SHA256 Credential=test/20240101/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-date, Signature=test',
      'x-amz-date': 'xxx',
      'host': 'xxx',
      'x-amz-content-sha256': 'xxx',
    },
    body: body,
    requestContext: {
      http: {
        method: method,
        path: path,
        protocol: 'HTTP/1.1',
        sourceIp: '127.0.0.1',
        userAgent: 'test-agent',
      },
      routeKey: 'ANY /{proxy+}',
      stage: '$default',
      requestId: 'test-request-id',
      accountId: 'test-account-id',
      apiId: 'test-api-id',
      domainName: 'test-domain',
      domainPrefix: 'test',
      time: '2024-01-01T00:00:00Z',
      timeEpoch: 1704067200000,
    },
    isBase64Encoded: false,
  };
}

describe('Authorization header handling', () => {

  it('no additional auth header to target', async () => {
    const event = createMockSigv4InvocationEvent(
      '192.168.0.1',
      '80',
      'GET',
      '/test/path',
      undefined,
      {
        extra: 'extra',
      },
    );

    const proxyHttpRequestResponse: APIGatewayProxyResultV2 = {
      statusCode: 200,
      headers: {},
      body: '',
      isBase64Encoded: false,
    };
    const proxyHttpRequestMock = jest.spyOn(proxyHttpRequest, 'proxyHttpRequest')
      .mockResolvedValue(proxyHttpRequestResponse);

    const response = await handler(event);
    // Proxy returns the exact same data as we get from the target
    expect(response).toEqual(proxyHttpRequestResponse);
    // Ensure we call with the target expected arguments
    expect(proxyHttpRequestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        hostname: '192.168.0.1',
        port: '80',
      }),
      undefined,
      expect.objectContaining({
        headers: {
          extra: 'extra',
        },
      }),
    );

    // Restore the original implementation
    jest.restoreAllMocks();
  });

  it('include auth header to target', async () => {
    const event = createMockSigv4InvocationEvent(
      '192.168.0.1',
      '80',
      'GET',
      '/test/path',
      undefined,
      {
        'ts-authorization': 'PASS THIS',
        'extra': 'extra',
      },
    );

    const proxyHttpRequestResponse: APIGatewayProxyResultV2 = {
      statusCode: 200,
      headers: {},
      body: '',
      isBase64Encoded: false,
    };
    const proxyHttpRequestMock = jest.spyOn(proxyHttpRequest, 'proxyHttpRequest')
      .mockResolvedValue(proxyHttpRequestResponse);

    const response = await handler(event);
    // Proxy returns the exact same data as we get from the target
    expect(response).toEqual(proxyHttpRequestResponse);
    // Ensure we call with the target expected arguments
    expect(proxyHttpRequestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        hostname: '192.168.0.1',
        port: '80',
      }),
      undefined,
      expect.objectContaining({
        headers: {
          Authorization: 'PASS THIS',
          extra: 'extra',
        },
      }),
    );

    // Restore the original implementation
    jest.restoreAllMocks();
  });
});
