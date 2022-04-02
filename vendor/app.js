import http from "http"
import { Router } from "./index.js"
import fs from "fs";
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

    listen() {
        http.createServer(function (request, response) {

            let zen = {}
            zen = this.addZenFunctionalities(zen);
            response = this.addResponseFunctionalities(response);
            response = this.addResponseFunctionalities(response);
            request = this.addRequestFunctionalities(request);

            if (this.isStatic(request.url)) {
                response = this.handleStatic(request, response);
                return;
            }

            console.log(`${request.method} on ${request.url}`)


            if (!request.headers['content-type']) {
                response = this.router.handleRoute(zen, request, response)
                return
            } 
            else {
                response.status(415).json({
                    error: `Invalid Content Type Header`
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

    addResponseFunctionalities(response) {

        response.status = (newStatusCode) => {
            response.statusCode = newStatusCode
            return response
        }

        response.json = (newJson) => {
            response.setHeader('Content-Type', 'application/json');
            response.write(JSON.stringify(newJson))
            response.end()
            return response

        }

        response.sendFile = async (filePath) => {

            const extensionToResponse = {
                '.ico': 'image/x-icon',
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.json': 'application/json',
                '.css': 'text/css',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.wav': 'audio/wav',
                '.mp3': 'audio/mpeg',
                '.svg': 'image/svg+xml',
                '.pdf': 'application/pdf',
                '.doc': 'application/msword'
            };

            try {
                const extension = path.parse(filePath).ext;

                const stat = await fs.promises.stat(filePath);

                if (!stat.isFile) {
                    return response.status(StatusCodes.BAD_REQUEST).json({
                        error: `bad request. not a file`
                    })
                } 
                else {
                    const data = await fs.promises.readFile(filePath)
                    response.setHeader('Content-type', extensionToResponse[extension] || 'text/plain');
                    response.setHeader('Content-length', stat.size);
                    response.write(data)
                    response.end()
                }
            } 
            catch (err) {
                console.error(err)

                if (err.code == 'ENOENT') {
                    return response.status(StatusCodes.NOT_FOUND).json({
                        error: err.message,
                        path: filePath
                    })
                }

                return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    ...sendDebugInResponse && { error: err.message },
                    path: filePath
                })
            }

            return response
        }

        return response
    }

    addRequestFunctionalities(request) {
        request.parameters = url.parse(request.url, true).query;
        return request;
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
        let realPath = path.resolve(pathname);
        
        if (!realPath.startsWith("/public/"))
            return response.status(StatusCodes.FORBIDDEN).json({
                success: false,
            })

        return response.sendFile("public/" + realPath.replace(/^.+?[/]/, ''))  
    }
}

export default App