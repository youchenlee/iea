# Equipment, Animals & UI Improvements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add animals, swords, armor equipment, hold-to-mine mechanic, and UI improvements (logo, settings modal) to the Feelings Fun mining game.

**Architecture:** All code in `week1.html`. New data arrays (animals, swords, armor) added to DATA section. New state for equipped armor. Hold-to-mine replaces click events with press-and-hold via mouse/touch. UI changes: logo fixed top-left, settings in modal overlay.

**Tech Stack:** Vanilla HTML/CSS/JS, localStorage, emoji visuals.

**Note on innerHTML:** This app uses trusted hardcoded data only (no user input rendered). Use textContent or safe DOM methods throughout.

---

### Task 1: UI — Move Logo to Top-Left + Settings Modal

**Files:**
- Modify: `week1.html:42-52` (header CSS)
- Modify: `week1.html:609-628` (header HTML, settings HTML)
- Modify: `week1.html` (add modal CSS before `</style>`, add modal JS)

**Step 1: Change header CSS to fixed top-left**

Replace `.header` CSS (lines 42-52) with:

```css
.header {
  position: fixed; top: 8px; left: 12px; z-index: 50;
  text-align: left; padding: 0;
}
.header h1 {
  font-family: 'Fredoka', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #FF6B6B, #A29BFE, #FFD93D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}
.header .subtitle { display: none; }
```

**Step 2: Add version + settings button to score bar**

Replace the header HTML (lines 609-628) with:

```html
<div class="header">
  <h1>Feelings Fun! 🎭</h1>
</div>

<div class="score-bar">
  <div class="score-item" id="starBar"><span>⭐</span> <span id="stars">0</span></div>
  <div class="score-item" id="streakBar"><span>🔥</span> <span id="streak">0</span></div>
  <div class="score-item" id="gemBar"><span>⚡</span> <span id="gems">0</span></div>
  <div class="score-item settings-btn" id="settingsBtn">⚙️</div>
</div>
```

Remove the `<details>` settings block entirely.

**Step 3: Add settings modal HTML (after confetti-box div, line 693)**

```html
<div class="modal-overlay" id="settingsModal" style="display:none;">
  <div class="modal-content">
    <div class="modal-header">
      <h3>⚙️ 設定</h3>
      <button class="modal-close" id="settingsClose">✕</button>
    </div>
    <div class="speed-toggle">
      <button class="speed-btn" data-speed="slow" id="speedSlow">🐢 Slow</button>
      <button class="speed-btn active" data-speed="normal" id="speedNormal">🐇 Normal</button>
    </div>
    <div id="engineStatus" style="text-align:center;font-size:0.8rem;color:#B2BEC3;margin-top:8px;">🔍 偵測中...</div>
    <div style="text-align:center;margin-top:12px;font-size:0.7rem;color:#B2BEC3;">v2.5.0</div>
  </div>
</div>
```

**Step 4: Add modal CSS (before `</style>`, line 604)**

```css
.settings-btn { cursor: pointer; }
.settings-btn:hover { transform: scale(1.1); }
.modal-overlay {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(4px);
}
.modal-content {
  background: white; border-radius: 16px; padding: 24px;
  min-width: 280px; max-width: 90vw;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}
.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px;
}
.modal-header h3 { font-family: 'Fredoka', sans-serif; font-size: 1.2rem; }
.modal-close {
  background: none; border: none; font-size: 1.2rem; cursor: pointer;
  color: #636E72; padding: 4px 8px; border-radius: 8px;
}
.modal-close:hover { background: #F0F0F5; }
```

**Step 5: Add modal JS (in INIT section, after loadGame)**

```js
document.getElementById('settingsBtn').addEventListener('click', () => {
  document.getElementById('settingsModal').style.display = 'flex';
});
document.getElementById('settingsClose').addEventListener('click', () => {
  document.getElementById('settingsModal').style.display = 'none';
});
document.getElementById('settingsModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) e.currentTarget.style.display = 'none';
});
```

**Step 6: Add top padding to .app for fixed header**

Update `.app` CSS (line 40) to add `padding-top: 40px`.

**Step 7: Test manually**

Open in browser. Verify:
- Logo fixed top-left, small
- Score bar fixed top-right (unchanged)
- ⚙️ opens modal with speed toggle + engine status
- Click outside modal or ✕ closes it
- Nav tabs not overlapped

**Step 8: Commit**

```bash
git add week1.html
git commit -m "feat: move logo top-left, settings to modal overlay"
```

---

