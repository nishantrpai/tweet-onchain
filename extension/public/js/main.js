console.log('main.js');

document.querySelector('[data-check="true"]').parentElement.onclick = function() {
  console.log('clicked');
}