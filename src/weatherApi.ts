
export async function fetchWeatherData(city: string): Promise<any> {
  try {
    
    const apiUrl = 'db.json';//Instead of thiswe can  use OpenWeatherapi

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.weather; 
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}
