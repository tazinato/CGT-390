import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import Card from "./components/Card";
import Section from "./components/Section";
import buford1 from "./assets/buford1.jpg";
import buford2 from "./assets/buford2.jpg";

function App() {
  const profiles = [
    {
      id: 1,
      name: "Buford D. Dog",
      year: "Junior",
      major: "Toy Destruction, Minor in Wall Destruction",
      isFeatured: true,
      image: buford1
    },
    {
      id: 2,
      name: "Buford, Son of Buford",
      year: "Senior",
      major: "Peanut Butter Consumption",
      isFeatured: false,
      image: buford2
    }
  ];
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const titles = ["All", ...new Set(profiles.map((p) => p.title))];
  
  const filteredProfiles = profiles.filter((profile) => {
    const matchesTitle =
      selectedTitle === "All" || profile.title === selectedTitle;

    const matchesSearch =
      profile.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTitle && matchesSearch;
  });

  const handleReset = () => {
    setSelectedTitle("All");
    setSearchTerm("");
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Introduction />

        <Section title="Buford Varients">
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
                key={profile.id}
                name={profile.name}
                year={profile.year}
                major={profile.major}
                isFeatured={profile.isFeatured}
                image={profile.image}
              />
            ))}
            {filteredProfiles.length === 0 && (
            <p className="no-results">No profiles match your filters.</p>
          )}
          </div>
        </Section>
      </main>
    </div>
  );
}

export default App;
