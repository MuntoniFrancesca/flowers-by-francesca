import { useState } from "react";
import {
  FABRICS, STRAP_COLORS, THREAD_COLORS, PRODUCTS, VENMO_USERNAME, ORDER_EMAIL, DEPOSIT_PERCENT,
} from "./products.js";

const bag = PRODUCTS.find((p) => p.id === "bag");
const deposit = Math.round(bag.price * DEPOSIT_PERCENT) / 100;
const money = (n) => (Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`);
const imageOf = (list, name) => list.find((x) => x.name === name)?.image;

function Step({ n, title, children }) {
  return (
    <section className="bag-step">
      <h2>
        <span className="bag-step-num">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Segmented({ label, name, options, value, onChange }) {
  return (
    <div className="bag-segmented" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <label key={o} className={value === o ? "bag-seg picked" : "bag-seg"}>
          <input
            type="radio"
            name={name}
            value={o}
            checked={value === o}
            onChange={() => onChange(o)}
            required
          />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );
}

function SwatchGrid({ label, name, items, value, onChange }) {
  return (
    <div className="bag-swatch-block">
      {label && <p className="bag-sub">{label}</p>}
      <div className="bag-swatches" role="radiogroup" aria-label={label || name}>
        {items.map((f) => (
          <label key={f.id} className={value === f.name ? "bag-tile picked" : "bag-tile"}>
            <input
              type="radio"
              name={name}
              value={f.name}
              checked={value === f.name}
              onChange={() => onChange(f.name)}
              required
            />
            <span className="bag-tile-img">
              <img src={f.image} alt="" loading="lazy" />
            </span>
            <span className="bag-tile-name">{f.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, image, quilted }) {
  return (
    <li className={value ? "bag-sum-row done" : "bag-sum-row"}>
      <span className={quilted ? "bag-thumb is-quilted" : "bag-thumb"}>
        {image && <img src={image} alt="" />}
      </span>
      <span className="bag-sum-text">
        <span className="bag-sum-label">{label}</span>
        <span className="bag-sum-value">{value || "Not chosen yet"}</span>
      </span>
    </li>
  );
}

export default function OrderForm() {
  const [form, setForm] = useState({
    name: "", email: "", address: "",
    quilted: "", outerMode: "One fabric", outer: "", outer2: "",
    lining: "", strap: "", thread: "", notes: "",
  });
  const [sent, setSent] = useState(false);
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));
  const twoOuter = form.outerMode === "Two fabrics";

  function setOuterMode(mode) {
    setForm((f) => ({
      ...f,
      outerMode: mode,
      outer2: mode === "One fabric" ? "" : f.outer2,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Shipping address: ${form.address}`,
      `Quilted: ${form.quilted}`,
      `Outer fabric: ${twoOuter ? `${form.outer} + ${form.outer2} (two fabrics)` : form.outer}`,
      `Lining fabric: ${form.lining}`,
      `Strap color: ${form.strap}`,
      `Thread color: ${form.thread}`,
      `Notes: ${form.notes || "-"}`,
    ].join("\n");
    window.location.href =
      `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent("Custom bag order")}` +
      `&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const venmoUrl =
    `https://venmo.com/${VENMO_USERNAME}?txn=pay&amount=${deposit}` +
    `&note=${encodeURIComponent("Bag deposit - Francesca Makes")}`;

  // Progress through the choices (details are not counted)
  const choices = [form.quilted, form.outer, form.lining, form.strap, form.thread];
  if (twoOuter) choices.push(form.outer2);
  const total = choices.length;
  const done = choices.filter(Boolean).length;

  return (
    <div className="bag-builder">
      <form className="bag-form" onSubmit={handleSubmit}>
        <p className="bag-intro">
          Each bag is handmade to order. Please allow at least 2 weeks for
          production before shipping. A {DEPOSIT_PERCENT}% deposit ({money(deposit)})
          confirms your order, and the balance is due before shipping.
        </p>

        <Step n={1} title="Quilting">
          <Segmented
            label="Quilting"
            name="quilted"
            options={["Quilted", "Not quilted"]}
            value={form.quilted}
            onChange={set("quilted")}
          />
        </Step>

        <Step n={2} title="Outer fabric">
          <Segmented
            label="Number of outer fabrics"
            name="outerMode"
            options={["One fabric", "Two fabrics"]}
            value={form.outerMode}
            onChange={setOuterMode}
          />
          <SwatchGrid
            label={twoOuter ? "First fabric" : null}
            name="outer"
            items={FABRICS}
            value={form.outer}
            onChange={set("outer")}
          />
          {twoOuter && (
            <SwatchGrid
              label="Second fabric"
              name="outer2"
              items={FABRICS}
              value={form.outer2}
              onChange={set("outer2")}
            />
          )}
        </Step>

        <Step n={3} title="Lining fabric">
          <SwatchGrid name="lining" items={FABRICS} value={form.lining} onChange={set("lining")} />
        </Step>

        <Step n={4} title="Strap color">
          <SwatchGrid name="strap" items={STRAP_COLORS} value={form.strap} onChange={set("strap")} />
        </Step>

        <Step n={5} title="Thread color">
          <SwatchGrid name="thread" items={THREAD_COLORS} value={form.thread} onChange={set("thread")} />
        </Step>

        <Step n={6} title="Your details">
          <label className="bag-field">
            <span>Name</span>
            <input required value={form.name} onChange={(e) => set("name")(e.target.value)} />
          </label>
          <label className="bag-field">
            <span>Email</span>
            <input type="email" required value={form.email} onChange={(e) => set("email")(e.target.value)} />
          </label>
          <label className="bag-field">
            <span>Shipping address</span>
            <textarea required value={form.address} onChange={(e) => set("address")(e.target.value)} />
          </label>
          <label className="bag-field">
            <span>Notes (optional)</span>
            <textarea value={form.notes} onChange={(e) => set("notes")(e.target.value)} />
          </label>
        </Step>

        <label className="bag-agree">
          <input type="checkbox" required />
          <span>I understand the production time and deposit terms.</span>
        </label>

        <button type="submit" className="bag-submit">Send my order</button>

        {sent && (
          <p className="bag-next">
            Your email app should have opened. Send it, then pay the deposit:{" "}
            <a className="buy" href={venmoUrl} target="_blank" rel="noopener noreferrer">
              Pay {money(deposit)} deposit with Venmo
            </a>
          </p>
        )}
      </form>

      <aside
        className={done === total ? "bag-summary is-complete" : "bag-summary"}
        aria-label="Your bag so far"
      >
        <h2 className="bag-sum-title">Your bag</h2>
        <div
          className="bag-progress"
          role="progressbar"
          aria-label="Choices made"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={done}
        >
          <span style={{ width: `${(done / total) * 100}%` }} />
        </div>
        <p className="bag-progress-text">
          {done === total ? "All chosen" : `${done} of ${total} chosen`}
        </p>
        <ul className="bag-sum-list">
          <SummaryRow label="Quilting" value={form.quilted} quilted={form.quilted === "Quilted"} />
          <SummaryRow
            label={twoOuter ? "Outer, first" : "Outer"}
            value={form.outer}
            image={imageOf(FABRICS, form.outer)}
          />
          {twoOuter && (
            <SummaryRow label="Outer, second" value={form.outer2} image={imageOf(FABRICS, form.outer2)} />
          )}
          <SummaryRow label="Lining" value={form.lining} image={imageOf(FABRICS, form.lining)} />
          <SummaryRow label="Strap" value={form.strap} image={imageOf(STRAP_COLORS, form.strap)} />
          <SummaryRow label="Thread" value={form.thread} image={imageOf(THREAD_COLORS, form.thread)} />
        </ul>
        <p className="bag-sum-price">
          {money(bag.price)}
          <span>{money(deposit)} deposit</span>
        </p>
      </aside>
    </div>
  );
}
