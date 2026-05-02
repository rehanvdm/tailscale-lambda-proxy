# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### TailscaleLambdaProxy <a name="TailscaleLambdaProxy" id="tailscale-lambda-proxy.TailscaleLambdaProxy"></a>

#### Initializers <a name="Initializers" id="tailscale-lambda-proxy.TailscaleLambdaProxy.Initializer"></a>

```typescript
import { TailscaleLambdaProxy } from 'tailscale-lambda-proxy'

new TailscaleLambdaProxy(scope: Construct, id: string, props: TailscaleLambdaProxyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxy.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxy.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxy.Initializer.parameter.props">props</a></code> | <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyProps">TailscaleLambdaProxyProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="tailscale-lambda-proxy.TailscaleLambdaProxy.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="tailscale-lambda-proxy.TailscaleLambdaProxy.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="tailscale-lambda-proxy.TailscaleLambdaProxy.Initializer.parameter.props"></a>

- *Type:* <a href="#tailscale-lambda-proxy.TailscaleLambdaProxyProps">TailscaleLambdaProxyProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxy.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxy.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="tailscale-lambda-proxy.TailscaleLambdaProxy.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="tailscale-lambda-proxy.TailscaleLambdaProxy.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="tailscale-lambda-proxy.TailscaleLambdaProxy.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxy.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="tailscale-lambda-proxy.TailscaleLambdaProxy.isConstruct"></a>

```typescript
import { TailscaleLambdaProxy } from 'tailscale-lambda-proxy'

TailscaleLambdaProxy.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="tailscale-lambda-proxy.TailscaleLambdaProxy.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxy.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxy.property.extension">extension</a></code> | <code>tailscale-lambda-extension.TailscaleLambdaExtension</code> | *No description.* |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxy.property.lambda">lambda</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.NodejsFunction</code> | *No description.* |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxy.property.lambdaFunctionUrl">lambdaFunctionUrl</a></code> | <code>aws-cdk-lib.aws_lambda.FunctionUrl</code> | *No description.* |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxy.property.warmer">warmer</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.NodejsFunction</code> | *No description.* |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxy.property.warmerRule">warmerRule</a></code> | <code>aws-cdk-lib.aws_events.Rule</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="tailscale-lambda-proxy.TailscaleLambdaProxy.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `extension`<sup>Required</sup> <a name="extension" id="tailscale-lambda-proxy.TailscaleLambdaProxy.property.extension"></a>

```typescript
public readonly extension: TailscaleLambdaExtension;
```

- *Type:* tailscale-lambda-extension.TailscaleLambdaExtension

---

##### `lambda`<sup>Required</sup> <a name="lambda" id="tailscale-lambda-proxy.TailscaleLambdaProxy.property.lambda"></a>

```typescript
public readonly lambda: NodejsFunction;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---

##### `lambdaFunctionUrl`<sup>Required</sup> <a name="lambdaFunctionUrl" id="tailscale-lambda-proxy.TailscaleLambdaProxy.property.lambdaFunctionUrl"></a>

```typescript
public readonly lambdaFunctionUrl: FunctionUrl;
```

- *Type:* aws-cdk-lib.aws_lambda.FunctionUrl

---

##### `warmer`<sup>Optional</sup> <a name="warmer" id="tailscale-lambda-proxy.TailscaleLambdaProxy.property.warmer"></a>

```typescript
public readonly warmer: NodejsFunction;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---

##### `warmerRule`<sup>Optional</sup> <a name="warmerRule" id="tailscale-lambda-proxy.TailscaleLambdaProxy.property.warmerRule"></a>

```typescript
public readonly warmerRule: Rule;
```

- *Type:* aws-cdk-lib.aws_events.Rule

---


## Structs <a name="Structs" id="Structs"></a>

### TailscaleLambdaProxyProps <a name="TailscaleLambdaProxyProps" id="tailscale-lambda-proxy.TailscaleLambdaProxyProps"></a>

#### Initializer <a name="Initializer" id="tailscale-lambda-proxy.TailscaleLambdaProxyProps.Initializer"></a>

