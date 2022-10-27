import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

import Action from "../../components/Action";
import OrderBook from "../../components/OrderBook";
import { createChart } from 'lightweight-charts';

// const {createChart} = dynamic(import('lightweight-charts'), { ssr: false });
// import PlotChart from "../../components/PlotChart";

const Markets: NextPage = () => {


  return (
    <div className="flex flex-col items-center w-full min-h-screen">
    <div className="flex flex-col max-w-7xl border border-black  w-full">
      <div className="flex flex-row w-full mt-5 border border-black">
        <div className="flex flex-col w-3/12 h-full border border-black">
          <OrderBook />
        </div>
        <div className="flex flex-col w-9/12 h-full ml-5 border border-black">
          <div className="border border-black">
            {/* <PlotChart /> */}
            Chart
          </div>
          <div className="flex flex-row border border-black">
            <Action />
          </div>
          <div className="border border-black">Open orders</div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Markets
