
import { useEffect, useMemo, useState } from "react";

import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { cld } from "./cloudinary";
import { AdvancedImage } from '@cloudinary/react';
import ApplePay from "./images/SVG/Apple_Pay_Mark_RGB_041619.svg";
import GooglePay from "./images/SVG/google-pay-mark_800.svg";
import Visa from "./images/SVG/visa-logo.png";
import Paypal from "./images/SVG/paypallogo.png"
import heroImage from "./image/productImage/heroimage.png"
import promoimage from "./image/productImage/promoimage.avif"
import aboutimage from "./image/productImage/about-image2.avif"



const products = [
  {
    id: 1,
    name: "Standard Pedestal Bowl",
    price: 450,
    category: "Dinnerware",
    slug: "standard-pedestal-bowl",
    colours: ["#ffffff", "#483C27", "#03204B"],
    images: {
      "#ffffff":"whitestandardpedestalbowl",
      "#483C27":"gray-standardpedestalbowl",
      "#03204B":"blue-standardpedestalbowl"
    },
    badge: "Best seller",
    description: "A sculptural pedestal bowl designed for dining tables, consoles and display styling.",
  },
  {
    id: 2,
    name: "Calmaria Serving Set",
    price: 250,
    category: "Dinnerware",
    slug: "calmaria-serving-set",
    colours: ["#C7B29C"],
    images: {
      "#C7B29C":"butter-calmariaservingset",
    },
    badge: "Best seller",
    description: "A calm, organic serving set with softly rounded edges and a handmade finish.",
  },
  {
    id: 3,
    name: "Flat Clay Berry Plate",
    price: 50,
    category: "Dinnerware",
    slug: "flat-clay-berry-plate",
    colours: ["#ececea", "#B5503F", "#64C0BF"],
    images: { 
      "#ececea": "white-clayberryplate",
       "#B5503F": "beige-flatclayberryplate",
       "#64C0BF": "blue-flatclayyberryplate"
    },
    badge: "New",
    description: "A compact clay plate for fruit, pastries, side servings and small table moments.",
  },
  {
    id: 4,
    name: "Deep Cantu Bowl",
    price: 80,
    category: "Dinnerware",
    slug: "deep-cantu-bowl",
    colours: [ "#e55b58", "#d9f5f3"],
    images: {
       "#e55b58": "brown-deepcantu",
      "#d9f5f3":"white-deepcantubowl",
     

    },
    description: "A deep, rounded bowl made for coffee, tea and slow mornings.",
  },
  {
    id: 5,
    name: "Piecer Bowl",
    price: 100,
    category: "Dinnerware",
    slug: "piecer-bowl",
    colours: [ "#8b4a22", "#407F60"],
    images: {
       "#8b4a22":"brown-piecerbowl",
       "#407F60": "green-piecerbowl"
    },
    description: "A low profile bowl with a rich glazed finish and soft handmade variation.",
  },
  {
    id: 6,
    name: "Tender Petals",
    price: 25,
    category: "Home Decor",
    slug: "tender-petals",
    colours: ["#f6f8f4"],
    images: {
      "#f6f8f4": "white-tenderpetals"
    },
    description: "A delicate decorative accent for shelves, tables and styled corners.",
  },
  {
    id: 7,
    name: "Sensi Ceramic Cup",
    price: 60,
    category: "Mugs & Teapots",
    slug: "sensi-ceramic-cup",
    colours: ["#934C26", "#477789"],
    images: {
      "#934C26": "brown-senseiceramic",
       "#477789":"blue-senseiceramic"
    },
    badge: "Best seller",
    description: "A warm-toned ceramic cup with generous handles and a smooth glazed surface.",
  },
  {
    id: 8,
    name: "Melon Candy Vase",
    price: 75,
    category: "Vases",
    slug: "melon-candy-vase",
    colours: ["#975A57"],
    images: {
     "#975A57": "meloncandyu"
    },
    badge: "New",
    description: "A playful rounded vase that works beautifully with or without flowers.",
  },
  {
    id: 9,
    name: "Vased Bowl",
    price: 250,
    category: "Home Decor",
    slug: "vased-bowl",
    colours: ["#E4C8A2"],
    images: {
      "#E4C8A2": "vasedbowl"
    },
    description: "A raised decorative bowl with a clean silhouette and soft natural finish.",
  },
  {
    id: 10,
    name: "Artistic Value Tray",
    price: 50,
    category: "Home Decor",
    slug: "artistic-value-tray",
    colours: ["#f2f5f0"],
    images: {
     "#f2f5f0":"artisticvalueplate"
    },
    description: "A refined catch-all tray for jewellery, keys and small everyday objects.",
  },
  {
    id: 11,
    name: "Rabaum Case",
    price: 20,
    category: "Home Decor",
    slug: "rabaum-case",
    colours: [ "#875de7", "#3E2E21"],
    images: {
       "#875de7":"purple-rabauncase",
       "#3E2E21": "brown-rabauncase"
    },
    badge: "New",
    description: "A bold decorative case with sculptural edges and a contemporary colour story.",
  },
  {
    id: 12,
    name: "Flowered Cantu Bowl",
    price: 70,
    category: "Dinnerware",
    slug: "flowered-cantu-bowl",
    colours: ["#2A8FD2"],
    images:{
      "#2A8FD2":"blue-floweredcantu"
    },
    description: "A decorative serving bowl with a bright accent finish and everyday proportions.",
  },
  {
    id: 13,
    name: "Studio Pour Teapot",
    price: 135,
    category: "Mugs & Teapots",
    slug: "studio-pour-teapot",
    colours: ["#ffffff","#c8b29a", "#E8A44C"],
    images:{
"#ffffff": "white-teapot",
"#c8b29a": "twocolor-teapot",
"#E8A44C": "yellow-teapot"
    },
    description: "A compact teapot with a balanced handle and a softly tapered spout.",
  },
  {
    id: 14,
    name: "Quiet Curve Vase",
    price: 95,
    category: "Vases",
    slug: "quiet-curve-vase",
    colours: ["#B9A0B0","#eee6dd",  "#AAA382"],
    images: {
  "#B9A0B0":"purple-quietcurvevase",
  "#eee6dd": "white-quietcurvevase",
"#AAA382":"grey-quietcurvevase"
    },
    badge: "Best seller",
    description: "A softly curved vase for stems, branches or standalone display.",
  },
];

