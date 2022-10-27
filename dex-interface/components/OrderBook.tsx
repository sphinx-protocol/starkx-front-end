import React, { useState, useEffect } from "react";
import { BuyOrderBook, SellOrderBook } from "../interfaces/interfaces";
import { generateDummyOrderBooks } from "../data/generateDummyData";
import { formatNumber } from "../utils/utils";

interface BuyBuckets {
  [bucket: number]: BuyBucketDetails;
}

interface BuyBucketDetails {
  price: number;
  amount: number;
  orders: BuyOrderBook[];
  total: number;
}

interface SellBuckets {
  [bucket: number]: SellBucketDetails;
}

interface SellBucketDetails {
  price: number;
  amount: number;
  orders: SellOrderBook[];
  total: number;
}

interface Props {
//   sellOrderBook: SellOrderBook[];
//   buyOrderBook: BuyOrderBook[];
}

function OrderBook({
    
}: Props) {

  const orderBooks = generateDummyOrderBooks(200);
  const buyOrderBook = orderBooks.buyOrderBook || [];
  const sellOrderBook = orderBooks.sellOrderBook || [];

  const [scrollEffect, setScrollEffect] = useState(false);

  let buyBuckets: BuyBuckets = {};
  let sellBuckets: SellBuckets = {};

  let maxBucketAmount = 0;

  let sellOrderBookDiv: any;

  if (typeof window !== 'undefined') {
    sellOrderBookDiv = document.getElementById("sellOrderBook");
  }

  React.useEffect(() => {
    if (sellOrderBookDiv && !scrollEffect) {
      sellOrderBookDiv.scrollTop = sellOrderBookDiv.scrollHeight;
      if (sellOrderBookDiv.scrollTop > 0) {
        setScrollEffect(true);
      }
    }
  }, [sellOrderBook]);

  buyOrderBook.forEach((order) => {
    const bucket: number = Math.floor(Number(order.price) / 1e18);
    if (
      buyBuckets[bucket] === undefined
    ) {
      buyBuckets[bucket] = {
        price: bucket,
        amount: order.amount,
        orders: [order],
        total: Number(order.price) * order.amount,
      };
    } else if (
      buyBuckets[bucket]
    ) {
      buyBuckets[bucket].amount += order.amount;
      maxBucketAmount = Math.max(maxBucketAmount, buyBuckets[bucket].amount);
      buyBuckets[bucket].orders.push(order);
      buyBuckets[bucket].total += Number(order.price) * order.amount;
    }
  });
  const sortedBuyBuckets: BuyBucketDetails[] = Object.values(buyBuckets).sort(
    (a, b) => b.price - a.price
  );
  console.log("sortedBuyBuckets", sortedBuyBuckets);

  sellOrderBook.forEach((order) => {
    const bucket: number = Math.floor(Number(order.price) / 1e18);
    if (
      sellBuckets[bucket] === undefined
    ) {
      sellBuckets[bucket] = {
        price: bucket,
        amount: order.amount,
        orders: [order],
        total: Number(order.price) * order.amount,
      };
    } else if (
      sellBuckets[bucket]
    ) {
      sellBuckets[bucket].amount += order.amount;
      maxBucketAmount = Math.max(maxBucketAmount, sellBuckets[bucket].amount);
      sellBuckets[bucket].orders.push(order);
      sellBuckets[bucket].total += Number(order.price) * order.amount;
    }
  });

  const sortedSellBuckets: SellBucketDetails[] = Object.values(
    sellBuckets
  ).sort((a, b) => a.price - b.price);
  console.log(sortedSellBuckets);

  return (
    <div className="text-themeTextGrey flex flex-row w-full p-5 shadow-md border-b-400 min-w-min">
      {/* <div className="flex justify-between">
        <div>Filter</div>
        <div>1</div>
      </div> */}
      <div className="flex flex-col items-end w-full">
      <div className="flex justify-between mb-1 text-xs w-full">
        <p className="w-1/3 text-center">Price</p>
        <p className="w-1/3 text-center">Quantity</p>
        <p className="w-1/3 text-center">Total</p>
      </div>
        <div className="flex flex-col w-full">
          <div className="overflow-y-scroll h-60 " id="sellOrderBook">
            {sortedSellBuckets &&
              sortedSellBuckets.map((bucket, id) => {
                return (
                  <div
                    className="relative flex flex-col w-full my-0.5 cursor-pointer border border-themeBorderGrey hover:border-blue-500"
                    key={id}
                  >
                    <div
                      className="absolute h-full bg-themeRed"
                      style={{
                        width: (bucket.amount / maxBucketAmount) * 100 + "%",
                      }}
                    ></div>
                    <div
                      id={id.toString()}
                      className="relative flex flex-row items-center justify-between px-1 text-black"
                    >
                    <div className="text-white">
                        {formatNumber(bucket.price)}
                    </div>
                    <div className="text-white">
                        {formatNumber(bucket.amount)}
                    </div>
                    <div className="text-white">
                        {formatNumber(bucket.total / 1e18)}
                    </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full m-1">
        {
            sortedBuyBuckets.length
              ? "$" + Number(sortedBuyBuckets[0].price)
              : "-"
          }   
      </div>
      <div className="flex flex-col items-end w-full">
    <div className="flex justify-between mb-1 text-xs w-full">
        <p className="w-1/3 text-center">Price</p>
        <p className="w-1/3 text-center">Quantity</p>
        <p className="w-1/3 text-center">Total</p>
      </div>
        <div className="flex flex-col w-full">
          <div className="overflow-y-scroll h-60">
            {sortedBuyBuckets &&
              sortedBuyBuckets.map((bucket, id) => {
                return (
                  <div key={id.toString()} className="relative flex flex-col w-full my-0.5 cursor-pointer border border-themeBorderGrey hover:border-blue-500">
                    <div
                      className={`h-full bg-themeGreen absolute`}
                      style={{
                        width: (bucket.amount / maxBucketAmount) * 100 + "%",
                      }}
                    ></div>
                    <div
                      id={id.toString()}
                      className="relative flex flex-row items-center justify-between px-1 text-black"
                    >
                        <div className="text-white">
                            {formatNumber(bucket.price)}
                        </div>
                        <div className="text-white">
                            {formatNumber(bucket.amount)}
                        </div>
                        <div className="text-white">
                            {formatNumber(bucket.total / 1e18)}
                        </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderBook;