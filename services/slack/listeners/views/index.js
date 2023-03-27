const { opportunityUpdatedCallback } = require('./opportunity-updated-view');

module.exports.register = (app) => {
  app.view('opportunity_updated_view', opportunityUpdatedCallback);
};
