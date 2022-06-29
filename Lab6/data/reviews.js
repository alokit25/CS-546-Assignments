const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const restaurants1 = require('./restaurants')
const { ObjectId } = require('mongodb');

const moment = require('moment');

async function create(restaurantId, title, reviewer, rating, dateOfReview, review){
    if(!restaurantId) throw 'restaurant id parameter must be supplied'
    if (typeof restaurantId !== 'string') throw "restaurant Id must be a string";
    if(!restaurantId?.trim()) throw 'Empty string is not allowed'
    let restaurantId1 = restaurantId.trim()

    if(!title || !reviewer || !rating || !dateOfReview || !review) throw 'All fields need to have valid values'

    if(typeof title !== 'string') throw 'title must be of type string.'
    if(typeof reviewer !== 'string') throw 'reviewer must be of type string.'
    if(typeof dateOfReview !== 'string') throw 'Date of review must be of type string.'
    if(typeof review !== 'string') throw 'Review must be of type string.'
    if(!title?.trim() || !reviewer?.trim() || !dateOfReview?.trim() || !review?.trim()) throw 'Input parameters cannot be empty strings'

    if(typeof rating!=='number') throw 'rating must be of type number'
    if(rating<1 || rating>5) throw 'rating must be between 1 and 5'

    let dateOfReview1 = dateOfReview.trim()
    var dateFormat = "MM/DD/YYYY"
    if(moment(dateOfReview1,dateFormat,true).isValid == false) throw 'Date of review must be of format MM/DD/YYYY'
    let currentDate = moment(new Date()).format("MM/DD/YYYY");
    if(moment(dateOfReview1).isSame(currentDate,'day') == false) throw 'You can only put in todays date'

    let title1 = title.trim();
    let reviewer1 = review.trim()
    let review1 = review.trim()

    let id = new ObjectId();

    let parsedId = ObjectId(restaurantId1);

    const restaurantsCollection = await restaurants();

    let newReview = {
        _id : id,
        title: title1,
        reviewer: reviewer1,
        rating: rating,
        dateOfReview: dateOfReview1,
        review: review1
    }

    const updatedInfo = await restaurantsCollection.updateOne({ _id: parsedId },{$push:{reviews:newReview}})
    if (updatedInfo.modifiedCount === 0) {
        throw 'could not update restaurant successfully';
    }

    let updateRating =  await getAll(restaurantId1)
    //const arr = updateRating.map(element => element.rating)
    if(updateRating.length == 1){
        const arr = updateRating.map(element => element.rating)
        let newRating = {
            overallRating : arr[0]
        }
        const info = await restaurantsCollection.updateOne({_id:parsedId},{ $set: newRating })
        if(info.modifiedCount ===0){
            throw 'Could not update overall rating successfully'
        }
    }
    else{
        let arr2 = updateRating.map(element => element.rating)
        arr2 = arr2.reduce((a,b)=>a+b)/arr2.length;
        let newRating = {
            overallRating : arr2
        }
        const info = await restaurantsCollection.updateOne({_id:parsedId},{ $set: newRating })
        if(info.modifiedCount ===0){
            throw 'Could not update overall rating successfully'
        }
    }
    let a = await restaurants1.get(restaurantId1)
    return a
}

async function getAll(restaurantId){
    if(!restaurantId) throw 'restaurant id parameter must be supplied'
    if (typeof restaurantId !== 'string') throw "restaurant Id must be a string";
    if(!restaurantId?.trim()) throw 'Empty string is not allowed'
    let restaurantId1 = restaurantId.trim()
    try{
        let parsedId = ObjectId(restaurantId1);
        const restaurantsCollection = await restaurants();
        const restaurant = await restaurantsCollection.findOne({ _id: parsedId });
        if (restaurant === null) throw 'No restaurant with that id';
        if(restaurant.reviews.length == 0) throw 'No reviews provided for the given restaurant'
        let arr = restaurant.reviews 
        arr.forEach(item => {
            item._id = ObjectId(item._id).toString()
        })
        return arr
    }
    catch(e){
        throw 'Object id is not valid or no restaurant with the given id is present '
    }
}

async function get(reviewId){
    if(!reviewId) throw 'review id parameter must be supplied'
    if (typeof reviewId !== 'string') throw "review Id must be a string";
    if(!reviewId?.trim()) throw 'Empty string is not allowed'
    let reviewId1 = reviewId.trim()
    try{
        let parsedId = ObjectId(reviewId1);
        const restaurantsCollection = await restaurants();
        const restaurant = await restaurantsCollection.findOne({ "reviews._id": parsedId },{"reviews.$":true});
        if (restaurant === null) throw 'No restaurant with that id';
        let arr = restaurant.reviews
        
        arr.forEach(item => {
            item._id = ObjectId(item._id).toString()
        })
        let newArr = arr.filter(a => a._id == parsedId)
        return newArr[0]
    }
    catch(e){
        throw 'Object id is not valid or no restaurant with the given id is present '
    }
}

async function remove(reviewId){
    if(!reviewId) throw 'restaurant id parameter must be supplied'
    if (typeof reviewId !== 'string') throw "restaurant Id must be a string";
    if(!reviewId?.trim()) throw 'Empty string is not allowed'
    let reviewId1 = reviewId.trim()
    try{
        let parsedId = ObjectId(reviewId1);
        const restaurantsCollection = await restaurants();
        const restaurant = await restaurantsCollection.findOne({ "reviews._id": parsedId },{"reviews.$":true});
        if (restaurant === null) throw 'No restaurant with that id';
        const deletedInfo = await restaurantsCollection.updateOne({ "reviews._id": parsedId },{$pull:{reviews:{"_id":parsedId}}})
        if (deletedInfo.modifiedCount === 0) {
            throw 'could not update restaurant successfully';
        }
        
        let id = restaurant._id.toString()
        let updateRating =  await getAll(id)
        if(updateRating.length == 1){
            const arr = updateRating.map(element => element.rating)
            let newRating = {
                overallRating : arr[0]
            }
            const info = await restaurantsCollection.updateOne({_id:restaurant._id},{ $set: newRating })
            if(info.modifiedCount ===0){
                throw 'Could not update overall rating successfully'
            }
        }
        else{
            let arr2 = updateRating.map(element => element.rating)
            arr2 = arr2.reduce((a,b)=>a+b)/arr2.length;
            let newRating = {
                overallRating : arr2
            }
            const info = await restaurantsCollection.updateOne({_id:restaurant._id},{ $set: newRating })
            if(info.modifiedCount ===0){
                throw 'Could not update overall rating successfully'
            }
        }
        let newObbj = {reviewId:reviewId1,deleted:true}
        return newObbj;
    }
    catch(e){
        throw 'Object id is not valid or no restaurant with the given id is present '
    }
}


async function main() {
    try{
        const safrronLounge = await create("617964a6cf5bba5e7c0ee189","This place was great!","scaredycat",5,"10/28/2021","Best restaurant");
         
        console.log(safrronLounge);
    }
    catch (e){
        console.log(e)
    }
    
}
//main()

module.exports = {
    create,
    getAll,
    get,
    remove
}

