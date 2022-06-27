#! /usr/bin/env node

/*
  CREATED BY DIEGO H. O. R. ANTUNES

  BOT MARKET MAKER FOR WAVES EXCHANGE

  AxAi-USDN pair
*/

const yargs = require("yargs");
const getcall = require("./src/call.js")
const call = getcall.call

const options = yargs  
      .usage("\nUsage: axai-bot <options>")  
      .option("t", {alias:"testnet", describe: "Testnet mode", type: "boolean", demandOption: false })  
      .option("m", {alias:"mainnet", describe: "Mainnet mode", type: "boolean", demandOption: false })      
      .option("c", {alias:"check", describe: "Check all values in config.json.", type: "boolean", demandOption: false})
      .option("l", {alias:"log", describe: "Define true/false from create log file for analyse.", type: "string", demandOption: false})
      .option("r", {alias:"reset", describe: "Reset file config.json.", type: "boolean", demandOption: false})                                                                                                                                                                                               
      .help(true)  
      .argv;

if(yargs.argv.t || yargs.argv.testnet){
  call.start()
}else if(yargs.argv.c || yargs.argv.check){
  call.check()
}else if(yargs.argv.m == true || yargs.argv.mainnet == true){
  call.start()
}else if(yargs.argv.l == 'true' || yargs.argv.log == 'true' || yargs.argv.l == 'false' || yargs.argv.log == 'false' || yargs.argv.log == ''){
  let y = yargs.argv.l == '' ? 'false' : yargs.argv.l
  call.log(y)
}else if(yargs.argv.r || yargs.argv.reset){
  call.reset()
}else{
  call.start()
}