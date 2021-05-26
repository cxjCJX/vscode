var express = require('express');
var router = express.Router();
let mysql = require('mysql')
/* GET home page. */


let db = mysql.createConnection({
  host:"127.0.0.1",
  port:3306,
  user:'root',
  password:'123456',
  database:"cjx"
})
// db.connect((err,result) =>{
//   if(err) throw err;
//   console.log("Mysql 连接成功");
// })


router.get('/', function(req, res, next) {
  res.render('first');
});
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.get('/MAIN', function(req, res, next) {
  res.render('MAIN');
});
router.get('/index', function(req, res, next) {
  res.render('index');
});
router.get('/owen', function(req, res, next) {
  res.render('owen');
});

// router.post('/login',(req,res) =>{
//   res.render('two')
// })

// router.post('/register',(req,res)=>{
//   res.render('index')
// })

// router.post('/index',(req,res)=>{
//   res.render('register')
// })

// // router.post('/two',(req,res)=>{
// //   res.render('archive')
// // })

// router.post('/archive',(req,res)=>{
//   res.render('two')
// })
// // router.post('/two',(req,res)=>{
// //   res.render('category')
// // })
// router.post('/category',(req,res)=>{
//   res.render('two')
// })
// router.post('/contact',(req,res)=>{
//   res.render('two')
// })
// // router.post('/two',(req,res)=>{
// //   res.render('contact')
// // })
// router.post('/single-blog',(req,res)=>{
//   res.render('two')
// })
// // router.post('/two',(req,res)=>{
// //   res.render('single-blog')
// // })
// router.post('/elements',(req,res)=>{
//   res.render('two')
// })
// router.post('/two',(req,res)=>{
//   res.render('elements')
// })

router.post('/index',function(req,res){
  let body = req.body
  db.query('select * from demo',function(err,result){
    if(err){
      console.log('select is fail' + err);
      return
    }
    let ok = false
    if(Array.from(result).length === 0){
      ok = true
    }
    for(i of result){
      if(i.email === body.email){
        ok = false
        break
      }else{
        ok = true
      }
    }
    if(ok){
      db.query('insert into demo values(null,?,?,?)',[body.name,body.email,body.password],function(err,result){
        if(err){
          console.log('insert is fail' + err);
          return
        }
        res.render('index')
      })
    }else{
      res.setHeader('Content-Type','text/HTML;charset=utf-8')
      res.end('<h1><a> href = "/">用户名已存在，点击重新注册</a></h1>')
    }
  })
})

router.post('/MAIN',(req,res)=>{
  let body = req.body
  db.query('select * from demo',function (err,result){
    if(err){
      console.log('select is fail' + err);
      return
    }
    let ok = false
    for(i of result){
      if( i.email === body.email){
        ok = true
        break
      }else{
        ok = false
      }
    }
    if(ok){
      res.render('MAIN')
    }else{
      res.setHeader('Content-Type','text/HTML;charset=utf-8')
      res.end('<h1><a> href = "/">登录信息有误，点击重新登录</a></h1>')
    }
  })
})


module.exports = router;