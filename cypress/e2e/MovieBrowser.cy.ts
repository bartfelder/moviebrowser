/// <reference types="cypress" />

import popularMovies from "../fixtures/popularMovies.json";
import searchMovies from "../fixtures/searchResults.json";
import relatedMovies from "../fixtures/relatedMovies.json";
import { hasOperationName } from "../utils/graphql-test-utils";

describe("MovieBrowser", () => {
  beforeEach(() => {
    cy.intercept("POST", "https://tmdb.sandbox.zoosh.ie/dev/grphql", (req) => {
      if (hasOperationName(req, "fetchPopular")) {
        req.alias = "gqlFetchPopular";
        req.reply((res) => {
          res.body = popularMovies;
        });
      }
    });
    cy.intercept("POST", "https://tmdb.sandbox.zoosh.ie/dev/grphql", (req) => {
      if (hasOperationName(req, "searchMovies")) {
        if (req.body.query.includes("similar")) {
          req.alias = "gqlRelatedMovies";
          req.reply((res) => {
            res.body = relatedMovies;
          });
        } else {
          req.alias = "gqlSearchMovies";
          req.reply((res) => {
            res.body = searchMovies;
          });
        }
      }
    });
    cy.intercept(
      {
        method: "GET",
        url: "https://en.wikipedia.org/w/*",
      },
      { fixture: "wikiResponse.json" }
    ).as("getWikiResponse");
    cy.intercept(
      {
        method: "GET",
        url: "http://www.omdbapi.com/*",
      },
      { fixture: "omdbResponse.json" }
    ).as("getOmdbResponse");
    cy.visit("/");
    cy.wait("@gqlFetchPopular");
  });
  describe("Home Page", () => {
    it("should display App title", () => {
      cy.get("h1").should("contain", "MovieBrowser");
    });
    it("should display search bar", () => {
      cy.get("input").invoke("attr", "placeholder").should("eq", "Search…");
    });
    it("should load popular movies", () => {
      cy.contains("Terrifier 2");
    });
  });
  describe("Search by keyword", () => {
    it("should search by keyword when hitting the Enter key", () => {
      cy.get("input").type("Batman{enter}");
      cy.wait("@gqlSearchMovies");
      cy.contains("The Batman [2022]");
    });
    it("should search by keyword when clicking on search button", () => {
      cy.get("input").type("Batman");
      cy.get("button").click();
      cy.wait("@gqlSearchMovies");
      cy.contains("The Batman [2022]");
    });
  });
  describe("Search by related", () => {
    it("should search by keyword when hitting the Enter key", () => {
      cy.get("input").type("related:The Batman{enter}");
      cy.wait("@gqlRelatedMovies");
      cy.contains("Black Rain");
    });
    it("should search by keyword when clicking on search button", () => {
      cy.get("input").type("related:The Batman");
      cy.get("button").click();
      cy.wait("@gqlRelatedMovies");
      cy.contains("Black Rain");
    });
  });
  describe("Details page", () => {
    beforeEach(() => {
      cy.get("input").type("Batman{enter}");
      cy.wait("@gqlSearchMovies");
      cy.contains("The Batman [2022]").click();
      cy.wait("@getWikiResponse");
      cy.wait("@getOmdbResponse");
    });
    it("should display details modal with title, snippet and buttons when clicking on a movie", () => {
      cy.get("h2").should("contain", "The Batman");
      cy.get("span").should(
        "contain",
        "The Batman is a 2022 American superhero film based on the DC Comics character Batman. Produced by DC Films, 6th & Idaho, and Dylan Clark Productions, and"
      );
      cy.contains("Wiki")
        .invoke("attr", "href")
        .should("eq", "https://en.wikipedia.org/?curid=47200019");
      cy.contains("Wiki").invoke("attr", "target").should("eq", "_blank");
      cy.contains("IMDB")
        .invoke("attr", "href")
        .should("eq", "https://www.imdb.com/title/tt1877830/");
      cy.contains("IMDB").invoke("attr", "target").should("eq", "_blank");
      cy.contains("Related Movies");
    });
    it("should search related when clicking on the related button", () => {
      cy.contains("Related Movies").click();
      cy.get("input").should("contain.value", "related:The Batman");
    });
  });
});
