// 🎮 Juego: Catch the Ball
// Explicación: Mueves una barra con el mouse para atrapar una bola que cae.
// Si la atrapas, ganas puntos. Si no, se reinicia el juego.
//cambio
//yo hice un cambio

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


// 🔧 Ajustes del lienzo
canvas.width = 400;
canvas.height = 600;

<<<<<<< Updated upstream
// 🏀 Configuración de la bola
let ball = {
  x: Math.random() * 380 + 10, // Posición aleatoria inicial (evita los bordes)
  y: 0,
  radius: 15,
  speed: 3,
  color: "red",
};
=======
>>>>>>> Stashed changes

// 🧍 Control del jugador (la barra)
let catcher = {
  width: 80,
  height: 10,
  x: canvas.width / 2 - 40, // Centrado al inicio
  y: canvas.height - 40,
  color: "white",
};

<<<<<<< Updated upstream
let score = 0;
let mouseX = canvas.width / 2;
=======

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
>>>>>>> Stashed changes


// 🖱 Evento: mover el mouse
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
});

<<<<<<< Updated upstream
// ⚙️ Actualizar posición y lógica
=======

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
>>>>>>> Stashed changes
function update() {
  // Mueve la bola
  ball.y += ball.speed;

  // Actualiza la posición del catcher
  catcher.x = mouseX - catcher.width / 2;

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

<<<<<<< Updated upstream
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
=======

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
>>>>>>> Stashed changes
}


// 🎨 Dibujar todo en pantalla
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

<<<<<<< Updated upstream
  // Dibuja la bola
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
=======

  // Dibuja cada objeto
  fallingObjects.forEach((obj) => {
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
    ctx.fillStyle = obj.color;
    ctx.fill();
  });
>>>>>>> Stashed changes


  // Dibuja el catcher
  ctx.fillStyle = catcher.color;
  ctx.fillRect(catcher.x, catcher.y, catcher.width, catcher.height);

<<<<<<< Updated upstream
  // Dibuja el score
  ctx.fillStyle = "white";
  ctx.font = "18px Arial";
  ctx.fillText("Score: " + score, 10, 25);
}

// 🌀 Bucle del juego
=======

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
>>>>>>> Stashed changes
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

<<<<<<< Updated upstream
gameLoop();
=======

// Inicia el generador de objetos
setInterval(spawnObject, 1200);


// Inicia el juego
gameLoop();


>>>>>>> Stashed changes
