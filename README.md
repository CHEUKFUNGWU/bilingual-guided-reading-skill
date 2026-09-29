# Bilingual Guided Reading（中英雙語導讀）

A Claude skill that walks you through English professional or academic text **section by section, in English and Chinese**. Each section gives the original sentence, its Chinese meaning, and notes on key terms, the mechanisms behind them and useful sentence patterns.

一個 Claude Skill：帶你**逐段、中英對照**讀懂英文的專業或學術文本。每句給出英文原文和中文意思，並講解重點詞、背後的機制和值得學的句型。

## Three modes 三種模式

| Mode 模式 | For 適用 | Extra block 額外內容 |
|---|---|---|
| **Own writing** 自己的文章 | Essays, reports, applications you wrote | Suggestions marked *must fix* or *optional*; edits applied only after you agree |
| **Others' document** 別人的文件 | Company, industry, audit or research reports; papers; policies; contracts | **批判閱讀**: claim vs evidence, data quality, assumptions and gaps, wording strength, author's perspective |
| **Study material** 學習材料 | Textbooks, course modules, standards, manuals | **考試角度**: how it's tested, common traps, look-alike concepts, memory hooks |

Claude picks the mode from the document, or asks you in one line. It replies in Traditional or Simplified Chinese to match how you write.

## Install 安裝

### Claude app (claude.ai / desktop)

1. Download [`dist/bilingual-guided-reading.zip`](dist/bilingual-guided-reading.zip).
2. In Claude, open **Settings → Capabilities → Skills** and upload the zip. (Menu names may change; look for the Skills section.)
3. Make sure the skill is switched on.

下載 `dist/bilingual-guided-reading.zip`，到 Claude 的 **Settings → Capabilities → Skills** 上傳並啟用。

### Claude Code

Copy the `bilingual-guided-reading` folder into `~/.claude/skills/`:

```bash
git clone https://github.com/<your-username>/bilingual-guided-reading-skill.git
cp -r bilingual-guided-reading-skill/bilingual-guided-reading ~/.claude/skills/
```

## Use 使用

Attach a document and say, for example:

- 「帶我讀這份報告，中英雙語」
- 「帶我讀這章，我要考試」
- "Walk me through my essay bilingually"

Reply **繼續** / **continue** to move to the next section.

## A note on copyright 版權提醒

For material you didn't write (textbooks, published reports, paid course content), the skill quotes only short key sentences and paraphrases the rest, so read along with your own copy.

讀別人的出版物時，只會引用關鍵短句，其餘用意譯講解，請對照自己手上的原文閱讀。

## License

MIT
