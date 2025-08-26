# Product Inventory Dashboard  

<p align="center">
  <em>A modern, lightning-fast inventory management dashboard built with React, TypeScript, Redux Toolkit, and Tailwind CSS.</em>
</p>  

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="Redux Toolkit" src="https://img.shields.io/badge/redux_toolkit-%23764ABC.svg?style=for-the-badge&logo=redux&logoColor=white"/>
  <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img alt="Vite" src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white"/>
</p>  

<p align="center">
  <img src="docs/demo-dashboard.png" width="90%" alt="Inventory Dashboard Screenshot"/>
</p>  

---

## Features  
- Product List → View product details (title, image, price, stock, brand, category).  
- Add/Edit Modal → Intuitive modal for managing product data.  
- Delete with Confirmation → Safe product removal with smooth UI feedback.  
- Search & Filter → Instant text search and category-based filtering.  
- Sorting → Sort by price or name (ascending/descending).  
- Local Persistence → Saves products in localStorage for offline retention.  
- Responsive UI → Built with Tailwind CSS for a polished experience.  
- Error & Loading States → Smooth feedback during API interactions.  

---

## Tech Stack  
### Frontend  
- Framework: React  
- Language: TypeScript  
- State Management: Redux Toolkit  
- Styling: Tailwind CSS  

### Build & Tools  
- Build Tool: Vite  
- API: [DummyJSON Products API](https://dummyjson.com/products)  

---

## API Reference  
All product actions use the [DummyJSON Products API](https://dummyjson.com/products).  

| Action   | Endpoint            | Method  | Example Payload            | Returns          |  
|----------|---------------------|---------|----------------------------|------------------|  
| Fetch    | `/products`         | GET     | —                          | `{ products: [...] }` |  
| Add      | `/products/add`     | POST    | `{ title, price, ... }`    | New product object |  
| Update   | `/products/{id}`    | PUT     | `{ stock, price, ... }`    | Updated product   |  
| Delete   | `/products/{id}`    | DELETE  | —                          | —                |  


---

## Getting Started  

### Prerequisites  
- [Node.js](https://nodejs.org/) (v16 or later)  
- npm or yarn  

### Installation  
```bash
# Clone the repository
git clone https://github.com/Ved-ant11/product-inventory-dashboard.git
cd product-inventory-dashboard

# Install dependencies
npm install

# env.example
VITE_API_BASE_URL=https://dummyjson.com/products

# Run the app
npm run dev    # For Vite
# or
npm start      # For CRA

---

Usage

Add/Edit Products → Use the “Add Product” button or edit existing products.

Delete Products → Click delete, then confirm.

Search & Filter → Search by name or filter by category.

Sorting → Sort results by name or price.

Persistence → Local changes are stored in localStorage.