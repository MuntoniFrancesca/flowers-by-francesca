// ============================================================
// EDIT THIS FILE to change what's in your shop.
// Each product needs: id, name, category, price, description
// Optional: image (put the photo in /public/images and use "/images/yourfile.jpg")
// category must match one of the keys in CATEGORIES below.
// ============================================================

// Your Venmo username (no @). Buyers get sent to pay this account.
export const VENMO_USERNAME = "YOUR-VENMO-USERNAME";

export const FABRICS = [
  {
    id: "blue-floral-cream",
    name: "Blue floral on cream",
    image: "/images/fabrics/Blue_Foral_On_Cream_Cotton_Calico_Fabric.webp",
  },
  {
    id: "dark-blue-floral",
    name: "Dark blue floral",
    image: "/images/fabrics/Dark_Blue_Floral_Cotton_Calico_Fabric.webp",
  },
  {
    id: "earth-botanical",
    name: "Earth botanical",
    image: "/images/fabrics/Earth_Botanical_Cotton_Calico.webp",
  },
  {
    id: "homespun-brown",
    name: "Homespun brown",
    image: "/images/fabrics/Homespun_Brown_Cotton_Fabric.webp",
  },
  {
    id: "red-sage-floral",
    name: "Red and sage floral",
    image: "/images/fabrics/Red__Sage_Floral_Cotton_Calico_Fabric.webp",
  },
  {
    id: "wine-tan-check",
    name: "Wine and tan check",
    image: "/images/fabrics/Wine__Tan_Basic_Check_Homespun_Cotton_Fabric.webp",
  },
];

export const STRAP_COLORS = [
  { id: "brown", name: "Brown", image: "/images/straps/brown.webp" },
  { id: "navy", name: "Navy", image: "/images/straps/navy.webp" },
  { id: "black", name: "Black", image: "/images/straps/black.webp" },
];

export const THREAD_COLORS = [
  { id: "cream", name: "Cream", image: "/images/thread/cream.webp" },
  { id: "black", name: "Black", image: "/images/thread/black.webp" },
];

// The sections on the page, in the order they appear.
// tone: 0 = lilac, 1 = sky blue, 2 = butter yellow (colors are in styles.css)
export const CATEGORIES = [
  { key: "sewing", title: "Sewn Goods", tone: 2 },
  { key: "soap", title: "Soap", tone: 0 },
  { key: "jewelry", title: "Jewelry", tone: 1 },
];

export const ORDER_EMAIL = "YOUR-EMAIL@example.com";
export const DEPOSIT_PERCENT = 50; // the caparra

export const PRODUCTS = [
  // Sewing
  {
    id: "bag",
    name: "Bag",
    category: "sewing",
    price: 45,
    description: "Sewn from cotton, fully lined, with inside pockets.",
  },
  {
    id: "scrunchie-set",
    name: "Garden scrunchie set",
    category: "sewing",
    price: 15,
    description: "Three soft scrunchies in assorted floral prints.",
  },
  {
    id: "zip-pouch",
    name: "Blossom zip pouch",
    category: "sewing",
    price: 20,
    description: "A small zippered pouch for makeup, pens, and other little things.",
  },

  // Soap
  {
    id: "oatmeal-soap",
    name: "Oatmeal and chamomile soap",
    category: "soap",
    price: 8,
    description: "A gentle, creamy oatmeal bar topped with dried chamomile flowers.",
  },
  {
    id: "coffee-soap",
    name: "Coffee and rose soap",
    category: "soap",
    price: 8,
    description: "A rich coffee bar with dried rosebuds on top.",
  },
  {
    id: "coconut-soap",
    name: "Coconut and hibiscus soap",
    category: "soap",
    price: 8,
    description: "A bright coconut bar topped with pink hibiscus petals.",
  },

  // Jewelry
  {
    id: "flower-earrings",
    name: "Flower earrings",
    category: "jewelry",
    price: 18,
    description: "Lightweight drops with tiny flowers set in clear epoxy.",
  },
  {
    id: "flower-necklace",
    name: "Pressed flower necklace",
    category: "jewelry",
    price: 15,
    description: "A real flower sealed in epoxy.",
  },
  {
    id: "flower-keychain",
    name: "Flower keychain",
    category: "jewelry",
    price: 10,
    description: "A pressed flower in resin, made to be carried every day.",
  },
];
