# Content Decoupling Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Separate weekly learning content from the game engine so adding a new week only requires creating a single `weeks/weekN.js` file.

**Architecture:** Extract the four content arrays (feelings, sightWords, sentences, dialogues) plus sightColors into standalone JS files loaded via URL parameter `?week=N`. The game engine remains a single HTML file. localStorage saves are keyed per-week to keep progress independent.

**Tech Stack:** Vanilla JS, no build tools, GitHub Pages static hosting

---

### Task 1: Create `weeks/` directory and extract Week 1 content

**Files:**
- Create: `weeks/week1.js`

**Step 1: Create `weeks/week1.js`**

Copy the content data from `week1.html` lines 1224-1286 (feelings, sightWords, sightColors, sentences, dialogues) into a new file as `window.WEEK_DATA`:

```javascript
// weeks/week1.js — Week 1: Feelings & Sight Words
window.WEEK_DATA = {
  title: 'Feelings Fun!',
  titleEmoji: '🎭',

  feelings: [
    { word: 'happy',   zh: '開心的', emoji: '😊', color: '#FFD93D' },
    { word: 'sad',     zh: '難過的', emoji: '😢', color: '#74B9FF' },
    { word: 'angry',   zh: '憤怒的', emoji: '😠', color: '#FF6B6B' },
    { word: 'excited', zh: '興奮的', emoji: '🤩', color: '#FF85CA' },
    { word: 'silly',   zh: '可笑的', emoji: '🤪', color: '#A29BFE' },
    { word: 'tired',   zh: '累的',   emoji: '😴', color: '#B2BEC3' },
    { word: 'scared',  zh: '害怕的', emoji: '😨', color: '#81ECEC' },
    { word: 'bored',   zh: '無聊的', emoji: '😑', color: '#FFEAA7' },
    { word: 'sick',    zh: '不舒服的', emoji: '🤒', color: '#55EFC4' },
    { word: 'proud',   zh: '驕傲的', emoji: '😎', color: '#FD79A8' },
    { word: 'brave',   zh: '勇敢的', emoji: '💪', color: '#E17055' },
    { word: 'mad',     zh: '生氣的', emoji: '😤', color: '#D63031' },
  ],

  sightWords: [
    { word: 'door',   zh: '門',     sentence: 'Open the door.' },
    { word: 'down',   zh: '下面',   sentence: 'Sit down please.' },
    { word: 'dress',  zh: '洋裝',   sentence: 'I like your dress.' },
    { word: 'duck',   zh: '鴨子',   sentence: 'Look at the duck!' },
    { word: 'each',   zh: '每一個', sentence: 'Give one to each child.' },
    { word: 'egg',    zh: '蛋',     sentence: 'I eat an egg.' },
    { word: 'every',  zh: '每個',   sentence: 'Every day is special.' },
    { word: 'over',   zh: '在…上方', sentence: 'The bird flew over the house.' },
    { word: 'new',    zh: '新的',   sentence: 'I got a new book.' },
    { word: 'sound',  zh: '聲音',   sentence: 'What is that sound?' },
    { word: 'take',   zh: '拿',     sentence: 'Please take one.' },
    { word: 'only',   zh: '只有',   sentence: 'I have only one.' },
    { word: 'little', zh: '小的',   sentence: 'The little cat is cute.' },
    { word: 'work',   zh: '工作',   sentence: 'We work together.' },
    { word: 'know',   zh: '知道',   sentence: 'I know the answer.' },
    { word: 'place',  zh: '地方',   sentence: 'This is a nice place.' },
    { word: 'years',  zh: '年',     sentence: 'I am six years old.' },
  ],

  sightColors: ['#FF6B6B','#A29BFE','#FFD93D','#00B894','#FF85CA','#74B9FF','#E17055'],

  sentences: [
    { en: 'My teacher tells us interesting stories every day.', zh: '我的老師每天都會跟我們分享有趣的故事。' },
    { en: 'I get very excited.', zh: '我總是感到非常興奮。' },
    { en: 'My friends think they are so silly.', zh: '只是我的朋友們覺得那些故事有些可笑。' },
    { en: 'One story was about a duck with a dress that lays eggs behind a door because she is very scared of the angry goat in the barn.', zh: '有個故事是關於一隻穿著裙子的鴨子。因為穀倉裡有隻愛生氣的山羊，鴨子很怕那隻山羊，因此鴨子只能躲在門後面下蛋。' },
    { en: 'I feel very sad for the duck.', zh: '我為那隻鴨子感到難過。' },
    { en: 'Joe loves the story about the brave bear that got lost in the forest.', zh: '我的朋友Joe喜歡的故事是關於一隻在森林中迷路但卻非常勇敢的熊。' },
    { en: 'He is so proud of the bear for never getting scared and helping other sick animals on his way.', zh: '那一隻熊不曾感到害怕而且一路上幫助其他生病的動物，他為那隻熊感到驕傲。' },
    { en: 'Some of my classmates get very bored and feel sleepy in class if my teacher talks about the history of toys.', zh: '而當老師在課堂上談到關於玩具歷史的時候，部分同學只會感到無聊且想睡覺。' },
    { en: 'They just want to play with them.', zh: '他們只想玩玩具。' },
    { en: 'My teacher makes me feel loved and her stories make me feel so happy!', zh: '老師總是讓我感受他對學生們的愛，而且也讓我感到開心。' },
  ],

  dialogues: [
    { q: 'What are those?', qzh: '那些是什麼？', a: 'They are my mom\'s shoes.', azh: '它們是我媽媽的鞋子。' },
    { q: 'Are these your pants?', qzh: '這是你的長褲嗎？', a: 'Yes, they are.', azh: '是，它們是。' },
    { q: 'Are those her books?', qzh: '那些是她的書嗎？', a: 'No, they aren\'t. They are mine.', azh: '不，不是。它們是我的。' },
    { q: 'What color do you like?', qzh: '你喜歡什麼顏色？', a: 'I like blue.', azh: '我喜歡藍色。' },
    { q: 'What color does your mom like?', qzh: '你媽媽喜歡什麼顏色？', a: 'She likes pink.', azh: '她喜歡粉紅色。' },
    { q: 'Do you like carrots?', qzh: '你喜歡胡蘿蔔嗎？', a: 'Yes, I do. But my sister doesn\'t.', azh: '是，我喜歡。但我妹妹不喜歡。' },
    { q: 'What can she do?', qzh: '她會做什麼？', a: 'She can ride horses.', azh: '她會騎馬。' },
    { q: 'Can your dad speak English?', qzh: '你爸爸會說英文嗎？', a: 'No, he can\'t. But he can speak Japanese.', azh: '不，他不會。但是他會說日文。' },
    { q: 'Can monkeys climb trees?', qzh: '猴子能爬樹嗎？', a: 'Yes, they can.', azh: '會，牠們會。' },
  ],
};
```

