const API_KEY = '9a91365717424d89bf1f783f2645745f';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchCyberSecurityNews = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=cybersecurity&sortBy=publishedAt&language=en&apiKey=${API_KEY}`
    );
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to fetch news');
    }
    
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
