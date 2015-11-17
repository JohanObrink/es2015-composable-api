export default function search(api) {
  
  function getBanksByName(name) {
    return api.http.get('/search/branch', {name}, api.cache.forever);
  }

  function getBanksByLocation(latitude, longitude, radius) {
    return api.http.get('/search/location', {latitude, longitude, radius}, api.cache.none);
  }

  api.search = {
    getBanksByName,
    getBanksByLocation
  };

  return api;
}
