const API_KEY = '9a91365717424d89bf1f783f2645745f';
const BASE_URL = 'https://newsapi.org/v2';

// Define cybersecurity-related keywords
const CYBER_KEYWORDS = [
  'cybersecurity',
  'cyber security',
  'cyber attack',
  'cyber threat',
  'malware',
  'ransomware',
  'data breach',
  'hacking',
  'cyber crime',
  'information security',
  'network security',
  'cyber defense',
  'vulnerability',
  'cyber warfare',
  'cyber espionage',
  'phishing',
  'data protection',
  'cyber risk',
  'cyber incident',
  'cyber safety'
];

// Create a query string from keywords joined with OR operator
const QUERY_STRING = CYBER_KEYWORDS.map(keyword => `"${keyword}"`).join(' OR ');

export const fetchCyberSecurityNews = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(QUERY_STRING)}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`
    );
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to fetch news');
    }
    
    // Additional filter to ensure articles are truly relevant
    const filteredArticles = data.articles.filter(article => {
      const title = article.title.toLowerCase();
      const description = article.description ? article.description.toLowerCase() : '';
      
      // Check if any of the keywords appear in the title or description
      return CYBER_KEYWORDS.some(keyword => 
        title.includes(keyword.toLowerCase()) || 
        description.includes(keyword.toLowerCase())
      );
    });
    
    return filteredArticles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
