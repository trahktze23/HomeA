import config from '@/config';

const wsUrl = new WebSocket(config.wsUrl);

export default {
  wsUrl,
};
