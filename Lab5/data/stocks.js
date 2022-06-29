const axios = require('axios').default;

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data;
}

async function getStockById(id){
    if(!id) throw 'id not provided.'
    if(typeof id !='string') throw 'id should only be a string'
    if(!id?.trim()){
        throw 'Id is null or undefined or contains only spaces'
    }
    let id1 = id.trim();
    const stocks = await getStocks();
    let matchedId = stocks.filter(stocks => stocks.id === id1)

    if(matchedId.length == 0) throw 'Id not found.'
    else {
        return matchedId[0]
    }
}

module.exports={
    getStockById,
    getStocks
}