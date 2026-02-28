# Minecraft Mining Collection System

## Game Loop

Answer questions (Match/Quiz) to earn gems, spend gems to mine blocks, collect blocks in an encyclopedia, craft better pickaxes, mine rarer blocks, and build a house.

## Block System (5 tiers)

| Tier | Blocks | Rarity | Required Pickaxe |
|------|--------|--------|-------------------|
| 1 | Dirt, Wood | Common | Wood Pickaxe (default) |
| 2 | Stone, Coal | Normal | Wood Pickaxe |
| 3 | Iron, Copper | Uncommon | Stone Pickaxe |
| 4 | Gold, Emerald | Rare | Iron Pickaxe |
| 5 | Diamond, Amethyst | Legendary | Gold Pickaxe |

## Crafting Recipes

| Tool | Recipe | Effect |
|------|--------|--------|
| Stone Pickaxe | Wood x3 + Stone x2 | Unlocks tier 3 |
| Iron Pickaxe | Wood x2 + Iron x3 | Unlocks tier 4 |
| Gold Pickaxe | Iron x2 + Gold x3 | Unlocks tier 5 |

## House Building (4 stages)

1. Foundation: Stone x6
2. Walls: Wood x8
3. Roof: Wood x4 + Iron x2
4. Decoration: Gold / Emerald / Diamond (any)

Visual updates with each completed stage using CSS/emoji pixel art.

## Currency

- Gems (new currency, separate from stars)
- Earned from Match/Quiz correct answers
- Spent on mining (1 gem per mine action)

## New UI Tabs

- **Mine** — 3x3 grid of blocks, click to mine (costs 1 gem)
- **Collection** — Encyclopedia + crafting table + house progress

## Persistence

localStorage for: gems, block inventory, pickaxe level, house progress.

## Architecture

All code stays in week1.html (single-file static app). Organized with clear section comments.
