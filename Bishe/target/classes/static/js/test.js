// 给点赞和收藏按钮添加点击事件
const likeButton = document.querySelector('.actions button:first-child');
const collectButton = document.querySelector('.actions button:last-child');

likeButton.addEventListener('click', function() {
    this.classList.toggle('active');
});

collectButton.addEventListener('click', function() {
    this.classList.toggle('active');
});

// 给评论表单添加提交事件
const commentForm = document.querySelector('.comments form');
const commentList = document.querySelector('.comments-list');

commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const commentInput = this.querySelector('textarea');
    const commentContent = commentInput.value;
    if (commentContent.trim() !== '') {
        const commentTemplate = `
      <div class="comment">
        <div class="comment-header">
          <h5>我</h5>
          <span>${new Date().toLocaleDateString()}</span>
        </div>
        <div class="comment-body">
          <p>${commentContent}</p>
        </div>
      </div>
    `;
        commentList.insertAdjacentHTML('beforeend', commentTemplate);
        commentInput.value = '';
    }
});
