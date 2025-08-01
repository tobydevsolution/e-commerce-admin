import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { ProductProvider } from "./context/ProductContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductProvider>
      <NotificationProvider>
        <OrderProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </OrderProvider>
      </NotificationProvider>
    </ProductProvider>
  </StrictMode>
);
