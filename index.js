export {};

function formatMetadata(lat, long, accuracy, timestamp, uriMaps) {
    let params = {
        latitude: lat,
        longitude: long,
        accuracy: accuracy,
        timestamp: timestamp,
        uriMaps: uriMaps.href
    }

    return params;
}

function updateStatus(text, isError = false) {
  const statusEl = document.getElementById('status');
  if(!statusEl) return;
  statusEl.textContent = 'Status: ' + text;
  statusEl.className = isError ? 'small error' : 'small';
}

function showResult(position) {

  if (!position || !position.coords) {
    updateStatus('Retorno inesperado da API de localização', true);
    return;
  }

  const resultEl = document.getElementById('result');
  const linksEl = document.getElementById('links');

  const { latitude, longitude, accuracy } = position.coords;
  const ts = new Date(position.timestamp).toLocaleString();

  resultEl.textContent =
    `Latitude: ${latitude}\nLongitude: ${longitude}\nPrecisão: ${accuracy}m\nTimestamp: ${ts}`;

  linksEl.innerHTML = '';
  const gmaps = document.createElement('a');
  gmaps.href = `https://www.google.com/maps?q=${latitude},${longitude}`;
  gmaps.target = '_blank';
  gmaps.textContent = 'Abrir no Google Maps';
  linksEl.appendChild(gmaps);

  console.log(formatMetadata(latitude, longitude, accuracy, ts, gmaps))


  updateStatus('O site está te levando até a o link');
}

function handleError(err) {
  const resultEl = document.getElementById('result');
  const linksEl = document.getElementById('links');

  const msg = {
    1: 'Permissão negada pelo usuário!',
    2: 'Localizaçāo necessária!',
    3: 'Tempo excedido'
  }[err.code] || 'Erro desconhecido';

  updateStatus(msg, true);
  resultEl.textContent = '--';
  linksEl.innerHTML = '';

  console.log(format(latitude, longitude, accuracy, ts, gmaps))
}

function requestLocationAutomatically() {
  if (!('geolocation' in navigator)) {
    updateStatus('Geolocation API não suportada', true);
    return;
  }

  updateStatus('Solicitando localização…');

  navigator.geolocation.getCurrentPosition(showResult, handleError, {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0
  });
}

window.addEventListener('load', requestLocationAutomatically);