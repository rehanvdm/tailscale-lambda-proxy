import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { FunctionUrl } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { TailscaleLambdaExtension, TailscaleLambdaExtensionProps } from 'tailscale-lambda-extension';

export interface LambdaOptions {
  readonly functionName?: string;
}

export interface TailscaleLambdaProxyPropsOptions {
  readonly extension: TailscaleLambdaExtensionProps; //TODO make optional
  readonly lambda: LambdaOptions;
}

export interface TailscaleLambdaProxyProps {
  /**
   * The name of the AWS Secrets Manager secret that contains the pure text Tailscale API Key.
   */
  readonly tsSecretApiKey: secretsmanager.Secret;

  /**
   * The "Machine" name as shown in the Tailscale admin console that identifies the Lambda function.
   */
  readonly tsHostname: string;

  readonly options: TailscaleLambdaProxyPropsOptions;
}

export class TailscaleLambdaProxy extends Construct {
  public readonly extension: TailscaleLambdaExtension;
  public readonly lambda: NodejsFunction;
  public readonly lambdaFunctionUrl: FunctionUrl;

  constructor(scope: Construct, id: string, props: TailscaleLambdaProxyProps) {
    super(scope, id);

    this.extension = new TailscaleLambdaExtension(scope, 'tailscale-extension', props.options.extension);

    this.lambda = new NodejsFunction(this, 'tailscale-proxy-lambda', {
      ...props.options.lambda,
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: 'src/lambda/tailscale-proxy/index.ts',
      layers: [this.extension.layer],
      environment: {
        TS_SECRET_API_KEY: props.tsSecretApiKey.secretArn,
        TS_HOSTNAME: props.tsHostname,
      },
      timeout: cdk.Duration.minutes(15),
      memorySize: 256,
    });
    props.tsSecretApiKey.grantRead(this.lambda);

    this.lambdaFunctionUrl = this.lambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.AWS_IAM,
    });
  }
}