const categories = [
  {
    name: "Dinnerware",
    slug: "dinnerware",
    image: "dinnerware",
  },
  {
    name: "Mugs & Teapots",
    slug: "mugs-teapots",
    image: "mugandteapot",
  },
  {
    name: "Home Decor",
    slug: "home-decor",
    image: "homedecor",
  },
  {
    name: "Vases",
    slug: "vases",
    image: "vase",
  },
];

const categoryBySlug = Object.fromEntries(categories.map((category) => [category.slug, category]));

const colourNames = {
   "#ffffff": "White",
  "#483C27": "Dark Olive Grey",
  "#03204B": "Navy Blue",
  "#C7B29C": "Butter Beige",
  "#ececea": "Soft White",
  "#B5503F": "Terracotta Brown",
  "#64C0BF": "Aqua",
  "#e55b58": "Coral",
  "#d9f5f3": "Mint",
  "#8b4a22": "Warm Brown",
  "#407F60": "Leaf Green",
  "#f6f8f4": "Off White",
  "#934C26": "Rust Brown",
  "#477789": "Dusty Blue",
  "#975A57": "Muted Rose",
  "#E4C8A2": "Sand",
  "#f2f5f0": "Ivory White",
  "#875de7": "Violet",
  "#3E2E21": "Dark Brown",
  "#2A8FD2": "Sky Blue",
  "#c8b29a": "Taupe",
  "#E8A44C": "Golden Ochre",
  "#B9A0B0": "Dusty Mauve",
  "#eee6dd": "Cream",
  "#AAA382": "Sage Grey"
};

function getColourName(colour) {
  return colourNames[colour] || "Selected colour";
}

