import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import { useShop } from "./context/ShopContext";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Page from "./components/Page";
import products from "./data/products";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

/* =========================
   HOME
========================= */

function Home() {
  const menProducts = products.filter((p) => p.category === "Men").slice(0, 4);

  const womenProducts = products
    .filter((p) => p.category === "Women")
    .slice(0, 4);

  return (
    <>
      <section className="hero">
        <div>
          <small>NEW SEASON 2026</small>

          <h1>
            Wear your
            <br />
            <i>own story.</i>
          </h1>

          <p>
            Curated clothing designed for effortless everyday style.
          </p>

          <Link className="btn" to="/products">
            Shop Collection
          </Link>
        </div>

        <img
          src={products[2]?.image}
          alt="Fashion collection"
        />
      </section>

      <section className="section">
        <Page
          title="Men's New Arrivals"
          sub="Fresh styles for everyday wear."
        />

        <div className="grid">
          {menProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="center">
          <Link className="outline" to="/men">
            View Men's Collection
          </Link>
        </div>
      </section>

      <section className="section">
        <Page
          title="Women's New Arrivals"
          sub="Modern styles made for every occasion."
        />

        <div className="grid">
          {womenProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="center">
          <Link className="outline" to="/women">
            View Women's Collection
          </Link>
        </div>
      </section>
    </>
  );
}

/* =========================
   PRODUCTS
========================= */

function Products({ category }) {
  const [query, setQuery] = useState("");
  const [apiProducts, setApiProducts] = useState([]);

  useEffect(() => {
    fetch("https://product-service-s4m8.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => setApiProducts(data))
      .catch((error) => console.log(error));
  }, []);

  let list =
    apiProducts.length > 0
      ? apiProducts
      : category
      ? products.filter((p) => p.category === category)
      : products;

  list = list.filter((p) =>
    `${p.name} ${p.type}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <section className="section">
      <Page
        title={
          category
            ? `${category}'s Collection`
            : "All Collection"
        }
        sub="Latest clothing and everyday essentials."
      />

      <input
        className="search"
        placeholder="Search clothing..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid">
        {list.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {!list.length && (
        <div className="empty">
          <h2>No products found</h2>

          <p>
            Try another clothing name
            or category.
          </p>
        </div>
      )}
    </section>
  );
}

/* =========================
   PRODUCT DETAIL
========================= */

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const {
    addToCart,
    wishlist,
    toggleWishlist,
  } = useShop();

  const [size, setSize] = useState(
    product?.sizes?.[0] || "M"
  );

  if (!product) {
    return (
      <section className="section">
        <Page title="Product Not Found" />

        <Link className="btn" to="/products">
          Continue Shopping
        </Link>
      </section>
    );
  }

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const recommendations = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  return (
    <>
      <section className="section detail">
        <button
          className="close floating"
          onClick={() => navigate(-1)}
        >
          ×
        </button>

        <div className="detail-image">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80";
            }}
          />
        </div>

        <div className="detail-info">
          <small>{product.category}</small>

          <h1>{product.name}</h1>

          <h2>
            ₹{product.price.toLocaleString("en-IN")}
          </h2>

          <p>
            {product.description ||
              "Premium clothing made for comfort and everyday style."}
          </p>

          <h4>Select Size</h4>

          <div className="sizes">
            {product.sizes?.map((item) => (
              <button
                key={item}
                className={`size ${
                  item === size ? "active" : ""
                }`}
                onClick={() => setSize(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="actions">
            <button
              className="btn"
              onClick={() => addToCart(product, size)}
            >
              Add to Cart
            </button>

            <button
              className="outline"
              onClick={() => toggleWishlist(product)}
            >
              {isWishlisted
                ? "♥ Wishlisted"
                : "♡ Wishlist"}
            </button>
          </div>

          <div className="product-features">
            <p>✓ Secure checkout</p>
            <p>✓ Easy returns</p>
            <p>✓ Multiple payment methods</p>
            <p>✓ Quality clothing</p>
          </div>
        </div>
      </section>

      <section className="section">
        <Page
          title={
            product.category === "Men"
              ? "You May Also Like"
              : "More Women's Styles"
          }
          sub={`Recommended ${
            product.category === "Men"
              ? "men's"
              : "women's"
          } clothing for you.`}
        />

        <div className="grid">
          {recommendations.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
            />
          ))}
        </div>
      </section>
    </>
  );
}

/* =========================
   CART
========================= */

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useShop();

  const navigate = useNavigate();

  const shipping = cartTotal >= 2000 ? 0 : 99;
  const total = cartTotal + shipping;

  return (
    <section className="section">
      <Page
        title="Shopping Cart"
        sub="Review your selected clothing."
      />

      {!cart.length ? (
        <div className="empty">
          <h2>Your cart is empty</h2>

          <Link className="btn" to="/products">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart">
          <div>
            {cart.map((item) => (
              <div
                className="cartrow"
                key={`${item.id}-${item.size}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=80";
                  }}
                />

                <div className="cart-info">
                  <b>{item.name}</b>

                  <p>Category: {item.category}</p>

                  <p>Size: {item.size}</p>

                  <strong>
                    ₹{item.price.toLocaleString("en-IN")}
                  </strong>
                </div>

                <div className="qty">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.id, item.size)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id, item.size)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove"
                  onClick={() =>
                    removeFromCart(item.id, item.size)
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <aside className="summary">
            <h3>Order Summary</h3>

            <p>
              Subtotal
              <b>
                ₹{cartTotal.toLocaleString("en-IN")}
              </b>
            </p>

            <p>
              Shipping
              <b>
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping}`}
              </b>
            </p>

            <hr />

            <h3>
              Total
              <b>
                ₹{total.toLocaleString("en-IN")}
              </b>
            </h3>

            <button
              className="btn full"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}

/* =========================
   WISHLIST
========================= */

function Wishlist() {
  const { wishlist } = useShop();

  return (
    <section className="section">
      <Page
        title="Wishlist"
        sub="Your saved clothing pieces."
      />

      {wishlist.length ? (
        <div className="grid">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Your wishlist is empty</h2>

          <Link className="btn" to="/products">
            Explore Clothing
          </Link>
        </div>
      )}
    </section>
  );
}

/* =========================
   CHECKOUT
========================= */

function Checkout() {
  const { cart, cartTotal, clearCart } = useShop();

  const navigate = useNavigate();

  const [method, setMethod] = useState("UPI");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = cartTotal >= 2000 ? 0 : 99;
  const total = cartTotal + shipping;

  const submitOrder = (event) => {
    event.preventDefault();

    setOrderPlaced(true);

    setTimeout(() => {
      clearCart();
    }, 100);
  };

  if (!cart.length && !orderPlaced) {
    return (
      <section className="section">
        <Page title="Checkout" />

        <div className="empty">
          <h2>Your cart is empty</h2>

          <Link className="btn" to="/products">
            Shop Now
          </Link>
        </div>
      </section>
    );
  }

  if (orderPlaced) {
    return (
      <section className="section">
        <div className="empty">
          <div className="success-icon">✓</div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for shopping with StyleSphere.
          </p>

          <button
            className="btn"
            onClick={() => navigate("/orders")}
          >
            View My Orders
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <Page
        title="Checkout"
        sub="Secure payment and delivery."
      />

      <form
        className="checkout"
        onSubmit={submitOrder}
      >
        <h3>Delivery Details</h3>

        <input
          required
          placeholder="Full Name"
        />

        <input
          required
          type="tel"
          placeholder="Phone Number"
        />

        <input
          required
          placeholder="House / Street Address"
        />

        <input
          required
          placeholder="City"
        />

        <input
          required
          placeholder="State"
        />

        <input
          required
          maxLength="6"
          placeholder="PIN Code"
        />

        <h3>Payment Method</h3>

        <label className="pay">
          <input
            type="radio"
            name="payment"
            checked={method === "UPI"}
            onChange={() => setMethod("UPI")}
          />
          UPI
        </label>

        <label className="pay">
          <input
            type="radio"
            name="payment"
            checked={method === "Card"}
            onChange={() => setMethod("Card")}
          />
          Credit / Debit Card
        </label>

        <label className="pay">
          <input
            type="radio"
            name="payment"
            checked={method === "COD"}
            onChange={() => setMethod("COD")}
          />
          Cash on Delivery
        </label>

        <div className="checkout-total">
          <p>
            Subtotal
            <b>
              ₹{cartTotal.toLocaleString("en-IN")}
            </b>
          </p>

          <p>
            Shipping
            <b>
              {shipping === 0
                ? "FREE"
                : `₹${shipping}`}
            </b>
          </p>

          <h3>
            Total
            <b>
              ₹{total.toLocaleString("en-IN")}
            </b>
          </h3>
        </div>

        <button
          className="btn full"
          type="submit"
        >
          Pay ₹{total.toLocaleString("en-IN")} • {method}
        </button>
      </form>
    </section>
  );
}

/* =========================
   LOGIN / REGISTER
========================= */

function Auth({ register = false }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const url = register
      ? "https://auth-service-gkzf.onrender.com/api/auth/register"
      : "https://auth-service-gkzf.onrender.com/api/auth/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@test.com",
          password: "123456",
        }),
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        navigate("/");
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
        <Page
          title={
            register
              ? "Create Account"
              : "Welcome Back"
          }
          sub={
            register
              ? "Create your StyleSphere account."
              : "Login to continue shopping."
          }
        />

        <form onSubmit={submit}>
          {register && (
            <input
              required
              placeholder="Full Name"
            />
          )}

          <input
            required
            type="email"
            placeholder="Email Address"
          />

          <input
            required
            type="password"
            placeholder="Password"
          />

          <button
            className="btn full"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : register
              ? "Register"
              : "Login"}
          </button>
        </form>

        <p>
          {register
            ? "Already have an account? "
            : "New to StyleSphere? "}

          <Link
            to={
              register
                ? "/login"
                : "/register"
            }
          >
            {register
              ? "Login"
              : "Create Account"}
          </Link>
        </p>
      </div>
    </section>
  );
}

/* =========================
   ORDERS
========================= */

function Orders() {
  return (
    <section className="section">
      <Page
        title="My Orders"
        sub="Track your StyleSphere purchases."
      />

      <div className="order">
        <div>
          <b>Order #SS-2026-1048</b>

          <p>
            Payment confirmed • Preparing for dispatch
          </p>
        </div>

        <span>Processing</span>
      </div>
    </section>
  );
}

/* =========================
   APP
========================= */

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/men"
          element={<Products category="Men" />}
        />

        <Route
          path="/women"
          element={<Products category="Women" />}
        />

        <Route
          path="/product/:id"
          element={<Detail />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/login"
          element={<Auth />}
        />

        <Route
          path="/register"
          element={<Auth register />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="*"
          element={
            <section className="section">
              <Page title="404" />

              <Link className="btn" to="/">
                Back Home
              </Link>
            </section>
          }
        />
      </Routes>

      <footer>
        StyleSphere Clothing Store • Secure checkout •
        Easy returns • © 2026
      </footer>
    </>
  );
}

export default App;