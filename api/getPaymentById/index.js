module.exports = async function (context, req, user) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // const name = (req.query.name || (req.body && req.body.name));
    console.log('id: ' + req.query.id);
    if (!user)
    {
        context.log("User item not found");

    }
    else
    {
        context.log("Found User item, Description=" + user);
        console.dir(user)
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: user
    };
}
