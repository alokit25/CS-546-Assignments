const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews    

const moment = require('moment');

router.get('/:id', async(req,res) => {
    try{
        const reviewsList = await reviewsData.getAll(req.params.id);
        res.status(200).json(reviewsList)
    }
    catch (e){
        res.status(404).send();
    }
});

router.post('/:id', async(req,res)=>{
    let newReview = req.body
    if (!newReview) {
        res.status(400).json({ error: 'You must provide data to create a review' });
        return;
    }
    if(!newReview.title || typeof newReview.title != 'string'){
        res.status(400).json({ error: 'You must provide title for the review in string format' });
        return;
    }
    if(!newReview.reviewer || typeof newReview.reviewer != 'string'){
        res.status(400).json({ error: 'You must provide reviewer for the review in string format' });
        return;
    }
    if(!newReview.rating || typeof newReview.rating != 'number'){
        res.status(400).json({ error: 'You must provide rating for the review in integer format' });
        return;
    }

    if(newReview.rating<1 || newReview.rating>5){
        res.status(400).json({ error: 'rating must be between 1 and 5' });
        return;
    } 

    if(!newReview.dateOfReview || typeof newReview.dateOfReview != 'string'){
        res.status(400).json({ error: 'You must provide date for the review in string format' });
        return;
    }

    var dateFormat = "MM/DD/YYYY"
    if(moment(newReview.dateOfReview,dateFormat,true).isValid == false){
        res.status(400).json({ error: 'Date of review must be of format MM/DD/YYYY' });
        return;
    }  
    let currentDate = moment(new Date()).format("MM/DD/YYYY");
    if(moment(newReview.dateOfReview).isSame(currentDate,'day') == false){
        res.status(400).json({ error: 'You can only put in todays date' });
        return;
    } 


    if(!newReview.review || typeof newReview.review != 'string'){
        res.status(400).json({ error: 'You must provide review for the review' });
        return;
    }
    try{
        const newR = await reviewsData.create(req.params.id,
            newReview.title,
            newReview.reviewer,
            newReview.rating,
            newReview.dateOfReview,
            newReview.review
        )
        res.status(200).json(newR)
    }
    catch(e){
        res.sendStatus(500).send();
    }
})

router.get('/review/:id', async(req,res)=>{
    try{
        const reviewList1 = await reviewsData.get(req.params.id);
        res.status(200).json(reviewList1)
    }
    catch(e){
        res.status(404).send();
    }
})

router.delete('/:id',async(req,res)=>{
    if (!req.params.id) throw 'You must specify an ID to delete';
    if(typeof req.params.id != 'string') throw 'Id to delete must be of type string'
    try{
        await reviewsData.get(req.params.id);
    }
    catch(e){
        res.status(404).json({error: 'Review not found'})
        return;
    }

    try{
        let deletedId = await reviewsData.remove(req.params.id);
        res.status(200).json(deletedId)
    }
    catch{
        res.sendStatus(404);
    }
})

module.exports = router;