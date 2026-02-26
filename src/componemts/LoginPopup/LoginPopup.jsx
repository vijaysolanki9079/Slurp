import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)

  const [currState, setCurrState] = useState("Sign Up")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  // ✅ Lock scroll when popup is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  }

  // ✅ Handle Login / Register
  const onLogin = async (event) => {
    event.preventDefault();

    try {
      let newUrl = url;
      if (currState === "Login") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }

      console.log("📡 Sending data to:", newUrl);
      console.log("🧾 Payload:", data);

      const response = await axios.post(newUrl, data);

      console.log("✅ Response:", response.data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false); // ✅ Close popup
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Something went wrong. Check console for details.");
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input
              name='name'
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder='Your Name'
              required
            />
          )}
          <input
            name='email'
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder='Your Email'
            required
          />
          <input
            name='password'
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder='Password'
            required
          />
        </div>

        <button type='submit'>
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        )}
      </form>
    </div>
  )
}

export default LoginPopup
