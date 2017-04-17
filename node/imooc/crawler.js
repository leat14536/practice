/**
 * Created by Administrator on 2017/4/17 0017.
 */
var http = require('http')
var url = 'http://www.imooc.com/learn/742'
var cheerio = require('cheerio')

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

http.get(url, function(res){
    var html = '';

    res.on('data', function(data){
        html += data;
    })

    res.on('end', function(){
        var courseData = filterChapters(html)

        printCourseInfo(courseData);
    })

}).on('error', function(){
    console.log('获取出错')
})