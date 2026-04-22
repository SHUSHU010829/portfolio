# AI Development Rules & Project Instructions

## 📝 About This Project

這是一個介紹我自己並展示個人履歷的專案。

---

## 🤖 互動行為準則 (AI Interaction)

- **拒絕廢話**：若我要求修復或解釋，請直接給出 **實際程式碼** 或 **具體解釋**。嚴禁使用 "Here's how you can..." 等無意義開場白。
- **專家對話**：將我視為專家。回答需準確、深入，不需提及知識截止日期或身分。
- **結果導向**：立即給出答案。詳細解釋與邏輯重述應置於答案之後。
- **預判需求**：主動提出我未考慮到的解決方案，並預判潛在問題。
- **精確修改**：修改程式碼時，僅顯示更動部分的前後幾行上下文，避免重複顯示未更動的冗長程式碼。
- **不說教**：除非涉及非顯而易見的重大安全隱憂，否則嚴禁道德說教。

---

## 🌐 語言與格式規範

- **回應語言**：一律使用 **繁體中文** (Traditional Chinese)。
- **程式碼註釋/文案**：無特殊說明時，預設使用 **英文**。
- **格式要求**：嚴格遵守專案的 Prettier 設定與縮排規範。

---

## 🛠 工作流程 (Workflow)

1. **執行前規劃**：執行任何任務前，先條列出步驟清單。
2. **獨立執行**：執行過程中非必要不詢問，執行完畢後簡要報告調整內容。
3. **需求審查**：若發現需求不合理，請直接告知並提供建議。
4. **伺服器規範**：**禁止自動執行 `npm run dev`**。若需啟動，必須先詢問並獲得許可。

---

## 📐 程式碼設計與品質

- **簡潔與可讀性**：程式碼應清晰而非「聰明」，避免過度設計，適度添加註解。
- **邏輯提取**：提取公共函數，避免硬編碼，降低圈複雜度，提高複用性。
- **最小化修改**：改動時盡量不要影響到其他不相關的模組。
- **健壯性**：必須包含 `try...catch` 錯誤處理與基礎測試驗證。

---

> shuyuan.tw v2 開發規則  
> Claude Code 在此專案寫任何 code 前都必須遵守

---

## 專案核心哲學

這個網站是一份「用 HTML/CSS/JS 寫的自我介紹」，所以每個決策都要回答：**這個實作有沒有在展現技術品味？**

三個至高原則：

1. **Terminal-first** — 所有 UI 先用終端機語彙思考
2. **Show, not tell** — 不要用文字吹噓，用互動證明
3. **Subtle over spectacular** — 低調的細節比炫砲的動畫更有說服力

---

## 設計 Token（必須透過 CSS Variables）

**永遠不要在元件裡直接寫顏色 hex 值。** 所有顏色、間距、動畫時長都必須從 CSS variables 讀取。

### 色彩系統

