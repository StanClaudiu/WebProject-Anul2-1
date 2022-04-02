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

    post(url, controller) {
        if (this.postRoutes[url])
            console.error(`route ${url} was already added as POST route`)
        this.postRoutes[url] = controller
    }
    get(url, controller) {
        if (this.getRoutes[url])
            console.error(`route ${url} was already added as GET route`)
        this.getRoutes[url] = controller
    }
    delete(url, controller) {
        if (this.deleteRoutes[url])
            console.error(`route ${url} was already added as DELETE route`)
        this.deleteRoutes[url] = controller
    }
    put(url, controller) {
        if (this.putRoutes[url])
            console.error(`route ${url} was already added as PUT route`)
        this.putRoutes[url] = controller
    }

    patch(url, controller) {
        if (this.patchRoutes[url])
            console.error(`route ${url} was already added as PUT route`)
        this.patchRoutes[url] = controller
    }

    handleRoute(zen, request, response) {
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
                    return this.postRoutes[requestUrl](zen, request, response)
                case "GET":
                    return this.getRoutes[requestUrl](zen, request, response)
                case "DELETE":
                    return this.deleteRoutes[requestUrl](zen, request, response)
                case "PUT":
                    return this.putRoutes[requestUrl](zen, request, response)
                case "PATCH":
                    return this.patchRoutes[requestUrl](zen, request, response)
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
