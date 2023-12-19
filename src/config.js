const fs = require('fs')
const path = require('path')

let rootPath = 'D:/Pictures/film/douban'

function genPaths() {
    let dataPath = path.join(rootPath, 'data')
    let posterPath = path.join(rootPath, 'poster')
    // 数据名称日期格式，如 2022-10-24.txt
    let date = (new Date()).toISOString().split('T')[0]
    let dataFile = path.join(dataPath, `${date}.txt`)
    let paths = { rootPath, dataPath, posterPath }

    for (const key in paths) {
        let path = paths[key]
        if (!fs.existsSync(path)) fs.mkdirSync(path)
    }
    if (fs.existsSync(dataFile)) { fs.rm(dataFile) }

    return { ...paths, dataFile }
}

function genUrlOfPage(page) {
    return `https://movie.douban.com/top250?start=${page}&filter=`
}

module.exports = {
    paths: genPaths(),
    genUrlOfPage
}