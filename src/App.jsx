import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import page components
import DashboardPage from "./pages/DashboardPage";
import ProductListPage from "./pages/ProductListPage";
import ProductFormPage from "./pages/ProductFormPage";
import NotFoundPage from "./pages/NotFoundPage";

// Import layout components
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

function App() {
  return (
    <Router>
      {/* Main container for the layout: sidebar on left, content on right */}
      <div className="flex min-h-screen bg-gray-100 font-sans">
        {/* Sidebar for global navigation */}
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          {/* Main content area where different pages will be rendered */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
            <Routes>
              {/* Route for the Dashboard page (home) */}
              <Route path="/" element={<DashboardPage />} />

              {/* Route for the Product List page */}
              <Route path="/products" element={<ProductListPage />} />

              {/* Route for creating a new product */}
              <Route path="/products/new" element={<ProductFormPage />} />

              {/* Route for editing an existing product. ':id' is a URL parameter */}
              <Route path="/products/edit/:id" element={<ProductFormPage />} />

              {/* Catch-all route for any undefined paths (404 Not Found) */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
