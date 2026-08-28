import { useState } from "react";

import ExampleDrawing from "../components/ExampleDrawing";
import Display from "../components/Display";

import Drawing from "../algorithm/drawing";
import { geneticAlgorithm } from "../algorithm/evolution";

const GRID_SIZE = 13;

export default function ExamplePage() {

  const [generation, setGeneration] =
    useState(0);

  const [best, setBest] =
    useState<Drawing | null>(null);

  const [median, setMedian] =
    useState<Drawing | null>(null);

  const [worst, setWorst] =
    useState<Drawing | null>(null);


  // squirrel drawing example
  const exampleDrawing: number[][]=
  [
    [
        8042439,
        8042439,
        8042439,
        8042439,
        8042439,
        8042439,
        8042439,
        8042439,
        8042439,
        9947350,
        9947350,
        8042439,
        8042439
    ],
    [
        8042439,
        9947350,
        9947350,
        16504748,
        15910040,
        8042439,
        15910040,
        16504748,
        9947350,
        9947350,
        9947350,
        9947350,
        8042439
    ],
    [
        9947350,
        9947350,
        12614234,
        13207142,
        13207142,
        13207142,
        13207142,
        13207142,
        12614234,
        9947350,
        9947350,
        9947350,
        8042439
    ],
    [
        9947350,
        12614234,
        13207142,
        13207142,
        13207142,
        12614234,
        13207142,
        13207142,
        13207142,
        12614234,
        9947350,
        10906188,
        9947350
    ],
    [
        9947350,
        13207142,
        15910040,
        16504748,
        13207142,
        12614234,
        13207142,
        16504748,
        15910040,
        13207142,
        10906188,
        10906188,
        10906188
    ],
    [
        13207142,
        16504748,
        16504748,
        5847594,
        16504748,
        13207142,
        16504748,
        5847594,
        16504748,
        16504748,
        13207142,
        10906188,
        10906188
    ],
    [
        16504748,
        16504748,
        16300963,
        16099478,
        16504748,
        5847594,
        16504748,
        16099478,
        16300963,
        16504748,
        16504748,
        10906188,
        9525309
    ],
    [
        15910040,
        16504748,
        16504748,
        16504748,
        5847594,
        5847594,
        5847594,
        16504748,
        16504748,
        16504748,
        15910040,
        9525309,
        9525309
    ],
    [
        8042439,
        9947350,
        16504748,
        16504748,
        16504748,
        8736564,
        16504748,
        16504748,
        16504748,
        10906188,
        9525309,
        9525309,
        9525309
    ],
    [
        9947350,
        9947350,
        12614234,
        16367774,
        8736564,
        9393721,
        9393721,
        16367774,
        12614234,
        8736564,
        8736564,
        9525309,
        8736564
    ],
    [
        9947350,
        12614234,
        13207142,
        8736564,
        10906188,
        11693907,
        11693907,
        8736564,
        13207142,
        12614234,
        8736564,
        8736564,
        8764781
    ],
    [
        8764781,
        13207142,
        15910040,
        16504748,
        10906188,
        10906188,
        10906188,
        16504748,
        15910040,
        13207142,
        8736564,
        9947350,
        9947350
    ],
    [
        8012841,
        7552291,
        6500633,
        6894875,
        6894875,
        10906188,
        6894875,
        7552291,
        8012841,
        7552291,
        6894875,
        6894875,
        6500633
    ]
];


  async function handleDrawing(
    drawing: Drawing
  ) {

    await geneticAlgorithm(
      drawing,

      1000,   // population size
      0.001,  // mutation prob.
      3000,   // generations
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


  function handleExampleSend( drawing: Drawing) {
    handleDrawing(drawing);
  }

  return (
    <div className="pageGrid">

      <ExampleDrawing
        drawing={exampleDrawing}
        onSend={handleExampleSend}
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