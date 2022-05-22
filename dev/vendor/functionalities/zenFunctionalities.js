const AddZenFunctionalities = (zen) => {
    zen.augment = async (db, request) => {
        if (!db) {
            console.log("Invalid DB")
        }
        zen.db = db;

        console.log(request.cookies)

        zen.session = {
            "isLoggedIn": true,
            "user": null
        }
    }
    
    return zen
}

export default AddZenFunctionalities