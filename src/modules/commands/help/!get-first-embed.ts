import { ICallbackObject } from 'wokcommands';
import Discord from 'discord.js';
import msg from './../../messages';

export default function getFirstEmbed(options: ICallbackObject) {
  const {
    commandHandler: { commands }
  } = options.instance;

  const embed = msg.help.baseEmbed();

  const categories: {
    [key: string]: {
      amount: number;
      emoji: string;
    };
  } = {};

  const isAdmin = options.member && options.member.permissions.has('ADMINISTRATOR');

  for (const { category, testOnly } of commands) {
    if (
      !category ||
      (testOnly && options.guild && !options.instance.testServers.includes(options.guild.id)) ||
      (!isAdmin && options.instance.hiddenCategories.includes(category))
    ) {
      continue;
    }

    if (categories[category]) {
      ++categories[category].amount;
    } else {
      categories[category] = {
        amount: 1,
        emoji: options.instance.getEmoji(category)
      };
    }
  }

  const buttons = new Discord.MessageActionRow();

  const keys = Object.keys(categories);
  let buttonLabel;
  keys.forEach(key => {
    const category = categories[key];
    if (category.emoji) {
      console.warn(`WOKCommands > Category "${key}" does not have an emoji icon.`);
      buttonLabel = `${category.emoji} ${key}`;
    } else {
      buttonLabel = key;
    }

    if (options.instance.commandHandler.getCommandsByCategory(key, true).length === 0) return; //TODO TEST === category.amount

    buttons.addComponents(
      new Discord.MessageButton().setCustomId(key).setLabel(buttonLabel).setStyle('PRIMARY')
    );

    embed.setDescription(
      embed.description +
        `\n\n**${category.emoji} ${key}** - ${category.amount} command${
          category.amount === 1 ? '' : 's'
        }`
    );
  });

  return {
    embed,
    buttons
  };
}
