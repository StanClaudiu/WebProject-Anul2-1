import url from "url";
import { StringDecoder } from 'string_decoder'
import formidable from 'formidable'

const parseCookies = (request) => {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}


const parseMultipart = async (request) => {
    const multipartParser = formidable({ multiples: true });

    multipartParser.multiples = true;
    multipartParser.maxFileSize = parseInt(process.env.STORAGE_MAX_UPLOAD_SIZE);
    multipartParser.uploadDir = process.env.STORAGE_CACHE;

    const parsedBody = await new Promise((resolve, reject) => {
        multipartParser.parse(request, function (error, fields, files) { ///din multiparser
            if (error) {
                console.log("Failed to parse multipart request")
                console.log(error)
                resolve({"fields": {}, "files": {}})
            }
            resolve({"fields": fields, "files": files}) ///transmite sub forma name : value
        });////he knows how to put them well damn
    });

    return parsedBody
}

const parseUrlencoded = async (request) => { ///aici imi vine application cu informatia URLEncoded 
    return new Promise ((resolve, reject) => {
            
        const decoder = new StringDecoder('utf-8');
        let buffer = '';
    
        request.on('data', (chunk) => {
            console.log(chunk);
            buffer += decodeURIComponent(decoder.write(chunk));
           
        });

        request.on('end', () => {
            let fields = {}

            buffer += decodeURIComponent(decoder.end());// ce a mai ramas,dupa URL cred

            const decodedValues = buffer.split("&")

            decodedValues.forEach((decodedValue) => {
                const keyValue = decodedValue.split("=")
                fields[keyValue[0]] = keyValue[1] ///// test = ce? asta!!>>???
            })
            console.log(fields)
            resolve({"fields": fields, "files": {}})//cumva de unde se fac cererile?
        });

    });
}

const parseJosnBody = async (request) => {
    return new Promise ((resolve, reject) => { 

        let buffer = '';
        request.on('data', chunk => {
            buffer += chunk
        })

        ///give me buffer
    
        request.on('end', () => {
            let fields = {}
            try {
                fields = JSON.parse(buffer)
                resolve({"fields": fields, "files": {}}) //citim jsonul primit de la request
            } 
            catch (error) {
                console.log(error)
                resolve({"fields": {}, "files": {}})
                return
            }    
        });

    });
}

const parseBody = async (request) => {
    if (!request.headers['content-type']) {
        return {"fields": {}, "files": {}};
    }
    if (request.headers['content-type'].includes("multipart/form-data")) { //means it has video and things etc
        return await parseMultipart(request)
    }
    if (request.headers['content-type'] == "application/x-www-form-urlencoded") { //from the form of submit
        return await parseUrlencoded(request)
    }
    if (request.headers['content-type'] == "application/json") { //cerere normala de la server?, gen da-mi o pagina noua boss
        return await parseJosnBody(request)
    } //more light
}

const AddRequestFunctionalities = (request) => {

    request.augment = async () => {
        request.parameters = url.parse(request.url, true).query;//il facem obiect, pathname
        request.cookies = parseCookies(request);
        request.body = await parseBody(request); //parseaza structura ce vine, gen body.fields->object cu tot
        console.log(request.body.fields)
    }

    return request;
}


export default AddRequestFunctionalities;