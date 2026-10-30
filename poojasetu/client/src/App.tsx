import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, BadgeCheck, Flower2, Heart, Leaf, Menu, Minus, Plus,
  Search, ShoppingBag, Sparkles, Sun, X
} from "lucide-react";
import type { Product } from "./types";

const money = (paise: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(paise / 100);

const categories = ["All items", "Daily essentials", "Flowers", "Pooja kits", "Fruits & offerings", "Pooja accessories", "Gifts & hampers"];

type Cart = Record<string, number>;

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All items");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
  let alive = true;

  fetch("/api/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("The catalogue could not be loaded.");
      }

      return response.json() as Promise<{
        data: Array<
          Omit<Product, "pricePaise"> & {
            pricePaise?: number;
            price_paise?: number;
            image?: string | null;
            image_url?: string | null;
            image_refs?: Array<string | { url?: string | null }> | null;
          }
        >;
      }>;
    })
    .then((payload) => {
      if (alive) {
        const mappedProducts: Product[] = payload.data.map((product) => ({
          ...product,
          pricePaise: product.price_paise ?? product.pricePaise ?? 0,
          image:
            product.image_url ??
            product.image ??
            (typeof product.image_refs?.[0] === "string"
              ? product.image_refs[0]
              : product.image_refs?.[0]?.url) ??
            "",
        }));

        setProducts(mappedProducts);
      }
    })
    .catch(() => {
      if (alive) {
        setApiError(
          "We couldn’t load the catalogue. Please check that the API is running and try again."
        );
      }
    })
    .finally(() => {
      if (alive) {
        setLoading(false);
      }
    });

  return () => {
    alive = false;
  };
}, []);

  const filtered = useMemo(() => products.filter((product) => {
    const categoryMatch = activeCategory === "All items" || product.category === activeCategory;
    const query = search.trim().toLowerCase();
    const searchMatch = !query || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query);
    return categoryMatch && searchMatch && product.available;
  }), [products, activeCategory, search]);

  const cartLines = products.filter((product) => cart[product.id] > 0);
  const itemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const subtotal = cartLines.reduce((sum, product) => sum + product.pricePaise * cart[product.id], 0);

  function changeQuantity(id: string, delta: number) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] ?? 0) + delta;
      if (quantity <= 0) delete next[id];
      else next[id] = Math.min(quantity, 20);
      return next;
    });
  }

  function addProduct(id: string) {
    changeQuantity(id, 1);
    setCartOpen(true);
  }

  return (
    <div className="app-shell">
      <div className="announcement"><Sparkles size={14} /> Your everyday pooja essentials, thoughtfully brought together <span>•</span> Tirupati launch coming soon</div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="PoojaSetu home">
          <span className="brand-mark"><Flower2 size={27} strokeWidth={1.8} /></span>
          <span><strong>PoojaSetu</strong><small>Faith in every detail</small></span>
        </a>
        <nav className={mobileMenu ? "main-nav open" : "main-nav"} aria-label="Main navigation">
          <a href="#shop" onClick={() => setMobileMenu(false)}>Shop essentials</a>
          <a href="#kits" onClick={() => { setActiveCategory("Pooja kits"); setMobileMenu(false); }}>Pooja kits</a>
          <a href="#about" onClick={() => setMobileMenu(false)}>Our promise</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button mobile-menu-button" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${itemCount} items`}>
            <ShoppingBag size={18} /><span>My basket</span><b>{itemCount}</b>
          </button>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> A little more meaning, every day</div>
            <h1>Make space for<br /><em>what matters.</em></h1>
            <p>From your daily diya to the flowers for a special prayer, find the little things that make your rituals feel like home.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#shop">Explore essentials <ArrowRight size={17} /></a>
              <span className="hero-note"><BadgeCheck size={16} /> Carefully chosen basics</span>
            </div>
            <div className="hero-trust">
              <span><Leaf size={16} /> Everyday essentials</span><span><Heart size={16} /> Thoughtfully packed</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Decorative illustration of a pooja thali">
            <div className="art-halo" />
            <div className="art-sun"><Sun size={31} strokeWidth={1.4} /></div>
            <div className="thali">
              <div className="thali-rim"><div className="thali-inner">
                <div className="diya"><div className="flame" /><div className="diya-bowl" /></div>
                <div className="flower flower-one">✿</div><div className="flower flower-two">✿</div><div className="flower flower-three">✿</div>
                <div className="kumkum"><span /><span /></div>
                <div className="leaf-sprig">❧</div>
              </div></div>
            </div>
            <div className="art-caption"><span className="caption-dot" /> Rituals, made a little easier</div>
          </div>
          <div className="hero-bottom-label">POOJASETU · TIRUPATI</div>
        </section>

        <section className="benefit-strip" aria-label="Store benefits">
          <div><span className="benefit-icon"><Flower2 size={21} /></span><span><b>Daily essentials</b><small>For your everyday rituals</small></span></div>
          <div><span className="benefit-icon"><Sparkles size={21} /></span><span><b>Ready-made kits</b><small>Thoughtfully put together</small></span></div>
          <div><span className="benefit-icon"><Heart size={21} /></span><span><b>Personal touches</b><small>Hampers for your moments</small></span></div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" /> THE LITTLE THINGS</div><h2>For your <em>daily rituals.</em></h2><p>Start with the essentials. We’ll take care of the little details.</p></div>
            <div className="search-box"><Search size={18} /><input aria-label="Search products" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find your essentials..." /><kbd>⌕</kbd></div>
          </div>
          <div className="category-row" role="group" aria-label="Filter by category">
            {categories.map((category) => <button key={category} className={activeCategory === category ? "category-chip active" : "category-chip"} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          {loading && <div className="status-panel"><div className="spinner" /> Loading the catalogue…</div>}
          {!loading && apiError && <div className="status-panel error-panel"><strong>Catalogue unavailable</strong><p>{apiError}</p><button className="secondary-button" onClick={() => window.location.reload()}>Try again</button></div>}
          {!loading && !apiError && filtered.length === 0 && <div className="status-panel"><Flower2 size={28} /><strong>No items found just yet</strong><p>Try another category or search term.</p><button className="secondary-button" onClick={() => { setSearch(""); setActiveCategory("All items"); }}>Show all items</button></div>}
          {!loading && !apiError && filtered.length > 0 && <div className="product-grid">
            {filtered.map((product, index) => <article className="product-card" key={product.id}>
              <div className={`product-image image-${index % 6}`}>
                <div className="product-art-circle" />
                {product.image && (
                  <img
                    className="product-photo"
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.hidden = true;
                    }}
                  />
                )}
                <span className="product-symbol">{product.category === "Flowers" ? "✿" : product.category === "Pooja kits" ? "♧" : product.category === "Fruits" ? "❋" : "✧"}</span>
                {product.featured && <span className="product-ribbon">A favourite</span>}
                <button className="quick-add" aria-label={`Add ${product.name} to basket`} onClick={() => addProduct(product.id)}><Plus size={19} /></button>
              </div>
              <div className="product-meta"><span>{product.category}</span>{product.priceType === "daily" && <span className="daily-label">Daily price</span>}</div>
              <h3>{product.name}</h3><p className="product-description">{product.description}</p>
              <div className="product-bottom"><div><strong>{money(product.pricePaise)}</strong><small> / {product.unit}</small>{product.priceType === "daily" && product.updatedAt && <small className="updated-at">Updated today</small>}</div><button className="add-button" onClick={() => addProduct(product.id)}>Add <Plus size={14} /></button></div>
            </article>)}
          </div>}
          <div className="catalog-note"><span>✦</span> Catalogue preview · Sample prices and products for development only. Final launch availability and pricing will be confirmed.</div>
        </section>

        <section className="kit-banner" id="kits">
          <div className="kit-decoration"><div className="kit-orbit">✿</div><div className="kit-orbit second">✧</div><div className="kit-vessel">♧</div></div>
          <div className="kit-copy"><div className="eyebrow">A MOMENT, MADE SIMPLE</div><h2>Everything you need.<br /><em>All in one little kit.</em></h2><p>Thoughtfully grouped essentials for your pooja routine, without the last-minute shop hopping.</p><button className="light-button" onClick={() => { setActiveCategory("Pooja kits"); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>Explore pooja kits <ArrowRight size={16} /></button></div>
          <div className="kit-stamp"><Flower2 size={25} /><span>Made for<br />your moments</span></div>
        </section>

        <section className="promise-section" id="about">
          <div className="eyebrow"><span className="eyebrow-line" /> OUR LITTLE PROMISE</div>
          <h2>Less running around.<br /><em>More being present.</em></h2>
          <p>We’re putting together a simpler way to find the essentials behind your everyday rituals. PoojaSetu is being prepared for a Tirupati launch.</p>
          <div className="promise-points"><span><BadgeCheck size={17} /> Clear product details</span><span><Heart size={17} /> Thoughtful packing</span><span><Leaf size={17} /> Everyday convenience</span></div>
        </section>
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#home"><span className="brand-mark"><Flower2 size={24} /></span><span><strong>PoojaSetu</strong><small>Faith in every detail</small></span></a><span className="footer-note">Made with care for your everyday rituals.</span><span className="footer-copy">© {new Date().getFullYear()} PoojaSetu · Preview build</span></footer>

      {cartOpen && <div className="drawer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <aside className="cart-drawer" aria-label="Shopping basket">
          <div className="drawer-header"><div><span className="eyebrow">YOUR LITTLE COLLECTION</span><h2>My basket <span>({itemCount})</span></h2></div><button className="icon-button" aria-label="Close basket" onClick={() => setCartOpen(false)}><X /></button></div>
          {cartLines.length === 0 ? <div className="empty-cart"><span className="empty-cart-icon"><ShoppingBag size={27} /></span><h3>Your basket is waiting</h3><p>Add a few essentials to get started.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Explore essentials <ArrowRight size={16} /></button></div> :
            <><div className="cart-lines">{cartLines.map((product) => <div className="cart-line" key={product.id}><div className="cart-line-art">{product.category === "Flowers" ? "✿" : "✧"}</div><div className="cart-line-info"><strong>{product.name}</strong><small>{money(product.pricePaise)} / {product.unit}</small><div className="quantity-control"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => changeQuantity(product.id, -1)}><Minus size={13} /></button><span>{cart[product.id]}</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => changeQuantity(product.id, 1)}><Plus size={13} /></button></div></div><strong className="line-total">{money(product.pricePaise * cart[product.id])}</strong></div>)}</div>
            <div className="cart-summary"><div><span>Items subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Delivery</span><span className="muted">Calculated before launch</span></div><p>Sample cart only. Checkout and payments are not enabled in this preview.</p><button className="primary-button full-width" onClick={() => setCartOpen(false)}>Continue browsing <ArrowRight size={16} /></button></div></>}
        </aside>
      </div>}
    </div>
  );
}
