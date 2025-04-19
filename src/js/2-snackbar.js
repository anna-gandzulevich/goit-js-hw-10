import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);

      iziToast.success({
        title: '✅ Fulfilled',
        message: `promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59A10D',
        theme: 'dark',
      });
    })
    .catch(delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.error({
        title: '❌ Rejected',
        message: `promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#EF4040',
        theme: 'dark',
      });
    });

  form.reset();
}
