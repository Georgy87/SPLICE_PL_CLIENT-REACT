export default function SampleViewWebWorker() {
  onmessage = (e) => {
    const { audioCoordinates, cssCanvasWidth, cssCanvasHeight, dpr } = e.data;

    const ctx = e.data.canvas.getContext('2d');
    const { canvas } = e.data;

    if (e.data.canvas === null) return;

    canvas.width = cssCanvasWidth * dpr;
    canvas.height = cssCanvasHeight * dpr;

    ctx?.scale(dpr, dpr);
    ctx?.translate(0, cssCanvasHeight / 2);

    const barWidth = cssCanvasWidth / audioCoordinates.length;
    ctx.strokeStyle = 'red';
    ctx.beginPath();

    for (let i = 0; i < audioCoordinates.length; i++) {
      const x = barWidth * i;

      const barHeight = audioCoordinates[i];
      drawLineSegment(ctx, x, barHeight, barWidth);
    }
    postMessage({ audioCoordinates });
  };

  const drawLineSegment = (ctx, x, barHeight, barWidth) => {
    // ctx.moveTo(x, 0);
    ctx.fillRect(x + barWidth / 2, -(barHeight / 2), 2, barHeight);
    ctx.fillStyle = 'red';
  };
}
