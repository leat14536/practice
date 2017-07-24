/**
 * Created by Administrator on 2017/7/23 0023.
 */
function $$(selector, context) {
    context = context || document
    let elememts = document.querySelectorAll(selector)
    return Array.prototype.slice.call(elememts)
}

function testProperty(property) {
    let root = document.documentElement

    if(property in root.style) {
        return true
    }

    root.classList.add('no-' + property.toLowerCase())
    return false
}

function testValue(id, value, property) {
    let dummy = document.createElement('p')
    dummy.style[property] = value

    if(dummy.style[property]) {
        root.classList.add(id)
        return true
    }

    root.classList.add('no-' + id)
    return false
}