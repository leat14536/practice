/**
 * Created by Administrator on 2017/4/17 0017.
 */
var http = require('http')
var Promise = require('Promise')
var url = 'http://www.imooc.com/learn/742'
var cheerio = require('cheerio')
var baseUrl = 'http://www.imooc.com/learn/'

function filterChapters(html){

    var $ = cheerio.load(html);

    var chapters = $('.chapter');

    var courseData = [];

    chapters.each(function(item){
        var chapter = $(this);
        var chapterTitle = chapter.find('strong').text();
        chapterTitle = cubSpace(chapterTitle);
        var videos = chapter.find('.video').children('li');
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }
        videos.each(function(item){
            var video = $(this).find('.J-media-item');
            var videoTitle = video.text();
            videoTitle = cubSpace(videoTitle)
            var id = video.attr('href').split('video/')[1];

            chapterData.videos.push({
                title:videoTitle,
                id: id,
            })
        })
        courseData.push(chapterData)
    })
    return courseData;

    function cubSpace(str){
        var ret = str.replace(/[\s]*/g,'')
        return ret;
    }
}

function printCourseInfo(courseData){
    console.log(typeof courseData)
    courseData.forEach(function(item){
        var chapterTitle = item.chapterTitle

        console.log('\n'+chapterTitle.trim());

        item.videos.forEach(function(video){
            console.log('['+video.id.trim()+']   '+video.title.trim())
        })
    })
}

function getPagesAsync(url){
    return Promise(function(res, rej){
        console.log('正在爬取'+url);

        http.get(url, function(res){
            var html = '';

            res.on('data', function(data){
                html += data;
            })

            res.on('end', function(){
                res(html)
                //var courseData = filterChapters(html)

                //printCourseInfo(courseData);
            })

        }).on('error', function(e){
            rej(e)
            //console.log('获取出错')
        })
    })
}

var fetchCourseArray = []

videoIds.forEach(functin(id){
    fetchCourseArray.push(getPagesAsync(baseUrl + id));
})

Promise
    .all([])
    .then(function(pages){
    varcoursesData = []

    pages.forEach((html)=>{
        var courses = filterChapters(html)

        courseData
    })
})

