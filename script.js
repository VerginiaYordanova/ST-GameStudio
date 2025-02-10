const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{x: 9 * gridSize, y: 9 * gridSize}];
let food = {x: Math.floor(Math.random() * 20) * gridSize, y: Math.floor(Math.random() * 20) * gridSize};
let dx = gridSize;  // Стартово движение - дясно
let dy = 0;          // Няма движение по вертикала
let gameInterval;
let score = 0;

// Функция за рисуване
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуване на змията
    ctx.fillStyle = "green";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));

    // Рисуване на храната
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Рисуване на резултата
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Резултат: " + score, 10, 20);
}

// Функция за движение на змията
function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {x: Math.floor(Math.random() * 20) * gridSize, y: Math.floor(Math.random() * 20) * gridSize};
    } else {
        snake.pop();
    }
}

// Функция за проверка за колизии
function checkCollision() {
    const head = snake[0];
    // Проверка дали змията се удря в стените
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    // Проверка дали змията се удря в себе си
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Функция за актуализиране на състоянието на играта
function updateGame() {
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert("Играта свърши! Резултат: " + score);
    }
    draw();
}

// Функция за смяна на посоката чрез стрелките на клавиатурата
function changeDirection(event) {
    if (event.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -gridSize;
    } else if (event.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = gridSize;
    } else if (event.key === "ArrowLeft" && dx === 0) {
        dx = -gridSize;
        dy = 0;
    } else if (event.key === "ArrowRight" && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
}

// Слушател за натискане на клавиши
document.addEventListener("keydown", changeDirection);

// Започваме играта
gameInterval = setInterval(updateGame, 100);