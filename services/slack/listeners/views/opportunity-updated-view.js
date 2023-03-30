const { updateOpportunityDetails } = require('../../../capsule/capsule-client');

// Update CRM Opportuniry Details
const opportunityUpdatedCallback = async ({ ack, view, client, body }) => {
  try {
    await ack();
    const inputFieldValues = view.state.values;
    const newOppName = inputFieldValues.block_name.name.value;
    const oppId = body.view.external_id;
    try {
      await updateOpportunityDetails(oppId, newOppName, '');
      client.chat.postMessage({
        channel: body.user.id,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `<@${body.user.id}> updated opportunity details, <https://walkme.capsulecrm.com/opportunity/${oppId}|Open to View>`,
            },
          },
        ],
      });
    } catch (error) {
      client.chat.postMessage({
        channel: body.user.id,
        text: `<@${body.user.id}> ${error} :warning: :exclamation: Opportunity Update failed, retry after sometime!`,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { opportunityUpdatedCallback };
