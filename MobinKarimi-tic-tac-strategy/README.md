# Tic-Tac Strategy

A tactical twist on Tic-Tac-Toe built with React, TypeScript, Vite, and Tailwind.

## Tech stack
- React 18 + TypeScript
- Vite
- Tailwind CSS

## Getting started
```bash
pnpm install
pnpm dev
```

Build for production:
```bash
pnpm build
```

## Game rules
- Each player can have only their last three marks active on the 3×3 board; the oldest mark disappears when placing a fourth.
- Players alternate turns; X always starts.
- Win by aligning three marks; if no one wins by turn 20, the game is a draw.

## Architecture
- `src/features/tic-tac-strategy/lib`: Pure engine logic (board derivation, win/draw checks, move application).
- `src/features/tic-tac-strategy/hooks`: State and derived data (`useTicTacGame`, `useGameShell`).
- `src/features/tic-tac-strategy/components`: Presentational game UI (shell, board, cells, header/footer, modal).
- `src/shared/components/ui`: Shared glassmorphism primitives and theme toggle.
- `src/shared/components/layout`: Page shell and background.
- `src/shared/theme`: Theme context/provider/hook.
- `src/shared/lib`: Shared utilities (e.g., `cn`).
