// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  Abi,
  Account,
  Contract,
  Call,
  ec,
  json,
  KeyPair,
  number,
  Provider,
} from 'starknet';
import l2_eth_remote_eip_712_dummy from "../../abi/l2_eth_remote_eip_712_dummy.json";

type Data = {
  name: string
}

const starknetProvider = new Provider({
  sequencer: {
      // network: 'goerli-alpha',
      baseUrl: 'https://alpha4-2.starknet.io',
      feederGatewayUrl: 'https://alpha4-2.starknet.io',
      gatewayUrl: 'https://alpha4-2.starknet.io/gateway',
  },
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const account = new Account(
    starknetProvider,
    "0x076f562Cd5f10e39C35b59c763F04b154Bd8d9d202238cf1BA0dAC0CB6132238",
    "1104270362296402919574343538544428455688804766870379100690270782814013552322",
  );
  console.log(req.body);

  const contract = new Contract(l2_eth_remote_eip_712_dummy, "0x065b3efc3dbd33b9be097c56b937cf91c6214a4e716ac67180700cdce70d8094", account);
  
  if (req.method === 'POST') {
    res.status(200).json({ status: "Executed Transaction" })
  } else {
    console.log("Wrong request");
  }
}
