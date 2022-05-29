
import fs from "fs"

const FileManager = {
    upload: async (file) => {
        const responseToExtension = {
            'image/x-icon': '.ico',
            'text/html': '.html',
            'text/javascript': '.js',
            'application/json': '.json',
            'text/css': '.css',
            'image/png': '.png',
            'image/jpeg': '.jpg',
            'audio/wav': '.wav',
            'audio/mpeg': '.mp3',
            'video/mp4': '.mp4',
            'image/svg+xml': '.svg',
            'application/pdf': '.pdf',
            'application/msword': '.doc'
        };

        const newFilePath = `public/uploadedFiles/${file.newFilename}${responseToExtension[file.mimetype]}`
        fs.renameSync(file.filepath, newFilePath)
        
        const downloadLink = process.env.APP_URI + "/" + newFilePath
        
        console.log(`File uploaded at ${downloadLink}`)
        return downloadLink
    },
}

export default FileManager