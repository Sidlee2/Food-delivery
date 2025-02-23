import { createContext, useEffect, useState} from "react";
import { food_list } from "../assets/food del assets/frontend_assets/assets";


export const StoreContext=createContext(null)

const StoreContextProvider= (props) => {

    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("")
    //const [food_list,setFoodLList]

    const addToCart = (itemId) => {
        if(!cartItems[itemId]) {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else
        {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount =0;
        for(const item in cartItems)
            {
                if (cartItems[item]>0) {
                    let itemInfo = food_list.find((product) => product._id === item);
                    totalAmount += itemInfo.price*cartItems[item];       
                }
            }
            return totalAmount;
    }

    useEffect(()=>{ //so that on refreshing the page,user dont get log out
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;

/* when database would start
import { createContext, useEffect, useState} from "react";
import axios from "axios";

export const StoreContext=createContext(null)

const StoreContextProvider= (props) => {

    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("")
    const [food_list,setFoodLList] = useState([]); //this is to load food data from the database

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]) {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else
        {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token)
        {
            await axios.post(url+"/api/cart/add",{itemId},{header:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token)
        {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount =0;
        for(const item in cartItems)
            {
                if (cartItems[item]>0) {
                    let itemInfo = food_list.find((product) => product._id === item);
                    totalAmount += itemInfo.price*cartItems[item];       
                }
            }
            return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setFoodLList(response.data.data)
    }

    //to store the cart data even after we refresh the page
    const loadCartData = async(token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
        }

    useEffect(()=>{ //so that on refreshing the page,user dont get log out
        async function loadData(){
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                // here we'll call this loadCartData function whenever the page is reloaded
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
*/