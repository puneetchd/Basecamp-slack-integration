const { listOpportunitiesCallback } = require('./list-opportunities');

module.exports.register = (app) => {
  app.command('/capsule-list-optys', listOpportunitiesCallback);
};
