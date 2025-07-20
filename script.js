const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const car = {
  x: 180,
  y: 500,
  width: 40,
  height: 60,
  speed: 5,
  color: "lime"
};

const parkingZone = {
  x: 180,
  y: 50,
  width: 40,
  height: 60,
  color: "yellow"
};

let gameWon = false;

document.addEventListener("keydown", (e) => {
  if (!gameWon) {
    if (e.key === "ArrowLeft" && car.x > 0) car.x -= car.speed;
    if (e.key === "ArrowRight" && car.x + car.width < canvas.width) car.x += car.speed;
    if (e.key === "ArrowUp" && car.y > 0) car.y -= car.speed;
    if (e.key === "ArrowDown" && car.y + car.height < canvas.height) car.y += car.speed;
  }
});

function drawCar() {
  ctx.fillStyle = car.color;
  ctx.fillRect(car.x, car.y, car.width, car.height);
}

function drawParkingZone() {
  ctx.strokeStyle = parkingZone.color;
  ctx.lineWidth = 3;
  ctx.strokeRect(parkingZone.x, parkingZone.y, parkingZone.width, parkingZone.height);
}

function checkIfParked() {
  if (
    car.x >= parkingZone.x &&
    car.x + car.width <= parkingZone.x + parkingZone.width &&
    car.y >= parkingZone.y &&
    car.y + car.height <= parkingZone.y + parkingZone.height
  ) {
    gameWon = true;
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("🎉 Parked Successfully!", 70, 300);
  }
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawParkingZone();
  drawCar();
  checkIfParked();
  requestAnimationFrame(drawGame);
}

drawGame();
