import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Dictionary } from '../types'
import { oEntires } from '../utils'

export interface BaseStackParmas extends cdk.StackProps {
  projectName: string
  resourceName: string
  environments: string
  tags: Dictionary<string>
}

export class BaseStack<T extends BaseStackParmas> extends cdk.Stack {
  constructor(scope: Construct, props?: T) {
    super(scope, `${props?.projectName}-${props?.resourceName}-${props?.environments}`, props)
  }

  /**
   * @warn Do not Override
   */
  protected getName({ projectName, resourceName, environments }: T): string {
    return `${projectName}-${resourceName}-${environments}`
  }

  /**
   * @warn Do not Override
   */
  protected setTagsMapping(envs?: T['tags']): this {
    if (!envs || oEntires(envs).length === 0) return this
    oEntires(envs).forEach(([key, value]) => cdk.Tags.of(this).add(key, value))
    return this
  }

  /**
   * @warn Do not Override
   */
  protected setOutputs(
    value?: Dictionary<{
      value: string
      description: string
      exportName: string
    }>
  ): this {
    if (!value || oEntires(value).length === 0) return this

    oEntires(value).forEach(
      ([key, values]) =>
        new cdk.CfnOutput(this, key, {
          ...values,
        })
    )

    return this
  }

  protected finish(): void {}
}
