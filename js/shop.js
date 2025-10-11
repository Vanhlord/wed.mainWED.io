// lấy danh sách món
fetch('/api/shop')
  .then(res => res.json())
  .then(data => {
    const shopList = document.getElementById('shop-list');
    data.forEach(item => {
      const li = document.createElement('li');
      li.innerText = `${item.name} - ${item.price} coins`;
      li.addEventListener('click', () => buyItem(item.id));
      shopList.appendChild(li);
    });
  });

function buyItem(id) {
  const username = "Player1"; // demo
  fetch('/api/shop', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId: id, username })
  })
  .then(res => res.json())
  .then(res => alert(res.message));
}
