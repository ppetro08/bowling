import { RunningTotalFrame } from "frame";
import { testData } from "test-data";
import { updateFramesRunningTotal } from "utils";
import "./styles.scss";
export class App {
  public staticFrames: Partial<RunningTotalFrame>[] = [];

  constructor() {
    this.staticFrames = updateFramesRunningTotal(testData);
  }
}
