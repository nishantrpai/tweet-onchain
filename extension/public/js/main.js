console.log('main.js');

document.querySelector('[data-check="true"]').parentElement.onclick = function() {
  console.log('clicked');
  let tweetText = document.querySelector('.DraftEditor-editorContainer').innerText;
  // taken tweet text + wallet address -> send to server?
}