### Task 2: Add Animal & Sword Data + New Items to blocks[]

**Files:**
- Modify: `week1.html:724-784` (blocks, swords data, craftRecipes)

**Step 1: Add animal drop items to blocks[] (after amethyst, before tools)**

Insert after line 735 (`amethyst`):

```js
  // Animal drops (tier 0, weight 0 = drop-only)
  { id: 'leather',      name: '皮革',   emoji: '🟤', tier: 0, weight: 0 },
  { id: 'pork',         name: '豬排',   emoji: '🍖', tier: 0, weight: 0 },
  { id: 'chicken_meat', name: '雞肉',   emoji: '🍗', tier: 0, weight: 0 },
  { id: 'feather',      name: '羽毛',   emoji: '🪶', tier: 0, weight: 0 },
  { id: 'wool',         name: '羊毛',   emoji: '🧶', tier: 0, weight: 0 },
```

**Step 2: Add sword tool items to blocks[] (after diamond_axe)**

```js
  { id: 'stone_sword',   name: '石劍',   emoji: '🗡️', tier: 0, weight: 0 },
  { id: 'iron_sword',    name: '鐵劍',   emoji: '🗡️', tier: 0, weight: 0 },
  { id: 'gold_sword',    name: '金劍',   emoji: '🗡️', tier: 0, weight: 0 },
  { id: 'diamond_sword', name: '鑽石劍', emoji: '🗡️', tier: 0, weight: 0 },
```

**Step 3: Add armor items to blocks[] (after swords)**

```js
  // Armor items (tier 0, weight 0)
  { id: 'leather_helmet',  name: '皮革頭盔', emoji: '🪖', tier: 0, weight: 0 },
  { id: 'leather_chest',   name: '皮革盔甲', emoji: '🦺', tier: 0, weight: 0 },
  { id: 'leather_legs',    name: '皮革褲子', emoji: '👖', tier: 0, weight: 0 },
  { id: 'leather_boots',   name: '皮革鞋子', emoji: '👢', tier: 0, weight: 0 },
  { id: 'iron_helmet',     name: '鐵頭盔',   emoji: '🪖', tier: 0, weight: 0 },
  { id: 'iron_chest',      name: '鐵盔甲',   emoji: '🦺', tier: 0, weight: 0 },
  { id: 'iron_legs',       name: '鐵褲子',   emoji: '👖', tier: 0, weight: 0 },
  { id: 'iron_boots',      name: '鐵鞋子',   emoji: '👢', tier: 0, weight: 0 },
  { id: 'gold_helmet',     name: '金頭盔',   emoji: '🪖', tier: 0, weight: 0 },
  { id: 'gold_chest',      name: '金盔甲',   emoji: '🦺', tier: 0, weight: 0 },
  { id: 'gold_legs',       name: '金褲子',   emoji: '👖', tier: 0, weight: 0 },
  { id: 'gold_boots',      name: '金鞋子',   emoji: '👢', tier: 0, weight: 0 },
  { id: 'diamond_helmet',  name: '鑽石頭盔', emoji: '🪖', tier: 0, weight: 0 },
  { id: 'diamond_chest',   name: '鑽石盔甲', emoji: '🦺', tier: 0, weight: 0 },
  { id: 'diamond_legs',    name: '鑽石褲子', emoji: '👖', tier: 0, weight: 0 },
  { id: 'diamond_boots',   name: '鑽石鞋子', emoji: '👢', tier: 0, weight: 0 },
```

**Step 4: Add animals data array (after axes array)**

```js
const animals = [
  { id: 'cow',     name: '牛',  emoji: '🐄', drops: [{ id: 'leather', min: 1, max: 2 }] },
  { id: 'pig',     name: '豬',  emoji: '🐷', drops: [{ id: 'pork', min: 1, max: 1 }] },
  { id: 'chicken', name: '雞',  emoji: '🐔', drops: [{ id: 'chicken_meat', min: 1, max: 1 }, { id: 'feather', min: 1, max: 1 }] },
  { id: 'sheep',   name: '羊',  emoji: '🐑', drops: [{ id: 'wool', min: 1, max: 2 }] },
];
```

**Step 5: Add swords array (after animals)**

