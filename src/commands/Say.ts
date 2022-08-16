import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { Command } from "../classes/Command";
import { Source } from "../classes/Source";
import { ArgumentParseType, CommandType } from "../utils/enums";

export default class Say extends Command<[string]> {
  constructor() {
    super({ 
      type: CommandType.Fun, 
      name: 'say', 
      description: '讓我代替你說一句話', 
      options: [{
        type: ApplicationCommandOptionType.String, 
        name: '訊息', 
        description: '要我代替你說的訊息', 
        required: true, 
        maxLength: 2000
      }], 
      argumentParseMethod: {
        type: ArgumentParseType.None
      }, 
      permissions: {
        bot: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel], 
        user: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
      }
    });
  }

  public async execute(source: Source, [content]: [string]): Promise<void> {
    await source.hide();
    await source.channel?.send({
      content: content,
      allowedMentions: {
        parse: ['users']
      }
    });
    await source.editReply('訊息已成功傳送');
  }
}