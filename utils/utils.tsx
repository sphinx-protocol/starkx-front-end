// @ts-nocheck

import BN from "bn.js";

// Thousands separator + 2 decimal points
const formatNumber = (number: number) => {
    return number
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function asciiToHex(str) {
  var arr1 = [];
  arr1.push("0x");
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("");
}

function isDecimal(val) {
    var decimalRegex = /^[0-9]+$/;
    return decimalRegex.test(val);
  }

function isHex(val) {
    const regexp = /^[0-9a-fA-F]+$/;
    return regexp.test(val);
  }

function removeHexPrefix(hex) {
    let hexTrim = hex.replace(/^0x/, "");
    if (hexTrim.length % 2 === 1) {
      hexTrim = "0" + hexTrim;
    }
    return hexTrim;
  }
  

function toBN(val) {
    if (BN.isBN(val)) {
      return val;
    }
    if (val === undefined || val === "") {
      return "";
    }
    if (val.startsWith("0x") && isHex(removeHexPrefix(val))) {
      return new BN(removeHexPrefix(val), 16);
    } else if (isDecimal(val)) {
      return new BN(val, 10);
    } else {
      const ascHex = asciiToHex(val);
      return new BN(removeHexPrefix(ascHex), 16);
    }
  }
function strToFelt(value) {
  const val = toBN(value).toString(10);
  return val;
}

export { formatNumber, strToFelt }
