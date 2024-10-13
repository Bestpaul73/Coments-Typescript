'use strict';

const comments = [
  {
    name: 'Глеб Фокин',
    date: '12.02.22 12:18',
    text: 'Это будет первый комментарий на этой странице',
    likes: 3,
    isLiked: false,
    isEdit: false,
  },
  {
    name: 'Варвара Н.',
    date: '13.02.22 19:22',
    text: 'Мне нравится как оформлена эта страница! ❤',
    likes: 75,
    isLiked: true,
    isEdit: false,
  },
];

const getMsgDateTime = () => {
  const msgDateTime = new Date();
  return `${msgDateTime.getDate()}.${(msgDateTime.getMonth() + 1).toString().padStart(2, '0')}.${msgDateTime
    .getFullYear()
    .toString()
    .slice(2)} 
    ${msgDateTime.getHours().toString().padStart(2, '0')}:${msgDateTime.getMinutes().toString().padStart(2, '0')}`;
};

const commentsEl = document.querySelector('.comments');
const inputEl = document.querySelector('.add-form-name');
const textEl = document.querySelector('.add-form-text');
const addButtonEl = document.querySelector('.add-form-button');

addButtonEl.disabled = true;
let userName = '';
let userText = '';

const handleLike = (e) => {
  //два одинаковых способа достать индекс
  const index = e.target.getAttribute('data-index');
  console.log(index);
  // const index = likeBtnElelement.dataset.index;
  comments[index].isLiked ? comments[index].likes-- : comments[index].likes++;
  comments[index].isLiked = !comments[index].isLiked;
  renderComments();
};

const handleDelete = (e) => {
  // console.dir(e.target);
  const index = e.target.getAttribute('data-index');
  comments.splice(index, 1);
  console.log(index);
  renderComments();
};

const handleEdit = (e) => {
  const index = e.target.getAttribute('data-index');
  comments[index].isEdit = true;
  renderComments();

  const currentComment = document.querySelectorAll('.comment')[index];
  currentComment.querySelector('.edit-form-text').focus();
};

const handleSave = (e) => {
  const index = e.target.getAttribute('data-index');
  const currentComment = document.querySelectorAll('.comment')[index];
  comments[index].text = currentComment.querySelector('.edit-form-text').value;
  comments[index].isEdit = false;

  renderComments();
};

const initEventListeners = () => {
  const likeBtnElements = document.querySelectorAll('.like-button');
  for (const likeBtnElement of likeBtnElements) {
    likeBtnElement.addEventListener('click', (e) => handleLike(e));
  }

  const delBtnElements = document.querySelectorAll('.bin-button');
  for (const delBtnElement of delBtnElements) {
    delBtnElement.addEventListener('click', (e) => handleDelete(e));
  }

  const editBtnElements = document.querySelectorAll('.edit-button');
  for (const editBtnElement of editBtnElements) {
    editBtnElement.addEventListener('click', (e) => handleEdit(e));
  }

  const saveBtnElements = document.querySelectorAll('.save-button');
  for (const saveBtnElement of saveBtnElements) {
    saveBtnElement.addEventListener('click', (e) => handleSave(e));
  }
};

const renderComments = () => {
  commentsEl.innerHTML = comments
    .map((comment, index) => {
      return `<li class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            ${
              comment.isEdit
                ? `<textarea type="textarea" class="edit-form-text"
                    rows="2">${comment.text}</textarea>`
                : `<div class="comment-text">${comment.text}</div>`
            }
            
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button 
                data-index="${index}" 
                class="like-button${comment.isLiked ? ' -active-like' : ''}">
              </button>
            </div>

            <div class="controls">
              ${
                comment.isEdit
                  ? `<button 
                      data-index="${index}" 
                      class="save-button"><img src="./img/disk.png" alt="Save" />
                    </button>`
                  : `<button 
                      data-index="${index}" 
                        class="edit-button"><img src="./img/edit.png" alt="Edit" />
                    </button>`
              }

              <button 
                data-index="${index}"
                class="bin-button"><img src="./img/free-icon-delete-1345925.png" alt="Bin" />
              </button>
            </div>
          </div>
        </li>`;
    })
    .join('');

  inputEl.value = '';
  textEl.value = '';
  userName = '';
  userText = '';
  addButtonEl.disabled = true;
  // delButtonEl.disabled = false;

  initEventListeners();
};

renderComments();

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
  const newComment = {
    name: inputEl.value,
    text: textEl.value,
    date: getMsgDateTime(),
    likes: 0,
    isLiked: false,
    isEdit: false,
  };
  comments.push(newComment);
  renderComments();
};

addButtonEl.addEventListener('click', () => {
  addComment();
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && !addButtonEl.disabled) addComment();
});