**Step 2: Commit**

```bash
git add weeks/week1.js
git commit -m "feat: extract week 1 content to weeks/week1.js"
```

---

### Task 2: Add week loader script to HTML `<head>`

**Files:**
- Modify: `week1.html:1-8` (inside `<head>`)

**Step 1: Add loader script after `<meta>` tags, before `<style>`**

Insert at line 6 (after `<title>` tag, before `<style>`):

```html
<script>
  var weekNum = new URLSearchParams(location.search).get('week') || '1';
  var s = document.createElement('script');
  s.src = 'weeks/week' + weekNum + '.js';
  s.async = false;
  document.head.appendChild(s);
</script>
```

Note: Uses `var` so `weekNum` is accessible to the main script block later. The `async = false` ensures the week data script executes before the main `<script>` block.

**Step 2: Commit**

```bash
git add week1.html
git commit -m "feat: add dynamic week content loader in head"
```

---

### Task 3: Replace hardcoded content arrays with WEEK_DATA references

**Files:**
- Modify: `week1.html:1224-1258` (DATA section — feelings, sightWords, sightColors)
- Modify: `week1.html:1261-1272` (sentences)
- Modify: `week1.html:1276-1286` (dialogues)

**Step 1: Replace the hardcoded arrays**

Replace lines 1224-1258 (the `feelings`, `sightWords`, `sightColors` const declarations) with:

```javascript
const feelings = WEEK_DATA.feelings;
const sightWords = WEEK_DATA.sightWords;
const sightColors = WEEK_DATA.sightColors;
```

