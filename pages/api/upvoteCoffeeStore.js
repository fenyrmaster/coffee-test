import { findRecordByFilter, table } from "../../lib/airtable";

const upvoteCoffeeStore = async (req, res) => {
    if(req.method === "PATCH"){
        const { id, votes } = req.body;
        try{
            if(id){
                const data = await findRecordByFilter(id);
                if(data.length > 0){
                    const freshData = await table.update([
                        {
                            id: data[0].recordId,
                            fields: {
                                votes: parseInt(votes)
                            },
                        },
                    ]);
                    res.status(200).json({
                        status: "success",
                        meesage: "Store votes updated",
                        store: freshData
                    });
                } else{
                    res.status(400).json({ message: "Store not found, you probably added an invalid Id" })
                }
            } else{
                res.status(400).json({ message: "Id could not be found" })
            }
        } catch(error){
            console.log(error);
            res.status(500).json({ message: "Something went wrong", error })
        }
    } else{
        res.status(400).json({ message: "Invalid method" })
    }

}

export default upvoteCoffeeStore;