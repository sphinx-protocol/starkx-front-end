import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/Layout";

import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

const client = createClient({
  autoConnect: false,
  provider: getDefaultProvider(),
})


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
