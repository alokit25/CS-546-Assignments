//Given an array of arrays this returns the rounded value of all elements in the array
function average(arrays){
    if(typeof arrays=='undefined' || typeof arrays=='null') throw 'Undefined or null'
    if(!Array.isArray(arrays)) throw 'The input is not an array'
    if(!arrays.length) throw 'Empty array not allowed'

    for(let i=0;i<arrays.length;i++){
        if(arrays[i].length == 0) throw 'Empty arrays are not allowed'
    }
    const finalArr = arrays.reduce((acc, curr) => acc.concat(curr),[]);
    finalArr.forEach(function(item){
        if (typeof item !== 'number') throw 'Input is not a number'
    })

    const averageArr =  finalArr.reduce((a,b) => a+b) / finalArr.length;

    return Math.round(averageArr) ;
}

//mode squared function
function modeSquared(array){
    if(typeof array=='undefined' || typeof arrays=='null') throw 'Undefined or null'
    if(!Array.isArray(array)) throw 'The input is not an array'
    if(!array.length) throw 'Empty array not allowed'
    array.forEach(function(item){
        if (typeof item !== 'number') throw 'Input is not a number'
    })
    const mode = array => { if(array.filter((x,index)=>array.indexOf(x)==index).length == array.length) return array; else return mode(array.sort((x,index)=>x-index).map((x,index)=>array.indexOf(x)!=index ? x : null ).filter(x=>x!=null)) }
    let modeArr = mode(array)
    if(JSON.stringify(array) === JSON.stringify(modeArr)){
        return 0
    }
    else{
        var sum = 0;
        for (var index = 0; index < modeArr.length; index++) {
            sum += modeArr[index] * modeArr[index];
        }
        return sum
    }
}

function medianElement(array){
    if(typeof array=='undefined' || typeof arrays=='null') throw 'Undefined or null'
    if(!Array.isArray(array)) throw 'The input is not an array'
    if(!array.length) throw 'Empty array not allowed'
    array.forEach(function(item){
        if (typeof item !== 'number') throw 'Input is not a number'
    })
    const middle = Math.floor(array.length/2)

    const sortedArray = array.sort(function(a,b){return a-b; });

    let myobj = {}

    if(array.length %2 == 0){
       let evenMedian =  (sortedArray[middle-1] + sortedArray[middle]) / 2
       let indexOfEvenMedian = array.indexOf(sortedArray[middle])
       myobj[evenMedian] = indexOfEvenMedian
    }
    else{
        let oddMedian = sortedArray[middle]
        let indedOfOddMedian = array.indexOf(sortedArray[middle])
        myobj[oddMedian] = indedOfOddMedian
    }
    return myobj
}

//Merging two arrays
function merge(arrayOne, arrayTwo){

    if(typeof arrayOne=='undefined' || typeof arrayOne=='null' || typeof arrayTwo=='undefined' || typeof arrayTwo=='null') throw 'Undefined or null'
    if(!arrayOne.length || !arrayTwo.length) throw 'Empty array not allowed'
    if(!Array.isArray(arrayOne) || !Array.isArray(arrayTwo)) throw 'The input is not an array' 
    var mergedArray = arrayOne.concat(arrayTwo);

    //mergedArray.forEach(function(item){
      //  if (typeof item!=='number' || typeof item!=='string' ) throw 'The input should only be number or string'
    //})
    ///[^a-zA-Z]+/
    var smallArray = []
    var capitalArray = []

    var numberArray = mergedArray.filter(function(item){
        return !isNaN(Number(item));
    })
    numberArray = numberArray.sort(function(a,b){return a-b; });
    
    var charArray = mergedArray.filter((el) => !numberArray.includes(el));

    for(let i=0;i<charArray.length;i++){
        if(charArray[i].charCodeAt(0) >96){
            smallArray.push(charArray[i]);
        }
        else{
            capitalArray.push(charArray[i])
        }
    }
    smallArray.forEach(function(item){
        if(item.length>1) throw 'char should be single digit'
    })
    capitalArray.forEach(function(item){
        if(item.length>1) throw 'Only single letter char allowed'
    })
    smallArray = smallArray.sort();
    capitalArray = capitalArray.sort();
    var combinedArray = smallArray.concat(capitalArray)
    let joinedArr = combinedArray.join("")
    
    var sortedArray = combinedArray.concat(numberArray);

    return sortedArray;   
}

//console.log(merge([5,6,7],[1,2,3]))


module.exports = {
    average,
    modeSquared,
    medianElement,
    merge
}