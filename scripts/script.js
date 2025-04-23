'use strict';

document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт отработал корректно');


    // Получаем элементы
    const loginButton = document.querySelector('#button-login'); // Кнопка "Вход"
    const loginForm = document.querySelector('#form-login'); // Окно входа
    /*
* Алгоритм
*
* 1. Начало.
* 2. Получаем элементы:
*    - Кнопка "Вход" (создаем переменную для кнопки входа).
*    - Всплывающее окно для входа (создаем переменную для окна регистрации).
* 3. Навешиваем слушатель события на кнопку "Вход":
*    - Добавляем слушатель события `click` на кнопку "Вход".
* 4. Проверка условий:
*    - Если окно входа открыто:
*      4.1 Да: Закрываем окно (устанавливаем атрибут `hidden` или удаляем класс для отображения).
*      4.2 Нет: Открываем окно (добавляем класс для отображения или удаляем атрибут `hidden`).
* 5. Навешиваем слушатель события на документ для обработки кликов вне области:
*    - Добавляем слушатель события `click` на документ.
* 6. Проверка условий:
*    - Если клик произошел вне окна входа и вне кнопки "Вход":
*      6.1 Да: Закрываем окно входа (устанавливаем атрибут `hidden` или добавляем класс для скрытия).
*      6.2 Нет: Ничего не делаем.
* 7. Конец.
* Блок-схема: /images/block-schema-vhod.png
*/

    if (loginButton && loginForm) {
        console.log('Элементы существуют');

        // Открытие модального окна при клике на кнопку "Войти"
        loginButton.addEventListener('click', () => {
            loginForm.removeAttribute('hidden');
            const loginnumber = loginForm.querySelector("#login-number");
            const loginpassword = loginForm.querySelector("#login-password");
            loginnumber.value = window.localStorage.getItem("number");
            loginpassword.value = window.localStorage.getItem("password");
        });

        // Закрытие модального окна при клике на кнопку закрытия
        const closeLoginForm = document.querySelector('#closeLoginForm');
        if (closeLoginForm) {
            closeLoginForm.addEventListener('click', () => {
                loginForm.setAttribute('hidden', true);
            });
        }

        // Закрытие модального окна при клике вне его области
        window.addEventListener('click', (event) => {
            if (event.target === loginForm) {
                loginForm.setAttribute('hidden', true);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('Скрипт отработал корректно');

    /*
* Алгоритм
*
* 1. Начало.
* 2. Получаем элементы:
*    - Кнопка "Регистрация" (создаем переменную для кнопки регистрации).
*    - Всплывающее окно для регистрации (создаем переменную для окна регистрации).
* 3. Навешиваем слушатель события на кнопку "Регистрация":
*    - Добавляем слушатель события `click` на кнопку "Регистрация".
* 4. Проверка условий:
*    - Если окно регистрации открыто:
*      4.1 Да: Закрываем окно (устанавливаем атрибут `hidden` или удаляем класс для отображения).
*      4.2 Нет: Открываем окно (добавляем класс для отображения или удаляем атрибут `hidden`).
* 5. Навешиваем слушатель события на документ для обработки кликов вне области:
*    - Добавляем слушатель события `click` на документ.
* 6. Проверка условий:
*    - Если клик произошел вне окна регистрации и вне кнопки "Регистрация":
*      6.1 Да: Закрываем окно регистрации (устанавливаем атрибут `hidden` или добавляем класс для скрытия).
*      6.2 Нет: Ничего не делаем.
* 7. Конец.
* Блок-схема: /images/block-schema-reg.png
*/

    // Получаем элементы
    const registrationButton = document.querySelector('#button-reg'); // Кнопка "Регистрация"
    const registrationModal = document.querySelector('#form-registration'); // Форма регистрации
    const loginForm = document.querySelector('#form-login'); // Форма входа (если есть)
    const cancelRegistration = document.querySelector('#cancelRegistration');
    const closeLoginForm = document.querySelector('#closeLoginForm'); // Убедитесь, что такой элемент есть
    const buttonLink = document.querySelector('.button--link');

    // Проверяем, что элементы существуют
    if (registrationButton && registrationModal) {
        console.log('Элементы существуют');

        // Открытие формы регистрации при клике на кнопку "Регистрация"
        registrationButton.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвращаем переход по ссылке
            registrationModal.hidden = false; // Показываем форму регистрации
            if (loginForm) loginForm.hidden = true; // Скрываем форму входа, если она есть
        });

        // Закрытие формы регистрации при клике на кнопку "Отмена"
        if (cancelRegistration) {
            cancelRegistration.addEventListener('click', () => {
                registrationModal.hidden = true; // Скрываем форму регистрации
            });
        }

        // Закрытие формы входа при клике на кнопку "Закрыть"
        if (closeLoginForm) {
            closeLoginForm.addEventListener('click', () => {
                if (loginForm) loginForm.hidden = true; // Скрываем форму входа
            });
        }

        // Переключение на форму входа при клике на "У меня уже есть аккаунт"
        if (buttonLink) {
            buttonLink.addEventListener('click', () => {
                registrationModal.hidden = true; // Скрываем форму регистрации
                if (loginForm) loginForm.hidden = false; // Показываем форму входа
            });
        }

        // Закрытие формы регистрации при клике вне её области
        window.addEventListener('click', (event) => {
            if (!registrationModal.contains(event.target) && !registrationButton.contains(event.target)) {
                registrationModal.hidden = true; // Скрываем форму регистрации
            }
        });
    } else {
        console.error('Элементы не найдены');
    }

    // Отправка данных на форме регистрации
    registrationModal.addEventListener('submit', event => {
        event.preventDefault(); // Предотвращаем отправку формы


        const number = registrationModal.querySelector('#number').value;
        const password = registrationModal.querySelector('#password').value;

        // Запишем логин
        window.localStorage.setItem("number", number);
        window.localStorage.setItem("password", password);

        alert("Вы зарегистрировались")
        // Очистка формы
        // registrationModal.reset();
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const scrollContainer = document.querySelector('.offers__grid');
    const scrollLeftButton = document.querySelector('.scroll-button--left');
    const scrollRightButton = document.querySelector('.scroll-button--right');
    /*
* Алгоритм
*
* 1. Начало.
* 2. Получаем элементы:
*    - Контейнер с карточками (создаем переменную для контейнера).
*    - Кнопка "Влево" (создаем переменную для кнопки прокрутки влево).
*    - Кнопка "Вправо" (создаем переменную для кнопки прокрутки вправо).
* 3. Навешиваем слушатель события на кнопку "Влево":
*    - Добавляем слушатель события `click` на кнопку "Влево".
* 4. Проверка условий:
*    - Если кнопка "Влево" нажата:
*      4.1 Да: Прокручиваем контейнер с карточками влево на 300 пикселей.
*      4.2 Нет: Ничего не делаем.
* 5. Навешиваем слушатель события на кнопку "Вправо":
*    - Добавляем слушатель события `click` на кнопку "Вправо".
* 6. Проверка условий:
*    - Если кнопка "Вправо" нажата:
*      6.1 Да: Прокручиваем контейнер с карточками вправо на 300 пикселей.
*      6.2 Нет: Ничего не делаем.
* 7. Конец.
* Блок-схема: /images/block-schema-strelki.png
*/

    if (scrollContainer && scrollLeftButton && scrollRightButton) {
        // Прокрутка влево
        scrollLeftButton.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: -300, // Шаг прокрутки влево
                behavior: 'smooth' // Плавная прокрутка
            });
        });

        // Прокрутка вправо
        scrollRightButton.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: 300, // Шаг прокрутки вправо
                behavior: 'smooth' // Плавная прокрутка
            });
        });
    }
});

