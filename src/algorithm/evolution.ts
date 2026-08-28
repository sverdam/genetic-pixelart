import Drawing from "./drawing.js";

export type GenerationCallback = (
    generation: number,
    best: Drawing,
    median: Drawing,
    worst: Drawing
) => void;


const generateRandomPopulation = (
    rows: number,
    cols: number,
    populationSize: number
): Drawing[] => {

    const population: Drawing[] = [];

    for (let i = 0; i < populationSize; i++) {
        population.push(
            new Drawing(rows, cols)
        );
    }

    return population;
};


const generationStep = (
    original: Drawing,
    population: Drawing[],
    mutation: number,
    reproducePercent: number,
    crossoverPercent: number
): Drawing[] => {

    const populationSize =
        population.length;

    for (const drawing of population) {
        drawing.CalculateScore(original);
    }

    population.sort(
        (a, b) =>
            a.getScore() - b.getScore()
    );

    const reproduceCount =
        Math.floor(
            reproducePercent * populationSize
        );

    const crossoverCount =
        Math.floor(
            crossoverPercent * populationSize
        );


    for (let i = 0; i < reproduceCount; i++) {

        population.push(
            population[i]!.Reproduce(
                mutation
            )
        );
    }


    for (let i = 0; i < crossoverCount; i++) {

        const parentA =
            population[i]!;

        const parentB =
            population[
                Math.floor(
                    Math.random() * populationSize
                )
            ]!;

        const child =
            Drawing.Crossover(
                parentA,
                parentB
            );

        population.push(
            child.Reproduce(mutation)
        );
    }

    for (
        let i = populationSize;
        i < population.length;
        i++
    ) {
        population[i]!.CalculateScore(
            original
        );
    }

    population.sort(
        (a, b) =>
            a.getScore() - b.getScore()
    );


    const nextGeneration: Drawing[] = [];

    for (
        let i = 0;
        i < populationSize;
        i++
    ) {
        nextGeneration.push(
            population[i]!.Reproduce(0)
        );
    }

    return nextGeneration;
};


export const geneticAlgorithm = async (
    original: Drawing,
    n: number,
    mutation: number,
    generationAmount: number,
    reproducePercent: number,
    crossoverPercent: number,
    onGeneration?: GenerationCallback
): Promise<Drawing> => {

    console.log(
        "🧬 Starting genetic algorithm..."
    );

    console.log(
        `Population: ${n}`
    );

    console.log(
        `Generations: ${generationAmount}`
    );

    console.log(
        `Mutation: ${mutation}`
    );

    console.log(
        `Reproduction: ${reproducePercent}`
    );

    console.log(
        `Crossover: ${crossoverPercent}`
    );


    /*
     * ========================================
     * INITIAL POPULATION
     * ========================================
     */

    let population =
        generateRandomPopulation(
            original.rows,
            original.cols,
            n
        );


    /*
     * ========================================
     * GENERATIONS
     * ========================================
     */

    for (
        let generation = 0;
        generation < generationAmount;
        generation++
    ) {

        population =
            generationStep(
                original,
                population,
                mutation,
                reproducePercent,
                crossoverPercent
            );


        /*
         * generationStep() already scores and
         * sorts the population.
         */
        const best =
            population[0]!;

        const median =
            population[
                Math.floor(
                    population.length / 2
                )
            ]!;

        const worst =
            population[
                population.length - 1
            ]!;


        /*
         * ====================================
         * REPORT TO REACT
         * ====================================
         */

        onGeneration?.(
            generation + 1,
            best,
            median,
            worst
        );


        /*
         * Console output.
         */
        console.log(
            `Generation ${generation + 1}: ` +
            `Best=${best.getScore()} ` +
            `Median=${median.getScore()} ` +
            `Worst=${worst.getScore()}`
        );


        /*
         * ====================================
         * PERFECT SOLUTION
         * ====================================
         */

        if (
            best.getScore() === 0
        ) {
            console.log(
                `🎯 Perfect solution found at generation ${
                    generation + 1
                }!`
            );

            break;
        }


        /*
         * ====================================
         * LET THE BROWSER RENDER
         * ====================================
         *
         * This yields to the browser once per
         * generation so React can update the
         * visualizations.
         *
         * setTimeout(0) is intentionally tiny.
         */
        await new Promise<void>(
            resolve =>
                setTimeout(resolve, 0)
        );
    }


    /*
     * ========================================
     * FINAL RESULT
     * ========================================
     */

    population.sort(
        (a, b) =>
            a.getScore() - b.getScore()
    );

    const finalBest =
        population[0]!;


    console.log(
        "🏆 Genetic algorithm finished!"
    );

    console.log(
        `Final best score: ${finalBest.getScore()}`
    );


    return finalBest;
};