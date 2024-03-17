import * as cdk from 'aws-cdk-lib'
import 'source-map-support/register'
import { DefaultVPC } from '../../stacks/vpcs/default.vpc'

const PROJECT_NAME = 'dev'
const ENVIRONEMTNS = 'dev-test'

const app = new cdk.App()
const vpc = new DefaultVPC(app, {
  projectName: PROJECT_NAME,
  resourceName: 'vpc',
  environments: ENVIRONEMTNS,
  cidr: '10.0.0.0/16',
  isExistNAT: false,
  maxAzs: 2,
  natLen: 0,
  tags: {
    Name: 'hello world',
  },
})
