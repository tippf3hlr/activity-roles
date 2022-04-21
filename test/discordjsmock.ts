import Discord from 'discord.js';

//@ts-ignore
class Guild extends Discord.Guild {
  constructor(client: Discord.Client) {
    super(client, {
      name: '',
      id: Discord.SnowflakeUtil.generate(),
      icon: null,
      splash: null,
      owner_id: '',
      discovery_splash: null,
      region: '',
      afk_channel_id: null,
      afk_timeout: 0,
      verification_level: 0,
      default_message_notifications: 0,
      explicit_content_filter: 0,
      roles: [],
      emojis: [],
      features: [],
      mfa_level: 0,
      application_id: null,
      system_channel_id: null,
      system_channel_flags: 0,
      rules_channel_id: null,
      vanity_url_code: null,
      description: null,
      banner: null,
      premium_tier: 0,
      preferred_locale: 'en-US',
      public_updates_channel_id: null,
      nsfw_level: 0,
      stickers: [],
      premium_progress_bar_enabled: false
    });
    this.client.guilds.cache.set(this.id, this);
  }
}

class User extends Discord.User {
  constructor(client: Discord.Client) {
    super(client, {
      id: Discord.SnowflakeUtil.generate(),
      username: '',
      discriminator: '',
      avatar: null,
      bot: false,
      system: false,
      mfa_enabled: false,
      banner: null,
      accent_color: null,
      locale: 'en-US',
      verified: false,
      email: null,
      flags: 0,
      premium_type: 0,
      public_flags: 0
    });
    this.client.users.cache.set(this.id, this);
  }
}

//@ts-ignore
class Member extends Discord.GuildMember {
  constructor(client: Discord.Client, guild: Guild, user: User) {
    super(
      client,
      {
        user: user,
        nick: null,
        avatar: null,
        roles: [],
        joined_at: '',
        premium_since: null,
        deaf: false,
        mute: false,
        pending: false,
        communication_disabled_until: null
      },
      guild
    );
  }
}

export default {
  Guild,
  User,
  Member
};
