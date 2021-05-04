require("dotenv").config();

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const weather = require('weather-js');
const moment = require("moment");

module.exports = class WeatherCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "weather",
            aliases: [],
            group: "search",
            memberName: "weather",
            description:
                "Search the Weather from anywhere and check the weather",
            details: oneLine`
                Search the Weather from anywhere and check the weather
            `,
            examples: ["!weather <location>"],
            credit: [
                {
                    name: "OpenWeatherMap",
                    url: "https://openweathermap.org/",
                    reason: "API",
                    reasonURL: "https://openweathermap.org/api",
                },
            ],
            args: [
                {
                    key: "location",
                    prompt:
                        "What location would you like to get the weather of?",
                    type: "string",
                    parse: (location) => {
                        if (/^[0-9]+$/.test(location))
                            return { type: "zip", data: location };
                        return { type: "q", data: location };
                    },
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        try {
            const args = message.content.split(" ").slice(1)

            weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {
                if (err) throw err

                console.log(result[0])

                const embed = new Discord.MessageEmbed()
                    .setAuthor(
                        `${result[0].location.name}`,
                        "https://media.discordapp.net/attachments/793772583946027050/823774180305534986/image-removebg-preview_8.png"
                    )
                    .setTimestamp()
                    .addFields(
                        { name: "Temperature", value: `${result[0].current.temperature} C°`, inline: true },
                        { name: "Observation Time", value: result[0].current.observationtime, inline: true },
                        { name: "Observation Point", value: result[0].current.observationpoint, inline: true },
                        { name: "Feels Like", value: `${result[0].current.feelslike} C°`, inline: true },
                        { name: "Humidity", value: `${result[0].current.humidity} C°`, inline: true },
                        { name: "Wind Display", value: result[0].current.winddisplay, inline: true },
                        { name: "Day", value: result[0].current.day, inline: true },
                        { name: "WindSpeed", value: result[0].current.windspeed, inline: true },
                        { name: "TimeZone", value: result[0].location.timezone, inline: true },
                        { name: "Location", value: `${result[0].location.lat}, ${result[0].location.long}`, inline: true },
                    )
                    .setColor("#037ffc");

                message.channel.send(embed);
            });
        } catch (err) {
            console.error(err);
        }
    }
};
