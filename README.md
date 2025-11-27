# 🛍️ E-Commerce Frontend (Mini Store)

A feature-rich, responsive, and modern online clothing store built using **HTML, CSS, JavaScript, and JSON**.
This project includes dynamic product loading, search, category filtering, cart system, checkout page, animations, and dark mode support.

---

# 🌟 Project Overview

This web application simulates a complete ecommerce clothing store.
Users can:

* Browse products
* Search by name
* Filter by category
* Add items to cart
* View and update cart
* Proceed to checkout

Everything is built without frameworks — only **Vanilla JS** — which demonstrates strong fundamentals.

---

# 📁 Folder Structure

```
online-clothing-store/
│── index.html
│── style.css
│── script.js
│── data.json
│── favicon.jpeg
│
├── images/
│     ├── product1.jpg
│     ├── product2.jpg
│     ├── product3.jpg
│     ├── ...
```

---

# ✨ Features (Detailed)

## 🔹 1. Dynamic Product Rendering

Products are loaded from **data.json**, making the website scalable.
You can add unlimited products without touching HTML.

```json
{
  "products": [
    {
      "id": 1,
      "name": "Classic Hoodie",
      "category": "Hoodies",
      "price": 2500,
      "image": "images/hoodie1.jpg"
    }
  ]
}
```

---

## 🔹 2. Real-Time Search

Users can search any product by name.
The search updates instantly as the user types.

---

## 🔹 3. Category Filters

Filter products by:

* Hoodies
* Pants
* Jackets
* Hijabs
* Sports Wear
* Formal Wear
* Traditional Wear
* Shoes

Filtering works alongside search.

---

## 🔹 4. Add to Cart Functionality

* Add any item to cart
* Cart stored using **localStorage**
* Cart badge updates instantly
* Cart remains saved even after refresh
* Prevents duplicate items

---

## 🔹 5. Shopping Cart Page

The cart page includes:

* Product image
* Name
* Price
* Quantity + and –
* Remove option
* Auto-update total
* Auto-save changes

---

## 🔹 6. Checkout Page

A simple checkout form:

* Full Name
* Email
* Phone
* Address
* Payment Type
* Submit Button

---

## 🔹 7. Responsive Web Design

Works on:

* Desktop
* Tablet
* Mobile

Grid layout adapts automatically.

---

## 🔹 8. Animations & Hover Effects

Smooth UI animations such as:

* Product hover zoom
* Button hover
* Card shadows
* Fade-in animations

---

## 🔹 9. Dark Mode (Optional)

Dark mode styles are integrated inside CSS (commented).
You can enable with one class:

```javascript
document.body.classList.toggle("dark-mode");
```

---

# 🎨 Technologies Used

| Technology   | Use Case                             |
| ------------ | ------------------------------------ |
| HTML         | Structure of the webpage             |
| CSS          | UI design, animations, dark mode     |
| JavaScript   | Logic, filtering, cart, dynamic data |
| JSON         | Product storage                      |
| LocalStorage | Persistent cart system               |

---

# 🛠️ How the Project Was Built (Step-by-Step)

## ✔ Step 1: Creating the UI

Created:

* Navbar
* Logo
* Search bar
* Category filters
* Product grid
* Cart icon (top-right badge)

---

## ✔ Step 2: Designing the Layout (CSS)

* Used CSS Grid for products
* Flexbox for header and filters
* Added shadows, rounded cards, and transitions
* Made website fully responsive

---

## ✔ Step 3: Creating `data.json`

Added 20 products with name, price, category, and images.

---

## ✔ Step 4: Loading Products Using fetch()

```js
fetch("data.json")
  .then(res => res.json())
  .then(data => displayProducts(data.products));
```

---

## ✔ Step 5: Implementing Search & Filters

* Search updates using input event
* Filters use dropdown or buttons
* Both work together dynamically

---

## ✔ Step 6: Add to Cart System

1. When user clicks “Add to Cart”, item is pushed to localStorage
2. Cart count updates
3. Badge becomes visible

---

## ✔ Step 7: Cart Page

* Loaded items from localStorage
* Displayed them in a table layout
* Created quantity buttons
* Recalculated total automatically

---

## ✔ Step 8: Checkout Page

Simple form to simulate real ecommerce checkout.

---


# 🎯 Learning Outcomes

After making this project, you understand:

* DOM manipulation
* LocalStorage usage
* Fetching JSON data
* Responsive layouts
* Real-world ecommerce flow
* JS event handling
* Dynamic filtering logic

---

# 💡 Future Enhancements

* Sorting (Low→High, High→Low)
* Wishlist
* Admin panel to add products
* Backend (Node.js + MongoDB)
* User login system

---

# 🙌 Special Thanks

A huge shoutout to:

### ⭐ **Sir Zohaib**

### ⭐ **Nexus AI**

For continuous guidance and support.

---

