import { createContext, useState } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({children}) => {

    const [latLong, setLatLong] = useState("");
    const [coffeeStores, setCoffeeStores] = useState([]);

    return(
        <StoreContext.Provider value={{
            latLong,
            coffeeStores,
            setLatLong,
            setCoffeeStores
        }}>
            {children}
        </StoreContext.Provider>    
    )
}

export default StoreContext;