import express from 'express';
import travelRouter from './routes/travel.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

//CORS中间件配置
app.use(cors());
//中间件解析请求体，ajax请求
app.use(express.json());
//中间件解析请求体，form表单请求
app.use(express.urlencoded({ extended: true }));

// 创建一个心跳接口
app.post('/api/heartbeat', (req, res) => {
  console.log(req.query);
  console.log(req.body);
  res.json({
    message: '服务正常运行',
    timestamp: new Date().toISOString(),
  });
});

// 创建一个中间件
app.use('/api/travel', travelRouter);

app.listen(port, () => {
  console.log(`服务地址： http://localhost:${port}`);
});
