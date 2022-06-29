const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantsData = data.restaurants;

router.get('/', async(req,res) => {
    try{
        const restaurantList = await restaurantsData.getAll();
        res.json(restaurantList)
    }
    catch (e){
        res.status(500).send();
    }
});

router.post('/', async(req,res)=>{
    let newRestaurant = req.body
    if (!newRestaurant) {
        res.status(400).json({ error: 'You must provide data to create a restaurant' });
        return;
    }
    if(!newRestaurant.name || typeof newRestaurant.name != 'string'){
        res.status(400).json({ error: 'You must provide name for the restaurant in string format' });
        return;
    }
    if(!newRestaurant.location || typeof newRestaurant.location != 'string'){
        res.status(400).json({ error: 'You must provide location for the restaurant in string format' });
        return;
    }
    if(!newRestaurant.phoneNumber || typeof newRestaurant.phoneNumber != 'string'){
        res.status(400).json({ error: 'You must provide phone number for the restaurant in string format' });
        return;
    }

    let phoneFormatCheck = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/.test(newRestaurant.phoneNumber);
    if(phoneFormatCheck == false){
        res.status(400).json({ error: 'Phone number must be of the format xxx-xxx-xxxx' });
        return;
    }  


    if(!newRestaurant.website || typeof newRestaurant.website != 'string'){
        res.status(400).json({ error: 'You must provide website for the restaurant in string format' });
        return;
    }

    let websiteFormat = false

    if(newRestaurant.website.startsWith('http://www.') && newRestaurant.website.endsWith('.com')){
        websiteFormat = true
    }
    else if(newRestaurant.website.startsWith('HTTP://WWW.') && newRestaurant.website.endsWith('.COM')){
        websiteFormat = true
    }
    else{
        websiteFormat = false
    }

    if(websiteFormat == false){
        res.status(400).json({ error: 'Format of the website is wrong' });
        return;
    } 

    if(newRestaurant.website.length<=19){
        res.status(400).json({ error: 'Format of the website is wrong' });
        return;
    } 

    let priceFormat = false;

    if(!newRestaurant.priceRange){
        res.status(400).json({ error: 'You must provide price range for the restaurrant' });
        return;
    }
    if(newRestaurant.priceRange.length<=0 || newRestaurant.priceRange.length>4){
        res.status(400).json({ error: 'You must provide price range for the restaurrant' });
        return;
    }

    if(newRestaurant.priceRange.startsWith('$')){
        for(let i=1;i<newRestaurant.priceRange.length;i++){
            if(newRestaurant.priceRange[i] != newRestaurant.priceRange[0]){
                res.status(400).json({ error: 'Price Range can only be between $ to $$$$' });
                return;
            }
        }
        priceFormat = true
    }
    else{
        priceFormat = false
    }
    if(priceFormat == false){
        res.status(400).json({ error: 'Price Range can only be between $ to $$$$' });
        return;
    } 


    if(!newRestaurant.cuisines){
        res.status(400).json({ error: 'You must provide cuisines for the restaurrant' });
        return;
    }

    if(!Array.isArray(newRestaurant.cuisines)){
        res.status(400).json({ error: 'Cuisines should be an array' });
        return;
    }  
    if(!newRestaurant.cuisines.length){
        res.status(400).json({ error: 'Cuisines cannot be an empty array.' });
        return;
    }
    
    newRestaurant.cuisines.forEach(function(item){
        if(typeof item !== 'string'){
            res.status(400).json({ error: 'Cuisines array should only consist of strings.' });
            return;
        }
        if(!item?.trim()){
            res.status(400).json({ error: 'String inside cuisine array cannot be empty' });
            return;
        }
    })

    if(!newRestaurant.serviceOptions || typeof newRestaurant.serviceOptions != 'object'){
        res.status(400).json({ error: 'You must provide service Options for the restaurrant in object type' });
        return;
    }

    for(var key in newRestaurant.serviceOptions){
        if(typeof newRestaurant.serviceOptions[key] != 'boolean'){
            res.status(400).json({ error: 'Values of keys in service Options should be of type boolean' });
            return;
        } 
    }
    const validKeyNames = ['dineIn','takeOut','delivery']

    if(!Object.keys(newRestaurant.serviceOptions).every(e => validKeyNames.includes(e))){
        res.status(400).json({ error: 'Key names are not valid for service options' });
        return;
    }  

    try{
        const newR = await restaurantsData.create(
            newRestaurant.name,
            newRestaurant.location,
            newRestaurant.phoneNumber,
            newRestaurant.website,
            newRestaurant.priceRange,
            newRestaurant.cuisines,
            newRestaurant.serviceOptions
        );
        res.status(200).json(newR);
    }
    catch{
        res.sendStatus(500).send();
    }    
})