function getTintOpacity(colour) {
  const name = getColourName(colour).toLowerCase();

  if (name.includes("white") || name.includes("cream")) {
    return 0.08;
  }

  if (name.includes("black")) {
    return 0.82;
  }

  return 0.72;
}


function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}


function ColourisedImage({ src, alt, colour, className = "" }) {
  return (
    <span
      className={`colourised-image ${className}`}
      style={{
        "--variant-colour": colour,
        "--variant-opacity": getTintOpacity(colour),
      }}
    >
      <img src={src} alt={alt} />
      <span className="colour-overlay" aria-hidden="true" />
    </span>
  );
}

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons = {
    search: <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>,
    heart: <svg {...common}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>,
    bag: <svg {...common}><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>,
    user: <svg {...common}><circle cx="12" cy="8" r="3"/><path d="M5 20c.8-4 3-6 7-6s6.2 2 7 6"/></svg>,
    arrow: <svg {...common}><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></svg>,
    menu: <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
    close: <svg {...common}><path d="m6 6 12 12M18 6 6 18"/></svg>,
    minus: <svg {...common}><path d="M5 12h14"/></svg>,
    plus: <svg {...common}><path d="M12 5v14M5 12h14"/></svg>,
    trash: <svg {...common}><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13"/></svg>,
  };

  return icons[name] || null;
}

function Logo() {
  return (
    <Link className="logo" to="/" aria-label="MivaMart home">
      <span className="logo-mark">
        <i className="dot dot-b" />
        <i className="dot dot-c" />
      </span>
      <span>MivaMart</span>
    </Link>
  );
}

