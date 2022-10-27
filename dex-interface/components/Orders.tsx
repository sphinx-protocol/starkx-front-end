import React, { useState, useEffect } from "react";

interface Props {
}

function Orders({
}: Props) {

  const limitBuyOrders: any = [{date: "11/11/22 10:33pm", type: "Buy", price: "1200 USDC", amount: "2", total: "2400 USDC", filled: "0%"}];
  const limitSellOrders: any = [{date: "11/30/22 09:31am", type: "Sell", price: "1700 USDC", amount: "5", total: "8500 USDC", filled: "0%"}];
  const collectionDetails ={};

  const formatDate = (timestamp: any) => {
    const date = new Date(timestamp * 1000);
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  };
  return (
    <div className="flex flex-col w-full p-5 mt-5 bg-white border shadow-md h-96 border-b-400 min-w-min">
      <div className="flex flex-row">
        <div className="text-themeOrange">
            Open Orders ({limitBuyOrders.length + limitSellOrders.length})
        </div>
        <div className="ml-5">
            Transaction History (23)
        </div>
      </div>
      <div className="flex flex-row justify-between w-full border-b-2 border-gray-300 mt-2">
        <div className="text-center w-2/12 font-bold">Date</div>
        <div className="text-center w-1/12 font-bold">Type</div>
        <div className="text-center w-2/12 font-bold">Price</div>
        <div className="text-center w-1/12 font-bold">Amount</div>
        <div className="text-center w-2/12 font-bold">Total</div>
        <div className="text-center w-2/12 font-bold">Filled</div>
        <div className="text-center w-2/12 font-bold">Action</div>
      </div>
      {limitBuyOrders.map((order: any) => {
        return (
          <div className="flex flex-row justify-between w-full h-10 items-center border-b-2 border-gray-300">
            <div className="text-center w-2/12">{order.date}</div>
            <div className="text-center w-1/12 text-themeGreen">{order.type}</div>
            <div className="text-center w-2/12">{order.price}</div>
            <div className="text-center w-1/12">{order.amount}</div>
            <div className="text-center w-2/12">{order.total}</div>
            <div className="text-center w-2/12">{order.filled}</div>
            <button className="text-blue-500 w-2/12">Cancel</button>
          </div>
        );
      })}
      {limitSellOrders.map((order: any) => {
        return (
            <div className="flex flex-row justify-between w-full h-10 items-center border-b-2 border-gray-300">
            <div className="text-center w-2/12">{order.date}</div>
            <div className="text-center w-1/12 text-themeRed">{order.type}</div>
            <div className="text-center w-2/12">{order.price}</div>
            <div className="text-center w-1/12">{order.amount}</div>
            <div className="text-center w-2/12">{order.total}</div>
            <div className="text-center w-2/12">{order.filled}</div>
            <button className="text-blue-500 w-2/12">Cancel</button>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
