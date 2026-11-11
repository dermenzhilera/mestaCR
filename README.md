# Mapa měst ČR (Leaflet)

Jednoduchá webová mapa měst České republiky. Body se načítají ze souboru GeoJSON.

## Struktura

| Soubor | Účel |
|---|---|
| `index.html` | Stránka, načtení Leafletu, CSS a skriptu |
| `map.js` | Inicializace mapy, načtení a vykreslení `body.geojson` |
| `styl.css` | Vzhled stránky a popupů |
| `body.geojson` | Data měst (bodové prvky) |
| `README.md` | Tento popis |

## Spuštění

Skript načítá `body.geojson` přes `fetch`, který **nefunguje při otevření souboru
přímo z disku** (`file://`). Je potřeba spustit lokální server:

```bash
cd mapa-mest
python -m http.server 8000
```

Poté otevřete <http://localhost:8000>. Alternativně lze použít rozšíření
Live Server ve VS Code.

## Atributy v GeoJSONu

| Atribut | Typ | Popis |
|---|---|---|
| `id` | číslo | Jedinečný identifikátor města |
| `nazev` | text | Název města |
| `popis` | text | Krátký popis, zobrazí se v popupu |

## Přidání nového města

Do pole `features` v `body.geojson` přidejte další prvek.
**Pozor na pořadí souřadnic: `[délka, šířka]`** (tedy `[lon, lat]`).

```json
{
  "type": "Feature",
  "properties": { "id": 3, "nazev": "Brno", "popis": "Popis města." },
  "geometry": { "type": "Point", "coordinates": [16.6068, 49.1951] }
}
```

Mapa se po načtení automaticky přiblíží tak, aby byly vidět všechny body.

## Použité knihovny a data

- [Leaflet](https://leafletjs.com/) 1.9.4 (načítáno z CDN unpkg)
- Podkladová mapa © přispěvatelé OpenStreetMap
