import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { FunctionUrl } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { TailscaleLambdaExtension } from 'tailscale-lambda-extension';

export interface TailscaleLambdaProxyPropsLambdaOption {
  readonly functionName?: string;
  readonly nodeTlsRejectUnauthorized?: boolean;
}

export interface TailscaleLambdaProxyPropsWarmerOption {
  readonly functionName?: string;
  readonly concurrentInvocations?: number;
}

export interface TailscaleLambdaProxyPropsOptions {
  readonly extension?: lambda.LayerVersionOptions;
  readonly lambda?: TailscaleLambdaProxyPropsLambdaOption;

  /**
   * If provided, a separate Lambda function will be created to periodically invoke the Tailscale proxy Lambda
   * function to keep it warm.
   */
  readonly warmer?: TailscaleLambdaProxyPropsWarmerOption;
}

export interface TailscaleLambdaProxyProps {
  /**
   * The name of the AWS Secrets Manager secret that contains the pure text Tailscale API Key.
   */
  readonly tsSecretApiKey: secretsmanager.ISecret;

  /**
   * The "Machine" name as shown in the Tailscale admin console that identifies the Lambda function.
   */
  readonly tsHostname: string;

  readonly options?: TailscaleLambdaProxyPropsOptions;

  readonly debug?: boolean;
}

export class TailscaleLambdaProxy extends Construct {
  public readonly extension: TailscaleLambdaExtension;
  public readonly lambda: NodejsFunction;
  public readonly lambdaFunctionUrl: FunctionUrl;
  public readonly warmer?: NodejsFunction;
  public readonly warmerRule?: events.Rule;

  constructor(scope: Construct, id: string, props: TailscaleLambdaProxyProps) {
    super(scope, id);

    this.extension = new TailscaleLambdaExtension(scope, 'tailscale-proxy-extension', {
      options: props.options?.extension,
    });

    this.lambda = new NodejsFunction(this, 'tailscale-proxy-lambda', {
      ...props.options?.lambda,
      runtime: lambda.Runtime.NODEJS_22_X,
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda/tailscale-proxy')),
      handler: 'index.handler',
      layers: [this.extension.layer],
      environment: {
        TS_SECRET_API_KEY: props.tsSecretApiKey.secretArn,
        TS_HOSTNAME: props.tsHostname,
        ...(props?.debug) ? { DEBUG: 'true' } : { },
        ...(props.options?.lambda?.nodeTlsRejectUnauthorized === false) ? { NODE_TLS_REJECT_UNAUTHORIZED: '0' } : {},
      },
      timeout: cdk.Duration.minutes(15),
      memorySize: 256,
    });
    props.tsSecretApiKey.grantRead(this.lambda);

    this.lambdaFunctionUrl = this.lambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.AWS_IAM,
    });

    if (props.options?.warmer) {
      const concurrentInvocations = props.options.warmer.concurrentInvocations ?? 3;

      this.warmer = new NodejsFunction(this, 'proxy-warmer-lambda', {
        functionName: props.options.warmer.functionName,
        runtime: lambda.Runtime.NODEJS_22_X,
        code: lambda.Code.fromAsset(path.join(__dirname, 'lambda/proxy-warmer')),
        handler: 'index.handler',
        environment: {
          ...(props?.debug) ? { DEBUG: 'true' } : { },
          TARGET_FUNCTION_NAME: this.lambda.functionName,
          CONCURRENT_INVOCATIONS: concurrentInvocations.toString(),
        },
        timeout: cdk.Duration.minutes(1),
        memorySize: 128,
        retryAttempts: 1,
      });

      this.lambda.grantInvoke(this.warmer);

      this.warmerRule = new events.Rule(this, 'proxy-warmer-rule', {
        schedule: events.Schedule.rate(cdk.Duration.minutes(5)),
      });
      this.warmerRule.addTarget(new targets.LambdaFunction(this.warmer, {
        event: events.RuleTargetInput.fromObject({
          targetFunctionName: this.lambda.functionName,
          concurrentInvocations: concurrentInvocations,
        }),
      }));
    }
  }
}