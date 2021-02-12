const auth = {
    __userApiToken__: null,
    // Logs user out
    logOutUser() {
        this.__userApiToken__ = null
    },
    // Checks if user is logged in
    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },
};

export default auth;