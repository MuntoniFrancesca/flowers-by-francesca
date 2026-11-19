# Francesca Makes

A small React + Vite shop site. Buyers click "Buy with Venmo" and land on a Venmo payment page with the amount and item name filled in.

## Run it in VS Code

1. Install [Node.js](https://nodejs.org) (LTS version).
2. Open this folder in VS Code (File > Open Folder).
3. Open the terminal (Terminal > New Terminal) and run:

```bash
npm install
npm run dev
```

4. Open the link it prints (usually http://localhost:5173).

## Make it yours

- **Venmo username:** open `src/products.js` and change `VENMO_USERNAME`.
- **Products:** edit the `PRODUCTS` list in the same file (name, price, description).
- **Photos:** put images in a `public/images` folder, then add `image: "/images/my-soap.jpg"` to a product. Without an image, the emoji shows instead.
- **Colors:** the `:root` block at the top of `src/styles.css`.

## Put it online

Run `npm run build`, then upload the `dist` folder to a free host like Netlify, Vercel, or GitHub Pages.