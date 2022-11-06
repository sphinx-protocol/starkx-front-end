import React, { useState, useEffect } from "react";

const transactionHistory = [
  { price: 1700, type: "Buy", amount: 2, time: "04/06 08:39" },
  { price: 1713, type: "Sell", amount: 12, time: "04/06 08:37" },
  { price: 1811, type: "Buy", amount: 32, time: "04/06 08:35" },
  { price: 1523, type: "Buy", amount: 52, time: "04/06 08:33" },
  { price: 1455, type: "Sell", amount: 22, time: "04/06 08:21" },
  { price: 1642, type: "Buy", amount: 21, time: "04/06 08:10" },
];

interface Props {

}

function TransactionHistory({ }: Props) {
  return (
    <div className="flex flex-col w-full px-5 mt-5 overflow-y-scroll shadow-md h-96 text-themeTextGrey">
      <div className="text-lg">Recent Transactions</div>
      <div className="flex flex-row w-full mt-3">
        <div className="w-1/5 text-center">Type</div>
        <div className="w-1/5  text-center">Price</div>
        <div className="w-1/5  text-center ">Amount</div>
        <div className="w-2/5  text-center">Time</div>
      </div>
      {transactionHistory &&
        transactionHistory.map((order, id) => {
          return (
            <a
              key={id}
              className="flex flex-row items-center justify-between w-full mt-2 py-1 border border-themeBorderGrey cursor-pointer text-s hover:border-blue-500"
            //   href={"https://etherscan.io/tx/" + order.transactionHash}
              target="_blank"

            >
              <div className={order.type === "Buy" ? "w-1/5 text-themeGreen text-center" : "w-1/5 text-themeRed text-center"}>{order.type}</div>
              <div className="w-1/5 text-center">
                {order.price}
              </div>
              <div className="w-1/5 text-center">
                {order.amount}
              </div>
              <div className="w-2/5 text-center">
                {order.time}
              </div>
            </a>
          );
        })}
    </div>
  );
}

export default TransactionHistory;
