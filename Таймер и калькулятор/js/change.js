import { dateCalcForm } from './datecalc.js';
import { timer } from './timer.js';

const datecalcButton = document.getElementById('datecalcButton');
const timerButton = document.getElementById('timerButton');
datecalcButton.addEventListener('click', function () {
    dateCalcForm.style.display = 'block';
    timer.style.display = 'none';
})
timerButton.addEventListener('click', function () {
    timer.style.display = 'block';
    dateCalcForm.style.display = 'none';
})