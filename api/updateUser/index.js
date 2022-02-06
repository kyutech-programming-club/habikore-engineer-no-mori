module.exports = async function (context, req, user) {
    context.log('JavaScript HTTP trigger function processed a request.');
    if (!user) {
        context.log("User item not found");
    } else {
        context.log("Found User item, Description=" + user.name);
        console.dir(user);
    }

    user.state = req.body.state
    user.point = req.body.point
    console.dir(user)
    context.bindings.newuser = user;
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: user
    };
}
