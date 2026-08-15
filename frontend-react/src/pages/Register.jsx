import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
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
        <h1>Create Account</h1>

        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Full Name"
            required
          />

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
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account?

          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}