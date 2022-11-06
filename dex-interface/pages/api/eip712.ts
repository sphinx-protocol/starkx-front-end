// @ts-nocheck
import { Console } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  Abi,
  Account,
  Contract,
  Call,
  ec,
  json,
  KeyPair,
  defaultProvider,
  // getKeyPair,
  number,
  Provider,
} from 'starknet';
const fs = require('fs');
import {SplitUint256} from "../../utils/eip712";
import l2_eth_remote_eip_712_dummy from "../../abi/l2_eth_remote_eip_712_dummy.json";

type Data = {
  name: string
}

const starknetProvider = new Provider({
  sequencer: {
      // network: 'goerli-alpha',
      baseUrl: 'https://alpha4-2.starknet.io',
      feederGatewayUrl: 'feeder_gateway',
      gatewayUrl: 'gateway',
  },
});

function convertToHex(str: string) {
  var hex = '';
  for(var i=0;i<str.length;i++) {
      hex += ''+str.charCodeAt(i).toString(16);
  }
  return hex;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const starkKeyPair = ec.genKeyPair();
  const starkKeyPub = ec.getStarkKey(starkKeyPair);

  // const compiledAccount = json.parse(
  //   fs.readFileSync("./Account.json").toString("ascii")
  // );
  // const accountResponse = await defaultProvider.deployContract({
  //   contract: compiledAccount,
  //   addressSalt: starkKeyPub,
  // });
  // console.log(accountResponse)
  const account = new Account(
    starknetProvider,
    "0x5ebab72592be459d4427cab8dd0982c4bf37f0fc76c05e74eada169d5ed77d6",
    ec.getKeyPair("359901924443096931389029071825064737394461357830523568892562288226998109984"),
  );

  console.log(req.body);
  const {r,s,v} = req.body;
  const {base_asset, author, quote_asset, amount, price, strategy, chainId, orderId, salt} = req.body.message;

  const contract = new Contract(l2_eth_remote_eip_712_dummy.abi, "0x065b3efc3dbd33b9be097c56b937cf91c6214a4e716ac67180700cdce70d8094", account);
  const newSalt: SplitUint256 = SplitUint256.fromHex(salt);
  console.log([price,amount,strategy,chainId,orderId,r,s,v,newSalt,base_asset, [author,quote_asset]]);

  if (req.method === 'POST') {
    const result = await contract.invoke("authenticate", [price,amount,strategy,chainId,orderId,r,s,v,newSalt,base_asset,[author,quote_asset]]);
    console.log(result)
    res.status(200).json({ status: "Executed Transaction" })
  } else {
    console.log("Wrong request");
  }
}
