
console.log("ЗАДАНИЕ 1");

const regExp = /^\d+$/;

const containsOnlyDigits = (str) => {
    return regExp.test(str);
};

console.log(containsOnlyDigits("12345"));
console.log(containsOnlyDigits("12a45"));


console.log("ЗАДАНИЕ 2");

setInterval(() => {
    console.log("Прошла секунда");
}, 1000);


console.log("ЗАДАНИЕ 3");

const count = () => {
    let i = 1;

    const interval = setInterval(() => {
        console.log(i);

        if (i === 10) {
            clearInterval(interval);
            return;
        }

        i++;
    }, 1000);
};

count();


console.log("ЗАДАНИЕ 4");

let timeLeft = 10;
let timerInterval = null;

const timerDisplay = document.querySelector("#timer");
const startButton = document.querySelector("#startTimer");
const stopButton = document.querySelector("#stopTimer");
const resetButton = document.querySelector("#resetTimer");

const updateTimer = () => {
    timerDisplay.textContent = timeLeft;
};

startButton.addEventListener("click", () => {
    if (timerInterval !== null || timeLeft === 0) {
        return;
    }

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }, 1000);
});

stopButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

resetButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 10;
    updateTimer();
});


console.log("ЗАДАНИЕ 5");

const colorBox = document.querySelector("#colorBox");
const colorButton = document.querySelector("#colorButton");

colorButton.addEventListener("click", () => {
    colorBox.classList.toggle("active-color");
});


console.log("ЗАДАНИЕ 6");

const xhr = new XMLHttpRequest();

xhr.open("GET", "./data/test.json");

xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
        try {
            const data = JSON.parse(xhr.responseText);
            console.log("Данные из test.json:", data);
        } catch (error) {
            console.error("Ошибка обработки JSON:", error.message);
        }
    } else {
        console.error("Ошибка запроса:", xhr.status);
    }
};

xhr.onerror = () => {
    console.error("Не удалось выполнить GET-запрос");
};

xhr.send();


console.log("ЗАДАНИЕ 7");

const loginInput = document.querySelector("#loginInput");
const checkBtn = document.querySelector("#checkBtn");
const userCard = document.querySelector("#userCard");
const message = document.querySelector("#message");

checkBtn.addEventListener("click", () => {
    const login = loginInput.value.trim();

    userCard.replaceChildren();
    message.textContent = "";

    if (!login) {
        message.textContent = "Введите логин";
        return;
    }

    const xhrUsers = new XMLHttpRequest();

    xhrUsers.open("GET", "./data/users.json");

    xhrUsers.onload = () => {
        if (xhrUsers.status >= 200 && xhrUsers.status < 300) {
            try {
                const users = JSON.parse(xhrUsers.responseText);

                const user = users.find((item) => item.login === login);

                if (!user) {
                    message.textContent = "Пользователь не найден";
                    return;
                }

                const card = document.createElement("div");
                card.classList.add("user-card");

                const name = document.createElement("h3");
                name.textContent = user.login;

                const role = document.createElement("p");
                role.textContent = `Роль: ${user.role}`;

                const email = document.createElement("p");
                email.textContent = `Email: ${user.email}`;

                card.append(name, role, email);

                if (user.image) {
                    const image = document.createElement("img");
                    image.src = user.image;
                    image.alt = "Фото пользователя";
                    card.append(image);
                }

                userCard.append(card);
                message.textContent = "Пользователь найден";
            } catch (error) {
                message.textContent = "Ошибка обработки данных пользователей";
            }
        } else {
            message.textContent = "Ошибка загрузки пользователей";
        }
    };

    xhrUsers.onerror = () => {
        message.textContent = "Не удалось выполнить запрос";
    };

    xhrUsers.send();
});



console.log("ЗАДАНИЕ 8");

const getUser = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: "Alex"
            });
        }, 1000);
    });
};

const getPosts = (shouldFail = false) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error("Не удалось загрузить посты"));
                return;
            }

            resolve(["Пост 1", "Пост 2"]);
        }, 2000);
    });
};

const getComments = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["Комментарий 1", "Комментарий 2"]);
        }, 3000);
    });
};

Promise.all([
    getUser(),
    getPosts(),
    getComments()
])
    .then(([user, posts, comments]) => {
        console.log("Объединённый результат:", {
            user,
            posts,
            comments
        });
    })
    .catch((error) => {
        console.error("Ошибка выполнения Promise:", error.message);
    });



console.log("ЗАДАНИЕ 9");

const getUserData = async (id) => {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.status}`);
        }

        const user = await response.json();

        console.log("Данные пользователя:", user);

        return user;
    } catch (error) {
        console.error("Ошибка получения пользователя:", error.message);
    } finally {
        console.log("Запрос завершён");
    }
};

getUserData(1);


console.log("ЗАДАНИЕ 10");

const createPhoto = async () => {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/photos",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "My homework photo",
                    url: "https://example.com/photo.jpg",
                    thumbnailUrl: "https://example.com/thumbnail.jpg",
                    albumId: 1
                })
            }
        );

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const data = await response.json();

        console.log("Успешный POST-запрос:", data);
    } catch (error) {
        console.error("Ошибка POST-запроса:", error.message);
    }
};

createPhoto();
