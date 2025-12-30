const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
let color1 = [0, 255, 64]; // rosa
let color2 = [160, 120, 255]; // roxo
let color3 = [120, 170, 255]; // azul
let color4 = [255, 191, 0]; // rosa claro
let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const colors = [
  color1, // rosa
  color2, // roxo
  color3, // azul
  color4  // rosa claro

];

class Blob {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.radius = 280 + Math.random() * 320;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 0.0003 + Math.random() * 0.0004;
    this.driftX = (Math.random() - 0.5) * 0.4;
    this.driftY = (Math.random() - 0.5) * 0.4;
  }

  update(time) {
    this.angle += this.speed * 0.1;

    this.x += Math.cos(this.angle) * 0.6 + this.driftX;
    this.y += Math.sin(this.angle) * 0.6 + this.driftY;

    // loop infinito sem reset brusco
    if (this.x < -this.radius) this.x = w + this.radius;
    if (this.x > w + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = h + this.radius;
    if (this.y > h + this.radius) this.y = -this.radius;
  }

  draw() {
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius
    );

    gradient.addColorStop(
      0,
      `rgba(${this.color[0]},${this.color[1]},${this.color[2]},0.35)`
    );
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

const blobs = Array.from({ length: 7 }, () => new Blob());

function animate(time) {
  // FADE suave (ESSENCIAL)
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, w, h);

  blobs.forEach(blob => {
    blob.update(time);
    blob.draw();
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

let btnMenu = document.querySelector('.btn-menu');
let nav = document.querySelector('header nav');

btnMenu.addEventListener('click', () => {

  nav.classList.toggle('open');
});

// Fecha o menu ao clicar em um link (útil para dispositivos móveis)
let navLinks = document.querySelectorAll('header nav ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

// Fecha o menu ao clicar fora dele
document.addEventListener('click', (event) => {
  if (!nav.contains(event.target) && !btnMenu.contains(event.target)) {
    nav.classList.remove('open');
  }
});

let header = document.querySelector('header');
window.addEventListener('scroll', () => {
  window.scrollY > 0 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
  nav.classList.remove('open');
});
