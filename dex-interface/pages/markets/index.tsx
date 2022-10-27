import type { NextPage } from 'next'

const Markets: NextPage = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
    <div className="flex flex-col max-w-7xl border border-black  w-full">
      <div className="flex flex-row w-full mt-5 border border-black">
        <div className="flex flex-col w-3/12 h-full border border-black">
          Order Book
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
    // <div className="flex flex-col items-center justify-center bg-gray-100">
    //   <div className="">Order Book</div>
    //   <div>Chart</div>
    //   <div>Buy</div>
    //   <div>Sell</div>
    //   <div>Open Orders</div>
    // </div>
  )
}

export default Markets
