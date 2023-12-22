// weatherApi.ts
export async function fetchWeatherData(city: string): Promise<any> {
  try {
    // Assuming that db.json is in the root directory of your project
    const apiUrl = ' http://localhost:3000/weather';

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.weather; // Adjust to match the structure of your mock data
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}
