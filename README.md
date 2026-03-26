# 🚀 Connexa – Full Stack Social Platform

Connexa is a **full-stack social media platform** built using the MERN stack. It enables users to create, share, and interact with content while implementing **secure authentication, AWS S3 media handling, and role-based access control (RBAC) with an admin dashboard**.

---

## 🌟 Features

### 👤 User Features
- 🔐 JWT Authentication (cookie-based)
- 📝 Create, edit, and delete posts
- 🖼️ Image upload using AWS S3
- ❤️ Like / Unlike posts
- 💬 Comment on posts
- 📰 Personalized feed
- 👤 View user profiles

---

### 🛡️ Admin Features (RBAC)
- Role-Based Access Control (Admin/User)
- 📊 Admin Dashboard
- 👥 Manage users (view/delete/block)
- 🗑️ Moderate posts
- 🔒 Protected admin routes

---

## 🏗️ Tech Stack

### Frontend
- React 19  
- Tailwind CSS  
- Redux Toolkit  
- Axios (`withCredentials: true`)  

### Backend
- Node.js  
- Express.js  
- MongoDB (Mongoose)  

### Integrations
- AWS S3 (image storage)  
- Multer (file upload handling)  
- JWT Authentication  

---

## 🔐 Authentication & Security
- JWT stored in HTTP-only cookies  
- Protected routes (frontend + backend)  
- RBAC for admin-level access  
- Secure API communication  

---

## 📦 Functionalities

### 🧑‍💻 User Actions
- Register / Login / Logout  
- Create posts with images  
- Like & comment on posts  
- Edit / delete own posts  
- View other users' profiles  

### 🛠️ Admin Actions
- Access admin dashboard  
- Manage users  
- Delete inappropriate posts  
- Control platform activity  

---

## ☁️ AWS S3 Integration
- Secure image upload to AWS S3  
- Backend handles upload using Multer  
- Cloud-based storage for scalability  

---

## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/VivekJadhav2001/Connexa.git

cd frontend && npm install
cd backend && npm install

### .env
##backend

PORT=3000
MONGODB_URI="mongodb+srv://vivekjadhav200127_db_user:Apdu8E1aJX9gzfOZ@cluster0.xzzrrlv.mongodb.net/AccioConnect"
JWT_SECRET="c29TJTBv9tcf0L3m7YRh0SxOkhbKblbZK7W0jIcr0pbiGkFXx8KdpbkUciY1IzRW"
EXPIRE_TOKEN="7d"
ADMIN_SECRET="myAdmin@5ken"

AWS_ACCESS_KEY_ID="AKIA5OBALN6G52VOWT56"
AWS_SECRET_ACCESS_KEY="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"
AWS_REGION="ap-south-2"
AWS_BUCKET_NAME="connexa-bucket"

FRONTEND_URL="http://localhost:5173"

EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="vivek.jadhav20010927@gmail.com"
EMAIL_PASS="ndwk tvcp lial dimd"

##frontend
VITE_BACKEND_API_V1="http://localhost:3000"

VITE_LOGO_URL="https://influential-teal-twkrht8r6d.edgeone.app/logo.png"
VITE_S3_BASE_URL=https://bucket-connexa.s3.ap-south-2.amazonaws.com/
VITE_APP_BUCKET_NAME="connexa-bucket"
VITE_APP_AWS_REGION="ap-south-2"

VITE_ADMIN_TOKEN="connexa-admin-token"

### 🔑 Demo Credentials
Email: verma.divyansh0@gmail.com
Password: Password!123


### 🎥 Demo
Video 🎥 => https://drive.google.com/file/d/1e5UV7G69bgll82DVKhmpsIrqMgeSZ6oC/view?usp=sharing
Image 📷 = > https://drive.google.com/file/d/1Nu0_0Ob3iyXJEhdyGYgks5WsnccwqObw/view?usp=sharing

