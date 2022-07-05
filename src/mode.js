// Define trading mode of operation and market maker generation
// index.js -> getvalues.js -> index.js -> mode.js -> index.js
// Then define in class to be called in index.js

/*
Modes of operation and negotiations for market maker generation

Stable: Stable 1/1 buy and sell trades, where the same sell order is bought based on the set price to keep the price stable

Stable Increasing: The first buy and sell trade is stable 1/1 where the same sell order is bought based on the set price to keep the price stable. Soon after, the trade is made in an ascending way with the price oscillating upwards based on the value in "oscillation" of the traded value. After the rising trade, another trade is made to return the price to the previous state, in order to create bullish candles, but always returning to the defined price.

Stable Descending: The first buy and sell trade is stable 1/1 where the same sell order is bought based on the set price to keep the price stable. Soon after, trading is done in a downward fashion with the price swinging down based on the "oscillation" value of the traded value. After the downward trade, another trade is made to return the price to the previous state to create bearish candlesticks, but always returning to the set price.

Increasing: The buy and sell trade is increasing 1/1 plus the "oscillation" value based on the value set to trade, where the same sell order is bought based on the generated value against the set price to keep the price increasing.

Descending: The buy and sell trade is descending 1/1 plus the "oscillation" value based on the value set to trade, where the same sell order is bought based on the generated value against the set price to keep the price descending.

*** ATTENTION! ***

Trades can fluctuate according to market volatility, where it can happen that the created order cannot be bought, this applies to highs or lows depending on how traders are trading. All buy and sell orders are deleted if it is not possible to trade them, creating a new sell and buy order based on the current market price.
*/

const trade = require("../src/negociation.js")
const Trading = trade.Trading
const getvalue = require('./getvalues.js')
const ConfigValue = getvalue.ConfigValue
// const Waves = getvalue.Waves
const configj = require("../config.json")
const {writeFile, readFile } = require("fs").promises;


//account
// const address = ConfigValue.address()
const keyPair = ConfigValue.key()

//assets for order
const asset1 = ConfigValue.pair("1")
const asset2 = ConfigValue.pair("2")

class mode {
    static Descending(){
        setInterval(async ()=> {
            var order = await Trading.orders(asset1,asset2,keyPair)
            console.log(order)
            if(JSON.stringify(order) == "[]" || order == undefined || order == false || order == null || order == "" || order == true || (order[0].status != 'Accepted' && order[0].status != "PartiallyFilled")){ 
                var price = parseInt(ConfigValue.price() - (ConfigValue.price() * ConfigValue.oscillation() / 100))
                var buy = await Trading.trade(asset1,asset2,price,"buy")
                var sell = await Trading.trade(asset1,asset2,price,"sell")
                console.log(`Trading successful - Sell Id: ${sell.id}, Buy Id: ${buy.id}`)
                configj.price = price;
                await writeFile("../config.json", JSON.stringify(configj))
            }else{
                Trading.cancel(asset1,asset2,order[0].id,keyPair)
                this.Descending();
            }
        }, ConfigValue.time())
    }
    static Increasing(){
        setInterval(async ()=> {
            var order = await Trading.orders(asset1,asset2,keyPair)
            if(JSON.stringify(order) == "[]" || order == undefined || order == false || order == null || order == "" || order == true || (order[0].status != 'Accepted' && order[0].status != "PartiallyFilled")){ 
                var price = parseInt(ConfigValue.price() + (ConfigValue.price() * ConfigValue.oscillation() / 100))
                var buy = await Trading.trade(asset1,asset2,price,"buy")
                var sell = await Trading.trade(asset1,asset2,price,"sell")
                console.log(`Trading successful - Sell Id: ${sell.id}, Buy Id: ${buy.id}`)
                configj.price = price
                await writeFile("../config.json", JSON.stringify(configj))
            }else{
                await Trading.cancel(asset1,asset2,order[0].id,keyPair)
                this.Increasing();
            }
        }, ConfigValue.time())
    }
    static Stable(){
        setInterval(async ()=> {
            var order = await Trading.orders(asset1,asset2,keyPair)
            if(JSON.stringify(order) == "[]" || order == undefined || order == false || order == null || order == "" || order == true || (order[0].status != 'Accepted' && order[0].status != "PartiallyFilled")){ 
                var price = parseInt(ConfigValue.price())
                var buy = await Trading.trade(asset1,asset2,price,"buy")
                var sell = await Trading.trade(asset1,asset2,price,"sell")
                console.log(`Trading successful - Sell Id: ${sell.id}, Buy Id: ${buy.id}`)
                configj.price = price
                await writeFile("../config.json", JSON.stringify(configj))

            }else{
                Trading.cancel(asset1,asset2,order[0].id,keyPair)
                this.Stable();
            }
        }, ConfigValue.time())
    }
    static Stable_Descending(){
        setInterval(async ()=> {
            var order = await Trading.orders(asset1,asset2,keyPair)
            if(JSON.stringify(order) == "[]" || order == undefined || order == false || order == null || order == "" || order == true || (order[0].status != 'Accepted' && order[0].status != "PartiallyFilled")){ 
                var price = parseInt(ConfigValue.price() - (ConfigValue.price() * ConfigValue.oscillation() / 100))
                var buy = await Trading.trade(asset1,asset2,price,"buy")
                var sell = await Trading.trade(asset1,asset2,price,"sell")
                console.log(`Trading successful - Sell Id: ${sell.id}, Buy Id: ${buy.id}`)
                var buy1 = await Trading.trade(asset1,asset2,ConfigValue.price(),"buy")
                var sell1 = await Trading.trade(asset1,asset2,ConfigValue.price(),"sell")
                console.log(`Trading successful - Sell Id: ${sell1.id}, Buy Id: ${buy1.id}`)
            }else{
                Trading.cancel(asset1,asset2,order[0].id,keyPair)
                this.Stable_Descending();
            }
        }, ConfigValue.time())
    }
    static Stable_Increasing(){
        setInterval(async ()=> {
            var order = await Trading.orders(asset1,asset2,keyPair)
            if(JSON.stringify(order) == "[]" || order == undefined || order == false || order == null || order == "" || order == true || (order[0].status != 'Accepted' && order[0].status != "PartiallyFilled")){ 
                var price = parseInt(ConfigValue.price() + (ConfigValue.price() * ConfigValue.oscillation() / 100))
                var buy = await Trading.trade(asset1,asset2,price,"buy")
                var sell = await Trading.trade(asset1,asset2,price,"sell")
                console.log(`Trading successful - Sell Id: ${sell.id}, Buy Id: ${buy.id}`)
                var buy1 = await Trading.trade(asset1,asset2,ConfigValue.price(),"buy")
                var sell1 = await Trading.trade(asset1,asset2,ConfigValue.price(),"sell")
                console.log(`Trading successful - Sell Id: ${sell1.id}, Buy Id: ${buy1.id}`)
            }else{
                Trading.cancel(asset1,asset2,order[0].id,keyPair)
                this.Stable_Increasing();
            }
        }, ConfigValue.time())
    }
}

module.exports = {
    mode,
}