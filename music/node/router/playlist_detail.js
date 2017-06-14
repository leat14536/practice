/**
 * Created by Administrator on 2017/6/13 0013.
 */
const http = require('http')
const express = require("express")
const router = express()
const { createWebAPIRequest } = require("../util/util")

router.get("/", (req, res) => {
    const cookie = req.get('Cookie') ? req.get('Cookie') : ''
    let detail, imgurl
    const data = {
        "id": req.query.id,
        "offset": 0,
        "total": true,
        "limit": 1000,
        "n": 1000,
        "csrf_token": ""
    };

    console.log(1)
    createWebAPIRequest(
        'music.163.com',
        '/weapi/v3/playlist/detail',
        'POST',
        data,
        cookie,
        music_req => {
            console.log(3)
            console.log(music_req)
            // detail = music_req
            res.send(music_req)
            // mergeRes()
        },
        err => {
            res.status(502).send('fetch error')
        }
    )
    console.log(2)
})

module.exports = router