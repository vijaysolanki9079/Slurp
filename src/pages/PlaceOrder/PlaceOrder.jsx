import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, food_list, cartItems, token, url, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  // Redirect if cart is empty or user not logged in
  useEffect(() => {
    if (!token) {
      toast.error("Please login to place order");
      navigate("/cart");
    }
    if (getTotalCartAmount() === 0) {
      toast.error("Your cart is empty!");
      navigate("/cart");
    }
  }, [token]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, street, city, state, zipcode, country, phone } = data;

    // Check each field individually and show specific message
    if (!firstName) {
      toast.error("Please enter your First Name!");
      return false;
    }
    if (!lastName) {
      toast.error("Please enter your Last Name!");
      return false;
    }
    if (!email) {
      toast.error("Please enter your Email Address!");
      return false;
    }
    if (!street) {
      toast.error("Please enter your Street Address!");
      return false;
    }
    if (!city) {
      toast.error("Please enter your City!");
      return false;
    }
    if (!state) {
      toast.error("Please enter your State!");
      return false;
    }
    if (!zipcode) {
      toast.error("Please enter your Zip Code!");
      return false;
    }
    if (!country) {
      toast.error("Please enter your Country!");
      return false;
    }
    if (!phone) {
      toast.error("Please enter your Phone Number!");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be exactly 10 digits!");
      return false;
    }

    return true;
  };

  const handleProceedToPayment = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if Razorpay SDK is loaded
    if (!window.Razorpay) {
      toast.error("Payment system not loaded. Please refresh the page!");
      return;
    }

    setLoading(true);

    // Build order items from cart
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id]
        });
      }
    });

    if (orderItems.length === 0) {
      toast.error("Your cart is empty!");
      setLoading(false);
      return;
    }

    const totalAmount = getTotalCartAmount() + 2.5;

    const orderData = {
      items: orderItems,
      amount: totalAmount,
      address: {
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipcode,
        country: data.country,
      },
    };

    try {
      // 1️⃣ Create order on backend
      const res = await axios.post(`${url}/api/order/create`, orderData, {
        headers: { token },
      });

      if (!res.data.success) {
        toast.error(res.data.message || "Order creation failed!");
        setLoading(false);
        return;
      }

      const { key, amount, currency, orderId, newOrderId } = res.data;

      // 2️⃣ Configure Razorpay options
      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: "FeastHut",
        description: "Food Order Payment",
        order_id: orderId,
        handler: async (response) => {
          // 3️⃣ Payment successful - verify on backend
          try {
            const verifyRes = await axios.post(`${url}/api/order/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: newOrderId,
            });

            if (verifyRes.data.success) {
              toast.success("Payment Successful! 🎉");
              // Redirect to home 
              await clearCart();

              setTimeout(() => {
                navigate("/");
              }, 1500);
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Error verifying payment!");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#F37254",
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled");
            setLoading(false);
          }
        }
      };

      // 4️⃣ Open Razorpay payment modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.error("Order creation error:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="place-order page-transition">
      <div className="place-order-left">
        <h2>Delivery Information</h2>
        <form className="place-order-form" onSubmit={handleProceedToPayment}>
          <div className="multi-fields">
            <input
              name="firstName"
              value={data.firstName}
              placeholder="First Name"
              onChange={onChangeHandler}
              required
            />
            <input
              name="lastName"
              value={data.lastName}
              placeholder="Last Name"
              onChange={onChangeHandler}
              required
            />
          </div>
          <input
            name="email"
            type="email"
            value={data.email}
            placeholder="Email Address"
            onChange={onChangeHandler}
            required
          />
          <input
            name="street"
            value={data.street}
            placeholder="Street Address"
            onChange={onChangeHandler}
            required
          />
          <div className="multi-fields">
            <input
              name="city"
              value={data.city}
              placeholder="City"
              onChange={onChangeHandler}
              required
            />
            <input
              name="state"
              value={data.state}
              placeholder="State"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="multi-fields">
            <input
              name="zipcode"
              value={data.zipcode}
              placeholder="Zip Code"
              onChange={onChangeHandler}
              required
            />
            <input
              name="country"
              value={data.country}
              placeholder="Country"
              onChange={onChangeHandler}
              required
            />
          </div>
          <input
            name="phone"
            type="tel"
            value={data.phone}
            placeholder="Phone (10 digits)"
            onChange={onChangeHandler}
            maxLength="10"
            required
          />
        </form>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? "0" : "2.5"}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? "0.00" : (getTotalCartAmount() + 2.5).toFixed(2)}</b>
            </div>
          </div>
          <button
            onClick={handleProceedToPayment}
            className="checkout-btn"
            disabled={loading}
          >
            {loading ? "PROCESSING..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;