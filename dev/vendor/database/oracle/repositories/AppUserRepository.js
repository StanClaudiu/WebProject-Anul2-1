class AppUserRepository {
    dbConnection

    constructor(dbConnection) {
        this.dbConnection = dbConnection;
        this.initRepo();
    }

    initRepo() {
        this.dbConnection.then(
        (connection) => {
            console.log("cool")
        },
        (error) => {
            console.log(error)
        });
    }
}

export default AppUserRepository;