import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios.get("http://35.154.84.189:4001/profile")
      .then((res) => setProfiles(res.data.data))
      .catch((err) => console.error("Error fetching profiles:", err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://35.154.84.189:4001/profile/${id}`)
      .then(() => setProfiles(profiles.filter(profile => profile._id !== id)))
      .catch((err) => console.error("Error deleting profile:", err));
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>User Profiles</h2>
        <Link to="/create-profile" style={styles.createButton}>+ Create User</Link>
      </div>

      {profiles.length === 0 ? (
        <div style={styles.notFound}>
          <img src="../" alt="Not Found" style={styles.notFoundImage} />
          <p>No Users Found</p>
        </div>
      ) : (
        <div style={styles.profileList}>
          {profiles.map((profile) => (
            <div key={profile._id} style={styles.card}>
              <img src={profile.profilePictureUrl} alt="Profile" style={styles.profilePic} />
              <div style={styles.info}>
                <p><strong>{profile.name}</strong></p>
                <p>{profile.email}</p>
                <p>{profile.address}</p>
              </div>
              <div style={styles.actions}>
                <Link to={`/edit-profile/${profile._id}`} style={styles.icon}><FaEdit /></Link>
                <button onClick={() => handleDelete(profile._id)} style={styles.icon}><FaTrash color="red" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: "500px", margin: "20px auto", textAlign: "center" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  createButton: { textDecoration: "none", background: "#007bff", color: "#fff", padding: "10px 15px", borderRadius: "5px", fontWeight: "bold" },
  profileList: { display: "flex", flexDirection: "column", gap: "10px" },
  card: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", border: "1px solid #ddd", borderRadius: "10px", background: "#fff", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" },
  profilePic: { width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" },
  info: { textAlign: "left", flexGrow: "1", marginLeft: "25px" },
  actions: { display: "flex", gap: "10px" },
  icon: { border: "none", background: "none", cursor: "pointer", fontSize: "18px" },
  notFound: { textAlign: "center", marginTop: "20px" },
  notFoundImage: { width: "100px", opacity: "0.5" },
};

export default ProfileList;
