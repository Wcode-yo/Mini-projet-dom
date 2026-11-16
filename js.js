let products = [
  { id: 1, name: "Wireless mouse", category: "Electronics", price: 19.9, status: "TODO" },
  { id: 2, name: "USB-C cable", category: "Electronics", price: 9.5, status: "DOING" },
  { id: 3, name: "JavaScript book", category: "Books", price: 32, status: "TODO" },
  { id: 4, name: "Desk lamp", category: "Home", price: 24.99, status: "DONE" },
  { id: 5, name: "Notebook", category: "Books", price: 4.5, status: "DOING" },
  { id: 6, name: "Coffee mug", category: "Home", price: 7, status: "TODO" },
];

const STATUSES = ["TODO", "DOING", "DONE"];

function renderProducts(list = products) {
  const listTODO = document.querySelector("#list-TODO");
  const listDOING = document.querySelector("#list-DOING");
  const listDONE = document.querySelector("#list-DONE");
  const listElmentsUL = [listTODO, listDOING, listDONE];

  const todoProducts = list.filter((prd) => prd.status === "TODO");
  const doingProduct = list.filter((prd) => prd.status === "DOING");
  const doneProduct = list.filter((prd) => prd.status === "DONE");
  const listFilteredProducts = [todoProducts, doingProduct, doneProduct];

  for (let i = 0; i < 3; i++) {
    listElmentsUL[i].textContent = "";

    listFilteredProducts[i].forEach((prd) => {
      const li = document.createElement("li");
      li.className = "product";
      li.dataset.id = prd.id;

      const name = document.createElement("span");
      name.className = "name";
      name.textContent = prd.name;

      const meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent = `${prd.category} · ${prd.price.toFixed(2)} €`;

      li.append(name, meta);
      listElmentsUL[i].append(li);
    });

    document.querySelector(`#count-${STATUSES[i]}`).textContent =listFilteredProducts[i].length;
      
  }
}
const form = document.querySelector("#product-form");

function ReadForm() {

  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const category = document.querySelector("#category").value;
  return { name, price, category };
}

function validateProduct(data) {
  const errors = {};
  if (data.name.trim().length < 2)
    errors.name = "The name needs at least 2 characters.";
  if (Number.isNaN(Number(data.price)) || Number(data.price) <= 0)
    errors.price = "The price must be a number greater than 0.";
  if (data.category === "") errors.category = "Choose a category.";

  document.querySelector("#name-error").textContent = errors.name ?? "";
  document.querySelector("#price-error").textContent = errors.price ?? "";
  document.querySelector("#category-error").textContent =
    errors.category ?? "";

  return errors;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = ReadForm();
  const errors = validateProduct(data);

  if (Object.keys(errors).length > 0) return;

  addProduct(data);
  form.reset();
});
 

let nextId = 7;

function addProduct(data) {
  const product = {
    id: nextId,
    name: data.name.trim(),
    category: data.category,
    price: Number(data.price),
    status: "TODO",
  };
  nextId++;
  products.push(product);
  filterProducts();

}
const searchInput = document.querySelector("#search");
const categoryFilter = document.querySelector("#filter-category");

function filterProducts() {
  const text = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;

  const filtered = products.filter(
    (element) =>element.name.toLowerCase().includes(text)&&(category === "all" || element.category === category));
  renderProducts(filtered);
}


searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);


renderProducts();
