export function determineWeather(day) {
    const weatherTypes = [
        "Clear",
        "Cloudy",
        "Rain",
        "Storm",
        "Fog",
        "Windy"
    ];

    // deterministic "random"
    const seed = (day * 9301 + 49297) % 233280;
    const index = Math.floor((seed / 233280) * weatherTypes.length);

    return `Day ${day}: ${weatherTypes[index]}`;
}