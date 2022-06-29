const axios = require("axios");
const validations = require("./validations");

// Import coingecko-api
const CoinGecko = require('coingecko-api');
// Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();


async function getExchange() {  
  // Make calls
  let pData = await CoinGeckoClient.ping();
  //console.log(pData)
  let eData = await CoinGeckoClient.exchanges.all();
  //console.log(eData)
  if(eData.code===200){
    return eData;
  }else{
    throw {
      response: { status: 404, statusText: `No data found.` },
    }
  }
};

async function getExchangeList(){
  // Make calls
  let pData = await CoinGeckoClient.ping();
  //console.log(pData)
  let lData = await CoinGeckoClient.exchanges.list();
  //console.log(lData)
  if(lData.code===200){
    return lData;
  }else{
    throw {
      response: { status: 404, statusText: `No data found.` },
    }
  }
}

async function getExchangeById(id){
  validations.validateString(id, "id");
  // Make calls
  let pData = await CoinGeckoClient.ping();
  //console.log(pData)
  let idData = await CoinGeckoClient.exchanges.fetch(id);
  //console.log(idData)
  if(idData.code===200){
    return idData;
  }else{
    throw {
      response: { status: 404, statusText: `No data found.` },
    }
  }
}

async function getTickers(id){
  validations.validateString(id, "id");
  // Make calls
  let pData = await CoinGeckoClient.ping();
  //console.log(pData)
  let tickerData = await CoinGeckoClient.exchanges.fetchTickers(id);
  //console.log(idData)
  if(tickerData.code===200){
    return tickerData;
  }else{
    throw {
      response: { status: 404, statusText: `No data found.` },
    }
  }
}

module.exports = {
    getExchange,
    getExchangeList,
    getExchangeById,
    getTickers
  };