// Defines variables for trade calls of operation and market maker generation
// index.js -> getvalues.js -> index.js -> mode.js -> negociation.js -> mode.js -> index.js
// Then define in class to be called in mode.js

const { order, broadcast,exchange } = require('@waves/waves-transactions')
const getvalue = require('./getvalues.js')
const Waves = getvalue.Waves
const ConfigValue = getvalue.ConfigValue
const axios = require('axios');
const encoded = require("../wavesechange/base/functions/encode.js")
// const crypto = require("../wavesechange/base/functions/crypto.js")

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

// function negociation(orderData){
//       var keypair = ConfigValue.key()
//       Waves.API.Matcher.createOrder(orderData, keypair).then((responseData) => {
//         console.log(responseData);
//         if(responseData.status == "OrderAccepted"){
//             return responseData
//         }else{
//           Trading.cancel(asset1,asset2,responseData.id,keypair)
//           Trading.buy(asset1, asset2,price,amount, matcher)
//         }}).catch((err) => {
//           console.log(err)
//           return err
//         })
// }


class Trading {
    // static async trade(asset1, asset2,price,amount,seed, matcher, node, type){
    static async trade(asset1, asset2,amount, type,nn){
      const matcher = this.matcherKey(ConfigValue.modeChain())
      const url = ConfigValue.modeChain() ? "https://matcher-testnet.waves.exchange/" : "https://matcher.waves.exchange/"
      // const tx1 = {
      //   version:3,
      //   amount: amount, //1 waves
      //   price: price, //for 0.00000010 BTC
      //   matcherFee: 1400000,
      //   amountAsset: asset1,
      //   priceAsset: asset2,
      //   matcherPublicKey: matcher,
      //   orderType: 'buy'
      // }
      // const tx2 = {
      //   version:3,
      //   amount: amount, //1 waves
      //   price: price, //for 0.00000010 BTC
      //   matcherFee: 1400000,
      //   matcherAssetId: null,
      //   amountAsset: asset1,
      //   priceAsset: asset2,
      //   matcherPublicKey: matcher,
      //   orderType: 'sell'
      // }
      // const time = Date.now()
      // const orderType = (type === 'buy') ? 0 : 1;
      // const byteArray = [
      //   encoded.numberToBE (3, 1),
      //   encoded.base58ToBinary (ConfigValue.key().publicKey), //publicKey
      //   encoded.base58ToBinary (matcher), //matcherPublicKey
      //   this.getAssetBytes (asset1), //asset to bytes
      //   this.getAssetBytes (asset2), //asset to bytes
      //   encoded.numberToBE (orderType, 1), //type (buy or sell)
      //   encoded.numberToBE (price, 8), //price 
      //   encoded.numberToBE (amount, 8), //amount
      //   encoded.numberToBE (time, 8), //timestamp
      //   encoded.numberToBE (time + 10000000, 8), //expiration timestamp
      //   encoded.numberToBE (1400000, 8), //matcher fee
      //   this.getAssetBytes ("WAVES") //matcher fee asset id
      // ]
      // const binary = encoded.binaryConcatArray (byteArray);
      // const signature = crypto.eddsa (encoded.binaryToBase16 (binary), encoded.binaryToBase16 (encoded.base58ToBinary (ConfigValue.key().privateKey)), 'ed25519');
      // const assetPair = {
      //   'amountAsset': asset1,
      //   'priceAsset': asset2,
      // };
      // const body = {
      //   'senderPublicKey': ConfigValue.key().publicKey,
      //   'matcherPublicKey': matcher,
      //   'assetPair': assetPair,
      //   'orderType': type,
      //   'price': price,
      //   'amount': amount,
      //   'timestamp': time,
      //   'expiration': time + 10000000,
      //   'matcherFee': parseInt(1400000),
      //   'signature': signature,
      //   'version': 3,
      // };
      // var data = (type == "buy" ? order(tx1, ConfigValue.seed()) : order(tx2, ConfigValue.seed()))
      const paramsBuy = {
        version: 3,
        amount: amount, //1 waves
        price: ConfigValue.amountSale(nn), //for 0.00000010 BTC
        priceAsset: asset2,
        matcherPublicKey: matcher,
        orderType: type,
        amountAsset: asset1,
        matcherFeeAssetId: ConfigValue.feeAssetId(),
        matcherFee: ConfigValue.feeAmount()
      }
      const paramsSell = {
        version: 3,
        amount: amount, //1 waves
        price: ConfigValue.amountSale(nn), //for 0.00000010 BTC
        amountAsset: asset1,
        priceAsset: asset2,
        matcherPublicKey: matcher,
        orderType: type,
        matcherFeeAssetId: ConfigValue.feeAssetId(),
        matcherFee: ConfigValue.feeAmount()
      }
      // var data = order({
      //   "senderPublicKey": ConfigValue.key().publicKey,
      //   "matcherPublicKey": matcher,
      //   "assetPair": {
      //     "amountAsset": asset1,
      //     "priceAsset": asset2
      //   },
      //   "orderType": type,
      //   "amount": amount,
      //   "price": price,
      //   "timestamp": Date.now(),
      //   "expiration": Date.now() + 60 * 1000,
      //   "matcherFee": 1400000,
      //   "matcherFeeAssetId": null,
      //   "version": 4      
      // },ConfigValue.seed())
      let data = type == "buy" ?  order(paramsBuy,ConfigValue.seed()) : order(paramsSell,ConfigValue.seed())
      console.log(data)
      await axios.post(url + "matcher/orderbook#placeLimitOrder", JSON.parse(JSON.stringify(data)))
      .then((snap) => {
        console.log(snap)
      })
      .catch((err) => {
        console.log(err)
      })
      return data
    //   console.log(matcher)
    //   const stx = exchange(this.createTX(asset1,asset2,price,amount,seed,matcher,ConfigValue.key()), seed)
    //   console.log(stx)
    //   await broadcast(stx, node).then((snap) => {
    //     console.log(snap)
    //     return snap
    //   }).catch((err) => {
    //     console.log(err)
    //     console.log(err.transaction.price >= err.transaction.order2.price)
    //     return err
    //   })
    //   // var n = negociation(stx)
    //   // return n
    }
    // static async sell(asset1, asset2,price,amount,seed,matcher,node){
      // const data = {
      //   matcherPublicKey: matcher,
      //   amount: amount, //1 waves
      //   price: price, //for 0.00000010 BTC
      //   orderType: 'sell',
      //   amountAsset: asset1,
      //   priceAsset: asset2
      // }
      // order(data, seed)
      // return negociation(asset1, asset2,price,amount, matcher, "sell")
    // }
    static async cancel(asset1,asset2,id,keyPair){
      axios({
        method: 'post',
        url: this.matcherUrl(ConfigValue.modeChain()) + `orderbook/${asset1}/${asset2}/cancelAll#cancelAllInOrderBookWithKey`,
        headers: {"X-API-KEY": keyPair.publicKey}
      }).then((s) => {return s})  .catch(async (err) => {
        var cancel = await Waves.API.Matcher.cancelOrder(asset1,asset2,id,keyPair)
        .then((s) => {return s})
        .catch((err) => {if(err.status == "OrderCancelRejected"){return true}})
        return cancel;
      })
    }
    static async orders(asset1, asset2, keyPair){
      return await Waves.API.Matcher.getOrders(asset1, asset2, keyPair)
      .then((r) => {return r})
      .catch((er) => {return [{status: "Pending"}]})
    }
    static matcherKey(t){
      var m = t ? "8QUAqtTckM5B8gvcuP7mMswat9SjKUuafJMusEoSn1Gy" : "9cpfKN9suPNvfeUNphzxXMjcnn974eme8ZhWUjaktzU5"
      return m
    }
    static network(f){
      return f ? "T" : "M"
    }
    static matcherUrl(k){
      return k ? "https://matcher-testnet.waves.exchange/matcher/" : "https://matcher.waves.exchange/matcher/"
    }
    static getAssetBytes (currencyId) {
      if (currencyId === 'WAVES') {
          return encoded.numberToBE (0, 1);
      } else {
          return encoded.binaryConcat (encoded.numberToBE (1, 1), encoded.base58ToBinary (currencyId));
      }
    }
    // static createTX(asset1,asset2,price,amount,seed,matcher,key){
    //   let buyer = {
    //     amount: amount, //
    //     price: price, //
    //     matcherFee: 1400000, //
    //     matcherFeeAssetId: null, //
    //     amountAsset: asset1, //
    //     priceAsset: asset2, //
    //     matcherPublicKey: matcher, //
    //     orderType: "buy", //
    //     senderPublicKey: key.publicKey, //
    //     timestamp: Date.now(), //
    //     expiration: Date.now() + 100000 //
    //   }
    //   let seller = {
    //     amount: amount, //
    //     price: price, //
    //     matcherFee: 1400000, //
    //     matcherFeeAssetId: null, //
    //     amountAsset: asset1, //
    //     priceAsset: asset2, //
    //     matcherPublicKey: matcher, //
    //     orderType: "sell", //
    //     senderPublicKey: key.publicKey, //
    //     timestamp: Date.now(), //
    //     expiration: Date.now() + 100000 //
    //   }
    //   let tx = {
    //     order1: order(buyer, seed),
    //     order2: order(seller, seed),
    //     price: price,
    //     amount: amount,
    //     buyMatcherFee: 1400000,
    //     sellMatcherFee: 1400000,
    //     chainId: this.network(ConfigValue.modechain()),
    //     fee: 700000,
    //   }
    //   return tx;
    // }
}


module.exports = {
    Trading,
}