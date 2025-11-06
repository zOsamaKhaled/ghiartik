import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { HeroUIProviderr } from "./provider.tsx";
import { ToastProvider } from "@heroui/react";
import "@/styles/globals.css";

import { store } from "./app/store.tsx";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HeroUIProviderr>
          <ToastProvider />
          <App />
        </HeroUIProviderr>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
