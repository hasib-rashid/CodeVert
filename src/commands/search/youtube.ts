import Command from '../../typings/command';
import { default as axios } from 'axios'
import { MessageEmbed } from 'discord.js'

const YoutubeCommand: Command = {
    name: 'youtube',
    description: 'Watch Youtube in Discord',
    aliases: [],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios
            .get("https://youtube-v31.p.rapidapi.com/search", {
                method: "GET",
                params: {
                    q: args.join(" "),
                    part: "snippet,id",
                    maxResults: "7",
                    order: "date",
                },
                headers: {
                    "x-rapidapi-key": process.env.RAPID_API_KEY,
                    "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
                },
            })
            .then(function (response) {
                const embed = new MessageEmbed()
                    .setAuthor(
                        "Youtube",
                        "https://www.freepnglogos.com/uploads/youtube-logo-icon-transparent---32.png"
                    )
                    .setColor("#fa2f44");
                for (var i = 0; i < response.data.items.length; ++i) {
                    var result = response.data.items[i];

                    embed.addField(
                        `**${result.snippet.channelTitle}** - ${result.snippet.title}`,
                        `[Link](https://youtube.com/watch?v=${result.id.videoId}), [Channel Link](https://youtube.com/channel/${result.snippet.channelId}) - ${result.snippet.description}`
                    );
                }

                message.channel.send(embed);
            })
            .catch(function (error) {
                console.error(error);
            });
    },
}

export default YoutubeCommand;
