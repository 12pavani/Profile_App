import { useEffect, useState } from "react";
import axios from "axios";
import "./UserProfile.css";

function UserProfile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/profile"
      );

      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const saveProfile = async () => {
    try {
      await axios.put(
        "http://localhost:8000/profile",
        profile
      );

      alert("Profile Updated");

      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h1>Loading Profile...</h1>;
  }

  return (
    <div className="container">
      <div className="card">

        <img
          src={profile.image}
          alt="profile"
          className="profile-image"
        />

        {!editing ? (
          <>
            <h2>{profile.name}</h2>

            <p>
              <strong>Email:</strong>
              {profile.email}
            </p>

            <p>
              <strong>Interests:</strong>
              {profile.interests}
            </p>

            <button
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
            />

            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
            />

            <input
              name="interests"
              value={profile.interests}
              onChange={handleChange}
            />

            <button onClick={saveProfile}>
              Save Profile
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default UserProfile;