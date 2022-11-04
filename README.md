# MovieBrowser

MovieBrowser is using the TMDB GraphQL API to search for movies and display basic information about them, while for the movie details, it uses the wikipedia API and OMDB to get the IMDB link to the movie.

## Installation

After cloning the repository there are a few steps to get the page working in a local environment:
1. npm install
2. set your OMDB API key in the .env file, or create an .env.local file to override the original .env file. You can register for a free API key here:  http://www.omdbapi.com/
3. npm run dev

## Usage

When there is no search word set, there is a list of popular movies by default. You can search by either hitting the Enter key or click on the search Icon next to the input field.
There is also a special syntax to search for related movies, just type 'related:' followed by the movie title. Related search can also be achieved by clicking the Related Movies button on a movie's detail page.
