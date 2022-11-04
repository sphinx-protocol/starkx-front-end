class SplitUint256 {
    low;
    high;
    constructor(low: any, high: any) {
        this.low = low;
        this.high = high;
    }
    toUint() {
        const uint = BigInt(this.low) + (BigInt(this.high) << BigInt(128));
        return uint;
    }
    static fromUint(uint: any) {
        const low = `0x${(uint & ((BigInt(1) << BigInt(128)) - BigInt(1))).toString(16)}`;
        const high = `0x${(uint >> BigInt(128)).toString(16)}`;
        return new SplitUint256(low, high);
    }
    static fromHex(hex: any) {
        return SplitUint256.fromUint(BigInt(hex));
    }
    toHex() {
        return `0x${this.toUint().toString(16)}`;
    }
    static fromObj(s: any) {
        return new SplitUint256(s.low, s.high);
    }
}

function getRSVFromSig(sig: any) {
    if (sig.startsWith('0x')) {
        sig = sig.substring(2);
    }
    const r = SplitUint256.fromHex('0x' + sig.substring(0, 64));
    const s = SplitUint256.fromHex('0x' + sig.substring(64, 64 * 2));
    const v = `0x${sig.substring(64 * 2)}`;
    return { r, s, v };
  }

export {getRSVFromSig, SplitUint256};