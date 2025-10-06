import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

const lambdaClient = new LambdaClient({});

export interface ProxyWarmerEvent {
  readonly targetFunctionName: string;
  readonly concurrentInvocations: number;
}

function logError(...args: any[]) {
  console.error('[tailscale-proxy] ERROR', ...args);
}
// function logInfo(...args: any[]) {
//   console.log('[tailscale-proxy] INFO', ...args);
// }
function logDebug(...args: any[]) {
  if (process.env.DEBUG) {
    console.log('[tailscale-proxy] DEBUG', ...args);
  }
}

export type WarmerPayload = {
  warmer: boolean;
  warmerIndex: number;
  warmerTimestamp: string;
};

export async function handler(event: ProxyWarmerEvent): Promise<void> {
  const { targetFunctionName, concurrentInvocations } = event;

  logDebug(`Starting ${concurrentInvocations} concurrent invocations of ${targetFunctionName}`);

  const invocations = Array.from({ length: concurrentInvocations }, (_, index) =>
    invokeTargetFunction(targetFunctionName, index),
  );

  try {
    await Promise.all(invocations);
    logDebug(`Successfully completed ${concurrentInvocations} concurrent invocations`);
  } catch (error) {
    console.error('Error during concurrent invocations:', error);
    throw error;
  }
}

async function invokeTargetFunction(functionName: string, index: number): Promise<void> {
  try {
    const payload: WarmerPayload = {
      warmer: true,
      warmerIndex: index,
      warmerTimestamp: new Date().toISOString(),
    };
    const response = await lambdaClient.send(new InvokeCommand({
      FunctionName: functionName,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(payload),
    }));

    if (response.FunctionError) {
      logError(`Function error for invocation ${index}:`, response.FunctionError);
      throw new Error(`Function error: ${response.FunctionError}`);
    }

    logDebug(`Successfully invoked ${functionName} (index: ${index})`);
  } catch (error) {
    logError(`Failed to invoke ${functionName} (index: ${index}):`, error);
    throw error;
  }
}
