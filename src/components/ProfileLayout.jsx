import { useNavigate, Outlet, useParams } from "react-router-dom";

function ProfileLayout() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <main className="main-content">
      <div className="profile-header">
        <button 
          onClick={() => navigate(-1)} 
          className="back-button"
          style={{
            background: "#6b7280",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          ← Go Back
        </button>
        <h1>Profile Details (ID: {id})</h1>
      </div>
      
      {/* Nested content renders here */}
      <Outlet />
    </main>
  );
}

export default ProfileLayout;