```js
const swords = [
  { id: 'wood_sword',    name: '木劍',   emoji: '🗡️', holdTime: 1500, durability: Infinity, recipe: null, pattern: null },
  { id: 'stone_sword',   name: '石劍',   emoji: '🗡️', holdTime: 1000, durability: 30,
    recipe: { stick: 1, stone: 2 },
    pattern: [null,'stone',null, null,'stone',null, null,'stick',null] },
  { id: 'iron_sword',    name: '鐵劍',   emoji: '🗡️', holdTime: 700, durability: 60,
    recipe: { stick: 1, iron: 2 },
    pattern: [null,'iron',null, null,'iron',null, null,'stick',null] },
  { id: 'gold_sword',    name: '金劍',   emoji: '🗡️', holdTime: 700, durability: 25,
    recipe: { stick: 1, gold: 2 },
    pattern: [null,'gold',null, null,'gold',null, null,'stick',null] },
  { id: 'diamond_sword', name: '鑽石劍', emoji: '🗡️', holdTime: 400, durability: 150,
    recipe: { stick: 1, diamond: 2 },
    pattern: [null,'diamond',null, null,'diamond',null, null,'stick',null] },
];
```

**Step 6: Add armor recipes array (after swords)**

```js
const armorSlots = ['helmet', 'chest', 'legs', 'boots'];
const armorMaterials = [
  { id: 'leather', name: '皮革', emoji: '🟤' },
  { id: 'iron',    name: '鐵',   emoji: '⬜' },
  { id: 'gold',    name: '金',   emoji: '🟡' },
  { id: 'diamond', name: '鑽石', emoji: '💎' },
];

const armorRecipes = [
  // Helmets: XXX / X_X / ___
  { outputId: 'leather_helmet', material: 'leather', slot: 'helmet',
    recipe: { leather: 5 },
    pattern: ['leather','leather','leather', 'leather',null,'leather', null,null,null] },
  { outputId: 'iron_helmet', material: 'iron', slot: 'helmet',
    recipe: { iron: 5 },
    pattern: ['iron','iron','iron', 'iron',null,'iron', null,null,null] },
  { outputId: 'gold_helmet', material: 'gold', slot: 'helmet',
    recipe: { gold: 5 },
    pattern: ['gold','gold','gold', 'gold',null,'gold', null,null,null] },
  { outputId: 'diamond_helmet', material: 'diamond', slot: 'helmet',
    recipe: { diamond: 5 },
    pattern: ['diamond','diamond','diamond', 'diamond',null,'diamond', null,null,null] },
  // Chestplates: X_X / XXX / XXX
  { outputId: 'leather_chest', material: 'leather', slot: 'chest',
    recipe: { leather: 8 },
    pattern: ['leather',null,'leather', 'leather','leather','leather', 'leather','leather','leather'] },
  { outputId: 'iron_chest', material: 'iron', slot: 'chest',
    recipe: { iron: 8 },
    pattern: ['iron',null,'iron', 'iron','iron','iron', 'iron','iron','iron'] },
  { outputId: 'gold_chest', material: 'gold', slot: 'chest',
    recipe: { gold: 8 },
    pattern: ['gold',null,'gold', 'gold','gold','gold', 'gold','gold','gold'] },
  { outputId: 'diamond_chest', material: 'diamond', slot: 'chest',
    recipe: { diamond: 8 },
    pattern: ['diamond',null,'diamond', 'diamond','diamond','diamond', 'diamond','diamond','diamond'] },
  // Leggings: XXX / X_X / X_X
  { outputId: 'leather_legs', material: 'leather', slot: 'legs',
    recipe: { leather: 7 },
    pattern: ['leather','leather','leather', 'leather',null,'leather', 'leather',null,'leather'] },
  { outputId: 'iron_legs', material: 'iron', slot: 'legs',
    recipe: { iron: 7 },
    pattern: ['iron','iron','iron', 'iron',null,'iron', 'iron',null,'iron'] },
  { outputId: 'gold_legs', material: 'gold', slot: 'legs',
    recipe: { gold: 7 },
    pattern: ['gold','gold','gold', 'gold',null,'gold', 'gold',null,'gold'] },
  { outputId: 'diamond_legs', material: 'diamond', slot: 'legs',
    recipe: { diamond: 7 },
    pattern: ['diamond','diamond','diamond', 'diamond',null,'diamond', 'diamond',null,'diamond'] },
  // Boots: ___ / X_X / X_X
  { outputId: 'leather_boots', material: 'leather', slot: 'boots',
    recipe: { leather: 4 },
    pattern: [null,null,null, 'leather',null,'leather', 'leather',null,'leather'] },
  { outputId: 'iron_boots', material: 'iron', slot: 'boots',
    recipe: { iron: 4 },
    pattern: [null,null,null, 'iron',null,'iron', 'iron',null,'iron'] },
  { outputId: 'gold_boots', material: 'gold', slot: 'boots',
    recipe: { gold: 4 },
    pattern: [null,null,null, 'gold',null,'gold', 'gold',null,'gold'] },
  { outputId: 'diamond_boots', material: 'diamond', slot: 'boots',
    recipe: { diamond: 4 },
    pattern: [null,null,null, 'diamond',null,'diamond', 'diamond',null,'diamond'] },
];
```

