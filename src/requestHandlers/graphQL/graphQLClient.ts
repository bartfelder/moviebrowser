import { createClient } from "urql";

const graphQLClient = createClient({
  url: "https://tmdb.sandbox.zoosh.ie/dev/grphql",
});

export default graphQLClient;
