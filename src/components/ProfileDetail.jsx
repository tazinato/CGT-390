import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProfileDetail() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-id.php?id=${id}`
      );
      const data = await response.json();
      setProfile(data[0] || null); 
    } catch (err) {
      setError("Profile not found");
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error || !profile) return <div>{error || "No profile data"}</div>;

  return (
    <div className="profile-detail">
      <img 
        src={profile.image || "https://via.placeholder.com/300x200"} 
        alt={profile.name}
        style={{ width: "300px", borderRadius: "10px", marginBottom: "20px" }}
      />
      <h2>{profile.name}</h2>
      <p><strong>Title:</strong> {profile.title}</p>
      <p><strong>Year:</strong> {profile.year}</p>
      <p><strong>Major:</strong> {profile.major}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
}

export default ProfileDetail;
