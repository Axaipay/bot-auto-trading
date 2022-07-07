// Get values ​​from config.json and validate them
// index.js -> getvalues.js -> index.js
// Then define in class to be called in index.js

/*
  FUNCTIONS AND VALIDATIONS IN JSON DEFINED:

  pairAsset2 ✅
  pairAsset1 ✅
  oscillation ✅
  oscillation-mode
  feeId ✅
  feePrice ✅
  price ✅
  percentage-fluctuation ✅
  time-in-time ✅
  ignore-addresses ✅
  nodeUrl ✅
  testnet ✅
  seedphrase ✅
*/

const config = require("../config.json")

const WavesAPI = require('@waves/waves-api');

const Waves = WavesAPI.create(config['testnet'] ? WavesAPI.TESTNET_CONFIG : WavesAPI.MAINNET_CONFIG);

Waves.config.set({matcherAddress: (config['testnet'] ? "https://matcher-testnet.waves.exchange/matcher" : "https://matcher.waves.exchange/matcher")})

class ConfigValue {
    constructor(name){
        this.name = config[name]
    }
    static pair(n,nn){
        return config.pairs[nn]['pairAsset' + n]
    }
    static totalPair(){
        return config.pairs.length
    }
    static oscillation(n){
        return config.pairs[n]['oscillation']
    }
    static mode(){
        return config['oscillation-mode']
    }
    // static fee(n){
    //     return config.pairs[n]['feePrice']
    // }
    // static feeId(n){
    //     return config.pairs[n]['feeId']
    // }
    static price(n){
        return config.pairs[n]['price']
    }
    // static fluctuation(n){
    //     return config.pairs[n]['percentage-fluctuation']
    // }
    static time(){
        return config['time-in-time']
    }
    static node(){
        return config['nodeUrl']
    }
    static modeChain(){
        return config['testnet']
    }
    static seed(){
        return config['seedphrase']
    }
    static createAccount(){{
        const account = Waves.Seed.create()
        return account
    }}
    static keyAll(){
        const anotherSeed = Waves.Seed.fromExistingPhrase(config['seedphrase']);
        return anotherSeed
    }
    static key(){
        const anotherSeed = Waves.Seed.fromExistingPhrase(config['seedphrase']);
        return anotherSeed.keyPair
    }
    static address(){
        const anotherSeed = Waves.Seed.fromExistingPhrase(config['seedphrase']);
        return anotherSeed.address
    }
    // static getDecimals(a,n){
    //     return config.pairs[n]["pairAsset" + a + "Decimals"]
    // }
    static amountSale(n){
        return config.pairs[n]["amountSale"]
    }
    static feeAssetId(){
        return config["FeeAssetId"]
    }
    static feeAmount(){
        return config["amountFee"]
    }
}

module.exports = {
    Waves,
    ConfigValue,
}