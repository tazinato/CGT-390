import "./App.css";
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

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Introduction />

        <Section title="Buford Varients">
          <div className="cards-grid">
            {profiles.map((profile) => (
              <Card
                key={profile.id}
                name={profile.name}
                year={profile.year}
                major={profile.major}
                isFeatured={profile.isFeatured}
                image={profile.image}
              />
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}

export default App;
