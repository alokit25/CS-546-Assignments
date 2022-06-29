const express = require('express');
const router = express.Router();
const data = require('../data');
const stocksData = data.stocks;

router.get('/', async(req,res) => {
    try{
        const stocksList = await stocksData.getStocks();
        res.json(stocksList)
    }
    catch (e){
        res.status(500).send();
    }
});

router.get('/:id', async(req,res) => {
    try{
        const stocksList1 = await stocksData.getStockById(req.params.id);
        res.json(stocksList1)
    }
    catch (e){
        res.status(404).json({message :'Stock not found'});
    }
});

module.exports = router;