import { RunFunction } from '../../interfaces/Command';

import NSFW from 'discord-nsfw'
const nsfw = new NSFW();

export const name = 'pgid'
export const category = 'nsfw'
export const description = 'NSFW Porn Gid'
export const aliases = ["porngif"]

export const run: RunFunction = async (client, message, args) => {
    message.channel.send(await nsfw.pgif())
}