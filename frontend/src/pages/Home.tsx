import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home: React.FC = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="logo">Project Management</div>
        <nav className="nav">
          <Link to="/register" className="btn primary">Sign Up</Link>
          <Link to="/login" className="btn secondary">Sign In</Link>
        </nav>
      </header>
      <main className="main-content">
        <section className="intro">
          <h2>Effortless Team Collaboration</h2>
          <p>Streamline task management, enhance productivity, and keep your team aligned.</p>
          <button className="cta">Get Started</button>
        </section>
        <section className="features">
          <div className="feature">
            <h3>Organized Workflows</h3>
            <p>Visualize your tasks and projects with an intuitive interface.</p>
          </div>
          <div className="feature">
            <h3>Real-time Collaboration</h3>
            <p>Communicate and work with your team seamlessly.</p>
          </div>
          <div className="feature">
            <h3>Analytics & Insights</h3>
            <p>Track progress and improve efficiency with comprehensive reports.</p>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2025 Project Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
