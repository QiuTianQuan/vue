var express = require('express')
var app = express();
var http = require('http').Server(app);
var db = require('./db.js')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var router = express.Router()
var crypto = require('crypto');
var md5 = crypto.createHash('md5');
var xss = require('xss');
var port = 8806;


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Credentials","true")
    next();
});

app.use(cookieParser());
app.use(express.static('./'))

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.post('/register', function(req, res) {
    var name = xss(req.body.name) ;
    var psd = xss(req.body.psd) ;
    var user = {
        username: name,
        password: psd
    };
    db.query('select * from forum_user where username = ?', name, function(err, rs) {
        if (err) throw err;
        else {
            if (rs.length>0){
                res.send({err:1,msg:'该用户已存在'});
                    res.end();
            }else{
                db.query('insert into forum_user set ?', user, function(err, rs) {
                    if (err) throw err;
                    else
                    res.send({err:0,msg:'注册成功'});
                })
            }
        }
    })
})

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

function verifyuser(userid,tmppsd,callback) {
    var flag
  db.query("select * from forum_user where userid = ? and tmppsd = ? and expireDate > ?", [userid,tmppsd,Date.now()],function(err, rs) {
        
        if(rs.length==1){
            flag = 1
        }else{   
           flag = 0
        }
        callback(flag);
    });  
}




app.post('/login', function(req, res) {
    var name = xss(req.body.name);
    var psd = xss(req.body.psd);
    var selectSQL = "select * from forum_user where username = ? and password = ? ";
    db.query(selectSQL,[name,psd], function(err, rs) {
        if (err) {
            res.send({ err: 1, msg: '链接数据库失败' });
            res.end();
        } else {
            if (rs.length == 0) {
                res.send({ err: 1, msg: '该用户不存在' });
                res.end();
                console.log(rs);
            } else {
                if (rs[0].password == psd) {
                    var expireTime = 60*60*24*7;
                    res.cookie('userID',rs[0].userid,{maxAge:1000*expireTime}); 
                    var tmppsd = cryptPwd(Date.now()+psd)
                    res.cookie('tmppsd',tmppsd,{maxAge:1000*expireTime});
                    res.send({ err: 0,msg: '登录成功' });
                    db.query("UPDATE forum_user set tmppsd=? , expireDate=? where userid=?",[tmppsd,Date.now()+1000*expireTime,rs[0].userid],function(err, rs) {
                        if (err) throw err;
                        else {
                            console.log ('cookieOK')
                            }
                    })
                    res.end();
                    console.log(rs);
                    console.log('OK');
                } else {
                    res.send({ err: 1, msg: '用户名或密码错误' });
                    res.end();
                }
            }
        }

    })
})

http.listen(port, function() {
            console.log('listening on ' + port);
        });

app.get('/getlist',function(req,res){
    var selectSQL = 
    'SELECT\
	article.id AS aid,\
	article.pid AS pid,\
	article.art_title AS title,\
	article.art_creatTime AS posttime,\
	art_user_id,\
	( SELECT COUNT( id ) FROM article WHERE article.pid = aid ) AS num ,\
	( SELECT forum_user.username FROM forum_user WHERE forum_user.userid = article.art_user_id ) AS nicename \
FROM\
	article WHERE article.pid = 0'
    db.query(selectSQL,function(err,rs){
        res.send({rs});
    })
})


app.get('/getThread',function(req,res){
    var id = xss(req.query.id);
    var selectSQL = "SELECT  article.pid as pid , article.art_title  as title , article.art_content as content ,article.art_creatTime as posttime,(SELECT forum_user.username from forum_user WHERE forum_user.userid = article.art_user_id) as nicename FROM article  where article.pid = ? or  article.id = ?"
    db.query(selectSQL,[id,id],function(err,rs){
        res.send({rs});
    })
})

app.post('/sendPost',function(req,res){
    var title = xss(req.body.title);
    var content = xss(req.body.content);
    verifyuser(req.cookies.userID,req.cookies.tmppsd,isok);
    function isok(flag){
    if(flag==0){
        res.send({err:1,msg:"校验失败，请重新登录"})
    }
    if(flag==1){

        db.query("insert into article(pid,art_user_id,art_title,art_creatTime,art_content) values (?,?,?,?,?)",[0,req.cookies.userID,title,Date.now(),content],function(err,rs){
            if (err) throw err;
        else {
            res.send({err:0,msg:"发帖成功！"})
        }
        })
    }
   }
})

app.post('/sendComment',function(req,res){
    var id = xss(req.body.id);
    var content = xss(req.body.content);
    verifyuser(req.cookies.userID,req.cookies.tmppsd,isok);
    function isok(flag){
    if(flag==0){
        res.send({err:1,msg:"校验失败，请重新登录"})
    }
    if(flag==1){

        db.query("insert into article(pid,art_user_id,art_creatTime,art_content) values (?,?,?,?)",[id,req.cookies.userID,Date.now(),content],function(err,rs){
            if (err) throw err;
        else {
            res.send({err:0,msg:"发送评论成功！"})
        }
        })
    }
   }
})


app.get('/getMyCommentsInfo',function(req,res){
   verifyuser(req.cookies.userID,req.cookies.tmppsd,isok);
    function isok(flag){
    if(flag==0){
        res.send({err:1,msg:"校验失败，请重新登录"})
    }
    if(flag==1){
        db.query("select * from article where art_user_id = ? and pid <> 0",req.cookies.userID,function(err,rs){
            res.send({rs});
        })
    }
   }
})

app.get('/getMyInfo',function(req,res){
    verifyuser(req.cookies.userID,req.cookies.tmppsd,isok);
     function isok(flag){
     if(flag==0){
         res.send({err:1,msg:"校验失败，请重新登录"})
     }
     if(flag==1){
         db.query("select username from forum_user where userid = ? ",req.cookies.userID,function(err,rs){
             res.send({rs});
         })
     }
    }
 })


 app.get('/getMyPostInfo',function(req,res){
    verifyuser(req.cookies.userID,req.cookies.tmppsd,isok);
     function isok(flag){
     if(flag==0){
         res.send({err:1,msg:"校验失败，请重新登录"})
     }
     if(flag==1){
         db.query("select * from article where art_user_id = ? and pid = 0",req.cookies.userID,function(err,rs){
             res.send({rs});
         })
     }
    }
 })
 