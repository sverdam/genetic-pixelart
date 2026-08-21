
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
    const rankings = `\tB: ${population[0]!.getScore()}${middleText} \tD: ${population[amount - 1]!.getScore()}`;
    console.log(`Generation ${currentGeneration + 1}.   ${rankings}`);
}

const generateRandomPopulation = (rows: number, cols: number, population: number): Array<Drawing> => 
{
    const result: Array<Drawing> = [];

    for (let i = 0; i < population; i++){
        result.push(new Drawing(rows, cols));
    }

    return result;
}

const generationStep = (original:Drawing, population:Array<Drawing>, mutation:number, survivePercent:number):Array<Drawing> => {

    const n = population.length;

    // Calculate scores
    population.forEach(drawing => {
        drawing.CalculateScore(original);
    })

    // Sort
    population.sort((a, b) => a.getScore() - b.getScore())

    // New Population
    const newGeneration: Array<Drawing> = [];
    const survivors = Math.floor(survivePercent * n); // 0.5 -> survivePercent
    for (let i = 0; i < n; i++)
    {
        if (i < survivors){
            newGeneration.push(population[i]!.Reproduce(0));   
        }else
        {
            const parentA = population[Math.floor(0.5 * (i % survivors))]!;
            const parentB = population[i % survivors]!;
            const child = Drawing.Crossover(parentA, parentB);
            newGeneration.push(child.Reproduce(mutation));
        }
    }

    return newGeneration;
}

export const geneticAlgorithm = (original:Drawing, n:number, mutation:number, survivePercent:number, generationAmount: number) => {
    let population = generateRandomPopulation(original.rows, original.cols, n);
    
    for (let i = 0; i < generationAmount; i++){
        if (i % 500 == 499 || (i < 1000 && i % 100 == 99)) displayPopulation(original, population, i);
        population = generationStep(original, population, mutation, survivePercent);
    }
    
    // Calculate scores
    population.forEach(drawing => {
        drawing.CalculateScore(original);
    })

    // Sort
    population.sort((a, b) => a.getScore() - b.getScore())
};

export const main = () => {
    const drawing = new Drawing(3, 5);
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

    geneticAlgorithm(drawing, 2500, 0.001, 0.33, 50000);
};

