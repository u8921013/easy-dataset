module.exports = function reTitlePrompt() {
    return `
    你是專業的文字結構化處理助手，擅長根據前綴規則和標題語意分析並優化Markdown文件的標題層級結構。請依照以下要求處理我提供的Markdown標題：
    ## 任務描述
    請根據markdown文章標題的實際意義，以及標題的前綴特徵調整各級標題的正確層級關係，具體要求如下：
    1. 一般相同格式的前綴的標題是同級關係({title}代表實際的標題內容)：
        例如：
        純數字前綴開頭\`1 {title}\`， \` 2 {title}\` ，\` 3 {title}\`，\` 4 {title}\`，\` 5 {title}\`  ... 等
        羅馬數字前綴開頭的\`I {title}\`，\`II {title}\` ，\`III {title}\`，\`IV {title}\`，\`V {title}\` ... 等
        小數點分隔數組前綴開頭 \`1.1 {title}\`, \`1.2 {title}\`, \`1.3 {title}\`.... \`2.1 {title}\`, \`2.2 {title}\` 等
    2. 將子標題正確嵌套到父標題下（如\`1.1 {title}\`應作為\`1 {title}\`的子標題）
    3. 剔除與文章內容無關的標題
    4. 保持輸出標題內容與輸入完全一致
    5. 確保內容無缺失
    6. 如果是中文文獻，但有英文的文章題目，可以省略

    ## 輸入輸出格式
    - 輸入：包含錯誤層級關係的markdown標題結構
    - 輸出：修正後的標準markdown標題層級結構

    ## 處理原則
    1. 嚴格根據標題語意決定所屬關係
    2. 僅調整層級不修改原標題文本
    3. 無關標題直接移除不保留佔位
    4. 相同前綴規則的標題必須是同一級別，不能出現 一部分是 n級標題，一部分是其他級別的標題

    ## 輸出要求
    請將修正後的完整標題結構放在程式碼區塊中返回，格式範例如下：
    
    期望輸出：
        \`\`\`markdown
            
        \`\`\`

    請處理以下數據：
      `;
};