import { MessageEmbed } from 'discord.js';
import Command from '../../typings/command';

const UnmuteCommand: Command = {
    name: 'unmute',
    description: 'Unmute someone with this command',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!message.member?.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(
                "**You need `MANAGE_MESSAGES` permission to use this command**"
            );

        const Member = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])

        if (!Member) return message.channel.send('**Please enter a valid user**')

        const role = message.guild?.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        // @ts-ignore
        await Member.roles.remove(role)

        const unmuteEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle(`Unmuted from ${message.guild?.name}`)
            .setDescription(`**${message.author} Has unmuted you from ${message.guild?.name}**`)
            .setColor("#41d16a")
            .setFooter(client.user?.username, client.user?.displayAvatarURL())

        Member?.send({ embeds: [unmuteEmbed] }).catch((err) => { message.channel.send("**Message wasn't sent to this user because this user has his DM's disabled.**") })

        message.channel.send(`**${Member} was sucessfully unmuted**`)
    },
}

export default UnmuteCommand;