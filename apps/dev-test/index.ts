import * as cdk from 'aws-cdk-lib'
import 'source-map-support/register'
import { DefaultVPC } from '../../stacks/vpcs/default.vpc'

const app = new cdk.App()
new DefaultVPC(app, {
  projectName: 'dev',
  resourceName: 'vpc',
  environments: 'dev-test',
  cidr: '10.0.0.0/16',
  region: 'ap-northeast-2',
  isExistNAT: false,
  maxAzs: 2,
  natLen: 0,
  tags: {
    Name: 'hello world',
  },
})
