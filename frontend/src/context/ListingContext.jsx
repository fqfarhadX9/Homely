import { useState } from "react";
import {ListingDataContext} from "./ListingDataContext";
import { AuthDataContext } from "./AuthDataContext";
import { useContext } from "react";
import axios from "axios";

const ListingContext = ({ children }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rent, setRent] = useState(0);
    const [city, setCity] = useState("");
    const [landmark, setLandmark] = useState("");
    const [category, setCategory] = useState("");
    const [frontendImage1, setFrontendImage1] = useState(null);
    const [frontendImage2, setFrontendImage2] = useState(null);
    const [frontendImage3, setFrontendImage3] = useState(null);
    const [backendImage1, setBackendImage1] = useState(null);
    const [backendImage2, setBackendImage2] = useState(null);
    const [backendImage3, setBackendImage3] = useState(null);

    const {serverUrl} = useContext(AuthDataContext);

    const handleAddListing = async () => {
       try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("rent", rent);
        formData.append("city", city);
        formData.append("landmark", landmark);
        formData.append("category", category);
        formData.append("image1", backendImage1);
        formData.append("image2", backendImage2);
        formData.append("image3", backendImage3);

        const response = await axios.post(`${serverUrl}/api/listing/add`, formData,
            {withCredentials: true,});
        console.log("Listing added:", response.data);
      } catch (error) {
        console.error("Error adding listing:", error);
      }
    }

    const value = {
        title,
        setTitle,
        description,
        setDescription,
        rent,
        setRent,
        city,
        setCity,
        landmark,
        setLandmark,
        category,
        setCategory,
        backendImage1,
        setBackendImage1,
        backendImage2,
        setBackendImage2,
        backendImage3,
        setBackendImage3,
        frontendImage1,
        setFrontendImage1,
        frontendImage2, 
        setFrontendImage2,
        frontendImage3,
        setFrontendImage3,
        handleAddListing,
    }
    return (
        <ListingDataContext.Provider value={value}>
            {children}
        </ListingDataContext.Provider>
    );
};

export default ListingContext;