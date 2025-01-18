import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [addCart, setAddCart] = useState({});
    const navigate = useNavigate();


    const addToCart = async (currElmId, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        const cartData = structuredClone(addCart);

        if (cartData[currElmId]) {
            if (cartData[currElmId][size]) {
                cartData[currElmId][size] += 1;
            }
            else {
                cartData[currElmId][size] = 1;
            }
        }
        else {
            cartData[currElmId] = {};
            cartData[currElmId][size] = 1;
        }
        setAddCart(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in addCart) {
            for (const item in addCart[items]) {
                try {
                    if (addCart[items][item] > 0) {
                        totalCount += addCart[items][item]
                    }
                } catch (error) {
                    console.log(error);
    
                }
    
            }
        }
        return totalCount;
    }

    const updateQuantityData = async(currElmId, size, quantity) => {
        let cartData = structuredClone(addCart);
        cartData[currElmId][size] = quantity;

        setAddCart(cartData);
    }

    const totalCartAmount = () => {
        let totalAmount = 0;
        for(const items in addCart){
            let iteminfo = products.find((product) => product._id === items)
            for(const item in addCart[items]){
                try {
                    if(addCart[items][item] > 0){
                        totalAmount += iteminfo.price * addCart[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }
const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    addCart,
    getCartCount,
    updateQuantityData,
    totalCartAmount,
    navigate,
}
return (
    <ShopContext.Provider value={value}>
        {children}
    </ShopContext.Provider>
)
}

export default ShopContextProvider;