import fs from "fs";
import path from "path";
import StatusCodes from "http-status-codes";
import { ZenViewParser } from "../zenViewParser/index.js";

const AddResponseFunctionalities = (response) => {

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

    ///we create the response.status function and response.json function

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
            '.mp4': 'video/mp4',
            '.svg': 'image/svg+xml',
            '.pdf': 'application/pdf',
            '.doc': 'application/msword'
        };

        try {
            const extension = path.parse(filePath).ext;

            const stat = await fs.promises.stat(filePath);//stats about the files

            if (!stat.isFile) {
                return response.status(StatusCodes.BAD_REQUEST).json({
                    error: `bad request. not a file`
                })
            }  //daca nu avem un file atunci gtfo
            else {
                const data = await fs.promises.readFile(filePath)
                response.setHeader('Content-type', extensionToResponse[extension] || 'text/plain');//u can set multiple headers damn
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
                error: err.message,
                path: filePath
            })
        }

        return response
    }

    response.sendRaw = (data, responseType) => {
        response.setHeader('Content-type', responseType);
        response.write(data) ////pune html-ul
        response.end() 
        return response
    }

    response.sendZenView = async (wiredObject, zenViewPath) => {
        const data = await ZenViewParser(wiredObject, zenViewPath) ////take the wiredObject
        return response.sendRaw(data, 'text/html')
    }

    response.setCookie = (key, value) => {
        response.setHeader('Set-Cookie', `${key}=${value};HttpOnly;Domain=${process.env.APP_DOMAIN};Path=/;overwrite=true`)
        return response;
    }

    response.deleteCookie = (key) => {
        response.setHeader('Set-Cookie', `${key}=;HttpOnly;Domain=${process.env.APP_DOMAIN};Path=/;overwrite=true;expires=Thu, 01 Jan 1970 00:00:01 GMT;`)
        return response;
    }

    response.redirect = (location) => {
        response.writeHead(302, {Location: location});
        response.end()
        return response;
    }

    response.augment = async () => {}

    return response
}

export default AddResponseFunctionalities;