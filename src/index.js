'use strict';

const getMsgDateTime = () => {
  const msgDateTime = new Date();
  return `${msgDateTime.getDate()}.${msgDateTime.getMonth().toString().padStart(2, '0')}.${msgDateTime
    .getFullYear()
    .toString()
    .slice(2)} 
    ${msgDateTime.getHours().toString().padStart(2, '0')}:${msgDateTime.getMinutes().toString().padStart(2, '0')}`;
};

const commentsEl = document.querySelector('.comments');
const inputEl = document.querySelector('.add-form-name');
const textEl = document.querySelector('.add-form-text');
const addButtonEl = document.querySelector('.add-form-button');
const delButtonEl = document.querySelector('.del-form-button');

addButtonEl.disabled = true;
let userName = '';
let userText = '';

const validateField = (element) => {
  let content = element.value.trim();
  if (content === '') {
    element.classList.add('error');
  } else {
    element.classList.remove('error');
  }
  return content;
};

inputEl.addEventListener('input', () => {
  userName = validateField(inputEl);
  addButtonEl.disabled = userName && userText ? false : true;
});

textEl.addEventListener('input', () => {
  userText = validateField(textEl);
  addButtonEl.disabled = userName && userText ? false : true;
});

const addComment = () => {
  commentsEl.innerHTML += `<li class="comment">
          <div class="comment-header">
            <div>${userName}</div>
            <div>${getMsgDateTime()}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${userText}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">0</span>
              <button class="like-button"></button>
            </div>
            <button class="bin-button"><img src="./img/free-icon-delete-1345925.png" alt="Bin" /></button>
          </div>
        </li>`;
  inputEl.value = '';
  textEl.value = '';
  addButtonEl.disabled = true;
  delButtonEl.disabled = false;
};

addButtonEl.addEventListener('click', () => {
  addComment();
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && !addButtonEl.disabled) addComment();
});

delButtonEl.addEventListener('click', () => {
  commentsEl.innerHTML = commentsEl.innerHTML.slice(0, commentsEl.innerHTML.lastIndexOf('<li class="comment"'));
  if (!commentsEl.innerHTML.trim()) delButtonEl.disabled = true;
});
