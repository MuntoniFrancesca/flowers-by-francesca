import { useEffect, useState } from "react";
import { CATEGORIES, PRODUCTS, VENMO_USERNAME } from "./products.js";
import CustomBag from "./CustomBag.jsx";

// The custom bag page lives at your-site.com/#/custom-bag
const CUSTOM_BAG_HASH = "#/custom-bag";

function venmoLink(product) {
  const note = encodeURIComponent(`${product.name} - Francesca Makes`);
  return `https://venmo.com/${VENMO_USERNAME}?txn=pay&amount=${product.price}&note=${note}`;
}

function ProductCard({ product, tone }) {
  return (
    <article className={`product tone-${tone}`}>
      <div className="frame">
        {product.image && (
          <img src={product.image} alt={product.name} loading="lazy" />
        )}
      </div>
      <h3>{product.name}</h3>
      <p className="desc">{product.description}</p>
      <div className="buy-row">
        <span className="price">${product.price}</span>
        {product.id === "bag" ? (
          <a className="buy" href={CUSTOM_BAG_HASH}>
            Customize
          </a>
        ) : (
          <a
            className="buy"
            href={venmoLink(product)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy with Venmo
          </a>
        )}
      </div>
    </article>
  );
}

// True while the address ends in #/custom-bag
function useOnCustomBagPage() {
  const [on, setOn] = useState(window.location.hash === CUSTOM_BAG_HASH);
  useEffect(() => {
    const update = () => setOn(window.location.hash === CUSTOM_BAG_HASH);
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return on;
}

export default function App() {
  const onCustomBag = useOnCustomBagPage();

  // When the page changes, start at the top of the custom page,
  // or at the section the link pointed to on the main page.
  useEffect(() => {
    if (onCustomBag) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const id = window.location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [onCustomBag]);

  return (
    <>
      <header className="nav">
        <nav aria-label="Main">
          {CATEGORIES.map((c) => (
            <a key={c.key} href={`#${c.key}`}>
              {c.title}
            </a>
          ))}
          <a href="#about">About</a>
          <a href="#how">Ordering</a>
        </nav>
      </header>

      {onCustomBag ? (
        <CustomBag />
      ) : (
        <main id="top">
          <section className="hero">
            <h1>
              <span className="title-main">Francesca makes</span>{" "}
              <span className="title-sub">by Francesca Muntoni</span>
            </h1>
          </section>

          {CATEGORIES.map((c) => (
            <section key={c.key} id={c.key} className="block">
              <h2 className="category-title">{c.title}</h2>
              <div className="grid">
                {PRODUCTS.filter((p) => p.category === c.key).map((p) => (
                  <ProductCard key={p.id} product={p} tone={c.tone} />
                ))}
              </div>
            </section>
          ))}

          <section id="about" className="block narrow">
            <h2>About</h2>
            <p>Everything here is made by hand, one piece at a time.</p>
          </section>

          <section id="how" className="block narrow">
            <h2>Ordering</h2>
            <p>For anything other than bags, tap Buy with Venmo on the item.</p>
            <p>
              Bags are made to order.{" "}
              <a href={CUSTOM_BAG_HASH}>Design your custom bag</a>.
            </p>
          </section>
        </main>
      )}

      <footer className="footer">
        <p>Francesca Makes, {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}