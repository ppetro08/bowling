export interface Frame {
  firstRoll: number;
  secondRoll: number;
  thirdRoll?: number;
}

export interface RunningTotalFrame extends Frame {
  runningTotal: number;
}
