import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

import Action from "../../components/Action";
import TransactionHistory from "../../components/TransactionHistory";
import OrderBook from "../../components/OrderBook";
import Orders from "../../components/Orders";

const Markets: NextPage = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
    <div className="flex flex-col max-w-7xl border border-black  w-full">
      <div className="flex flex-row w-full mt-5 border border-black">
        <div className="flex flex-col w-3/12 h-full border border-black bg-themeDarkGrey">
          <TransactionHistory />
        </div>
        <div className="flex flex-col w-9/12 h-full ml-5 border border-black">
          <div className="border border-black w-full bg-themeDarkGrey">
          <OrderBook />
          </div>
          <div className="mt-5 flex flex-row border border-black bg-themeDarkGrey">
            <Action />
          </div>
          <div className="mt-5 border border-black bg-themeDarkGrey">
            <Orders />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Markets
