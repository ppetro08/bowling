import {
  calculateFrameTotal, updateFramesRunningTotal,
  validateFrame
} from "utils";

describe("Utils", () => {
  describe("Simple Frames", () => {
    it("should return frameTotal of 1", () => {
      const frameTotal = calculateFrameTotal({
        firstRoll: 1,
        secondRoll: 0,
      });

      expect(frameTotal).toEqual(1);
    });
    it("should return frameTotal of 9", () => {
      const frameTotal = calculateFrameTotal({
        firstRoll: 6,
        secondRoll: 3,
      });

      expect(frameTotal).toEqual(9);
    });
    it("should return frameTotal of 9", () => {
      const frameTotal = calculateFrameTotal(
        {
          firstRoll: 6,
          secondRoll: 3,
        },
        {
          firstRoll: 1,
          secondRoll: 0,
        }
      );

      expect(frameTotal).toEqual(9);
    });
  });
  describe("Spare Frames", () => {
    it("should return frameTotal of 11 with spare", () => {
      const frameTotal = calculateFrameTotal(
        {
          firstRoll: 6,
          secondRoll: 4,
        },
        {
          firstRoll: 1,
          secondRoll: 3,
        }
      );

      expect(frameTotal).toEqual(11);
    });
    it("should return frameTotal of 13 with 2 spares in a row", () => {
      const frameTotal = calculateFrameTotal(
        {
          firstRoll: 6,
          secondRoll: 4,
        },
        {
          firstRoll: 3,
          secondRoll: 9,
        }
      );

      expect(frameTotal).toEqual(13);
    });
    it("should return frameTotal of 20 with a spare and a strike in a row", () => {
      const frameTotal = calculateFrameTotal(
        {
          firstRoll: 6,
          secondRoll: 4,
        },
        {
          firstRoll: 10,
          secondRoll: 0,
        }
      );

      expect(frameTotal).toEqual(20);
    });
    it("should have runningTotal of 24 on second frame", () => {
      const runningTotalFrames = updateFramesRunningTotal([
        {
          firstRoll: 4,
          secondRoll: 3,
        },
        {
          firstRoll: 7,
          secondRoll: 3,
        },
        {
          firstRoll: 5,
          secondRoll: 2,
        },
      ]);

      expect(runningTotalFrames[1].runningTotal).toEqual(22);
    });
  });
  describe("Strike Frames", () => {
    it("should return frameTotal of 14 with a strike and a full frame", () => {
      const frameTotal = calculateFrameTotal(
        {
          firstRoll: 10,
          secondRoll: 0,
        },
        {
          firstRoll: 1,
          secondRoll: 3,
        }
      );

      expect(frameTotal).toEqual(14);
    });
    it("should return frameTotal of 0 with 2 strikes in a row", () => {
      const frameTotal = calculateFrameTotal(
        {
          firstRoll: 10,
          secondRoll: 0,
        },
        {
          firstRoll: 10,
          secondRoll: 0,
        }
      );

      expect(frameTotal).toEqual(0);
    });
    it("should return frameTotal of 27 with 2 strikes in a row and another roll", () => {
      const frameTotal = calculateFrameTotal(
        {
          firstRoll: 10,
          secondRoll: 0,
        },
        {
          firstRoll: 10,
          secondRoll: 0,
        },
        {
          firstRoll: 3,
          secondRoll: 0,
        }
      );

      expect(frameTotal).toEqual(23);
    });
    it("should return frameTotal of 23 with 2 strikes in a row and a spare", () => {
      const frameTotal = calculateFrameTotal(
        {
          firstRoll: 10,
          secondRoll: 0,
        },
        {
          firstRoll: 10,
          secondRoll: 0,
        },
        {
          firstRoll: 3,
          secondRoll: 7,
        }
      );

      expect(frameTotal).toEqual(23);
    });
  });
  describe("Final Frame", () => {
    it("should return frameTotal of 19", () => {
      const frameTotal = calculateFrameTotal({
        firstRoll: 10,
        secondRoll: 4,
        thirdRoll: 5,
      });

      expect(frameTotal).toEqual(19);
    });
    it("should return frameTotal of 30", () => {
      const frameTotal = calculateFrameTotal({
        firstRoll: 10,
        secondRoll: 10,
        thirdRoll: 10,
      });

      expect(frameTotal).toEqual(30);
    });
    it("should return frameTotal of 15", () => {
      const frameTotal = calculateFrameTotal({
        firstRoll: 4,
        secondRoll: 6,
        thirdRoll: 5,
      });

      expect(frameTotal).toEqual(15);
    });
  });
  describe("Validation", () => {
    it("should throw error for firstRoll value < 0", () => {
      expect(() => {
        validateFrame(
          {
            firstRoll: -2,
            secondRoll: 0,
          },
          0
        );
      }).toThrowError("Rolls must be between 0 and 10.");
    });
    it("should throw error for firstRoll value > 10", () => {
      expect(() => {
        validateFrame(
          {
            firstRoll: 12,
            secondRoll: 0,
          },
          0
        );
      }).toThrowError("Rolls must be between 0 and 10.");
    });
    it("should throw error for secondRoll value < 0", () => {
      expect(() => {
        validateFrame(
          {
            firstRoll: 0,
            secondRoll: -3,
          },
          0
        );
      }).toThrowError("Rolls must be between 0 and 10.");
    });
    it("should throw error for secondRoll value > 10", () => {
      expect(() => {
        validateFrame(
          {
            firstRoll: 0,
            secondRoll: 13,
          },
          0
        );
      }).toThrowError("Rolls must be between 0 and 10.");
    });
    it("should throw error for thirdRoll on a frame that is not the last", () => {
      expect(() => {
        validateFrame(
          {
            firstRoll: 1,
            secondRoll: 1,
            thirdRoll: 1,
          },
          0
        );
      }).toThrowError("There can only be a third roll on the 10th frame.");
    });
  });
});
