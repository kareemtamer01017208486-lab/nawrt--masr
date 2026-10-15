"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const places = [
  { id: "pyramids", name: "أهرامات الجيزة", en: "Giza Pyramids", gov: "الجيزة", category: "historic", rating: 4.9, paid: true, icon: "𓂀" },
  { id: "karnak", name: "معبد الكرنك", en: "Karnak Temple", gov: "الأقصر", category: "historic", rating: 4.8, paid: true, icon: "🏛️" },
  { id: "library", name: "مكتبة الإسكندرية", en: "Bibliotheca Alexandrina", gov: "الإسكندرية", category: "culture", rating: 4.6, paid: true, icon: "📚" },
  { id: "ras-mohamed", name: "محمية رأس محمد", en: "Ras Mohammed", gov: "جنوب سيناء", category: "nature", rating: 4.8, paid: true, icon: "🐠" },
  { id: "khan", name: "خان الخليلي", en: "Khan el-Khalili", gov: "القاهرة", category: "culture", rating: 4.5, paid: false, icon: "🏮" },
  { id: "fayoum", name: "وادي الريان", en: "Wadi El Rayan", gov: "الفيوم", category: "nature", rating: 4.4, paid: true, icon: "🏞️" },
  { id: "hurghada", name: "جزر الجفتون", en: "Giftun Islands", gov: "البحر الأحمر", category: "beach", rating: 4.7, paid: true, icon: "⛵" },
  { id: "abu-simbel", name: "أبو سمبل", en: "Abu Simbel", gov: "أسوان", category: "historic", rating: 4.9, paid: true, icon: "🗿" }
];

const hotels = [
  { id: "hotel-nile", name: "فندق إطلالة النيل", en: "Nile View Hotel", gov: "القاهرة", price: 1800, rating: 4.7, icon: "🏨" },
  { id: "hotel-luxor", name: "إقامة الأقصر", en: "Luxor Stay", gov: "الأقصر", price: 1350, rating: 4.5, icon: "🌅" },
  { id: "hotel-redsea", name: "منتجع البحر الأحمر", en: "Red Sea Resort", gov: "البحر الأحمر", price: 2400, rating: 4.8, icon: "🏖️" }
];

const governors = ["القاهرة", "الجيزة", "الإسكندرية", "الأقصر", "أسوان", "الفيوم", "جنوب سيناء", "البحر الأحمر"];
const stationLists = {
  east: ["مدينة نصر", "المشير طنطاوي", "المستشفى الجوي", "النرجس", "المستثمرين", "العاصمة الإدارية"],
  west: ["وادي النيل", "الجامعة", "الطالبية", "المريوطية", "مدينة الإنتاج الإعلامي", "6 أكتوبر"]
};

const distanceKm = {
  "القاهرة|الجيزة": 30,
  "القاهرة|الإسكندرية": 220,
  "القاهرة|الأقصر": 650,
  "القاهرة|أسوان": 850,
  "القاهرة|الفيوم": 100,
  "القاهرة|جنوب سيناء": 500,
  "القاهرة|البحر الأحمر": 450
};

