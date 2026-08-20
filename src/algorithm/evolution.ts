
import Drawing from './drawing.js';

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
    population.sort((a, b) => b.getScore() - a.getScore())

    // New Population
    const newGeneration: Array<Drawing> = [];
    const survivors = Math.floor(survivePercent * n);
    for (let i = 0; i < n; i++)
    {
        if (i < survivors){
            newGeneration.push(population[i]!.Reproduce(mutation));   
        }else
        {
            const child = population[i % survivors]!.Reproduce(mutation);
            newGeneration.push(child);
        }
    }

    return newGeneration;
}

export const geneticAlgorithm = (original:Drawing, n:number, mutation:number, survivePercent:number, generationAmount: number) => {
    let population = generateRandomPopulation(original.rows, original.cols, n);
    
    for (let i = 0; i < generationAmount; i++){
        population = generationStep(original, population, mutation, survivePercent);
    }

    // Sort
    population.sort((a, b) => b.getScore() - a.getScore())
};

export const main = () => {
    const drawing = new Drawing(3, 3);
    drawing.set(0, 0, 0x000000);
    drawing.set(1, 0, 0x880000);
    drawing.set(2, 0, 0xff0000);
    drawing.set(0, 1, 0x008800);
    drawing.set(1, 1, 0x888800);
    drawing.set(2, 1, 0xff8800);
    drawing.set(0, 2, 0x00ff00);
    drawing.set(1, 2, 0x88ff00);
    drawing.set(2, 2, 0x88ff00);

    geneticAlgorithm(drawing, 1000, 0.01, 0.4, 1000);
};

