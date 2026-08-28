import { useEffect, useRef } from "react";
import Drawing from "../algorithm/drawing";

interface DrawingPreviewProps {
    drawing: Drawing | null;
    label: string;
    size: number;
}

interface DisplayProps {
    generation: number;
    best: Drawing | null;
    median: Drawing | null;
    worst: Drawing | null;
}

function DrawingPreview({
    drawing,
    label,
    size
}: DrawingPreviewProps) {

    const canvasRef =
        useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!drawing) return;

        const canvas =
            canvasRef.current;

        if (!canvas) return;

        const ctx =
            canvas.getContext("2d");

        if (!ctx) return;


        const imageData =
            ctx.createImageData(
                drawing.cols,
                drawing.rows
            );

        const pixels =
            drawing.getPixelArray();

        for (let row = 0; row < drawing.rows; row++) {
            for (let col = 0; col < drawing.cols; col++) {

                const value =
                    pixels[row]![col]!;

                const index =
                    (
                        row * drawing.cols + col
                    ) * 4;

                imageData.data[index] =
                    (value >> 16) & 0xff;

                imageData.data[index + 1] =
                    (value >> 8) & 0xff;

                imageData.data[index + 2] =
                    value & 0xff;

                imageData.data[index + 3] =
                    255;
            }
        }


        ctx.clearRect(
            0,
            0,
            size,
            size
        );

        const tempCanvas =
            document.createElement("canvas");

        tempCanvas.width =
            drawing.cols;

        tempCanvas.height =
            drawing.rows;

        const tempContext =
            tempCanvas.getContext("2d");

        if (!tempContext) return;

        tempContext.putImageData(
            imageData,
            0,
            0
        );

        ctx.imageSmoothingEnabled =
            false;

        ctx.drawImage(
            tempCanvas,
            0,
            0,
            size,
            size
        );

    }, [drawing]);


    return (
        <div>
            <h3>{label}</h3>

            <canvas
                ref={canvasRef}
                width={size}
                height={size}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    imageRendering: "pixelated",
                    border: "1px solid #ccc",
                    display: "block",
                }}
            />

            <p>
                Score:{" "}
                {drawing
                    ? drawing.getScore()
                    : "-"}
            </p>
        </div>
    );
}

export default function Display({
    generation,
    best,
    median,
    worst,
}: DisplayProps) {

    return (
        <div className="Display">

            <h2 className="md">
                Generation {generation}
            </h2>

            <div className="displayGrid">

                <div className="displayItemTall">
                    <DrawingPreview 
                    drawing={best}
                    label="Best"
                    size={400}
                    />
                </div>
                <div>
                    <DrawingPreview
                        drawing={median}
                        label="Median"
                        size={167}
                    />
                </div>
                <div>
                    <DrawingPreview
                        drawing={worst}
                        label="Worst"
                        size={167}
                    />
                </div>

            </div>

        </div>
    );
}