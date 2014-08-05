var DB = require('./mysql_db.js');
//查询用户名是否存在
function ret(name, callback){
	DB.query("SELECT count(*) as c FROM blog where name = '"+ name +"'", function(err, rows){
		if(err){
			return callback(err, null);
		}
          return callback(null, rows[0]['c']);
	});
}
exports.ret = ret;

//添加用户 username password
function add(name,pwd,callback){
	DB.query("insert into blog(name,pwd) values('"+ name +"','"+ pwd +"')", function(err, rows){
		if(err){
			return callback(err, null);
		}
        return callback(null,rows);
	});
}
exports.add = add;

//登陆
function is_login(name,pwd, callback){
	DB.query("SELECT id,name FROM blog where name = '"+ name +"' and pwd = '"+ pwd +"'", function(err, rows){
		if(err){
			return callback(err, null);
		}
          return callback(null, rows);
	});
}
exports.is_login = is_login;
