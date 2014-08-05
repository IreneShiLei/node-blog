
io = require('socket.io');

function ress(name, callback){
	io.listen(222);
}
exports.ress = ress;