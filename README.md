# 🏡 Homely – Airbnb‑Style Property Booking Platform

Homely is a full‑stack **Airbnb‑inspired booking application** where users can explore, book, and host properties such as villas, farmhouses, flats, cabins, and more. The platform focuses on clean UI, smooth user experience, and real‑world booking flows.

This project is built as a **learning + portfolio project**, showcasing real‑world MERN stack development, authentication, role‑based access, and scalable backend architecture.

---

## ✨ Features

### 👤 User Features

* User authentication (Signup / Login / Logout)
* Browse property listings
* Filter listings by category (Villa, Farm House, Pool House, Flat, PG, Cabin, Shops, etc.)
* Search listings by title, city, or landmark
* View listing details with images, price, and description
* Book a property
* View personal bookings

### 🏠 Host Features

* Become a host
* Add new property listings (step‑by‑step flow)
* Upload multiple images
* Select property category
* Set price, location, and description
* View own listings

### 🔐 Admin / Security

* JWT‑based authentication
* Protected routes for users and hosts
* Secure logout using cookies

### 🎨 UI / UX

* Airbnb‑style modern UI
* Responsive design (Desktop, Tablet, Mobile)
* Hover effects and smooth transitions
* Clean layout with intuitive navigation

---

## 🛠 Tech Stack

### Frontend

* **React.js**
* **React Router DOM**
* **Context API** (Global state management)
* **Tailwind CSS**
* **Axios**
* **React Icons**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**
* **Multer** (Image upload)
* **Cookie‑Parser**

---

## 📂 Project Structure

### Frontend

```
frontend/
├── components/
│   ├── Nav.jsx
│   ├── Card.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── ListingPage1.jsx
│   ├── ListingPage2.jsx
│   └── ListingPage3.jsx
├── context/
│   ├── AuthDataContext.jsx
│   ├── UserDataContext.jsx
│   └── ListingDataContext.jsx
├── App.jsx
└── main.jsx
```

### Backend

```
backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
│   └── db.js
├── server.js
└── .env
```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/homely.git
```

### 2️⃣ Backend setup

```
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend setup

```
cd frontend
npm install
npm run dev
```

---

## 🔄 Booking Flow

1. User logs in
2. Browses listings
3. Selects a property
4. Books the property
5. Booking appears in **My Bookings**

---

## 🧠 Learning Outcomes

* Real‑world MERN stack architecture
* Context API state management
* Authentication with JWT & cookies
* Image handling with Multer
* Role‑based UI rendering
* Responsive design with Tailwind CSS

---

## 📌 Future Enhancements

* Payment gateway integration
* Ratings & reviews
* Availability calendar
* Admin dashboard
* Map integration (Google Maps)
* Wishlist / Favorites

---

## 👨‍💻 Developer

**Farhad Qaunain**
Full‑Stack MERN Developer
Passionate about building scalable and user‑friendly web applications.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub — it really helps and motivates me!
