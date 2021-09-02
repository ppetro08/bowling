import { bindable, bindingMode, computedFrom } from "aurelia-framework";
import { RunningTotalFrame } from "frame";
import { frameIsSpare, frameIsStrike } from "utils";

export class FrameRoll {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) frame: Partial<RunningTotalFrame> | undefined;

    @computedFrom('frame')
    get firstRollText(): string {
        if (this.frame?.firstRoll === undefined || frameIsStrike(this.frame)){return '';}
        if (this.frame.firstRoll === 0) {
            return '-';
        }
        return `${this.frame.firstRoll}`;
    }

    @computedFrom('frame')
    get secondRollText(): string {
        if (this.frame?.secondRoll === undefined){return '';}
        if (this.frame.secondRoll === 0) {
            return '-';
        }
        if (frameIsStrike(this.frame)) {
            return 'X';
        }
        
        if (frameIsSpare(this.frame)) {
            return '/';
        }
        return `${this.frame.secondRoll}`;
    }
}