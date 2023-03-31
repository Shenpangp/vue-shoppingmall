var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js');
var user = require('../db/userSql.js')
var QcloudSms = require('qcloudsms_js');
var jwt = require('jsonwebtoken')

// 删除地址
router.post('/api/deleteAddress',function(req,res,next){
    let addressId = req.body.id;
	console.log(addressId)
    connection.query(`delete from address where id = ${addressId}`,function(error,results){
        return res.send({
            data:{
                code:200,
                success:true,
                msg:'删除成功'
            }
        })
    })
})

// 修改地址
router.post('/api/updateAddress', function (req, res, next) {
	//token
	let token = req.headers.token;
	let tokenObj = jwt.decode(token);
	// 前端传递的数据
	let [id, name, tel, province, city, county, areaCode, addressDetail, isDefault] = [req.body.id, req.body.name, req.body.tel, req.body.province, req.body.city, req.body.county, req.body.areaCode, req.body.addressDetail, req.body.isDefault]
	console.log([id, name, tel, province, city, county, areaCode, addressDetail, isDefault])
	// 查询用户
	connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
		// 用户id
		let uId = results[0].id;
		// 如果修改为默认地址，则原来的默认地址取消
		if(isDefault == 1){
			connection.query(`update address set isDefault =  replace(isDefault, 1, 0) where uId = ${uId} and isDefault = 1`)
		}
		// 更新地址
		connection.query(`update address set name = "${name}", tel = "${tel}", province = "${province}", city = "${city}", county = "${county}", areaCode = "${areaCode}", addressDetail = "${addressDetail}", isDefault = "${isDefault}" where id = "${id}"`, function (err, result) {
			return res.send({
				data: {
					code: 200,
					success: true,
					msg:'修改成功',
				}
			})
		})
	})
})

// 查询地址
router.post('/api/selectAdress', function (req, res, next) {
	//token
	let token = req.headers.token;
	let tokenObj = jwt.decode(token);
	// 查询用户
	connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
		// 用户id
		let uId = results[0].id;
		// 查询地址
		connection.query(`select * from address where uId = ${uId}`, function (err, result) {
			return res.send({
				data: {
					code: 200,
					success: true,
					data: result
				}
			})
		})
	})
})

// 新增地址
router.post('/api/addAdress',function(req,res,next){
	// 前端传递的数据
	let [name, tel, province, city, county, areaCode, addressDetail, isDefault] = [req.body.name, req.body.tel, req.body.province, req.body.city, req.body.county, req.body.areaCode, req.body.addressDetail, req.body.isDefault]
	//token
	let token = req.headers.token;
	let tokenObj = jwt.decode(token);
	// 查询用户
	connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
		// 用户id
		let uId = results[0].id;
		// 如果新增的地址为默认地址，则原来的默认地址取消
		if(isDefault == 1){
			connection.query(`update address set isDefault =  replace(isDefault, 1, 0) where uId = ${uId} and isDefault = 1`)
		}
		// 增加收货地址
		connection.query(`insert into address (uId, name, tel, province, city, county, areaCode, addressDetail, isDefault) values("${uId}", "${name}", "${tel}", "${province}", "${city}", "${county}", "${areaCode}", "${addressDetail}", "${isDefault}")`,function(error,results){
			return res.send({
				data:{
					code: 200,
					success: true,
					msg: '添加成功'
				}
			})
		})
	})
})

// 更新购物车数据
router.post('/api/updateNum',function(req,res,next){
    let id = req.body.id;
	let num = req.body.num;
    connection.query(`select * from goods_cart where goods_id = ${id}`, function(error, results){
		// 原来的数量
		let oNum = results[0].goods_num
		//  更新
		connection.query(`update goods_cart set goods_num =  replace(goods_num, ${oNum}, ${num}) where goods_id = ${id}`, function(err, result){
			return res.send({
				data:{
					code: 200,
					success: true,
				}
			})
		})
	})
})

