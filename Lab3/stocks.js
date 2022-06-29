const axios = require('axios').default;

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data;
}


async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data;
}

async function listShareholders(){
    if(arguments.length>0) throw 'No arguments should be provided for this function.'
    let shares = await getStocks();
    let people = await getPeople();
    let myObj = {};
    let shareHolders = []

    shares.forEach(stockItem => {
        stockItem.shareholders = stockItem.shareholders.map(shareHolderItem => {
            const name = people.find(a => a.id == shareHolderItem.userId);
            return { first_name: name?.first_name,last_name: name?.last_name,number_of_shares: shareHolderItem.number_of_shares}
        })
    });
    return shares;
}
async function topShareholder(stockName){

    if(!stockName) throw 'Stock name not provided.'
    if(typeof stockName !='string') throw 'Stock name should be of type string.'
    if(!stockName?.trim()){
        throw 'Stock name is null or undefined or contains only spaces'
    }
    let stockName1 = stockName.trim();
    let shares = await getStocks();
    let people = await getPeople();

    let finalStr = '';

    shares.forEach(stockItem => {
        if(stockItem.stock_name== stockName1 ){
            if(stockItem.shareholders.length == 0){
                finalStr = stockName1 + ' currently has no shareholders.'
            }
            else{
                const max = stockItem.shareholders.reduce(function(prev,current){
                    return (prev.number_of_shares>current.number_of_shares) ? prev : current
                })
                people.forEach(item =>{
                    if(max.userId == item.id){
                        finalStr = 'With '+max.number_of_shares+' shares in '+stockName1+', ' +item.first_name+' '+item.last_name+' is the top shareholder.';
                    }
                })
            }
        }
    })
    if (finalStr.length == 0) throw 'Stock name not present'
    return finalStr;

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

async function listStocks(firstName, lastName){
    if(!firstName) throw 'First name is not provided.'
    if(!lastName) throw 'Last name is not provided.'
    if(typeof firstName!='string') throw ' first name should be of type string.' 
    if(typeof lastName!= 'string') throw 'Last name should be of type string.'
    if(!firstName?.trim()){
        throw 'First name is null or undefined or contains only spaces'
    }
    if(!lastName?.trim()){
        throw 'Last name is null or undefined or contains only spaces'
    }
    let firstName1 = firstName.trim();
    let lastName1 = lastName.trim()
    const people = await getPeople();
    let matched = people.filter(people => people.first_name == firstName1 && people.last_name == lastName1)
    if(matched.length == 0) throw 'no name found'
    let matchedId = matched[0].id
    let shares = await getStocks();
    let myobj = {}
    let retarr = []
    shares.forEach(stockItem =>{
        stockItem.shareholders.forEach(shareItem => {
            if(matchedId==shareItem.userId){
                retarr.push({stock_name: stockItem.stock_name,number_of_shares: shareItem.number_of_shares});
            }
        })
    })
    if(retarr.length == 0) throw 'The person does not own a share in any company'
    return retarr;
}

module.exports = {
    listStocks,
    getStockById,
    topShareholder,
    listShareholders
}