const dictionaries = {
  ar: {
    navPlaces:"الأماكن", navHotels:"الإقامة", navTransport:"المواصلات", navBookings:"حجوزاتي", navFavorites:"المفضلة",
    language:"اللغة", heroEyebrow:"رحلتك المصرية تبدأ هنا", heroTitle:"اكتشف مصر<br><span>على طريقتك</span>",
    heroDescription:"خطط لرحلتك، اكتشف أماكن جديدة، واحجز تنقلك بسهولة.", exploreButton:"اكتشف الأماكن",
    heroTagline:"من النيل إلى البحر الأحمر", quickPlaces:"أماكن تستحق الزيارة", quickHotels:"إقامة مناسبة",
    quickTransport:"تنقّل بسهولة", placesEyebrow:"خطط لمغامرتك القادمة", placesTitle:"أماكن تخلّي الرحلة ذكرى",
    searchPlaceholder:"ابحث عن مكان أو محافظة", governorate:"المحافظة", category:"التصنيف", rating:"التقييم",
    price:"السعر", allCategories:"كل التصنيفات", historic:"تاريخي", nature:"طبيعة", beach:"شاطئ",
    culture:"ثقافة", anyRating:"كل التقييمات", anyPrice:"كل الأسعار", free:"مجاني", paid:"مدفوع",
    hotelsEyebrow:"اختيارات مميزة", hotelsTitle:"مكان ترتاح فيه بعد يوم طويل", planTrip:"خطط لبقية رحلتك ↗",
    transportEyebrow:"من نقطة لنقطة", transportTitle:"اختار وسيلة تنقلك", carTab:"سيارة خاصة",
    monorailTab:"المونوريل", carFormTitle:"احجز سيارة", carFormHint:"أدخل تفاصيل رحلتك لمعرفة السعر التقديري.",
    fullName:"الاسم بالكامل", phone:"رقم الهاتف", departureGovernorate:"محافظة الانطلاق",
    arrivalGovernorate:"محافظة الوصول", departurePoint:"نقطة الانطلاق", arrivalPoint:"نقطة الوصول",
    vehicleType:"نوع السيارة", economy:"اقتصادية", family:"عائلية", minibus:"ميني باص",
    passengers:"عدد الركاب", travelDate:"التاريخ", travelTime:"الوقت", notes:"ملاحظات إضافية",
    submitBooking:"إرسال طلب الحجز", monorailFormTitle:"احجز رحلة مونوريل",
    monorailHint:"حدد الخط والمحطات وعدد الركاب.", line:"الخط", eastLine:"خط شرق النيل",
    westLine:"خط غرب النيل", fromStation:"محطة الانطلاق", toStation:"محطة الوصول",
    localSaveNote:"سيُحفظ الطلب على هذا الجهاز.", yourTrips:"رحلاتك", bookingsTitle:"حجوزاتي",
    allBookings:"كل الطلبات", carOnly:"السيارات", monorailOnly:"المونوريل",
    yourSaved:"أماكنك المحفوظة", favoritesTitle:"المفضلة",
    footerText:"مصر مليانة حكايات… ابدأ حكايتك.", backTop:"العودة للأعلى ↑",
    emptyPlaces:"لا توجد أماكن تطابق البحث.", emptyHotels:"لا توجد فنادق متاحة.",
    emptyBookings:"لا توجد حجوزات محفوظة حتى الآن.", emptyFavorites:"لم تضف أماكن للمفضلة بعد.",
    estimated:"السعر التقديري", remove:"حذف", saved:"تم حفظ طلبك على هذا الجهاز.",
    deleted:"تم الحذف.", governorates:"كل المحافظات", car:"سيارة", mono:"مونوريل",
    perNight:"لليلة", egp:"جنيه", location:"الموقع", priceLabel:"السعر"
  },
  en: {
    navPlaces:"Places", navHotels:"Stay", navTransport:"Transport", navBookings:"My bookings", navFavorites:"Favorites",
    language:"Language", heroEyebrow:"Your Egyptian journey starts here", heroTitle:"Discover Egypt<br><span>your way</span>",
    heroDescription:"Plan your trip, discover new places, and book transport with ease.", exploreButton:"Explore places",
    heroTagline:"From the Nile to the Red Sea", quickPlaces:"Places worth visiting", quickHotels:"Find a place to stay",
    quickTransport:"Get around easily", placesEyebrow:"Plan your next adventure", placesTitle:"Make the journey a memory",
    searchPlaceholder:"Search places or governorates", governorate:"Governorate", category:"Category", rating:"Rating",
    price:"Price", allCategories:"All categories", historic:"Historic", nature:"Nature", beach:"Beach",
    culture:"Culture", anyRating:"Any rating", anyPrice:"Any price", free:"Free", paid:"Paid",
    hotelsEyebrow:"Handpicked stays", hotelsTitle:"A place to rest after a long day", planTrip:"Plan the rest of your trip ↗",
    transportEyebrow:"Point to point", transportTitle:"Choose how to get around", carTab:"Private car",
    monorailTab:"Monorail", carFormTitle:"Book a car", carFormHint:"Enter your trip details for an estimated fare.",
    fullName:"Full name", phone:"Phone number", departureGovernorate:"Departure governorate",
    arrivalGovernorate:"Arrival governorate", departurePoint:"Pickup point", arrivalPoint:"Drop-off point",
    vehicleType:"Vehicle type", economy:"Economy", family:"Family", minibus:"Minibus",
    passengers:"Passengers", travelDate:"Date", travelTime:"Time", notes:"Additional notes",
    submitBooking:"Submit booking request", monorailFormTitle:"Book a monorail trip",
    monorailHint:"Choose a line, stations, and passenger count.", line:"Line", eastLine:"East Nile line",
    westLine:"West Nile line", fromStation:"From station", toStation:"To station",
    localSaveNote:"Your request is saved on this device.", yourTrips:"Your trips", bookingsTitle:"My bookings",
    allBookings:"All requests", carOnly:"Cars", monorailOnly:"Monorail",
    yourSaved:"Your saved places", favoritesTitle:"Favorites",
    footerText:"Egypt is full of stories. Start yours.", backTop:"Back to top ↑",
    emptyPlaces:"No places match your search.", emptyHotels:"No hotels available.",
    emptyBookings:"No saved bookings yet.", emptyFavorites:"You have no saved favorites yet.",
    estimated:"Estimated price", remove:"Delete", saved:"Your request was saved on this device.",
    deleted:"Deleted.", governorates:"All governorates", car:"Car", mono:"Monorail",
    perNight:"per night", egp:"EGP", location:"Location", priceLabel:"Price"
  }
};

