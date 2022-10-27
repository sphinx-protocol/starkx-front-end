import type { NextPage } from 'next'
import OrderBook from "../../components/OrderBook";

const Markets: NextPage = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
    <div className="flex flex-col max-w-7xl border border-black  w-full">
      <div className="flex flex-row w-full mt-5 border border-black">
        <div className="flex flex-col w-3/12 h-full border border-black">
          <OrderBook />
        </div>
        <div className="flex flex-col w-9/12 h-full ml-5 border border-black">
          <div className="border border-black">Chart</div>
          <div className="flex flex-row border border-black">
            <div className="w-full border border-black">Buy</div>
            <div className="w-full border border-black">Sell</div>
          </div>
          <div className="border border-black">Open orders</div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Markets
