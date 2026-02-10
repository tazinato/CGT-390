import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="main-content">
      <h1>404 - Page Not Found</h1>
      <p>The page you’re looking for does not exist.</p>
      <Link to="/" className="nav-link">Go back Home</Link>
    </main>
  );
}

export default NotFound;