const { Blocks, Elements, Modal } = require('slack-block-builder');

// Block Kit Modal view to Update Opportunity Details
const updateOpportunity = ({ oppId, opportunityName, opportunityDate }) => {
  const textArea = (name) => Elements.TextInput({
    actionId: 'name',
    placeholder: 'Enter New Opportunity Name',
    initialValue: name,
    multiline: true,
  });

  const datePicker = Elements.DatePicker({
    actionId: 'action_date',
    initialDate: new Date(opportunityDate),
    placeholder: 'Oppotunity Close Date',
  });

  return Modal({
    title: 'Opportunity Details',
    submit: 'Submit',
    close: 'Cancel',
    callbackId: 'opportunity_updated_view',
    externalId: oppId.toString(),
  })
    .blocks(
      Blocks.Input({
        label: 'Name',
        element: textArea(opportunityName),
        blockId: 'block_name',
      }),
      Blocks.Input({
        label: 'Oppotunity Close Date',
        element: datePicker,
        blockId: 'block_date',
      }),
    ).buildToObject();
};

module.exports = updateOpportunity;
