import NeverHaveIEver from "../pages/games/NeverHaveIEver/NeverHaveIEver";
import TruthOrDare from "../pages/games/TruthOrDare/TruthOrDare";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GAME_COMPONENTS: Record<string, React.FC<any>> = {
  "truth-or-dare": TruthOrDare,
  "never-have-i-ever": NeverHaveIEver,
};
