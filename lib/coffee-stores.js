import axios from 'axios'
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
});

const getPhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30
  });
  
  const unsplashUrls = photos.response.results.map(result => result.urls["small"]);
  return unsplashUrls;
}

export const getStoresData = async (latlong, limit, query) => {

  const photos = await getPhotos();

  const stores = await axios.get(`https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`,{
      headers: {
        "Authorization": `${process.env.NEXT_PUBLIC_FRQS_KEY}`
      }
  });

  return stores.data.results.map((store, index) => {
    return{
      id: store.fsq_id,
      location: store.location,
      imgUrl: photos.length > 0 ? photos[index] : "https://static.wikia.nocookie.net/ragefaces/images/2/29/Are_you_fucking_kidding_me.jpg/revision/latest?cb=20120616164422&path-prefix=es",
      name: store.name,
    }
  });
}