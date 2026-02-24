import { Link } from "react-router-dom";
import { useMemo } from "react";
import Section from "../Section";
import Card from "../Card";
import Introduction from "../Introduction";
import { useProfiles } from "../../Context/ProfilesContext";
import { useMode } from "../../Context/ModeContext";
import buford1 from "../../assets/buford1.jpg";
import buford2 from "../../assets/buford2.jpg";

function Home() {
  const {
    profiles,
    titles,
    selectedTitle,
    setSelectedTitle,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    handleReset
  } = useProfiles();

  const { mode, isDark } = useMode();

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

  const filteredProfiles = useMemo(() => {
    const allProfilesData = profiles && profiles.length > 0 ? profiles : fallbackProfiles;
    
    return allProfilesData
      .filter(profile => selectedTitle === "All" ? true : profile.title === selectedTitle)
      .filter(profile => profile.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [profiles, selectedTitle, searchTerm]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Loading...</h2>
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

export default Home;
