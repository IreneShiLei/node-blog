var DB = require('./mysql_db.js');
//添加微博
function u_add(uid,wcontent,callback){

			//添加用户的id 发言内容
			DB.query("insert into weibo(uid,content,datetime) values("+ uid +",'"+ wcontent +"',now())", function(err, r){
			if(err){
				return callback(err, null);
			}
			  return callback(null, r);
			});	
}
exports.u_add = u_add;

//查询用户的所有记录
function u_row(uid,callback){
		DB.query("select a.id,b.id as bid,a.name,b.content,b.datetime from	weibo as b left join blog as a ON a.id = b.uid where b.uid = "+ uid +" order by b.id desc limit 50",
		function(err,docs){
		
		if(err){
				return callback(err, null);
			}	
				callback(null, docs);
		});
}
exports.u_row = u_row;

//查询全部
function w_all(callback){
		DB.query("select a.id,b.id as bid,a.name,b.content,b.datetime from	weibo as b left join blog as a ON a.id = b.uid group by a.id order by datetime desc limit 50",
		function(err,docs){
		if(err){
				return callback(err, null);
			}	
				callback(null,docs);
		});
}
exports.w_all = w_all;

//按 用户id 查询 一条
function u_rows(wid,callback){
		DB.query("select a.id,a.name,b.content,b.datetime from	weibo as b left join blog as a ON a.id = b.uid where b.id = "+ wid +"",
		function(err,rows){
		if(err){
				return callback(err, null);
			}	
				callback(null,rows);
		});
}
exports.u_rows = u_rows;

