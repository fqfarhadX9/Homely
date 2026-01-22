import { useEffect, useState } from "react";
import {ListingDataContext} from "./ListingDataContext";
import { AuthDataContext } from "./AuthDataContext";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListingContext = ({ children }) => {
    const navigate = useNavigate();
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
    const [adding, setAdding] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleteting, setDeleting] = useState(false);
    const [listingData, setListingData] = useState([]);
    const [newListingData, setNewListingData] = useState([]);
    const [cardDetails, setCardDetails] = useState(null);

    const {serverUrl} = useContext(AuthDataContext);

    const handleAddListing = async () => {
        setAdding(true);
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
        navigate('/');
        setTitle("");
        setDescription("");
        setRent(0);
        setCity("");
        setLandmark("");
        setCategory("");
        setFrontendImage1(null);
        setFrontendImage2(null);
        setFrontendImage3(null);
        setBackendImage1(null);
        setBackendImage2(null);
        setBackendImage3(null);
        setAdding(false);
      } catch (error) {
        setAdding(false);
        console.error("Error adding listing:", error);
      }
    }

    const getListings = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/listing/get`, {withCredentials: true,});
        setListingData(response.data.listings);
        setNewListingData(response.data.listings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    const handleViewCard = async (id) => {
      try {
        const response = await axios.get(`${serverUrl}/api/listing/findlistingbyid/${id}`, {withCredentials: true,});
        console.log("Listing fetched by ID:", response.data.listing);
        setCardDetails(response.data.listing);
        navigate('/viewcard');
      } catch (error) {
        console.error("Error fetching listing by ID:", error);
      }
    }

    useEffect(() => {
      getListings();
    }, [adding, updating, deleteting]);

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
        adding,setAdding,
        listingData, 
        setListingData,
        newListingData,
        setNewListingData,
        handleViewCard,
        cardDetails,setCardDetails,
        updating,setUpdating,
        deleteting, setDeleting,
        getListings
    }
    return (
        <ListingDataContext.Provider value={value}>
            {children}
        </ListingDataContext.Provider>
    );
};

export default ListingContext;