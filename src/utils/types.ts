export interface MovieData {
  id: string;
  name: string;
  releaseDate: string;
  genres: { name: string }[];
  score: number;
}

export interface MovieDetails extends MovieData {
  imgUrl: string,
  summary: string,
  imdbLink: string,
  wikiLink: string,
}

interface WikiSearchResult {
    "ns": number,
    "title": string,
    "pageid": number,
    "size": number,
    "wordcount": number,
    "snippet": string,
    "timestamp": Date
}

export interface WikiQueryResult {
    "batchcomplete": boolean,
    "continue": {
        "sroffset": number,
        "continue": string
    },
    "query": {
        "searchinfo": {
            "totalhits": number
        },
        "search": WikiSearchResult[]
    }
}

export interface OmdbQueryResult {
    imdbID: string,
}