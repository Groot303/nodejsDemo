const express = require('express');
const router = express.Router();

const axios = require('axios')

// 处理 session 相关
const session = require('express-session')
const MongoStore = require('connect-mongo')

// 处理日期
const moment = require('moment');
const AccountModel = require('../../mongoose/models/AccountModel');
const UserModel = require('../../mongoose/models/UserModel');

const { DBHOST, DBPORT, DBNAME } = require('../../mongoose/config/config')
// router.use(session({
//     name: 'sid',
//     secret: 'gdut',//加盐算法
//     saveUninitialized: false,//是否为每次请求都设置一个cookie来存储session的id
//     resave: true,
//     store: MongoStore.create({
//         mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
//     }),
//     cookie: {
//         httpOnly: true,
//         maxAge: 1000 * 60 * 5 //控制sessionID过期时间
//     }
// }))

/* 记账本列表 */
router.get('/account', async function (req, res, next) {
    // let accounts = db.get('accounts').value()

    // 读取数据
    try {
        let data = await AccountModel.find().sort({ time: -1 }).exec()
        res.json({
            code: "0000",
            msg: "读取成功",
            data
        })
    } catch (error) {
        res.json({
            code: "1001",
            msg: "读取成功"
        })
    }

});

// 添加记录
router.post('/account', async (req, res) => {
    /** 使用lowdb
     * let id = shortid.generate()
     * 把数据写入数据库 
     * db.get('accounts').unshift({ id: id, ...req.body }).write()
     */

    // 使用mongodb, 插入数据
    try {
        console.log(req.body.time)
        await AccountModel.create({
            ...req.body,
            time: moment(req.body.time).toDate()
        })
        // res.send("插入成功")
    } catch (error) {
        res.status(500).send("插入失败")
        return
    }

    res.render('success', { msg: '添加成功', url: '/account' })
})

// 注册
router.post('/reg', async (req, res) => {
    try {
        console.log(req.body)
        // 插入数据库
        let data = await UserModel.create(req.body)
        // console.log(req.session.userName)
        res.json({
            code: 200,
            msg: '注册成功',
            data: data
        })

    } catch (error) {
        console.log(error)
        res.json({
            code: 500,
            msg: '注册失败'
        })
    }
})

// 登录

router.post('/login', async (req, res) => {
    try {

        let { userName, password } = req.body
        let data = await UserModel.findOne({ userName: userName, password: password })
        if (!data) {
            return res.json({
                code: 500,
                msg: '账号密码错误'
            })
        } else {
            console.log(data.userName)
            req.session.userName = data.userName
            req.session._id = data._id
            console.log(req.session)

            res.json({
                code: 200,
                msg: "登录成功",
                data: req.session
            })

        }

    } catch (error) {
        console.log(error)
        res.json({
            code: 500,
            msg: '登录失败',
        })
    }

})

// 获取英雄列表

router.get('/heroList', async (req, res) => {
    // console.log(req.headers)
    // console.log(req.session)
    // if (!req.session.userName) {
    //     res.json({
    //         code: 500,
    //         msg: "你还未登录，请先登录"
    //     })
    // } else 
    try {
        let data = await axios.get('https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js?v=06')
        res.json({
            code: 200,
            msg: '获取成功',
            data: data.data
        })
    } catch (error) {
        console.log(error)
    }

})

module.exports = router;