**Step 7: Fix iron_pick maxTier to 5 (so diamonds are accessible)**

Change `iron_pick` maxTier from 4 to 5. This matches Minecraft where iron pickaxe can mine diamonds.

**Step 8: Commit**

```bash
git add week1.html
git commit -m "feat: add animal, sword, and armor data arrays"
```

---

### Task 3: Sword & Armor State + Crafting Integration

**Files:**
- Modify: `week1.html` (state section, getActiveTool, checkCraftMatch, doCraft)

**Step 1: Add equipped state (after `discovered` declaration, ~line 806)**

```js
let equipped = { helmet: null, chest: null, legs: null, boots: null };
```

**Step 2: Add sword helper functions (after getActiveTool)**

```js
function getEffectiveSword() {
  return getActiveTool(swords);
}

function getEffectiveSwordHoldTime() {
  const sword = getEffectiveSword();
  return sword ? sword.holdTime : 2000; // no sword = 2s
}
```

**Step 3: Update saveGame to include equipped**

Change the `saveGame()` JSON.stringify to include `equipped`:
```js
function saveGame() {
  localStorage.setItem('mineGame', JSON.stringify({
    gems, inventory, houseProgress, stars, streak, craftGrid,
    toolDurability, discovered: [...discovered], equipped
  }));
}
```

**Step 4: Update loadGame to restore equipped**

Add after the `discovered` restoration in `loadGame()`:
```js
if (d.equipped) equipped = { helmet: null, chest: null, legs: null, boots: null, ...d.equipped };
```

**Step 5: Add sword recipes to checkCraftMatch (after axe check)**

```js
  // Check sword recipes
  for (const sword of swords) {
    if (!sword.pattern) continue;
    const match = sword.pattern.every((need, i) => {
      if (need === null) return craftGrid[i] === null;
      return craftGrid[i] === need;
    });
    if (match) return { type: 'sword', item: sword, emoji: sword.emoji, name: sword.name };
  }
  // Check armor recipes
  for (const armor of armorRecipes) {
    const match = armor.pattern.every((need, i) => {
      if (need === null) return craftGrid[i] === null;
      return craftGrid[i] === need;
    });
    if (match) {
      const b = blocks.find(x => x.id === armor.outputId);
      return { type: 'armor', item: armor, emoji: b.emoji, name: b.name };
    }
  }
```

**Step 6: Update doCraft to handle sword and armor types**

In `doCraft()`, update the if/else chain:

```js
  if (match.type === 'pickaxe' || match.type === 'axe' || match.type === 'sword') {
    addBlock(match.item.id);
    if (!toolDurability[match.item.id] && match.item.durability !== Infinity) {
      toolDurability[match.item.id] = match.item.durability;
    }
  } else if (match.type === 'armor') {
    addBlock(match.item.outputId);
  } else if (match.type === 'item') {
    addBlock(match.item.outputId, match.item.outputCount);
  }
```

**Step 7: Update renderRecipeBook to show sword and armor recipes**

In `renderRecipeBook()`, add sword and armor recipe cards after the existing axe cards. Follow the same pattern: iterate `swords` (skip index 0 wood_sword) and `armorRecipes`, render mini 3x3 grid for each.

**Step 8: Update durability bar in updateCraftUI to also check swords**

Change line that finds tool definition:
```js
const toolDef = pickaxes.find(p => p.id === b.id) || axes.find(a => a.id === b.id) || swords.find(s => s.id === b.id);
```

**Step 9: Commit**

```bash
git add week1.html
git commit -m "feat: sword and armor crafting integration"
```

---

### Task 4: Animals on Mountain + Attack Mechanic

**Files:**
- Modify: `week1.html` (initMine, mountainShape, mine CSS)

**Step 1: Add animal CSS (before `</style>`)**

```css
.mine-cell.animal { background: none; border: none; box-shadow: none; font-size: 1.5rem; cursor: pointer; }
.mine-cell.animal:hover { transform: scale(1.15); }
.mine-cell.animal.mined { background: none !important; border: none; box-shadow: none; opacity: 0; pointer-events: none; }
```

**Step 2: Modify initMine to place animals in tree rows**

