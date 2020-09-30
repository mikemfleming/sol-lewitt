import { useRef, useEffect, useState } from 'react';

import random from 'canvas-sketch-util/random';

const createGrid = (width, height, gridSize) => {
  const points = [];

  for (let x = width / gridSize; x < width; x += width / gridSize) {
    for (let y = width / gridSize; y < height; y += height / gridSize) {
      points.push([x, y])
    }
  }

  return points;
};

const draw = ({
  context,
  strokeStyle = 'black',
  grid = [],
  lineTo: [lx, ly]
}) => {
  context.strokeStyle = strokeStyle;
  grid.filter(() => random.gaussian() > 0.5)
    .forEach(([x, y]) => {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(lx, ly);
      context.stroke();
    });
};

const drawRedLines = ({ context, width, height, grid }) => {
  draw({
    context,
    grid,
    strokeStyle: 'red',
    lineTo: [0, height / 2]
  });

  draw({
    context,
    grid,
    strokeStyle: 'red',
    lineTo: [width, height / 2]
  });

  draw({
    context,
    grid,
    strokeStyle: 'red',
    lineTo: [width / 2, 0]
  });

  draw({
    context,
    grid,
    strokeStyle: 'red',
    lineTo: [width / 2, height]
  });
};

const drawBlueLines = ({ context, width, height, grid }) => {
  draw({
    context,
    grid,
    strokeStyle: 'blue',
    lineTo: [0, 0]
  });

  draw({
    context,
    grid,
    strokeStyle: 'blue',
    lineTo: [width, 0]
  });

  draw({
    context,
    grid,
    strokeStyle: 'blue',
    lineTo: [0, height]
  });

  draw({
    context,
    grid,
    strokeStyle: 'blue',
    lineTo: [width, height]
  });
};

const drawYellowLines = ({ context, width, height, grid }) => {
  draw({
    context,
    grid,
    strokeStyle: 'yellow',
    lineTo: [width / 2, height / 2]
  });
};

export default function Home() {
  const canvasRef = useRef(null);
  const [seed, setSeed] = useState('');
  const [lineWidth, setLineWidth] = useState(1);
  const [gridSize, setGridSize] = useState(3);

  useEffect(() => {
    random.setSeed(seed);

    const canvas = canvasRef.current;
    const { width, height } = canvas;
    const context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const grid = createGrid(width, height, gridSize);
    
    context.lineWidth = lineWidth;

    // Red lines from the midpoints of four sides
    drawRedLines({ grid, context, width, height });

    // blue lines from four corners,
    drawBlueLines({ grid, context, width, height });

    // yellow lines from the center
    drawYellowLines({ grid, context, width, height });
  }, [seed, lineWidth, gridSize]);
  
  return (
    <div>
      <label htmlFor="seed">Seed</label>
      <input id="seed" value={seed} onChange={e => setSeed(e.target.value)} />
      <br />
      <label htmlFor="line-width">Line width</label>
      <input id="line-width" type="range" min="1" max="50" value={lineWidth} onChange={e => setLineWidth(e.target.value)} />
      <br />
      <label htmlFor="grid-size">Grid size</label>
      <input id="grid-size" type="range" min="2" max="50" value={gridSize} onChange={e => setGridSize(e.target.value)} />
      <br />
      <canvas
        className="canvas"
        width={2048}
        height={2048}
        ref={canvasRef}
      />
    </div>
  );
}
