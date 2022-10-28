import {BuyOrderBook, SellOrderBook} from "../interfaces/interfaces";

const randomIntFromInterval = (min: number, max: number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateDummyOrderBooks = (amount :number) => {
    const buyOrderBook: BuyOrderBook[]  = [];
    const sellOrderBook: SellOrderBook[] = [];

    for (let i = 0 ; i < amount; i++) {
        buyOrderBook.push({price: randomIntFromInterval(800, 1500)* 1e18, amount: randomIntFromInterval(1,20)});
        sellOrderBook.push({price: randomIntFromInterval(1550, 2500)* 1e18, amount: randomIntFromInterval(1,20)});
    }

    return {buyOrderBook, sellOrderBook};
}

export {
    generateDummyOrderBooks
  };