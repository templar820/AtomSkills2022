import { Router } from 'express';

const router = Router();

router.get('/streaming', (req, res) => {

  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // flush the headers to establish SSE with client

  let counter = 0;
  let interValID = setInterval(() => {
    counter++;
    if (counter >= 10) {
      clearInterval(interValID);
      res.end(); // terminates SSE session
      return;
    }
    res.write(`data: ${JSON.stringify({num: counter})}\n\n`); // res.write() instead of res.send()
  }, 1000);

  // If client closes connection, stop sending events
  res.on('close', () => {
    console.log('client dropped me');
    clearInterval(interValID);
    res.end();
  });
});

export default router;
