var DB = require('./mysql_db.js');
//��ѯ�û����Ƿ����
function ret(name, callback){
	DB.query("SELECT count(*) as c FROM blog where name = '"+ name +"'", function(err, rows){
		if(err){
			return callback(err, null);
		}
          return callback(null, rows[0]['c']);
	});
}
exports.ret = ret;

//����û� username password
function add(name,pwd,callback){
	DB.query("insert into blog(name,pwd) values('"+ name +"','"+ pwd +"')", function(err, rows){
		if(err){
			return callback(err, null);
		}
        return callback(null,rows);
	});
}
exports.add = add;

//��½
function is_login(name,pwd, callback){
	DB.query("SELECT id,name FROM blog where name = '"+ name +"' and pwd = '"+ pwd +"'", function(err, rows){
		if(err){
			return callback(err, null);
		}
          return callback(null, rows);
	});
}
exports.is_login = is_login;
