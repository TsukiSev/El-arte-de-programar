// 🎮 Juego: Catch the Ball - Versión Mejorada
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 🔧 Ajustes del lienzo
canvas.width = 800;
canvas.height = 600;

// 🧍 Control del jugador (la barra)
let catcher = {
  width: 80,
  height: 10,
  x: canvas.width / 2 - 40,
  y: canvas.height - 40,
  speed: 8,
  color: "white",
};

// ⭐ Variables de estado del juego
let score = 0;
let lives = 3;
const initialSpeed = 3;
let currentSpeed = initialSpeed;

// 🕹️ Objeto para rastrear las teclas presionadas (A y D)
let keysPressed = {
  a: false,
  d: false,
};

// 🌠 Array para manejar múltiples objetos (pelotas y piedras)
let fallingObjects = [];

// --- CONTROLES ---

// 🖱 Evento: mover el mouse
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  if (mouseX > catcher.width / 2 && mouseX < canvas.width - catcher.width / 2) {
    catcher.x = mouseX - catcher.width / 2;
  }
});

// ⌨️ Eventos para presionar y soltar teclas
window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "a") keysPressed.a = true;
  if (e.key.toLowerCase() === "d") keysPressed.d = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key.toLowerCase() === "a") keysPressed.a = false;
  if (e.key.toLowerCase() === "d") keysPressed.d = false;
});

// --- FUNCIONES DEL JUEGO ---

// ⚙️ Actualizar la lógica y posiciones
function update() {
  // Mover el catcher con el teclado
  if (keysPressed.a && catcher.x > 0) {
    catcher.x -= catcher.speed;
  }
  if (keysPressed.d && catcher.x < canvas.width - catcher.width) {
    catcher.x += catcher.speed;
  }

  // Actualiza la posición de cada objeto que cae
  for (let i = fallingObjects.length - 1; i >= 0; i--) {
    let obj = fallingObjects[i];
    obj.y += obj.speed;

    // 1. Detección de colisión (objeto vs catcher)
    if (
      obj.y + obj.radius >= catcher.y &&
      obj.y - obj.radius <= catcher.y + catcher.height &&
      obj.x >= catcher.x &&
      obj.x <= catcher.x + catcher.width
    ) {
      if (obj.type === "ball") {
        score++;
        currentSpeed += 0.1;
      } else {
        lives--;
      }
      fallingObjects.splice(i, 1);
      continue;
    }

    // 2. Si el objeto cae fuera del canvas
    if (obj.y - obj.radius > canvas.height) {
      if (obj.type === "ball") {
        lives--;
      }
      fallingObjects.splice(i, 1);
    }
  }

  // 3. Revisar si el juego terminó
  if (lives <= 0) {
    alert(`💀 Game Over! Final Score: ${score}`);
    resetGame();
  }
}

// ✨ Función para generar pelotas y piedras
function spawnObject() {
  const isStone = Math.random() > 0.85; // 15% de probabilidad

  let newObject = {
    x: Math.random() * (canvas.width - 30) + 15,
    y: 0,
    radius: 15,
    speed: currentSpeed,
    type: isStone ? "stone" : "ball",
    color: isStone ? "grey" : "red",
  };
  fallingObjects.push(newObject);
}

// 🔁 Reinicia el juego al estado inicial
function resetGame() {
  score = 0;
  lives = 3;
  currentSpeed = initialSpeed;
  fallingObjects = [];
}

// 🎨 Dibujar todo en pantalla
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibuja cada objeto
  fallingObjects.forEach((obj) => {
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
    ctx.fillStyle = obj.color;
    ctx.fill();
  });

  // Dibuja el catcher
  ctx.fillStyle = catcher.color;
  ctx.fillRect(catcher.x, catcher.y, catcher.width, catcher.height);

  // Dibuja la puntuación y las vidas
  ctx.fillStyle = "white";
  ctx.font = "18px Arial";

  // Puntuación a la izquierda
  ctx.fillText("Score: " + score, 10, 25);

  // ❤️ NUEVO: Vidas en el centro
  const livesText = "❤️".repeat(lives);
  // Medimos el ancho del texto para centrarlo perfectamente
  const textWidth = ctx.measureText(livesText).width;
  // Lo dibujamos en el centro (canvas.width / 2) menos la mitad de su propio ancho
  ctx.fillText(livesText, (canvas.width - textWidth) / 2, 25);
}

// 🌀 Bucle principal del juego
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Inicia el generador de objetos
setInterval(spawnObject, 1200);

// Inicia el juego
gameLoop();