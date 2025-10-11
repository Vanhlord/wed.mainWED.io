/* ===================================
   LOGIC CHÍNH (ĐÃ SỬA LỖI)
   =================================== */

// --- Hamburger Menu --- //
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');

  if (hamburger) {
      hamburger.addEventListener('click', function () {
          navbar.classList.toggle('active');
          hamburger.classList.toggle('active');
      });
  }

  // --- Dòng chữ chạy ngang --- //
  const scrollingTextContainer = document.querySelector('.scrolling-text');
  const scrollingTextInner = document.querySelector('.scrolling-text-inner');
  // Ngưỡng ký tự để quyết định có chạy chữ hay không
  const SCROLL_THRESHOLD = 50; 

  function updateScrollingText() {
      fetch('data.json')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Không thể tải data.json');
              }
              return response.json();
          })
          .then(data => {
              const text = data.scrollingText || "";

              if (!scrollingTextInner) return; // Dừng nếu không tìm thấy phần tử

              // **PHẦN SỬA LỖI QUAN TRỌNG**
              // 1. Xóa sạch nội dung cũ để tránh nhân đôi
              scrollingTextInner.innerHTML = '';

              // 2. Tạo một span chứa nội dung gốc
              const contentSpan = document.createElement('span');
              contentSpan.className = 'scrolling-text-content';
              contentSpan.textContent = text;
              scrollingTextInner.appendChild(contentSpan);

              // 3. Quyết định hiệu ứng dựa trên độ dài
              if (text.length > SCROLL_THRESHOLD) {
                  // Nếu đủ dài, tạo một bản sao để cuộn liền mạch
                  const cloneSpan = contentSpan.cloneNode(true);
                  scrollingTextInner.appendChild(cloneSpan);

                  scrollingTextContainer.classList.add('scroll');
                  scrollingTextContainer.classList.remove('pulse');
              } else {
                  // Nếu ngắn, dùng hiệu ứng pulse
                  scrollingTextContainer.classList.add('pulse');
                  scrollingTextContainer.classList.remove('scroll');
              }
          })
          .catch(error => {
              console.error('Lỗi khi cập nhật dòng chữ chạy:', error);
              if (scrollingTextInner) {
                  scrollingTextInner.textContent = 'Lỗi tải thông báo...';
              }
          });
  }

  
  // --- Script Sao Chép IP Với Popup --- //
const copyBtn = document.getElementById('copyBtn');
const serverIP = document.getElementById('serverIP');

function showPopup(message, type = 'success') {
    // tạo popup
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%) scale(0)';
    popup.style.background = '#fff';
    popup.style.borderRadius = '12px';
    popup.style.padding = '15px 25px';
    popup.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    popup.style.fontSize = '16px';
    popup.style.display = 'flex';
    popup.style.alignItems = 'center';
    popup.style.gap = '10px';
    popup.style.zIndex = '9999';
    popup.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    popup.style.opacity = '0';

    // icon
    const icon = document.createElement('span');
    icon.style.fontSize = '22px';
    icon.style.animation = 'bounce 0.5s';
    icon.textContent = type === 'success' ? '✅' : (type === 'warn' ? '⚠' : '❌');
    if(type === 'warn') icon.style.color = '#FFA500';
    if(type === 'error') icon.style.color = '#E53935';

    // message
    const text = document.createElement('span');
    text.textContent = message;

    popup.appendChild(icon);
    popup.appendChild(text);
    document.body.appendChild(popup);

    // show animation
    setTimeout(() => {
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
        popup.style.opacity = '1';
    }, 10);

    // auto hide
    setTimeout(() => {
        popup.style.transform = 'translate(-50%, -50%) scale(0)';
        popup.style.opacity = '0';
        setTimeout(() => document.body.removeChild(popup), 300);
    }, 2000);
}

// hạt ảnh
const style = document.createElement('style');
style.innerHTML = `
@keyframes bounce {
  0% { transform: scale(0.5); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}`;
