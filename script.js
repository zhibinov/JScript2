'use strict';


const dialog = document.querySelector('.dialog');
const dialog2 = dialog.textContent.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2');
dialog.innerHTML = dialog2;