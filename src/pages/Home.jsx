import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛍️ Welcome to FashionWorld</h1>
      <p style={styles.subtitle}>Discover stylish deals on dresses, shirts, and more.</p>
      <Link to="/shop" style={styles.button}>Start Shopping</Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "Arial, sans-serif"
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px"
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "40px"
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#ff3366",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    transition: "background-color 0.3s ease"
  }
};