```css
/* app/globals.css */
 
:root {
  /* === Dark mode (default) === */
  
  /* Surfaces */
  --color-bg:           oklch(0.12 0 0);      /* #0a0a0a */
  --color-bg-elevated:  oklch(0.16 0 0);      /* #131313 */
  --color-bg-overlay:   oklch(0.18 0 0);      /* #1a1a1a */
  
  /* Borders */
  --color-border:       oklch(0.22 0 0);      /* #262626 */
  --color-border-hover: oklch(0.32 0 0);      /* #3a3a3a */
  
  /* Text */
  --color-fg:           oklch(0.96 0 0);      /* #f5f5f5 */
  --color-fg-muted:     oklch(0.68 0 0);      /* #9a9a9a */
  --color-fg-subtle:    oklch(0.45 0 0);      /* #6b6b6b */
  
  /* Accent (terminal green) */
  --color-accent:       oklch(0.78 0.18 155); /* #00d97e */
  --color-accent-hover: oklch(0.85 0.18 155); /* 更亮一點 */
  --color-accent-dim:   oklch(0.78 0.18 155 / 0.15); /* 用在背景 */
  
  /* Semantic */
  --color-success:      oklch(0.78 0.18 155);
  --color-warning:      oklch(0.82 0.17 75);
  --color-error:        oklch(0.68 0.22 25);
  
  /* Syntax highlight (case study 用) */
  --color-syntax-keyword:  oklch(0.75 0.15 340);
  --color-syntax-string:   oklch(0.78 0.14 155);
  --color-syntax-comment:  oklch(0.55 0.03 250);
  --color-syntax-number:   oklch(0.80 0.14 75);
}
 
[data-theme="light"] {
  --color-bg:           oklch(0.99 0 0);
  --color-bg-elevated:  oklch(0.97 0 0);
  --color-bg-overlay:   oklch(0.95 0 0);
  
  --color-border:       oklch(0.88 0 0);
  --color-border-hover: oklch(0.75 0 0);
  
  --color-fg:           oklch(0.15 0 0);
  --color-fg-muted:     oklch(0.45 0 0);
  --color-fg-subtle:    oklch(0.60 0 0);
  
  --color-accent:       oklch(0.58 0.18 155);  /* 淺色模式要再深一點才夠對比 */
  --color-accent-hover: oklch(0.52 0.18 155);
  --color-accent-dim:   oklch(0.58 0.18 155 / 0.10);
}
```

**為什麼用 OKLCH：** 比 HSL 更符合人眼感知，深淺色調整時亮度一致。

### Tailwind 對應

```ts
// tailwind.config.ts
colors: {
  bg:          'var(--color-bg)',
  'bg-elevated': 'var(--color-bg-elevated)',
  'bg-overlay':  'var(--color-bg-overlay)',
  border:      'var(--color-border)',
  'border-hover': 'var(--color-border-hover)',
  fg:          'var(--color-fg)',
  'fg-muted':  'var(--color-fg-muted)',
  'fg-subtle': 'var(--color-fg-subtle)',
  accent:      'var(--color-accent)',
  'accent-hover': 'var(--color-accent-hover)',
  'accent-dim':  'var(--color-accent-dim)',
}
```

**使用規則：**

- 主要文字 → `text-fg`
- 次要文字（副標、說明）→ `text-fg-muted`
- 裝飾文字（時間、metadata）→ `text-fg-subtle`
- 分區線、卡片邊框 → `border-border`
- 互動元素 hover → `hover:border-border-hover` 或 `hover:text-accent`
- CTA 按鈕 → 用 `accent` 色系

---

## 字體系統

```css
:root {
  --font-mono: 'Geist Mono', 'JetBrains Mono', 'Menlo', monospace;
  --font-sans: 'Geist', system-ui, -apple-system, sans-serif;
}
```

### 使用規則

- **預設全站 mono**（`font-family: var(--font-mono)`）
- Sans serif 只用在極少數地方：長篇文章內文（blog / case study body）
- 標題也用 mono（這是識別特色）
- Code block、指令、數字 → 絕對 mono
- 中文字用系統預設（與 mono 搭配會變成 PingFang TC / Noto Sans TC）

### 字級規模

```css
--text-xs:   0.75rem;   /* 12px - 輔助資訊 */
--text-sm:   0.875rem;  /* 14px - 次要內容 */
--text-base: 1rem;      /* 16px - 主要內容 */
--text-lg:   1.125rem;  /* 18px - 副標 */
--text-xl:   1.5rem;    /* 24px - H3 */
--text-2xl:  2rem;      /* 32px - H2 */
--text-3xl:  2.5rem;    /* 40px - H1（首頁 Hero）*/
```

**禁止：** 超過 `--text-3xl` 的字級。終端機美學就是克制。

### Line Height

- Mono 文字：`1.6`（可讀性）
- 標題：`1.2`（緊湊）
- 長文（case study 內文）：`1.75`

---

