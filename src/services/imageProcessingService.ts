/**
 * Removes the white background from a base64 image string or URL using a flood-fill algorithm.
 * This ensures internal white highlights on the subject are not made transparent.
 * @param source - The base64 image string or image URL
 * @param tolerance - The distance from pure white to be considered fully transparent (0-255).
 * @returns A promise that resolves to a base64 image string with transparency.
 */
export async function removeWhiteBackground(
  source: string, 
  tolerance: number = 60
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const width = img.width;
      const height = img.height;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      // Create a visited array to keep track of processed pixels
      const visited = new Uint8Array(width * height);
      const stack: [number, number][] = [];

      // Helper to get pixel index
      const getIndex = (x: number, y: number) => (y * width + x) * 4;

      // Helper to check if a pixel is "white enough"
      const isWhite = (x: number, y: number) => {
        if (x < 0 || x >= width || y < 0 || y >= height) return false;
        const idx = getIndex(x, y);
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];
        
        if (a === 0) return false; // Already transparent
        if (visited[y * width + x]) return false; // Already visited

        // Calculate Euclidean distance from pure white (255, 255, 255)
        const distFromWhite = Math.sqrt(
          Math.pow(255 - r, 2) + 
          Math.pow(255 - g, 2) + 
          Math.pow(255 - b, 2)
        );
        
        return distFromWhite <= tolerance;
      };

      // Start flood fill from the 4 corners
      const startPoints: [number, number][] = [
        [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1],
        [Math.floor(width/2), 0], [Math.floor(width/2), height - 1],
        [0, Math.floor(height/2)], [width - 1, Math.floor(height/2)]
      ];

      for (const [startX, startY] of startPoints) {
        if (isWhite(startX, startY)) {
          stack.push([startX, startY]);
          visited[startY * width + startX] = 1;
        }
      }

      // Perform flood fill
      while (stack.length > 0) {
        const [x, y] = stack.pop()!;
        const idx = getIndex(x, y);
        
        // Make pixel transparent
        data[idx + 3] = 0;

        // Check neighbors (up, down, left, right)
        const neighbors: [number, number][] = [
          [x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]
        ];

        for (const [nx, ny] of neighbors) {
          if (isWhite(nx, ny)) {
            stack.push([nx, ny]);
            visited[ny * width + nx] = 1;
          }
        }
      }

      // Optional: Edge smoothing (anti-aliasing)
      // Find pixels that are opaque but adjacent to transparent pixels, and reduce their alpha
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = getIndex(x, y);
          if (data[idx + 3] > 0) { // If opaque
            // Count transparent neighbors
            let transparentNeighbors = 0;
            if (data[getIndex(x, y-1) + 3] === 0) transparentNeighbors++;
            if (data[getIndex(x, y+1) + 3] === 0) transparentNeighbors++;
            if (data[getIndex(x-1, y) + 3] === 0) transparentNeighbors++;
            if (data[getIndex(x+1, y) + 3] === 0) transparentNeighbors++;
            
            if (transparentNeighbors > 0) {
              // Soften the edge
              data[idx + 3] = Math.floor(255 * (1 - (transparentNeighbors * 0.2)));
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = source;
  });
}
