import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { ApolloProvider } from "@apollo/client";
import { GraphQlClient } from "./graphql/client.ts";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={GraphQlClient}>
    <App />
  </ApolloProvider>
);
