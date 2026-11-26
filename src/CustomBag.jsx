import OrderForm from "./OrderForm.jsx";
import "./custom-bag.css";

export default function CustomBag() {
  return (
    <main id="custom-bag" className="bag-page">
      <a className="bag-back" href="#top">
        Back to the shop
      </a>
      <h1 className="bag-title">Design your bag</h1>
      <OrderForm />
    </main>
  );
}