let language = localStorage.getItem("noorMasrLanguage") || "ar";
let favorites = readStorage("noorMasrFavorites", []);
let bookings = readStorage("noorMasrBookings", []);

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}
function saveStorage() {
  localStorage.setItem("noorMasrFavorites", JSON.stringify(favorites));
  localStorage.setItem("noorMasrBookings", JSON.stringify(bookings));
}
function tr(key) {
  return (dictionaries[language] || dictionaries.en)[key] || dictionaries.en[key] || key;
}
function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  })[char]);
}
function setLanguage(next) {
  language = next;
  localStorage.setItem("noorMasrLanguage", language);
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  $("#language-select").value = language;

  $$("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const value = tr(key);
    if (key === "heroTitle") el.innerHTML = value;
    else el.textContent = value;
  });
  $$("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = tr(el.dataset.i18nPlaceholder);
  });

  fillGovernorates();
  fillStations();
  renderAll();
}
function fillGovernorates() {
  const label = `<option value="">${tr("governorates")}</option>`;
  $("#governorate-filter").innerHTML =
    label + governors.map(g => `<option value="${safe(g)}">${safe(g)}</option>`).join("");
  $$(".governorate-options").forEach(select => {
    select.innerHTML = governors.map(g => `<option value="${safe(g)}">${safe(g)}</option>`).join("");
  });
}
function fillStations() {
  const stations = stationLists[$("#monorail-line").value];
  ["#from-station", "#to-station"].forEach(selector => {
    $(selector).innerHTML = stations.map(s => `<option>${safe(s)}</option>`).join("");
  });
}
function placeName(item) {
  return language === "en" ? item.en : item.name;
}
function cardMarkup(item, type) {
  const isHotel = type === "hotel";
  const saved = favorites.includes(item.id);
  const details = isHotel
    ? `${safe(item.gov)} · ${item.price.toLocaleString()} ${tr("egp")} ${tr("perNight")}`
    : `${safe(item.gov)} · ${tr(item.category)} · ${item.paid ? tr("paid") : tr("free")}`;
  return `
    <article class="travel-card">
      <div class="card-art" aria-hidden="true">${item.icon}</div>
      <div class="card-info">
        <h3>${safe(placeName(item))}</h3>
        <div class="card-meta">
          <span>${details}</span>
          <span class="rating">★ ${item.rating}</span>
        </div>
        <div class="card-actions">
          ${isHotel ? `<span>${tr("priceLabel")}: ${item.price.toLocaleString()} ${tr("egp")}</span>` : `<span>${tr("location")}: ${safe(item.gov)}</span>`}
          <button class="favorite-button ${saved ? "is-saved" : ""}" type="button"
            data-favorite="${item.id}" aria-label="${tr("favorites")}">${saved ? "♥" : "♡"}</button>
        </div>
      </div>
    </article>`;
}
function renderPlaces() {
  const query = $("#place-search").value.trim().toLocaleLowerCase();
  const gov = $("#governorate-filter").value;
  const category = $("#category-filter").value;
  const rating = Number($("#rating-filter").value);
  const price = $("#price-filter").value;

  const filtered = places.filter(place => {
    const matchesQuery = !query ||
      place.name.toLocaleLowerCase().includes(query) ||
      place.en.toLocaleLowerCase().includes(query) ||
      place.gov.toLocaleLowerCase().includes(query);
    return matchesQuery && (!gov || place.gov === gov) &&
      (!category || place.category === category) && place.rating >= rating &&
      (price === "all" || (price === "free" ? !place.paid : place.paid));
  });
  $("#places-grid").innerHTML = filtered.length
    ? filtered.map(place => cardMarkup(place, "place")).join("")
    : `<p class="empty-state">${tr("emptyPlaces")}</p>`;
}
function renderHotels() {
  $("#hotels-grid").innerHTML = hotels.length
    ? hotels.map(hotel => cardMarkup(hotel, "hotel")).join("")
    : `<p class="empty-state">${tr("emptyHotels")}</p>`;
}
function renderFavorites() {
  const savedItems = [...places, ...hotels].filter(item => favorites.includes(item.id));
  $("#favorites-grid").innerHTML = savedItems.length
    ? savedItems.map(item => cardMarkup(item, item.id.startsWith("hotel-") ? "hotel" : "place")).join("")
    : `<p class="empty-state">${tr("emptyFavorites")}</p>`;
}
function renderBookings() {
  const filter = $("#booking-filter").value;
  const list = bookings.filter(booking => filter === "all" || booking.type === filter);
  $("#bookings-list").innerHTML = list.length ? list.map(booking => `
    <article class="travel-card">
      <div class="card-info">
        <div class="card-meta">
          <h3>${safe(booking.kind)}</h3>
          <span>${safe(booking.date || "")} ${safe(booking.time || "")}</span>
        </div>
        <p>${safe(booking.name)} · ${safe(booking.phone)}</p>
        <p>${safe(booking.summary)}</p>
        ${booking.price ? `<p class="rating">${tr("estimated")}: ${booking.price.toLocaleString()} ${tr("egp")}</p>` : ""}
        <button class="delete-button" type="button" data-delete-booking="${booking.id}">${tr("remove")}</button>
      </div>
    </article>`).join("") : `<p class="empty-state">${tr("emptyBookings")}</p>`;
}
function renderAll() {
  renderPlaces();
  renderHotels();
  renderFavorites();
  renderBookings();
}
function estimateCar() {
  const form = $("#car-form");
  const from = form.elements.fromGov.value;
  const to = form.elements.toGov.value;
  const pair = `${from}|${to}`;
  const reverse = `${to}|${from}`;
  const km = from === to ? 20 : distanceKm[pair] || distanceKm[reverse] || 250;
  const rates = { economy: 12, family: 18, minibus: 28 };
  const amount = Math.round(km * rates[form.elements.vehicle.value]);
  $("#car-estimate").textContent =
    `${tr("estimated")}: ${amount.toLocaleString()} ${tr("egp")} · ${km} km`;
  return amount;
}
let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}
function addBooking(booking) {
  bookings.unshift({ ...booking, id: crypto.randomUUID?.() || String(Date.now()) });
  saveStorage();
  renderBookings();
  showToast(tr("saved"));
}
function readForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

