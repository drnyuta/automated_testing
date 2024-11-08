import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fs from "fs";
import mockFs from "mock-fs";
import { Calculator } from "../../src/Calculator";

describe("Calculator Class", () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it("should return the sum of all numbers", () => {
    const result = calculator.sum(1, 2, 3, 4, 5, -1, 0.5);
    expect(result).toBe(14.5);
  });

  it("should return the difference between two numbers", () => {
    const result = calculator.subduct(10, -5);
    expect(result).toBe(15);
  });

  it("should return the product of all numbers", () => {
    const result = calculator.multiply(2, 3, 4, -1);
    expect(result).toBe(-24);
  });

  it("should return the quotient of two numbers", () => {
    const result = calculator.divide(10, 2);
    expect(result).toBe(5);
  });

  it("should throw error when dividing by zero", () => {
    expect(() => calculator.divide(10, 0)).toThrowError(
      "Cannot divide by zero"
    );
  });

  // sumFromFile() - file exists, valid data
  it("should return the sum of numbers from a valid file", () => {
    mockFs({
      "testFile.json": JSON.stringify([1, 2, 3, 4, 5]),
    });

    const result = calculator.sumFromFile("testFile.json");
    expect(result).toBe(15);
  });

  // sumFromFile() - file does not exist
  it("should return 0 when the file does not exist", () => {
    const result = calculator.sumFromFile("nonExistentFile.json");
    expect(result).toBe(0);
  });

  // sumFromFile() method - invalid JSON format
  it("should return 0 for invalid JSON format in file", () => {
    mockFs({
      "invalidFile.json": "invalid JSON content",
    });

    const result = calculator.sumFromFile("invalidFile.json");
    expect(result).toBe(0);
  });

  // sumFromFile() method - non-array or non-numeric content
  it("should return 0 if file contains non-array or non-numeric data", () => {
    mockFs({
      "invalidData.json": JSON.stringify({ key: "value" }),
    });

    const result = calculator.sumFromFile("invalidData.json");
    expect(result).toBe(0);
  });

  it("should write the result to a file successfully", () => {
    mockFs({
      testDir: {},
    });

    const resultData = { sum: 15 };

    Calculator.writeToFile("testDir/result.json", resultData);

    const fileContent = fs.readFileSync("testDir/result.json", "utf-8");
    expect(fileContent).toContain("Result:");

    mockFs.restore();
  });

  it("should throw an error if the directory is not writable", () => {
    const testDir = "testDir";
    const testFile = "testDir/result.json";

    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }
    fs.chmodSync(testDir, 0o555);

    const resultData = { sum: 15 };

    try {
      Calculator.writeToFile(testFile, resultData);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Write failed");
    }

    fs.chmodSync(testDir, 0o755);
    fs.rmSync(testDir, { recursive: true, force: true });
  });
});