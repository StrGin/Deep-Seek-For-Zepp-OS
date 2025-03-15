import * as hmUI from "@zos/ui";
import { replace } from "@zos/router";
Page({
    build() {
      hmUI.createWidget(hmUI.widget.IMG,{
        x: 0,
        y: 0,
        src: 'welcome.png'
      })
      setTimeout(() => {
        replace({url: 'page/Home'})
      })
  }
});
