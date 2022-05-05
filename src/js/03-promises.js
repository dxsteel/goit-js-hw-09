import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', getPromise);

function getPromise(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount }
  } = e.currentTarget;
  let delayInit = Number(delay.value);
  for (let i = 1; i <= amount.value; i++) {
    if (i > 1) {
      delayInit += Number(step.value);
    }
    const promisePosition = i;
    createPromise(promisePosition, delayInit)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
}







  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          // Fulfill
          resolve({ position, delay });
        } else {
          // Reject
          reject({ position, delay });
        }
      }, delay);
    } )
}
