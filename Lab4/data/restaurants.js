const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const { ObjectId } = require('mongodb');


async function create(color,name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions){

    //if(arguments.length>=9) throw 'Only 8 arguments are allowed for this function'
    if(!name || !location || !phoneNumber || !website || !priceRange || !cuisines  || !serviceOptions) throw 'All fields need to have valid values.'
    if(typeof name !== 'string') throw 'name must be of type string.'
    if(typeof location !== 'string') throw 'location must be of type string.'
    if(typeof phoneNumber !== 'string') throw 'phone number must be of type string.'
    if(!name?.trim() || !location?.trim() || !phoneNumber?.trim() || !website?.trim() || !priceRange?.trim())   throw 'Input parameters cannot be empty strings'
    
    let phoneNumber1 = phoneNumber.trim()
    let phoneFormatCheck = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/.test(phoneNumber1);
    if(phoneFormatCheck == false) throw 'Phone number must be of the format xxx-xxx-xxxx'

    if(typeof website!=='string') throw 'Website must be of type string.'

    let website1 = website.trim()
    let websiteFormat = false

    if(website1.startsWith('http://www.') && website1.endsWith('.com')){
        websiteFormat = true
    }
    else if(website1.startsWith('HTTP://WWW.') && website1.endsWith('.COM')){
        websiteFormat = true
    }
    else{
        websiteFormat = false
    }

    if(websiteFormat == false) throw 'Format of the website is wrong'

    if(website1.length<=19) throw 'website format is wrong'


    let priceRange1 = priceRange.trim()
    let priceFormat = false;

    if(priceRange1.length<=0 || priceRange1.length>4){
        throw 'Price Range can only be between $ to $$$$'
    }

    if(priceRange1.startsWith('$')){
        for(let i=1;i<priceRange1.length;i++){
            if(priceRange1[i] != priceRange1[0]){
                throw 'Price Range can only be between $ to $$$$'
            }
        }
        priceFormat = true
    }
    else{
        priceFormat = false
    }
    if(priceFormat == false) throw 'Price Range can only be between $ to $$$$'

    if(!Array.isArray(cuisines)) throw 'Cuisines should be an array'
    if(!cuisines.length) throw 'Cuisines cannot be an empty array.'
    let cuisines1 = []
    cuisines.forEach(function(item){
        if(typeof item !== 'string') throw 'Cuisines array should only consist of strings.'
        if(!item?.trim()){
            throw 'String inside cuisine array cannot be empty'
        }
        cuisines1.push(item.trim())
    })

    if(typeof overallRating !== 'number') throw 'Overall rating should be a number between 0 to 5'
    if(overallRating<0 || overallRating>5) throw 'Overall rating should be a number between 0 to 5'

    if(typeof serviceOptions !== 'object') throw 'Service options must be of type object'
    for(var key in serviceOptions){
        if(typeof serviceOptions[key] != 'boolean') throw 'Values of keys in service Options should be of type boolean'
    }
    const validKeyNames = ['dineIn','takeOut','delivery']

    if(!Object.keys(serviceOptions).every(e => validKeyNames.includes(e))) throw 'Key names are not valid for service options'
    let name1 = name.trim()
    let location1 = location.trim()
    
    // const check = await getAll()
    // if(check.length>1){
    //     for(let i=0;i<check.length;i++){
    //         if(check[i].name == name1 && check[i].location == location1 && check[i].phoneNumber == phoneNumber1) throw 'Restaurant with the same name is already present at the given location.'
    //    }
    // }

    const restaurantsCollection = await restaurants();

    let newRestaurant = {
        color:color,
        name: name1,
        location: location1,
        phoneNumber: phoneNumber1,
        website: website1,
        priceRange: priceRange1,
        cuisines: cuisines1,
        overallRating: overallRating,
        serviceOptions: serviceOptions
    };

    const insertInfo = await restaurantsCollection.insertOne(newRestaurant);
    if(insertInfo.insertedCount == 0) throw 'could not add restaurant'

    const newId = insertInfo.insertedId;
    let newStringId = newId.toString()

    const restaurant = await get(newStringId);
    

    return restaurant;
}

