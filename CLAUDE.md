# IEA - Feelings Fun! Educational Game

## Project Overview
A single-file HTML educational game for kids learning English emotions vocabulary, integrated with Minecraft-style mining/crafting mechanics. Target audience: young learners (ages 5-8) learning English as a second language (Chinese-speaking).

## Architecture
- **Game engine**: `index.html` contains HTML, CSS, and game JS
- **Weekly content**: `weeks/weekN.js` files set `window.WEEK_DATA` (feelings, sightWords, sentences, dialogues)
- **Content loading**: URL parameter `?week=N` (defaults to 1) dynamically loads `weeks/weekN.js`
- **No build tools**: Pure vanilla HTML/CSS/JS, no frameworks
- **Deployment**: GitHub Pages via `.github/workflows/deploy.yml`
- **License**: MIT

## Key Data Structures
- `WEEK_DATA` — loaded from `weeks/weekN.js`, contains per-week content:
  - `feelings[]` — emotion words (word/zh/emoji/color) for Learn/Match/Quiz
  - `sightWords[]` — sight words (word/zh/sentence) for Sight and Learn tabs
  - `sightColors[]` — color palette cycled for sight word cards
  - `sentences[]` — bilingual sentence reading practice
  - `dialogues[]` — bilingual Q&A dialogue practice
- `blocks[]` — Mineable/craftable items with tier/weight (game engine, not per-week)
- `pickaxes[]`, `axes[]`, `swords[]` — Tool progressions
- `recipes[]` — Crafting recipes (shaped and shapeless)
- `selectedTools` — `{tool: null, weapon: null}` — current equipment (migrated from old 3-slot format)
- `toolDurability{}` — Tracks remaining uses per tool instance

## Tabs / Sections
1. **Learn** (📖) — Feelings cards + sight words cards, sentence practice, TTS
2. **Sight** (👀) — Sight word cards with listen-then-confirm flow, earns ⚡
3. **Match** (🎯) — Word-emoji matching game, earns ⭐+⚡
4. **Quiz** (🧠) — Multiple choice quiz, earns ⭐+⚡
5. **Mine** (⛏️) — Hold-to-mine mountain grid, costs ⚡, drops blocks
6. **Collection** (📦) — Encyclopedia, Crafting (3x3 grid), House building, Equipment

## Currency System
- **⭐ Stars** — Accumulation metric from challenges
- **🔥 Streak** — Consecutive correct answers
- **⚡ Gems** — Spendable energy (earned from challenges, spent on mining)

## Important Patterns
- **Stacking contexts**: `.app` has `z-index: 1`. Pickers/modals must be appended to `.app` (not body) to avoid z-index trapping. The `.tool-slot:active { transform }` also creates stacking contexts.
- **Tool picker**: Appended to `.app` with `position: fixed`, positioned via `getBoundingClientRect()`. Backdrop is sibling of picker inside `.app`.
- **Save/load**: `localStorage` keyed per week (`mineGame_weekN`) with migration support
- **TTS**: Web Speech API with voice detection, speed toggle (slow/normal), mute toggle
- **SFX**: Web Audio API (oscillators + noise buffers) for mine, craft, tool break sounds

## Conventions
- UI labels are bilingual: Chinese primary with English secondary
- Colors from `WEEK_DATA.sightColors` array are cycled for sight word cards
- All interactive elements use Fredoka font for headers, Nunito for body
- Cards use consistent `var(--radius)` (20px), `var(--shadow)`, `var(--card-bg)`
- Mobile responsive at 600px breakpoint

## Adding New Weekly Content
1. Copy `weeks/week1.js` to `weeks/weekN.js`
2. Replace the content arrays (feelings, sightWords, sightColors, sentences, dialogues)
3. Update `title` and `titleEmoji` if desired
4. Access via `?week=N` — each week has independent localStorage progress

## Navigation Structure
Three nav groups with labels:
- 📚 學習 (Learning): Learn
- 🏆 挑戰 (Challenge): Sight, Match, Quiz
- ⛏️ 遊戲 (Game): Mine, Collection
