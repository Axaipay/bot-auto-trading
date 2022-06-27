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
    static pair(n){
        return config['pairAsset' + n]
    }
    static oscillation(){
        return config['oscillation']
    }
    static mode(){
        return config['oscillation-mode']
    }
    // static fee(){
    //     return config['feePrice']
    // }
    // static feeId(){
    //     return config['feeId']
    // }
    static price(){
        return config['price']
    }
    // static fluctuation(){
    //     return config['percentage-fluctuation']
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
}

module.exports = {
    Waves,
    ConfigValue,
}