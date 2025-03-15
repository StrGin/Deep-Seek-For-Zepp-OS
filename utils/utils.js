export function parseConversation(conversation) {
  const result = [];
  let currentPair = [];
  for (const item of conversation) {
    if (item.role === "user") {
      if (currentPair.length > 0) {
        result.push(currentPair);
        currentPair = [];
      }
      currentPair.push(item.content);
    } else if (item.role === "assistant") {
      if (currentPair.length > 0) {
        currentPair.push(item.content);
        result.push(currentPair);
        currentPair = [];
      } else {
        console.log("助手回复没有对应的用户输入:", item.content);
      }
    }
  }
  if (currentPair.length > 0) {
    result.push(currentPair);
  }
  return result;
}