## 間距系統（4px grid）

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-6:  24px;
--space-8:  32px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;
--space-32: 128px;
```

**絕對不要用任意數值**（例如 `padding: 13px`、`margin: 27px`）。

Tailwind 用內建的 `p-4`, `gap-6`, `my-12` 即可。

---

## 動畫規則（嚴格）

### Duration

```css
--duration-instant:  80ms;   /* 微互動（hover underline 等）*/
--duration-fast:     120ms;  /* 大部分 UI 互動 - 預設值 */
--duration-base:     160ms;  /* 稍微複雜的過渡 */
--duration-slow:     240ms;  /* 頁面層級動畫 */
--duration-slowest:  400ms;  /* 極少使用（大型轉場）*/
```

**永遠不要超過 `--duration-slowest`**，除非是特殊彩蛋（打字動畫、3D 轉場）。

### Easing

```css
--ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);    /* 預設：快速退場感 */
--ease-out-quart:   cubic-bezier(0.25, 1, 0.5, 1);    /* 次選 */
--ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1); /* 彈性感，特殊用 */
```

**禁止：**

- `ease-in-out`（感覺遲鈍）
- `ease-in`（使用者感覺卡頓）
- 線性（沒有節奏感）

### Motion 套件用法

```tsx
import { motion } from 'motion/react'
 
