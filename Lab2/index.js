const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

try{
    const average = arrayUtils.average([[1], [2], [3]]);
    console.log('mean passed successfully')
} catch(e){
    console.log('mean failed test case')
}
try{
    const average = arrayUtils.average([[1], [2,"hi"], [3]]);
} catch(e){
    console.log('mean failed test case')
}

try{
    const mode = arrayUtils.modeSquared([1, 2, 3, 3, 4]);
    console.log('mode passed successfully')
} catch(e){
    console.log('mean failed test case')
}
try{
    const mode = arrayUtils.modeSquared(1,2,3);
    console.log('mode passed successfully')
} catch(e){
    console.log('mode failed test case')
}

try{
    const median = arrayUtils.medianElement([5,6,7]);
    console.log('median passed successfully')
} catch(e){
    console.log('median failed test case')
}
try{
    const median = arrayUtils.medianElement([]);
    console.log('median passed successfully')
} catch(e){
    console.log('median failed test case')
}

try{
    const merge = arrayUtils.merge([1, 2, 3], [3, 1, 2]);
    console.log('merge passed successfully')
} catch(e){
    console.log('merge failed test case')
}
try{
    const merge = arrayUtils.merge([]);
    console.log('merge passed successfully')
} catch(e){
    console.log('merge failed test case')
}

try{
    const sort = stringUtils.sortString('123 FOO BAR!');
    console.log('sort string passed successfully')
} catch(e){
    console.log('sort string failed test case')
}
try{
    const sort = stringUtils.sortString(132);
    console.log('sort string passed successfully')
} catch(e){
    console.log('sort string failed test case')
}

try{
    const replace = stringUtils.replaceChar("Daddy", 2);
    console.log('replace string passed successfully')
} catch(e){
    console.log('replace string failed test case')
}
try{
    const replace = stringUtils.replaceChar(123);
    console.log('replace string passed successfully')
} catch(e){
    console.log('replace string failed test case')
}

try{
    const mash = stringUtils.mashUp("Patrick", "Hill", "$");
    console.log('mash up string passed successfully')
} catch(e){
    console.log('mash up string failed test case')
}
try{
    const mash = stringUtils.mashUp();
    console.log('mash up string passed successfully')
} catch(e){
    console.log('mash up string failed test case')
}

try{
    const compute = objUtils.computeObjects([{ x: 2, y: 3},{ a: 70, x: 4, z: 5 }], x => x * 2);
    console.log('compute objects passed successfully')
} catch(e){
    console.log('compute objects failed test case')
}
try{
    const compute = objUtils.computeObjects();
    console.log('compute objects passed successfully')
} catch(e){
    console.log('compute objects  failed test case')
}

try{
    const common = objUtils.commonKeys({a: 2, b: 4},{a: 5, b: 4});
    console.log('common keys passed successfully')
} catch(e){
    console.log('common okeys failed test case')
}
try{
    const common = objUtils.commonKeys();
    console.log('common keys passed successfully')
} catch(e){
    console.log('common keys failed test case')
}

try{
    const flip = objUtils.flipObject({ a: 3, b: 7, c: 5 });
    console.log('flip object passed successfully')
} catch(e){
    console.log('flip object failed test case')
}
try{
    const flip = objUtils.flipObject();
    console.log('flip object passed successfully')
} catch(e){
    console.log('flip object failed test case')
}