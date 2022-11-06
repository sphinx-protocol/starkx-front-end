import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { WagmiConfig, createClient, chain, configureChains } from 'wagmi'
import { StarknetConfig } from '@starknet-react/core'

const { chains, provider, webSocketProvider } = configureChains(
    [chain.goerli],
    [alchemyProvider({ apiKey: 'tpOO_xskIKOGP7ujZGXEX7XsUVabtehY' })]
)

const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
})

// const client = createClient({
//   autoConnect: false,
//   provider: getDefaultProvider(),
// })

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig client={client}>
            <StarknetConfig>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </StarknetConfig>
        </WagmiConfig>
    )
}

export default MyApp
