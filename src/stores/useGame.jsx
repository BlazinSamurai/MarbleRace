import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 10,
      blocksSeed: 0,

      /**
       * Phases
       */
      phase: "ready",

      /**
       * Time
       */
      startTime: 0,
      endTime: 0,

      start: () => {
        // console.log("useGame: starting");
        set((state) => {
          // console.log(state.phase);
          if (state.phase === "ready")
            return { phase: "playing", startTime: Date.now() };

          return {};
        });
      },
      restart: () => {
        // console.log("useGame: restart");
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended")
            return { phase: "ready", blocksSeed: Math.random() };

          return {};
        });
      },
      end: () => {
        // console.log("useGame: end");
        set((state) => {
          if (state.phase === "playing")
            return { phase: "ended", endTime: Date.now() };

          return {};
        });
      },
    };
  }),
);
