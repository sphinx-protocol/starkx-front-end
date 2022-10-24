import { signTypedData } from '@wagmi/core';
import type { NextPage } from 'next'
import { useSignTypedData, useAccount } from 'wagmi'

const EIP712: NextPage = () => {
  const { address, isConnected } = useAccount()

    const result = useSignTypedData({
      domain: {
        name: 'snapshot-x',
        version: '1',
        chainId: '5',
      },
    
      types: {
        Order: [
          { name: 'authenticator', type: 'bytes32' },
          { name: 'market', type: 'bytes32' },
          { name: 'author', type: 'address' },
          { name: 'token', type: 'address' },
          { name: 'amount', type: 'uint256' },
          { name: 'strategy', type: 'uint256' },
          { name: 'salt', type: 'uint256' },
        ],
      } as const, // <--- const assertion
    
      value: {
        authenticator: "0x04d1c8452f4469d66518bc01b0e8f9c5b7c6f6536e90e0a98d1e8e3f378dbbc5",
        market: "0x06441c218ead27ee136579bad2c1705020e807f25d0b392e72b14e21b012b2f8",
        author: address,
        token: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d", // token address
        amount: 1000,
        strategy: 1,
        salt: '0x1',
      },
    })

    console.log(result);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => result.signTypedData()}>
            Button
        </button>
    </div>
  )
}

export default EIP712

