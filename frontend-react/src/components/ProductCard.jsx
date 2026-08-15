import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80";

export default function ProductCard({ product }) {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
  } = useShop();

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const handleImageError = (event) => {
    if (event.currentTarget.dataset.fallback === "true") {
      return;
    }

    event.currentTarget.dataset.fallback = "true";
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleAddToCart = () => {
    const defaultSize =
      product.sizes?.[0] || "M";

    addToCart(product, defaultSize);
  };

  return (
    <article className="product-card">

      <div className="product-image-wrap">

        <Link to={`/product/${product.id}`}>
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
            onError={handleImageError}
          />
        </Link>

        <button
          type="button"
          className={`wishlist-btn ${
            isWishlisted ? "active" : ""
          }`}
          onClick={() =>
            toggleWishlist(product)
          }
          aria-label="Wishlist"
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

      </div>

      <div className="product-info">

        <small>{product.category}</small>

        <Link
          className="product-name"
          to={`/product/${product.id}`}
        >
          {product.name}
        </Link>

        <p className="product-type">
          {product.type}
        </p>

        <div className="product-bottom">

          <strong>
            ₹{product.price.toLocaleString("en-IN")}
          </strong>

          <button
            type="button"
            className="small-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

        </div>

      </div>

    </article>
  );
}