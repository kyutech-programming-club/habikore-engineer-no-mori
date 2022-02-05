const axios = require('axios');

module.exports = async function (context, req) {
    const githubId = req.query.githubId;
    contribution = await axios
    .get('https://github-contributions-api.deno.dev/' + githubId + '.json')
    .then(response => {
        console.dir('response body:', response.data);
        return response.data
    })
    .catch(err => {
        console.log('err:', err);
    });

    context.res = {
        status: 200,
        body: contribution,
    };
}