```typescript
import { TailscaleLambdaProxyProps } from 'tailscale-lambda-proxy'

const tailscaleLambdaProxyProps: TailscaleLambdaProxyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsHostname">tsHostname</a></code> | <code>string</code> | The "Machine" name as shown in the Tailscale admin console that identifies the Lambda function. |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsSecretApiKey">tsSecretApiKey</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | The name of the AWS Secrets Manager secret that contains the pure text Tailscale API Key. |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.debug">debug</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.options">options</a></code> | <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions">TailscaleLambdaProxyPropsOptions</a></code> | *No description.* |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsAdvertiseTags">tsAdvertiseTags</a></code> | <code>string</code> | Passed as `--advertise-tags` to `tailscale up`. |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsExitNode">tsExitNode</a></code> | <code>string</code> | Passed as `--exit-node` to `tailscale up`. |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsExitNodePingRetries">tsExitNodePingRetries</a></code> | <code>number</code> | Number of ping attempts before giving up on the exit node reachability check. |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsExitNodePingTimeout">tsExitNodePingTimeout</a></code> | <code>number</code> | Per-attempt timeout in milliseconds for the exit node reachability ping. |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsExitNodeRequired">tsExitNodeRequired</a></code> | <code>boolean</code> | When `true`, the extension aborts (fail-closed) if the exit node is not reachable within the timeout. |

---

##### `tsHostname`<sup>Required</sup> <a name="tsHostname" id="tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsHostname"></a>

```typescript
public readonly tsHostname: string;
```

- *Type:* string

The "Machine" name as shown in the Tailscale admin console that identifies the Lambda function.

---

##### `tsSecretApiKey`<sup>Required</sup> <a name="tsSecretApiKey" id="tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsSecretApiKey"></a>

```typescript
public readonly tsSecretApiKey: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

The name of the AWS Secrets Manager secret that contains the pure text Tailscale API Key.

---

##### `debug`<sup>Optional</sup> <a name="debug" id="tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.debug"></a>

```typescript
public readonly debug: boolean;
```

- *Type:* boolean

---

##### `options`<sup>Optional</sup> <a name="options" id="tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.options"></a>

```typescript
public readonly options: TailscaleLambdaProxyPropsOptions;
```

- *Type:* <a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions">TailscaleLambdaProxyPropsOptions</a>

---

##### `tsAdvertiseTags`<sup>Optional</sup> <a name="tsAdvertiseTags" id="tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsAdvertiseTags"></a>

```typescript
public readonly tsAdvertiseTags: string;
```

- *Type:* string

Passed as `--advertise-tags` to `tailscale up`.

Required when using OAuth client keys (no expiry).
Example: `tag:lambda`

---

##### `tsExitNode`<sup>Optional</sup> <a name="tsExitNode" id="tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsExitNode"></a>

```typescript
public readonly tsExitNode: string;
```

- *Type:* string

Passed as `--exit-node` to `tailscale up`.

Routes all internet-bound Lambda traffic through the
specified exit node (Tailscale IP or hostname). Example: `100.x.y.z`

---

##### `tsExitNodePingRetries`<sup>Optional</sup> <a name="tsExitNodePingRetries" id="tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsExitNodePingRetries"></a>

```typescript
public readonly tsExitNodePingRetries: number;
```

- *Type:* number
- *Default:* 10

Number of ping attempts before giving up on the exit node reachability check.

---

##### `tsExitNodePingTimeout`<sup>Optional</sup> <a name="tsExitNodePingTimeout" id="tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsExitNodePingTimeout"></a>

```typescript
public readonly tsExitNodePingTimeout: number;
```

- *Type:* number
- *Default:* 2000

Per-attempt timeout in milliseconds for the exit node reachability ping.

---

##### `tsExitNodeRequired`<sup>Optional</sup> <a name="tsExitNodeRequired" id="tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsExitNodeRequired"></a>

```typescript
public readonly tsExitNodeRequired: boolean;
```

