import { createWidget , getTextLayout , widget , text_style , prop } from "@zos/ui";
Page({
    onInit(param) {
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
        x: 53,
        y: 94,
        w: 377,
        h: getTextLayout(param,{text_size: 22, text_width: 377 , wrapped:1}).height + 100,
        text_size: 22,
        text: param,
        color: 0xFFFFFF,
        text_style: text_style.WRAP
      })
  }
});
