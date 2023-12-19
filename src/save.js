const fs = require('fs')
const path = require('path')
const request = require('./request')
const logger = require('./logger')

/**
 * 保存数据文件
 * @param {*} file 文件路径，用于保存数据
 * @param {*} data 数据对象（JSON 格式），来自于 parser.parse_li
 */
function saveData(file, data) {
    fs.appendFile(
        file,
        JSON.stringify(data) + '\n',
        err => {
            if (err) {
                logger.error(err.message)
            }
            else {
                logger.info('SAVE ' + data.rank + ' ' + data.originName)
            }
        }
    )
}

/**
 * 下载海报图片
 * 已经存在的图片会跳过
 */
function savePoster(posterPath, url) {
    let posterSavePath = path.join(posterPath, path.basename(url))
    if (!fs.existsSync(posterSavePath))
        request.getBytes(url, posterSavePath)
}

module.exports = { saveData, savePoster }