//删除购物车数据
router.post('/api/deleteCart',function(req,res,next){
    let arrId = req.body.arrId;
    for(let i=0;i<arrId.length;i++){
        connection.query(`delete from goods_cart where id = ${arrId[i]}`,function(error,results){
            return res.send({
                data:{
                    code:200,
                    success:true,
                    msg:'删除成功'
                }
            })
        })
    }
})

// 查询购物车 数据
router.post('/api/selectCart', function (req, res, next) {
	//token
	let token = req.headers.token;
	let tokenObj = jwt.decode(token);
	// 查询用户
	connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
		// 用户id
		let uId = results[0].id;
		// 查询购物车
		connection.query(`select * from goods_cart where uId = ${uId}`, function (err, result) {
			return res.send({
				code: 200,
				success: true,
				data: result
			})
		})
	})
})

// 添加购物车数据
router.post('/api/addCart',function(req,res,next){
    //后端接收前端的参数
    let goodsId = req.body.goodsId;
    //token
    let token = req.headers.token;
    let tokenObj = jwt.decode(token);
    //查询用户
    connection.query(`select * from user where tel = ${tokenObj.tel}`,function(error,results){
        //用户id
        let uId = results[0].id;
        // 查询商品
        connection.query(`select * from goods_list where id=${goodsId}`,function(err,result){
            let goodsName = result[0].name;
            let goodsPrice = result[0].price;
            let goodsImgUrl = result[0].imgUrl;
			// 查询当前用户是否添加过此商品
			connection.query(`select * from goods_cart where uId = ${uId} and goods_id = ${goodsId}`,function(erro, resu){
				if(resu.length > 0){
					let oNum = resu[0].goods_num
					connection.query(`update goods_cart set goods_num =  replace(goods_num, ${oNum}, ${oNum+1}) where goods_id = ${goodsId}`,function(er,re){
						return res.send({
							data:{
								code: 200,
								success: true,
							}
						})
					})
				}else{
					connection.query(`insert into goods_cart (uId,goods_id,goods_name,goods_price,goods_num,goods_imgUrl) values ("${uId}","${goodsId}","${goodsName}","${goodsPrice}","1","${goodsImgUrl}")`,function(e,r){
						return res.send({
						   data:{
							   code:200,
							   success:true,
							   msg:'添加成功'
						   }
					   }) 
					})
				}
			})
        })
    })
})

// 找回密码
router.post('/api/reset', function (req, res, next) {
	let params = {
		userTel: req.body.phone,
		userPwd: req.body.pwd,
	}
	// 查询用户是否存在
	connection.query(user.queryUserTel(params), function (error, results) {
		if (error) throw error
		// 用户不存在存在
		if (!results.length > 0) {
			res.send({
				code: 200,
				data: {
					success: true,
					msg: '该用户不存在',
					data: results[0]
				}
			})
		} else {
			if (results[0].pwd == params.userPwd) {
				res.send({
					code: 200,
					data: {
						success: true,
						msg: '跟原密码相同'
					}
				})
			} else {
				//用户存在，修改密码
				connection.query(user.resetUserInfo(params), function (err, result) {
					connection.query(user.queryUserTel(params), function (e, r) {
						res.send({
							code: 200,
							data: {
								success: true,
								msg: '重置成功',
								data: r[0]
							}
						})
					})
				})
			}
		}
	})
})

// 注册新用户
router.post('/api/register', function(req,res,next){
	let params = { 
		userTel: req.body.phone,
		userPwd: req.body.pwd,
	}
	// 查询用户是否存在
	connection.query(user.queryUserTel(params),function(error,results){
		if(error) throw error
		// 用户存在
		if(results.length > 0){
			return res.send({
				code: 200,
				data: {
					success: true,
					msg: '该手机号已被注册',
					data: results[0]
				}
			})
		}else{
			//不存在新增一条用户信息
			connection.query(user.insertUserInfo(params),function(err, result){
				connection.query(user.queryUserTel(params),function(e,r){
					return res.send({
						code: 200,
						data: {
							success: true,
							msg: '注册成功',
							data: r[0]
						}
					})
				})
			})
		}
	})
})

