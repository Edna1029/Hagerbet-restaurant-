const beverages = [
  {
    id: 'tej',
    name: 'Tej',
    amharic: 'ጠጅ',
    price: 'ETB 150',
    image: 'images/tej.jpg',
    short: 'Traditional Ethiopian honey wine with rich, sweet flavor.',
    desc: 'Tej is a traditional Ethiopian honey wine, fermented to perfection with a sweet, aromatic flavor. Served in traditional berele bottles for an authentic experience.',
    bestSeller: true
  },
  {
    id: 'tella',
    name: 'Tella',
    amharic: 'ጠላ',
    price: 'ETB 120',
    image: 'images/tela.jpg',
    short: 'Homemade Ethiopian barley beer with unique local flavor.',
    desc: 'Tella is a traditional Ethiopian home-brewed beer made from barley and gesho leaves. It has a distinctive earthy flavor and is a staple in Ethiopian social gatherings.'
  },
  {
    id: 'birz',
    name: 'Birz',
    amharic: 'ብርዝ',
    price: 'ETB 100',
    image: 'images/birz.jpg',
    short: 'Non-alcoholic fermented honey drink, sweet and refreshing.',
    desc: 'Birz is a non-alcoholic fermented honey drink, lightly carbonated with a sweet, refreshing taste. Perfect for those who prefer non-alcoholic traditional beverages.'
  },
  {
    id: 'coffee',
    name: 'Coffee',
    amharic: 'ቡና',
    price: 'ETB 80',
    image: 'images/coffee.jpg',
    short: 'Traditional Ethiopian coffee ceremony with fresh roasted beans.',
    desc: 'Experience the authentic Ethiopian coffee ceremony with freshly roasted coffee beans, traditional jebena pot, and incense. Served with popcorn or snacks as per tradition.'
  },
  {
    id: 'keneto',
    name: 'Keneto',
    amharic: 'ከነጦ',
    price: 'ETB 90',
    image: 'images/keneto.jpg',
    short: 'Local fermented barley drink with unique regional character.',
    desc: 'Keneto is a regional specialty fermented barley drink, known for its distinctive flavor profile that varies by region. A must-try for authentic Ethiopian beverage enthusiasts.'
  }
];

/* render menu items */
const container = document.getElementById('menu-items');

function render() {
  beverages.forEach((drink, i) => {
    const side = (i % 2 === 0) ? 'left' : 'right';
    const item = document.createElement('div');
    item.className = `menu-item ${side}`;
    item.innerHTML = `
      <div class="disc" aria-hidden="true">
        <img src="${drink.image}" alt="${drink.name}">
      </div>

      <div class="ribbon" data-id="${drink.id}" role="button" tabindex="0" aria-pressed="false" aria-label="${drink.name} - ${drink.amharic}">
        <div class="ribbon-inner">
          <h3 class="dish">${drink.name} ${drink.bestSeller ? '<div class="best-seller">Best Seller</div>' : ''}
            <span class="amharic">${drink.amharic}</span>
          </h3>
          <div class="price">${drink.price}</div>
        </div>
      </div>

      <div class="short-desc">${drink.short || ''}</div>
    `;
    container.appendChild(item);

    // open modal on click or Enter key
    const ribbon = item.querySelector('.ribbon');
    ribbon.addEventListener('click', () => openModal(drink));
    ribbon.addEventListener('keydown', (e) => { if (e.key === 'Enter') openModal(drink); });
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

function openModal(drink) {
  modalImg.src = drink.image;
  modalImg.alt = drink.name;
  modalTitle.textContent = drink.name;
  modalAmharic.textContent = drink.amharic;
  modalPrice.textContent = drink.price;
  modalDesc.textContent = drink.desc || drink.short || '';
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