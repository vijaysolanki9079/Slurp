import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = import.meta.env.VITE_API_URL;
  const [token, setToken] = useState(null); // ✅ null initially (not empty string)
  const [food_list, setFoodList] = useState([]);

  // ---------------------------
  // ! Fetch Food List for admin panel 
  // ---------------------------
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        console.error("Failed to load food list:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // ---------------------------
  // ! Fetch Cart Data 
  // ---------------------------
  const fetchCart = async (savedToken) => {
    try {
      const res = await axios.get(`${url}/api/cart/get`, {
        headers: { token: savedToken || token },
      });
      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // ---------------------------
  // ! Load Token + Fetch Initial Data
  // ---------------------------
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchCart(savedToken);
    } else {
      setToken(""); // explicitly mark as logged-out
    }
    fetchFoodList();
  }, []);

  // ---------------------------
  // ! Keep Token in LocalStorage
  // ---------------------------
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // ---------------------------
  // ! Cart Handling
  // ---------------------------
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // ---------------------------
  // ! Clear Cart after Order
  // ---------------------------
  const clearCart = async () => {
    try {
      if (token) {
        await axios.post(`${url}/api/cart/clear`, {}, { headers: { token } }); // ✅ ask backend to clear
      }
    } catch (error) {
      console.error("Error clearing cart in backend:", error);
    }

    // ✅ clear frontend cart state
    setCartItems({});
  };


  const wakeUpServer = async () => {
    try {
      await axios.get(`${url}`);
      console.log("Backend awakened");
    } catch (error) {
      console.log("Wakeup ping failed");
    }
  };

  useEffect(() => {
    wakeUpServer();   // ⭐ add this

    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchCart(savedToken);
    } else {
      setToken("");
    }

    fetchFoodList();
  }, []);















  // ---------------------------
  // ! Logout
  // ---------------------------
  const logout = () => {
    setToken("");
    setCartItems({});
    localStorage.removeItem("token");
  };

  const [category, setCategory] = useState("All");

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    fetchFoodList,
    logout,
    clearCart,
    category,
    setCategory,
  };

  // ✅ Don’t render until token state is restored
  if (token === null) return null;

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
