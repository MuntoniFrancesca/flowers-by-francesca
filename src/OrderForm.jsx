import { useState } from "react";
import {
  FABRICS, PRODUCTS, VENMO_USERNAME, ORDER_EMAIL, DEPOSIT_PERCENT,
} from "./products.js";

const bag = PRODUCTS.find((p) => p.id === "bag");
const deposit = Math.round(bag.price * DEPOSIT_PERCENT) / 100;

function ChoiceGroup({ legend, name, options, value, onChange }) {
  return (
    <fieldset className="choice-group">
      <legend>{legend}</legend>
      <div className="choices">
        {options.map((o) => (
          <label key={o} className={value === o ? "choice picked" : "choice"}>
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
    </fieldset>
  );
}

function FabricPicker({ legend, name, value, onChange }) {
  return (
    <fieldset className="fabric-picker">
      <legend>{legend}</legend>
      <div className="swatches">
        {FABRICS.map((f) => (
          <label key={f.id} className={value === f.name ? "swatch picked" : "swatch"}>
            <input
              type="radio"
              name={name}
              value={f.name}
              checked={value === f.name}
              onChange={() => onChange(f.name)}
              required
            />
            <img src={f.image} alt={f.name} loading="lazy" />
            <span>{f.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function OrderForm() {
  const [form, setForm] = useState({
    name: "", email: "", address: "",
    quilted: "", outerMode: "One fabric", outer: "", outer2: "",
    lining: "", notes: "",
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

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <p>
        Each bag is handmade to order. Please allow at least 2 weeks for
        production before shipping. A {DEPOSIT_PERCENT}% deposit (${deposit})
        confirms your order, and the balance is due before shipping.
      </p>

      <label>Name <input required value={form.name} onChange={(e) => set("name")(e.target.value)} /></label>
      <label>Email <input type="email" required value={form.email} onChange={(e) => set("email")(e.target.value)} /></label>
      <label>Shipping address <textarea required value={form.address} onChange={(e) => set("address")(e.target.value)} /></label>

      <ChoiceGroup
        legend="Quilted?"
        name="quilted"
        options={["Quilted", "Not quilted"]}
        value={form.quilted}
        onChange={set("quilted")}
      />

      <ChoiceGroup
        legend="Outer fabric"
        name="outerMode"
        options={["One fabric", "Two fabrics"]}
        value={form.outerMode}
        onChange={setOuterMode}
      />

      <FabricPicker
        legend={twoOuter ? "Outer fabric, first" : "Outer fabric"}
        name="outer"
        value={form.outer}
        onChange={set("outer")}
      />
      {twoOuter && (
        <FabricPicker
          legend="Outer fabric, second"
          name="outer2"
          value={form.outer2}
          onChange={set("outer2")}
        />
      )}

      <FabricPicker legend="Lining fabric" name="lining" value={form.lining} onChange={set("lining")} />

      <label>Notes <textarea value={form.notes} onChange={(e) => set("notes")(e.target.value)} /></label>

      <label className="agree">
        <input type="checkbox" required /> I understand the production time and deposit terms.
      </label>

      <button type="submit" className="buy">Send my order</button>

      {sent && (
        <p className="next-step">
          Your email app should have opened. Send it, then pay the deposit:{" "}
          <a className="buy" href={venmoUrl} target="_blank" rel="noopener noreferrer">
            Pay ${deposit} deposit with Venmo
          </a>
        </p>
      )}
    </form>
  );
}