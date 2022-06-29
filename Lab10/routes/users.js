const express = require('express');
const router = express.Router();
//const data = require('../data');
//const usersData = data.c
//const usersData = data.users
const data = require('../data/users')

router.get('/',function(req,res){
    //console.log(new Date().toUTCString(), req.method, req.originalUrl,'Non-Authenticated user')
    if (req.session.user) {
        res.redirect('/private');
    } else {
        res.render('posts/form');
    }  
})

router.get('/signup',function(req,res){
    //console.log(new Date().toUTCString(), req.method, req.originalUrl,'Non-Authenticated user')
    if (req.session.user) {
        res.redirect('/private');
    } else{
        res.render('posts/signupform');
    }
    
})


router.post('/signup',async(req,res)=>{
    const details = req.body

    if(!details){
        res.status(400).render('posts/signupform',{ error: 'You must provide username and password to signup'});
        return;
    }
    if(!details.username){
        res.status(400).render('posts/signupform',{ error: 'You must provide username'});
        return;
    }
    
    if(typeof details.username != 'string'){
        res.status(400).render('posts/signupform',{ error: 'Username must be of string type'});
        return;
    }
    if(details.username.length<4){
        res.status(400).render('posts/signupform',{ error: 'Username must be at least 4 characters long'});
        return;
    }
    let usernameCheck = /^[a-zA-Z0-9]+$/.test(details.username)
    if(usernameCheck == false){
        res.status(400).render('posts/signupform',{ error: 'Username should not contain any spaces and contain only alphanumeric characters'});
        return;
    }
    if(!details.password){
        res.status(400).render('posts/signupform',{ error: 'You must provide password'});
        return;
    }
    
    if(typeof details.password != 'string'){
        res.status(400).render('posts/signupform',{ error: 'Password must be of string type'});
        return;
    }
    if(details.password.length<6){
        res.status(400).render('posts/signupform',{ error: 'Password must be at least 6 characters long'});
        return;
    }
    let passwordCheck = /\s/.test(details.password)
    if(passwordCheck == true){
        res.status(400).render('posts/signupform',{ error: 'Password must not contain any spaces'});
        return;
    }

    try{
        const newR = await data.createUser(
            details.username,
            details.password
        );
        let obj = {userInserted:true}
        if(newR.userInserted == obj.userInserted){
            //res.status(200).render('posts/form');
            res.redirect('/')
        }
        else{
            res.status(500).render('posts/signupform',{error: 'Internal Server Error'});
        }
    }
    catch(e){
        res.status(400).render('posts/signupform',{error: e});
    }       

})


router.post('/login',async(req,res)=>{
    const details = req.body

    if(!details){
        res.status(400).render('posts/form',{ error: 'You must provide username and password to signup'});
        return;
    }
    if(!details.username){
        res.status(400).render('posts/form',{ error: 'You must provide username'});
        return;
    }
    
    if(typeof details.username != 'string'){
        res.status(400).render('posts/form',{ error: 'Username must be of string type'});
        return;
    }
    if(details.username.length<4){
        res.status(400).render('posts/form',{ error: 'Username must be at least 4 characters long'});
        return;
    }
    let usernameCheck = /^[a-zA-Z0-9]+$/.test(details.username)
    if(usernameCheck == false){
        res.status(400).render('posts/form',{ error: 'Username should not contain any spaces and contain only alphanumeric characters'});
        return;
    }
    if(!details.password){
        res.status(400).render('posts/form',{ error: 'You must provide password'});
        return;
    }
    
    if(typeof details.password != 'string'){
        res.status(400).render('posts/form',{ error: 'Password must be of string type'});
        return;
    }
    if(details.password.length<6){
        res.status(400).render('posts/form',{ error: 'Password must be at least 6 characters long'});
        return;
    }
    let passwordCheck = /\s/.test(details.password)
    if(passwordCheck == true){
        res.status(400).render('posts/form',{ error: 'Password must not contain any spaces'});
        return;
    }

    try{
        const newR = await data.checkUser(
            details.username,
            details.password
        );
        let obj = {authenticated: true}
        req.session.user = details.username
        
        if(newR.authenticated == obj.authenticated){
            //res.render('posts/private',{a:details.username});
            res.redirect('/private');
        }
        else{
            res.status(400).render('posts/form',{error: 'You must provide a valid username/password'});
        }
    }
    catch(e){
        res.status(400).render('posts/form',{ error: e})
    }
})



router.get('/logout',function(req,res){
    //console.log(new Date().toUTCString(), req.method, req.originalUrl,'Non-Authenticated user')
    req.session.destroy();
    res.render('posts/logout');
})

module.exports = router;