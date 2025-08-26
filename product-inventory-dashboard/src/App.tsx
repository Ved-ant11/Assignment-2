import React from "react";
import ProductList from "./components/ProductList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900">
      <header className="bg-zinc-700 text-white p-6 text-center text-2xl font-semibold">
        Product <span className="text-yellow-500">Inventory</span> Dashboard
      </header>
      <main className="flex-grow">
        <ProductList />
      </main>
      <footer className="bg-zinc-700 text-white p-4 text-center text-sm opacity-75">
        &copy; {new Date().getFullYear()} Product Inventory Dashboard
        <br />
        Built with React, TypeScript and Redux-toolkit
        <br />
        By{" "}
        <a
          href="https://github.com/Ved-ant11"
          target="_blank"
          className="underline hover:text-cyan-500"
        >
          Vedant
        </a>
      </footer>
    </div>
  );
};

export default App;
