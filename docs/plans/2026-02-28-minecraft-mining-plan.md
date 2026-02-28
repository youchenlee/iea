# Minecraft Mining System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a Minecraft-style mining/collection/crafting/building system to the Feelings Fun learning app.

**Architecture:** All code stays in the single `week1.html` file. New game data (blocks, recipes, house stages) added to the DATA section. New state variables + localStorage persistence in the STATE section. Two new tabs (Mine, Collection) with their own CSS and JS sections. Existing Match/Quiz reward functions modified to also award gems.

**Tech Stack:** Vanilla HTML/CSS/JS, localStorage for persistence, emoji-based pixel art for visuals.

**Note on innerHTML:** This app uses innerHTML throughout for rendering game UI from trusted, hardcoded data (no user input). All dynamic values are from const arrays defined in the source code. This is consistent with the existing codebase pattern.

---

### Task 1: Add Mining Data & State (foundation)

**Files:**
- Modify: `week1.html:380-411` (DATA and STATE sections)

**Step 1: Add block and recipe data after sightColors (line 405)**

**Step 2: Add mining state variables + persistence functions after existing state (line 411)**

**Step 3: Modify addStars to also call saveGame()**

**Step 4: Wire gems into Match/Quiz rewards (addGems calls)**

**Step 5: Commit**

---

### Task 2: Add Gem Counter to Score Bar + Nav Tabs in HTML

**Files:**
- Modify: `week1.html:328-374` (score-bar, nav-tabs, section containers)

**Step 1: Add gem counter to score bar (after streak)**

**Step 2: Add Mine and Collection nav tabs**

**Step 3: Add section containers for new tabs**

**Step 4: Update nav handler to call initMine/initCollection**

**Step 5: Commit**

---

### Task 3: Mining Page CSS + JS

**Files:**
- Modify: `week1.html` (CSS before closing style tag, JS before INIT section)

**Step 1: Add mining CSS (mine-grid, mine-cell, animations)**

**Step 2: Add mining JS (rollBlock, initMine, mineCell)**

**Step 3: Commit**

---

### Task 4: Collection Page CSS + JS (Encyclopedia + Crafting + House)

**Files:**
- Modify: `week1.html` (CSS and JS sections)

**Step 1: Add collection CSS (encyclopedia-grid, craft-area, house-area)**

**Step 2: Add collection JS (initCollection, renderEncyclopedia, renderCraft, renderHouse)**

**Step 3: Commit**

---

### Task 5: Load Game on Init + Mobile Responsive + Version Bump

**Files:**
- Modify: `week1.html`

**Step 1: Call loadGame() in INIT section**

**Step 2: Add mobile responsive CSS for mine/collection**

**Step 3: Bump version to v2.0.0**

**Step 4: Commit and push**
