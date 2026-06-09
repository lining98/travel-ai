import express from 'express';
import travelService from '../services/travelService.js';
import { createStreamRespose } from '../utils/streamUtils.js';

const router = express.Router();

router.post('/recommend', async (req, res) => {
  console.log(req.body);
  const { city, budget, days } = req.body;
  if (!city || !budget || !days) {
    return res.status(400).json({
      success: false,
      error: '缺少必要参数，请提供city、budget和days',
    });
  }
  const result = await travelService.recommend(city, budget, days);
  return res.json(result);
});

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({
      success: false,
      error: '缺少必要参数，请提供message',
    });
  }

  // 对SSE流式接口返回进行处理
  const stream = createStreamRespose(res);

  // 调用服务层的chat方法，传入用户消息和流式回调函数
  const result = await travelService.chat(message, (chunk) => {
    stream.send({ type: 'chunk', content: chunk });
  });

  //发送完成通知
  stream.send({ type: 'complete', data: result });
  stream.end();
});

export default router;
