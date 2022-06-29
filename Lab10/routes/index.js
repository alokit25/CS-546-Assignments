const userRoutes = require('./users');
const privateRoutes = require('./private')
const path = require('path')


const constructorMethod = (app) => {
    app.use('/',userRoutes);
    app.use('/private',privateRoutes)
    //app.get('/',(req,res) => {
        //res.sendFile(path.resolve('static/form.html'))
    //})
    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;