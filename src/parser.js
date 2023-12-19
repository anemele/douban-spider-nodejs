const cheerio = require('cheerio')

function parse_li(li) {
    /**
     * 解析数据
     */
    let rank = li.find('div.pic > em').text()
    let posterUrl = li.find('div.pic > a > img').attr('src')
    // 解析高清图片
    posterUrl = posterUrl.replace('s_ratio_poster', 'l').replace('.webp', '')
    let title = li.find('div.hd > a > span.title').text().split('/')
    let cnName = title[0].trim()
    let originName = title[1] === undefined ? cnName : title[1].trim()
    let otherName = li.find('div.hd > a > span.other').text().replace('\u00a0/\u00a0', '')
    let something = li.find('div.bd > p:first-child').text().trim().split('\n')
    let [director, actors] = something[0].split('\u00a0'.repeat(3))
    let [year, area, genres] = something[1].trim().split('\u00a0/\u00a0')
    let rating = li.find('div.bd > div.star > span:nth(1)').text()
    let peopleNumber = li.find('div.bd > div.star > span:nth(3)').text()
    let quote = li.find('div.bd > p.quote > span').text()
    /**
     * 整合数据
     */
    return {
        rank,
        posterUrl,
        cnName,
        originName,
        otherName,
        director,
        actors,
        year,
        area,
        genres,
        rating,
        peopleNumber,
        quote
    }
}

function parse_resp(resp) {
    let $ = cheerio.load(resp.data)
    let lis = $("ol.grid_view li")
    return lis
}

module.exports = { parse_li, parse_resp }