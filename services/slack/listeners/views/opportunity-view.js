const { Message, Blocks, Elements } = require('slack-block-builder');

// Block Kit view to display Opportunity Details
const opportunityView = (channel, opportunityDetails) => {
  const { id,
    name,
    description,
    expectedCloseOn,
    milestone,
    value,
    owner,
    updatedAt,
  } = opportunityDetails.opportunities[0];

  return Message({ channel, text: 'Opportunities' })
    .blocks(
      Blocks.Header({
        text: 'Your assigned Opportunities',
      }),
      Blocks.Section({
        text: `<https://walkme.capsulecrm.com/opportunity/${id}|${name} >`,
      }),
      Blocks.Section({
        text: `*Owner* ${owner.name}`,
      }),
      Blocks.Section({
        text: `💰 *Opportunity Value* ${value.currency} ${value.amount}`,
      }),
      Blocks.Section({
        text: `📈 *Stage* ${milestone.name}`,
      }),
      Blocks.Section({
        text: `🗒 *Description* ${description}`,
      }),
      Blocks.Section({
        text: `🏭 *Close Date* ${expectedCloseOn}`,
      }),
      Blocks.Section({
        text: `📝 Last Updated ${new Date(updatedAt).toGMTString()}`,
      }).accessory(
        Elements.Button({
          text: 'Update Opportunity',
        }).actionId('update-details')
          .value(
            JSON.stringify({
              id,
              name,
              description,
              expectedCloseOn,
            }),
          ),
      ),
    )
    .asUser()
    .buildToObject();
};
module.exports = { opportunityView };
