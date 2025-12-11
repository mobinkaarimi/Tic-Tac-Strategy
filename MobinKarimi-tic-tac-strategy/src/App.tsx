import type { JSX } from "react";

import { GameShell } from "./features";
import { ThemeProvider } from "./shared";
import { Page } from "./shared/components/layout";

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <Page>
        <GameShell />
      </Page>
    </ThemeProvider>
  );
};

export default App;
