class Router {
    postRoutes
    getRoutes
    deleteRoutes
    putRoutes
    patchRoutes

    constructor() {
        this.postRoutes = {}
        this.getRoutes = {}
        this.deleteRoutes = {}
        this.putRoutes = {}
        this.patchRoutes = {}
    }

    post(url, controller, middleware = (_1, _2, _3) => true) {
        if (this.postRoutes[url])
            console.error(`route ${url} was already added as POST route`)
        this.postRoutes[url] = {"controller": controller, "middleware":  middleware}
    }
    get(url, controller, middleware = (_1, _2, _3) => true) {
        if (this.getRoutes[url])
            console.error(`route ${url} was already added as GET route`)
        this.getRoutes[url] = {"controller": controller, "middleware":  middleware}
    }
    delete(url, controller, middleware = (_1, _2, _3) => true) {
        if (this.deleteRoutes[url])
            console.error(`route ${url} was already added as DELETE route`)
        this.deleteRoutes[url] = {"controller": controller, "middleware": middleware}
    }
    put(url, controller, middleware = (_1, _2, _3) => true) {
        if (this.putRoutes[url])
            console.error(`route ${url} was already added as PUT route`)
        this.putRoutes[url] = {"controleer": controller, "middleware": middleware}
    }

    patch(url, controller, middleware = (_1, _2, _3) => true) {
        if (this.patchRoutes[url])
            console.error(`route ${url} was already added as PUT route`)
        this.patchRoutes[url] = {"controller": controller, "middleware": middleware}
    }

    async handleRoute(zen, request, response) {
        if (request.error) {
            console.log(error)
            return response.status(500).json({
                success: false,
                message: "Data transfer error!"
            });
        }

        const requestUrl = request.url.split(`?`)[0];

        try {
            switch (request.method) {
                case "POST":
                    if (await this.postRoutes[requestUrl]["middleware"](zen, request, response)) {
                        return await this.postRoutes[requestUrl]["controller"](zen, request, response)
                    }
                case "GET":
                    if (await this.getRoutes[requestUrl]["middleware"](zen, request, response)) {
                        return await this.getRoutes[requestUrl]["controller"](zen, request, response)
                    }
                case "DELETE":
                    if (await this.deleteRoutes[requestUrl]["middleware"](zen, request, response)) {
                        return await this.deleteRoutes[requestUrl]["controller"](zen, request, response)
                    }
                case "PUT":
                    if (await this.putRoutes[requestUrl]["middleware"](zen, request, response)) {
                        return await this.putRoutes[requestUrl]["controller"](zen, request, response)
                    }
                case "PATCH":
                    if (await this.patchRoutes[requestUrl]["middleware"](zen, request, response)) {
                        return await this.patchRoutes[requestUrl]["controller"](zen, request, response)   
                    }
                default:
                    throw new Error(`no route with such http verb: ${request.method}`)
            }
        } 
        catch (error) {
            console.error(error)
            return response.status(400).json({
                success: false,
                error: error.message,
            });
        }

    }
}

export default Router
