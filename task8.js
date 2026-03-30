<div class="catalog">
  <div class="product-card" data-id="101" data-category="laptops">
    <a class="product-link" href="/product/101">
      <span class="product-title">Lenovo IdeaPad 5</span>
    </a>
    <div class="price-block">
      <span class="price-current">74990</span>
      <span class="price-old">82990</span>
    </div>
    <img class="product-image" src="/images/lenovo.jpg" alt="Lenovo IdeaPad 5" />
    <span class="product-stock">В наличии</span>
  </div>

  <div class="product-card" data-id="102" data-category="monitors">
    <a class="product-link" href="/product/102">
      <span class="product-title">Samsung Monitor 27</span>
    </a>
    <div class="price-block">
      <span class="price-current">21990</span>
    </div>
    <img class="product-image" src="/images/samsung.jpg" alt="Samsung Monitor 27" />
    <span class="product-stock">Нет в наличии</span>
  </div>

  <div class="product-card" data-id="103" data-category="accessories">
    <a class="product-link" href="/product/103">
      <span class="product-title">Logitech Mouse MX</span>
    </a>
    <div class="price-block">
      <span class="price-current">5990</span>
      <span class="price-old"></span>
    </div>
    <img class="product-image" src="/images/logitech.jpg" alt="Logitech Mouse MX" />
    <span class="product-stock">В наличии</span>
  </div>

  <div class="product-card" data-id="104" data-category="storage">
    <a class="product-link" href="/product/104">
      <span class="product-title">SSD Samsung 1TB</span>
    </a>
    <div class="price-block">
      <span class="price-current">10990</span>
      <span class="price-old">12990</span>
    </div>
    <img class="product-image" src="/images/ssd.jpg" alt="SSD Samsung 1TB" />
    <span class="product-stock"></span>
  </div>
</div>
const cards = document.querySelectorAll(".product-card");

const products = [];

for (const card of cards) {
  const id = card.getAttribute("data-id");
  const category = card.getAttribute("data-category");

  const titleElement = card.querySelector(".product-title");
  const linkElement = card.querySelector(".product-link");
  const currentPriceElement = card.querySelector(".price-current");
  const oldPriceElement = card.querySelector(".price-old");
  const imageElement = card.querySelector(".product-image");
  const stockElement = card.querySelector(".product-stock");

  const title = titleElement ? titleElement.textContent.trim() : null;
  const href = linkElement ? linkElement.getAttribute("href") : null;

  const currentPrice = currentPriceElement
    ? Number(currentPriceElement.textContent.trim())
    : null;

  let oldPrice = null;

  if (oldPriceElement && oldPriceElement.textContent.trim() !== "") {
    oldPrice = Number(oldPriceElement.textContent.trim());
  }

  const image = imageElement ? imageElement.getAttribute("src") : null;

  let stockText = "Нет данных";

  if (stockElement && stockElement.textContent.trim() !== "") {
    stockText = stockElement.textContent.trim();
  }

  const inStock = stockText === "В наличии";

  products.push({
    id: id,
    category: category,
    title: title,
    href: href,
    currentPrice: currentPrice,
    oldPrice: oldPrice,
    image: image,
    inStock: inStock,
    stockText: stockText
  });
}

console.log(products);