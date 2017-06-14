# 一个简单的音乐播放器

frontEnd:前端部分
	
	npm install
	npm run dev

node: nodejs部分

	npm install
	node app.js

歌单数据均来源于网易云音乐api,通过nodejs代理获取

已完成功能: 

登录、
获取歌单、
获取歌曲列表、
播放单曲、
播放列表(查看/删除/清空)、
播放面板(上一首/下一首/点击调整进度)

todo: 显示歌词

node需要自行创建连接mongoodb数据库,端口号27018
		
	mongoose.connect('mongodb://localhost:27018/music', ...
	
数据库目前的数据结构(目前仅实现登录功能):

	username: String,
    password: String,
    isAdmin:{
        type: Boolean,
        default:false
    }







	