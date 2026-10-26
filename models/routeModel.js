const routes = new Map();
let nextId = 1;
function getAll() { return [...routes.values()]; }
function getById(id) { return routes.get(String(id)) || null; }
function create(data) {
  const route = {
    id: String(nextId++),
    origin: { placeName: data.origin.placeName.trim(), latitude: data.origin.latitude, longitude: data.origin.longitude },
    destination: { placeName: data.destination.placeName.trim(), latitude: data.destination.latitude, longitude: data.destination.longitude },
    departureDate: data.departureDate, departureTime: data.departureTime,
    availableSeats: data.availableSeats, pricePerSeat: data.pricePerSeat,
    createdAt: new Date().toISOString()
  };
  routes.set(route.id, route);
  return route;
}
module.exports = { getAll, getById, create };
