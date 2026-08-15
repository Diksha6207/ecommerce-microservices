import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate("/profile");
    }, 700);
  };

  return (
    <section className="auth">
      <div className="authbox">
        <h1>Welcome Back</h1>

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email Address"
            required
          />

          <input
            type="password"
            placeholder="Password"
            required
          />

          <button
            className="btn full"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        <p>
          New to StyleSphere?

          <Link to="/register">
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
}