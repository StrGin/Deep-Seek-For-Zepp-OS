import { log, log as Logger } from "@zos/utils";
import { BasePage } from "@zeppos/zml/base-page";
import { push } from "@zos/router";
import { LocalStorage } from '@zos/storage';
import { createWidget , widget , event , prop , text_style , align , redraw , getTextLayout , deleteWidget,showToast } from "@zos/ui";
import { getText } from '@zos/i18n'
import { parseConversation } from "../utils/utils";
function createGroup() {
  return createWidget(widget.GROUP, {
    x: 0,
    y: 0,
    w: 480,
    h: 480,
  })
}
function createGroup2(x,y) {
  return createWidget(widget.GROUP, {
    x,
    y,
    w: 60,
    h: 60,
  })
}
const localStorage = new LocalStorage();
const logger = Logger.getLogger("fetch_api");
const app = getApp();

let loadingWidget;
let isLoading = false;
let lastMessageNum = localStorage.getItem('lastMessageNum', 'null'); // 上次是哪个聊天
let messages = localStorage.getItem('messages', []); // 消息列表
let messagesTitle = localStorage.getItem('messagesTitle', ['对话1']); // 消息标题
let nowReadPage = localStorage.getItem('nowReadPage', 0); // 当前阅读的页面
let messageGroup = [];
let addGroup = createGroup2(398,127);
let listGroup = createGroup2(413,190);
let aboutGroup = createGroup2(398,253);
let writeGroup = createGroup();
let temp = lastMessageNum
if (lastMessageNum == 'null') temp = 0
const dataList = messages[temp];
function createMessages(resu) {
  try {
    let result = parseConversation(resu)[nowReadPage];
    console.log(JSON.stringify(result));
    
    let yOffset = 53;
    let a = 0
    
    for (let i = 0; i < result.length; i++) {
      const messageText = result[i];
      const textLayout = getTextLayout(messageText, {
        text_size: 20,
        text_width: 278,
        wrapped: 1 ,
        rows_max: 8
      });
      const xPosition = i == 0 ? 350 - textLayout.width - 20 : 104;
      const align1 = i == 0 ? align.RIGHT : align.LEFT;
      messageGroup[a] = createWidget(widget.FILL_RECT, {
        x: xPosition - 10,
        y: yOffset,
        w: textLayout.width + 20, 
        h: textLayout.height >= 236 ? 256 : textLayout.height + 20, 
        color: 0x101010,
        radius: 20
      });
      messageGroup[a].addEventListener(event.CLICK_UP, () => {
        push({url: 'page/TextView', params: messageText })
      })
      a++
      messageGroup[a] = createWidget(widget.IMG, {
        x: i == 0 ? 348 : 38,
        y: i == 0 ? 58 : yOffset,
        w: 50,
        h: 50,
        auto_scale: true,
        src: i == 0 ? 'userIcon.png' : 'icon.png'
      })
      a++
      messageGroup[a] = createWidget(widget.TEXT, {
        x: xPosition,
        y: yOffset + 10,
        w: textLayout.width,
        h: textLayout.height >= 236 ? 236 : textLayout.height,
        text: textLayout.text,
        color: 0xffffff,
        text_size: 20,
        align_h: align1,
        text_style: text_style.WRAP
      });
      messageGroup[a].addEventListener(event.CLICK_UP, () => {
        push({url: 'page/TextView', params: messageText })
      })
      a++
      yOffset += textLayout.height + 30;
    }
  } catch (error) {
    localStorage.setItem('nowReadPage', 0);
    nowReadPage = localStorage.getItem('nowReadPage', 0);
  }
}
Page(
  BasePage({
    build() {
      addGroup.createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 60,
        h: 60,
        radius: 25,
        color: 0x101010
      })
      addGroup.createWidget(widget.IMG, {
        x: 8,
        y: 8,
        src: 'add.png'
      })
      addGroup.addEventListener(event.CLICK_UP, () => {
        push({url: 'page/Add'})
      })
      listGroup.createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 60,
        h: 60,
        radius: 25,
        color: 0x101010
      })
      listGroup.createWidget(widget.IMG, {
        x: 12,
        y: 12,
        src: 'list.png'
      })
      listGroup.addEventListener(event.CLICK_UP, () => {
        push({url: 'page/List'})
      })
      aboutGroup.createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 60,
        h: 60,
        radius: 25,
        color: 0x101010
      })
      aboutGroup.createWidget(widget.IMG, {
        x: 5,
        y: 4,
        src: 'about.png'
      })
      aboutGroup.addEventListener(event.CLICK_UP, () => {
        push({url: 'page/About'})
      })
      // let timeWidget = createWidget(widget.TEXT, {
      //   x: 206,
      //   y: 0,
      //   w: 71,
      //   h: 38,
      //   text_size: 26,
      //   text: new Date().toTimeString().match(/^(\d{2}:\d{2})/)[0],
      //   color: 0xFFFFFF
      // })
      // setInterval(() => {
      //   timeWidget.setProperty(prop.TEXT, new Date().toTimeString().match(/^(\d{2}:\d{2})/)[0])
      // })

      if (dataList && dataList.length > 0) {
        createMessages(dataList);
      }
      else {
        console.log('没有消息');
      }
      console.log('uiadshiuadshui',temp);
      
      createWidget(widget.TEXT, {
        x: 133,
        y: 0,
        w: 222,
        h: 35,
        text_size: 26,
        text: messagesTitle[temp],
        align_h: align.CENTER_H,
        text_style: text_style.ELLIPSIS,
        color: 0xDDDDDD
      })
      
      loadingWidget = createWidget(widget.IMG, {
        x: 30,
        y: 30,
        w: 120,
        h: 120,
        auto_scale: true,
        src: 'loadingWhite/animation_0.png'
      });
      loadingWidget.setProperty(prop.VISIBLE, false);
      if (!app._options.globalData.userInput) {} 
      else {
        this.fetchData(app._options.globalData.userInput);
        app._options.globalData.userInput = null
      }
      writeGroup.createWidget(widget.BUTTON, {
        x: 142,
        y: 380,
        w: 197,
        h: 55,
        radius: 30,
        normal_color: 0x4D6BFE,
        press_color: 0x4F6ECA,
        click_func: () => {
          push({  
            url: 'page/Board'
          })
        }
      });
      writeGroup.createWidget(widget.IMG, {
        x: 166,
        y: 391,
        src: 'write.png'
      })
      writeGroup.createWidget(widget.TEXT, {
        x: 217,
        y: 389,
        w: 105,
        h: 36,
        text_size: 25,
        color: 0xFFFFFF,
        text: getText('写点什么')
      })
      writeGroup.addEventListener(event.CLICK_UP, () => {
        push({  
          url: 'page/Board'
        })
      })
      let lastButton = createWidget(widget.IMG, {
        x: 105,
        y: 394,
        src: 'last.png'
      })
      let nextButton = createWidget(widget.IMG, {
        x: 362,
        y: 394,
        src: 'next.png'
      })
      lastButton.addEventListener(event.CLICK_UP, () => {
        if (nowReadPage == 0) {
          showToast({
            text: '已经是第一页了'
          })
          return;
        }
        for (let i = 0; i < messageGroup.length; i++) {
          deleteWidget(messageGroup[i]);
        }
        nowReadPage--;
        createMessages(dataList);
      })
      nextButton.addEventListener(event.CLICK_UP, () => {
        try {
          console.log(parseConversation(dataList)[nowReadPage + 1].length);
        } catch (e) {
          showToast({
            text: '已经是最后一页了'
          })
          return
        }
        
        for (let i = 0; i < messageGroup.length; i++) {
          deleteWidget(messageGroup[i]);
        }
        nowReadPage++;
        createMessages(dataList);
      })
    },
    onDestroy() {
      localStorage.setItem('lastMessageNum', temp);
      localStorage.setItem('nowReadPage', nowReadPage);
    },
    fetchData(input) {
      isLoading = true;
      this.startLoadingAnimation();
      let params = {
        prompt: input
      }
      if (lastMessageNum == 'null') {
        lastMessageNum = 0;
        localStorage.setItem('lastMessageNum', lastMessageNum);
      }
      if (messages.length > 0) {
        messages[lastMessageNum].push({
          role: "user",
          content: input
        })
        params.messages = messages[lastMessageNum]
      } else {
        messages.push([]);
        messages[lastMessageNum].push({
          role: "user",
          content: input
        })
      }

      this.request({
        method: "GET_DEEPSEEK",
        params
      })
        .then((data) => {
          isLoading = false;
          this.stopLoadingAnimation();

          logger.log("收到DeepSeek响应");
          const { result = {} } = data;
          const text = result.choices[0].message.content || "无返回内容";

            messages[lastMessageNum].push(
              {
                role: "assistant",
                content: text
              }
            )
            // if (messageGroup.length > 0) {
            //   for (let i = 0; i < messageGroup.length; i++) {
            //     deleteWidget(messageGroup[i]);
            //   }
            //   nowReadPage = messages[temp].length
            //   console.log(nowReadPage);
              
            //   createMessages(dataList);
            // }
            localStorage.setItem("messages", messages)
        })
        .catch((error) => {
          isLoading = false;
          this.stopLoadingAnimation();
          
          logger.error("请求失败:", error);
        });
    },
    simulateTyping(text, widget) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          widget.setProperty(prop.TEXT, text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 10); // 每个字符之间的延迟时间（毫秒）
    },
    startLoadingAnimation() {
      loadingWidget.setProperty(prop.VISIBLE, true);
      let index = 1;
      const interval = setInterval(() => {
        if (!isLoading) {
          clearInterval(interval);
          loadingWidget.setProperty(prop.VISIBLE, false);
          return;
        }
        loadingWidget.setProperty(prop.SRC, `loadingWhite/animation_${index}.png`);
        index = (index % 10) + 1;
      }, 20); // 每张图片之间的延迟时间（毫秒）
    },
    stopLoadingAnimation() {
      isLoading = false;
    }
  })
);
