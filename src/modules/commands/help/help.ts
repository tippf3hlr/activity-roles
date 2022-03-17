// modified code from wokcommmands package

import { MessageEmbed } from 'discord.js';
import { ICallbackObject, ICommand } from 'wokcommands';
import msg from '../../messages';
import getFirstEmbed from './!get-first-embed';
import ReactionListener from './!ReactionListener';
import Discord from 'discord.js';

/**
 * Sends the main help menu to the user.
 * @param {ICallbackObject} options - The callback object containing the interaction and the channel.
 * @returns None
 */
function sendMainMenu(options: ICallbackObject) {
  const { embed, buttons } = getFirstEmbed(options);
  options.interaction.reply({ embeds: [embed], components: [buttons] }); // send first embed and buttons

  const filter = (btnInt: Discord.MessageComponentInteraction<'cached'>) => {
    // setup collector to listen to button interactions
    return options.interaction.user.id === btnInt.user.id;
  };
  const collector = options.channel.createMessageComponentCollector({
    filter,
    max: 1,
    time: 1000 * 60 * 2
  });
  collector.on('collect', (int: Discord.ButtonInteraction) => {
    if (int.customId === 'back') {
      sendMainMenu(options);
      return;
    }
    const { length } = getCommands(int.customId, options);

    let [page, maxPages] = getMaxPages(length);
  });
}

function getCommands(btnID: string, options: ICallbackObject) {
  let category = options.instance.getCategory(btnID);

  if (this.embed.description) {
    const split = this.embed.description.split('\n');
    const cmdStr = ' ' + msg.help.commands();
    if (split[0].endsWith(cmdStr)) {
      category = split[0].replace(cmdStr, '');
    }
  }

  const commands = options.instance.commandHandler.getCommandsByCategory(category);

  return {
    length: commands.length,
    commands,
    commandsString,
    category
  };
}

export default {
  description: "Displays this bot's commands",
  category: 'Help',

  aliases: 'commands',
  slash: true,
  testOnly: false,

  maxArgs: 1,
  expectedArgs: '[command]',

  // init: (client: Client, instance: WOKCommands) => {
  //   client.on('messageReactionAdd', async (reaction, user) => {
  //     new ReactionListener(instance, reaction, user);
  //   });
  // },
  callback: (options: ICallbackObject) => {
    const { guild, instance, args } = options;

    if (guild && !guild.me?.permissions.has('SEND_MESSAGES')) {
      msg.log.noSendMsgPerm(guild.name);
      return;
    }

    // Typical "/help" syntax for the menu
    if (args.length === 0) {
      sendMainMenu(options);
    }

    // If the user is looking for info on a specific command
    // Ex: "/help prefix"
    const arg = args.shift()?.toLowerCase();

    const command = instance.commandHandler.getICommand(arg);
    if (!options) {
      return instance.messageHandler.get(guild, 'UNKNOWN_COMMAND', {
        COMMAND: arg
      });
    }

    const description = ReactionListener.getHelp(command, instance, guild);
    const embed = new MessageEmbed()
      .setTitle(
        `${instance.displayName} ${instance.messageHandler.getEmbed(
          guild,
          'HELP_MENU',
          'TITLE'
        )} - ${arg}`
      )
      .setDescription(description);

    if (instance.color) {
      embed.setColor(instance.color);
    }

    return embed;
  }
} as ICommand;
