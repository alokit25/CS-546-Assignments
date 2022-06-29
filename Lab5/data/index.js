const peopleData = require('./people')
const stocksData = require('./stocks')
const validations = require("./validations");
const exchangeData = require("./exchangeApi");


module.exports = {
    people: peopleData,
    stocks: stocksData,
    validations:validations,
    exchangeData :exchangeData
}