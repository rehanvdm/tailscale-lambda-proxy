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

---

##### `toString` <a name="toString" id="tailscale-lambda-proxy.TailscaleLambdaProxy.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxy.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="tailscale-lambda-proxy.TailscaleLambdaProxy.isConstruct"></a>

```typescript
import { TailscaleLambdaProxy } from 'tailscale-lambda-proxy'

TailscaleLambdaProxy.isConstruct(x: any)
```

Checks if `x` is a construct.

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


## Structs <a name="Structs" id="Structs"></a>

### LambdaOptions <a name="LambdaOptions" id="tailscale-lambda-proxy.LambdaOptions"></a>

#### Initializer <a name="Initializer" id="tailscale-lambda-proxy.LambdaOptions.Initializer"></a>

```typescript
import { LambdaOptions } from 'tailscale-lambda-proxy'

const lambdaOptions: LambdaOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#tailscale-lambda-proxy.LambdaOptions.property.functionName">functionName</a></code> | <code>string</code> | *No description.* |

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="tailscale-lambda-proxy.LambdaOptions.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

---

### TailscaleLambdaProxyProps <a name="TailscaleLambdaProxyProps" id="tailscale-lambda-proxy.TailscaleLambdaProxyProps"></a>

#### Initializer <a name="Initializer" id="tailscale-lambda-proxy.TailscaleLambdaProxyProps.Initializer"></a>

```typescript
import { TailscaleLambdaProxyProps } from 'tailscale-lambda-proxy'

const tailscaleLambdaProxyProps: TailscaleLambdaProxyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.options">options</a></code> | <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions">TailscaleLambdaProxyPropsOptions</a></code> | *No description.* |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsHostname">tsHostname</a></code> | <code>string</code> | The "Machine" name as shown in the Tailscale admin console that identifies the Lambda function. |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.tsSecretApiKey">tsSecretApiKey</a></code> | <code>aws-cdk-lib.aws_secretsmanager.Secret</code> | The name of the AWS Secrets Manager secret that contains the pure text Tailscale API Key. |

---

##### `options`<sup>Required</sup> <a name="options" id="tailscale-lambda-proxy.TailscaleLambdaProxyProps.property.options"></a>

```typescript
public readonly options: TailscaleLambdaProxyPropsOptions;
```

- *Type:* <a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions">TailscaleLambdaProxyPropsOptions</a>

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
public readonly tsSecretApiKey: Secret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.Secret

The name of the AWS Secrets Manager secret that contains the pure text Tailscale API Key.

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
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions.property.extension">extension</a></code> | <code>tailscale-lambda-extension.TailscaleLambdaExtensionProps</code> | *No description.* |
| <code><a href="#tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions.property.lambda">lambda</a></code> | <code><a href="#tailscale-lambda-proxy.LambdaOptions">LambdaOptions</a></code> | *No description.* |

---

##### `extension`<sup>Required</sup> <a name="extension" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions.property.extension"></a>

```typescript
public readonly extension: TailscaleLambdaExtensionProps;
```

- *Type:* tailscale-lambda-extension.TailscaleLambdaExtensionProps

---

##### `lambda`<sup>Required</sup> <a name="lambda" id="tailscale-lambda-proxy.TailscaleLambdaProxyPropsOptions.property.lambda"></a>

```typescript
public readonly lambda: LambdaOptions;
```

- *Type:* <a href="#tailscale-lambda-proxy.LambdaOptions">LambdaOptions</a>

---



