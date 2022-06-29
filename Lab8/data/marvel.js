const axios = require('axios');

const md5 = require('blueimp-md5');
const publickey = '014c256b3600e6187838d7c30d15040a';
const privatekey = 'bc3b02ca5b5a02776d78a84481a5d9bcd6679ba9';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);

// async function getMarvel(){
//     const { data }  = await axios.get(url);
//     return data; // this will be the array of people objects
// }

async function getMarvelBySearch(name){
    if(!name) throw 'name must be provided'
    if(arguments.length>=2) throw 'only 1 argument should be provided to this function.'
    
    if (typeof name !== 'string') throw "Id must be a string";
    if(!name?.trim()) throw 'Empty string is not allowed'
    let name1 = name.trim()

    let baseUrl = 'https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=';
    let url = baseUrl + name1 + '&limit=20'+ '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash 

    const { data } = await axios.get(url)
    return data.data.results

}

async function getMarvelById(id){
    if(!id) throw 'name must be provided'
    if(arguments.length>=2) throw 'only 1 argument should be provided to this function.'

    if (typeof id !== 'string') throw "Id must be a string";
    if(!id?.trim()) throw 'Empty string is not allowed'
    let id1 = id.trim()

    let baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/';
    let url = baseUrl + id1 + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash
    
    const { data } = await axios.get(url)
    return data.data.results

}

module.exports = {
    getMarvelBySearch,
    getMarvelById
}
