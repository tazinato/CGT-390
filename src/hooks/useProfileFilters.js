import { useMemo, useState } from "react";

export function useProfileFilters(allProfiles, fallbackProfiles) {
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfiles = useMemo(() => {
    const allProfilesData = allProfiles && allProfiles.length > 0 ? allProfiles : fallbackProfiles;

    return allProfilesData
      .filter((profile) => selectedTitle === "All" ? true : profile.title === selectedTitle)
      .filter((profile) => profile.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allProfiles, fallbackProfiles, selectedTitle, searchTerm]);

  const resetFilters = () => {
    setSelectedTitle("All");
    setSearchTerm("");
  };

  return {
    selectedTitle,
    setSelectedTitle,
    searchTerm,
    setSearchTerm,
    filteredProfiles,
    resetFilters,
  };
}