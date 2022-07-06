const axios = require("axios");

const getStoresLocation = async (req, res) => {
    try{
        const { value, latlong, limit } = req.query;
        const stores = await axios.get(`https://api.foursquare.com/v3/places/search?query=${value}&ll=${latlong}&limit=${limit}`,{
            headers: {
              "Authorization": `${process.env.NEXT_PUBLIC_FRQS_KEY}`
            }
        });
        res.status(200).json({
            stores: stores.data.results
        })
    } catch(error){
        
    }

}

export default getStoresLocation;