const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE);

const table = base("Coffee-stores");

const createCoffeeStore = async (req, res) => {
    if(req.method === "POST"){
        const findRecord = await table.select({
            filterByFormula: `id=0`
        }).firstPage();

        if(findRecord.length > 0){
            const data = findRecord.map(record => {
                return record.fields
            })
            res.status(200).json({
                status: "success",
                meesage: "Store found",
                data: data[0]
            })
        } else{
            res.status(201).json({
                message: "Couldnt find the damn store, creating..."
            })
        }
    }
}

export default createCoffeeStore;