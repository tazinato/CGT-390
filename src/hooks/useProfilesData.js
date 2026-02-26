import { useEffect, useState, useCallback } from "react";

export function useProfilesData() {
  const [profiles, setProfiles] = useState([]);
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const resProfiles = await fetch("/data/profiles.json");
      const resTitles = await fetch("/data/titles.json");

      if (!resProfiles.ok) {
        throw new Error("Failed to load profiles");
      }
      if (!resTitles.ok) {
        throw new Error("Failed to load titles");
      }

      const profilesJson = await resProfiles.json();
      const titlesJson = await resTitles.json();

      setProfiles(profilesJson);
      setTitles(titlesJson);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to load data");
      setProfiles([]);
      setTitles(["All", "Student", "Alumni", "Instructor", "Staff"]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReset = useCallback(() => {
    setError(null);
    fetchData(); 
  }, [fetchData]);

  return { 
    profiles, 
    titles, 
    loading, 
    error, 
    handleReset 
  };
}