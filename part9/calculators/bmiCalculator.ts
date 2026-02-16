
interface inputValues {
    height: number;
    weight: number;
}

const parseArgs = (args: string[]): inputValues => {
    if (args.length !== 4) throw new Error('Invalid number of arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Invalid input');
    }
}

const calculateBMI = (height: number, weight: number) : string => {
    const heightInMeter: number = height / 100;
    const bmi: number = weight / (heightInMeter * heightInMeter);
    if (bmi < 18.5) return 'Underweight';
    else if (bmi < 25) return 'Normal';
    else return 'Overweight';
}

try {
    const {height, weight} = parseArgs(process.argv);
    console.log(calculateBMI(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong'
    if (error instanceof Error) errorMessage += ' Error: ' + error.message;
    console.log(errorMessage);
}

