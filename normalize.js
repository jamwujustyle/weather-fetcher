const normalize = (turn, response) => {
  if (turn === 0) {
    const {
      location: { name },
      current: {
        temp_c,
        condition: { text },
        wind_kph,
        humidity,
      },
    } = response.data;
    console.log(`From api${turn + 1}: `);
    console.log(
      `Temperature in ${name} is ${temp_c.toFixed(
        1
      )}°C condition: ${text}, wind: ${wind_kph}KPH and humidity is ${humidity}%`
    );
    console.log(
      `___________________________________________________________________________________________`
    );
    return { temp: temp_c };
  } else {
    const {
      name,
      main: { temp, humidity },
      weather: [{ description }],
      wind: { speed },
    } = response.data;

    const toCelsius = (temp - 273.15).toFixed(1);
    const windKph = (speed * 3.6).toFixed(1);

    console.log(`From api${turn + 1}: `);
    console.log(
      `Temperature in ${name} is ${toCelsius}°C, condition: ${description}, wind: ${windKph} KPH, humidity: ${humidity}%`
    );
    console.log(
      `___________________________________________________________________________________________`
    );
    return { temp: parseFloat(toCelsius) };
  }
};

module.exports = normalize;
