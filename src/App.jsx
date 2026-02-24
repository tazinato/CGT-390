import "./App.css";
import { useState, useEffect, useCallback, Suspense, useMemo } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import React, { lazy } from "react";

import Header from "./components/Header";
import Section from "./components/Section";
import Home from "./components/Pages/Home";

const AddProfile = lazy(() => import("./components/Pages/AddProfile"));
const About = lazy(() => import("./components/Pages/About"));
const ProfileDetail = lazy(() => import("./components/ProfileDetail"));

import { ModeProvider, useMode } from "./Context/ModeContext";
import { ProfilesProvider, useProfiles } from "./Context/ProfilesContext";

const OtherProfiles = React.memo(() => (
  <main className="main-content">
    <Section title="Other Profiles">
      <p>This page is reserved for additional profiles or future data sources.</p>
    </Section>
  </main>
));

const NotFound = React.memo(() => (
  <main className="main-content">
    <Section title="Page Not Found">
      <p>The page you are looking for does not exist.</p>
    </Section>
  </main>
));

const ProfilesLayout = React.memo(() => {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

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
        <Outlet />
      </main>
    </div>
  );
});

function AppInner() {
  const { mode, isDark, toggleMode } = useMode();
  const {
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
    setError
  } = useProfiles();

  const fetchTitles = useCallback(() => {
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
  }, [setTitles]);

  const fetchProfiles = useCallback(() => {
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
  }, [selectedTitle, searchTerm, setLoading, setError, setProfiles]);

  const handleReset = useCallback(() => {
    setSelectedTitle("All");
    setSearchTerm("");
  }, [setSelectedTitle, setSearchTerm]);

  const handleAddProfile = useCallback((profile) => {
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
  }, [setProfiles]);

  const homeProps = useMemo(() => ({
    profiles,
    titles,
    selectedTitle,
    setSelectedTitle,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    mode,
    handleReset
  }), [
    profiles,
    titles,
    selectedTitle,
    setSelectedTitle,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    mode,
    handleReset
  ]);

  useEffect(() => {
    fetchTitles();
  }, [fetchTitles]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

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

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home {...homeProps} />} />
            <Route 
              path="/add" 
              element={<AddProfile onAddProfile={handleAddProfile} />}
            />
            <Route path="/about" element={<About mode={mode} />} />
            <Route path="/other-profiles" element={<OtherProfiles />} />
            <Route path="/profiles" element={<ProfilesLayout />}>
              <Route path=":id" element={<ProfileDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  return (
    <ModeProvider>
      <ProfilesProvider>
        <AppInner />
      </ProfilesProvider>
    </ModeProvider>
  );
}

export default App;
