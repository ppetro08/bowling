import { bindable, bindingMode } from "aurelia-framework";
import { RunningTotalFrame } from "frame";

export class BowlingFrameContainer {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) frames: Partial<RunningTotalFrame>[] | undefined;
}
