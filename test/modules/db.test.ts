import Discord from 'discord.js';
import * as db from '../../src/modules/db';
import mongoose from 'mongoose';
import msg from '../../src/modules/messages';
import Mock from '../discordjsmock';
// import mockingoose from 'mockingoose';

jest.mock('discord.js');
const DiscordMock = jest.mocked(Discord, true);
jest.mock('mongoose');
const mongooseMock = jest.mocked(mongoose, true);
jest.mock('../../src/modules/messages');
const msgMock = jest.mocked(msg, true);

describe('testing src/modules/db.ts', () => {
  test('connect()', async () => {
    mongooseMock.connect.mockResolvedValue(undefined as unknown as typeof mongoose);
    await db.connect('mongodb://localhost:27017/test');
    expect(mongooseMock.connect).toHaveBeenCalledWith('mongodb://localhost:27017/test');
    expect(mongooseMock.connect).toHaveBeenCalledTimes(1);
    expect(msgMock.log.mongodbConnect).toHaveBeenCalledTimes(1);
  });
  /* mockingoose doesn't seem to be working as they recently upgraded to typescript
  test('checkGuild()', async () => {
    // Guild is already in DB
    mockingoose(GuildConfig).toReturn(true, 'findOne');
    const channel = { id: '123', send: jest.fn() } as unknown as Discord.TextChannel;
    const guild = {
      id: '123',
      name: 'test',
      channels: {
        create: jest.fn().mockResolvedValue(channel)
      }
    } as unknown as Discord.Guild;

    await db.checkGuild(guild);

    expect(msg.log.activity).toHaveBeenCalledTimes(1);
    expect(msg.log.addGuild).toHaveBeenCalledTimes(0);
    expect(channel.send).toHaveBeenCalledTimes(0);
    expect(guild.channels.create).toHaveBeenCalledTimes(0);

    // Guild is not in DB
    // jest.spyOn(GuildConfig, 'findById').mockResolvedValue(undefined);
    // mockingoose(GuildConfig).toReturn(undefined, 'findById');
    // jest.spyOn(GuildConfig, 'constructor').mockResolvedValue(undefined);
    // mockingoose(GuildConfig).toReturn(undefined, 'save');

    await db.checkGuild(guild);

    expect(msg.log.activity).toHaveBeenCalledTimes(1);
    expect(msg.log.addGuild).toHaveBeenCalledTimes(1);
    expect(msg.log.addGuild).toHaveBeenCalledWith(guild.name, guild.id);
    expect(channel.send).toHaveBeenCalledTimes(1);
    expect(guild.channels.create).toHaveBeenCalledTimes(1);
  });
  */
  test('checkRoles()', async () => {
    const client = new Discord.Client({
      intents: []
    });
    const guild = new Mock.Guild(client);
    const user = new Mock.User(client);
    const member = new Mock.Member(client, guild, user);
    const doc = {
      _id: '00000000000000000',
      logChannelID: '000000000000000000',
      createdAt: '0000-00-0000000:00.000+00:00',
      updatedAt: '0000-00-0000000:00.000+00:00',
      __v: 0
    } as db.GuildConfigType;
  });
});
