import { Frame, RunningTotalFrame } from "frame";

export function calculateFrameTotal(
  frame: Frame,
  nextFrame?: Frame,
  nextNextFrame?: Frame
): number {
  const thirdRoll = frame.thirdRoll ?? 0;
  const frameTotal = frame.firstRoll + frame.secondRoll + thirdRoll;
  //  Strike or spare occured
  if (frameTotal === 10) {
    //  No next frame to calculate total
    if (!nextFrame) {
      return 0;
    }
    // Logic for strike
    if (frame.firstRoll === 10) {
      // Logic for two strikes in a row
      if (nextFrame.firstRoll === 10) {
        if (!nextNextFrame) {
          return 0;
        }
        return 10 + nextFrame.firstRoll + nextNextFrame.firstRoll;
      } else {
        return 10 + nextFrame.firstRoll + nextFrame.secondRoll;
      }
    } else {
      // Logic for spare
      return 10 + nextFrame.firstRoll;
    }
  }
  return frameTotal;
}

export function frameIsSpare(frame: Partial<Frame>): boolean {
  const firstRoll: number = frame.firstRoll ?? 0;
  const secondRoll: number = frame.secondRoll ?? 0;
  return firstRoll + secondRoll === 10;
}

export function frameIsStrike(frame: Partial<Frame>): boolean {
  const firstRoll: number = frame.firstRoll ?? 0;
  return firstRoll === 10;
}

export function updateFramesRunningTotal(frames: Frame[]): RunningTotalFrame[] {
  const runningTotalFrames: RunningTotalFrame[] = [];

  const numberOfFrames = frames.length - 1;
  frames.forEach((frame, i) => {
    validateFrame(frame, i);
    const previousFrameRunningTotal: number =
      i > 0 ? runningTotalFrames[i - 1].runningTotal : 0;
    const nextFrame: Frame | null =
      numberOfFrames >= i + 1 ? frames[i + 1] : null;
    const nextNextFrame: Frame | null =
      numberOfFrames >= i + 2 ? frames[i + 2] : null;
    const frameTotal: number = calculateFrameTotal(
      frame,
      nextFrame,
      nextNextFrame
    );

    const runningTotalFrame: RunningTotalFrame = {
      ...frame,
      runningTotal: frameTotal ? frameTotal + previousFrameRunningTotal : 0,
    };
    runningTotalFrames.push(runningTotalFrame);
  });

  return runningTotalFrames;
}

export function validateFrame(frame: Frame, index: number): void {
  if (
    frame.firstRoll < 0 ||
    frame.firstRoll > 10 ||
    frame.secondRoll < 0 ||
    frame.secondRoll > 10
  ) {
    throw Error("Rolls must be between 0 and 10.");
  } else if (frame.thirdRoll && index !== 9) {
    throw Error("There can only be a third roll on the 10th frame.");
  }
}
