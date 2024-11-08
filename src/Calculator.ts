import * as fs from "fs";

export class Calculator {
  sum(...args: number[]): number {
    let result = 0;
    for (let i = 0; i < args.length; i++) {
      result += args[i];
    }

    return result;
  }

  subduct(n1: number, n2: number): number {
    return n1 - n2;
  }

  multiply(...args: number[]): number {
    let result = 1;
    for (let i = 0; i < args.length; i++) {
      result *= args[i];
    }

    return result;
  }

  divide(n1: number, n2: number): number {
    if (n2 === 0) {
      throw new Error("Cannot divide by zero");
    }
    return n1 / n2;
  }

  sumFromFile(filePath: string): number {
    let numbers: number[] = [];

    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      const content = fs.readFileSync(filePath, "utf-8");

      try {
        numbers = JSON.parse(content);
        if (
          !Array.isArray(numbers) ||
          !numbers.every((num) => typeof num === "number")
        ) {
          throw new Error("File should be an array of numbers");
        }
      } catch (error) {
        throw new Error("Invalid JSON format or invalid data structure");
      }

      const result = numbers.reduce((acc, num) => acc + num, 0);

      return result;
    } catch (error) {
      console.error("Could not read file:", error.message);
      return 0;
    }
  }

  static writeToFile(filePath: string, data: any): void {
    try {
      const formattedData = `Result: ${JSON.stringify(data, null, 2)}`;
      fs.writeFileSync(filePath, formattedData);
      console.log("LOG: Result written to file");
    } catch (error) {
      console.log("LOG: Could not write to file");
      throw new Error("Write failed");
    }
  }
}
