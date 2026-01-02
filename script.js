// ===== NÚMERO DO WHATSAPP =====
const WHATSAPP_NUMBER = '5511948804983'; // Altere para o número real

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');

  const logoHeader = document.querySelector('a[href="#home"] img');
   logoHeader.style.display  = 'none';
window.addEventListener('scroll', () => {

  if (window.scrollY > 50) {
    logoHeader.style.display  = 'inline-block';
    logoHeader.style.width    = '100px';
    logoHeader.style.height   = '100px';
    header.classList.add('scrolled');

  } else {
    header.classList.remove('scrolled');
    logoHeader.style.display  = 'none';
  }
});

// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const overlay = document.querySelector('.overlay');
const mobileLinks = document.querySelectorAll('.mobile-nav a');

function toggleMenu() {
  mobileNav.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    toggleMenu();
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== FADE IN ANIMATION =====
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(element => {
  observer.observe(element);
});

// ===== WHATSAPP LINK GENERATOR =====
function generateWhatsAppLink(productName, price) {
  const message = encodeURIComponent(
    `Olá! Tenho interesse no produto:\n\n` +
    `📦 *${productName}*\n` +
    `💰 ${price}\n\n` +
    `Gostaria de mais informações!`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

// ===== PRODUCTS DATA =====
const products = [
  {
    id: 1,
    name: 'Kit Lavabo Rosa',
    description: 'Conjunto elegante com difusor e sabonete líquido em fragrância floral',
    price: 'R$ 189,90',
    image: './assets/products/kit-lavabo-rosa-removebg-preview.png'
  },
  {
    id: 2,
    name: 'Difusor Âmbar Premium',
    description: 'Difusor artesanal com notas amadeiradas e especiarias',
    price: 'R$ 129,90',
    image: './assets/products/kit-lavabo-rosa.png'
  },
  {
    id: 3,
    name: 'Kit Lavabo Luxo Dourado',
    description: 'Coleção premium com acabamento em dourado e fragrância exclusiva',
    price: 'R$ 249,90',
    image: './assets/products/kit-sala-rosa.jpeg'
  },
  {
    id: 4,
    name: 'Difusor Vanilla & Sândalo',
    description: 'Combinação sofisticada de baunilha com notas de sândalo',
    price: 'R$ 149,90',
    image: './assets/products/kit-lavabo-rosa.png'
  }
];

// ===== RENDER PRODUCTS =====
function renderProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="product-card fade-in">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p class="description">${product.description}</p>
      <p class="price">${product.price}</p>
      <a href="${generateWhatsAppLink(product.name, product.price)}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="btn-whatsapp">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Comprar
      </a>
    </div>
  `).join('');

  // Re-observe new elements
  document.querySelectorAll('.product-card.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// ===== CONTACT WHATSAPP LINK =====
function setupContactButton() {
  const contactBtn = document.getElementById('contact-whatsapp');
  if (!contactBtn) return;

  const message = encodeURIComponent(
    `Olá! Vim pelo site SANS ART DECOR e gostaria de saber mais sobre os produtos.`
  );
  contactBtn.href = `https://wa.me/5511948804983?text=${message}`;
  // contactBtn.href = `https://api.whatsapp.com/send?phone=551194880&text=${message}`;
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupContactButton();
});
