# Tic-Tac Strategy – React Implementation (Mobin Karim)

A tactical variant of Tic-Tac-Toe built with React, TypeScript and Tailwind.  
Each player can keep only their last **3 marks** on the 3×3 board, so you have to think ahead and manage space carefully.

---

## Challenge Rules

- Two players: **X** and **O**
- Only the last **3 moves per player** are visible on the board  
  – when a player places a 4th mark, their oldest mark disappears.
- **Win**: any classic 3-in-a-row (row, column, diagonal).
- **Draw**: after **20 turns** with no winner.
- The game is fully blocked after win/draw until reset.

---

## Tech Stack

- **React** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- Custom hooks for state management
- Simple theme context for light/dark mode

---

## How to Run

```bash
pnpm install
pnpm dev
