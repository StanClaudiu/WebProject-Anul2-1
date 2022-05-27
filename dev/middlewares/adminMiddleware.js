
const AdminMiddleware = (zen, request, response) => {
    if (!zen.session["isLoggedIn"] || zen.session["user"].role != "admin") {
        response.json("Must be authenticated as admin")
        return false;
    }
    return true;
}

export default AdminMiddleware;