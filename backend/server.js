//필요한 모듈 가져오기
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

//Express 서버 생성
const app = express();

//JSON 형태로 오는 요청의 본문을 해석할 수 있도록 등록
app.use(bodyParser.json());

//DB Table 생성
db.pool.query(`CREATE TABLE lists (
	id INTEGER AUTO_INCREMENT,
	value TEXT,
	PRIMARY KEY (id)
	)`, (err, results, fields) => {
		console.log('results', results)
	}
);

//DB Lists 테이블에 있는 모든 데이터를 frontend 서버로 전달
app.get('/api/values', function(req, res, next) {
	db.pool.query(`SELECT * FROM lists;`,
		(err, results, fields) => {
			if (err)
				return res.status(500).send(err)
			else
				return res.json(results)
		}
	)
});

//Client에서 입력한 값을 DB Lists 테이블에 입력
app.post('/api/value', function(req, res, next) {
	db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}");`,
		(err, results, fields) => {
			if (err)
				return res.status(500).send(err)
			else
				return res.json({ success: true, value: req.body.value})
		}
	)
});

//Express 서버를 5000 포트로 Open
app.listen(5000, () => {
	console.log("앱이 5000 포트에서 시작되었습니다.");
});