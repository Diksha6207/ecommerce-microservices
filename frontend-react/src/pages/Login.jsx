import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "https://auth-service-gkzf.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        navigate("/profile");
      }
    } catch (error) {
      alert("API connection failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth">
      <div className="authbox">
        <h1>Welcome Back</h1>

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn full" disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        <p>
          New to StyleSphere?{" "}
          <Link to="/register">Create Account</Link>
        </p>
      </div>
    </section>
  );
}