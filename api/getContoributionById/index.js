const axios = require('axios');

module.exports = async function (context, req) {
    const githubId = req.query.githubId;
    let res = await axios
    .get('https://github-contributions-api.deno.dev/' + githubId + '.json')
    .then(response => {
        console.log('response body:', response.data);
        return response.data
    })
    .catch(err => {
        console.log('err:', err);
    });

    let flatRes = res.contributions.flat(1);

    const today =  new Date();
    let targetDays = flatRes.slice(-today.getDate(), -1);
    console.log(targetDays);

    let point = 0;
    let state = 0;
    for (let day of targetDays) {
        point += day.contributionCount;
        if (day.contributionCount) {
            state ++;
        }
    }

    context.res = {
        status: 200,
        body: {
            "point": point,
            "state": state,
        },
    };
}
