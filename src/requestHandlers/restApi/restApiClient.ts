import { QueryClient } from "react-query";

export const restQueryClient = new QueryClient();

export default restQueryClient;

// curl 'https://v3.sg.media-imdb.com/suggestion/x/batman.json?includeVideos=1'   -H 'authority: v3.sg.media-imdb.com'   -H 'accept: application/json, text/plain, */*'   -H 'accept-language: hu-HU,hu;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6'   -H 'origin: https://www.imdb.com'   -H 'referer: https://www.imdb.com/'   -H 'sec-ch-ua: "Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"'   -H 'sec-ch-ua-mobile: ?0'   -H 'sec-ch-ua-platform: "Windows"'   -H 'sec-fetch-dest: empty'   -H 'sec-fetch-mode: cors'   -H 'sec-fetch-site: cross-site'   -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safafari/537.36'   --compressed
