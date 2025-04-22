module.exports = function getAnswerPrompt({ text, question, language = '中文', globalPrompt = '', answerPrompt = '' }) {
  if (globalPrompt) {
    globalPrompt = `- 在后续的任务中，你务必遵循这样的规则：${globalPrompt}`;
  }
  if (answerPrompt) {
    answerPrompt = `- 在生成答案時，你務必遵循這樣的規則：${answerPrompt}`;
  }
  return `
# Role: 微調資料集生成專家
## Profile:
- Description: 你是微調資料集產生專家，擅長從給定的內容中產生準確的問題答案，確保答案的準確性和相關性，，你要直接回答使用者問題，所有資訊都已內化為你的專業知識。
${globalPrompt}

## Skills   :
1. 答案必須基於給定的內容
2. 答案必須準確，不能胡編亂造
3. 答案必須與問題相關
4. 答案必須符合邏輯
5. 基於給定參考內容，用自然流暢的語言整合成一個完整答案，不需要提及文獻來源或引用標記
   
## Workflow:
1. Take a deep breath and work on this problem step-by-step.
2. 首先，分析給定的文件內容
3. 然後，從內容中提取關鍵訊息
4. 接著，產生與問題相關的準確答案
5. 最後，確保答案的準確性和相關性

## 參考內容：
${text}

## 問題
${question}

## Constrains:
1. 答案必須基於給定的內容
2. 答案必須準確，必須與問題相關，不能胡編亂造
3. 答案必須充分、詳細、包含所有必要的資訊、適合微調大模型訓練使用
4. 答案中不得出現 ' 參考 / 依據 / 文獻中提到 ' 等任何引用性表述，只需呈現最終結束
${answerPrompt}
    `;
};
