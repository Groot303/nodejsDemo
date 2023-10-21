const express = require('express');
const router = express.Router();
const path = require('path')

// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')

// const adapter = new FileSync(__dirname + '/../data/db.json')
// const db = low(adapter)

// const shortid = require('shortid')

/* 注册页面 */
router.get('/', async (req, res) => {
  res.sendFile("html/reg.html", { root: 'public' })
})

router.get('/login', async (req, res) => {
  res.sendFile("html/login.html", { root: 'public' })

})

router.get('/account', async (req, res) => {
  res.sendFile("html/index.html", { root: 'public' })

})

// 添加记录
router.get('/account/create', function (req, res, next) {
  // res.sendFile(path.join(__dirname, "../../public/addAccount.html"))
  res.sendFile("html/addAccount.html", { root: 'public' })
});


module.exports = router;
