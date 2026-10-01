// WhatsApp number in international format (Ghana: 0532340875 -> 233532340875)
const WHATSAPP_NUMBER = "233532340875";
const CURRENCY = "GH₵";

// Edit names, descriptions and prices here
const products = [
  { id: 1, name: "3-Piece Bag Set (Wine Red)", category: "bags", price: 280, image: "bags/g13.png",
    desc: "Tote, crossbody and clutch with gold tassel." },
  { id: 2, name: "Structured Top-Handle Bag (Maroon)", category: "shoes", price: 220, image: "foot/a16.png",
    desc: "Smooth finish with a gold bar clasp." },
  { id: 3, name: "Pointed Heels with Gold Emblem", category: "shoes", price: 180, image: "foot/f7.png",
    desc: "Available in green, black and burgundy." },
  { id: 4, name: "Blue Crystal Heels and Clutch Set", category: "bags", price: 350, image: "bags/bag_5.jpg",
    desc: "Sparkling buckle heels with a matching clutch." },
  { id: 5, name: "Crystal Mini Bag", category: "bags", price: 150, image: "bags/bag_4.jpg",
    desc: "Shimmering mini bag in silver, gold and black." },
  { id: 6, name: "Classic Check Handbag", category: "bags", price: 260, image: "bags/bag_1.jpg",
    desc: "Check print with tan handles and gold details.", position: "70% 50%" },
  { id: 7, name: "Blush Pink Crossbody Bag", category: "bags", price: 200, image: "bags/bag_2.jpg",
    desc: "Top handles plus a detachable shoulder strap." },
  { id: 8, name: "Blush Pink Crossbody Bag", category: "shoes", price: 200, image: "foot/a5.png",
    desc: "Top handles plus a detachable shoulder strap." },
  { id: 9, name: "Blush Pink Crossbody Bag", category: "bags", price: 200, image: "bags/g9.png",
    desc: "Top handles plus a detachable shoulder strap." },
  { id: 10, name: "Blush Pink Crossbody Bag", category: "shoes", price: 200, image: "foot/w_10.jpg",
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









