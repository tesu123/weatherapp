export default async function handler(req, res) {
    const { location } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!location) {
        return res.status(400).json({ error: "Location is required" });
    }

    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Location not found");
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
