const axios = require('axios').default;

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data;
}

async function getPersonById(id){
    
    if(!id) throw 'id not provided.'
    if(typeof id !='string') throw 'id should only be a string'
    if(!id?.trim()){
        throw 'Id is null or undefined or contains only spaces'
    }
    let id1 = id.trim();
    const people = await getPeople();
    let matchedId = people.filter(people => people.id === id1)

    if(matchedId.length == 0) throw 'person not found.'
    else {
        return matchedId[0]
    }

}

module.exports ={
    getPeople,
    getPersonById
}