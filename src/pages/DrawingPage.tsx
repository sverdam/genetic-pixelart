import { useState } from "react";

import Canvas from "../components/Canvas";
import Display from "../components/Display";

import Drawing from "../algorithm/drawing";
import { geneticAlgorithm } from "../algorithm/evolution";

export default function DrawingPage() {

  const [generation, setGeneration] =
    useState(0);

  const [best, setBest] =
    useState<Drawing | null>(null);

  const [median, setMedian] =
    useState<Drawing | null>(null);

  const [worst, setWorst] =
    useState<Drawing | null>(null);

  async function handleDrawing(
    drawing: Drawing
  ) {

    console.log(drawing.getPixelArray());

    await geneticAlgorithm(
      drawing,

      1000,    // population size
      0.001,  // mutation prob.
      3000,    // generations
      0.4,    // reproduction prob.
      0.6,    // crossover prob.

      (
        generation,
        best,
        median,
        worst
      ) => {

        setGeneration(generation);
        setBest(best);
        setMedian(median);
        setWorst(worst);

        console.log(
          `Generation ${generation}`,
          {
            best: best.getScore(),
            median: median.getScore(),
            worst: worst.getScore(),
          }
        );
      }
    );
  }

  return (
    <div className="pageGrid">

      <Canvas
        onSend={handleDrawing}
        maxSize={500}
      />

      <Display
        generation={generation}
        best={best}
        median={median}
        worst={worst}
      />

    </div>
  );
}