//

const getvalue = require('./getvalues.js')
const ConfigValue = getvalue.ConfigValue
const getMode = require('./mode.js')
const mode = getMode.mode
const {LocalStorage} = require("node-localstorage");
const localStorage = new LocalStorage('./storage');
const fs = require('fs')

function validate(k,n){ if(k === undefined || k === null || k === '' ){console.error(n + "no parameter or invalid parameter");return false} else {return true;}} 

function startBot(){
    switch(ConfigValue.mode()){
        case 'Descending':
            mode.Descending()
        break;
        case 'Increasing': 
            mode.Increasing()
        break;
        case 'Stable':
            mode.Stable()
        break;
        case 'Stable_Descending':
            mode.Stable_Descending()
        break;
        case 'Stable_Increasing':
            mode.Stable_Increasing()
        break;
        default:
            console.log(ConfigValue.mode())
            console.log("Invalide Oscilation Mode.")
            return false;
    }
}

class call{
    static start(){
        startBot()
    }
    static check(){
        validate(ConfigValue.pair('1'),"pairAsset1: String - ")
        validate(ConfigValue.pair('2'), "pairAsset2: String - ")
        validate(ConfigValue.oscillation(), "oscillation: Int - ")
        validate(ConfigValue.mode(), "oscillation-mode: String - ")
        // validate(ConfigValue.fee(), "feePrice: Int - ")
        // validate(ConfigValue.feeId(), "feeId: String - ")
        validate(ConfigValue.price(), "price: Int - ")
        // validate(ConfigValue.fluctuation(), "percentage-fluctuation: Int - ")
        validate(ConfigValue.time(), "time-in-time: Int - ")
        validate(ConfigValue.node(), "nodeUrl: String - ")
        validate(ConfigValue.modeChain(), "testnet: Boolean - ")
        validate(ConfigValue.seed(), "Seed: String - ")
    }
    static log(s){
        localStorage.setItem("logActivate", s)
    }
    static reset(){
        localStorage.removeItem("logActivate")
        var newData = {
            "pairAsset1": "<assetId1>",
            "pairAsset2": "<assetId2>",
            "oscillation": 5,
            "oscillation-mode": "stable",
            // "feeId": "WAVES",
            // "feePrice": 0.01,
            "price": 0.000115,
            // "percentage-fluctuation": 1,
            "time-in-time": 7200,
            "nodeUrl": "http://nodes.wavesnodes.com/",
            "testnet": false,
            "seedphrase": "<your-seed-phrase>"
        }
        fs.writeFile("./config.json", JSON.stringify(newData), (err) => {
            if(!(err)){
                console.log("Reset written successfully\n");
            }
        })
    }
}

module.exports = {call}