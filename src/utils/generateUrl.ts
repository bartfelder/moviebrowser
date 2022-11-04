export const generateWikiUrl = (pageId: number): string =>
  `https://en.wikipedia.org/?curid=${pageId}`;

export const generateWikiSearchUrl = (searchTerm: string): string =>
  `https://en.wikipedia.org/w/index.php?go=Go&search=${searchTerm}`;

export const generateImdbUrl = (pageId: string): string =>
  `https://www.imdb.com/title/${pageId}/`;

export const generateWikiQuery = (searchTerm: string): string =>
  `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&formatversion=2&srsearch=${searchTerm}`;

export const generateOmdbQuery = (searchTerm: string, year: number): string =>
  `http://www.omdbapi.com/?t=${searchTerm}&y=${year}&apikey=${
    import.meta.env.VITE_OMDB_API_KEY
  }`;
