
const BOT_TOKEN = "8042615842:AAHjDOts3dupfTXjqZ-UyIGIcucSLqgTwn4";
const CHAT_ID = "@dern_support";

const form = document.getElementById('telegramForm');
const loading = form.querySelector('.loading');
const sentMessage = form.querySelector('.sent-message');
const errorMessage = form.querySelector('.error-message');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Ko‘rsatkichlar
  loading.style.display = 'block';
  sentMessage.style.display = 'none';
  errorMessage.innerText = '';

  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  const text = `
📨 Biz bilan bog'laning bo'limidan yangi xabar:

👤 Ismi: ${name}
📧 Email: ${email}
📝 Mavzu: ${subject}
💬 Xabar: ${message}
    `;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text
    })
  })
    .then(res => {
      loading.style.display = 'none';
      if (res.ok) {
        sentMessage.style.display = 'block';
        form.reset();
      } else {
        errorMessage.innerText = "❌ Xatolik yuz berdi. Botga yuborilmadi.";
      }
    })
    .catch(err => {
      loading.style.display = 'none';
      errorMessage.innerText = "❌ Server bilan bog'lanishda xatolik.";
    });
});