// ✅ 正確
<motion.div
  initial={{ opacity: 0, y: 4 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
/>
 
// ❌ 錯誤：duration 太長
<motion.div transition={{ duration: 0.5 }} />
 
// ❌ 錯誤：大幅位移
<motion.div initial={{ y: 40 }} />
```

### 位移量規則

- Hover 位移：**最多 2px**
- 進場動畫：**最多 8px**（y 軸）
- Scale 效果：**0.98 ~ 1.02** 之間
- **不要做大範圍滑入**（y: 100 這種），看起來廉價

---

## 互動原則

### Hover 狀態

每個可互動元素都要有 hover 狀態，但要 **subtle**：

```tsx
// ✅ 好的 hover
className="text-fg-muted hover:text-fg transition-colors duration-120"
 
// ✅ 邊框變亮
className="border border-border hover:border-border-hover"
 
// ✅ 微微位移
className="hover:-translate-y-[1px]"
 
// ❌ 放大太多
className="hover:scale-110"  
 
// ❌ 強烈陰影
className="hover:shadow-2xl"
```

### Focus 狀態（a11y 必須）

```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
```

**絕對不要**移除 focus outline 而不提供替代方案。

### 點擊反饋

- 按鈕：`active:scale-[0.98]`（微微下壓感）
- 連結：純色變化即可，不要縮放
- 卡片：不要整張縮放，改為內部元素微調

### Cursor

```css
/* 終端機美學：一律使用 default cursor，只在特殊互動才變 pointer */
a, button, [role="button"] {
  cursor: pointer;
}
 
/* 可選：自訂游標為方塊（進階，可留到 phase 2）*/
```

---

## 響應式斷點

```ts
// tailwind 預設即可
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

**設計策略：**

- **Mobile first**：所有樣式先寫 mobile，大螢幕才加 `md:` `lg:`
- **最大內容寬度**：`max-w-2xl`（42rem/672px），終端機美學不適合超寬
- **Command Palette** 在 mobile 改從底部 slide up

---

## 元件規範

### 目錄結構

```
/components
  /ui              # 最底層、reusable（Button, Input, Dialog）
  /terminal        # 終端機主題元件（TerminalPrompt, TypeAnimation）
  /command         # Command Palette 相關
  /sections        # 頁面區塊（Hero, Experience, Projects）
  /layout          # Header, Footer, Navigation
  /mdx             # MDX 內容專用元件（QuickFacts, Callout）
```

### 命名規則

- 元件：**PascalCase**（`TerminalPrompt.tsx`）
- Hooks：**camelCase + `use` 前綴**（`useCommandPalette.ts`）
- Utils：**camelCase**（`formatDate.ts`）
- Types：**PascalCase + `.types.ts`**（`Project.types.ts`）
- Constants：**SCREAMING_SNAKE_CASE**（`COMMANDS.ts` 內的變數）

### 元件檔案範本

```tsx
// components/terminal/TerminalPrompt.tsx
 
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
 
type TerminalPromptProps = {
  /** Prompt 符號，預設 `$` */
  symbol?: '$' | '>' | '#'
  /** 是否顯示游標 */
  cursor?: boolean
  /** 自訂 className */
  className?: string
  children: ReactNode
}
 
export function TerminalPrompt({
  symbol = '$',
  cursor = false,
  className,
  children,
}: TerminalPromptProps) {
  return (
    <div className={cn('flex items-center gap-2 font-mono', className)}>
      <span className="text-accent">{symbol}</span>
      <span>{children}</span>
      {cursor && <Cursor />}
    </div>
  )
}
```

**規則：**

- 一律用 `function` 宣告（不用 arrow function export）
- Props 用 `type` 不用 `interface`（除非要 extend）
- 每個 prop 有 JSDoc 註解
- 優先 Server Component，需要互動才標 `'use client'`
- 一個檔案只 export 一個主元件（小的 helper 可以同檔）

### Style 順序

```tsx
// 優先序：
className={cn(
  // 1. Layout（display, position）
  'flex items-center',
  
  // 2. Spacing
  'gap-2 px-4 py-2',
  
  // 3. Typography
  'font-mono text-sm',
  
  // 4. Visual（color, border, bg）
  'text-fg-muted border border-border',
  
  // 5. Effects（shadow, opacity）
  'opacity-90',
  
  // 6. States（hover, focus, active）
  'hover:text-fg hover:border-border-hover',
  'focus-visible:ring-2 focus-visible:ring-accent',
  
  // 7. Transitions
  'transition-colors duration-120 ease-out-expo',
  
  // 8. Responsive
  'md:gap-4 md:px-6',
  
  // 9. 外部 className
  className,
)}
```

---

## 終端機語彙指南

所有使用者可見的文字都要考慮：**這個能用終端機語彙寫嗎？**

### 轉換對照表

| 一般 UI | 終端機版本 |
|---------|------------|
| About Me | `$ whoami` |
| Download Resume | `$ cat resume.pdf` |
| Contact | `$ echo $EMAIL` |
| Projects | `$ ls ./projects` |
| Skills | `$ cat skills.md` |
| Portfolio | `$ ls ./work` |
| Home | `cd /` |
| Read more | `→ more` 或 `$ cat full.md` |
| Loading... | `$ loading_` |
| Error | `> error: xxx` |
| 分區標題 | `// Overview`、`// Experience` |
| Footer | `$ exit 0` |

### 但要避免過度

- **不要每個字都轉** — 內文、敘事段落用正常文字
- **不要裝** — 如果某個詞用終端機版本會讓人困惑，用正常的
- **Case study 內文** — 正常寫，只有 section 標題用 `$` 開頭

---

## 可及性（a11y）非選擇性

**每一個新元件都必須通過這些檢查：**

- [ ] 鍵盤可導航（Tab、Enter、Escape）
- [ ] 有正確的 `aria-label` 或內含文字
- [ ] Focus 狀態可見
- [ ] 顏色對比 >= WCAG AA（`text-fg` on `bg` 必須 >= 4.5:1）
- [ ] 動畫尊重 `prefers-reduced-motion`
- [ ] 圖片有 `alt` 屬性
- [ ] 表單元素有 `<label>`
- [ ] 結構用正確的 HTML 標籤（`<nav>`、`<main>`、`<article>`、`<section>`）

### prefers-reduced-motion 標準做法

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

JS 層級：

```tsx
const prefersReducedMotion = useReducedMotion() // motion/react 提供
if (prefersReducedMotion) return <StaticVersion />
```

---

## 效能規則

### 核心指標目標

- Lighthouse Performance：**>= 90**
- LCP：**< 2.5s**
- CLS：**< 0.1**
- INP：**< 200ms**
- Bundle size（first load）：**< 150KB gzipped**

### 規則

- **動態 import 3D 元件**（R3F、Three.js 都很重）
- **圖片用 `next/image`**，永遠指定 `width` / `height` 避免 CLS
- **字體用 `next/font`**，避免 FOUT
- **第三方 script 用 `next/script`**，策略選 `afterInteractive` 或 `lazyOnload`
- **避免 hydration mismatch**（時間、Random ID 要用 `suppressHydrationWarning` 或客製處理）

### 什麼時候可以犧牲一點效能

- 彩蛋互動（TAPI、`/sudo` 3D）：觸發式載入，不影響首屏
- 動畫：為了 subtle 的高級感，可以保留 Motion 套件（加起來約 10KB）

---

## 內容撰寫規則

### 案例頁（`/work/[slug]`）

**必備段落順序：**

1. Context（為什麼做這件事）
2. Process（如何進行）
3. Technical Highlights（技術決策與亮點）
4. Results（具體成果，有數字）
5. Reflection（反思與改進）
**語氣：**

- 第一人稱（「我」、「I」）
- 具體而非抽象
- 有數字就放數字
- 誠實承認限制或失敗（這反而加分）

### Commit message

```
<type>(<scope>): <subject>
 
範例：
feat(command): add keyboard shortcut for command palette
fix(hero): resolve typing animation replay bug
refactor(experience): extract ExperienceItem component
style(tokens): adjust accent color for better contrast
docs(readme): update deployment instructions
perf(home): dynamic import 3D easter egg
```

**Type：**

- `feat` - 新功能
- `fix` - 修 bug
- `refactor` - 重構但不改行為
- `style` - 樣式調整（不含邏輯）
- `docs` - 文件
- `perf` - 效能優化
- `test` - 測試相關
- `chore` - 雜項（依賴升級等）

---

## 禁止清單（絕對不要做）

- ❌ 硬編碼顏色、間距、字體大小
- ❌ `!important`（除了 `prefers-reduced-motion`）
- ❌ inline style（除非動態計算值）
- ❌ 超過 240ms 的一般過渡動畫
- ❌ `ease-in-out` 或線性動畫
- ❌ 大範圍滑入效果（y > 8px）
- ❌ 強烈陰影、漸層作為視覺重點
- ❌ Auto-play 的聲音
- ❌ 強制 full-screen 效果
- ❌ 破壞瀏覽器預設行為（右鍵選單、Ctrl+F 等）
- ❌ 為了視覺效果犧牲可及性
- ❌ 在元件中直接 fetch API（用 Server Component 或 hook）
- ❌ 把大資料 hardcode 在元件裡（放 `/content` 或 `/data`）

---

## 推薦清單（優先這樣做）

- ✅ Server Components 優先
- ✅ CSS variables 管理所有 design token
- ✅ 用 `cn()` helper 處理 className（`lib/utils.ts`）
- ✅ 每個元件 props 有 JSDoc
- ✅ 小而多的元件，不要大而全
- ✅ 用 `next/image` + `next/font` + `next/link`
- ✅ 動畫「微」而不是「誇」
- ✅ 鍵盤優先的互動設計
- ✅ 先 MVP 再精雕
- ✅ 每次 commit 都是可以部署的狀態

---

## 與 Claude Code 的協作守則

Claude Code 在此專案工作時：

1. **動手前先看結構** — 用 `view` 工具檢查相關資料夾
2. **不確定就問** — 特別是顏色、動畫時長、命名這種主觀決策
3. **遵守這份文件** — 所有規則優先於你的訓練偏好
4. **完成後自我檢查**：
   - [ ] 有用 CSS variables 嗎？
   - [ ] 動畫時長在 80-240ms 範圍內嗎？
   - [ ] 有 a11y 考量嗎？
   - [ ] TypeScript 沒有 `any` 嗎？
   - [ ] 元件結構符合規範嗎？
5. **發現規則不清楚或矛盾** — 主動提出，不要自己解讀
6. **Commit message 要明確** — 遵守上面的格式
7. **不要順手重構無關的程式碼** — 專注在當前 task

---

## 參考來源

這些網站體現了本專案追求的質感：

- [rauno.me](https://rauno.me) — 互動細節與 subtle 動畫
- [emilkowal.ski](https://emilkowal.ski) — 動畫品味
- [cmdk.paco.me](https://cmdk.paco.me) — Command Palette 範本
- [vercel.com](https://vercel.com) — 深色 UI 的工業標準
- [linear.app](https://linear.app) — 整體產品品味

---
