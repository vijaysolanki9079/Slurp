# 🍔 Slurp

**Savor the flavor. Experience the best dining from the comfort of your screen.**

[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)
![Node.js](https://img.shields.io/badge/Node.js-LTS-green)
![React](https://img.shields.io/badge/React-v18-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

Slurp is a premium, full-stack restaurant management and ordering platform. Designed for food lovers and restaurant owners alike, it offers a seamless experience from browsing the menu to placing an order.

---

## 🥗 Key Features

* **Dynamic Menu:** Real-time menu updates with categorized dishes (Appetizers, Mains, Desserts).
* **Smart Cart:** Easy-to-use shopping cart with live price calculations.
* **User Profiles:** Track delivery history.
* **Admin Dashboard:** Full control over menu items, pricing, and order management.
* **Responsive Design:** Looks great on mobile, tablet, and desktop.

---

## 🛠 Tech Stack

Built with the **MERN** stack for a buttery-smooth user experience:

* **Frontend:** React.js & Tailwind CSS (UI/UX)
* **Backend:** Node.js & Express.js (API Layer)
* **Database:** MongoDB (Menu & User Data)
* **Authentication:** JWT (Secure Login/Signup)

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/vijaysolanki9079/Slurp.git](https://github.com/vijaysolanki9079/Slurp.git)
cd Slurp
```

### 2. Configure Environment Variables
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_url
JWT_SECRET=your_secret_key
```

### 3. Install Dependencies
```bash
# Root and Backend
npm install

# Frontend
cd client
npm install
```

### 4. Install Dependencies
```bash
# Back in the root folder
npm run dev
```

## 📂 Project Structure
```bash
Slurp/
├── client/                # React Frontend (The Dining Room)
│   ├── src/
│   │   ├── components/    # Navbar, Footer, Food Cards
│   │   ├── pages/         # Home, Menu, Cart, Checkout
│   │   └── context/       # State management (Cart/Auth)
├── server/                # Node.js Backend (The Kitchen)
│   ├── models/            # Food & Order Schemas
│   ├── routes/            # API Endpoints
│   └── controllers/       # Order & Auth Logic
└── package.json           # Scripts & Dependencies
```

## 🍕 Future Enhancements
* [ ] Payment Integration: Stripe or Razorpay for seamless checkouts.
* [ ] Live Order Tracking: Real-time updates on food preparation.
* [ ] Loyalty Points: Reward regular customers with discounts.
* [ ] Multi-language Support: Let everyone "Slurp" in their own language.

## 🤝 Contributing
We welcome foodies and coders alike!

1. Fork the project.
2. Create your Feature Branch (git checkout -b feature/NewRecipe).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the LICENSE.md file for details.
