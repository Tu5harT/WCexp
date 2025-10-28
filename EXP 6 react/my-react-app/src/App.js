import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

// Simple Greeting (Props, JSX)
function Greeting({ name }) {
  return <h2>Hello, {name}!</h2>;
}

// User Info Card (Props, Keys)
function UserList({ users }) {
  return (
    <div>
      <h3>User List</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} ({u.email})</li>
        ))}
      </ul>
    </div>
  );
}

// Form (State, Events, Refs)
function PersonalForm({ onAddUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const nameInput = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (name && email && password) {
      onAddUser({ id: Date.now(), name, email, password });
      setName("");
      setEmail("");
      setPassword("");
      nameInput.current.focus(); // Using ref
    }
  }
  function toggleShow() {
    setShow((s) => !s);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: "1.5rem auto",
        background: "#f5f5f5",
        padding: "2em",
        borderRadius: "16px",
        maxWidth: "370px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 2px 16px #ddd"
      }}
    >
      <label style={{ width: "90%", marginBottom: "10px" }}>
        Name:
        <input
          type="text"
          ref={nameInput}
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "7px",
            marginTop: "4px",
            borderRadius: "8px",
            border: "1px solid #bbb"
          }}
        />
      </label>
      <label style={{ width: "90%", marginBottom: "10px" }}>
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "7px",
            marginTop: "4px",
            borderRadius: "8px",
            border: "1px solid #bbb"
          }}
        />
      </label>
      <label style={{ width: "90%", marginBottom: "10px" }}>
        Password:
        <input
          type={show ? "text" : "password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "7px",
            marginTop: "4px",
            borderRadius: "8px",
            border: "1px solid #bbb"
          }}
        />
      </label>
      <button
        type="button"
        onClick={toggleShow}
        style={{
          marginBottom: "10px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "6px 16px",
          cursor: "pointer",
        }}
      >
        {show ? "Hide" : "Show"}
      </button>
      <button
        type="submit"
        style={{
          background: "#0097a7",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "8px 18px",
          cursor: "pointer",
          marginTop: "5px"
        }}
      >
        Add User
      </button>
      {password && (
        <div style={{ marginTop: "15px", color: "#1976d2", textAlign: "center", width: "100%" }}>
          <strong>You entered password: </strong> {password}
        </div>
      )}
    </form>
  );
}

// Home page (Routes, Components, State, Password)
function Home() {
  const [users, setUsers] = useState([
    { id: 1, name: "Amit", email: "amit@mail.com", password: "hidden" },
    { id: 2, name: "Seema", email: "seema@mail.com", password: "hidden" }
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Greeting name="Visitor" />
      <PersonalForm
        onAddUser={user => setUsers(prev => [...prev, user])}
      />
      <UserList users={users} />
    </div>
  );
}

// About page
function About() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>About This Demo</h2>
      <p>
        This page demonstrates React basics: components, forms, props, state, refs, events, keys, and routes.
      </p>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
}

// ========== MAIN APP ==========
export default function App() {
  return (
    <Router>
      <nav style={{ marginBottom: "20px", background: "#eee", padding: "12px", textAlign: "center" }}>
        <Link style={{ marginRight: "30px" }} to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
