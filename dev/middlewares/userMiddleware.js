
const UserMiddleware = (zen, request, response) => {
    if (!zen.session["isLoggedIn"] || zen.session["user"].role != "user") {
        response.json("Must be authenticated as user")
        return false;
    }
    return true;
}

export default UserMiddleware;