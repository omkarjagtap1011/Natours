/* eslint-disable */

((g) => {
  var h,
    a,
    k,
    p = 'The Google Maps JavaScript API',
    c = 'google',
    l = 'importLibrary',
    q = '__ib__',
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement('script'));
        e.set('libraries', [...r] + '');
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => '_' + t[0].toLowerCase()),
            g[k],
          );
        e.set('callback', c + '.maps.' + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + ' could not load.')));
        a.nonce = m.querySelector('script[nonce]')?.nonce || '';
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + ' only loads once. Ignoring:', g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  key: 'AIzaSyD17ldU_gdRWnEKNm6py-0a4cbOsBYuBAQ',
  v: 'weekly',
  // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
  // Add other bootstrap parameters as needed, using camel case.
});

let map;

export const initMap = async (mapContainer, locations) => {
  // The location of Uluru
  //   const center = { lat: 34.111745, lng: -118.113491 };
  //   const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
  const { LatLngBounds } = await google.maps.importLibrary('core');
  // const { InfoWindow } = await google.maps.importLibrary('infoWindow');

  map = new Map(mapContainer, {
    // zoom: 10,
    // center: center,
    mapId: 'DEMO_MAP_ID',
    scrollwheel: false,
    zoomControl: true,
  });

  const bounds = new LatLngBounds();

  locations.forEach((loc) => {
    const position = { lat: loc.coordinates[1], lng: loc.coordinates[0] };

    const marker = new AdvancedMarkerElement({
      map: map,
      position: position,
      title: loc.description,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<div><strong>Day ${loc.day}: ${loc.description}</strong></div>`,
    });

    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });

    bounds.extend(position);
  });

  map.fitBounds(bounds, { top: 200, bottom: 200, left: 100, right: 100 });
};
