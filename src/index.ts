
import { fetchWeatherData } from './weatherApi';

const form = document.getElementById('weatherForm') as HTMLFormElement;
const resultDiv = document.getElementById('result') as HTMLDivElement;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const cityInput = document.getElementById('cityInput') as HTMLInputElement;
    const cityName = cityInput.value;

    // Handle button clicks
    const findRainyDayButton = document.getElementById('findRainyDay') as HTMLButtonElement;
    const weatherDetailsButton = document.getElementById('weatherDetails') as HTMLButtonElement;

    findRainyDayButton.addEventListener('click', async () => {
        try {
            const data = await fetchWeatherData(cityName);
            const maxRainDay = findMaxRainyDay(data);
            displayResult(`Maximum Rainful Day: ${maxRainDay.date} (${maxRainDay.day})`);
        } catch (error) {
            displayResult('Error fetching data. Please try again.');
        }
    });

    weatherDetailsButton.addEventListener('click', async () => {
        try {
            const data = await fetchWeatherData(cityName);
            displayResult('Weather Details:'); // Display details as needed
        } catch (error) {
            displayResult('Error fetching data. Please try again.');
        }
    });
});

function findMaxRainyDay(weatherList: any[]): { date: string; day: string } {
    let maxRain = 0;
    let maxRainDay = '';

    weatherList.forEach((day) => {
        if (day.rain && day.rain['1h'] > maxRain) {
            maxRain = day.rain['1h'];
            maxRainDay = day.dt_txt;
        }
    });

    const date = new Date(maxRainDay);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    const day = new Intl.DateTimeFormat('en-US', options).format(date);

    return { date: maxRainDay, day };
}

function displayResult(result: string): void {
    resultDiv.innerText = result;
}
