fetch('/api/status')
  .then(res => res.json())
  .then(data => {
    document.getElementById('player-count').innerText = data.onlinePlayers;
  });
