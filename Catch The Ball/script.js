// 🎮 Juego: Catch the Ball
// Explicación: Mueves una barra con el mouse para atrapar una bola que cae.
// Si la atrapas, ganas puntos. Si no, se reinicia el juego.

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 🔧 Ajustes del lienzo
canvas.width = 400;
canvas.height = 600;

// 🏀 Configuración de la bola
let ball = {
  x: Math.random() * 380 + 10, // Posición aleatoria inicial (evita los bordes)
  y: 0,
  radius: 15,
  speed: 3,
  color: "red",
};

// 🧍 Control del jugador (la barra)
let catcher = {
  width: 80,
  height: 10,
  x: canvas.width / 2 - 40, // Centrado al inicio
  y: canvas.height - 40,
  color: "white",
  moveSpeed: 10, // velocidad de movimiento con teclas
};

let score = 0;

// ⌨️ Controles de teclado (GPT-5)
const keys = { left: false, right: false };

window.addEventListener("keydown", (e) => {
  if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") keys.left = true;
  if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") keys.right = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") keys.left = false;
  if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") keys.right = false;
});

// ⚙️ Actualizar posición y lógica
function update() {
  // Mueve la bola
  ball.y += ball.speed;

  // Actualiza la posición del catcher usando teclas
  if (keys.left) catcher.x -= catcher.moveSpeed;
  if (keys.right) catcher.x += catcher.moveSpeed;

  // Limita el catcher dentro del canvas
  if (catcher.x < 0) catcher.x = 0;
  if (catcher.x + catcher.width > canvas.width) catcher.x = canvas.width - catcher.width;

  // 🧮 Detección de colisión (bola vs catcher)
  if (
    ball.y + ball.radius >= catcher.y &&
    ball.x >= catcher.x &&
    ball.x <= catcher.x + catcher.width
  ) {
    score++;
    resetBall();
    // Aumenta un poco la dificultad cada 5 puntos
    if (score % 5 === 0) ball.speed += 0.5;
  }

  // 🚫 Si la bola cae fuera del canvas
  if (ball.y > canvas.height) {
    alert(`💀 Game Over! Score: ${score}`);
    score = 0;
    ball.speed = 3;
    resetBall();
  }
}

// 🔁 Reinicia la bola desde arriba
function resetBall() {
  ball.x = Math.random() * (canvas.width - ball.radius * 2) + ball.radius;
  ball.y = 0;
}

// 🎨 Dibujar todo en pantalla
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibuja la bola
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();

  // Dibuja el catcher
  ctx.fillStyle = catcher.color;
  ctx.fillRect(catcher.x, catcher.y, catcher.width, catcher.height);

  // Dibuja el score
  ctx.fillStyle = "white";
  ctx.font = "18px Arial";
  ctx.fillText("Score: " + score, 10, 25);
}

// 🌀 Bucle del juego
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
