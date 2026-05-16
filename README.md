# Student Management System

A full-stack web application for managing student registrations with 2-level data encryption.

## Tech Stack Used
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, React Router, React Hot Toast
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (Mongoose)
- **Encryption**: CryptoJS (AES Encryption)

## Setup Instructions

### 1. Prerequisites
- Node.js installed (v18+ recommended)
- MongoDB Server running locally (This project uses a local database connection)

### 2. Backend Setup
```bash
cd server
npm install
# Ensure you have a .env file with your MONGO_URI and PORT
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## How Encryption is Implemented

This project implements a secure **2-level encryption** process to protect sensitive student data.

1. **Level 1 (Frontend to Backend)**: 
   - When a user submits a form (Registration or Update), the data is encrypted on the frontend using AES (`CryptoJS`) with a **Frontend Secret Key**.
   - This ensures that data is protected while traveling from the browser to the server.

2. **Level 2 (Backend to Database)**: 
   - When the backend receives the data, it decrypts the frontend layer and applies a **second layer of AES encryption** using a unique **Backend Secret Key** before storing it in MongoDB.
   - This ensures data is "encrypted at rest," meaning even if the database is accessed directly, the data remains unreadable.

3. **Data Retrieval (Fetch)**:
   - When fetching students, the backend decrypts the data using the **Backend Secret Key** and sends the result to the frontend.
   - This multi-layer approach ensures that sensitive information is never handled in plain text across any part of the system architecture.

## Features
- **Authentication**: Secure login validation where credentials are checked against registered records.
- **Full CRUD Operations**: 
  - **Create**: Register new students with encrypted payloads.
  - **Read**: View a comprehensive list of students in a clean data table.
  - **Update**: Edit student details via a secure popup modal.
  - **Delete**: Remove student records with a confirmation prompt.
- **Modern UI**: A clean, professional, and responsive interface built with Tailwind CSS.
- **Notifications**: Real-time feedback using `react-hot-toast` for all actions.
