fetch('/status.php')
    .then(response => response.json())
    .then(data => {
        document.getElementById('server-status').textContent = data.status;
    })
    .catch(error => {
        document.getElementById('server-status').textContent = 'Error';
        console.error('Error fetching server status:', error);
    });