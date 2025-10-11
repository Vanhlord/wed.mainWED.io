
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
