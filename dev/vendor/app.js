import http from "http"
import { Router } from "./index.js"
import { AddRequestFunctionalities, 
         AddResponseFunctionalities } from "./functionalities/index.js"
import path from "path";
import url from "url";
import StatusCodes from "http-status-codes";

class App {
    port
    router
    db

    constructor(port, db) {
        this.port = port
        this.db = db
        this.router = new Router()
    }

    isStatic = (url) => String(url).startsWith(`/public`)
    hasValidHeaders = (headers) => !headers['content-type'] || 
                                    headers['content-type'].includes("multipart/form-data") ||
                                    headers['content-type'] == "x-www-form-urlencoded"

    listen() {
        http.createServer(async function (request, response) {

            let zen = {}
            zen = this.addZenFunctionalities(zen);
            response = AddResponseFunctionalities(response);
            request = await AddRequestFunctionalities(request);

            if (this.isStatic(request.url)) {
                response = this.handleStatic(request, response);
                return;
            }

            console.log(`${request.method} on ${request.url}`)

            if (this.hasValidHeaders(request.headers)) {
                response = this.router.handleRoute(zen, request, response)
                return
            } 
            else {
                response.status(415).json({
                    error: `Invalid Headers`
                })
                request.connection.destroy()
            }

        }.bind(this)).listen(this.port)


        console.log(`app running on PORT: ${this.port}`)

    }
    useWebRoute(router) {
        this.router.getRoutes = { ...this.router.getRoutes, ...router.getRoutes }
        this.router.postRoutes = { ...this.router.postRoutes, ...router.postRoutes }
        this.router.deleteRoutes = { ...this.router.deleteRoutes, ...router.deleteRoutes }
        this.router.putRoutes = { ...this.router.putRoutes, ...router.putRoutes }
        this.router.patchRoutes = { ...this.router.patchRoutes, ...router.patchRoutes }
    }

    setResponseHeaders(response) {
        response.setHeader('Access-Control-Allow-Origin', 'origin');
        response.setHeader('Access-Control-Allow-Credentials', true);
        response.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
        response.setHeader('Access-Control-Allow-Headers', 'Accept,Content-Type,platform,appVersion');
        response.setHeader('Access-Control-Max-Age', 2592000);

        return response;
    }

    addZenFunctionalities(zen) {
        if (this.db) {
            zen.db = this.db;
        }
        return zen;
    }

    handleStatic(request, response) {

        const parsedUrl = url.parse(request.url)

        let pathname = `${parsedUrl.pathname}`
        let realPath = path.join(pathname).replace(/\\/g, '/');;
        
        if (!realPath.startsWith("/public/"))
            return response.status(StatusCodes.FORBIDDEN).json({
                success: false,
            })

        return response.sendFile("public/" + realPath.replace(/^.+?[/]/, ''))  
    }
}

export default App