function Header({ cartCount, wishlistCount, onSearch }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo />

        <nav className={`main-nav ${open ? "is-open" : ""}`}>
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/shop" onClick={() => setOpen(false)}>Shop</NavLink>
          <a href="/#best-sellers" onClick={() => setOpen(false)}>Best Sellers</a>
          <a href="/#new-arrivals" onClick={() => setOpen(false)}>New Arrivals</a>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <a href="#footer" onClick={() => setOpen(false)}>Contact</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={onSearch} aria-label="Search">
            <Icon name="search" />
          </button>

          <Link className="icon-btn count-wrap" to="/wishlist" aria-label="Wishlist">
            <Icon name="heart" />
            {wishlistCount > 0 && <span className="count-badge">{wishlistCount}</span>}
          </Link>

          <Link className="icon-btn count-wrap" to="/cart" aria-label="Cart">
            <Icon name="bag" />
            {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
          </Link>

          <button
            className="icon-btn mobile-menu-btn"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}

function SearchOverlay({ open, query, setQuery, onClose }) {
  const results = useMemo(() => {
    const normalised = query.trim().toLowerCase();
    if (!normalised) return [];

    return products.filter((product) =>
      product.name.toLowerCase().includes(normalised) ||
      product.category.toLowerCase().includes(normalised) ||
      product.description.toLowerCase().includes(normalised)
    );
  }, [query]);

  if (!open) return null;

  return (
    <div className="search-overlay" role="dialog" aria-modal="true">
      <button className="overlay-close" onClick={onClose} aria-label="Close search">
        <Icon name="close" size={24} />
      </button>

      <div className="search-panel">
        <p className="eyebrow">Search MivaMart</p>

        <div className="search-input-wrap">
          <Icon name="search" size={22} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search dinnerware, home decor, vases..."
          />
        </div>

        {!query.trim() && (
          <p className="search-hint">Start typing to see matching products.</p>
        )}

        {query.trim() && (
          <div className="search-results">
            <div className="search-results-head">
              <strong>{results.length} result{results.length === 1 ? "" : "s"}</strong>
              <span>for “{query}”</span>
            </div>

            {results.length > 0 ? (
              <div className="search-results-list">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="search-result-item"
                    onClick={onClose}
                  >
                    <img src={product.image} alt={product.name} />
                    <div>
                      <span>{product.category}</span>
                      <strong>{product.name}</strong>
                      <small>{formatMoney(product.price)}</small>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="search-empty">
                <strong>Oopsie, no products found.</strong>
                <p>Try a different product name or category.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy" data-scroll-reveal data-reveal-direction="left">
          <h1>Make Memories <span>with Miva.</span></h1>
          <p>
            Explore our curated selection of handmade homeware designed to bring warmth,
            elegance and beauty into your space.
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary" to="/shop">
              Shop collection <Icon name="arrow" size={18} />
            </Link>
            <Link className="text-link" to="/about">About MivaMart</Link>
          </div>

          <div className="hero-notes">
            <span>Hand-picked pieces</span>
            <span>Secure checkout</span>
            <span>Thoughtful packaging</span>
          </div>
        </div>

        <div className="hero-visual" data-scroll-reveal data-reveal-direction="right">
          <div className="hero-backdrop" />
          <img
            src={heroImage}
            alt="Stacked handmade ceramic mugs"
          />
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="section categories-section" data-scroll-reveal>
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Browse your way</p>
            <h2>Shop by category</h2>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((category) => {
            
            const categoryImage = cld.image(category.image);
            return (
            <Link
              className="category-card"
              key={category.name}
              to={`/category/${category.slug}`}
            >
              <AdvancedImage cldImg={categoryImage} alt={category.name} />
              <span className="category-shade" />
              <span className="category-content">
                <strong>{category.name}</strong>
                <span>Explore collection <Icon name="arrow" size={17} /></span>
              </span>
            </Link>
          );})}
        </div>
      </div>
    </section>
  );
}


function ProductCard({ product, liked, onLike, onAdd, compact = false }) {
  const [selectedColour, setSelectedColour] = useState(product.colours[0]);
 
  return (
    <article className={`product-card ${compact ? "product-card-horizontal" : ""}`}>
      <Link
        to={`/product/${product.slug}`}
        className="product-image-wrap"
        aria-label={`View ${product.name}`}
      >
        <AdvancedImage
          cldImg={cld.image(product.images[selectedColour])}
          alt={`${product.name} in ${getColourName(selectedColour)}`}
        />
        {product.badge && <span className="product-badge">{product.badge}</span>}
      </Link>

      <button
        className={`wishlist-btn ${liked ? "liked" : ""}`}
        onClick={() => onLike(product.id)}
        aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Icon name="heart" size={18} />
      </button>

      <div className="product-info">
        <div>
          <p className="product-category">{product.category}</p>
          <Link to={`/product/${product.slug}`}>
            <h3>{product.name}</h3>
          </Link>
        </div>

        <strong className="price">{formatMoney(product.price)}</strong>

        <div className="colour-choice">
          <span className="selected-colour-name">{getColourName(selectedColour)}</span>
          <div className="swatches" aria-label={`Choose colour for ${product.name}`}>
            {product.colours.map((colour) => (
              <button
                type="button"
                key={colour}
                className={`colour-swatch ${selectedColour === colour ? "active" : ""}`}
                style={{ "--swatch-colour": colour }}
                title={getColourName(colour)}
                aria-label={`Show ${product.name} in ${getColourName(colour)}`}
                aria-pressed={selectedColour === colour}
                onClick={() => setSelectedColour(colour)}
              />
            ))}
          </div>
        </div>

        <button className="add-btn full-add-btn" onClick={() => onAdd(product, selectedColour)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}

function HorizontalProductSection({
  id,
  eyebrow,
  title,
  description,
  items,
  wishlist,
  onLike,
  onAdd,
}) {
  return (
    <section className="section products-section" id={id} data-scroll-reveal>
      <div className="container">
        <div className="section-heading product-heading">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
          </div>
          <div className="heading-right">
            <Link to="/shop" className="text-link bestseller-link">View all products</Link>
          </div>
        </div>

        <div className="horizontal-product-scroll">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              compact
              liked={wishlist.includes(product.id)}
              onLike={onLike}
              onAdd={onAdd}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Promo() {
  return (
    <section className="promo-section" data-scroll-reveal>
      <div className="container">
        <div className="promo-card">
          <div className="promo-copy">
            <p className="eyebrow">Handmade with care</p>
            <h2>Objects worth slowing down for.</h2>
            <p>
              From quiet mornings to shared dinners, discover pieces designed to make
              everyday moments feel a little more special.
            </p>
            <Link to="/shop" className="btn btn-light">
              Explore the collection <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="promo-image">
            <img
              src={promoimage}
              alt="Curated ceramic tableware"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function submit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  return (
    <section className="newsletter" data-scroll-reveal>
      <div className="container newsletter-inner">
        <div>
          <p className="eyebrow">Stay in the loop</p>
          <h2>Join the Miva community.</h2>
          <p>New collections, thoughtful inspiration and occasional special offers.</p>
        </div>

        <form onSubmit={submit}>
          <div className="newsletter-input">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSent(false);
              }}
              placeholder="Enter your email address"
            />
            <button type="submit">{sent ? "You're in!" : "Join"}</button>
          </div>
          <small>{sent ? "Thanks for joining MivaMart." : "No spam. Unsubscribe anytime."}</small>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="footer" data-scroll-reveal>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>Curated pieces for beautiful, elegant, and warm spaces.</p>
          <div className="payment-row">
           <span> <img src={ApplePay} alt="Apple Pay" /> </span>
            <span><img src={Visa} alt="Visa" /></span>
            <span> <img src={GooglePay} alt="Google Pay" /> </span>
            <span><img src={Paypal} alt="Paypal Logo" /> </span>
          </div>
        </div>

        <div>
          <h3>Company</h3>
          <Link to="/about">Our story</Link>
          <Link to="/shop">Products</Link>
          <a href="#footer">Terms & conditions</a>
          <a href="#footer">Privacy policy</a>
        </div>

        <div>
          <h3>Social media</h3>
          <a href="#footer">Facebook</a>
          <a href="#footer">Instagram</a>
          <a href="#footer">X (Twitter)</a>
          <a href="#footer">Pinterest</a>
        </div>

        <div>
          <h3>Support</h3>
          <a href="#footer">Live chat</a>
          <a href="#footer">Contact us</a>
          <a href="#footer">Delivery & returns</a>
          <a href="#footer">FAQs</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>©2026 MivaMart. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ wishlist, onLike, onAdd }) {
  const bestSellers = products
    .filter((product) => product.badge === "Best seller")
    .concat(products.filter((product) => product.badge !== "Best seller"));

  const newArrivals = products
    .filter((product) => product.badge === "New")
    .concat([...products].reverse().filter((product) => product.badge !== "New"));

  return (
    <>
      <Hero />
      <Categories />

      <HorizontalProductSection
        id="best-sellers"
        eyebrow="Most loved"
        title="Best sellers"
        items={bestSellers}
        wishlist={wishlist}
        onLike={onLike}
        onAdd={onAdd}
      />

      <Promo />

      <HorizontalProductSection
        id="new-arrivals"
        eyebrow="Freshly added"
        title="New arrivals"
        items={newArrivals}
        wishlist={wishlist}
        onLike={onLike}
        onAdd={onAdd}
      />

      <Newsletter />
    </>
  );
}

function ShopPage({ wishlist, onLike, onAdd }) {
  const [category, setCategory] = useState("All");

  const visible = category === "All"
    ? products
    : products.filter((product) => product.category === category);

  return (
    <section className="page-section" data-scroll-reveal>
      <div className="container">
        <div className="page-hero compact-page-hero">
          <p className="eyebrow">MivaMart collection</p>
          <h1>Shop all products</h1>
          <p>Browse the full collection or narrow it down by category.</p>
        </div>

        <div className="filter-chips shop-filter">
          {["All", ...categories.map((item) => item.name)].map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              liked={wishlist.includes(product.id)}
              onLike={onLike}
              onAdd={onAdd}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryPage({ wishlist, onLike, onAdd }) {
  const { categorySlug } = useParams();
  const category = categoryBySlug[categorySlug];

  if (!category) {
    return (
      <section className="page-section">
        <div className="container empty-state">
          <h1>Category not found</h1>
          <Link className="btn btn-primary" to="/shop">Back to shop</Link>
        </div>
      </section>
    );
  }

  const categoryProducts = products.filter((product) => product.category === category.name);

  return (
    <section className="page-section" data-scroll-reveal>
      <div className="container">
        <div className="category-page-hero">
          <div>
            <p className="eyebrow">Category</p>
            <h1>{category.name}</h1>
            <p>
              Browse our curated {category.name.toLowerCase()} collection and find pieces
              that fit beautifully into your everyday space.
            </p>
          </div>
         <AdvancedImage
          cldImg={cld.image(category.image)}
          alt={`${category.name}`}
        />
        </div>

        <div className="category-page-meta">
          <span>{categoryProducts.length} products</span>
          <Link to="/shop" className="text-link">View all products</Link>
        </div>

        <div className="product-grid">
          {categoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              liked={wishlist.includes(product.id)}
              onLike={onLike}
              onAdd={onAdd}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


function ProductPage({ wishlist, onLike, onAdd }) {
  const { productSlug } = useParams();
  const product = products.find((item) => item.slug === productSlug);
  const [selectedColour, setSelectedColour] = useState(product?.colours?.[0] || "");

 useEffect(() => {
    const currentProduct = products.find(
      (item) => item.slug === productSlug
    );

    setSelectedColour(
      currentProduct?.colours?.[0] || ""
    );
  }, [productSlug]);


  if (!product) {
    return (
      <section className="page-section">
        <div className="container empty-state">
          <h1>Product not found</h1>
          <Link className="btn btn-primary" to="/shop">Back to shop</Link>
        </div>
      </section>
    );
  }



  const category = categories.find((item) => item.name === product.category);

  return (
    <section className="page-section product-page" data-scroll-reveal>
      <div className="container product-detail-grid">
        <div className="product-detail-image">

          <AdvancedImage
          cldImg={cld.image(product.images[selectedColour])}
          alt={`${product.name} in ${getColourName(selectedColour)}`}
        />
        </div>

        <div className="product-detail-copy">
          <Link to={`/category/${category?.slug || ""}`} className="eyebrow">
            {product.category}
          </Link>

          <h1>{product.name}</h1>
          <div className="product-detail-price">{formatMoney(product.price)}</div>
          <p>{product.description}</p>

          <div className="product-detail-block">
            <span>
              Colour: <strong>{getColourName(selectedColour)}</strong>
            </span>

            <div className="swatches large-swatches">
              {product.colours.map((colour) => (
                <button
                  type="button"
                  key={colour}
                  className={`colour-swatch ${selectedColour === colour ? "active" : ""}`}
                  style={{ "--swatch-colour": colour }}
                  title={getColourName(colour)}
                  aria-label={`Show ${product.name} in ${getColourName(colour)}`}
                  aria-pressed={selectedColour === colour}
                  onClick={() => setSelectedColour(colour)}
                />
              ))}
            </div>
          </div>

          <div className="product-detail-actions">
            <button
              className="btn btn-primary"
              onClick={() => onAdd(product, selectedColour)}
            >
              Add {getColourName(selectedColour)} to cart
            </button>

            <button
              className={`btn btn-outline ${wishlist.includes(product.id) ? "liked-outline" : ""}`}
              onClick={() => onLike(product.id)}
            >
              <Icon name="heart" size={18} />
              {wishlist.includes(product.id) ? "Saved to wishlist" : "Save to wishlist"}
            </button>
          </div>

          <div className="product-policies">
            <div><strong>Delivery</strong><span>Calculated at checkout</span></div>
            <div><strong>Returns</strong><span>Easy returns within 14 days</span></div>
            <div><strong>Support</strong><span>Help available before and after purchase</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <main>
      <section className="about-hero" data-scroll-reveal>
        <div className="container about-hero-grid">
          <div>
            <p className="eyebrow">About MivaMart</p>
            <h1>Beautiful everyday objects, chosen with intention.</h1>
            <p>
              MivaMart is built around a simple idea: the objects we use every day should not be boring. Rather, they should be intentionally chosen,
              feel expressive and easy to live with.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1100&q=85"
            alt="Hands shaping ceramic clay"
          />
        </div>
      </section>

      <section className="section" data-scroll-reveal>
        <div className="container about-story-grid">
            <div className="about-story-copy">
            <img
            src={aboutimage}
            alt="three black pendant lamps"
          />
          </div>
          <div>
            <p className="eyebrow">Our story</p>
            <h2>Curated for homes that feel personal.</h2>
             <p>
              We bring together expressive homeware, soft forms and tactile finishes.
              Rather than filling a catalogue with everything, MivaMart focuses on pieces
              that can bring character to a room without overwhelming it.
            </p>
            <p>
              Our goal is to make discovering distinctive home objects feel simple,
              enjoyable and thoughtful—from the first browse to the moment your order arrives.
            </p>
          </div>

        
        </div>
      </section>

      <section className="about-values" data-scroll-reveal>
        <div className="container value-grid">
          <article>
            <span>01</span>
            <h3>Thoughtful curation</h3>
            <p>Fewer, stronger pieces chosen for form, function and feeling.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Everyday beauty</h3>
            <p>Objects made to be used, enjoyed and lived with—not only displayed.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Human service</h3>
            <p>A simple shopping experience with clear support before and after purchase.</p>
          </article>
        </div>
      </section>
    </main>
  );
}


function WishlistPage({ wishlist, onLike, onAdd, clearWishlist }) {
  const savedProducts = products.filter((product) => wishlist.includes(product.id));

  return (
    <section className="page-section wishlist-page" data-scroll-reveal>
      <div className="container">
        <div className="wishlist-page-head">
          <div className="page-hero compact-page-hero">
            <p className="eyebrow">Saved for later</p>
            <h1>My wishlist</h1>
            <p>
              Keep your favourite MivaMart pieces here and choose the colour you want
              before adding them to your cart.
            </p>
          </div>

          {savedProducts.length > 0 && (
            <button className="clear-wishlist-btn" onClick={clearWishlist}>
              Clear wishlist
            </button>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <div className="empty-cart">
            <Icon name="heart" size={42} />
            <h2>Your wishlist is empty.</h2>
            <p>Tap the heart on any product to save it for later.</p>
            <Link className="btn btn-primary" to="/shop">Explore products</Link>
          </div>
        ) : (
          <>
            <div className="wishlist-meta">
              {savedProducts.length} saved item{savedProducts.length === 1 ? "" : "s"}
            </div>

            <div className="product-grid wishlist-grid">
              {savedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  liked
                  onLike={onLike}
                  onAdd={onAdd}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}


function CartPage({ cart, updateQuantity, removeItem, clearCart }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal + shipping;

  return (
    <section className="page-section cart-page" data-scroll-reveal>
      <div className="container">
        <div className="page-hero compact-page-hero">
          <p className="eyebrow">Your basket</p>
          <h1>Shopping cart</h1>
          <p>Review your selected pieces, colours and quantities before moving to checkout.</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <Icon name="bag" size={42} />
            <h2>Your cart is empty.</h2>
            <p>Add a few pieces and they will appear here.</p>
            <Link className="btn btn-primary" to="/shop">Continue shopping</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              <div className="cart-list-head">
                <span>{cart.length} variant{cart.length === 1 ? "" : "s"} in cart</span>
                <button onClick={clearCart}>Clear cart</button>
              </div>

              {cart.map((item) => (
                <article className="cart-item" key={item.cartKey}>
                  <Link to={`/product/${item.slug}`} className="cart-item-image">
                    <ColourisedImage
                      src={item.image}
                      alt={`${item.name} in ${getColourName(item.selectedColour)}`}
                      colour={item.selectedColour}
                    />
                  </Link>

                  <div className="cart-item-info">
                    <p className="product-category">{item.category}</p>
                    <Link to={`/product/${item.slug}`}><h3>{item.name}</h3></Link>
                    <strong>{formatMoney(item.price)}</strong>

                    <div className="cart-selected-colour">
                      <span
                        className="cart-colour-dot"
                        style={{ background: item.selectedColour }}
                      />
                      {getColourName(item.selectedColour)}
                    </div>

                    <div className="cart-item-controls">
                      <div className="quantity-control">
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Icon name="minus" size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Icon name="plus" size={16} />
                        </button>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item.cartKey)}
                      >
                        <Icon name="trash" size={16} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <strong className="cart-line-total">
                    {formatMoney(item.price * item.quantity)}
                  </strong>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <h2>Order summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <strong>{formatMoney(subtotal)}</strong>
              </div>

              <div className="summary-row">
                <span>Estimated shipping</span>
                <strong>{formatMoney(shipping)}</strong>
              </div>

              <div className="promo-code">
                <label htmlFor="promo">Promo code</label>
                <div>
                  <input id="promo" placeholder="Enter code" />
                  <button>Apply</button>
                </div>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>{formatMoney(total)}</strong>
              </div>

              <button className="btn btn-primary checkout-btn">
                Proceed to checkout
              </button>

              <Link to="/shop" className="continue-shopping">Continue shopping</Link>

              <div className="secure-note">
                <span>Secure checkout</span>
                <span>Easy returns</span>
                <span>Customer support</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return <div className="toast">{message}</div>;
}


export default function App() {
  const location = useLocation();
  
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mivamart-wishlist")) || [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("mivamart-cart")) || [];

      return savedCart.map((item) => {
        const selectedColour =
          item.selectedColour ||
          item.colours?.[0] ||
          "#f5f2ec";

        return {
          ...item,
          selectedColour,
          cartKey: item.cartKey || `${item.id}-${selectedColour}`,
          quantity: item.quantity || 1,
        };
      });
    } catch {
      return [];
    }
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const elements = document.querySelectorAll("[data-scroll-reveal]");

    // Keep content accessible in older browsers that do not support the observer.
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("mivamart-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("mivamart-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function toggleWishlist(id) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  }

  function clearWishlist() {
    setWishlist([]);
  }

  function addToCart(product, selectedColour = product.colours[0]) {
    const cartKey = `${product.id}-${selectedColour}`;

    setCart((current) => {
      const existing = current.find((item) => item.cartKey === cartKey);

      if (existing) {
        return current.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          selectedColour,
          cartKey,
          quantity: 1,
        },
      ];
    });

    setToast(
      `${getColourName(selectedColour)} ${product.name} added to cart`
    );

    window.clearTimeout(window.__mivaToast);
    window.__mivaToast = window.setTimeout(() => setToast(""), 2200);
  }

  function updateQuantity(cartKey, quantity) {
    if (quantity <= 0) {
      setCart((current) =>
        current.filter((item) => item.cartKey !== cartKey)
      );
      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.cartKey === cartKey ? { ...item, quantity } : item
      )
    );
  }

  function removeItem(cartKey) {
    setCart((current) =>
      current.filter((item) => item.cartKey !== cartKey)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onSearch={() => setSearchOpen(true)}
      />

      <SearchOverlay
        open={searchOpen}
        query={query}
        setQuery={setQuery}
        onClose={() => setSearchOpen(false)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              wishlist={wishlist}
              onLike={toggleWishlist}
              onAdd={addToCart}
            />
          }
        />

        <Route
          path="/shop"
          element={
            <ShopPage
              wishlist={wishlist}
              onLike={toggleWishlist}
              onAdd={addToCart}
            />
          }
        />

        <Route
          path="/category/:categorySlug"
          element={
            <CategoryPage
              wishlist={wishlist}
              onLike={toggleWishlist}
              onAdd={addToCart}
            />
          }
        />

        <Route
          path="/product/:productSlug"
          element={
            <ProductPage
              wishlist={wishlist}
              onLike={toggleWishlist}
              onAdd={addToCart}
            />
          }
        />

        <Route path="/about" element={<AboutPage />} />

        <Route
          path="/wishlist"
          element={
            <WishlistPage
              wishlist={wishlist}
              onLike={toggleWishlist}
              onAdd={addToCart}
              clearWishlist={clearWishlist}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              clearCart={clearCart}
            />
          }
        />
      </Routes>

      <Footer />
      <Toast message={toast} />
    </>
  );
}
