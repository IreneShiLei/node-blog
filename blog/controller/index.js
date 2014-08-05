/*
 * GET home page.
 */

  io = require('socket.io').listen(300);

//'connection' 是socket.io 保留的，
io.sockets.on('connection',function(socket){ 


     //'msg'需要和客户端发送时定义的事件名相同
    socket.on('msg',function(data){
        console.log('Get a msg from client ...');
        socket.broadcast.emit('user message',data);
    });
});

var DBu = require('../modules/user_mdl.js');
module.exports=function(app){
var DBw = require('../modules/weibo_mdl.js');
  app.get('/',function(req,res){
	DBw.w_all(function(err,all){
		  res.render('index',{
		  title:'首页',
		  all:all
    });
	
	});
    
  });

//注册
app.get('/reg', checkNotLogin);
app.get('/reg',function(req,res){ 
  res.render('reg',{title:'注册'});
});
app.post('/doreg',function(req,res){ 
	if(req.body['username'] != "" && req.body['password'] != ""){

	DBu.ret(req.body['username'], function(err, username){ 

		if (req.body['password-repeat'] != req.body['password']) {
			req.flash('error', '两次输入的口令不一致');
			return res.redirect('/reg');
		}

		if(username > 0){
			 req.flash('error', '该用户已经存在!');
			 res.redirect('/reg');
		}else{

	DBu.add(req.body['username'],req.body['password'],function(err,isadd){
	    if(isadd)
			 req.flash('success', '注册成功');
			 res.redirect('/login');
		});
	}		
	});
	}else{
		req.flash('error', '请填写完整注册资料');
		res.redirect('/reg');
	}
	
});	

//登陆
app.get('/login', checkNotLogin);

app.get('/login',function(req,res){ 
  res.render('login',{title:'注册'});
});
app.post('/dologin',function(req,res){ 
	
	DBu.is_login(req.body['username'],req.body['password'], function(err, is_name){ 
	if(is_name != ''){
		 req.session.u = req.body.username;
		 req.session.uid = is_name[0]['id']
		 req.flash('success', '登陆成功!');
		 res.redirect('/u_list/');
	}else{
		 req.flash('error', '用户名或密码错误!');
		 res.redirect('/login');
	}
	});
});

//登出
app.get('/logout', checkLogin);
	app.get('/logout', function(req, res) {
		req.session.u = null;
		req.session.uid = null;
		req.flash('success', '登出成功');
		res.redirect('/');
	});

//session 判断是否登陆
function checkLogin(req, res, next) {
if (!req.session.u) {
	req.flash('error', '未登入');
	return res.redirect('/login');
}
	next();
}
function checkNotLogin(req, res, next) {
if (req.session.u) {
	req.flash('error', '已登入');
	res.redirect('/');
}
	next();
}

}
