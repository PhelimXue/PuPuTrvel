'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(200).end();
    });
});

var mySchedule = {
  "type": "template",
  "altText": "無法顯示選單",
  "template": {
    "type": "carousel",
    "columns": [
      {
        "text": "4/25 - 4/27",
        "actions": [
          {
            "type": "message",
            "label": "4/25 (週六)",
            "text": "1日行程"
          },
          {
            "type": "message",
            "label": "4/26 (週日)",
            "text": "2日行程"
          },
          {
            "type": "message",
            "label": "4/27 (週一)",
            "text": "3日行程"
          }
        ]
      },
      {
        "text": "4/28 - 4/30",
        "actions":[
          {
            "type": "message",
            "label": "4/28 (週二)",
            "text": "4日行程"
          },
          {
            "type": "message",
            "label": "4/29 (週三)",
            "text": "5日行程"
          },
          {
            "type": "message",
            "label": "4/30 (週四)",
            "text": "6日行程"
          }
        ]
      },
      {
        "text": "5/1 - 5/2",
        "actions":[
          {
            "type": "message",
            "label": "5/1 (週五)",
            "text": "7日行程"
          },
          {
            "type": "message",
            "label": "5/2 (週六)",
            "text": "8日行程"
          },
          {
            "type": "message",
            "label": "none",
            "text": "none"
          }
        ]
      }
    ]
  }
};
var wishList = {
  "type": "template",
  "altText": "無法顯示選單",
  "template": {
    "type": "buttons",
    "text": "挑選你想去的範圍",
    "actions": [
      {
        "type": "message",
        "label": "台場",
        "text": "清單-台場"
      },
      {
        "type": "message",
        "label": "輕井澤",
        "text": "清單-輕井澤"
      }
    ]
  }
};

var odaibaList = {
  "type": "template",
  "altText": "無法顯示選單",
  "template": {
    "type": "buttons",
    "text": "台場景點",
    "actions": [
      {
        "type": "message",
        "label": "AQUA CITY",
        "text": "普普-AQUA CITY"
      },
      {
        "type": "message",
        "label": "台場購物廣場",
        "text": "普普-台場購物廣場"
      },
      {
        "type": "message",
        "label": "大江戶溫泉物語",
        "text": "普普-大江戶溫泉物語"
      }
    ]
  }
};
/*
*/
var itinerary = 'https://docs.google.com/document/d/1Whq9JfMWs7t5Oq3DtTQQY5vnlDAvGjw6zrnod1RBuLE/edit?usp=sharing';

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  var input = event.message.text;
  var reply = null;

  // 第一段貼行程
  if(input.includes('行程')){
    if(input === '行程'){
      return client.replyMessage(event.replyToken, mySchedule);
    }else if(input === '行程表'){
      reply = itinerary;
    }else if(input === '1日行程'){
      reply = '至機場先拿PASS卷，先買4/27富士回游到河口湖來回票，接著坐N\'EX到東京轉車到日暮里check-in後，帶著大家熟悉日暮里和上野';
    }else if(input === '2日行程'){
      reply = '一早出發輕井澤，坐公車去舊銀座吃午餐，下午逛雲場池，最後回到輕井澤outet直到回程';
    }else if(input === '3日行程'){
      reply = '到新宿站搭富士回游到河口湖，坐公車去看芝櫻季，注意時間來回';
    }else if(input === '4日行程'){
      reply = '上午逛上野阿美橫丁，中午左右到新橋站轉海鷗線(ゆりかもめ)到海濱公園站逛海灘走路到台場，或者直接到台場，逛AQUA CITY跟台場購物廣場，晚上去大江戶溫泉物語';
    }else if(input === '5日行程'){
      reply = '5';
    }else if(input === '6日行程'){
      reply = '6';
    }else if(input === '7日行程'){
      reply = '7';
    }else if(input === '8日行程'){
      reply = '8';
    }
  }else if(input.includes('普普')){
    if(input.includes('AQUA CITY')){
      reply = 'https://www.bigfang.tw/blog/post/aquacity-odaiba';
    }else if(input.includes('台場購物廣場')){
      reply = 'https://tw.bring-you.info/diver-city-tokyo-plaza';
    }else if(input.includes('大江戶溫泉物語')){
      reply = 'https://mimihan.tw/ooedoonsen/';
    }
    
  }else if(input.includes('清單')){
    if(input.includes('願望')){
      return client.replyMessage(event.replyToken, wishList);
    }else if(input.includes('台場')){
      return client.replyMessage(event.replyToken, odaibaList);
    }else if(input.includes('輕井澤')){
      
    }
  }else if(input === '成員'){
    reply = '阿嘉、阿婷，房號xxx\n章爸、章媽，房號xxx\n薛媽，房號xxx\n阿和、啾姊，房號xxx\n阿鈞、阿嬋，房號xxx\n阿鳳、阿如，房號xxx';
  }else if(input === '想去'){
      return client.replyMessage(event.replyToken, wishList);
  }

  // 組合最終文字
  const echo = { type: 'text', text: reply };
  // use reply API
  if(reply !== null){
    return client.replyMessage(event.replyToken, echo);
  }else{
    return;
  }
}


// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
