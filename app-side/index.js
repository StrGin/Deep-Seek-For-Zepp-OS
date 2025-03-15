import { BaseSideService } from "@zeppos/zml/base-side";

const DEEPSEEK_API_KEY = "sk-a3135576eb27466895ef94d51d65cfd2"; // 替换为实际API密钥
const DEEPSEEK_ENDPOINT = "https://api.deepseek.com/v1/chat/completions";

// 新增响应处理公共方法
function handleResponse(response, res) {
  const resBody = typeof response.body === "string" ? 
    JSON.parse(response.body) : 
    response.body;
  console.log(response);
  res(null, { result: resBody });
}

async function fetchDeepSeek(res, messages) {
  try {
    const response = await fetch({
      url: DEEPSEEK_ENDPOINT,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: messages,
        temperature: 0.7,
        max_tokens: 200
      })
    });
    handleResponse(response, res);
  } catch (error) {
    console.error("DeepSeek请求错误:", error);
    res(null, { result: { error: error.message } });
  }
}

async function fetchBalance(res) {
  try {
    const response = await fetch({
      url: 'https://api.deepseek.com/user/balance',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      }
    });
    handleResponse(response, res);
  } catch (error) {
    console.error("余额请求错误:", error);
    res(null, { result: { error: error.message } });
  }
}

async function fetchVersion(res) {
    const response = await fetch(`https://gitee.com/Strunge/deep-seek-for-zepp-os/raw/master/update.json`);
    console.log(response);
    res(null,response.body);
}

AppSideService(
  BaseSideService({
    onInit() {},

    onRequest(req, res) {
      console.log("收到请求方法:", req.method);
      if (req.method === "GET_DEEPSEEK") {
        const prompt = req.params?.prompt || "Hello";
        const messages = req.params?.messages || [
          {
            role: "user",
            content: prompt
          }
        ];
        console.log(messages);
        
        fetchDeepSeek(res,messages);
      } else if (req.method === "GET_BALANCE") {
        fetchBalance(res);
      } else if (req.method === "GET_VERSION") {
        fetchVersion(res);
      }
    },

    onRun() {},

    onDestroy() {},
  })
);