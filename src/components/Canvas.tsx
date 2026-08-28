import { useEffect, useRef, useState } from "react";
import Drawing from "../algorithm/drawing";

const GRID_SIZE = 13;

const CANVAS_RESOLUTION = 1000;

interface CanvasProps {
  onSend: (drawing: Drawing) => void;
  maxSize?: number;
}

export default function Canvas({onSend, maxSize = 400}: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [color, setColor] = useState("#d96996");
    const [showGrid, setShowGrid] = useState(true);

    const pixelsRef = useRef<number[][]>(
      Array.from(
        { length: GRID_SIZE },
        () => Array(GRID_SIZE).fill(0xffffff)
      )
    );

    const cellSize =
      CANVAS_RESOLUTION / GRID_SIZE;


    function drawGrid(
      context: CanvasRenderingContext2D
    ) {
      if (!showGrid) return;

      context.save();

      context.strokeStyle =
        "rgb(200, 200, 200)";

      context.lineWidth = 1;

      for (let i = 0; i <= GRID_SIZE; i++) {
        const position = i * cellSize;

        context.beginPath();
        context.moveTo(position, 0);
        context.lineTo(
          position,
          CANVAS_RESOLUTION
        );
        context.stroke();
      }

      /*
      * Draw horizontal lines.
      */
      for (let i = 0; i <= GRID_SIZE; i++) {
        const position = i * cellSize;

        context.beginPath();
        context.moveTo(0, position);
        context.lineTo(
          CANVAS_RESOLUTION,
          position
        );
        context.stroke();
      }

      context.restore();
    }

    function redrawCanvas() {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const context = canvas.getContext("2d");

      if (!context) return;

      pixelsRef.current.forEach(
        (row, rowIndex) => {
          row.forEach(
            (value, columnIndex) => {
              const r =
                (value >> 16) & 0xff;

              const g =
                (value >> 8) & 0xff;

              const b =
                value & 0xff;

              context.fillStyle =
                `rgb(${r}, ${g}, ${b})`;

              context.fillRect(
                columnIndex * cellSize,
                rowIndex * cellSize,
                cellSize,
                cellSize
              );
            }
          );
        }
      );

      drawGrid(context);
    }

    useEffect(() => {
      redrawCanvas();
    }, []);


    useEffect(() => {
      redrawCanvas();
    }, [showGrid]);


    function hexToNumber(hex: string): number {
      return Number.parseInt(
        hex.replace("#", ""),
        16
      );
    }

    function getCellFromMouse(
      event: React.MouseEvent<HTMLCanvasElement>
    ) {
      const canvas = canvasRef.current;

      if (!canvas) return null;

      const rect =
        canvas.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const column = Math.floor(
        (x / rect.width) * GRID_SIZE
      );

      const row = Math.floor(
        (y / rect.height) * GRID_SIZE
      );

      if (
        row < 0 ||
        row >= GRID_SIZE ||
        column < 0 ||
        column >= GRID_SIZE
      ) {
        return null;
      }

      return {
        row,
        column,
      };
    }

    function drawCell(
      row: number,
      column: number
    ) {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const context = canvas.getContext("2d");

      if (!context) return;

      const colorNumber =
        hexToNumber(color);

      pixelsRef.current[row][column] =
        colorNumber;

      context.fillStyle = color;

      context.fillRect(
        column * cellSize,
        row * cellSize,
        cellSize,
        cellSize
      );

      if (showGrid) {
        drawGrid(context);
      }
    }

    function handleMouseDown(
      event: React.MouseEvent<HTMLCanvasElement>
    ) {
      if (event.button !== 0) return;

      const cell =
        getCellFromMouse(event);

      if (!cell) return;

      drawCell(
        cell.row,
        cell.column
      );
    }

    function handleMouseMove(
      event: React.MouseEvent<HTMLCanvasElement>
    ) {
      if ((event.buttons & 1) === 0) {
        return;
      }

      const cell =
        getCellFromMouse(event);

      if (!cell) return;

      drawCell(
        cell.row,
        cell.column
      );
    }

    function clearCanvas() {
      const confirmed =
        window.confirm(
          "Are you sure you wish to clear the canvas?"
        );

      if (!confirmed) return;

      pixelsRef.current =
        Array.from(
          { length: GRID_SIZE },
          () =>
            Array(GRID_SIZE).fill(
              0xffffff
            )
        );

      redrawCanvas();
    }

    function sendDrawing() {
      const confirmed =
        window.confirm(
          "Are you sure you wish to send your drawing?"
        );

      if (!confirmed) return;

      const drawing =
        new Drawing(
          GRID_SIZE,
          GRID_SIZE
        );

      pixelsRef.current.forEach(
        (row, rowIndex) => {
          row.forEach(
            (value, columnIndex) => {
              drawing.set(
                rowIndex,
                columnIndex,
                value
              );
            }
          );
        }
      );
      onSend(drawing);
    }

    return (
        <div>
          <div
            style={{
              position: "relative",
              width: "90vw",
              maxWidth: `${maxSize}px`
            }}
          >
            <canvas
              ref={canvasRef}
              width={CANVAS_RESOLUTION}
              height={CANVAS_RESOLUTION}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                cursor: "crosshair"
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "12px",
              flexWrap: "wrap",
            }}
          >
            <label>
              Color:{" "}
              <input
                type="color"
                value={color}
                onChange={(event) =>
                  setColor(
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(event) =>
                  setShowGrid(
                    event.target.checked
                  )
                }
              />
              {" "}Show grid
            </label>

            <button className="btn" onClick={clearCanvas}>
              Clear
            </button>

            <button className="btn" onClick={sendDrawing}>
              Start Algorithm
            </button>
          </div>
        </div>
  );
}