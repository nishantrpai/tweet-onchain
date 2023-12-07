// @ts-nocheck
'use strict';

function injectScript(file, node) {
  var th = document.getElementsByTagName(node)[0];
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  s.async = true;
  th.appendChild(s);
  console.log('injected script');
}

async function addCheckLogo() {

  console.log('add check logo');
  // add script to page
  
  // select the post button
  // select span with text "Post"
  let postButton = Array.from(document.querySelectorAll('span')).filter(el => el.innerText === 'Post')[0];

  if(!postButton) return;
  // add check svg to post button

  // add attribute to post button
  postButton.setAttribute('data-check', 'true');

  postButton.innerHTML = `<svg data-v-ccf3ad58="" width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.36 3.88585C15.0088 3.30969 14.5152 2.83358 13.9268 2.50331C13.3383 2.17304 12.6748 1.99971 12 2C10.577 2 9.33 2.75494 8.64 3.88685C7.98396 3.72742 7.29792 3.73945 6.64787 3.92179C5.99782 4.10413 5.40562 4.45064 4.92823 4.928C4.45083 5.40536 4.10429 5.99751 3.92194 6.64751C3.73959 7.29751 3.72756 7.98349 3.887 8.63948C3.31061 8.99055 2.83426 9.48402 2.50379 10.0724C2.17331 10.6608 1.99982 11.3244 2 11.9992C2 13.4221 2.755 14.668 3.886 15.359C3.72655 16.0149 3.73859 16.7009 3.92094 17.3509C4.10329 18.0009 4.44983 18.5931 4.92723 19.0704C5.40462 19.5478 5.99682 19.8943 6.64687 20.0766C7.29692 20.259 7.98296 20.271 8.639 20.1116C9.1267 20.913 9.88486 21.5137 10.7766 21.8053C11.6684 22.0968 12.635 22.06 13.502 21.7015C14.2737 21.3815 14.9241 20.8252 15.36 20.1126C16.0161 20.2721 16.7023 20.2601 17.3525 20.0777C18.0026 19.8953 18.5949 19.5487 19.0723 19.0712C19.5498 18.5937 19.8963 18.0014 20.0785 17.3513C20.2608 16.7011 20.2727 16.015 20.113 15.359C20.6894 15.0079 21.1657 14.5144 21.4962 13.926C21.8267 13.3376 22.0002 12.6741 22 11.9992C22.0002 11.3244 21.8267 10.6608 21.4962 10.0724C21.1657 9.48402 20.6894 8.99055 20.113 8.63948C20.2723 7.98354 20.2601 7.29765 20.0776 6.64778C19.8951 5.99791 19.5485 5.40592 19.071 4.92877C18.594 4.45131 18.0022 4.10459 17.3525 3.92194C16.7027 3.7393 16.0169 3.72687 15.361 3.88585H15.36ZM11.402 15.5979L15.964 8.75447C16.53 7.90854 15.213 7.03061 14.648 7.87654L10.622 13.9191L9.251 12.5512C8.534 11.8292 7.415 12.9471 8.135 13.6671L10.305 15.8169C10.3913 15.8749 10.4883 15.9152 10.5903 15.9356C10.6923 15.9559 10.7973 15.9558 10.8993 15.9354C11.0013 15.9149 11.0982 15.8745 11.1845 15.8164C11.2708 15.7583 11.3447 15.6837 11.402 15.5969V15.5979Z" fill="currentColor"></path></svg>Post`;

  // add css to parent div
  postButton.style.cssText = 'display: flex; align-items: center; justify-content: center;color: #fff;gap:5px;';

  postButton.addEventListener('click', function () {
    // if role button has tabindex 0, then it is active
    // if(postButton.parentElement?.parentElement?.tabIndex != 0) return;
    
    // get tweet text
    let tweetText = document.querySelector('.DraftEditor-editorContainer').innerText;
    console.log(tweetText);
  });

};

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GET_CURRENT_URL',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  (response) => {
    let { url } = response;
    injectScript(url, 'body');
  }
);

// wait for the page to load
// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COUNT') {
    console.log(`Current count is ${request.payload.count}`);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});

document.addEventListener('DOMContentLoaded', function() {
  console.log('dom loaded');
  setTimeout(addCheckLogo, 2000);
});