// 新增用户
router.post('/api/addUser', function(req,res,next){
	let params = { 
		userTel: req.body.phone,
	}
	// 查询用户是否存在
	connection.query(user.queryUserTel(params),function(error,results){
		if(error) throw error
		// 用户存在
		if(results.length > 0){
			res.send({
				code: 200,
				data: {
					success: true,
					msg: '登录成功',
					data: results[0]
				}
			})
		}else{
			//不存在新增一条用户信息
			connection.query(user.insertUserInfo(params),function(err, result){
				connection.query(user.queryUserTel(params),function(e,r){
					res.send({
						code: 200,
						data: {
							success: true,
							msg: '登录成功',
							data: r[0]
						}
					})
				})
			})
		}
	})
})

// 短信验证码接口
router.post('/api/code',function(req,res,next){
	
	let tel = req.body.phone;
	
	// 短信应用SDK AppID
	var appid = 1400187558;  // SDK AppID是1400开头
	
	// 短信应用SDK AppKey
	var appkey = "dc9dc3391896235ddc2325685047edc7";
	
	// 需要发送短信的手机号码
	var phoneNumbers = [tel];
	
	// 短信模板ID，需要在短信应用中申请
	var templateId = 285590;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
	
	// 签名
	var smsSign = "三人行慕课";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`
	
	// 实例化QcloudSms
	var qcloudsms = QcloudSms(appid, appkey);
	
	// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
	function callback(err, ress, resData) {
	    if (err) {
	        console.log("err: ", err);
	    } else {
			res.send({
				code:200,
				data:{
					success:true,
					data:ress.req.body.params[0]
				}
			})
	    }
	}
	
	var ssender = qcloudsms.SmsSingleSender();
	//这个变量：params 就是往手机上，发送的短信
	var params = [  Math.floor( Math.random()*(9999-1000))+1000   ];
	ssender.sendWithParam(86, phoneNumbers[0], templateId,
	  params, smsSign, "", "", callback);  // 签名参数不能为空串
	
})

// 账号密码登录接口
router.post('/api/login', function(req,res,next){
	//后端要接收前端传递过来的值
	let params = {
		userTel: req.body.userTel,
		userPwd: req.body.userPwd
	}
	connection.query(user.queryUserTel(params), function(error, results){
		if(error) throw error
		if(results.length > 0){
			connection.query(user.queryUserPwd(params), function(err, result){
				if(err) throw err
				if(result.length > 0){
					res.send({
						code: 200,
						data: {
							success: true,
							msg: '登录成功',
							data: result[0]
						}
					})
				}else{
					res.send({
						code: 302,
						data: {
							success: false,
							msg: '密码不正确'
						}
					})
				}
			})
		}else{
			res.send({
				code: 301,
				data: {
					success: false,
					msg: '手机号不存在'
				}
			})
		}
	})
})

// 分类的接口
router.get('/api/goods/list',function(req,res,next){
	
	res.send({
		code:0,
		data:[
			{
				//一级
				id:0,
				name:'推荐',
				data:[
					{
						//二级
						id:0,
						name:'推荐',
						list:[
						//三级
							{
								id:0,
								name:'紫砂壶',
								imgUrl:'./images/zsh.jpeg'
							},
							{
								id:1,
								name:'铁观音',
								imgUrl:'./images/tgy.jpeg'
							},
							{
								id:2,
								name:'金骏眉',
								imgUrl:'./images/jjm.jpeg'
							},
							{
								id:3,
								name:'武夷岩茶',
								imgUrl:'./images/wyyc.jpeg'
							},
							{
								id:4,
								name:'龙井',
								imgUrl:'./images/lj.jpeg'
							},
							{
								id:5,
								name:'云南滇红',
								imgUrl:'./images/yndh.jpeg'
							},
							{
								id:6,
								name:'建盏',
								imgUrl:'./images/jz.jpeg'
							},
							{
								id:7,
								name:'功夫茶具',
								imgUrl:'./images/gfcj.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:1,
				name:'新品',
				data:[
					{
						//二级
						id:1,
						name:'新品',
						list:[
						//三级
							{
								id:0,
								name:'五月新品',
								imgUrl:'./images/wyxp.jpeg'
							},
							{
								id:1,
								name:'六月新品',
								imgUrl:'./images/lyxp.jpeg'
							},
							{
								id:2,
								name:'七月新品',
								imgUrl:'./images/qyxp.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:2,
				name:'习茶',
				data:[
					{
						//二级
						id:2,
						name:'习茶',
						list:[
						//三级
							{
								id:0,
								name:'习茶',
								imgUrl:'./images/xc.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:3,
				name:'绿茶',
				data:[
					{
						//二级
						id:3,
						name:'绿茶',
						list:[
						//三级
							{
								id:0,
								name:'龙井',
								imgUrl:'./images/lj.jpeg'
							},
							{
								id:1,
								name:'黄山毛峰',
								imgUrl:'./images/hsmf.jpeg'
							},
							{
								id:3,
								name:'碧螺春',
								imgUrl:'./images/blc.jpeg'
							},
							{
								id:4,
								name:'雀舌',
								imgUrl:'./images/qs.jpeg'
							},
							{
								id:5,
								name:'太平猴魁',
								imgUrl:'./images/tphk.jpeg'
							},
							{
								id:6,
								name:'珍稀白茶',
								imgUrl:'./images/zxbc.jpeg'
							},
							{
								id:7,
								name:'六安瓜片',
								imgUrl:'./images/lagp.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:4,
				name:'乌龙',
				data:[
					{
						//二级
						id:4,
						name:'乌龙',
						list:[
						//三级
							{
								id:0,
								name:'永春佛手',
								imgUrl:'./images/ycfs.jpeg'
							},
							{
								id:1,
								name:'铁观音',
								imgUrl:'./images/tgy.jpeg'
							},
							{
								id:3,
								name:'武夷岩茶',
								imgUrl:'./images/wyyc.jpeg'
							},
							{
								id:4,
								name:'漳平水仙',
								imgUrl:'./images/zpsx.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:5,
				name:'红茶',
				data:[
					{
						//二级
						id:5,
						name:'红茶',
						list:[
						//三级
							{
								id:0,
								name:'英德红茶',
								imgUrl:'./images/ydhc.jpeg'
							},
							{
								id:1,
								name:'坦洋工夫',
								imgUrl:'./images/tygf.jpeg'
							},
							{
								id:3,
								name:'金骏眉',
								imgUrl:'./images/jjm.jpeg'
							},
							{
								id:4,
								name:'正山小种',
								imgUrl:'./images/zsxz.jpeg'
							},
							{
								id:5,
								name:'云南滇红',
								imgUrl:'./images/yndh.jpeg'
							},
							{
								id:6,
								name:'祁门红茶',
								imgUrl:'./images/qmhc.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:6,
				name:'白茶',
				data:[
					{
						//二级
						id:6,
						name:'白茶',
						list:[
						//三级
							{
								id:0,
								name:'白牡丹',
								imgUrl:'./images/bmd.jpeg'
							},
							{
								id:1,
								name:'牡丹王',
								imgUrl:'./images/mdw.jpeg'
							},
							{
								id:3,
								name:'白毫银针',
								imgUrl:'./images/bhyz.jpeg'
							},
							{
								id:4,
								name:'寿眉',
								imgUrl:'./images/sm.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:7,
				name:'普洱',
				data:[
					{
						//二级
						id:7,
						name:'普洱',
						list:[
						//三级
							{
								id:0,
								name:'生茶',
								imgUrl:'./images/sc.jpeg'
							},
							{
								id:1,
								name:'熟茶',
								imgUrl:'./images/shuc.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:8,
				name:'花茶',
				data:[
					{
						//二级
						id:8,
						name:'花茶',
						list:[
						//三级
							{
								id:0,
								name:'茉莉花茶',
								imgUrl:'./images/mlhc.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:9,
				name:'茶具',
				data:[
					{
						//二级
						id:9,
						name:'茶具',
						list:[
						//三级
							{
								id:0,
								name:'茶宠',
								imgUrl:'./images/cc.jpeg'
							},
							{
								id:1,
								name:'紫砂壶',
								imgUrl:'./images/zsh.jpeg'
							},
							{
								id:2,
								name:'建盏',
								imgUrl:'./images/jz.jpeg'
							},
							{
								id:3,
								name:'功夫茶具',
								imgUrl:'./images/gfcj.jpeg'
							},
							{
								id:4,
								name:'茶具配件',
								imgUrl:'./images/cjpj.jpeg'
							},
							{
								id:5,
								name:'主人杯',
								imgUrl:'./images/zrb.jpeg'
							},
							{
								id:6,
								name:'干泡茶具',
								imgUrl:'./images/gpcj.jpeg'
							},
							{
								id:7,
								name:'旅行茶具',
								imgUrl:'./images/lxcj.jpeg'
							},
							{
								id:8,
								name:'整套茶具',
								imgUrl:'./images/ztcj.jpeg'
							},
							{
								id:9,
								name:'茶盘',
								imgUrl:'./images/cp.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:10,
				name:'手艺',
				data:[
					{
						//二级
						id:10,
						name:'手艺',
						list:[
						//三级
							{
								id:0,
								name:'根雕',
								imgUrl:'./images/gd.jpeg'
							}
						]
					}
				]
			},
		]
	})
		
})

// 查询商品id的接口
router.get('/api/goods/id',function(req,res,next){
	let id = req.query.id
	let yj = 'select * from goods_list where id = '+id+''
	connection.query(yj, function(error, results){
		if(error) throw error
		res.json({
			code: 200,
			data: results[0]
		})
	})
})

// 查询商品数据接口
router.get('/api/goods/goodsList',function(req,res,next){
	//前端给后端的数据
	let [searchName,orderName] = Object.keys(req.query);
	let [name,order] = Object.values(req.query);

	connection.query('select * from goods_list where name like "%'+name+'%" order by '+orderName+' '+order+'',function(error,results){
		res.send({
			code:0,
			data:results
		})
	})
})

// 首页铁观音的数据
router.get('/api/index_list/2/data/1', function(req, res, next) {
	res.send({
		code:0,
		data:[
			{
				id:1,
				type:'adList',
				data:[
					{
						id:1,
						imgUrl:'./images/tgy.jpeg'
					},
					{
						id:2,
						imgUrl:'./images/tgy.jpeg'
					}
				]
			},
			{
				id:1,
				type:'iconsList',
				data:[
					{
						id:1,
						title:'自饮茶',
						imgUrl:'./images/icons1.png'
					},
					{
						id:2,
						title:'茶具',
						imgUrl:'./images/icons2.png'
					},
					{
						id:3,
						title:'茶礼盒',
						imgUrl:'./images/icons3.png'
					},
					{
						id:4,
						title:'领福利',
						imgUrl:'./images/icons4.png'
					},
					{
						id:5,
						title:'官方验证',
						imgUrl:'./images/icons5.png'
					}
				]
			},
			{
				id:3,
				type:'likeList',
				data:[
					{
						id:1,
						imgUrl:'./images/like.jpeg',
						name:'建盏茶具套装 红色芝麻毫 12件套',
						price:299
					},
					{
						id:2,
						imgUrl:'./images/like.jpeg',
						name:'建盏茶具套装 红色芝麻毫 12件套',
						price:299
					},
					{
						id:3,
						imgUrl:'./images/like.jpeg',
						name:'建盏茶具套装 红色芝麻毫 12件套',
						price:299
					}
				]
			}
			
		]
	})
})

// 首页大红袍的数据
router.get('/api/index_list/1/data/1', function(req, res, next) {
	res.send({
		code:0,
		data:[
			{
				id:1,
				type:'adList',
				data:[
					{
						id:1,
						imgUrl:'./images/dhp.jpeg'
					},
					{
						id:2,
						imgUrl:'./images/dhp.jpeg'
					}
				]
			},
			{
				id:2,
				type:'likeList',
				data:[
					{
						id:1,
						imgUrl:'./images/like.jpeg',
						name:'建盏茶具套装 红色芝麻毫 12件套',
						price:299
					},
					{
						id:2,
						imgUrl:'./images/like.jpeg',
						name:'建盏茶具套装 红色芝麻毫 12件套',
						price:299
					},
					{
						id:3,
						imgUrl:'./images/like.jpeg',
						name:'建盏茶具套装 红色芝麻毫 12件套',
						price:299
					}
				]
			}
			
		]
	})
})

// 首页推荐的数据
router.get('/api/index_list/0/data/1', function(req, res, next) {
	res.send({
		code:0,
		data:{
			topBar:[
				{id:0,label:'推荐'},
				{id:1,label:'大红袍'},
				{id:2,label:'铁观音'},
				{id:3,label:'绿茶'},
				{id:4,label:'普洱'},
				{id:5,label:'茶具'},
				{id:6,label:'花茶'},
			],
			data:[
				//这是swiper
				{
					id:0,
					type:'swiperList',
					data:[
						{id:0,imgUrl:'./images/swiper1.jpeg'},
						{id:1,imgUrl:'./images/swiper2.jpeg'},
						{id:3,imgUrl:'./images/swiper3.jpeg'}
					]
				},
				//这是icons
				{
					id:1,
					type:'iconsList',
					data:[
						{
							id:1,
							title:'自饮茶',
							imgUrl:'./images/icons1.png'
						},
						{
							id:2,
							title:'茶具',
							imgUrl:'./images/icons2.png'
						},
						{
							id:3,
							title:'茶礼盒',
							imgUrl:'./images/icons3.png'
						},
						{
							id:4,
							title:'领福利',
							imgUrl:'./images/icons4.png'
						},
						{
							id:5,
							title:'官方验证',
							imgUrl:'./images/icons5.png'
						}
					]
				},
				//爆款推荐
				{
					id:3,
					type:'recommendList',
					data:[
						{
							id:1,
							name:'龙井1號铁罐250g',
							content:'鲜爽甘醇 口粮首选',
							price:'68',
							imgUrl:'./images/recommend1.jpeg'
						},
						{
							id:2,
							name:'龙井1號铁罐250g',
							content:'鲜爽甘醇 口粮首选',
							price:'68',
							imgUrl:'./images/recommend2.jpeg'
						}
					]
				},
				//猜你喜欢
				{
					id:4,
					type:'likeList',
					data:[
						{
							id:1,
							imgUrl:'./images/like1.jpeg',
							name:'建盏茶具套装 红色芝麻毫 12件套',
							price:299
						},
						{
							id:2,
							imgUrl:'./images/like2.jpeg',
							name:'建盏茶具套装 红色芝麻毫 12件套',
							price:299
						},
						{
							id:3,
							imgUrl:'./images/like3.jpeg',
							name:'建盏茶具套装 红色芝麻毫 12件套',
							price:299
						},
						{
							id:4,
							imgUrl:'./images/like4.jpeg',
							name:'建盏茶具套装 红色芝麻毫 12件套',
							price:299
						},
						{
							id:5,
							imgUrl:'./images/like5.jpeg',
							name:'建盏茶具套装 红色芝麻毫 12件套',
							price:299
						},
						{
							id:6,
							imgUrl:'./images/like6.jpeg',
							name:'建盏茶具套装 红色芝麻毫 12件套',
							price:299
						}
					]
				}	
			]
		}
	})
})

module.exports = router
