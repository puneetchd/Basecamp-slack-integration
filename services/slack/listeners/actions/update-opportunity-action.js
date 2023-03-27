const updateOpportunity = require('../views/update-opportunity-view');

const updateOpportunityCallback = async ({ ack, client, body }) => {
  try {
    await ack();
    const { trigger_id, actions } = body;
    const { value } = actions[0];
    const { name, expectedCloseOn, id } = JSON.parse(value);

    const updateOpportunityView = updateOpportunity({
      oppId: id,
      opportunityName: name,
      opportunityDate: expectedCloseOn,
    });
    await client.views.open({
      trigger_id,
      view: updateOpportunityView,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { updateOpportunityCallback };
