// 验证数据库中的用户相关内容
const User = {
	//查询用户手机号
	queryUserTel( option ){
		return 'select * from user where tel = '+option.userTel+'';
	},
	// 查询手机号密码是否匹配
	queryUserPwd( option ){
		return 'select * from user where (tel = '+option.userTel+') and pwd = '+option.userPwd+'';
	},
	// 新增用户信息
	insertUserInfo(option){
		let userTel = option.userTel
		let userPwd = option.userPwd || '123456'
		// 引入token包
		let jwt = require('jsonwebtoken')
		// 用户信息
		let payload = {tel: userTel}
		// 口令
		let secret = 'shangcheng'
		let token = jwt.sign(payload, secret)
		return 'insert into user(tel,pwd,imgUrl,nickName,token) values ("'+userTel+'","'+userPwd+'","/images/user.png","'+userTel+'","'+token+'" )'
	},
	resetUserInfo(option){
		let userTel = option.userTel
		let userPwd = option.userPwd
		return 'update user set pwd = '+userPwd+' where tel = '+userTel+''
	}
}
exports = module.exports = User
