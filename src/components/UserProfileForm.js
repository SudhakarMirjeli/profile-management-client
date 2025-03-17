import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileForm = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate(); // Redirect after saving
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    profilePicture: null, // File object for backend upload
    profilePictureUrl: "", // URL for preview
  });
  

  // 🔹 Fetch profile details if editing
  useEffect(() => {
    if (id) {
      axios.get(`http://35.154.84.189:4001/profile/${id}`)
        .then((response) => {
          setProfile({
            name: response.data.data.name,
            email: response.data.data.email,
            address: response.data.data.address,
            profilePicture: null, // File will be chosen when updating
            profilePictureUrl: response.data.data.profilePictureUrl, // Show existing image
          });
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [id]);
  

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: file, // Store file for submission
        profilePictureUrl: URL.createObjectURL(file), // Temporary preview
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("address", profile.address);
  
    if (profile.profilePicture) {
      formData.append("profilePicture", profile.profilePicture); // Send file
    }
  
    try {
      if (id) {
        await axios.put(`http://35.154.84.189:4001/profile/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://35.154.84.189:4001/profile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
  
      alert("Profile saved successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    }
  };


  return (
    <div style={{ 
      maxWidth: "400px", 
      margin: "20px auto", 
      padding: "20px", 
      border: "1px solid #ddd", 
      borderRadius: "10px", 
      textAlign: "center", 
      backgroundColor: "#f9f9f9",
      boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ marginBottom: "20px", fontSize: "22px", color: "#333" }}>
        {id ? "Edit Profile" : "Create Profile"}
      </h2>
  
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
  
        {/* Profile Picture Preview */}
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          {profile.profilePictureUrl ? (
            <img 
              src={profile.profilePictureUrl} 
              alt="Profile Preview" 
              style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #ddd" }} 
            />
          ) : (
            <div 
              style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", color: "#666", fontSize: "12px" }}
            >
              No Image
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            style={{ marginTop: "10px", padding: "8px", borderRadius: "5px", width: "100%" }} 
          />
        </div>
  
        {/* Form Fields */}
        <input 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          value={profile.name} 
          onChange={handleChange} 
          required 
          style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc", marginRight:"5px" }}
        />
  
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={profile.email} 
          onChange={handleChange} 
          required 
          style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc", marginRight:"5px" }}
        />
  
        <textarea 
          name="address" 
          placeholder="Address" 
          value={profile.address} 
          onChange={handleChange} 
          required 
          style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc", marginRight:"5px", minHeight: "80px" }}
        />
  
        <button 
          type="submit" 
          style={{ padding: "12px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold", transition: "0.3s" }}
        >
          {id ? "Update Profile" : "Save Profile"}
        </button>
      </form>
    </div>
  );
  
};

export default ProfileForm;
