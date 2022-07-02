import { table, findRecord } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
    if(req.method === "POST"){
        const { id, Name, Adress, Neighbourhood, Votes, imgUrl } = req.body;
        try{
            if(id){
                const records = await table.select({
                    filterByFormula: `id=${id}`
                }).firstPage();
        
                if(records.length > 0){
                    const data = findRecord(records)
                    res.status(200).json({
                        status: "success",
                        meesage: "Store found",
                        data: data[0]
                    })
                } else{
                    if(id && Name){
                        const store = await table.create([
                            {
                                fields: {
                                    id,
                                    Name,
                                    Neighbourhood,
                                    Adress,
                                    Votes,
                                    imgUrl
                                }
                            }
                        ]);
                        const data = findRecord(store);
                        res.status(201).json({
                            message: "Store created",
                            store: data[0]
                        })
                    } else{
                        res.status(400).json({ message: "Name is missing" })
                    }
                }
            } else{
                res.status(400).json({ message: "Id is required" })
            }
        }
        catch(error){
            console.log(error);
            res.json({ message: "Something went wrong", data: error });
        }
    }
}

export default createCoffeeStore;