import url from "url";
import bodyParser from 'body-parser'
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

    const parsedBody = await new Promise((resolve, reject) => {
        multipartParser.parse(request, function (error, fields, files) {
            if (error) {
                console.log("Failed to parse multipart request")
                console.log(error)
                resolve({"fields": {}, "files": {}})
            }
            resolve({"fields": fields, "files": files})
        });
    });

    return parsedBody
}

const parseUrlencoded = async (request) => {
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    //urlencodedParser.
}

const parseBody = async (request) => {
    if (!request.headers['content-type']) {
        return {"fields": {}, "files": {}};
    }
    if (request.headers['content-type'].includes("multipart/form-data")) {
        return await parseMultipart(request)
    }
    if (req.headers['content-type'] == "x-www-form-urlencoded") {
        return await parseUrlencoded(request)
    }
}

const AddRequestFunctionalities = async (request) => {
    request.parameters = url.parse(request.url, true).query;
    request.cookies = parseCookies(request);
    request.body = await parseBody(request);
    return request;
}


export default AddRequestFunctionalities;