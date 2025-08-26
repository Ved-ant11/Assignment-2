# User Directory Dashboard 👤

<p align="center">
  <em>A sleek and responsive user directory dashboard built with React, TypeScript, Redux Toolkit, and Tailwind CSS.</em>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="Redux Toolkit" src="https://img.shields.io/badge/redux_toolkit-%23764ABC.svg?style=for-the-badge&logo=redux&logoColor=white"/>
  <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img alt="Vite" src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white"/>
</p>

---

## Features
- **Paginated User List** → View user details including photo, name, and email.
- **User Detail Modal** → Click on any user to see their detailed information in a sleek pop-up modal.
- **Search & Filter** → Instantly filter the user list by name or email.
- **Favorite Users** → Mark users as favorites with a star icon, with the selection saved to `localStorage`.
- **Dark/Light Theme** → Toggle between dark and light modes, with the user's preference saved for their next visit.
- **Responsive UI** → A polished, mobile-first experience built with Tailwind CSS.
- **Error & Loading States** → Smooth feedback during API interactions with dedicated loader and error messages.

---

## Tech Stack

### Frontend
- Framework: React
- Language: TypeScript
- State Management: Redux Toolkit
- Styling: Tailwind CSS

### Build & Tools
- Build Tool: Vite
- API: [Reqres API](https://reqres.in/)

---

## API Reference
This project fetches paginated user data from the [Reqres API](https://reqres.in/).

| Action | Endpoint | Method | Returns |
|--------|----------|---------|---------|
| Fetch Users | `/api/users?page={number}` | GET | `{ data: [...], page, per_page, total }` |

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Ved-ant11/user-directory-dashboard.git
cd user-directory-dashboard

# Install dependencies
npm install

# Run the app
npm run dev

# env.example
VITE_API_KEY=your_reqres_apikey
```

---

## Usage

### Viewing Users
Browse through paginated user cards with photos, names, and emails.

### User Details
Click on any user card to open a detailed modal with additional information.

### Search & Filter
Use the search bar to instantly filter users by name or email.

### Favorites
Click the star icon on user cards to mark them as favorites. Favorites are saved to `localStorage`.

### Theme Toggle
Switch between dark and light modes using the theme toggle. Your preference is remembered for future visits.

---

## Project Structure
```
src/
├── app/
│   ├──hooks.ts 
│   ├──store.ts
├── components/       # Reusable React components
│   ├── Loader.tsx
│   ├── Pagination.tsx
│   ├── UserCard.tsx
│   ├── UserList.tsx
│   └── UserModal.tsx
├── features/         # Redux state logic ("slices")
│   ├── theme/
│   └── users/
├── types/index.ts            
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

---

## Scripts
```bash
npm run dev          # Start development server
```