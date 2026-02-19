import { createContext, useContext, useReducer, useEffect } from "react";

const ProfilesContext = createContext();

const profilesReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_PROFILES":
      return { ...state, profiles: action.payload };
    case "SET_TITLES":
      return { ...state, titles: ["All", ...action.payload] };
    case "SET_SELECTED_TITLE":
      return { ...state, selectedTitle: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "RESET_FILTERS":
      return { ...state, selectedTitle: "All", searchTerm: "" };
    case "ADD_PROFILE":
      return { 
        ...state, 
        profiles: [
          ...state.profiles,
          {
            ...action.payload,
            id: Date.now(),
            year: action.payload.year || "N/A",
            major: action.payload.bio || "N/A",
            isFeatured: false
          }
        ]
      };
    default:
      return state;
  }
};

export function ProfilesProvider({ children }) {
  const [state, dispatch] = useReducer(profilesReducer, {
    profiles: [],
    titles: ["All"],
    selectedTitle: "All",
    searchTerm: "",
    loading: true,
    error: ""
  });

  const fetchTitles = () => {
    fetch("https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php")
      .then(response => response.json())
      .then(data => {
        let titles = [];
        if (data && Array.isArray(data.titles)) titles = data.titles;
        else if (Array.isArray(data)) titles = data;
        dispatch({ type: "SET_TITLES", payload: titles });
      })
      .catch(err => {
        console.error("Error fetching titles:", err);
        dispatch({ type: "SET_TITLES", payload: [] });
      });
  };

  const fetchProfiles = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: "" });

    const params = new URLSearchParams({
      title: state.selectedTitle === "All" ? "" : state.selectedTitle,
      name: state.searchTerm,
      page: "1",
      limit: "50"
    });

    fetch(`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?${params}`)
      .then(response => response.json())
      .then(data => dispatch({ type: "SET_PROFILES", payload: Array.isArray(data) ? data : [] }))
      .catch(err => {
        dispatch({ type: "SET_ERROR", payload: "Failed to fetch profiles." });
        dispatch({ type: "SET_PROFILES", payload: [] });
      })
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  };

  useEffect(() => { fetchTitles(); }, []);
  useEffect(() => { fetchProfiles(); }, [state.selectedTitle, state.searchTerm]);

  return (
    <ProfilesContext.Provider value={{
      state,
      dispatch,
      fetchProfiles,
      actions: {
        setSelectedTitle: (title) => dispatch({ type: "SET_SELECTED_TITLE", payload: title }),
        setSearchTerm: (term) => dispatch({ type: "SET_SEARCH_TERM", payload: term }),
        resetFilters: () => dispatch({ type: "RESET_FILTERS" }),
        addProfile: (profile) => dispatch({ type: "ADD_PROFILE", payload: profile })
      }
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