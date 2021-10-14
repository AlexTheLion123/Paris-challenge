import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {getUnnamedAccounts, deployments} = hre;
  const {deploy} = deployments;
  const [owner, addr1] = await getUnnamedAccounts();

  await deploy("LoanContract",{
      from: owner,
      log: true
    }
)
};
export default func;
func.tags = ["LoanContract"]