// Defines variables for trade calls of operation and market maker generation
// index.js -> getvalues.js -> index.js -> mode.js -> negociation.js -> mode.js -> index.js
// Then define in class to be called in mode.js

const { order } = require('@waves/waves-transactions')
const getvalue = require('./getvalues.js')
const Waves = getvalue.Waves

/*
  FUNCTIONS:

  buy ✅
  sell ✅
  history ✅
  open ✅
  cancel ✅
  validation ✅
  oscillation calc ✅
*/

class Trading {
    static buy(asset1, asset2,price,amount,seed, matcher){
      const data = {
        matcherPublicKey: matcher,
        amount: amount, //1 waves
        price: price, //for 0.00000010 BTC
        orderType: 'buy',
        amountAsset: asset1,
        priceAsset: asset2
      }
      const stx = order(data, seed)
      return stx
    }
    static sell(asset1, asset2,price,amount,seed, matcher){
      const data = {
        matcherPublicKey: matcher,
        amount: amount, //1 waves
        price: price, //for 0.00000010 BTC
        orderType: 'sell',
        amountAsset: asset1,
        priceAsset: asset2
      }
      const stx = order(data, seed)
      return stx
    }
    static cancel(asset1,asset2,id,keyPair){
      var cancel = Waves.API.Matcher.cancelOrder(asset1,asset2,id,keyPair)
      return cancel;
    }
    static async orders(asset1, asset2, keyPair){
      var orderss = await Waves.API.Matcher.getOrders(asset1, asset2, keyPair)
      return orderss;
    }
    static matcherKey(){
      return Waves.API.Matcher.getMatcherKey()
    }
}

module.exports = {
    Trading,
}