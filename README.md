# Product Board

A small Kanban-style product board built with plain HTML, CSS and JavaScript. Products are grouped into three columns by status (TODO, DOING, DONE). Users can add products through a validated form, and search or filter the board by name and category.

The project has no dependencies and no build step.

## Features

- Display products grouped by status in three columns, each with a live counter.
- Add a new product (name, price, category) through a form with inline validation.
- Search products by name, case-insensitive and ignoring surrounding spaces.
- Filter products by category, combined with the search.
- Counters always reflect the products currently visible.

## Project structure

```
.
├── index.html   Markup: form, filters and the three columns
├── style.css    Styles
└── app.js       All application logic
```

## Getting started

1. Download or clone the project.
2. Open `index.html` in a web browser.

No installation or server is required. A local development server such as the VS Code Live Server extension can be used if preferred.

## Data model

Each product is an object with the following shape:

```js
{
  id: 1,
  name: "Wireless mouse",
  category: "Electronics",   // Electronics | Books | Home
  price: 19.9,
  status: "TODO"             // TODO | DOING | DONE
}
```

Products are stored in the `products` array. The application starts with six sample products.

## Validation rules

The form is validated on submit and while the user types. Each invalid field displays its own error message.

| Field    | Rule                                                              |
| -------- | ----------------------------------------------------------------- |
| Name     | At least 2 characters after trimming surrounding spaces.          |
| Price    | A number greater than 0. The decimal separator must be a dot.     |
| Category | One of the available categories must be selected.                 |

If any rule fails, the product is not added and the form is not cleared.

## How it works

| Function                | Responsibility                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `renderProducts(list)`  | Clears the three lists and rebuilds them from `list` (defaults to all products), then updates counters. |
| `ReadForm()`            | Reads the current values of the name, price and category fields.                                        |
| `validateProduct(data)` | Checks the values, displays the error messages and returns an object containing the errors.             |
| `addProduct(data)`      | Creates a product with a new id and the `TODO` status, stores it and refreshes the board.               |
| `filterProducts()`      | Applies the search text and the selected category, then passes the result to `renderProducts`.          |