In `initMine()`, update the `if (rowDef.tier === 0)` block. Currently all tier-0 cells are trees. Change to randomly mix trees and animals:

```js
if (rowDef.tier === 0) {
  if (Math.random() < 0.35) {
    // Animal
    const animal = animals[Math.floor(Math.random() * animals.length)];
    cellEl.classList.add('animal');
    cellEl.textContent = animal.emoji;
    const animalData = { tier: 0, mined: false, block: null, animal: animal, el: cellEl };
    cellEl.dataset.type = 'animal';
    rowData.push(animalData);
  } else {
    // Tree (existing code)
    cellEl.classList.add('tree');
    cellEl.textContent = Math.random() > 0.5 ? '🌳' : '🌲';
    const woodBlock = blocks.find(b => b.id === 'wood');
    const treeData = { tier: 0, mined: false, block: woodBlock, el: cellEl };
    cellEl.dataset.type = 'tree';
    rowData.push(treeData);
  }
}
```

**Step 3: Add attackAnimal function**

```js
function attackAnimal(cellData) {
  if (cellData.mined) return;
  if (gems < 1) {
    playLockedSfx();
    document.getElementById('mineResult').textContent = '⚡ 體力不足！去答題補充吧！';
    return;
  }
  playMineSfx(1);
  gems--;
  updateGemDisplay();
  cellData.mined = true;
  cellData.el.classList.add('mined');

  const animal = cellData.animal;
  const activeSword = getEffectiveSword();
  const brokeName = useTool(activeSword);

  let msg = animal.emoji + ' 擊敗' + animal.name + '！獲得：';
  animal.drops.forEach(drop => {
    const count = drop.min + Math.floor(Math.random() * (drop.max - drop.min + 1));
    addBlock(drop.id, count);
    const b = blocks.find(x => x.id === drop.id);
    msg += ' ' + b.emoji + b.name + ' x' + count;
  });
  if (brokeName) msg += ' ⚠️ ' + brokeName + ' 壞掉了！';

  document.getElementById('mineResult').textContent = msg;
  updateMineRefreshBtn();
  saveGame();
}
```

**Step 4: Update mine header to show sword info**

In `initMine()` header section, add sword info after axe info:

```js
const activeSword = getEffectiveSword();
const swordLabel = activeSword && activeSword.id !== 'wood_sword' ? '  |  🗡️ ' + activeSword.name + getToolDurabilityText(activeSword) : '';
pickInfo.textContent = '⛏️ ' + pick.name + pickDur + '（可挖第 ' + pick.maxTier + ' 層）' + axeLabel + swordLabel;
```

**Step 5: Commit**

```bash
git add week1.html
git commit -m "feat: animals on mountain surface with attack mechanic"
```

---

### Task 5: Hold-to-Mine Mechanic

**Files:**
- Modify: `week1.html` (initMine event listeners, new hold functions, CSS for progress bar)

**Step 1: Add hold-to-mine CSS (before `</style>`)**

```css
.mine-progress {
  position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
  background: rgba(0,0,0,0.2); border-radius: 0 0 4px 4px;
  overflow: hidden;
}
.mine-progress-fill {
  height: 100%; width: 0%; background: #00B894;
  transition: none;
}
```

Remove the existing `.mine-cell:active:not(.mined):not(.locked) { transform: scale(0.9); }` rule.

**Step 2: Add hold-to-mine state variables and functions**

