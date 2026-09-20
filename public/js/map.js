window.addEventListener("load", () => {
  if (typeof maplibregl === "undefined") {
    console.error("MapLibre GL script load nahi hui!");
    return;
  }

  // Fallback coordinates [Longitude, Latitude]
  let coordinates = [80.9462, 26.8467];

  if (
    typeof listing !== "undefined" &&
    listing.geometry &&
    Array.isArray(listing.geometry.coordinates) &&
    listing.geometry.coordinates.length === 2
  ) {
    coordinates = listing.geometry.coordinates;
  }

  const map = new maplibregl.Map({
    container: "map",
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${mapToken}`,
    center: coordinates,
    zoom: 9,
  });

  // Zoom buttons
  map.addControl(new maplibregl.NavigationControl(), "top-right");

  // Marker aur Popup
  new maplibregl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .setPopup(
      new maplibregl.Popup({ offset: 25 }).setHTML(
        `<h4>${listing?.title || "Listing Location"}</h4><p>Exact Location will be provided after booking</p>`
      )
    )
    .addTo(map);
});