const axios = require('axios')

const utils = require('./utils')
const config = require('./config')
const parser = require('./parser')
const save = require('./save')
const logger = require('./logger')

for (const i of utils.range(0, 250, 25)) {
    url = config.genUrlOfPage(i)
    axios.get(url).then(
        resp => {
            logger.info('GET ' + resp.request._redirectable._currentRequest.res.responseUrl)
            logger.info('STATUS ' + resp.status)

            let lis = parser.parse_resp(resp)
            for (let i = 0; i < lis.length; i++) {
                let li = lis.eq(i);
                let data = parser.parse_li(li)
                // 保存数据
                save.saveData(config.paths.dataFile, data)
                // 下载海报
                save.savePoster(config.paths.posterPath, data.posterUrl)
            }
        }
    ).catch(err => { if (err) logger.error(err.message) })
}