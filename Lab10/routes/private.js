const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    //console.log(new Date().toUTCString(), req.method, req.originalUrl,'Authenticated user')
    
    let p = req.session.user;
    if (req.session.user){
        res.render('posts/private',{a:p});
    }
    
})

module.exports = router;