export const CHANNEL_BADGE_URL = {
  whatsapp: 'https://omnichannel.qiscus.com/img/whatsapp_badge.svg',
  instagram: 'https://omnichannel.qiscus.com/img/instagram_badge.svg',
  tiktok: 'https://omnichannel.qiscus.com/img/tiktok_badge.svg',
  facebook: 'https://omnichannel.qiscus.com/img/messenger_badge.svg',
  line: 'https://omnichannel.qiscus.com/img/line_badge.svg',
  telegram: 'https://omnichannel.qiscus.com/img/telegram_badge.svg',
  qiscus: 'https://omnichannel.qiscus.com/img/qiscus_badge.svg',
  custom: 'https://omnichannel.qiscus.com/img/custom.svg',
  bot: 'https://omnichannel.qiscus.com/img/bot_badge.svg',
};

export const CHANNEL_TABS = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'business_messaging',
    label: 'Business Messaging',
  },
  {
    id: 'live_chat',
    label: 'Live Chat',
  },
  {
    id: 'other',
    label: 'Other',
  },
];

export const CHANNEL_LIST = [
  {
    type: 'whatsapp',
    name: 'WhatsApp',
    group: 'business_messaging',
    icon: CHANNEL_BADGE_URL.whatsapp,
    status: '',
    description:
      'Send personalized replies or broadcast messages to hundreds of customers in just a few clicks using WhatsApp.',
  },
  {
    type: 'instagram',
    name: 'Instagram',
    group: 'business_messaging',
    icon: CHANNEL_BADGE_URL.instagram,
    status: '',
    description:
      'Easily manage Instagram DMs and story replies from your omnichannel inbox, without opening app.',
  },
  {
    type: 'tiktok',
    name: 'Tiktok',
    group: 'business_messaging',
    icon: CHANNEL_BADGE_URL.tiktok,
    status: '',
    description:
      'Connect your TikTok business account to easily reply to DMs from your omnichannel inbox.',
  },
  {
    type: 'facebook',
    name: 'Facebook',
    group: 'business_messaging',
    icon: CHANNEL_BADGE_URL.facebook,
    status: '',
    description:
      'Manage all your Facebook Page messages efficiently, right from your omnichannel inbox.',
  },
  {
    type: 'line-channel',
    name: 'LINE',
    group: 'business_messaging',
    icon: CHANNEL_BADGE_URL.line,
    status: '',
    description: 'Connect your LINE Account to manage chats easily from your omnichannel inbox.',
  },
  {
    type: 'telegram-channel',
    name: 'Telegram',
    group: 'business_messaging',
    icon: CHANNEL_BADGE_URL.telegram,
    status: '',
    description:
      'Connect your Telegram account and easily manage all conversations from your omnichannel inbox.',
  },
  {
    type: 'qiscus',
    name: 'Qiscus Live Chat',
    group: 'live_chat',
    icon: CHANNEL_BADGE_URL.qiscus,
    status: '',
    description:
      'Engage customers in real time through a customizable and visually appealing Qiscus Live Chat on your website.',
  },
  {
    type: 'custom-channel',
    name: 'Custom Channel',
    group: 'other',
    icon: CHANNEL_BADGE_URL.custom,
    status: '',
    description:
      'Build a custom channel that fits your needs—like Tokopedia, Shopee, Email, and more.',
  },
  {
    type: 'bot-integration',
    name: 'Bot Integration',
    group: 'other',
    icon: CHANNEL_BADGE_URL.bot,
    status: '',
    description:
      'Enable and manage bots to assist with customer inquiries across all your connected channel.',
  },
] as const;

// For channel list card
export const DEFAULT_CHANNEL_ENABLED = true;
