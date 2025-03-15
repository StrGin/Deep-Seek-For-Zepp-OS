import { createWidget , getTextLayout , widget , text_style , prop } from "@zos/ui";
Page({
    onInit() {
      let timeWidget = createWidget(widget.TEXT, {
        x: 206,
        y: 0,
        w: 71,
        h: 38,
        text_size: 26,
        text: new Date().toTimeString().match(/^(\d{2}:\d{2})/)[0],
        color: 0xFFFFFF
      })
      setInterval(() => {
        timeWidget.setProperty(prop.TEXT, new Date().toTimeString().match(/^(\d{2}:\d{2})/)[0])
      })
      createWidget(widget.TEXT, {
        x: 124,
        y: 40,
        w: 249,
        h: 64,
        text_size: 22,
        text: 'github.com/StrGin/DeepSeek-For-Zepp-OS',
        color: 0xFFFFFF,
        text_style: text_style.WRAP
      })
      createWidget(widget.IMG, {
        x: 124,
        y: 120,
        src: 'githubQRCode.png'
      })
  }
});
