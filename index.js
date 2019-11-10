'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
var fs = require("fs");

function read(f) {
  return fs.readFileSync(f).toString();
}
function include(f) {
  eval.apply(global, [read(f)]);
}
include('./menu.js');

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
  
  if(input.startsWith('http')){
    return;
  }
  var reply = '有什麼問題問我，請輸入關鍵字：\n行程表、行程、想去、GO、想吃、EAT、扣扣、成員';

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
      reply = '早上到原宿站吃bills，散開逛表參道，回到bills集合去竹下通，回到原宿吃魚米壽司，接著去池袋放風，分散逛看想幾點回去就幾點回去';
    }else if(input === '6日行程'){
      reply = '迪士尼一日游，搭JR轉車到舞濱站';
    }else if(input === '7日行程'){
      reply = '一早出發去吉祥寺逛，預計2點逛吉卜力美術館，剩下時間自由行，若太多時間可自行解散逛';
    }else if(input === '8日行程'){
      reply = '回程日直接搭skyliner從日暮里直達成田機場，搭車時間到之前自由活動';
    }
  }else if(input.includes('普普')){
    switch (input) {
      case '普普-AQUA CITY':
          reply = 'https://www.bigfang.tw/blog/post/aquacity-odaiba';
          break;
      case '普普-台場購物廣場':
          reply = 'https://tw.bring-you.info/diver-city-tokyo-plaza';
      　  break;
      case '普普-大江戶溫泉物語':
          reply = 'https://mimihan.tw/ooedoonsen/';
      　  break;
      case '普普-舊銀座':
          reply = 'https://boo2k.com/archives/67489';
      　  break;
      case '普普-雲場池':
          reply = 'https://blog.andrewplus.com/2019/02/KumobaPond.html';
      　  break;
      case '普普-輕井澤Outlet':
          reply = 'https://www.walkerland.com.tw/japanwalker/notes/view/729?page=full';
      　  break;
      case '普普-芝櫻祭':
          reply = 'https://yoke918.com/shibazakura/';
      　  break;
      case '普普-音樂之森':
          reply = 'https://yoke918.com/music/';
      　  break;
      case '普普-忍野八海':
          reply = 'http://www.dribs-drabs.com/blog/post/459894340-%E6%97%85%E8%A1%8C-%7C-%E6%97%A5%E6%9C%AC%E5%BF%8D%E9%87%8E%E5%85%AB%E6%B5%B7-%E6%B2%B3%E5%8F%A3%E6%B9%96%E6%99%AF%E9%BB%9E-%E5%AF%8C%E5%A3%AB%E5%B1%B1%E4%B8%8B%E7%BE%8E';
      　  break;
      case '普普-阿美橫町':
          reply = 'https://tw.bring-you.info/ame-yoko';
      　  break;
      case '普普-多慶屋':
          reply = 'https://tokyo.letsgojp.com/archives/328552';
      　  break;
      case '普普-恩賜公園':
          reply = 'https://b19890528.pixnet.net/blog/post/119657256-%E3%80%90%E6%9D%B1%E4%BA%AC%E6%97%85%E9%81%8A%E3%80%91%E4%B8%8A%E9%87%8E%E6%81%A9%E8%B3%9C%E5%85%AC%E5%9C%92%E3%80%82';
      　  break;
      case '普普-谷中銀座':
          reply = 'https://matcha-jp.com/tw/4597';
      　  break;
      case '普普-井之頭公園':
          reply = 'https://tokyo.letsgojp.com/archives/81607';
      　  break;
      case '普普-三鷹美術館':
          reply = 'https://alina00.com/ghibli-museum/';
      　  break;
      case '普普-SUN ROAD':
          reply = 'https://tw.bring-you.info/kichijoji';
      　  break;
      case '普普-高圓寺商店街':
          reply = 'https://www.tsunagujapan.com/zh-hant/tokyo-koenji-walking-map/';
      　  break;
      case '普普-明治神宮':
          reply = 'https://tokyo.letsgojp.com/archives/52391';
      　  break;
      case '普普-表參道':
          reply = 'https://blog.hotelscombined.com.tw/%E6%97%A5%E6%9C%AC-%E5%8E%9F%E5%AE%BF-%E8%A1%A8%E5%8F%83%E9%81%93-%E5%BF%85%E5%90%83%E5%BF%85%E9%80%9B-%E6%94%BB%E7%95%A5/';
      　  break;
      case '普普-原宿全攻略':
          reply = 'https://udn.com/news/story/6984/3547907';
      　  break;
      case '普普-竹下通商店街':
          reply = 'https://tokyo.letsgojp.com/archives/91804';
      　  break;
      default:
          reply = '普普不認識這個地方喔';
      }
  }else if(input.includes('清單')){
    switch(input){
      case '願望':
          return client.replyMessage(event.replyToken, wishList);
          break;
      case '清單-台場':
          return client.replyMessage(event.replyToken, odaibaList);
          break;
      case '清單-輕井澤':
          return client.replyMessage(event.replyToken, karuizawaList);
          break;
      case '清單-河口湖':
          return client.replyMessage(event.replyToken, kawaguchikoList);
          break;
      case '清單-上野':
          return client.replyMessage(event.replyToken, uenoList);
          break;
      case '清單-秋葉原':
          reply = 'https://matcha-jp.com/tw/3106';
          break;
      case '清單-淺草合羽橋':
          reply = 'https://aniseblog.tw/57495';
          break;
      case '清單-吉祥寺':
          return client.replyMessage(event.replyToken, kichijojiList);
          break;
      case '清單-迪士尼':
          reply = 'https://www.klook.com/zh-TW/blog/top-tip-disney-land-tokyo/';
          break;
      case '清單-池袋':
          reply = 'https://www.funtime.com.tw/blog/funtime/%E3%80%90%E6%9D%B1%E4%BA%AC%E6%B1%A0%E8%A2%8B%E6%94%BB%E7%95%A5%E3%80%91%E8%B6%85%E5%BC%B7%E6%B1%A0%E8%A2%8B%E6%87%B6%E4%BA%BA%E5%8C%85%EF%BC%8C%E7%8E%A9%E6%B1%A0%E8%A2%8B%E4%B8%80%E7%AF%87%E6%90%9E';
          break;
      case '清單-涉谷':
          reply = 'https://matcha-jp.com/tw/3073';
          break;
      case '清單-原宿':
          return client.replyMessage(event.replyToken, harajukuList);
          break;
      case '清單-新宿':
          reply = 'https://tokyo.letsgojp.com/archives/82094';
          break;
      default:
        reply = '沒有這個清單';
    }
  }else if(input === '成員'){
    reply = '阿嘉、阿婷，房號xxx\n章爸、章媽，房號xxx\n薛媽，房號xxx\n阿和、啾姊，房號xxx\n阿鈞、阿嬋，房號xxx\n阿鳳、阿如，房號xxx';
  }else if(input === '想去' || input.toUpperCase() === 'GO'){
      return client.replyMessage(event.replyToken, wishList);
  }else if(input === '想吃' || input.toUpperCase() === 'EAT'){
      return client.replyMessage(event.replyToken, eatList);
  }else if(input === '扣扣'){
    return client.replyMessage(event.replyToken, coldList);
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
