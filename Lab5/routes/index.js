const peopleRoutes = require ('./people');
const stockRoutes = require ('./stocks');
const exchange = require("./exchangeApi")


const constructorMethod = (app) => {
    app.use('/people', peopleRoutes);
    app.use('/stocks', stockRoutes);
    app.use("/exchanges", exchange);
    app.use('*', (req, res) => {
      res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;