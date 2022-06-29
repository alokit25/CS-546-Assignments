const express = require('express');
const router = express.Router();
const data = require('../data')
const marvelData = data.marvel

router.post('/search', async(req,res) => {
    const searchTerm = req.body.searchTerm
    try{
        //if(!searchTerm) throw 'No characters found'
        const name = await marvelData.getMarvelBySearch(searchTerm);
        
        if(name.length == 0) throw `We're sorry, but no results were found for ${searchTerm}`
        res.render('posts/search', {name:name, searchParam:searchTerm})
    }
    catch(e){
        res.status(404).render('posts/errors',{error : e})
    }
})

router.get('/',function(req,res){
    res.render('posts/form')
})

module.exports = router;