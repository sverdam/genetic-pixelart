
import Drawing from './drawing.js';

const displayPopulation = (original: Drawing, population:Array<Drawing>, currentGeneration: number) =>
{
    // Calculate scores
    population.forEach(drawing => {
        drawing.CalculateScore(original);
    })

    // Sort
    population.sort((a, b) => a.getScore() - b.getScore())

    const amount = population.length
    const middleText = amount > 2 ? ` \tM: ${population[Math.floor(amount * 0.5)]!.getScore()}` : ``;
    const rankings = `\tB: ${population[0]!.getScore()}${middleText} \tW: ${population[amount - 1]!.getScore()}`;
    console.log(`Generation ${currentGeneration + 1}.   ${rankings}    \t\tsize: ${amount}`);
}

const generateRandomPopulation = (rows: number, cols: number, population: number): Array<Drawing> => 
{
    const result: Array<Drawing> = [];

    for (let i = 0; i < population; i++){
        result.push(new Drawing(rows, cols));
    }

    return result;
}

const generationStep = (original:Drawing, population:Array<Drawing>, mutation:number, reproducePercent:number, crossoverPercent:number):Array<Drawing> => {

    const n = population.length;

    // Calculate scores
    population.forEach(drawing => {
        drawing.CalculateScore(original);
    })

    // Sort
    population.sort((a, b) => a.getScore() - b.getScore())

    // Reproduction & Crossover
    const reproducingPopulation = Math.floor(reproducePercent * n);
    const crossoverPopulation = Math.floor(crossoverPercent * n);
    
    for (let i = 0; i < reproducingPopulation; i++)
    {
        population.push(population[i]!.Reproduce(mutation));
    }

    for (let i = 0; i < crossoverPopulation; i++){
        const otherParent = population[Math.floor(Math.random() * n)]!;
        const child = Drawing.Crossover(population[i]!, otherParent);
        population.push(child.Reproduce(mutation));
    }

    // Calculate scores
    population.forEach(drawing => {
        drawing.CalculateScore(original);
    })

    // Sort
    population.sort((a, b) => a.getScore() - b.getScore())

    // New Population
    const newGeneration: Array<Drawing> = [];
    for (let i = 0; i < n; i++){
        newGeneration.push(population[i]!.Reproduce(0));
    }

    return newGeneration;
}

export const geneticAlgorithm = (original:Drawing, n:number, mutation:number, generationAmount: number, reproducePercent:number, crossoverPercent:number) => {
    let population = generateRandomPopulation(original.rows, original.cols, n);
    
    let lastGen = 0;

    for (let i = 0; i < generationAmount; i++){
        if (i % 50 == 49) displayPopulation(original, population, i);
        population = generationStep(original, population, mutation, reproducePercent, crossoverPercent);
        lastGen = i;

        // Stop if we reach a "Perfect" solution before the generation stop.
        if (population[0]!.CalculateScore(original) == 0) {
            break;
        }
    }
    
    displayPopulation(original, population, lastGen);
};

export const main = () => {
    const drawing = new Drawing(4, 5);
    drawing.set(0, 0, 0x0602a0);
    drawing.set(1, 0, 0x8830b0);
    drawing.set(2, 0, 0xff0100);
    drawing.set(0, 1, 0x008800);
    drawing.set(1, 1, 0x285800);
    drawing.set(2, 1, 0xff8800);
    drawing.set(0, 2, 0x67ff00);
    drawing.set(1, 2, 0x88ff00);
    drawing.set(2, 2, 0x834f00);
    drawing.set(0, 3, 0x00ff55);
    drawing.set(1, 3, 0x88ff55);
    drawing.set(2, 3, 0x88f755);
    drawing.set(0, 4, 0x70f1ff);
    drawing.set(1, 4, 0x83ff3f);
    drawing.set(2, 4, 0x88f5ff);

    drawing.set(3, 0, 0xaf03f2);
    drawing.set(3, 1, 0x0c3452);
    drawing.set(3, 2, 0x3d7212);
    drawing.set(3, 3, 0x6e2022);
    drawing.set(3, 3, 0x3a4f32);

    geneticAlgorithm(drawing, 2500, 0.001, 1000, 0.4, 0.4);
};

