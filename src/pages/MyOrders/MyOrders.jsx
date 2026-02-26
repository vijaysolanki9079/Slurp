import React, { useContext, useEffect, useState } from "react";
import './MyOrders.css';
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user-specific orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/userorders`, {
        headers: { token },
      });

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message || "Failed to fetch your orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Error loading your orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
      toast.error("Please login to view your orders!");
    }
  }, [token]);

  if (loading) {
    return (
      <div className="my-orders">
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">You haven’t placed any orders yet.</p>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                <span
                  className={`status ${
                    order.status === "Delivered"
                      ? "delivered"
                      : order.status === "Cancelled"
                      ? "cancelled"
                      : "processing"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="order-details">
                <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                <p><strong>Total Amount:</strong> ${order.amount.toFixed(2)}</p>
              </div>

              <div className="order-items">
                <h4>Items Ordered:</h4>
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="order-address">
                <h4>Delivery Address:</h4>
                <p>{order.address.fullName}</p>
                <p>{order.address.street}, {order.address.city}</p>
                <p>{order.address.state} - {order.address.zipCode}</p>
                <p>{order.address.country}</p>
                <p>📞 {order.address.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