// Объявляем переменную-массив intensiveImg и сохраняем в нее все элементы на странице с классом intensive__img  
const intensiveImg = document.querySelectorAll('.intensive__img');

// Пройдемся по каждому элементу массива intensiveImg, с помощью цикла forEach.  Внутри функции 2 переменные: 
// item - текущее изображение, а index — его номер в массиве, начиная с 0
intensiveImg.forEach((item, index) => {

    // Объявляем переменную intensiveText и сохраняем в нее все элементы с классом intensive__description, которые связаны с описаниями для изображений
    const intensiveText = document.querySelectorAll('.intensive__description');

    // Когда курсор наводится на изображение (событие mouseenter), срабатывает обработчик события mouseenter:
    item.addEventListener('mouseenter', () => {
        // Делаем изображение полупрозрачным
        item.style.opacity = 0.5;
        // И удаляем атрибут hidden и текст становится видимым
        intensiveText[index].removeAttribute('hidden');
    });

    // Когда курсор убираем с изображения (событие mouseleave), срабатывает обработчик события mouseleave:
    item.addEventListener('mouseleave', () => {
        // Изображение делаем непрозрачным
        item.style.opacity = 1;
        // И добавляем атрибут hidden и текст становится видимым
        intensiveText[index].setAttribute('hidden', true);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // * 1. Начало.
    // * 2. Получаем все элементы изображений с описанием.
    // * 3. Для каждого изображения (проверяем есть ли такие изображения):
    // * 3.1. Добавляем обработчик наведения курсора на изображение:
    // * 3.1.1. Да:
    // * 3.1.1.1. показываем текст при наведении.
    // * 3.1.2. Нет: продолжаем.
    // * 3.2. Добавляем обработчик курсор уходит с изображения:
    // * 3.3.1. Да:
    // * 3.3.1.1. Скрываем элемент с описанием.
    // * 3.3.2. Нет: продолжаем.
    // * 4. Конец

    const intensiveImg = document.querySelectorAll('.image-js');

    intensiveImg.forEach((item, index) => {
        const intensiveText = document.querySelectorAll('.description-js');
        item.addEventListener('mouseenter', () => {
            item.style.opacity = 0.5;
            intensiveText[index].removeAttribute('hidden');
        });
        item.addEventListener('mouseleave', () => {
            item.style.opacity = 1;
            intensiveText[index].setAttribute('hidden', true);
        });
    });
});

/*
//Объявляем переменную headerMenu и сохраняем в нее header__menu
const headerMenu = document.querySelector('.header__nav');
// Если такой элемент существует
if (headerMenu){
//Объявляем переменную headerList и сохраняем в нее header__list, чтобы мы могли добавить новые элементы
        const headerList = headerMenu.querySelector('.nav__list');

//Создаем объект menuData, который содержит данные для трех ссылок меню.
        const menuData = {
// Каждая ссылка содержит link (адрес ссылки; если ссылка никуда не ведет, то можно оставить #) и title (текст ссылки).
            link1: {
                link: 'credits.html',
                title: 'Кредиты',
            },
            link2: {
                link: 'insurance.html',
                title: 'Страхование',
            },
            link3: {
                link: 'mortgage.html',
                title: 'Ипотека',
            },
            link4: {
                link: 'index.html',
                title: 'Главная',
            }
        }

//Создаем функцию createLink, которая будет добавлять ссылку в меню. Внутри функции 2 переменные: UrlLink – адрес, а title — текст ссылки.
        const createLink = (UrlLink, title) =>{
// создаем переменную  link, которая будет содержать HTML-код ссылки и вставляем в него 2 переменные
            const link = `
            <li class="nav__item"><a href="${UrlLink}" class="nav__link">${title}</a></li>
            `;
            return link;
        }

// Создаем цикл for и проходим по всем элементам объекта menuData.
        for (const linkItem in menuData) {
//Получаем данные для ссылки и сохраняем в переменную link.
            const link = menuData[linkItem];
//Создаем переменную linkIndex и вызываем функцию createLink, куда передаем адрес и заголовок.
            const linkIndex = createLink(link.link, link.title);
// С помощью метода insertAdjacentHTML добавляем созданный HTML-код в конец списка headerList.
            headerList.insertAdjacentHTML('beforeend', linkIndex);

        }
}
*/
console.log('Навигацинное меню создано с помощью javascript!');

const cardsContainer = document.querySelector('.header__nav');
if (cardsContainer) {
    const cardList = cardsContainer.querySelector('.nav__list');

    // Пример URL для получения данных с сервера
    const apiUrl = 'data.json';

    // Функция для создания карточки
    const createCard = (link, title) => {

        // Шаблонные строки и подстановки
        const card = `

                 <li class="nav__item"><a class="nav__link" href="${link}">${title}</a></li>
            `;

        return card;
    }

    // Загрузка данных с сервера
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Данные
            console.log(typeof (data)); // Тип полученных данных

            // for (const item in data) {
            //     const card = data[item];

            //     const cardElement = createCard(nav.link, nav.title);
            //     cardList.insertAdjacentHTML('beforeend', cardElement);
            // }

            data.forEach(item => {
                const cardElement = createCard(item.link, item.title);
                cardList.insertAdjacentHTML('beforeend', cardElement);
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });
}

// Preloader страницы
const preloader = document.querySelector('.preloader');
const content = document.querySelector('.content');
if (preloader && content) {
    setTimeout(() => {
        // Скрываем прелоадер
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';

        // Показываем контент
        content.style.display = 'block';

        // Удаляем элемент из DOM
        preloader.remove();
    }, 3000); // Задержка 3 секунды
}

// Карусель (слайдер)
const slider = document.querySelector('.swiper');

if (slider) {
    const swiper = new Swiper(slider, {
        // Дополнительные параметры
        slidesPerView: 2, // Количество слайдов на экране
        spaceBetween: 30, // Расстояние между слайдами
        loop: true,  // Зацикливание слайдов

        // Пагинация
        pagination: {
            el: '.swiper-pagination',
        },

        // Навигационные стрелки
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}