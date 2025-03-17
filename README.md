# Profile Management System

## 📌 Overview
The Profile Management System is a React-based web application that allows users to create, edit, and delete user profiles. It includes image upload functionality, where images are previewed and sent to the backend for storage in AWS S3.

## 🚀 Features
- Create and edit user profiles
- Upload and preview profile pictures
- Store profile data in a backend server
- Secure authentication using AWS Cognito
- Responsive UI with React Router integration

## 🛠️ Tech Stack
- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express, AWS Cognito, AWS S3
- **Database:** MongoDB Atlas
- **Authentication:** AWS Cognito

## 📂 Project Structure
```
/profile-management
│── /src
│ │── /components
│ │ │── UserProfileForm.js # Form for creating/editing profiles
│ │ │── UserProfileList.js # Displays list of profiles
│ │── App.js # Main application
│ │── index.js # React entry point
│── package.json
│── README.md
```

## 🛠️ Setup & Installation
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/SudhakarMirjeli/profile-management-client.git
cd profile-management-client
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

The app will run on `http://localhost:3000/`.

## 🔗 API Endpoints (Backend)
| Method | Endpoint | Description |
|--------|------------------------|-----------------------------|
| GET | `/profile/:id` | Fetch a user profile |
| POST | `/profile` | Create a new profile |
| PUT | `/profile/:id` | Update an existing profile |
| DELETE | `/profile/:id` | Delete a profile |

## 📌 Usage
### **1️⃣ Creating a Profile**
1. Navigate to `/create-profile`.
2. Fill in the form and upload a profile picture.
3. Click **Save Profile**.

### **2️⃣ Editing a Profile**
1. Click the **Edit** icon on a profile.
2. Navigate to `/edit-profile`
3. Update details and profile picture.
4. Click **Update Profile**.

### **3️⃣ Deleting a Profile**
1. Click the **Delete** button.
2. Confirm deletion.

## 🔐 Authentication with AWS Cognito
1. Users are redirected to AWS Cognito for authentication.
2. After login, Cognito returns an authorization code.
3. The frontend exchanges the code for an access token.
4. The token is used for API authentication.

## 🛠️ Future Enhancements
- Implement role-based access control
- Improve UI with Material-UI or Tailwind CSS
- Add pagination for large profile lists


### 🚀 Happy Coding!
