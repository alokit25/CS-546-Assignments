const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
var bcrypt = require('bcryptjs');
const saltRounds = 8

async function createUser(username,password){
    if(!username) throw 'Username must be provided'
    if(!password) throw 'Password must be provided'
    if(typeof username != 'string') throw 'Username should be of string type'
    if(username.length <4) throw 'Username must be at 4 characters long'

    let usenameCheck = /^[a-zA-Z0-9]+$/.test(username)
    if(usenameCheck == false) throw 'Username should not contain any spaces and contain onky alphanumeric characters'

    let username1 = username.toUpperCase();

    if(typeof password != 'string') throw 'Password must be a valid string'


    let passwordCheck = /\s/.test(password)
    if(passwordCheck == true) throw 'Password must not contain spaces'
    if(password.length<6) throw 'Password must be atleast 6 characters long'
    const hash = await bcrypt.hash(password,saltRounds)

    await checkUsername(username1);
    const usersCollection = await users();

    let newUser = {
        username: username1,
        password: hash
    }

    const insertInfo = await usersCollection.insertOne(newUser);
    if(insertInfo.insertedCount == 0) throw 'could not add restaurant'

    let obj = {userInserted : true}

    return obj
}

async  function checkUsername(username){
    let username1 = username.toUpperCase()

    const usersCollection = await users();

    const user = await usersCollection.findOne({username: username1});
    if(user != null) throw 'there is already a user with that username'
}

async function checkUser(username,password){
    if(!username) throw 'Username must be provided'
    if(!password) throw 'Password must be provided'
    if(typeof username != 'string') throw 'Username should be of string type'
    if(username.length <4) throw 'Username must be at 4 characters long'

    let usenameCheck = /^[a-zA-Z0-9]+$/.test(username)
    if(usenameCheck == false) throw 'Username should not contain any spaces and contain onky alphanumeric characters'

    let username1 = username.toUpperCase();

    if(typeof password != 'string') throw 'Password must be a valid string'


    let passwordCheck = /\s/.test(password)
    if(passwordCheck == true) throw 'Password must not contain spaces'
    if(password.length<6) throw 'Password must be atleast 6 characters long'

    
    const usersCollection = await users();

    const user = await usersCollection.findOne({username: username1});
    if(user == null) throw 'Either the username or password is invalid'

    let pw = user.password

    let match = await bcrypt.compare(password,pw)

    if(match == false) throw'Either the username or password is invalid'
    
    let obj = {authenticated: true}

    return obj
}

// async function main(){
//     try{
//         const safrronLounge = await createUser("Pinkk","Thealokit") 
//         console.log(safrronLounge);
//     }
//     catch (e){
//         console.log(e)
//     }
// }
// main()

module.exports={
    createUser,
    checkUser
}