```js
let mineHoldRAF = null;
let mineHoldTarget = null;
let mineHoldStart = 0;

function getMineHoldDuration(cellData) {
  if (cellData.animal) {
    const sword = getEffectiveSword();
    return sword ? sword.holdTime : 2000;
  }
  if (cellData.tier === 0) {
    // Tree
    return getEffectiveAxeBonus() > 1 ? 600 : 1000;
  }
  // Mining block
  const pickLevel = getEffectivePickaxeLevel();
  const pick = pickaxes[pickLevel];
  if (cellData.tier > pick.maxTier) return Infinity; // can't mine
  // Optimal tool: fast. Sub-optimal: slower.
  const tierDiff = cellData.tier - pickLevel;
  if (tierDiff <= 0) return 800;  // good pickaxe
  return 800 + tierDiff * 600;    // wrong tool = slower
}

function startMineHold(cellData) {
  if (cellData.mined) return;

  const duration = getMineHoldDuration(cellData);
  if (duration === Infinity) {
    playLockedSfx();
    document.getElementById('mineResult').textContent = '🔒 需要更好的鎬才能挖第 ' + cellData.tier + ' 層！';
    return;
  }

  // Add progress bar
  let bar = cellData.el.querySelector('.mine-progress');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'mine-progress';
    const fill = document.createElement('div');
    fill.className = 'mine-progress-fill';
    bar.appendChild(fill);
    cellData.el.appendChild(bar);
  }
  const fill = bar.querySelector('.mine-progress-fill');
  fill.style.width = '0%';

  mineHoldStart = Date.now();
  mineHoldTarget = { cellData, duration, fill };

  function updateProgress() {
    if (!mineHoldTarget) return;
    const elapsed = Date.now() - mineHoldStart;
    const pct = Math.min(100, (elapsed / duration) * 100);
    fill.style.width = pct + '%';
    if (elapsed >= duration) {
      completeMineHold();
      return;
    }
    mineHoldRAF = requestAnimationFrame(updateProgress);
  }
  mineHoldRAF = requestAnimationFrame(updateProgress);
}

function completeMineHold() {
  if (!mineHoldTarget) return;
  const { cellData } = mineHoldTarget;
  cancelMineHold(false);

  if (cellData.animal) {
    attackAnimal(cellData);
  } else if (cellData.tier === 0) {
    chopTree(cellData);
  } else {
    for (let r = 0; r < mineData.length; r++) {
      for (let c = 0; c < mineData[r].length; c++) {
        if (mineData[r][c] === cellData) {
          mineMountainCell(r, c, cellData);
          return;
        }
      }
    }
  }
}

function cancelMineHold(resetBar) {
  if (resetBar === undefined) resetBar = true;
  if (mineHoldRAF) cancelAnimationFrame(mineHoldRAF);
  mineHoldRAF = null;
  if (resetBar && mineHoldTarget) {
    mineHoldTarget.fill.style.width = '0%';
  }
  mineHoldTarget = null;
}
```

**Step 3: Replace click event listeners in initMine with hold events**

Remove the existing `cellEl.addEventListener('click', ...)` lines for both trees and blocks. After creating cellEl and pushing cellData/treeData/animalData to rowData, add:

```js
const holdData = rowData[rowData.length - 1]; // the data we just pushed
if (holdData) {
  const startHold = (e) => { e.preventDefault(); startMineHold(holdData); };
  const endHold = () => cancelMineHold();
  cellEl.addEventListener('mousedown', startHold);
  cellEl.addEventListener('mouseup', endHold);
  cellEl.addEventListener('mouseleave', endHold);
  cellEl.addEventListener('touchstart', startHold, { passive: false });
  cellEl.addEventListener('touchend', endHold);
  cellEl.addEventListener('touchcancel', endHold);
}
```

**Step 4: Test manually**

- Press and hold a tree — progress bar fills — tree chopped
- Press and hold an animal — progress bar fills — animal attacked
- Press and hold a block — progress bar fills — block mined
- Release early — progress resets
- Touch on mobile — same behavior
- Locked blocks — immediate "need better pickaxe" message

**Step 5: Commit**

```bash
git add week1.html
git commit -m "feat: hold-to-mine mechanic with progress bar (touch + mouse)"
```

---

### Task 6: Equipment Page (Collection Sub-Tab) + Character Display

**Files:**
- Modify: `week1.html` (initCollection, new renderEquipment function, character rendering, CSS)

**Step 1: Add equipment CSS (before `</style>`)**

```css
.character-display {
  display: flex; flex-direction: column; align-items: center;
  gap: 2px; margin: 16px auto;
}
.character-row { font-size: 2rem; line-height: 1.1; text-align: center; }
.character-display.small { margin: 0; }
.character-display.small .character-row { font-size: 1.2rem; }

.equip-area { text-align: center; }
.equip-slots {
  display: flex; flex-direction: column; align-items: center;
  gap: 8px; margin: 16px 0;
}
.equip-slot {
  display: flex; align-items: center; gap: 12px;
  background: white; padding: 8px 16px; border-radius: 12px;
  box-shadow: 0 2px 8px var(--shadow); min-width: 200px;
  cursor: pointer; transition: all 0.2s;
}
.equip-slot:hover { transform: scale(1.02); box-shadow: 0 4px 12px var(--shadow); }
.equip-slot-label { font-size: 0.8rem; color: #636E72; font-family: 'Fredoka', sans-serif; min-width: 50px; }
.equip-slot-item { font-size: 1.3rem; }
.equip-slot-name { font-family: 'Fredoka', sans-serif; font-size: 0.9rem; }
.equip-slot-empty { color: #B2BEC3; font-style: italic; }

.equip-inventory {
  display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
  margin-top: 16px; padding: 12px;
  background: #F0F0F5; border-radius: 12px;
}
.equip-inv-item {
  width: 48px; height: 48px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; background: white; border-radius: 8px;
  cursor: pointer; transition: all 0.2s; position: relative;
  box-shadow: 0 1px 4px var(--shadow);
}
.equip-inv-item:hover { transform: scale(1.1); }
```