- *Type:* boolean
- *Default:* false

When `true`, the extension aborts (fail-closed) if the exit node is not reachable within the timeout.

When `false` / unset, it logs a warning and continues (fail-open).

---

### TailscaleLambdaProxyPropsLambdaOption <a name="TailscaleLambdaProxyPropsLambdaOption" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsLambdaOption"></a>

#### Initializer <a name="Initializer" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsLambdaOption.Initializer"></a>

```typescript
import { TailscaleLambdaProxyPropsLambdaOption } from 'tailscale-lambda-proxy'

const tailscaleLambdaProxyPropsLambdaOption: TailscaleLambdaProxyPropsLambdaOption = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsLambdaOption.property.functionName">functionName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsLambdaOption.property.nodeTlsRejectUnauthorized">nodeTlsRejectUnauthorized</a></code> | <code>boolean</code> | *No description.* |

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsLambdaOption.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

---

##### `nodeTlsRejectUnauthorized`<sup>Optional</sup> <a name="nodeTlsRejectUnauthorized" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsLambdaOption.property.nodeTlsRejectUnauthorized"></a>

```typescript
public readonly nodeTlsRejectUnauthorized: boolean;
```

- *Type:* boolean

---

### TailscaleLambdaProxyPropsOptions <a name="TailscaleLambdaProxyPropsOptions" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions"></a>

#### Initializer <a name="Initializer" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions.Initializer"></a>

```typescript
import { TailscaleLambdaProxyPropsOptions } from 'tailscale-lambda-proxy'

const tailscaleLambdaProxyPropsOptions: TailscaleLambdaProxyPropsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions.property.extension">extension</a></code> | <code>aws-cdk-lib.aws_lambda.LayerVersionOptions</code> | *No description.* |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions.property.lambda">lambda</a></code> | <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsLambdaOption">TailscaleLambdaProxyPropsLambdaOption</a></code> | *No description.* |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions.property.warmer">warmer</a></code> | <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsWarmerOption">TailscaleLambdaProxyPropsWarmerOption</a></code> | If provided, a separate Lambda function will be created to periodically invoke the Tailscale proxy Lambda function to keep it warm. |

---

##### `extension`<sup>Optional</sup> <a name="extension" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions.property.extension"></a>

```typescript
public readonly extension: LayerVersionOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.LayerVersionOptions

---

##### `lambda`<sup>Optional</sup> <a name="lambda" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions.property.lambda"></a>

```typescript
public readonly lambda: TailscaleLambdaProxyPropsLambdaOption;
```

- *Type:* <a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsLambdaOption">TailscaleLambdaProxyPropsLambdaOption</a>

---

##### `warmer`<sup>Optional</sup> <a name="warmer" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions.property.warmer"></a>

```typescript
public readonly warmer: TailscaleLambdaProxyPropsWarmerOption;
```

- *Type:* <a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsWarmerOption">TailscaleLambdaProxyPropsWarmerOption</a>

If provided, a separate Lambda function will be created to periodically invoke the Tailscale proxy Lambda function to keep it warm.

---

### TailscaleLambdaProxyPropsWarmerOption <a name="TailscaleLambdaProxyPropsWarmerOption" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsWarmerOption"></a>

#### Initializer <a name="Initializer" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsWarmerOption.Initializer"></a>

```typescript
import { TailscaleLambdaProxyPropsWarmerOption } from 'tailscale-lambda-proxy'

const tailscaleLambdaProxyPropsWarmerOption: TailscaleLambdaProxyPropsWarmerOption = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsWarmerOption.property.concurrentInvocations">concurrentInvocations</a></code> | <code>number</code> | *No description.* |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsWarmerOption.property.functionName">functionName</a></code> | <code>string</code> | *No description.* |

---

##### `concurrentInvocations`<sup>Optional</sup> <a name="concurrentInvocations" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsWarmerOption.property.concurrentInvocations"></a>

```typescript
public readonly concurrentInvocations: number;
```

- *Type:* number

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsWarmerOption.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

---



