/* ==========================================================================
   ABM Kabara Motors – INVENTORY
   --------------------------------------------------------------------------
   This is the only file you need to edit to add, change or remove cars.

   Each car is one block between { and }. Copy a block to add a new car.
     name:      Car name shown on the card, e.g. "Toyota Camry 2018"
     type:      One of "SUV", "Sedan", "Truck", "Luxury"  (used by the filters)
     condition: "Tokunbo" or "Nigerian Used"
     year, transmission, fuel, mileage: shown as small tags (leave "" to hide)
     price:     e.g. "₦18,500,000" – or leave "" to show "Price on request"
     image:     Path to a photo, e.g. "images/cars/camry-2018.jpg"
                (put the photo in the images/cars folder). Leave "" for a placeholder.
     sold:      true to mark the car as sold, false otherwise

   The cars below are EXAMPLES – replace them with your real stock.
   ========================================================================== */

const INVENTORY = [
  {
    name: "Toyota Highlander",
    type: "SUV",
    condition: "Tokunbo",
    year: "2016",
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "",
    price: "",
    image: "",
    sold: false,
  },
  {
    name: "Toyota Camry",
    type: "Sedan",
    condition: "Nigerian Used",
    year: "2014",
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "",
    price: "",
    image: "",
    sold: false,
  },
  {
    name: "Toyota Hilux",
    type: "Truck",
    condition: "Tokunbo",
    year: "2017",
    transmission: "Manual",
    fuel: "Diesel",
    mileage: "",
    price: "",
    image: "",
    sold: false,
  },
  {
    name: "Lexus RX 350",
    type: "Luxury",
    condition: "Tokunbo",
    year: "2015",
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "",
    price: "",
    image: "",
    sold: false,
  },
  {
    name: "Honda CR-V",
    type: "SUV",
    condition: "Nigerian Used",
    year: "2013",
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "",
    price: "",
    image: "",
    sold: false,
  },
  {
    name: "Mercedes-Benz C300",
    type: "Luxury",
    condition: "Tokunbo",
    year: "2016",
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "",
    price: "",
    image: "",
    sold: false,
  },
];

/* WhatsApp number used for every "Enquire" button – international format, digits only. */
const WHATSAPP_NUMBER = "2348166862712";

/* ----------------------------- rendering ------------------------------ */
(function () {
  const grid = document.getElementById("inventory-grid");
  const empty = document.getElementById("inventory-empty");
  const count = document.getElementById("inventory-count");
  if (!grid) return;

  const CAR_SVG =
    '<svg viewBox="0 0 64 32" fill="currentColor" aria-hidden="true"><path d="M10 22h-4a2 2 0 0 1-2-2v-4l4-1 6-7h24l9 7 9 1.5a2 2 0 0 1 2 2V20a2 2 0 0 1-2 2h-4"/><circle cx="16" cy="23" r="5"/><circle cx="48" cy="23" r="5"/></svg>';

  const escape = (v) =>
    String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const filters = { type: "All", condition: "All" };

  function waLink(car) {
    const msg = `Hello ABM Kabara Motors, I'm interested in the ${[car.year, car.name].filter(Boolean).join(" ")} (${car.condition}). Is it still available?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  function card(car) {
    const tags = [car.year, car.transmission, car.fuel, car.mileage].filter(Boolean);
    const media = car.image
      ? `<img src="${escape(car.image)}" alt="${escape(car.name)}" loading="lazy">`
      : `<div class="car-card__placeholder">${CAR_SVG}<span>Photo coming soon</span></div>`;
    return `
      <article class="car-card${car.sold ? " is-sold" : ""}">
        <div class="car-card__media">
          ${media}
          <span class="car-card__badge">${escape(car.condition)}</span>
          ${car.sold ? '<span class="car-card__sold">Sold</span>' : ""}
        </div>
        <div class="car-card__body">
          <p class="car-card__type">${escape(car.type)}</p>
          <h3 class="car-card__title">${escape(car.name)}</h3>
          <ul class="car-card__tags">${tags.map((t) => `<li>${escape(t)}</li>`).join("")}</ul>
          <div class="car-card__footer">
            <span class="car-card__price">${car.price ? escape(car.price) : "Price on request"}</span>
            ${car.sold ? "" : `<a class="btn btn--gold btn--sm" href="${waLink(car)}" target="_blank" rel="noopener">Enquire</a>`}
          </div>
        </div>
      </article>`;
  }

  function render() {
    const list = INVENTORY.filter(
      (c) =>
        (filters.type === "All" || c.type === filters.type) &&
        (filters.condition === "All" || c.condition === filters.condition)
    );
    grid.innerHTML = list.map(card).join("");
    empty.hidden = list.length > 0;
    count.textContent = `${list.length} vehicle${list.length === 1 ? "" : "s"}`;
  }

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.dataset.filter;
      filters[group] = btn.dataset.value;
      document.querySelectorAll(`[data-filter="${group}"]`).forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      render();
    });
  });

  render();
})();
