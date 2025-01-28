# Tailscale Lambda Extension Proxy

[![npm version](https://badge.fury.io/js/tailscale-lambda-proxy.svg)](https://badge.fury.io/js/tailscale-lambda-proxy)
[![PyPI version](https://badge.fury.io/py/tailscale-lambda-proxy.svg)](https://badge.fury.io/py/tailscale-lambda-proxy)

A CDK construct that creates an AWS Lambda Function that acts as a proxy to your Tailscale network.

Available in CDK as a TypeScript NPM Package and Python PyPi Package:
- [TypeScript NPM Package](https://www.npmjs.com/package/tailscale-lambda-proxy)
- [Python PyPi Package](https://pypi.org/project/tailscale-lambda-proxy/)

## Why use a proxy? 

The Proxy Lambda uses the [Tailscale Lambda Extension](https://github.com/rehanvdm/tailscale-lambda-extension) CDK 
construct. 

It is recommended to use the Proxy Lambda to simplify connecting to your Tailscale network and reduces cold starts
by reusing the same Lambda function for all your Tailscale connected traffic.

Use the extension directly if:
- You only have **a single Lambda**/service that needs to connect to your Tailscale network.
- You are okay with accepting that this Lambda will have mixed responsibilities (i.e. connecting to Tailscale and your 
  business logic).

Use the Proxy Lambda (recommended) construct if:
- You have **multiple Lambdas**/services that need to connect to your Tailscale network. The proxy Lambda will 
  effectively create a "pool" of warm connections to your Tailscale network, ready to be used by any other Lambda 
  that calls it.
- You want to separate concerns and have a dedicated Lambda function that only connects to your Tailscale network.
- Authentication to your Tailscale network (through the proxy) is then moved to an IAM level. Access is granted to
  the Proxy Lambda Function URL (FURL), and not to the Tailscale API Secret Manager directly.

## Usage

> [!TIP]  
> See the complete example in the [tailscale-lambda-proxy-example](https://github.com/rehanvdm/tailscale-lambda-proxy-example)
> repository.

Install the package:
```bash
npm install tailscale-lambda-proxy
```

The Lambda Proxy requires the following:
- `tsSecretApiKey` - The AWS Secrets Manager secret that contains the pure text Tailscale API Key.
- `tsHostname` - The "Machine" name as shown in the Tailscale admin console that identifies this Lambda(s) function.

```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { TailscaleLambdaProxy } from "tailscale-lambda-proxy";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";

export class MyStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const tailscaleProxy = new TailscaleLambdaProxy(this, "tailscale-proxy", {
      tsSecretApiKey: secretsmanager.Secret.fromSecretNameV2(this, "tailscale-api-key", "tailscale-api-key"),
      tsHostname: "lambda-test",
      // // Optional configuration
      // options: {
      //   extension: {
      //     layerVersionName: "tailscale-extension",
      //   },
      //   lambda: {
      //     functionName: "tailscale-proxy",
      //   }
      // }
    });

    const caller = new NodejsFunction(this, "tailscale-caller", {
      functionName: "tailscale-caller",
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(30),
      entry: "lib/lambda/tailscale-caller/index.ts",
      environment: {
        TS_PROXY_URL: tailscaleProxy.lambdaFunctionUrl.url,
      }
    });
    tailscaleProxy.lambdaFunctionUrl.grantInvokeUrl(caller); // Important! Allow the caller to invoke the proxy
    
  }
  
}
```

## Accessing your Tailscale Network through the Proxy

The code below can be found in the
[tailscale-lambda-proxy-example](https://github.com/rehanvdm/tailscale-lambda-proxy-example) repository.

**The Tailscale Lambda Proxy is transparent**. It does not modify the request or response that is sent to the machine in 
any way. It simply forwards the request (path, method, headers, and body) to the machine and returns the response.

There are 2 important components when interacting with the Tailscale Lambda Proxy:
1. All requests must be signed with the IAM Signature V4 algorithm.
2. The IP address and port of your Tailscale connected machine/device should be placed in the 
   headers when making the call to the proxy.

### Signing Requests

The Lambda Proxy exposes a Function URL secured with IAM Authentication. The caller Lambda only needs this URL and IAM
permissions to call it. Then it needs to sign all requests with the IAM Signature V4 algorithm. For Typescript users, 
you can use the [aws4](https://www.npmjs.com/package/aws4) package to sign requests.

### Including the correct headers

When making a request to the Proxy, you need to include the IP address and port of the Tailscale connected machine/device
that you are targeting in the headers.

The `ts-` headers below will be removed before forwarding the request to the Tailscale machine/device, they are only 
used for routing and internal logic to the proxy. 

- `ts-target-ip` - The IP address of the Tailscale connected machine/device.
- `ts-target-port` - The port of the Tailscale connected machine/device.

### Create CloudWatch Tracking Metrics

These metrics are optional and are used to track the success and failure of requests made through the proxy.
 
To enable the optional tracking metrics, you can include the following headers as well:
- `ts-metric-service` - The name of the service or API making the request.
- `ts-metric-dimension-name` - The name of the dimension to track (e.g., client name).
- `ts-metric-dimension-value` - The value associated with the dimension.

For each request, one of the following CloudWatch metrics is created:
- `success`: Recorded when the request is successfully delivered to the target server. Note that this does not depend on
  the HTTP status code of the API response.
- `failure`: Recorded when the request fails to reach the target server. Possible reasons include network issues or the
  target server being unavailable.

Here is an example of headers for a request:
- `ts-metric-service`: `gallagher` the name of the calling service or API being targeted.
- `ts-metric-dimension-name`: `client` tracks the client name to be used for monitoring or alerts.
- `ts-metric-dimension-value`: `rehan-test-client` the specific client name.

This setup generates a CloudWatch metric similar to the one below:  
![tailscale-cloudwatch-metric.png](_imgs/tailscale-cloudwatch-metric.png)

### Error Handling

In efforts to keep the Proxy Lambda transparent, all traffic, including errors are passed back to the caller. This makes
it difficult to determine if the error was due to the Proxy Lambda or if it originated from the Tailscale connected
machine/device. 

A Lambda Proxy error can be identified by the presence of the following response headers:
- `ts-error-name` - The name of the error.
- `ts-error-message` - The error message.

## Additional Information

See the [Tailscale Lambda Extension](https://github.com/rehanvdm/tailscale-lambda-extension) for more information on:
- How to configure Tailscale
- Limitations like cold start times, package sizes and the lack of DNS resolution.
- Implementation Details