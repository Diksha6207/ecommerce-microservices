import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <section className="section">
      <h1>My Dashboard</h1>

      <div className="grid">
        <Link className="btn" to="/profile">
          My Profile
        </Link>

        <Link className="btn" to="/orders">
          My Orders
        </Link>

        <Link className="btn" to="/wishlist">
          Wishlist
        </Link>

        <Link className="btn" to="/cart">
          My Cart
        </Link>
      </div>
    </section>
  );
}