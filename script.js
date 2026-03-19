// МОДАЛЬНОЕ ОКНО
const modal = document.getElementById('modal');
const modalForm = document.getElementById('modalForm');
const closeBtn = document.querySelector('.modal__close');

// Функция открытия модального окна с выбором сеанса
function openModalWithSession(sessionName) {
    const select = modalForm.querySelector('select');
    if (select && sessionName) {
        // Ищем опцию с нужным текстом
        for (let option of select.options) {
            if (option.text.includes(sessionName)) {
                option.selected = true;
                break;
            }
        }
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Открытие модального окна по кнопкам "Записаться" в сеансах
document.querySelectorAll('.btn--session').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Предотвращаем всплытие события
        const sessionCard = btn.closest('.session-card');
        const sessionName = sessionCard ? sessionCard.dataset.session : 'RitmStyle';
        openModalWithSession(sessionName);
    });
});

// Открытие модального окна по клику на карточку сеанса
document.querySelectorAll('.session-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Если кликнули не по кнопке
        if (!e.target.classList.contains('btn--session') && !e.target.closest('.btn--session')) {
            const sessionName = card.dataset.session;
            openModalWithSession(sessionName);
        }
    });
});

// Кнопки "Подробнее" в курсе Иванов
document.querySelectorAll('.btn--course').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const courseItem = btn.closest('.course-item');
        const courseName = courseItem ? courseItem.dataset.course : 'Курс';
        alert(`Подробная информация о курсе "${courseName}" будет доступна в ближайшее время. Хотите записаться?`);
        // Можно сразу открыть модальное окно
        openModalWithSession('Курс Иванов');
    });
});

// Клик по карточке курса
document.querySelectorAll('.course-item').forEach(item => {
    item.addEventListener('click', (e) => {
        if (!e.target.classList.contains('btn--course') && !e.target.closest('.btn--course')) {
            const courseName = item.dataset.course;
            alert(`Курс "${courseName}". Подробное описание: ${item.querySelector('p').textContent}`);
        }
    });
});

// Кнопки "Записаться" в контактах и шапке
document.querySelectorAll('#openModalBtn, .contact-card .btn').forEach(btn => {
    btn.addEventListener('click', () => {
        openModalWithSession('');
    });
});

// Закрытие модального окна
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Отправка формы
if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const select = modalForm.querySelector('select');
        const selectedSession = select ? select.options[select.selectedIndex].text : '';
        alert(`Спасибо за заявку на "${selectedSession}"! Мы свяжемся с вами в ближайшее время.`);
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalForm.reset();
    });
}

// Контактная форма
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо! Мы свяжемся с вами для подтверждения записи.');
        contactForm.reset();
    });
}

// СЛАЙДЕР ОТЗЫВОВ
const reviews = document.querySelectorAll('.review-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider__arrow--prev');
const nextBtn = document.querySelector('.slider__arrow--next');
let currentReview = 0;

function showReview(index) {
    reviews.forEach((review, i) => {
        if (i === index) {
            review.classList.add('review-card--active');
        } else {
            review.classList.remove('review-card--active');
        }
    });
    
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('dot--active');
        } else {
            dot.classList.remove('dot--active');
        }
    });
}

if (prevBtn && nextBtn && reviews.length > 0) {
    prevBtn.addEventListener('click', () => {
        currentReview = (currentReview - 1 + reviews.length) % reviews.length;
        showReview(currentReview);
    });
    
    nextBtn.addEventListener('click', () => {
        currentReview = (currentReview + 1) % reviews.length;
        showReview(currentReview);
    });
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentReview = i;
            showReview(currentReview);
        });
    });
}

// ПЛАВНАЯ ПРОКРУТКА
document.querySelectorAll('.nav__link[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('Сайт RitmStyle загружен! Все кнопки работают.');