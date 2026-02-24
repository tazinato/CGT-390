import { createContext, useContext, useState, useEffect } from "react";

const ProfilesContext = createContext();

export function ProfilesProvider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [titles, setTitles] = useState(["All"]);
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTitles();
  }, []);

  const fetchTitles = () => {
    fetch("https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php")
      .then((response) => response.json())
      .then((data) => {
        let titlesArray = ["All"];
        if (data && Array.isArray(data.titles)) {
          titlesArray = ["All", ...data.titles];
        } else if (Array.isArray(data)) {
          titlesArray = ["All", ...data];
        }
        setTitles(titlesArray);
      })
      .catch((err) => {
        console.error("Error fetching titles:", err);
        setTitles(["All"]);
      });
  };

  const fetchProfiles = () => {
    setLoading(true);
    setError("");

    const params = new URLSearchParams({
      title: selectedTitle === "All" ? "" : selectedTitle,
      name: searchTerm,
      page: "1",
      limit: "50"
    });

    fetch(
      `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?${params}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProfiles(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching profiles:", err);
        setError("Failed to fetch profiles. Please try again.");
        setProfiles([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfiles();
  }, [selectedTitle, searchTerm]);

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

  const value = {
    profiles,
    setProfiles,
    titles,
    setTitles,
    selectedTitle,
    setSelectedTitle,
    searchTerm,
    setSearchTerm,
    loading,
    setLoading,
    error,
    setError,
    handleReset,
    handleAddProfile
  };

  return (
    <ProfilesContext.Provider value={value}>
      {children}
    </ProfilesContext.Provider>
  );
}

export function useProfiles() {
  const ctx = useContext(ProfilesContext);
  if (!ctx) throw new Error("useProfiles must be used within ProfilesProvider");
  return ctx;
}
