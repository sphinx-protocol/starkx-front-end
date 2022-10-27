import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <div className="text-white">
        Connected to {address?.slice(0,4) + "..." + address?.slice(-4)}
        <button onClick={() => disconnect()} className="ml-2 text-black p-2 border border-black bg-themeOrange">Disconnect</button>
      </div>
    )
  return <button onClick={() => connect()} className="p-2 border border-black bg-themeOrange">Connect Wallet</button>
}


export default Profile;
