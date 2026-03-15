# Content Decoupling Design

## Goal

Separate weekly learning content (feelings, sightWords, sentences, dialogues) from the game engine so new weeks can be added by dropping in a single JS file.

## Constraints

- Only educational content changes per week; game mechanics (mining, crafting, tools, blocks) stay the same
- No build tools, no frameworks — keep vanilla JS
- Must work on GitHub Pages (static hosting)

## Architecture

### Approach: Global Variable Injection

Each week's content lives in a standalone JS file that sets `window.WEEK_DATA`. The main HTML file reads `?week=N` from the URL and dynamically loads the corresponding script via a synchronous script element in `<head>`.

### File Structure

```
iea/
├── index.html          ← renamed from week1.html (game engine)
├── weeks/
│   ├── week1.js        ← Week 1 content data
│   └── week2.js        ← Week 2 content data (future)
├── textures/           ← existing pixel art
└── .github/workflows/
    └── deploy.yml      ← no changes needed
```

### Content File Format (`weeks/weekN.js`)

```javascript
window.WEEK_DATA = {
  title: 'Feelings Fun!',
  titleEmoji: '🎭',
  feelings: [
    { word: 'happy', zh: '開心的', emoji: '😊', color: '#FFD93D' },
    // ...
  ],
  sightWords: [
    { word: 'door', zh: '門', sentence: 'Open the door.' },
    // ...
  ],
  sightColors: ['#FF6B6B', '#A29BFE', '#FFD93D', '#00B894', '#FF85CA', '#74B9FF', '#E17055'],
  sentences: [
    { en: 'My teacher tells us...', zh: '我的老師...' },
    // ...
  ],
  dialogues: [
    { q: 'What are those?', qzh: '那些是什麼？', a: 'They are...', azh: '它們是...' },
    // ...
  ]
};
```

### Loading Mechanism

In `<head>` of `index.html`, a small inline script reads the URL parameter and creates a synchronous `<script>` element to load the week data before the main script runs:

```html
<script>
  const weekNum = new URLSearchParams(location.search).get('week') || '1';
  const s = document.createElement('script');
  s.src = `weeks/week${weekNum}.js`;
  s.async = false;
  document.head.appendChild(s);
</script>
```

In the main `<script>` block, replace hardcoded arrays with:

```javascript
const feelings = WEEK_DATA.feelings;
const sightWords = WEEK_DATA.sightWords;
const sightColors = WEEK_DATA.sightColors;
const sentences = WEEK_DATA.sentences;
const dialogues = WEEK_DATA.dialogues;
```

### localStorage Separation

Each week gets its own save key:

```javascript
const SAVE_KEY = `mineGame_week${weekNum}`;
```

All `saveGame()` and `loadGame()` calls use `SAVE_KEY` instead of hardcoded `'mineGame'`.

### Dynamic Title

```javascript
document.title = `${WEEK_DATA.title} ${WEEK_DATA.titleEmoji}`;
```

## Adding a New Week

1. Copy `weeks/week1.js` to `weeks/week2.js`
2. Replace content data (feelings, sightWords, sentences, dialogues)
3. Access via `?week=2`

## Alternatives Considered

- **ES Module import()**: More modern but requires async initialization and `type="module"` migration. Too much churn for current architecture.
- **Fetch JSON**: Clean data format but async loading adds complexity and breaks `file://` development.
- **Inline multi-week object**: All weeks in one file gets bloated as weeks grow.
