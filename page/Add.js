import { createWidget, widget, prop, event , text_style } from '@zos/ui';
import { LocalStorage } from '@zos/storage';
let localStorage = new LocalStorage();
import { push , back } from '@zos/router';
import { getText } from '@zos/i18n'
let messages = localStorage.getItem('messages', []); // 消息列表
let messagesTitle = localStorage.getItem('messagesTitle', ['对话1']); // 消息标题
console.log(messagesTitle);

function createGroup(x, y, w, h) {
  return createWidget(widget.GROUP, {
    x: x,
    y: y,
    w: w,
    h: h
  });
}

Page({
  onInit() {
    // 时间显示组件
    const timeWidget = createWidget(widget.TEXT, {
      x: 206,
      y: 0,
      w: 71,
      h: 38,
      text_size: 26,
      text: new Date().toTimeString().match(/^(\d{2}:\d{2})/)[0],
      color: 0xFFFFFF
    });

    setInterval(() => {
      timeWidget.setProperty(prop.TEXT, 
        new Date().toTimeString().match(/^(\d{2}:\d{2})/)[0]
      );
    }, 1000);

    let newTalk = createGroup(143, 39, 197, 55);
    // 主内容区域
    newTalk.createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 197,
        h: 55,
        radius: 30,
        color: 0x4D6BFE
    });
    newTalk.createWidget(widget.IMG, {
      x: 18,
      y: 5,
      auto_scale: true,
      w: 44.53,
      h: 44.53,
      src: 'add.png'
    });
    newTalk.createWidget(widget.TEXT, {
      x: 74,
      y: 9,
      w: 105,
      h: 36,
      text_size: 25,
      text: getText('新的对话'),
      color: 0xFFFFFF,
      text_style: text_style.ELLIPSIS
    })
    newTalk.addEventListener(event.CLICK_UP, () => {
        messages.push([]);
        messagesTitle.push('对话' + (messagesTitle.length + 1));
        localStorage.setItem('messages', messages);
        localStorage.setItem('messagesTitle', messagesTitle);
        localStorage.setItem('lastMessageNum', messages.length - 1);
    })

    for (let i = 0; i < messagesTitle.length; i++) {
        createWidget(widget.FILL_RECT, {
            x: 71,
            y: 101 + i * 89,
            w: 341,
            h: 81,
            color: 0x101010,
            radius: 25
        }).addEventListener(event.CLICK_UP, () => {
            localStorage.setItem('lastMessageNum', i);
            back();
        })
        createWidget(widget.TEXT, {
            x: 92,
            y: 123 + i * 89,
            w: 199,
            h: 38,
            text_size: 24,
            text: messagesTitle[i],
            color: 0xFFFFFF
        }).addEventListener(event.CLICK_UP, () => {
            localStorage.setItem('lastMessageNum', i);  
            back();
        })
    }
  }
});