**Step 2: Add renderCharacter function**

```js
function renderCharacter(container, size) {
  container.textContent = '';
  const display = document.createElement('div');
  display.className = 'character-display' + (size === 'small' ? ' small' : '');

  const helmetEmoji = equipped.helmet ? (blocks.find(b => b.id === equipped.helmet) || {}).emoji || '😊' : '😊';
  const chestEmoji = equipped.chest ? (blocks.find(b => b.id === equipped.chest) || {}).emoji || '👕' : '👕';
  const legsEmoji = equipped.legs ? (blocks.find(b => b.id === equipped.legs) || {}).emoji || '👖' : '👖';
  const bootsEmoji = equipped.boots ? (blocks.find(b => b.id === equipped.boots) || {}).emoji || '👟' : '👟';

  [helmetEmoji, chestEmoji, legsEmoji, bootsEmoji].forEach(emoji => {
    const row = document.createElement('div');
    row.className = 'character-row';
    row.textContent = emoji;
    display.appendChild(row);
  });

  // Show held tool
  const pick = pickaxes[getEffectivePickaxeLevel()];
  const toolRow = document.createElement('div');
  toolRow.className = 'character-row';
  toolRow.style.fontSize = size === 'small' ? '0.8rem' : '1.2rem';
  toolRow.style.marginTop = '4px';
  toolRow.textContent = pick.emoji;
  display.appendChild(toolRow);

  container.appendChild(display);
}
```

**Step 3: Add 'equip' sub-tab to initCollection**

Update the sub-tab list in `initCollection()`:
```js
['encyclopedia', 'craft', 'house', 'equip'].forEach(view => {
  const labels = { encyclopedia: '📖 圖鑑', craft: '🔨 合成', house: '🏠 蓋房子', equip: '👤 裝備' };
```

Add to the render switch:
```js
else if (collectionView === 'equip') renderEquipment(content);
```

**Step 4: Add renderEquipment function**

```js
function renderEquipment(c) {
  const area = document.createElement('div');
  area.className = 'equip-area';

  // Character display
  const charContainer = document.createElement('div');
  renderCharacter(charContainer, 'large');
  area.appendChild(charContainer);

  // Equipment slots
  const slotsEl = document.createElement('div');
  slotsEl.className = 'equip-slots';
  const slotLabels = { helmet: '🪖 頭盔', chest: '🦺 盔甲', legs: '👖 褲子', boots: '👢 鞋子' };

  armorSlots.forEach(slot => {
    const slotEl = document.createElement('div');
    slotEl.className = 'equip-slot';

    const label = document.createElement('div');
    label.className = 'equip-slot-label';
    label.textContent = slotLabels[slot];
    slotEl.appendChild(label);

    const itemEl = document.createElement('div');
    itemEl.className = 'equip-slot-item';

    if (equipped[slot]) {
      const b = blocks.find(x => x.id === equipped[slot]);
      itemEl.textContent = b ? b.emoji : '';
      const nameEl = document.createElement('div');
      nameEl.className = 'equip-slot-name';
      nameEl.textContent = b ? b.name : '';
      slotEl.appendChild(itemEl);
      slotEl.appendChild(nameEl);

      // Click to unequip
      slotEl.addEventListener('click', () => {
        addBlock(equipped[slot]);
        equipped[slot] = null;
        saveGame();
        initCollection();
      });
    } else {
      itemEl.textContent = '—';
      const nameEl = document.createElement('div');
      nameEl.className = 'equip-slot-name equip-slot-empty';
      nameEl.textContent = '空';
      slotEl.appendChild(itemEl);
      slotEl.appendChild(nameEl);

      // Click to equip best available
      slotEl.addEventListener('click', () => {
        const available = blocks.filter(b => b.id.includes('_' + slot) && getBlockCount(b.id) > 0);
        if (available.length === 0) return;
        const best = available[available.length - 1]; // highest tier
        inventory[best.id] = (inventory[best.id] || 1) - 1;
        if (inventory[best.id] <= 0) delete inventory[best.id];
        equipped[slot] = best.id;
        saveGame();
        initCollection();
      });
    }

    slotsEl.appendChild(slotEl);
  });
  area.appendChild(slotsEl);

  // Available equipment in inventory
  const invTitle = document.createElement('div');
  invTitle.style.cssText = 'text-align:center;margin-top:16px;font-family:Fredoka,sans-serif;font-size:0.9rem;color:#636E72;';
  invTitle.textContent = '📦 背包中的裝備（點擊穿上）';
  area.appendChild(invTitle);

  const invGrid = document.createElement('div');
  invGrid.className = 'equip-inventory';
  let hasEquipment = false;

  blocks.forEach(b => {
    if (!b.id.includes('_helmet') && !b.id.includes('_chest') && !b.id.includes('_legs') && !b.id.includes('_boots')) return;
    const count = getBlockCount(b.id);
    if (count <= 0) return;
    hasEquipment = true;

    const item = document.createElement('div');
    item.className = 'equip-inv-item';
    item.textContent = b.emoji;
    item.title = b.name;

    const countEl = document.createElement('span');
    countEl.className = 'inv-count';
    countEl.textContent = count;
    item.appendChild(countEl);

    const slot = b.id.includes('_helmet') ? 'helmet' : b.id.includes('_chest') ? 'chest' : b.id.includes('_legs') ? 'legs' : 'boots';
    item.addEventListener('click', () => {
      if (equipped[slot]) addBlock(equipped[slot]);
      inventory[b.id] = (inventory[b.id] || 1) - 1;
      if (inventory[b.id] <= 0) delete inventory[b.id];
      equipped[slot] = b.id;
      saveGame();
      initCollection();
    });

    invGrid.appendChild(item);
  });

  if (!hasEquipment) {
    const emptyMsg = document.createElement('div');
    emptyMsg.style.cssText = 'color:#B2BEC3;font-size:0.85rem;padding:8px;';
    emptyMsg.textContent = '還沒有裝備，去合成一些吧！';
    invGrid.appendChild(emptyMsg);
  }
  area.appendChild(invGrid);
  c.appendChild(area);
}
```

