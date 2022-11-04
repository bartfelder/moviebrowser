import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import App from "./App";
import { Provider } from "urql";
import graphQLClient from "./requestHandlers/graphQL/graphQLClient";
import restApiClient from "./requestHandlers/restApi/restApiClient";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider value={graphQLClient}>
      <QueryClientProvider client={restApiClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
