// @ts-nocheck

import { signTypedData } from '@wagmi/core';
import type { NextPage } from 'next'
import { useSignTypedData, useAccount } from 'wagmi'
// import { utils } from '@snapshot-labs/sx';
import { useState, useEffect } from "react";

function getRSVFromSig(sig: any) {
  if (sig.startsWith('0x')) {
      sig = sig.substring(2);
  }
  const r = SplitUint256.fromHex('0x' + sig.substring(0, 64));
  const s = SplitUint256.fromHex('0x' + sig.substring(64, 64 * 2));
  const v = `0x${sig.substring(64 * 2)}`;
  return { r, s, v };
}

class SplitUint256 {
  low;
  high;
  constructor(low: any, high: any) {
      this.low = low;
      this.high = high;
  }
  toUint() {
      const uint = BigInt(this.low) + (BigInt(this.high) << BigInt(128));
      return uint;
  }
  static fromUint(uint: any) {
      const low = `0x${(uint & ((BigInt(1) << BigInt(128)) - BigInt(1))).toString(16)}`;
      const high = `0x${(uint >> BigInt(128)).toString(16)}`;
      return new SplitUint256(low, high);
  }
  static fromHex(hex: any) {
      return SplitUint256.fromUint(BigInt(hex));
  }
  toHex() {
      return `0x${this.toUint().toString(16)}`;
  }
  static fromObj(s: any) {
      return new SplitUint256(s.low, s.high);
  }
}

const EIP712: NextPage = () => {
  const { address, isConnected } = useAccount()
  const [ r, setR ] = useState<SplitUint256>();
  const [ s, setS ] = useState<SplitUint256>();
  const [ v, setV ] = useState("");

    const result = useSignTypedData({
      domain: {
        name: 'stark-x',
        version: '1',
        chainId: '5',
      },
    
      types: {
        Order: [
          { name: 'authenticator', type: 'bytes32' },
          { name: 'base_asset', type: 'bytes32' },
          { name: 'author', type: 'address' },
          { name: 'quote_asset', type: 'bytes32' },
          { name: 'amount', type: 'uint256' },
          { name: 'price', type: 'uint256' },
          { name: 'strategy', type: 'uint256' },
          { name: 'chainId', type: 'uint256' },
          { name: 'orderId', type: 'uint256' },
          { name: 'salt', type: 'uint256' },
        ],
      } as const, // <--- const assertion
    
      value: {
        authenticator: "0x01c9d8add6fbba9534ad3c623cc8ae3d18b0295a43c6feab83ea38614849db33",
        base_asset: "0x06441c218ead27ee136579bad2c1705020e807f25d0b392e72b14e21b012b2f8",
        author: author, // author
        quote_asset: "0x06441c218ead27ee136579bad2c1705020e807f25d0b392e72b14e21b012b233", // token address
        amount: 1000,
        price: 200,
        strategy: 1,
        chainId: 5,
        orderId: 123456,
        salt: salt.toHex(),
      },
    })

    useEffect(() => {
      if (result.data) {
        const { r, s, v } = getRSVFromSig(result.data);
        setR(r);
        setS(s);
        setV(v);
  
        console.log("r", r);
        console.log("s", s);
        console.log("v", v);
      }
    }, [result.data])

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

