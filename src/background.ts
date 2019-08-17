
export default function Background({
  spriteSize, scaledSize, src, map, mapSize, viewport,
}) {
  const image = new Image();
  image.src = src;
  return {
    render(context) {
      const xMin = Math.floor(viewport.x / scaledSize);
      const yMin = Math.floor(viewport.y / scaledSize);
      const xMax = Math.ceil((viewport.x + viewport.w) / scaledSize);
      const yMax = Math.ceil((viewport.y + viewport.h) / scaledSize);
      for (let i = xMin; i < xMax; i += 1) {
        for (let j = yMin; j < yMax; j += 1) {
          const spriteIndex = (map[i + mapSize * j] - 1);
          const tileX = i * scaledSize - viewport.x + context.canvas.width * 0.5 - viewport.w * 0.5;
          const tileY = j * scaledSize - viewport.y + context.canvas.height * 0.5 - viewport.h * 0.5;
          context.drawImage(
            image,
            spriteIndex * spriteSize, 0, spriteSize, spriteSize,
            tileX, tileY, scaledSize, scaledSize,
          );
        }
      }
      // map.forEach((yRow, x) => {
      //   yRow.forEach((val, y) => {
      //     context.drawImage(
      //       image,
      //       x * spriteSize, y * spriteSize, spriteSize, spriteSize,
      //       x * scaledSize, y * scaledSize, scaledSize, scaledSize,
      //     );
      //   });
      // });
    },
  };
}
