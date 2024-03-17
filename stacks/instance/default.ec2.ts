import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { IStacks } from '../../base/interface'
import { BaseStack, BaseStackParmas } from '../../base/stack/base.stack'

interface Props extends BaseStackParmas {}

export class DefaultEC2 extends BaseStack<Props> implements IStacks<Props, cdk.aws_ec2.Instance> {
  constructor(scope: Construct, props: Props) {
    super(scope, props)
  }

  createResource(props: Props): cdk.aws_ec2.Instance {
    throw new Error('Method not implemented.')
  }
}
