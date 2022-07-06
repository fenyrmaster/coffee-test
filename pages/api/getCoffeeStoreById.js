import { findRecordByFilter } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
    const { id } = req.query;

    try{
        if(id){
            const data = await findRecordByFilter(id);
            if(data.length > 0){
                res.status(200).json({
                    status: "success",
                    meesage: "Store found",
                    store: data[0]
                });
            } else{
                res.status(400).json({ message: "Store not found, you probably added an invalid Id" })
            }
        } else{
            res.status(400).json({ message: "Id could not be found" })
        }
    } catch(error){
        res.status(500).json({ message: "Something went wrong", error })
    }
} 

export default getCoffeeStoreById;