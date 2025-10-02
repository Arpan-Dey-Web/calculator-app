"use client";
import React from "react";
type CalculatorButtonProps = {
  value: string;
  onClick: (value: string) => void;
  variant?: "default" | "operator" | "equal" | "clear";
  className?: string;
};

const CalculatorButton = ({
  value,
  onClick,
  variant = "default",
  className = "",
}: CalculatorButtonProps) => {
  const baseStyles = "rounded-xl font-extrabold p-4 transition-colors";

  const variantStyles = {
    default: "bg-amber-300 hover:bg-amber-400",
    operator: "bg-orange-400 hover:bg-orange-500 text-white",
    equal: "bg-green-500 hover:bg-green-600 text-white",
    clear: "bg-red-400 hover:bg-red-500 text-white",
  };

  return (
    <button
      onClick={() => onClick(value)}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {value}
    </button>
  );
};

// Example Calculator using the button component
export default function Calculator() {
  const [display, setDisplay] = React.useState("0");
  const [equation, setEquation] = React.useState("");
  const [waitingForOperand, setWaitingForOperand] = React.useState(false);

  const handleClick = (value: string) => {
    if (value === "C") {
      setDisplay("0");
      setEquation("");
      setWaitingForOperand(false);
      return;
    }

    if (value === "=") {
      try {
        const result = eval(equation + display);
        setDisplay(String(result));
        setEquation("");
        setWaitingForOperand(true);
      } catch (error) {
        setDisplay("Error");
      }
      return;
    }

    if (["+", "-", "*", "÷"].includes(value)) {
      const operator = value === "*" ? "*" : value === "÷" ? "/" : value;
      setEquation(equation + display + operator);
      setWaitingForOperand(true);
      return;
    }

    if (waitingForOperand) {
      setDisplay(value);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? value : display + value);
    }
  };

  return (
    <div className="w-11/12 mx-auto  mt-10 p-6 bg-gray-800 rounded-2xl shadow-lg">
      <div className="bg-gray-100  text-right p-6 rounded-xl mb-4 text-3xl font-mono min-h-[80px] flex flex-col justify-end">
        {equation && (
          <div className="text-sm text-gray-400 mb-1">{equation}</div>
        )}
        <div className="truncate">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-3 ">
        <CalculatorButton
          value="C"
          onClick={handleClick}
          variant="clear"
          className="col-span-2"
        />
        <CalculatorButton value="÷" onClick={handleClick} variant="operator" />
        <CalculatorButton value="*" onClick={handleClick} variant="operator" />

        <CalculatorButton value="7" onClick={handleClick} />
        <CalculatorButton value="8" onClick={handleClick} />
        <CalculatorButton value="9" onClick={handleClick} />
        <CalculatorButton value="-" onClick={handleClick} variant="operator" />

        <CalculatorButton value="4" onClick={handleClick} />
        <CalculatorButton value="5" onClick={handleClick} />
        <CalculatorButton value="6" onClick={handleClick} />
        <CalculatorButton value="+" onClick={handleClick} variant="operator" />

        <CalculatorButton value="1" onClick={handleClick} />
        <CalculatorButton value="2" onClick={handleClick} />
        <CalculatorButton value="3" onClick={handleClick} />
        <CalculatorButton
          value="="
          onClick={handleClick}
          variant="equal"
          className="row-span-2"
        />

        <CalculatorButton
          value="0"
          onClick={handleClick}
          className="col-span-2"
        />
        <CalculatorButton value="." onClick={handleClick} />
      </div>
    </div>
  );
}
