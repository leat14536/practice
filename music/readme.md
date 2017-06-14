# 一个简单的音乐播放器

node需要自行创建连接mongoodb数据库,端口号27018
		
	mongoose.connect('mongodb://localhost:27018/music', ...
	
数据库目前的数据结构(目前仅实现登录功能):

	username: String,
    password: String,
    isAdmin:{
        type: Boolean,
        default:false
    }




	