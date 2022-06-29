//question1
function computeObjects(objects,func){
    if(!Array.isArray(objects)) throw 'The input is not an array'
    if(!objects.length) throw 'Empty array not allowed'
    for(let i=0; i<objects.length;i++){
        if(typeof(objects[i]) != 'object') throw 'array elements should be an object'
        if(Object.keys(objects[i]).length == 0) throw 'No empty objects are allowed'
        for(let key in objects[i]){
            if(typeof objects[i][key] != 'number') throw 'Value of keys should only be a number'
        }
    }
    if(typeof func != 'function') throw 'Input should be of type function'
    const commonObj = data => {
        const result = {}; 
      
        data.forEach(basket => { 
          for (let [key, value] of Object.entries(basket)) { 
            if (result[key]) { 
              result[key] += value; 
            } else { 
              result[key] = value;
            }
          }
        });
        return result
    };

    const commonKeyObj = commonObj(objects);
    let keys = Object.keys(commonKeyObj);
    let val = Object.values(commonKeyObj);
    let arr = []
    for(i=0;i<val.length;i++){
        arr.push(func(val[i]))
    }
    let finalObj = {}
    keys.forEach((key,i) => finalObj[key] = arr[i])
    return finalObj
}

//Check for common keys in objects
function commonKeys(obj1,obj2){ 
    if(!obj1) throw 'no input given'
    if(!obj2) throw 'no input given'
    if(typeof obj1!='object' || typeof obj2!='object') throw 'Input should only be object'
    if(Object.values(obj1).includes(null)==true ||Object.values(obj1).includes(undefined)==true) throw 'Values cannot be null or undefined'
    if(Object.values(obj2).includes(null)==true ||Object.values(obj2).includes(undefined)==true) throw 'Values cannot be null or undefined'
    let myobj = {}
    let nestedmyobj = {}
    for(let key1 in obj1){
        for(let key2 in obj2){
            if(key1 === key2){
                if(typeof obj1[key1] == 'object' && typeof obj2[key2] == 'object'){
                    for(let key3 in obj1[key1]){
                        for(let key4 in obj2[key2]){
                            if (key3 === key4 && obj1[key1][key3] == obj2[key2][key4]){
                                myobj[key3] = obj1[key1][key3]
                                nestedmyobj[key1] = myobj
                                return nestedmyobj
                            }   
                        }
                    }
                }
                else if(obj1[key1] === obj2[key2]){
                    myobj[key2] = obj1[key2]
                }
            }
            else{
                //console.log('no match')
            }
        }
    }
    return myobj;
}

function flipObject(object){
    if(!object) throw 'No input'
    if(typeof object!= 'object') throw 'Input should only be of object type'
    if(Object.keys(object).length == 0) throw 'no empty objects allowed'
    let val = Object.values(object)
    let keys = Object.keys(object)
    if(val.includes(null)==true || val.includes(undefined) == true) throw 'no null or uundefined values allowed'
    if(keys.includes(null)==true || val.includes(undefined) == true) throw 'no null or undefined values allowed'
    let newObj = {}
    let nestedObj = {}
    for(key in object){
        if(Array.isArray(object[key]) == true){
            for(let i=0;i<object[key].length;i++){
                newObj[object[key][i]] = key
            }
        }
        else if(typeof object[key] == 'object'){
            for(key1 in object[key]){
                nestedObj[object[key][key1]] = key1
                newObj[key] = nestedObj
            }
        }
        else{
            newObj[object[key]] = key
        }
    }
    return newObj;
}

module.exports = {
    computeObjects,
    commonKeys,
    flipObject
}