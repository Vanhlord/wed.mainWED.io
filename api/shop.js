let shopData = {
  items: [
    { id: 1, name: "Rank VIP", price: 100 },
    { id: 2, name: "Rank Pro", price: 200 }
  ]
};

export default function handler(req, res) {
  if (req.method === "GET") {
    // Trả danh sách vật phẩm
    res.status(200).json(shopData.items);
  } 
  else if (req.method === "POST") {
    const { itemId, username } = req.body;
    const item = shopData.items.find(i => i.id === itemId);
    if (!item) return res.status(400).json({ error: "Item not found" });

    // Logic demo: ghi log giao dịch
    console.log(`${username} đã mua ${item.name} với giá ${item.price} vàng`);

    res.status(200).json({ message: `Mua thành công: ${item.name}` });
  } 
  else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
