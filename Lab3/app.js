const people = require("./people");
const stock = require("./stocks")

async function main(){
    try{
        const peopledata = await people.manipulateSsn();
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameStreet("Sutherland", "Point");
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday(09, 25);
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockData = await stock.listShareholders();
        console.log("\n")
        console.log(stockData)
    }catch(e){
        console.log (e);
    }
    try{
        const stockData = await stock.topShareholder('Aeglea BioTherapeutics, Inc.');
        console.log("\n")
        console.log(stockData)
    }catch(e){
        console.log (e);
    }
    try{
        const stockData = await stock.listStocks("Grenville", "Pawelke" );
        console.log("\n")
        console.log(stockData)
    }catch(e){
        console.log (e);
    }
    try{
        const stockData = await stock.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log("\n")
        console.log(stockData)
    }catch(e){
        console.log (e);
    }
}
main()