import { NavLink, Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function Navbar() {
  const { cartCount, wishlistCount } = useShop();

  return (
    <header className="nav">
      <Link to="/" className="brand">
        StyleSphere
      </Link>

      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/men"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Men
        </NavLink>

        <NavLink
          to="/women"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Women
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Collection
        </NavLink>

        <Link
          to="/wishlist"
          className="nav-icon-link"
        >
          ♡

          {wishlistCount > 0 && (
            <span className="nav-badge">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link
          to="/cart"
          className="nav-icon-link cart-link"
        >
          🛒

          {cartCount > 0 && (
            <span className="nav-badge">
              {cartCount}
            </span>
          )}
        </Link>

        <Link
          to="/dashboard"
          className="nav-login"
        >
          Dashboard
        </Link>

        <Link
          to="/profile"
          className="nav-login"
        >
          Profile
        </Link>

        <Link
          to="/orders"
          className="nav-login"
        >
          My Orders
        </Link>

        <Link
          to="/login"
          className="nav-login"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="nav-register"
        >
          Register
        </Link>
      </nav>
    </header>
  );
}