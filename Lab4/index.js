const connection = require('./config/mongoConnection');
const restaurants = require('./data/restaurants');

async function main(){
    try{
        const pizzaHut = await restaurants.create("Pizza Hut","New York City, New York", "123-456-7890", "http://www.pizzahut.com", "$$", ["Cuban", "Italian"], 3, {dineIn: true, takeOut: true, delivery: true})
        console.log(pizzaHut);
    }
    catch(e){
        console.log(e);
    }
    try{
        const tacoBell = await restaurants.create("Taco Bell","Jersey City, New Jersey","145-567-3344","http://www.tacobell.com", "$$$", ["Cuban", "Italian"], 4, {dineIn: true, takeOut: true, delivery: true})
    }
    catch(e){
        console.log(e)
    }
    try{
        const all = await restaurants.getAll()
        console.log(all)
    }
    catch(e){
        console.log(e)
    }
    try{
        const dominos = await restaurants.create("Dominos Pizza","Hoboken, New Jersey","125-597-3940","http://www.dominos.com", "$$$", ["Cuban", "Italian"], 5, {dineIn: true, takeOut: true, delivery: true});
        console.log(dominos);
    }
    catch(e){
        console.log(e)
    }
    try{
        const getId = await restaurants.getAll();
        let id = getId[0]._id.toString()
        
        const rename = await restaurants.rename(id,"http://www.pizzas.com")
        console.log(rename);
    }
    catch(e){
        console.log(e)
    }
    try{
        const getId = await restaurants.getAll();
        let id = getId[1]._id.toString()
        
        const remove = await restaurants.remove(id)
    }
    catch(e){
        console.log(e)
    }
    try{
        const all = await restaurants.getAll();
        console.log(all);
    }
    catch(e){
        console.log(e)
    }
    try{
        const mcDonalds = await restaurants.create("McDonald's", "New York",123-567-8888,"http.www.com");
    }
    catch(e){
        console.log(e)
    }
    try{
        const remove = await restaurants.remove('688930gg34n');
    }
    catch(e){
        console.log(e)
    }
    try{
        const rename = await restaurants.rename('8888999fjda0');
    }
    catch(e){
        console.log(e)
    }
    try{
        const getId = await restaurants.getAll();
        let id = getId[1]._id.toString()
        const rename = await restaurants.rename(id,"http:www.rename.com");
    }
    catch(e){
        console.log(e)
    }
    try{
        const get = await restaurants.get('898989ggt5788r7');
    }
    catch(e){
        console.log(e)
    }
    const db = await connection();
    await db.serverConfig.close();
    //console.log('Done!');
}
main();