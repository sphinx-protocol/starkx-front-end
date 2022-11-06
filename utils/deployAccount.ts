
// @ts-nocheck
const {
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
} = require('starknet');
const fs = require('fs');

const starknetProvider = new Provider({
  sequencer: {
      // network: 'goerli-alpha',
      baseUrl: 'https://alpha4-2.starknet.io',
      feederGatewayUrl: 'feeder_gateway',
      gatewayUrl: 'gateway',
  },
});

async function test() {
  const keypair = ec.getKeyPair("359901924443096931389029071825064737394461357830523568892562288226998109984");
  const starkKeyPair = ec.genKeyPair();
  const starkKeyPub = ec.getStarkKey(keypair);
  // const starkKeyPub = ec.getStarkKey(starkKeyPair);
  const compiledAccount = json.parse(
    fs.readFileSync("./Account.json").toString("ascii")
  );
  const accountResponse = await starknetProvider.deployContract({
    contract: compiledAccount,
    constructorCalldata: [starkKeyPub],
    addressSalt: starkKeyPub,
  });
  console.log(accountResponse)
}

test();

export {}