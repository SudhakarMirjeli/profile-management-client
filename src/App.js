import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileForm from "./components/UserProfileForm";
import ProfileList from "./components/UserProfileList";
import React, {  useState } from "react";
import AuthCallback from "./components/AuthCallback"


function App() {
 
  const [profiles, setProfiles] = useState([]); // Store profiles

  // Function to handle form submission
  const handleProfileSubmit = (profileData) => {
    console.log("Profile Submitted:", profileData);
    setProfiles([...profiles, { id: Date.now(), ...profileData }]);
  };

  return (
    <Router>
      <Routes>
        {/* Pass the function when rendering ProfileForm */}
        <Route path="/" element={<ProfileList profiles={profiles} />} />
        <Route path="/create-profile" element={<ProfileForm onSubmit={handleProfileSubmit} />} />
        <Route path="/edit-profile/:id" element={<ProfileForm onSubmit={handleProfileSubmit} />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
};

export default App;
