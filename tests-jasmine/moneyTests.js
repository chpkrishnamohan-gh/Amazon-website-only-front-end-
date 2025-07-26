import {formatMoney} from "../scripts/money.js";

describe("Test suite : currency formatting",() => {
    it('coverts into dollars',()=>{
        expect(formatMoney(2095)).toEqual('20.95');
    });
    it('works with 0',()=>{
        expect(formatMoney(0)).toEqual('0.00');
    });
    it('rounds to nearest cent',()=>{
        expect(formatMoney(2000.5)).toEqual('20.01');
    });
});