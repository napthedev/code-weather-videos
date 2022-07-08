import { animations, cities } from "../shared/constants";
import { WeatherResponse } from "../shared/types";

export const getWeatherData = async () => {
  const response = (await Promise.all(
    cities.map(async (city) => {
      const data = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${process.env.API_KEY}&units=metric`
        )
      ).json();
      return data;
    })
  )) as WeatherResponse[];

  const parsed = response.map((city, index) => ({
    name: cities[index].name,
    max: Math.round(city.daily[0].temp.max),
    min: Math.round(city.daily[0].temp.min),
    animation: animations.find((animation) =>
      String(city.daily?.[0]?.weather?.[0]?.id).startsWith(animation.id)
    )?.content as object,
  }));

  return parsed;
};
