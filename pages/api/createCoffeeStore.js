const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE);

const table = base("Coffee-stores");

const createCoffeeStore = async (req, res) => {
    try{
        if(req.method === "POST"){
            const findRecord = await table.select({
                filterByFormula: `id=1254`
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
                const store = await table.create([
                    {
                        fields: {
                            id: "1254",
                            Name: "some name",
                            Neighbourhood: "Some neighbourhood",
                            Adress: "some adress",
                            Votes: 0,
                            imgUrl: "some img url"
                        }
                    }
                ]);
                res.status(201).json({
                    message: "Store created",
                    store: store[0].fields
                })
            }
        }
    } catch(error){
        console.log(error);
        res.json({ message: "Something went wrong", data: error });
    }

}

export default createCoffeeStore;