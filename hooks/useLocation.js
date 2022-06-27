import { useState } from "react";
import { flushSync } from "react-dom";

const useTrackLocation = () => {
    const[locationErrorMsg, setLocationErrorMsg] = useState("");
    const[latLong, setLatLong] = useState("");
    const[loading, setLoading] = useState(false);
    
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLatLong(`${latitude},${longitude}`);
        setLocationErrorMsg("");
        setLoading(false);
    }
    const error = () => {
        setLocationErrorMsg("Unable to get your location :(");
        setLatLong("");
        setLoading(false);
    }

    const handleTrackLocation = () => {
        setLoading(true)
        if(!navigator.geolocation){
            setLocationErrorMsg("Sorry, your browser doesnt want you to use geolocation :(")
            setLoading(false);
        } else{
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return{
        latLong,
        handleTrackLocation,
        locationErrorMsg,
        loading
    }
};

export default useTrackLocation;