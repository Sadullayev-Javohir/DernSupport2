const botToken = '8042615842:AAHjDOts3dupfTXjqZ-UyIGIcucSLqgTwn4'; 
const chatId = '@dern_support';

document.getElementById("quoteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  const text = `
📩 <b>Uydan olib ketish xizmati bo'yicha so'rov</b>

📍 Shahar: ${data.get('departure')}
📦 Qurilma: ${data.get('delivery')}
⚖️ Og'irligi: ${data.get('weight')} kg
📬 Yetkazish manzili: ${data.get('dimensions')}

👤 Ism: ${data.get('name')}
✉️ Email: ${data.get('email')}
📱 Tel: ${data.get('phone')}
📝 Xabar: ${data.get('message')}
`;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML'
    })
  }).then(response => {
    if (response.ok) {
      form.reset();
      form.querySelector(".sent-message").style.display = "block";
    } else {
      alert("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
    }
  });
});