// WhatsApp number in international format (Ghana: 0532340875 -> 233532340875)
const WHATSAPP_NUMBER = "233532340875";
const CURRENCY = "GH₵";

// Edit names, descriptions and prices here
const products = [
  { id: 1, name: "3-Piece Bag Set (Wine Red)", category: "bags", price: 280, image: "images/bag-set.jpg",
    desc: "Tote, crossbody and clutch with gold tassel." },
  { id: 2, name: "Structured Top-Handle Bag (Maroon)", category: "bags", price: 220, image: "images/bag-maroon.png",
    desc: "Smooth finish with a gold bar clasp." },
  { id: 3, name: "Pointed Heels with Gold Emblem", category: "shoes", price: 180, image: "images/heels-classic.png",
    desc: "Available in green, black and burgundy." },
  { id: 4, name: "Blue Crystal Heels and Clutch Set", category: "shoes", price: 350, image: "images/heels-blue.png",
    desc: "Sparkling buckle heels with a matching clutch." },
  { id: 5, name: "Crystal Mini Bag", category: "bags", price: 150, image: "images/bag-crystal.png",
    desc: "Shimmering mini bag in silver, gold and black." },
  { id: 6, name: "Classic Check Handbag", category: "bags", price: 260, image: "images/bag-check.png",
    desc: "Check print with tan handles and gold details.", position: "70% 50%" },
  { id: 7, name: "Blush Pink Crossbody Bag", category: "bags", price: 200, image: "images/bag-pink.jpg",
    desc: "Top handles plus a detachable shoulder strap." }
];

const grid = document.getElementById("product-grid");

function formatPrice(n) {
  return `${CURRENCY} ${n.toLocaleString("en-GH")}`;
}

function buildOrderLink(product) {
  // A full image link is only included once the site is online (http/https)
  let imageLine = "";
  if (location.protocol.startsWith("http")) {
    imageLine = `\nImage: ${new URL(product.image, location.href).href}`;
  }
  const message =
    `Hello NII BOARD, I want to order:\n\n` +
    `Product: ${product.name}\n` +
    `Price: ${formatPrice(product.price)}` +
    imageLine +
    `\n\nPlease confirm availability.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function render(filter = "all") {
  grid.innerHTML = "";
  products
    .filter(p => filter === "all" || p.category === filter)
    .forEach(p => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="card-img"><img src="${p.image}" alt="${p.name}" loading="lazy" style="${p.position ? `object-position:${p.position}` : ""}"></div>
        <div class="card-body">
          <h3>${p.name}</h3>
          <p class="desc">${p.desc}</p>
          <p class="price">${formatPrice(p.price)}</p>
          <button class="order-btn" type="button" data-id="${p.id}">Order on WhatsApp</button>
        </div>`;
      grid.appendChild(card);
    });
}

// Order button click -> open WhatsApp with the product details
grid.addEventListener("click", e => {
  const btn = e.target.closest(".order-btn");
  if (!btn) return;
  const product = products.find(p => p.id === Number(btn.dataset.id));
  window.open(buildOrderLink(product), "_blank", "noopener");
});

// Category filters
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.filter);
  });
});

// Floating WhatsApp button and footer year
document.getElementById("wa-float").href =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello NII BOARD, I have a question.")}`;
document.getElementById("year").textContent = new Date().getFullYear();

render();
