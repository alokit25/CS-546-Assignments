const characterRoutes = require('./characters');
const searchRoutes = require('./search')
const path = require('path')

const constructorMethod = (app) => {
    app.use('/characters',characterRoutes);
    app.use('/',searchRoutes)
    //app.get('/',(req,res) => {
        //res.sendFile(path.resolve('static/form.html'))
    //})
    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;