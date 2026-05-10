const STORAGE_KEY = 'feedback-form-state';

// 1. Об'єкт з даними форми
const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

// 3. При завантаженні — підставляємо дані з localStorage
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  const parsed = JSON.parse(savedData);

  formData.email = parsed.email ?? '';
  formData.message = parsed.message ?? '';

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

// 2. Слухаємо input — зберігаємо в localStorage
form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name === 'email' || name === 'message') {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// 4. Слухаємо submit
form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  // Очищаємо все
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
});