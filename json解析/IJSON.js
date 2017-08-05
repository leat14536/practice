/**
 * Created by Administrator on 2017/8/5 0005.
 */
(function (root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object')
        exports["IJSON"] = factory();
    else
        root["IJSON"] = factory();
})(this, function () {
    let i = 0

    function parse(str) {
        if (typeof  str !== 'string') {
            throw 'type err'
        }
        i = 0;
        return parseValue(str)

        function parseValue() {
            switch (str[i]) {
                case '"':
                    return parseString()
                case 'f':
                    return parseFalse()
                case 'n':
                    return parseNull()
                case 't':
                    return parseTrue()
                case '[':
                    return parseArray()
                case '{':
                    return parseObject()
                default:
                    return parseNumber()
            }
        }

        function parseString() {
            let result = ''
            while (str[++i] !== '"') {
                let res = str[i]
                if (res === '\\') {
                    res = str[++i]
                    switch (res) {
                        case 'n':
                            res = '\n'
                            break
                        case 'b':
                            res = '\b'
                            break
                        case 't':
                            res = '\t'
                            break
                        case 'f':
                            res = '\f'
                            break
                        case 'r':
                            res = '\r'
                            break
                        case '"':
                            res = '\"'
                            break
                        case '\\':
                            res = '\\'
                            break
                        case 'u':
                            res = str.substr(i, 5)
                            i += 4
                            res = unescape(res.replace(/\u/g, "%u"))
                            break
                    }
                }
                result += res
            }
            i++
            return result
        }

        function parseFalse() {
            let content = str.substr(i, 5)
            if (content === 'false') {
                i += 5
                return false
            } else {
                throw new Error('err at:' + i)
            }
        }

        function parseNull() {
            let content = str.substr(i, 4)
            if (content === 'null') {
                i += 4
                return null
            } else {
                throw new Error('err at:' + i)
            }
        }

        function parseTrue() {
            let content = str.substr(i, 4)
            if (content === 'true') {
                i += 4
                return true
            } else {
                throw new Error('err at:' + i)
            }
        }

        function parseArray() {
            i++
            let result = []
            while (str[i] !== ']') {
                result.push(parseValue())
                if (str[i] === ',') {
                    i++
                }
            }
            i++
            return result
        }

        function parseObject() {
            let result = {}
            i++
            while (str[i] !== '}') {
                let key = parseString()
                i++
                let value = parseValue()
                result[key] = value
                if (str[i] === ',') {
                    i++
                } else if (str[i] !== '}') {
                    throw 'obj err'
                }
            }
            i++
            return result
        }

        function parseNumber() {
            let numberStr = ''
            while (isNumber(str[i])) {
                numberStr += str[i++]
            }
            return parseFloat(numberStr)
        }

        function isNumber(c) {
            let chars = {
                '-': true,
                '+': true,
                'e': true,
                'E': true,
                '.': true
            }

            if (chars[c]) {
                return true
            }

            if (c >= '0' && c <= '9') {
                return true;
            }

            return false
        }
    }

    function stringify(val) {
        if (val instanceof Array) {
            return stringifyArray(val)
        } else if (typeof val === 'object' && val) {
            return stringifyObject(val)
        } else {
            return stringifyValue(val)
        }

        function stringifyArray(val) {
            return `[${val.reduce(
                (accumulator, currentValue) => {
                    let ret = stringify(currentValue)
                    if (ret === undefined) ret = null
                    if (accumulator.length) {
                        return `${accumulator},${ret}`
                    } else {
                        return accumulator + ret
                    }
                }, '')}]`
        }

        function stringifyObject(val) {
            let result = '{'
            for (let key in val) {
                let relVal = stringifyValue(val[key])
                if (relVal === undefined) {
                    continue;
                } else {
                    if (result.length > 1) result += ','
                    result += `"${key}":${relVal}`
                }
            }

            return result + '}'
        }

        function stringifyValue(val) {
            let reg = /\u0000|\u0001|\u0002|\u0003|\u0004|\u0005|\u0006|\u0007|\t|\n|\u000b|\f|\r|\u000e|\u000f|\u0010|\u0011|\u0012|\u0013|\u0014|\u0015|\u0016|\u0017|\u0018|\u0019|\u001a|\u001b|\u001c|\u001d|\u001e|\u001f|\|\\/g
            let repList = {
                "\"": "\"",
                "\\\\": "\\\\",
                "\f": "\\f",
                "\n": "\\n",
                "\t": "\\t",
                "\u000b": "\\u000b",
                "\u000e": "\\u000e",
                "\u000f": "\\u000f",
                "\u0000": "\\u0000",
                "\u0001": "\\u0001",
                "\u001a": "\\u001a",
                "\u001b": "\\u001b",
                "\u001c": "\\u001c",
                "\u001d": "\\u001d",
                "\u001e": "\\u001e",
                "\u001f": "\\u001f",
                "\u0002": "\\u0002",
                "\u0003": "\\u0003",
                "\u0004": "\\u0004",
                "\u0005": "\\u0005",
                "\u0006": "\\u0006",
                "\u0007": "\\u0007",
                "\u0010": "\\u0010",
                "\u0011": "\\u0011",
                "\u0012": "\\u0012",
                "\u0013": "\\u0013",
                "\u0014": "\\u0014",
                "\u0015": "\\u0015",
                "\u0016": "\\u0016",
                "\u0017": "\\u0017",
                "\u0018": "\\u0018",
                "\u0019": "\\u0019"
            }

            if (typeof val === 'function' || typeof val === 'undefined') {
                return undefined
            }

            if (typeof val === 'string') {
                val = `"${val.replace(reg, (match) => {
                    let ret = repList[match] === undefined ? '' : repList[match]
                    return ret
                })}"`
            }

            if (typeof val === 'number') {
                if(isNaN(val)) return 'null'
                return val + ''
            }

            return val
        }
    }

    return {parse, stringify}
})