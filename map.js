// Mapa měst ČR – Leaflet + GeoJSON

const mapa = L.map("mapa").setView([49.8, 15.5], 7); // střed ČR

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; přispěvatelé <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
}).addTo(mapa);

// Text popupu – hodnoty z GeoJSONu escapujeme, aby se nevložilo HTML
function esc(text) {
  const el = document.createElement("div");
  el.textContent = text ?? "";
  return el.innerHTML;
}

function naKazdyBod(feature, layer) {
  const p = feature.properties;
  layer.bindPopup(
    `<div class="popup">
       <h2>${esc(p.nazev)}</h2>
       <p>${esc(p.popis)}</p>
       <small>ID: ${esc(p.id)}</small>
     </div>`
  );
  layer.bindTooltip(p.nazev);
}

fetch("body.geojson")
  .then(odpoved => {
    if (!odpoved.ok) throw new Error(`HTTP ${odpoved.status}`);
    return odpoved.json();
  })
  .then(data => {
    const vrstva = L.geoJSON(data, { onEachFeature: naKazdyBod }).addTo(mapa);
    mapa.fitBounds(vrstva.getBounds(), { padding: [60, 60] });
    document.getElementById("pocet").textContent =
      `Počet měst: ${data.features.length}`;
  })
  .catch(chyba => {
    const el = document.getElementById("pocet");
    el.textContent = "Data se nepodařilo načíst. Spusťte stránku přes lokální server (viz readme).";
    el.classList.add("chyba");
    console.error("Chyba načítání body.geojson:", chyba);
  });
