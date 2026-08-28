import { useEffect, useRef } from "react";
import Drawing from "../algorithm/drawing";

const GRID_SIZE = 13;
const CANVAS_RESOLUTION = 1000;

interface ExampleDrawingProps {
  drawing: number[][];
  onSend: (drawing: Drawing) => void;
  maxSize?: number;
}

export default function ExampleDrawing({ drawing, onSend, maxSize = 800}: ExampleDrawingProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const cellSize = CANVAS_RESOLUTION / GRID_SIZE;

    function drawCanvas() {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const context = canvas.getContext("2d");

      if (!context) return;


      drawing.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {
          const r = (value >> 16) & 0xff;
          const g = (value >> 8) & 0xff;
          const b = value & 0xff;

          context.fillStyle = `rgb(${r}, ${g}, ${b})`;

          context.fillRect(
            columnIndex * cellSize,
            rowIndex * cellSize,
            cellSize,
            cellSize
          );
        });
      });

      context.save();

      context.strokeStyle = "rgba(255, 255, 255, 0.001)";
      context.lineWidth = 1;

      for (let i = 0; i <= GRID_SIZE; i++) {
        const position = i * cellSize;

        // Vertical
        context.beginPath();
        context.moveTo(position, 0);
        context.lineTo(position, CANVAS_RESOLUTION);
        context.stroke();

        // Horizontal
        context.beginPath();
        context.moveTo(0, position);
        context.lineTo(CANVAS_RESOLUTION, position);
        context.stroke();
      }

      context.restore();
    }

    useEffect(() => {
      drawCanvas();
    }, [drawing]);


    function sendDrawing() {
      const newDrawing = new Drawing(
        GRID_SIZE,
        GRID_SIZE
      );

      drawing.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {
          newDrawing.set(
            rowIndex,
            columnIndex,
            value
          );
        });
      });

      onSend(newDrawing);
    }

    return (
        <div>
          <div
            style={{
              position: "relative",
              width: "80vw",
              maxWidth: `${maxSize}px`
            }}
          >
            <canvas
              ref={canvasRef}
              width={CANVAS_RESOLUTION}
              height={CANVAS_RESOLUTION}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          <div>
            <button className="btn" onClick={sendDrawing}>
              Start algorithm
            </button>
          </div>
        </div>
    );
  }