$("#language-select").addEventListener("change", event => setLanguage(event.target.value));
$("#theme-toggle").addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme !== "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  localStorage.setItem("noorMasrTheme", dark ? "dark" : "light");
  $("#theme-toggle").textContent = dark ? "☀" : "☾";
});
$("#menu-toggle").addEventListener("click", () => {
  const nav = $(".main-nav");
  const open = nav.classList.toggle("is-open");
  $("#menu-toggle").setAttribute("aria-expanded", String(open));
});
$$(".main-nav a").forEach(link => link.addEventListener("click", () => {
  $(".main-nav").classList.remove("is-open");
  $("#menu-toggle").setAttribute("aria-expanded", "false");
}));
$$("[data-tab]").forEach(button => button.addEventListener("click", () => {
  const car = button.dataset.tab === "car";
  $$("[data-tab]").forEach(tab => {
    const active = tab === button;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  $("#car-form").classList.toggle("is-hidden", !car);
  $("#monorail-form").classList.toggle("is-hidden", car);
}));
$("#monorail-line").addEventListener("change", fillStations);
$("#place-search").addEventListener("input", renderPlaces);
["#governorate-filter", "#category-filter", "#rating-filter", "#price-filter"]
  .forEach(selector => $(selector).addEventListener("change", renderPlaces));
$("#booking-filter").addEventListener("change", renderBookings);
$("#car-form").addEventListener("input", estimateCar);
$("#car-form").addEventListener("change", estimateCar);

$("#car-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = readForm(form);
  const vehicleLabels = { economy: tr("economy"), family: tr("family"), minibus: tr("minibus") };
  addBooking({
    type: "car",
    kind: tr("car"),
    name: data.name,
    phone: data.phone,
    date: data.date,
    time: data.time,
    summary: `${data.fromGov} — ${data.toGov} · ${data.fromPoint} → ${data.toPoint} · ${vehicleLabels[data.vehicle]} · ${data.passengers}`,
    price: estimateCar()
  });
  form.reset();
  estimateCar();
});
$("#monorail-form").addEventListener("submit", event => {
  event.preventDefault();
  const data = readForm(event.currentTarget);
  addBooking({
    type: "monorail",
    kind: tr("mono"),
    name: data.name,
    phone: data.phone,
    date: data.date,
    summary: `${data.line === "east" ? tr("eastLine") : tr("westLine")} · ${data.fromStation} → ${data.toStation} · ${data.passengers} ${tr("passengers")}`
  });
  event.currentTarget.reset();
  fillStations();
});
document.addEventListener("click", event => {
  const favoriteButton = event.target.closest("[data-favorite]");
  if (favoriteButton) {
    const id = favoriteButton.dataset.favorite;
    favorites = favorites.includes(id)
      ? favorites.filter(item => item !== id)
      : [...favorites, id];
    saveStorage();
    renderAll();
  }
  const deleteButton = event.target.closest("[data-delete-booking]");
  if (deleteButton) {
    bookings = bookings.filter(item => item.id !== deleteButton.dataset.deleteBooking);
    saveStorage();
    renderBookings();
    showToast(tr("deleted"));
  }
});

document.documentElement.dataset.theme = localStorage.getItem("noorMasrTheme") || "light";
$("#theme-toggle").textContent = document.documentElement.dataset.theme === "dark" ? "☀" : "☾";
fillGovernorates();
fillStations();
setLanguage(language);
estimateCar();