router.put('/:id',async(req,res) =>{
    let newRestaurant = req.body

    if (!newRestaurant) {
        res.status(400).json({ error: 'You must provide data to update a user' });
        return;
    }
    if(!newRestaurant.name || typeof newRestaurant.name != 'string'){
        res.status(400).json({ error: 'You must provide name for the restaurant in string format' });
        return;
    }
    if(!newRestaurant.location || typeof newRestaurant.location != 'string'){
        res.status(400).json({ error: 'You must provide location for the restaurant in string format' });
        return;
    }
    if(!newRestaurant.phoneNumber || typeof newRestaurant.phoneNumber != 'string'){
        res.status(400).json({ error: 'You must provide phone number for the restaurant in string format' });
        return;
    }

    let phoneFormatCheck = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/.test(newRestaurant.phoneNumber);
    if(phoneFormatCheck == false){
        res.status(400).json({ error: 'Phone number must be of the format xxx-xxx-xxxx' });
        return;
    }  


    if(!newRestaurant.website || typeof newRestaurant.website != 'string'){
        res.status(400).json({ error: 'You must provide website for the restaurant in string format' });
        return;
    }

    let websiteFormat = false

    if(newRestaurant.website.startsWith('http://www.') && newRestaurant.website.endsWith('.com')){
        websiteFormat = true
    }
    else if(newRestaurant.website.startsWith('HTTP://WWW.') && newRestaurant.website.endsWith('.COM')){
        websiteFormat = true
    }
    else{
        websiteFormat = false
    }

    if(websiteFormat == false){
        res.status(400).json({ error: 'Format of the website is wrong' });
        return;
    } 

    if(newRestaurant.website.length<=19){
        res.status(400).json({ error: 'Format of the website is wrong' });
        return;
    } 

    let priceFormat = false;

    if(!newRestaurant.priceRange){
        res.status(400).json({ error: 'You must provide price range for the restaurrant' });
        return;
    }
    if(newRestaurant.priceRange.length<=0 || newRestaurant.priceRange.length>4){
        res.status(400).json({ error: 'You must provide price range for the restaurrant' });
        return;
    }

    if(newRestaurant.priceRange.startsWith('$')){
        for(let i=1;i<newRestaurant.priceRange.length;i++){
            if(newRestaurant.priceRange[i] != newRestaurant.priceRange[0]){
                res.status(400).json({ error: 'Price Range can only be between $ to $$$$' });
                return;
            }
        }
        priceFormat = true
    }
    else{
        priceFormat = false
    }
    if(priceFormat == false){
        res.status(400).json({ error: 'Price Range can only be between $ to $$$$' });
        return;
    }
    if(!newRestaurant.cuisines){
        res.status(400).json({ error: 'You must provide cuisines for the restaurrant' });
        return;
    }

    if(!Array.isArray(newRestaurant.cuisines)){
        res.status(400).json({ error: 'Cuisines should be an array' });
        return;
    }  
    if(!newRestaurant.cuisines.length){
        res.status(400).json({ error: 'Cuisines cannot be an empty array.' });
        return;
    }
    
    newRestaurant.cuisines.forEach(function(item){
        if(typeof item !== 'string'){
            res.status(400).json({ error: 'Cuisines array should only consist of strings.' });
            return;
        }
        if(!item?.trim()){
            res.status(400).json({ error: 'String inside cuisine array cannot be empty' });
            return;
        }
    })

    if(!newRestaurant.serviceOptions || typeof newRestaurant.serviceOptions != 'object'){
        res.status(400).json({ error: 'You must provide service Options for the restaurrant in object type' });
        return;
    }

    for(var key in newRestaurant.serviceOptions){
        if(typeof newRestaurant.serviceOptions[key] != 'boolean'){
            res.status(400).json({ error: 'Values of keys in service Options should be of type boolean' });
            return;
        } 
    }
    const validKeyNames = ['dineIn','takeOut','delivery']

    if(!Object.keys(newRestaurant.serviceOptions).every(e => validKeyNames.includes(e))){
        res.status(400).json({ error: 'Key names are not valid for service options' });
        return;
    }
    try {
        await restaurantsData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    try {
        const updatedUser = await restaurantsData.update(req.params.id, newRestaurant.name,newRestaurant.location,newRestaurant.phoneNumber,newRestaurant.website,newRestaurant.priceRange,newRestaurant.cuisines,newRestaurant.serviceOptions);
        res.status(200).json(updatedUser);
    } catch (e) {
        res.sendStatus(500);
    }  
})

router.get('/:id',async (req,res)=>{
    try{
        let foundRestaurant = await restaurantsData.get(req.params.id)
        res.status(200).json(foundRestaurant)
    }
    catch(e){
        res.status(404).json({error:'Restaurant not found'})
    }

})
router.delete('/:id',async(req,res)=>{
    if (!req.params.id) throw 'You must specify an ID to delete';
    try{
        await restaurantsData.get(req.params.id);
    }
    catch(e){
        res.status(404).json({error: 'Restaurant not found'})
        return;
    }

    try{
        let deletedId = await restaurantsData.remove(req.params.id);
        res.status(200).json(deletedId)
    }
    catch{
        res.sendStatus(500);
    }
})
module.exports = router;