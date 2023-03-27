const { updateOpportunityCallback } = require('./update-opportunity-action');

module.exports.register = (app) => {
  app.action('update-details', updateOpportunityCallback);
};
