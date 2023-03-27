const { listAllOpportunities } = require('../../../capsule/capsule-client');
const { opportunityView } = require('../views/opportunity-view');

const listOpportunitiesCallback = async ({ ack, body, client }) => {
  try {
    await ack();
    const opportunities = await listAllOpportunities();
    const view = opportunityView(body.channel_id, opportunities);
    await client.chat.postMessage(view);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { listOpportunitiesCallback };
