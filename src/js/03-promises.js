import Notiflix from 'notiflix';

const amountEl = document.querySelector('#amount');
const delayEl = document.querySelector('#delay');
const stepEl = document.querySelector('#step');
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  const AMOUNT = Number(amountEl.value);
  const DELAY = Number(delayEl.value);
  const STEP = Number(stepEl.value);

  let fDelay = DELAY;

  for (let i = 1; i <= AMOUNT; i++) {
    // console.log(Number(element));

    createPromise(i, fDelay)
    .then(({ position, delay }) => {
      onSuccess(position, delay);
      })
    .catch(({ position, delay }) => {
      onError(position, delay);
      });
    fDelay += STEP;
  };
}

function onSuccess(position, delay) {
Notiflix.Notify.success(
      `✅ Fulfilled promise ${position} in ${delay}ms`,
      {
        timeout: 2000,
       },
     );
}

function onError(position, delay) {
  Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
        {
        timeout: 2000,
        },
     );
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
    if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }
  }, delay);
});
}