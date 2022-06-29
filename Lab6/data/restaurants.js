const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const { ObjectId } = require('mongodb');

async function create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions){
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
    if(typeof serviceOptions !== 'object') throw 'Service options must be of type object'
    for(var key in serviceOptions){
        if(typeof serviceOptions[key] != 'boolean') throw 'Values of keys in service Options should be of type boolean'
    }
    const validKeyNames = ['dineIn','takeOut','delivery']

    if(!Object.keys(serviceOptions).every(e => validKeyNames.includes(e))) throw 'Key names are not valid for service options'
    let name1 = name.trim()
    let location1 = location.trim()

    const restaurantsCollection = await restaurants();

    let newRestaurant = {
        name: name1,
        location: location1,
        phoneNumber: phoneNumber1,
        website: website1,
        priceRange: priceRange1,
        cuisines: cuisines1,
        overallRating: 0,
        serviceOptions: serviceOptions,
        reviews: []
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
    //let arr = []
    //arr.push(restaurant)
    restaurantList.forEach(item => {
        item._id = ObjectId(item._id).toString()
    })
    
    let arr = []
    let newObj = {}
    restaurantList.forEach(item =>{
        newObj = {_id:item._id,
        name:item.name}
        arr.push(newObj);
    })
    return arr

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
        
        let arr = []
        arr.push(restaurant)
        arr.forEach(item => {
            item._id = ObjectId(item._id).toString()
        })
        return arr[0]

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

    const name1 = await get(id1)
    
    let parsedId = ObjectId(id1);

    const restaurantsCollection = await restaurants();
    //const name = await get(id1)
    const deletionInfo = await restaurantsCollection.deleteOne({ _id: parsedId });
     
    let restaaurantName = name1.name
    if (deletionInfo.deletedCount === 0) {
        throw 'Could not delete restaurant';
    }
    let newObbj = {restaurantId:id1,deleted:true}
    return newObbj;
}

async function update(id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions){
    if(!id) throw 'Id parameter must be supplied'
    if (typeof id !== 'string') throw "Id must be a string";
    if(!id?.trim()) throw 'Empty string is not allowed'
    let id1 = id.trim()

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
    if(typeof serviceOptions !== 'object') throw 'Service options must be of type object'
    for(var key in serviceOptions){
        if(typeof serviceOptions[key] != 'boolean') throw 'Values of keys in service Options should be of type boolean'
    }
    const validKeyNames = ['dineIn','takeOut','delivery']

    if(!Object.keys(serviceOptions).every(e => validKeyNames.includes(e))) throw 'Key names are not valid for service options'
    let name1 = name.trim()
    let location1 = location.trim()

    //const name = await get(id1)

    let parsedId = ObjectId(id1);

    const restaurantsCollection = await restaurants();
    const updatedRestaurant = {
        name: name1,
        location: location1,
        phoneNumber: phoneNumber1,
        website: website1,
        priceRange: priceRange1,
        cuisines: cuisines1,
        serviceOptions: serviceOptions
    }

    const updatedInfo = await restaurantsCollection.updateOne({ _id: parsedId },{ $set: updatedRestaurant });
    if (updatedInfo.modifiedCount === 0) {
        throw 'could not update restaurant successfully';
    }
    return await get(id1);
}

// async function main() {
//     try{
//         const safrronLounge = await update("61795f461991af2cc0b889cf","Alo Lvkrokvounge","SoHo,vrfvre New","123-456-1278","http://www.thesaffrfdsfdsferonlounge.com","$$",["Italian","gtrtgtr"],{dineIn: false, takeOut: true, delivery:true }); 
//         console.log(safrronLounge);
//     }
//     catch (e){
//         console.log(e)
//     }
    
// }

//main()

module.exports = {
    create,
    getAll,
    get,
    remove,
    update
}