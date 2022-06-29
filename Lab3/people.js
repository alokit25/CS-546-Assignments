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

async function sameBirthday(month,day){
    if(!month) throw 'month is not provided'
    if(!day) throw 'day is not provided.'
    let months= ['January','February','March','April','May','June','July','August','September','October','November','December',]
    let month1 = month;
    let day1 = day;
    
    if(typeof month == 'string'){
        if(parseFloat(month) == NaN || Number.isInteger(parseFloat(month)) == false){
            throw 'month is not a valid number'
        }
        else{
            month1 = parseFloat(month);
        }
    }
    if(typeof day == 'string'){
        if(parseFloat(day) == NaN || Number.isInteger(parseFloat(day)) == false){
            throw 'day is not a valid number'
        }
        else{
            day1 = parseFloat(day);
        }
    }
    if(typeof month1!='number' || Number.isInteger(month1) == false) throw 'month should be a valid integer .'
    if(typeof day1!='number' || Number.isInteger(day1) == false) throw 'day should be a valid integer .'
    if(month1<1 || month1>12) throw 'Month can only be in between 1-12'
    if(day<0) throw 'Day cannot be below 1'
    if(month1==01 || month1==03 || month1==05 || month1==07 || month1==08 || month1==10 || month1==12 ){
        if(day1>=32 || day1<=0){
            throw `There are not ${day1} days in ${months[month1-1]}`
        }
    }
    if(month1==04 || month1==06 || month1==09 || month1==11 ){
        if(day1>=31 || day1<=0){
            throw `There are not ${day1} days in ${months[month1-1]}`
        }
    }
    if(month1==02){
        if(day1>=29){
            throw `There are not ${day1} days in ${months[month1-1]}`
        }
    }
    const birthday = await getPeople();

    let matches = birthday.filter(birthday => parseInt(birthday.date_of_birth.substr(0,2)) === month1 && parseInt(birthday.date_of_birth.substr(3,2)) === day1);

    
    let firstName = [];
    let lastName = [];

    for(i=0;i<matches.length;i++){
        firstName.push(matches[i].first_name);
        lastName.push(matches[i].last_name)
    }
    let finalArr = [];

    firstName.forEach((num1, index) => {
        const num2 = lastName[index]
        finalArr.push(num1+ " " +num2)
    })

    if(finalArr.length == 0){
        throw 'There are no people with that birthday.'
    }
    else{
        return finalArr;
    }
    

}

async function manipulateSsn(){

    if(arguments.length>0) throw 'No arguments should be provided for this function'
    const people = await getPeople();

    const match = people.map(a=>({
        ...a,
        ssn:parseInt(a.ssn.replace(/-/g,'').replace("0","").split("").sort().join(""))
    }))
    const data = match.sort((a,b) => a.ssn-b.ssn)
    const sortedNames = data.map(x=>({
        first_name:x.first_name,
        last_name:x.last_name
    }))
    return {
        highest: sortedNames[sortedNames.length-1],
        lowest: sortedNames[0],
        average: Math.floor(data.map(x=>x.ssn).reduce((a,b)=> a+b,0)/data.length)
    }
}


async function sameStreet(streetName,streetSuffix){
    if(!streetName) throw 'street name not provided.'
    if(!streetSuffix) throw 'street suffix not provided.'
    if(typeof streetName!='string') throw 'street name should be of type string.'
    if(typeof streetSuffix!='string') throw 'street suffix should be of type string.'
    if(!streetName?.trim()){
        throw 'Street name is null or undefined or contains only spaces'
    }
    if(!streetSuffix?.trim()){
        throw 'Street suffix is null or undefined or contains only spaces'
    }
    let streetName1 = streetName.trim()
    let streetSuffix1 = streetSuffix.trim()
    let people = await getPeople();
    let arr = []
    people.forEach(item =>{
        if(item.address.home.street_name.toUpperCase() == streetName1.toUpperCase() && item.address.home.street_suffix.toUpperCase() == streetSuffix1.toUpperCase() || item.address.work.street_name.toUpperCase() == streetName1.toUpperCase() && item.address.work.street_suffix.toUpperCase() == streetSuffix1.toUpperCase()){
            arr.push(item);
        }        
    })
    if(arr.length<2){
        throw 'Less than 2 people live or work on the same street.'
    }
    else{
        return arr;
    }
    
}
// async function main(){
//     try{
//         const alo = await sameBirthday();
//         console.log(alo);
//     }
//     catch(e){
//         console.log(e);
//     }
// }
// main()

module.exports = {
    sameBirthday,
    manipulateSsn,
    sameStreet,
    getPersonById
}