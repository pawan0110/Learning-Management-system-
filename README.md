Below is a **clean, professional GitHub README** tailored for your **Codenex LMS** project. You can copy-paste this directly into your `README.md`.

---

# Codenex LMS 🎓

A full-stack Learning Management System (LMS) designed to manage courses, users, and payments with a modern MERN-based architecture.

🔗 **Live Demo:** [https://codenex.vercel.app/](https://codenex.vercel.app/)

---

## 🚀 Features

* User authentication and authorization using **JWT & cookies**
* Role-based access control for **Admin and Learners**
* Course creation, publishing, enrollment, and management
* Lecture and video management with **file uploads**
* Secure payment integration using **Razorpay**
* RESTful APIs for scalable backend operations
* Fully deployed on cloud platforms

---

## 🛠 Tech Stack

**Frontend**

* React (Vite)
* Redux Toolkit
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Multer (file uploads)

**Payments**

* Razorpay Payment Gateway

**Deployment**

* Frontend: **Vercel**
* Backend: **Render**
* Database: **MongoDB Atlas**

---

## 📁 Core Modules

* **Authentication:** Signup, Login, Logout, Protected Routes
* **Admin Panel:** Create & manage courses and lectures
* **Course Management:** Publish, enroll, and view courses
* **Video Handling:** Upload and manage lecture videos
* **Payments:** Order creation and enrollment confirmation
* **User Profile:** View enrolled courses and account details

---

## ⚙️ Environment Variables

Create a `.env` file in the backend directory and add:

```env
PORT=
JWT_SECRET=""
EMAIL = ""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
GEMINI_API_KEY = ""
MONGODB_URL=""
EMAIL_USER = ""
EMAIL_PASS = ""
CLOUDINARY_API_SECRET=""
RAZORPAY_KEY_ID = ""
RAZORPAY_KEY_SECRET = ""
```


Create a `.env` file in the backend directory and add:

```env
VITE_FIREBASE_APIKEY=""
VITE_RAZORPAY_KEY_ID = ""
```




## 🧑‍💻 Installation & Setup

### Clone the repository

```bash
git clone https://github.com/pawan0110/Learning-Management-system
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```


## 🤝 Contributing

Contributions are welcome. Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project is for educational and portfolio purposes.


