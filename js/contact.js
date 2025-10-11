document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  if (form) {
      form.addEventListener('submit', function (e) {
          e.preventDefault(); // Ngăn form gửi đi theo cách truyền thống

          // 1. Thu thập dữ liệu từ form
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const message = document.getElementById('message').value;

          const messageData = {
              name: name,
              email: email,
              message: message,
              timestamp: new Date().toISOString() // Thêm dấu thời gian chuẩn ISO
          };

          // 2. Gửi dữ liệu đến server (HIỆN TẠI ĐANG MÔ PHỎNG)
          saveMessageToServer(messageData);

          // 3. Hiển thị thông báo thành công cho người dùng
          const contactContainer = document.querySelector('.contact-container');
          if (contactContainer) {
              contactContainer.innerHTML = '<div class="success-message" style="display: block;">✅ Tin nhắn của bạn đã được gửi thành công! <br> Cảm ơn bạn đã liên hệ 💚</div>';
          }
      });
  }
});

/**
* Gửi dữ liệu tin nhắn đến backend.
* @param {object} data - Đối tượng chứa thông tin tin nhắn (name, email, message, timestamp).
*/
function saveMessageToServer(data) {
  /*
   * =============================================================================
   * PHẦN DÀNH CHO BACKEND (CẦN TỰ THỰC HIỆN)
   * =============================================================================
   * 
   * Đây là nơi bạn sẽ dùng `fetch` để gửi dữ liệu đến một API endpoint trên server của bạn.
   * Server sẽ nhận dữ liệu này, xác thực và ghi nó vào tệp `messages.json`.
   * 
   * VÍ DỤ VỀ LOGIC BACKEND (ví dụ với Node.js/Express):
   * 
   * app.post('/api/save-message', (req, res) => {
   *   const messages = readMessagesFromFile(); // Hàm đọc messages.json
   *   const newMessage = req.body;
   *   messages.unshift(newMessage); // Thêm tin nhắn mới vào đầu mảng
   *   writeMessagesToFile(messages); // Hàm ghi lại vào messages.json
   *   res.status(200).send({ message: 'Success' });
   * });
   *
   * =============================================================================
   */

  // Mô phỏng: In dữ liệu ra console để kiểm tra
  console.log("Dữ liệu tin nhắn đã được thu thập và sẵn sàng để gửi đi:", data);
  alert("Hệ thống đang trong quá trình phát triển. Dữ liệu đã được ghi lại trong console.");

  /*
  // VÍ DỤ VỀ CÁCH GỌI API BẰNG FETCH (BỎ COMMENT KHI CÓ BACKEND):
  fetch('/api/save-message', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => {
      console.log('Thành công:', result);
  })
  .catch(error => {
      console.error('Lỗi:', error);
  });
  */
}
