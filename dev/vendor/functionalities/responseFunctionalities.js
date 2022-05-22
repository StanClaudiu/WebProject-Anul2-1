import fs from "fs";
import path from "path";
import StatusCodes from "http-status-codes";

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
                error: err.message,
                path: filePath
            })
        }

        return response
    }

    response.setCookie = (key, value) => {
        response.setHeader('Set-Cookie', `${key}=${value};HttpOnly;Domain=${process.env.APP_DOMAIN};Path=/;overwrite=true`)
        return response;
    }

    response.deleteCookie = (key) => {
        response.setHeader('Set-Cookie', `${key}=;HttpOnly;Domain=${process.env.APP_DOMAIN};Path=/;overwrite=true;expires=Thu, 01 Jan 1970 00:00:01 GMT;`)
        return response;
    }

    response.augment = async () => {}

    return response
}

export default AddResponseFunctionalities;