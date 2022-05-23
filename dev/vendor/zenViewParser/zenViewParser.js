import fs from 'fs'

const ZenViewParser = async (wiredObject, zenViewPath) => {
    const stat = await fs.promises.stat(zenViewPath);

    if (!stat) {
        return "Error : zenViewNotFound"
    }

    let data = await fs.promises.readFile(zenViewPath, 'utf8')
    const tokenizedData = data.split("@@zen")

    let parsedView = ''

    for (let it = 0; it < tokenizedData.length; it++) {
        if (it % 2 == 1) {
            const zenStatement = new Function(tokenizedData[it])
            parsedView = parsedView + zenStatement()
        }
        else {
            parsedView = parsedView + tokenizedData[it]
        }
    }

    return parsedView;
}

export default ZenViewParser;