import "./App.css";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import CardOne from "./components/Card1";
import CardTwo from "./components/Card2";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Introduction />
        <section className="cards-section">
          <h2 className="cards-heading">Project Highlights</h2>
          <div className="cards-grid">
            <CardOne />
            <CardTwo />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;