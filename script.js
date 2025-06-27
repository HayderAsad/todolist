function displayComments() {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; // Очищаем список перед добавлением новых комментариев

    // Получаем массив комментариев из localStorage
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Добавляем каждый комментарий в HTML
    comments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <strong>${comment.name}</strong><br>
            <p>${comment.comment}</p>
            <span class="delete-button" data-index="${index}">delete</span>
        `;
        commentsList.appendChild(commentElement);
    });

    // Добавляем слушатель события для кнопки "Удалить"
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteComment(index);
        });
    });
}

// Функция для удаления комментария
function deleteComment(index) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.splice(index, 1); // Удаляем комментарий по индексу
    localStorage.setItem('comments', JSON.stringify(comments)); // Обновляем localStorage
    displayComments(); // Обновляем список комментариев
}

// Обработчик отправки формы
document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы

    const name = document.getElementById('name').value;
    const commentText = document.getElementById('comment').value;

    if (name && commentText) {
        // Получаем массив комментариев из localStorage или создаем новый массив
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ name, comment: commentText });

        // Сохраняем комментарий в localStorage
        localStorage.setItem('comments', JSON.stringify(comments));

        // Очищаем поля формы
        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';

        // Обновляем список комментариев
        displayComments();


// =============================================================================================
        document.getElementById('errorMessage').style.display = 'none';
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }

// ==============================================================================================
});



// Вызов displayComments() при загрузке страницы для отображения существующих комментариев
window.onload = function() {
    displayComments();
};