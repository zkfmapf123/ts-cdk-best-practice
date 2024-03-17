///////////////////////////////////////////// Interface Func //////////////////////////////////////////////
/**
 * @Generic T Params
 * @Generic R AWS Resource (cdk.vpc, cdk.ec2 ...)
 */
export interface IStacks<T, R> {
  createResource(props: T): R
}

export interface IVPC {
  withMaxAzs(azs: number): number
}

///////////////////////////////////////////// Interface Params ////////////////////////////////////////////
/**
 * @desc vpc interface
 */
export interface IStackVPC {
  cidr: string
  isExistNAT: boolean
  maxAzs: number // Default 2
  natLen: number
}
