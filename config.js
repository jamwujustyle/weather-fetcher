const apiKeys = {
  key1: "b85ee4be00f24563b96125616242210",
  key2: "4c4f3b303b374761b30efcb990942734",
};
const apiUrls = {
  url1: `https://api.weatherapi.com/v1/current.json?key=${apiKeys.key1}&q=Tashkent`,
  url2: `https://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=${apiKeys.key2}`,
};

module.exports = { apiUrls };
