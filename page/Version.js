import { createWidget , getTextLayout , widget , text_style , prop , align } from "@zos/ui";
import { BasePage } from "@zeppos/zml/base-page";
let version = "1.0.0 BETA";
let contentWidget
let nowWidget
Page(
  BasePage ({
    build() {
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
      this.request({
        method: "GET_VERSION"
      })
        .then((data) => {
          nowWidget.setProperty(prop.TEXT, data.now)
          contentWidget.setProperty(prop.TEXT, data.content)
          contentWidget.setProperty(prop.H, getTextLayout(data.content,{ wrapped: 1, text_size: 30, text_width: 410 }).height)
        })
        .catch((error) => {

        });
      createWidget(widget.TEXT, {
        x: 40,
        y: 39,
        w: 410,
        h: 63,
        text_size: 36,
        text: '最新版本',
        color: 0xFFFFFF,
        align_h: align.CENTER_H
      })
      nowWidget = createWidget(widget.TEXT, {
        x: 40,
        y: 81,
        w: 410,
        h: 63,
        text_size: 36,
        text: '',
        color: 0x00FF44,
        align_h: align.CENTER_H
      })
      createWidget(widget.TEXT, {
        x: 40,
        y: 123,
        w: 410,
        h: 63,
        text_size: 36,
        text: '当前版本',
        color: 0xFFFFFF,
        align_h: align.CENTER_H
      })
      createWidget(widget.TEXT, {
        x: 40,
        y: 165,
        w: 410,
        h: 63,
        text_size: 36,
        text: version,
        color: 0xDDDDDD,
        align_h: align.CENTER_H
      })
      createWidget(widget.TEXT, {
        x: 40,
        y: 207,
        w: 410,
        h: 63,
        text_size: 36,
        text: '更新内容',
        color: 0xFFFFFF,
        align_h: align.CENTER_H
      })
      contentWidget = createWidget(widget.TEXT, {
        x: 40,
        y: 259,
        w: 410,
        h: 63,
        text_size: 30,
        text: '',
        color: 0xDDDDDD,
        align_h: align.CENTER_H
      })

  }
})
);