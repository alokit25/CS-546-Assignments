const express = require('express');
const router = express.Router();
const data = require('../data')
const marvelData = data.marvel

router.get('/:id', async(req,res) => {
    try{
        const marv = await marvelData.getMarvelById(req.params.id)
        res.render('posts/single', {marv: marv})
    }
    catch(e){
        res.status(404).render('posts/errors',{error : 'Given id does not exist'})
    }
})

module.exports = router;