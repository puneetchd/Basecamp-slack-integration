const { listAllOpportunities } = require('../../../capsule/capsule-client');
const { opportunityView } = require('../views/opportunity-view');

// View Opportunity Details
const listOpportunitiesCallback = async ({ ack, body, client }) => {
  const channelId = body.channel_id;
  try {
    await ack();
    const opportunities = await listAllOpportunities();
    const view = opportunityView(channelId, opportunities);
    await client.chat.postMessage(view);
  } catch (error) {
    console.error(error);
    await client.chat.postMessage({
      channel: channelId,
      text: 'We have encountered technical issue, please try again.',
    });
  }
};

module.exports = { listOpportunitiesCallback };
