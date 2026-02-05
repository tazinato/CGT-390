import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import Card from "./components/Card";
import Section from "./components/Section";
import buford1 from "./assets/buford1.jpg";
import buford2 from "./assets/buford2.jpg";

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
      setTitles(["All", ...data]);
    } catch (err) {
      console.error("Error fetching titles:", err);
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
      setProfiles(data);
    } catch (err) {
      setError("Failed to fetch profiles. Please try again.");
      console.error("Error fetching profiles:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleReset = () => {
    setSelectedTitle("All");
    setSearchTerm("");
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

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
    <div className={isDark ? "app app-dark" : "app app-light"}>
      <Header />
      <main className="main-content">
        <div className="mode-bar">
          <span>Mode: {isDark ? "Dark" : "Light"}</span>
          <button className="mode-button" onClick={toggleMode}>
            {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>

        <Introduction />

        {error && (
          <div style={{ 
            background: "#f8d7da", 
            color: "#721c24", 
            padding: "15px", 
            margin: "20px 0", 
            borderRadius: "4px", 
            textAlign: "center" 
          }}>
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
              />
            ))}
            {filteredProfiles.length === 0 && !loading && (
              <p className="no-results">No profiles match your filters.</p>
            )}
          </div>
        </Section>
      </main>
    </div>
  );
}

export default App;