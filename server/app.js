const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const indexRouter = require('./routes/web/index');
const accountRouter = require('./routes/api/account');

const app = express();
const session = require('express-session')
const MongoStore = require('connect-mongo')
const { DBHOST, DBPORT, DBNAME } = require('./mongoose/config/config')

app.use(session({
  name: 'sid',
  secret: 'gdut',//加盐算法
  saveUninitialized: false,//是否为每次请求都设置一个cookie来存储session的id
  resave: true,
  store: MongoStore.create({
    mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
  }),
  cookie: {
    sameSite: 'None',
    path: '/api',
    httpOnly: true,
    maxAge: 1000 * 60 * 5 //控制sessionID过期时间
  }
}))
// 针对 ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// 针对请求体
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 针对请求体
app.use(cookieParser());

// 针对静态资源文件夹
app.use(express.static(path.join(__dirname, 'public')));

// 处理跨域问题
app.use((req, res, next) => {
  // let origin = http://127.0.0.1:5500/
  res.header({
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
    'Access-Control-Allow-Headers': "Content-Type",
    "Access-Control-Allow-Credentials": true,
  })
  next()
})


// 针对路由
// app.use('/', indexRouter);
app.use('/api', accountRouter);

// 处理404
app.use(function (req, res, next) {
  next(createError(404));
});

// 处理错误
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
