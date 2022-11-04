import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/Layout";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { WagmiConfig, createClient, chain, configureChains } from 'wagmi'
import { getDefaultProvider } from 'ethers'

const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  [alchemyProvider({ apiKey: 'tpOO_xskIKOGP7ujZGXEX7XsUVabtehY' })]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

// const client = createClient({
//   autoConnect: false,
//   provider: getDefaultProvider(),
// })


function MyApp({ Component, pageProps }: AppProps) {
  return (
  <WagmiConfig client={client}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </WagmiConfig>
  )
}

export default MyApp
