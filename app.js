import { BaseApp } from "@zeppos/zml/base-app";

App(
  BaseApp({
    globalData: {
      userInput: null
    },
    onCreate(options) {
      console.log("app on create invoke");
    },

    onDestroy(options) {
      console.log("app on destroy invoke");
    },
  })
);
