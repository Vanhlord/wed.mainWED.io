
// lấy danh sách món từ /api/shop
fetch('/api/shop')
  .then(res => res.json())
  .then(items => {
    const shopList = document.getElementById('shop-list');
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerText = `${item.name} - ${item.price} coins`;
      li.style.cursor = 'pointer';
      li.addEventListener('click', () => buyItem(item.id));
      shopList.appendChild(li);
    });
  });

// xử lý mua
function buyItem(id) {
  const username = prompt("Nhập tên người chơi:"); // demo
  fetch('/api/shop', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId: id, username })
  })
  .then(res => res.json())
  .then(res => alert(res.message));
}

function buyItem(id) {
  const username = prompt("Nhập tên người chơi:");
  fetch('/api/shop', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId: id, username })
  })
  .then(res => res.json())
  .then(async res => {
    alert(res.message);

    // gửi lệnh sang Discord
    const commands = ['!add cap 1', '!add cap 2', '!add cap 3'];
    const msg = commands[id - 1]; // id 1 -> cap 1, id 2 -> cap 2,...
    
    const discordRes = await fetch('/api/sendToDiscord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: msg })
    });

    if (discordRes.ok) {
      alert(`💬 Đã gửi yêu cầu "${msg}" lên Discord!`);
    } else {
      alert('❌ Gửi lệnh Discord thất bại.');
    }
  });
}

