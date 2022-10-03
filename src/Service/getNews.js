import axios from 'axios';

export function getNews(category = 'General') {
  const API_KEY = `1b38165de5884318a553d4cd83f98ee6`;
  const API_Endpoint = `https://newsapi.org/v2/top-headlines?country=us&category=${category}`

  return axios.get(`${API_Endpoint}&apiKey=${API_KEY}`);
  
}
