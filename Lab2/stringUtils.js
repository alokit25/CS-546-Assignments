//Given a string return the sorted string
function sortString(string){

    if(!string) throw 'no input given'
    if(typeof string !== 'string') throw 'Input should only be a string'
    if(!string?.trim()){
        throw 'String is null or undefinde or contains only spaces'
    }
    if(!string.length > 0) throw 'Length should be greater than 0'
    let split = string.split("");
    var capitalsArr = []
    var smallArr = []
    var charArr = []
    var numArr = []
    var spaceArr = []
    for(let i=0; i<split.length;i++){
        if(split[i].charCodeAt(0) >=65 && split[i].charCodeAt(0)<=90){
            capitalsArr.push(split[i])
        }
        else if(split[i].charCodeAt(0)>=97 && split[i].charCodeAt(0)<=122){
            smallArr.push(split[i])
        }
        else if(split[i].charCodeAt(0)>=33 && split[i].charCodeAt(0)<=47 || split[i].charCodeAt(0)>=91 && split[i].charCodeAt(0)<=96 || split[i].charCodeAt(0)>=123 && split[i].charCodeAt(0)<=126 ){
            charArr.push(split[i])
        }
        else if(split[i].charCodeAt(0)>=48 && split[i].charCodeAt(0)<=57){
            numArr.push(split[i])
        }
        else if(split[i].charCodeAt(0)==32){
            spaceArr.push(split[i])
        }
    }
    if (string.length<=0) throw 'Length of string should be greated than 0'
    capitalsArr = capitalsArr.sort();
    smallArr = smallArr.sort();
    charArr = charArr.sort();
    numArr = numArr.sort();

    var finalSortedArr = capitalsArr.concat(smallArr,charArr,numArr,spaceArr)
    finalSortedArr = finalSortedArr.join("");
    return finalSortedArr
}

//replace char in a string
function replaceChar(string,idx){
    if(!string) throw 'no input given'
    if(typeof string !== 'string') throw 'Input should only be a string'
    if(!string?.trim()){
        throw 'String is null or undefined or contains only spaces'
    }
    if(!idx) throw 'no index provided'
    if(typeof idx !=='number') throw 'Index should be number'
    
    if(idx>0 && idx<=string.length-2){
        let str = string.split("");
        let indexElement = str[idx];
        let newStr = str.splice(idx,1);
        let firstReplaceString = string[idx-1]
        let secondReplaceString = string[idx+1]


        var counts = str.filter(function(yourArr,index, self){
            return !self.indexOf(yourArr) 
        });

        var indices = [];

        str.filter(function(yourArr, index, self){
            if(yourArr == indexElement && counts.length >= 1){
                indices.push(index)
            }
        })

        if(indices.length == 1){
            str[indices[0]] = firstReplaceString;
        }
        else if(indices.length == 2){
            str[indices[0]] = firstReplaceString;
            str[indices[1]] = secondReplaceString;
        }
        else{
            indices1 = indices.filter((_, i) => !(i % 2));
            indices = indices.filter( ( el ) => !indices1.includes( el ) )

            for(i=0;i<indices1.length;i++){
                str[indices1[i]] = firstReplaceString
            }
            for(i=0;i<indices.length;i++){
                str[indices[i]] = secondReplaceString
            }
        }
        let finalStr = str.splice(idx,0,indexElement)
        str = str.join("")
        return str
    }
    else{
        throw 'index value is wrong'
    }
}

//concatenation of the two strings, with alternating characters of both strings
function mashUp(string1,string2,char){
    if(!string1?.trim()){
        throw 'String is null or undefined or contains only spaces'
    }
    if(!string2?.trim()){
        throw 'String is null or undefined or contains only spaces'
    }
    if(!char?.trim()){
        throw 'String is null or undefined or contains only spaces'
    }
    if(!string1 || !string2 || !char) throw 'no input given'
    if(typeof string1!=='string' || typeof string2!=='string' || typeof char!=='string') throw 'Input should be of string type'
    if(char.length>1) throw 'only single character is allowed'

    function padEnd(array, minLength, fillValue = undefined) {
        return Object.assign(new Array(minLength).fill(fillValue), array);
    }
    let str1 = string1.split("");
    let str2 = string2.split("");
    let mergedString = "";

    if(str1.length<str2.length){
        str1 = padEnd(str1,str2.length,char)
    }
    else{
        str2 = padEnd(str2,str1.length,char)
    }
    
    for(var i=0;i<str1.length;i++){
        mergedString +=str1[i]+str2[i];
    }
    return mergedString
    
}

try{
    let alo = sortString(kdfjoewkjfo);
    console.log(alo)
}
catch(e){
    console.log(e)
}

module.exports = {
    sortString,
    replaceChar,
    mashUp
}