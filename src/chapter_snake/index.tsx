import React, { useEffect, useRef, useState } from "react";
import { useMount } from "../hooks/useMount";

interface Position {
  x: number;
  y: number;
}

interface GameState {
  snake: Position[];
  food: Position;
  direction: "UP" | "DOWN" | "LEFT" | "RIGHT";
  score: number;
  gameOver: boolean;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;

export const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: "RIGHT",
    score: 0,
    gameOver: false,
  });

  useMount(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleKeyPress = (event: KeyboardEvent) => {
    if (gameState.gameOver) return;

    switch (event.key) {
      case "ArrowUp":
        if (gameState.direction !== "DOWN") setGameState((prev) => ({ ...prev, direction: "UP" }));
        break;
      case "ArrowDown":
        if (gameState.direction !== "UP") setGameState((prev) => ({ ...prev, direction: "DOWN" }));
        break;
      case "ArrowLeft":
        if (gameState.direction !== "RIGHT") setGameState((prev) => ({ ...prev, direction: "LEFT" }));
        break;
      case "ArrowRight":
        if (gameState.direction !== "LEFT") setGameState((prev) => ({ ...prev, direction: "RIGHT" }));
        break;
    }
  };

  const generateFood = (): Position => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  };

  const checkCollision = (head: Position): boolean => {
    // 检查是否撞墙
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }

    // 检查是否撞到自己
    return gameState.snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
  };

  const moveSnake = () => {
    if (gameState.gameOver) return;

    const newSnake = [...gameState.snake];
    const head = { ...newSnake[0] };

    switch (gameState.direction) {
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "RIGHT":
        head.x += 1;
        break;
    }

    if (checkCollision(head)) {
      setGameState((prev) => ({ ...prev, gameOver: true }));
      return;
    }

    newSnake.unshift(head);

    if (head.x === gameState.food.x && head.y === gameState.food.y) {
      setGameState((prev) => ({
        ...prev,
        food: generateFood(),
        score: prev.score + 1,
      }));
    } else {
      newSnake.pop();
    }

    setGameState((prev) => ({ ...prev, snake: newSnake }));
  };

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 200);
    return () => clearInterval(gameLoop);
  }, [gameState.direction, gameState.gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制蛇
    ctx.fillStyle = "#4CAF50";
    gameState.snake.forEach((segment) => {
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    });

    // 绘制食物
    ctx.fillStyle = "#FF5722";
    ctx.fillRect(gameState.food.x * CELL_SIZE, gameState.food.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
  }, [gameState]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>贪吃蛇游戏</h1>
      <div style={{ marginBottom: "20px" }}>
        <strong>分数: {gameState.score}</strong>
      </div>
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        style={{ border: "2px solid #333" }}
      />
      {gameState.gameOver && (
        <div style={{ marginTop: "20px" }}>
          <h2>游戏结束!</h2>
          <button
            onClick={() => {
              setGameState({
                snake: [{ x: 10, y: 10 }],
                food: generateFood(),
                direction: "RIGHT",
                score: 0,
                gameOver: false,
              });
            }}
          >
            重新开始
          </button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
