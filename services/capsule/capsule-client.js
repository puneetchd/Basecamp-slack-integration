const axios = require('axios');

const listAllOpportunities = async () => {
  const responseData = await axios.get(
    'https://api.capsulecrm.com/api/v2/opportunities',
    {
      headers: {
        Authorization: `Bearer ${process.env.CAPSULE_API_KEY}`,
      },
    },
  );
  return responseData.data;
};

const updateOpportunityDetails = async (id, opportunityName) => {
  const params = { opportunity: {
    name: opportunityName,
  },
  };
  const response = await axios.put(
    `https://api.capsulecrm.com/api/v2/opportunities/${id}`,
    params,
    {
      headers: {
        Authorization: `Bearer ${process.env.CAPSULE_API_KEY}`,
      },
    },
  );
  return response.data;
};

module.exports = { listAllOpportunities, updateOpportunityDetails };
