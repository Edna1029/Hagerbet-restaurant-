/* 
  Extras data for Hager Bet Restaurant
  Put your food images inside /images/ and update the image paths below.
*/

const extras = [
  {
    id: 'injera',
    name: 'Injera',
    amharic: 'እንጀራ',
    price: 'ETB 280',
    image: 'images/injera.jpg',
    short: 'Traditional Ethiopian sourdough flatbread made from teff flour.',
    desc: 'Injera is the cornerstone of Ethiopian cuisine - a soft, spongy sourdough flatbread made from teff flour. It serves as both plate and utensil for all traditional dishes, absorbing the rich flavors of stews and sauces.',
    essential: true
  },
  {
    id: 'ambasha',
    name: 'Ambasha',
    amharic: 'አምባሻ',
    price: 'ETB 250',
    image: 'images/ambasha.jpg',
    short: 'Traditional Tigrayan sweet bread with cardamom and fenugreek.',
    desc: 'Ambasha is a traditional Tigrayan sweet bread, beautifully braided and flavored with cardamom and fenugreek. Perfect with tea or coffee, this soft, slightly sweet bread is a favorite for breakfast or snacks.'
  },
  {
    id: 'defo-dabo',
    name: 'Defo Dabo',
    amharic: 'ደፎ ዳቦ',
    price: 'ETB 320',
    image: 'images/defo.jpg',
    short: 'Traditional Ethiopian holiday bread spiced with coriander and fenugreek.',
    desc: 'Defo Dabo is a large, round traditional Ethiopian holiday bread, specially spiced with coriander and fenugreek. Often prepared for special occasions and celebrations, it has a dense, flavorful texture that pairs wonderfully with stews.'
  },
  {
    id: 'kocho',
    name: 'Kocho',
    amharic: 'ቆጮ',
    price: 'ETB 230',
    image: 'images/kocho.jpg',
    short: 'Traditional fermented bread made from enset plant.',
    desc: 'Kocho is a traditional Ethiopian fermented, bread-like food made from the processed corm and pseudostem of the enset plant (false banana). It has a unique sour flavor and is a staple in southern Ethiopian cuisine.'
  },
  {
    id: 'popcorn',
    name: 'Popcorn',
    amharic: 'ፋንዲሻ',
    price: 'ETB 200',
    image: 'images/popcorn.jpg',
    short: 'Freshly popped corn kernels, lightly salted - traditional snack.',
    desc: 'Freshly popped corn kernels, lightly salted. In Ethiopian tradition, popcorn is often served with coffee ceremonies as a light, crunchy snack that complements the rich coffee flavor perfectly.'
  }
];

/* render menu items */
const container = document.getElementById('menu-items');

function render() {
  extras.forEach((extra, i) => {
    const side = (i % 2 === 0) ? 'left' : 'right';
    const item = document.createElement('div');
    item.className = `menu-item ${side}`;
    item.innerHTML = `
      <div class="disc" aria-hidden="true">
        <img src="${extra.image}" alt="${extra.name}">
      </div>

      <div class="ribbon" data-id="${extra.id}" role="button" tabindex="0" aria-pressed="false" aria-label="${extra.name} - ${extra.amharic}">
        <div class="ribbon-inner">
          <h3 class="dish">${extra.name} ${extra.essential ? '<div class="essential">Essential</div>' : ''}
            <span class="amharic">${extra.amharic}</span>
          </h3>
          <div class="price">${extra.price}</div>
        </div>
      </div>

      <div class="short-desc">${extra.short || ''}</div>
    `;
    container.appendChild(item);

    // open modal on click or Enter key
    const ribbon = item.querySelector('.ribbon');
    ribbon.addEventListener('click', () => openModal(extra));
    ribbon.addEventListener('keydown', (e) => { if (e.key === 'Enter') openModal(extra); });
  });
}

/* Modal behavior */
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalAmharic = document.getElementById('modal-amharic');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.getElementById('modal-close');
const modalOverlay = document.getElementById('modal-overlay');

function openModal(extra) {
  modalImg.src = extra.image;
  modalImg.alt = extra.name;
  modalTitle.textContent = extra.name;
  modalAmharic.textContent = extra.amharic;
  modalPrice.textContent = extra.price;
  modalDesc.textContent = extra.desc || extra.short || '';
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

/* close handlers */
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* demo order button (hook into your ordering flow) */
document.getElementById('order-btn').addEventListener('click', () => {
  alert('Order demo — connect this button to your ordering system.');
});

/* initialize */
document.addEventListener('DOMContentLoaded', render);