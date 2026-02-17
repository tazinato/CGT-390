import { createContext, useContext, useState, useEffect } from "react";

const ProfilesContext = createContext();

export function ProfilesProvider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [titles, setTitles] = useState(["All"]);
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTitles = async () => {
    try {
      const response = await fetch("https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php");
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
      const response = await fetch(`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?${params}`);
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

  useEffect(() => {
    fetchTitles();
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [selectedTitle, searchTerm]);

  return (
    <ProfilesContext.Provider value={{
      profiles, titles, selectedTitle, setSelectedTitle,
      searchTerm, setSearchTerm, loading, error,
      handleReset, handleAddProfile
    }}>
      {children}
    </ProfilesContext.Provider>
  );
}

export function useProfiles() {
  const ctx = useContext(ProfilesContext);
  if (!ctx) throw new Error("useProfiles must be used within ProfilesProvider");
  return ctx;
}
