const { App, LogLevel } = require('@slack/bolt');
const { config } = require('dotenv');
const { registerListeners } = require('./services/slack/listeners');

config({ path: './.env.sample' });

// Setup custom routes
const routes = [
  {
    path: '/health-check',
    method: ['GET'],
    handler: (req, res) => {
      res.writeHead(200);
      res.end('Health check information displayed here!');
    },
  },
];

/** Initialization */
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
  customRoutes: routes,
});

/** Register Listeners */
registerListeners(app);

/** Start Bolt App */
(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running! ⚡️');
  } catch (error) {
    console.error('Unable to start App', error);
  }
})();

app.event('app_home_opened', ({ event, say }) => {
  say(`Hey <@${event.user}>!, welcome to application.`);
});
