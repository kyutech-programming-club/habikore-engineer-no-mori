const axios = require('axios');

module.exports = async function (context, req) {
    const githubId = req.query.githubId;
    allPoint = await axios
    .get('https://github-contributions-api.deno.dev/' + githubId + '.json')
    .then(response => {
        console.dir('response body:', response.data);
        return response.data
    })
    .catch(err => {
        console.log('err:', err);
    });

    allPoint1d = allPoint.reduce( (newArr, elem) => {
        return newArr.concat(elem)
      }, [])

    var date = new Date();
    console.log(allPoint1d);

    let point = 0
    for(let i=364-date.getDate(); i < 364; i++){
        point += allPoint1d[i].contributionCount;
    }
    console.log(point)

    context.res = {
        status: 200,
        body: point,
    };
}
