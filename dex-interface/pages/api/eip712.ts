// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body);
  if (req.method === 'POST') {
    res.status(200).json({ status: "Executed Transaction" })
  } else {
    console.log("Wrong request");
  }
}
