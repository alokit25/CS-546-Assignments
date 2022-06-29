const express = require ('express');
const app = express()
const static = express.static(__dirname + '/public');
const session = require('express-session');

const configRoutes = require('./routes')
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(
    session({
      name: 'AuthCookie',
      secret: "This is a secret.. shhh don't tell anyone",
      saveUninitialized: true,
      resave: false,
    })
);

app.use('/private', (req, res, next) => {
    //console.log(req.session.user);
    if (!req.session.user) {
        return res.status(403).render('posts/errors',{e:'You are not logged in. Please log in to view the contents of this page'})
        //return res.redirect('/');
    } else {
      next();
    }
});

app.use(async(req,res,next)=>{
    let date = new Date().toUTCString();
    let method = req.method
    let route = req.originalUrl
    let authenticated = '';
    if(req.session.user){
        console.log(date,method,route,'Authenticated User')
    }
    else{
        console.log(date,method,route,'Non-Authenticated User')
        
    }
    next();
})




// app.use(async(req, res, next) => {
//     if (req.session.user) {
//       return res.redirect('/private');
//     } else {
//       //here I',m just manually setting the req.method to post since it's usually coming from a form
//       //req.method = 'POST';
//       next();
//     }
// })


configRoutes(app);

app.listen(3000, ()=>{
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});