Replace lines 1261-1272 (the `sentences` const declaration) with:

```javascript
const sentences = WEEK_DATA.sentences;
```

Replace lines 1276-1286 (the `dialogues` const declaration) with:

```javascript
const dialogues = WEEK_DATA.dialogues;
```

Keep the `sentenceReadCount` and `dialogueReadCount` initializers that follow immediately after — they reference `sentences.length` and `dialogues.length` which will resolve from WEEK_DATA.

**Step 2: Update `<title>` dynamically**

At the top of the main `<script>` block (around line 1219), after the cheat check, add:

```javascript
document.title = WEEK_DATA.title + ' ' + WEEK_DATA.titleEmoji;
```

**Step 3: Commit**

```bash
git add week1.html
git commit -m "refactor: use WEEK_DATA instead of hardcoded content arrays"
```

---

### Task 4: Key localStorage saves per week

**Files:**
- Modify: `week1.html` — `saveGame()` function (line 1845-1847)
- Modify: `week1.html` — `loadGame()` function (line 1849-1851)

**Step 1: Define SAVE_KEY after weekNum**

Near the top of `<script>` (after the cheat/title lines), add:

```javascript
const SAVE_KEY = 'mineGame_week' + weekNum;
```

**Step 2: Update saveGame()**

Change line 1846 from:
```javascript
localStorage.setItem('mineGame', JSON.stringify({...}));
```
to:
```javascript
localStorage.setItem(SAVE_KEY, JSON.stringify({...}));
```

**Step 3: Update loadGame()**

Change line 1851 from:
```javascript
const d = JSON.parse(localStorage.getItem('mineGame'));
```
to:
```javascript
const d = JSON.parse(localStorage.getItem(SAVE_KEY));
```

**Step 4: Add migration for existing saves**

Inside `loadGame()`, before the current try block, add a one-time migration that moves old `'mineGame'` data to `'mineGame_week1'`:

```javascript
// Migrate old single-key save to week-keyed format
if (weekNum === '1' && !localStorage.getItem('mineGame_week1') && localStorage.getItem('mineGame')) {
  localStorage.setItem('mineGame_week1', localStorage.getItem('mineGame'));
  localStorage.removeItem('mineGame');
}
```

**Step 5: Commit**

```bash
git add week1.html
git commit -m "feat: key localStorage saves per week with migration"
```

---

### Task 5: Rename `week1.html` to `index.html`

**Files:**
- Rename: `week1.html` → `index.html`

**Step 1: Rename the file**

```bash
git mv week1.html index.html
```

**Step 2: Commit**

```bash
git commit -m "refactor: rename week1.html to index.html for multi-week support"
```

---

### Task 6: Verify everything works

**Step 1: Open in browser and test**

Open `index.html` in browser (no URL params → defaults to week 1):
- Verify Learn tab shows all 12 feelings cards
- Verify Sight tab shows all 17 sight words
- Verify Read tab shows sentences and dialogues
- Verify Match game works
- Verify Quiz works
- Verify Mine tab works
- Verify existing save data was migrated (if any existed)

**Step 2: Test with explicit `?week=1` param**

Open `index.html?week=1` — should behave identically.

**Step 3: Test localStorage isolation**

Open DevTools → Application → Local Storage. Verify:
- Key is `mineGame_week1` (not `mineGame`)
- Old `mineGame` key was removed (migrated)

---

### Task 7: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Update Architecture section**

Update the "Architecture" section to reflect the new multi-file structure:

- `index.html` contains game engine (HTML/CSS/JS)
- `weeks/weekN.js` contains per-week content data
- Content loaded via `?week=N` URL parameter (defaults to 1)

**Step 2: Update Key Data Structures section**

Note that `feelings[]`, `sightWords[]`, `sightColors[]`, `sentences[]`, `dialogues[]` now come from `window.WEEK_DATA` loaded from `weeks/weekN.js`.

**Step 3: Update Save/load section**

Note that localStorage key is now `mineGame_weekN` (per-week).

**Step 4: Add "Adding New Content" section**

Document the process: copy `weeks/week1.js` → `weeks/week2.js`, replace data, access via `?week=2`.

**Step 5: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for multi-week content architecture"
```
