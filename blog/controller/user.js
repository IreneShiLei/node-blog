
/*
 * GET users listing.
 */


 var DBu = require('../modules/weibo_mdl.js');
	module.exports=function(app){
	//显示发表微博
	var uid = "";
	app.get('/u_list/', function(req, res) {
		uid = req.session.uid; 
		//查询该用户所有的记录
		DBu.u_row(uid,function(err,posts){
			res.render('weibo',{
				title:'主页',
				posts:posts
			});
				
		});
	});

	//添加微博
	app.post('/u_post',function(req,res){
		if(req.body.post != ""){
			//传入用户name 发表内容
			DBu.u_add(uid,req.body.post,function(err,result){
				if(err)return;
				 req.flash('success', '发表成功!');

				
				return res.redirect('/u_list/');
			});
		}
	});
	
	//详细内容
	app.get('/u_lists/:wid',function(req,res){
		var wid = req.params.wid;
			console.log(wid);
		 var uname = req.session.u; 
		 if(uname == undefined){
			 req.flash('success', '您先登录!');
			 return res.redirect('/login');
		 }
		DBu.u_rows(wid,function(err,rows){
			res.render('list',{
				title:'内容',
				rows:rows
			});
		});	
		
	});


	//详细内容
	app.post('/u_aa',function(req,res){
		var uid = req.body.id;
		
		DBu.u_row(uid,function(err,posts){
			res.json(posts);
		});
	});

}