async function getAll(){

    if(arguments.length>0) throw 'No arguments should be provided for this function.'
    const restaurantsCollection = await restaurants();

    const restaurantList = await restaurantsCollection.find({}).toArray();

    if(restaurantList.length == 0) throw 'No restaurants present in the database.'
    return restaurantList;
}


async function get(id){
    if(arguments.length>=2) throw 'only 1 argument should be provided to this function.'
    if(!id) throw 'Id parameter must be supplied'
    if (typeof id !== 'string') throw "Id must be a string";
    if(!id?.trim()) throw 'Empty string is not allowed'
    let id1 = id.trim()
    try{
        let parsedId = ObjectId(id1);
        const restaurantsCollection = await restaurants();
        const restaurant = await restaurantsCollection.findOne({ _id: parsedId });
        if (restaurant === null) throw 'No restaurant with that id';
        //if(Object.keys(restaurant).length == 0) throw 'No restaurant exist with that id'
        return restaurant;
    }
    catch(e){
        throw 'Object id is not valid or no restaurant with the given id is present '
    }
    
}

async function remove(id){
    if(arguments.length>=2) throw 'only 1 argument should be provided to this function.'
    if(!id) throw 'Id parameter must be supplied'
    if (typeof id !== 'string') throw "Id must be a string";
    if(!id?.trim()) throw 'Empty string is not allowed'
    let id1 = id.trim()

    const name = await get(id1)
    
    let parsedId = ObjectId(id1);

    const restaurantsCollection = await restaurants();
    //const name = await get(id1)
    const deletionInfo = await restaurantsCollection.deleteOne({ _id: parsedId });
     
    let restaaurantName = name.name
    if (deletionInfo.deletedCount === 0) {
        throw 'Could not delete restaurant';
    }
    return `${restaaurantName} has been successfully deleted`;
}

async function rename(id, newWebsite){
    if(arguments.length>=3) throw 'only 1 argument should be provided to this function.'
    if(!id) throw 'Id parameter must be supplied'
    if (typeof id !== 'string') throw "Id must be a string";
    if(!id?.trim()) throw 'Empty string is not allowed'
    let id1 = id.trim()

    if(typeof newWebsite!=='string') throw 'Website must be of type string.'

    let website1 = newWebsite.trim()
    let websiteFormat = false

    if(website1.startsWith('http://www.') && website1.endsWith('.com')){
        websiteFormat = true
    }
    else if(website1.startsWith('HTTP://WWW.') && website1.endsWith('.COM')){
        websiteFormat = true
    }
    else{
        websiteFormat = false
    }

    if(websiteFormat == false) throw 'Format of the website is wrong'

    if(website1.length<=19) throw 'website format is wrong'

    const name = await get(id1)

    let parsedId = ObjectId(id1);

    

    if(name.website == website1) throw 'New Website url is same as the previos mentioned one. '
    const restaurantsCollection = await restaurants();
    const updatedRestaurant = {
        website:website1
    }

    const updatedInfo = await restaurantsCollection.updateOne({ _id: parsedId },{ $set: updatedRestaurant });
    if (updatedInfo.modifiedCount === 0) {
        throw 'could not update restaurant successfully';
    }
    return await get(id1);
}

async function main() {
    try{
        const safrronLounge = await create("Pink","The Saffron Lounge", "New York City, New York", "123-456-7890", "http://www.saffronlounge.com", "$$$$", ["Cuban", "Italian"], 3, {dineIn: true, takeOut: true, delivery: false});; 
        console.log(safrronLounge);
    }
    catch (e){
        console.log(e)
    }
    
}

main();

module.exports = {
    create,
    getAll,
    get,
    remove,
    rename
}