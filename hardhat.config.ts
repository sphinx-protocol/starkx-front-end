import { HardhatUserConfig } from 'hardhat/config'
import '@shardlabs/starknet-hardhat-plugin'

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.9',
    },
    starknet: {
        network: 'goerli2',
        networkUrl: 'https://alpha4-2.starknet.io',
    },
    networks: {
        goerli2: {
            url: 'https://alpha4-2.starknet.io',
        },
    },
}

export default config
