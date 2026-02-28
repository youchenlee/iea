# Equipment, Animals & UI Improvements Design

## Goal

Add animals, swords, and a full armor equipment system to the Minecraft mining game. Improve mining UX with hold-to-mine. Move logo and settings to save screen space.

## Features

### 1. Animals

Animals appear in the mountain's tree rows (tier 0), mixed with trees. Each mountain refresh randomizes placement.

| Animal | Emoji | Drops |
|--------|-------|-------|
| Cow | 🐄 | Leather x1-2 |
| Pig | 🐷 | Pork 🍖 x1 |
| Chicken | 🐔 | Chicken 🍗 x1 + Feather 🪶 x1 |
| Sheep | 🐑 | Wool 🧶 x1-2 |

Attacking costs 1 ⚡ stamina (same as mining). Better swords reduce attack hold time.

New items added to `blocks[]`: leather, pork, chicken_meat, feather, wool (all tier 0, weight 0 — drop-only, never mined).

### 2. Swords

Follow the same pattern as pickaxes/axes: craftable tools with durability stored in inventory.

| Sword | Recipe | Durability | Hold Time |
|-------|--------|-----------|-----------|
| Wood Sword | stick x1 + wood x2 | ∞ | 1.5s |
| Stone Sword | stick x1 + stone x2 | 30 | 1.0s |
| Iron Sword | stick x1 + iron x2 | 60 | 0.7s |
| Gold Sword | stick x1 + gold x2 | 25 | 0.7s |
| Diamond Sword | stick x1 + diamond x2 | 150 | 0.4s |

Wood sword is the default (no crafting needed, infinite durability).

Craft pattern (vertical):
```
材
材
棍
```

### 3. Equipment (Decorative)

Four armor slots, four material tiers = 16 items. Purely cosmetic — no gameplay effects.

**Materials:** Leather, Iron, Gold, Diamond

**Craft costs (matching Minecraft):**

| Slot | Cost | Pattern |
|------|------|---------|
| Helmet 🪖 | x5 | `XXX / X_X / ___` |
| Chestplate 🦺 | x8 | `X_X / XXX / XXX` |
| Leggings 👖 | x7 | `XXX / X_X / X_X` |
| Boots 👢 | x4 | `___ / X_X / X_X` |

**Wearing mechanics:**
- Managed in collection page's new "裝備" sub-tab
- Click equipment slot to pick from inventory
- Worn items leave inventory; unequipping returns them
- One item per slot
- Persisted: `equipped: { helmet, chest, legs, boots }`

### 4. Character Display

Emoji-stacked character showing equipped gear and held tool.

**Mine page:** Small character beside the mountain (right side).

**Collection "裝備" tab:** Large character with clickable equipment slots + inventory of available armor below.

### 5. Hold-to-Mine

Replace click-to-mine with press-and-hold. A progress bar fills over the cell.

| Condition | Hold Duration |
|-----------|--------------|
| Correct pickaxe tier | 1.0s |
| Lower-tier pickaxe (but can still mine) | 2.0–3.0s |
| Pickaxe tier too low | Cannot mine |
| Chopping trees | 1.0s (with axe), 1.5s (without) |
| Attacking animals | Varies by sword tier |

Supports both `mousedown`/`mouseup` and `touchstart`/`touchend`.

### 6. UI: Logo to Top-Left

Shrink "Feelings Fun! 🎭" and position it fixed at top-left, mirroring the status bar at top-right.

### 7. UI: Settings Modal

Move version number and ⚙️ button into the status bar. Clicking ⚙️ opens a modal overlay containing speed toggle and engine status. Replaces the current `<details>` collapsible.

## Persistence

Add to localStorage:
- `equipped` — object with helmet/chest/legs/boots slot IDs
- Sword durability in existing `toolDurability`
- New drop items in existing `inventory`
- New items in existing `discovered` Set

## Architecture

All code stays in `week1.html`. New data arrays (`animals`, `swords`, `armorSlots`, `armorRecipes`) added to DATA section. Character rendering as a reusable function called from both mine and collection pages.
