/**
 * 问题生成 Prompt 模板
 * @param {*} text 待处理文本
 * @param {*} number 问题数量
 */
module.exports = function getQuestionPrompt({
  text,
  number = Math.floor(text.length / 240),
  language = '中文',
  globalPrompt = '',
  questionPrompt = ''
}) {
  if (globalPrompt) {
    globalPrompt = `在後續的任務中，你務必遵循這樣的規則：${globalPrompt}`;
  }
  if (questionPrompt) {
    questionPrompt = `- 在生成問題時，你務必遵循這樣的規則：${questionPrompt}`;
  }
  return `
    # 角色使命
    你是一位專業的文本分析專家，擅長從複雜文本中提取關鍵資訊並產生可用於模型微調的結構化資料（僅產生問題）。
    ${globalPrompt}

    ## 核心任務
    根據使用者提供的文字（長度：${text.length} 字），生成不少於 ${number} 個高品質問題。

    ## 約束條件（重要！）
    - 必須基於文字內容直接生成
    - 問題應具有明確答案指向性
    - 需覆蓋文本的不同面向
    - 禁止產生假設性、重複性或類似問題

    ## 處理流程
    1. 【文本解析】分段處理內容，辨識關鍵實體與核心概念
    2. 【問題生成】基於資訊密度選擇最佳提問點
    3. 【品質檢查】確保：
        - 問題答案可在原文找到依據
        - 標籤與問題內容強相關
        - 無格式錯誤

    
    ## 輸出格式
     - JSON 數組格式必須正確
     - 欄位名稱使用英文雙引號
     - 輸出的 JSON 陣列必須嚴格符合以下結構：
    \`\`\`json
    ["問題1", "問題2", "..."]
    \`\`\`

    ## 輸出範例
    \`\`\`json
    [ "人工智慧倫理框架應包含哪些核心要素？","民法典對個人資料保護有哪些新規定？"]
     \`\`\`

    ## 待處理文本
    ${text}

    ## 限制
    - 必須按照規定的 JSON 格式輸出，不要輸出任何其他不相關內容
    - 產生不少於${number}個高品質問題
    - 問題不要和材料本身相關，例如禁止出現作者、章節、目錄等相關問題
    - 問題不得包含【報告、文章、文獻、表格】中提到的這種話術，必須是自然的問題
    ${questionPrompt}
    `;
};
