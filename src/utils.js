/**
 * utility package
 */

const fs = require('fs')

module.exports = {
    range,
    mkdirSync,
}

/**
 * similiar to python range
 */
function* range(start, stop, step) {
    switch (arguments.length) {
        case 0:
            throw Error
        case 1:
            ;[start, stop, step] = [0, start, 1]
            break
        case 2:
            ;[start, stop, step] = [start, stop, 1]
            break
    }
    if (step === 0) {
        throw Error
    } else if (step < 0) {
        while (start > stop) {
            yield start
            start += step
        }
    } else {
        while (start < stop) {
            yield start
            start += step
        }
    }
}

function mkdirSync(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    }
}