document.head.appendChild(style);

// cóp pi nút
if (copyBtn && serverIP) {
    copyBtn.addEventListener('click', () => {
        const ipText = serverIP.textContent.trim();
        if (!ipText || ipText === '---.---.--.---/----') {
            showPopup('IP máy chủ chưa được cập nhật!', 'warn');
            return;
        }
        navigator.clipboard.writeText(ipText).then(() => {
            showPopup('Đã sao chép IP: ' + ipText, 'success');
        }).catch(err => {
            showPopup('Sao chép thất bại!', 'error');
            console.error('Lỗi sao chép:', err);
        });
    });
}
// khung đổi chữ 10 giây 1 lần tại nút sao chép//
const tips = [
    "Nếu server chưa mở mà cậu đang chán thì có thể ấn nút vào game chơi trước nhé!",
    "Đừng quên vào Discord để tám cùng mọi người nè 💬",
    "Chuẩn bị tinh thần phiêu lưu nha ⚔️",
    "Hôm nay có sự kiện đặc biệt đó, vào sớm kẻo lỡ nha 😎",
    "Nhớ ăn uống đầy đủ trước khi cày rank nhaaa 🍔",
    "Ai vào sớm là người may mắn, biết đâu gặp admin tặng quà đó 🎁",
    "Đang update tí xíu thôi, rót ly trà chờ tí rồi vô cày tiếp nha 🍵",
    "Thời gian chờ chính là cơ hội lên kế hoạch phá đảo thế giới 😏",
    "Cứ bình tĩnh nha, server chỉ đang làm đẹp lại thế giới chút xíu 🌈",
    "Vào game nhớ chào mọi người nha, cộng đồng thân thiện lắm 🤗",
    "Đừng quên cất đồ quý trước khi ra net nhé, an toàn là trên hết 🛡️",
    "Khi nào thấy dòng ‘Máy chủ online’ thì ấn vô liền, nhanh tay không kẻo full 💨",
    "Nếu lag tí thì cũng đừng giận, server đang cố gắng hết sức vì cậu 😭💪",
    "Cảm ơn cậu đã kiên nhẫn, admin đang fix bug bằng cả con tim 💚",
    "Cậu biết không, chỉ cần cậu chờ – server cũng thấy ấm lòng rồi đó 🥹",
    "Một chút downtime nhưng niềm vui thì vẫn nguyên vẹn ☀️",
    "Đừng quên gọi bạn bè cùng vào cho vui nhaaa 👯‍♂️",
    "Nghe nói hôm nay spawn point có điều bất ngờ đó 👀",
    "Ai cày từ sáng đến giờ nhớ nghỉ ngơi uống nước nha 💧",
    "Server mà tỉnh giấc là phiêu lưu lại bắt đầu 🌄",
    "Chuẩn bị tinh thần chiến đấu nào, hero ơi 💥",
    "Cập nhật mới hứa hẹn nhiều thứ thú vị lắm đó 🤩",
    "Vào sớm làm nhiệm vụ hàng ngày cho khỏi quên nha 📜",
    "Cảm ơn vì cậu vẫn ở đây, loyal player chính hiệu 💎"
  ];

  const tipElement = document.getElementById("serverTip");

  // random lần đầu
  let current = Math.floor(Math.random() * tips.length);
  tipElement.textContent = tips[current];

  setInterval(() => {
    tipElement.classList.add("fade-out");

    setTimeout(() => {
      let next;
      do {
        next = Math.floor(Math.random() * tips.length);
      } while (next === current); // tránh trùng câu cũ
      current = next;

      tipElement.textContent = tips[current];
      tipElement.classList.remove("fade-out");
    }, 1000);
  }, 10000);
/* tệp lệnh chạy dòng thời gian */
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById("currentTime").textContent = `${hours}:${minutes}:${seconds}`;
  }
  setInterval(updateTime, 1000);
  updateTime();
  
});