**Step 5: Add small character to mine page**

In `initMine()`, replace `area.appendChild(mountain)` with a flex wrapper:

```js
const mineLayout = document.createElement('div');
mineLayout.style.cssText = 'display:flex;align-items:flex-start;justify-content:center;gap:12px;';
mineLayout.appendChild(mountain);

const charSide = document.createElement('div');
charSide.id = 'mineCharacter';
renderCharacter(charSide, 'small');
mineLayout.appendChild(charSide);

area.appendChild(mineLayout);
```

**Step 6: Commit**

```bash
git add week1.html
git commit -m "feat: equipment page with character display and armor management"
```

---

### Task 7: Mobile Responsive + Version Bump + Final Polish

**Files:**
- Modify: `week1.html`

**Step 1: Add/update mobile responsive CSS**

In the existing `@media (max-width: 500px)` block, add:

```css
  .character-display.small { display: none; }
  .equip-slot { min-width: 160px; padding: 6px 10px; }
  .equip-inv-item { width: 40px; height: 40px; font-size: 1.2rem; }
  .modal-content { min-width: auto; width: 90vw; }
```

**Step 2: Bump version to v2.5.0**

Update the version in the settings modal HTML.

**Step 3: Test on mobile viewport**

Resize browser to 375px width. Verify:
- Logo + score bar don't overlap
- Nav groups wrap properly
- Mine page works without character on small screens
- Equipment page is usable
- Settings modal fits
- Hold-to-mine works with touch

**Step 4: Commit and push**

```bash
git add week1.html
git commit -m "feat: mobile responsive + v2.5.0"
git push
```

---

### Appendix: Diamond & Lock FAQ

**How to get diamonds:**
1. Craft Stone Pickaxe (stone x3 + stick x2) — unlocks tier 3 (iron, copper)
2. Craft Iron Pickaxe (iron x3 + stick x2) — unlocks tier 5 (diamond, amethyst)
3. Mine diamonds from the bottom of the mountain
4. Craft Diamond Pickaxe (diamond x3 + stick x2) — higher durability (150 vs 60)

**How locked blocks work:**
- Blocks show 🔒 when player's best pickaxe `maxTier` < block tier
- Wood pickaxe: tiers 1-2 (dirt, wood, stone, coal)
- Stone pickaxe: tiers 1-3 (adds iron, copper)
- Iron pickaxe: tiers 1-5 (adds gold, emerald, diamond, amethyst)
- Gold/Diamond pickaxe: durability/prestige upgrades
