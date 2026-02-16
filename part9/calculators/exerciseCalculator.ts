interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface inputs {
  dailyHours: number[];
  targetHours: number;
}

const parseArguments = (args: string[]): inputs => {
    if (args.length < 4) throw new Error('Invalid number of arguments');
    const inputWithoutCommand = args.slice(2);
    for (const iwc of inputWithoutCommand) {
        if (isNaN(Number(iwc))) throw new Error('Invalid input');
    }

    const targetHours: number = Number(args[2]);
    const dailyHours: number[] = args.slice(3).map(Number);

    return {dailyHours, targetHours};
}

const calculateExercises = (targetHours: number, dailyHours: number[]): Result => {
    const average = dailyHours.reduce((acc, curr) => acc + curr, 0) / dailyHours.length;
    return {
        periodLength: dailyHours.length,
        trainingDays: dailyHours.filter(hours => hours > 0).length,
        success: average >= targetHours,
        rating: average >= targetHours ? 3 : average >= targetHours * 0.8 ? 2 : 1,
        ratingDescription: average >= targetHours ? 'Perfect' : average >= targetHours * 0.8 ? 'Good' : 'Bad',
        target: targetHours,
        average: average
    }
}

try {
    const {dailyHours, targetHours} = parseArguments(process.argv);
    console.log(calculateExercises(targetHours, dailyHours));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong'
    if (error instanceof Error) errorMessage += ' Error: ' + error.message;
    console.log(errorMessage);
}