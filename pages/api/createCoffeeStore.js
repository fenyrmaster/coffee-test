import { table, findRecord, findRecordByFilter } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
    if(req.method === "POST"){
        const { id, name, address, neighbourhood, votes, imgUrl } = req.body;
        try{
            if(id){
                const data = await findRecordByFilter(id);
                if(data.length > 0){
                    res.status(200).json({
                        status: "success",
                        meesage: "Store found",
                        store: data[0]
                    });
                }
                else{
                    if(id && name){
                        const store = await table.create([
                            {
                                fields: {
                                    id,
                                    name,
                                    neighbourhood,
                                    address,
                                    votes,
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