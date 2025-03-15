import { createWidget , getTextLayout , widget , text_style , prop , event } from "@zos/ui";
import { push } from "@zos/router";
function createGroup(x, y, w, h) {
  return createWidget(widget.GROUP, {
    x: x,
    y: y,
    w: w,
    h: h,
  })
}
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
      createWidget(widget.IMG, {
        x: 90,
        y: 39,
        src: 'aboutHead.png'
      })
      let devGroup = createGroup(90, 152, 300, 69)
      devGroup.createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 300,
        h: 69,
        radius: 32,
        color: 0x101010
      })
      devGroup.createWidget(widget.IMG, {
        x: 18,
        y: 20,
        src: 'developer.png'
      })
      devGroup.createWidget(widget.TEXT, {
        x: 136,
        y: 13,
        w: 142,
        h: 46,
        text_size: 27,
        text: '@Struggle',
        color: 0xFFFFFF
      })
      let versionGroup = createGroup(90, 226, 300, 69)
      versionGroup.createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 300,
        h: 69,
        radius: 32,
        color: 0x101010
      })
      versionGroup.createWidget(widget.IMG, {
        x: 18,
        y: 15,
        src: 'version.png'
      })
      versionGroup.createWidget(widget.IMG, {
        x: 139,
        y: 23,
        src: 'vsnn.png'
      })
      versionGroup.addEventListener(event.CLICK_UP,() => {
        push({
          url: 'page/Version'
        })
      })
      let githubGroup = createGroup(90, 300, 146, 69)
      githubGroup.createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 146,
        h: 69,
        radius: 32,
        color: 0x101010
      })
      githubGroup.createWidget(widget.IMG, {
        x: 18,
        y: 15,
        src: 'github.png'
      })
      let setGroup = createGroup(244, 300, 146, 69)
      setGroup.createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 146,
        h: 69,
        radius: 32,
        color: 0x101010
      })
      setGroup.createWidget(widget.IMG, {
        x: 18,
        y: 11,
        src: 'set.png'
      })
      githubGroup.addEventListener(event.CLICK_UP,() => {
        push({
          url: 'page/Github'
        })
      })
  }
});
