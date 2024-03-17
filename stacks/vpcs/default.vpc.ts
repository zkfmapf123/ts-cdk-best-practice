import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { VPC_OPTION } from '../../base/enum'
import { IStackVPC, IStacks, IVPC } from '../../base/interface'
import { BaseStack, BaseStackParmas } from '../../base/stack/base.stack'

interface Props extends BaseStackParmas, IStackVPC {}

export class DefaultVPC extends BaseStack<Props> implements IStacks<Props, cdk.aws_ec2.Vpc>, IVPC {
  constructor(scope: Construct, props: Props) {
    super(scope, props)

    const vpc = this.createResource(props)

    this.setTagsMapping(props.tags)
      .setOutputs({
        vpcId: {
          value: vpc.vpcId,
          description: 'vpc Id',
          exportName: `${this.getName(props)}:vpcId`,
        },
      })
      .finish()
  }

  createResource(props: Props): cdk.aws_ec2.Vpc {
    const { cidr, maxAzs, isExistNAT } = props

    return new cdk.aws_ec2.Vpc(this, this.getName(props), {
      vpcName: this.getName(props),
      cidr,
      maxAzs: this.withMaxAzs(maxAzs),
      natGateways: isExistNAT ? 1 : 0,
      enableDnsHostnames: true,
      enableDnsSupport: true,
      subnetConfiguration: [
        {
          cidrMask: VPC_OPTION.SUBNET_DEFAULT_CIDR,
          subnetType: cdk.aws_ec2.SubnetType.PUBLIC,
          name: 'public',
        },
        {
          cidrMask: VPC_OPTION.SUBNET_DEFAULT_CIDR,
          subnetType: isExistNAT ? cdk.aws_ec2.SubnetType.PRIVATE_WITH_EGRESS : cdk.aws_ec2.SubnetType.PRIVATE_ISOLATED,
          name: 'private',
        },
      ],
    })
  }

  withMaxAzs(azs: number): number {
    if (azs < VPC_OPTION.AZ_MIN) return VPC_OPTION.AZ_MIN
    if (azs > VPC_OPTION.AZ_MAX) return VPC_OPTION.AZ_MAX
    return azs
  }
}
