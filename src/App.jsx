import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Outlet, useNavigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import Card from "./components/Card";
import Section from "./components/Section";
import AddProfile from "./components/Pages/AddProfile";
import ProfileLayout from "./components/ProfileLayout";
import ProfileDetail from "./components/ProfileDetail";
import buford1 from "./assets/buford1.jpg";
import buford2 from "./assets/buford2.jpg";
import About from "./components/Pages/About";

function Home({
  profiles,
  titles,
  selectedTitle,
  setSelectedTitle,
  searchTerm,
  setSearchTerm,
  mode,
  loading,
  error,
  handleReset
}) {
  const isDark = mode === "dark";

  const fallbackProfiles = [
    {
      id: 1,
      name: "Buford D. Dog",
      title: "Student",
      year: "Junior",
      major: "Toy Destruction",
      isFeatured: true,
      image: buford1
    },
    {
      id: 2,
      name: "Buford, Son of Buford",
      title: "Alumni",
      year: "Senior",
      major: "Peanut Butter Consumption",
      isFeatured: false,
      image: buford2
    }
  ];

  const filteredProfiles = profiles.length > 0 ? profiles : fallbackProfiles;

  if (loading) {
    return (
      <div className={`app ${isDark ? "app-dark" : "app-light"}`}>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Loading profiles...</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <Introduction />

      {error && (
        <div
          style={{
            background: "#f8d7da",
            color: "#721c24",
            padding: "15px",
            margin: "20px 0",
            borderRadius: "4px",
            textAlign: "center"
          }}
        >
          {error}
        </div>
      )}

      <Section title={isDark ? "Profiles (Dark Mode)" : "Profiles"}>
        <div className="controls">
          <label className="control-group">
            <span className="control-label">Filter by title:</span>
            <select
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
            >
              {titles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </label>

          <label className="control-group">
            <span className="control-label">Search by name:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type a name..."
            />
          </label>

          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className="cards-grid">
          {filteredProfiles.map((profile) => (
            <Card
              key={profile.id || profile.name}
              name={profile.name}
              title={profile.title}
              year={profile.year}
              major={profile.major}
              isFeatured={profile.isFeatured}
              image={profile.image || buford1}
              mode={mode}
              profileId={profile.id} 
            />
          ))}
          {filteredProfiles.length === 0 && !loading && (
            <p className="no-results">No profiles match your filters.</p>
          )}
        </div>
      </Section>
    </>
  );
}

function OtherProfiles() {
  return (
    <main className="main-content">
      <Section title="Other Profiles">
        <p>
          This page is reserved for additional profiles or future data sources.
        </p>
      </Section>
    </main>
  );
}

function NotFound() {
  return (
    <main className="main-content">
      <Section title="Page Not Found">
        <p>The page you are looking for does not exist.</p>
      </Section>
    </main>
  );
}

function ProfilesLayout() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="profile-layout-container">
      <button 
        onClick={handleGoBack} 
        className="go-back-button"
        style={{
          background: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
          fontSize: "16px"
        }}
      >
        ← Go Back to Home
      </button>
      <main>
        <Outlet /> {/* Renders ProfileDetail */}
      </main>
    </div>
  );
}

function App() {
  const [profiles, setProfiles] = useState([]);
  const [titles, setTitles] = useState(["All"]);
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isDark = mode === "dark";

  useEffect(() => {
    fetchTitles();
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [selectedTitle, searchTerm]);

  const fetchTitles = async () => {
    try {
      const response = await fetch(
        "https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php"
      );
      const data = await response.json();
      
      let titlesArray = ["All"];
      if (data && Array.isArray(data.titles)) {
        titlesArray = ["All", ...data.titles];
      } else if (Array.isArray(data)) {
        titlesArray = ["All", ...data];
      }
      
      setTitles(titlesArray);
    } catch (err) {
      console.error("Error fetching titles:", err);
      setTitles(["All"]);
    }
  };

  const fetchProfiles = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        title: selectedTitle === "All" ? "" : selectedTitle,
        name: searchTerm,
        page: "1",
        limit: "50"
      });

      const response = await fetch(
        `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?${params}`
      );
      const data = await response.json();
      setProfiles(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to fetch profiles. Please try again.");
      setProfiles([]);
      console.error("Error fetching profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedTitle("All");
    setSearchTerm("");
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleAddProfile = (profile) => {
    setProfiles((prev) => {
      const currentProfiles = Array.isArray(prev) ? prev : [];
      return [
        ...currentProfiles,
        {
          ...profile,
          id: Date.now(),
          year: profile.year || "N/A",
          major: profile.bio || "N/A",
          isFeatured: false
        }
      ];
    });
  };

  return (
    <div className={isDark ? "app app-dark" : "app app-light"}>
      <Header />
      <main className="main-content">
        <div className="mode-bar">
          <span>Mode: {isDark ? "Dark" : "Light"}</span>
          <button className="mode-button" onClick={toggleMode}>
            {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                profiles={profiles}
                titles={titles}
                selectedTitle={selectedTitle}
                setSelectedTitle={setSelectedTitle}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                mode={mode}
                loading={loading}
                error={error}
                handleReset={handleReset}
              />
            }
          />
          <Route path="/add" element={<AddProfile onAddProfile={handleAddProfile} />} />
          <Route path="/about" element={<About mode={mode} />} />
          <Route path="/other-profiles" element={<OtherProfiles />} />
          
          {/* NESTED ROUTE: /profiles/:id */}
          <Route path="/profiles" element={<ProfilesLayout />}>
            <Route path=":id" element={<ProfileDetail />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
