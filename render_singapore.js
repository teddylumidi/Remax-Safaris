import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const WIDTH = 1280;
const HEIGHT = 720;
const FPS = 30;
const DURATION = 10; // 10s loop

function createPPMHeader(w, h) {
  return Buffer.from(`P6\n${w} ${h}\n255\n`);
}

async function renderSingaporeVideo(outputPath) {
  console.log(`Starting Singapore Marina Bay Sands video render -> ${outputPath}`);
  const totalFrames = DURATION * FPS;
  const header = createPPMHeader(WIDTH, HEIGHT);
  const frameBytes = WIDTH * HEIGHT * 3;

  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'ppm',
    '-s', `${WIDTH}x${HEIGHT}`,
    '-r', `${FPS}`,
    '-i', '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    outputPath
  ]);

  const buffer = Buffer.alloc(frameBytes);

  // Precompute building skyline structure for high performance
  const buildings = [];
  for (let i = 0; i < 22; i++) {
    const bx = i * 40 + 20;
    const bw = 32 + ((i * 17) % 18);
    const bh = 140 + ((i * 47) % 200);
    buildings.push({ x: bx, w: bw, h: bh, litRatio: 0.4 + ((i * 7) % 5) * 0.1 });
  }

  for (let f = 0; f < totalFrames; f++) {
    const t = f / FPS;
    let ptr = 0;

    // Slow cinematic pan effect matching the uploaded video pan
    const panOffset = (Math.sin((t / DURATION) * Math.PI * 2) * 0.05) * WIDTH;

    for (let y = 0; y < HEIGHT; y++) {
      const ny = y / HEIGHT;

      for (let x = 0; x < WIDTH; x++) {
        const sx = x + panOffset;
        const nx = sx / WIDTH;

        let r = 0, g = 0, b = 0;

        if (ny < 0.60) {
          // Night Sky: Deep nocturnal blue-black gradient
          const skyT = ny / 0.60;
          r = Math.floor(4 + skyT * 6);
          g = Math.floor(6 + skyT * 10);
          b = Math.floor(14 + skyT * 22);

          // Render Downtown CBD skyscrapers (left side & background)
          for (const bldg of buildings) {
            if (sx >= bldg.x && sx < bldg.x + bldg.w && y >= (0.60 * HEIGHT - bldg.h)) {
              // Building facade
              r = 14; g = 18; b = 26;

              // Grid of glowing office windows
              const wx = Math.floor((sx - bldg.x) / 7);
              const wy = Math.floor((y - (0.60 * HEIGHT - bldg.h)) / 9);
              const isWinEdge = (sx - bldg.x) % 7 > 1 && (y - (0.60 * HEIGHT - bldg.h)) % 9 > 2;

              if (isWinEdge) {
                const winNoise = Math.sin(wx * 13.7 + wy * 19.3 + bldg.x);
                if (winNoise > 0.05) {
                  // Golden / Warm white window lights with gentle twinkle
                  const twinkle = Math.sin(t * 1.5 + wx + wy * 0.5) > 0.85 ? 25 : 0;
                  r = Math.min(255, 235 + twinkle);
                  g = Math.min(255, 205 + twinkle);
                  b = Math.min(255, 140 + twinkle);
                } else if (winNoise < -0.7) {
                  // Accent blue/cyan LED architectural stripes
                  r = 30; g = 180; b = 240;
                }
              }
            }
          }

          // Iconic Marina Bay Sands: 3 illuminated hotel towers + cantilever rooftop skypark
          const mbsTowers = [
            { x: 0.66 * WIDTH, w: 55, h: 320 },
            { x: 0.74 * WIDTH, w: 55, h: 330 },
            { x: 0.82 * WIDTH, w: 55, h: 325 }
          ];

          for (const tower of mbsTowers) {
            if (sx >= tower.x - tower.w / 2 && sx <= tower.x + tower.w / 2 && y >= (0.60 * HEIGHT - tower.h)) {
              // Tower body
              r = 24; g = 28; b = 38;

              // Golden luminous hotel room windows
              const wx = Math.floor((sx - (tower.x - tower.w / 2)) / 5);
              const wy = Math.floor((y - (0.60 * HEIGHT - tower.h)) / 6);
              if ((sx - (tower.x - tower.w / 2)) % 5 > 1 && (y - (0.60 * HEIGHT - tower.h)) % 6 > 1) {
                const roomNoise = Math.sin(wx * 7.7 + wy * 11.3 + tower.x);
                if (roomNoise > -0.4) {
                  // Warm amber hotel room glow
                  r = 250; g = 215; b = 135;
                }
              }
            }
          }

          // Marina Bay Sands Rooftop Skypark & Infinity Pool cantilever boat structure
          const skyparkX1 = 0.62 * WIDTH;
          const skyparkX2 = 0.89 * WIDTH;
          const skyparkY = 0.60 * HEIGHT - 335;
          if (sx >= skyparkX1 && sx <= skyparkX2 && y >= skyparkY && y <= skyparkY + 28) {
            // Sleek curved boat hull
            r = 35; g = 40; b = 55;

            // Rooftop purple & blue LED wash light beam (matching the uploaded video!)
            if (y >= skyparkY && y <= skyparkY + 8) {
              const ledPulse = Math.sin(t * 2.0) * 0.2 + 0.8;
              r = Math.floor(130 * ledPulse);
              g = Math.floor(60 * ledPulse);
              b = Math.floor(255 * ledPulse);
            }

            // Green lush Skypark trees accent
            if (y > skyparkY + 8 && y < skyparkY + 16 && ((sx * 3) % 7 > 3)) {
              r = 40; g = 140; b = 60;
            }
          }

          // Singapore Flyer Giant Observation Ferris Wheel (right side)
          const flyerX = 0.90 * WIDTH;
          const flyerY = 0.38 * HEIGHT;
          const fdx = sx - flyerX;
          const fdy = y - flyerY;
          const fDist = Math.sqrt(fdx * fdx + fdy * fdy);

          if (fDist >= 68 && fDist <= 74) {
            // Glowing cyan & white wheel rim
            r = 70; g = 210; b = 255;
          }
          if (fDist < 68 && fDist > 8) {
            // Rotating spokes
            const spokeAngle = Math.atan2(fdy, fdx) + t * 0.4;
            if (Math.abs(Math.sin(spokeAngle * 8)) > 0.97) {
              r = 90; g = 180; b = 230;
            }
          }

          // Illuminated geodesic dome (Esplanade / Flower Dome)
          const domeX = 0.48 * WIDTH;
          const domeY = 0.58 * HEIGHT;
          const ddx = (sx - domeX) / 1.6;
          const ddy = y - domeY;
          if (ddx * ddx + ddy * ddy < 1400 && y < domeY) {
            // Glowing shell pattern
            const grid = Math.sin(sx * 0.2) * Math.cos(y * 0.2);
            if (grid > 0.2) {
              r = 230; g = 190; b = 130;
            } else {
              r = 40; g = 50; b = 65;
            }
          }

        } else {
          // Marina Bay Waters with fluid reflections
          const waterT = (ny - 0.60) / 0.40;
          const ripple = Math.sin(sx * 0.04 + y * 0.12 + t * 3.5) * 10 + Math.cos(sx * 0.02 - t * 2) * 8;

          // Water base
          r = Math.floor(6 + ripple * 0.3);
          g = Math.floor(10 + ripple * 0.4);
          b = Math.floor(22 + ripple * 0.7);

          // Tower reflections (Warm golden vertical streaks)
          if (sx >= 0.64 * WIDTH && sx <= 0.86 * WIDTH) {
            const refl = Math.sin(sx * 0.25 + ripple * 0.6 + t * 2.2);
            if (refl > 0.05) {
              const str = (refl + 1) * 0.5 * (1 - waterT * 0.5);
              r = Math.min(255, Math.floor(r + 200 * str));
              g = Math.min(255, Math.floor(g + 160 * str));
              b = Math.min(255, Math.floor(b + 90 * str));
            }
          }

          // Skypark purple laser reflection
          if (sx >= 0.68 * WIDTH && sx <= 0.82 * WIDTH && ny < 0.72) {
            const purpleRefl = Math.sin(sx * 0.3 + t * 3) * 0.5 + 0.5;
            r = Math.min(255, r + Math.floor(80 * purpleRefl));
            g = Math.min(255, g + Math.floor(20 * purpleRefl));
            b = Math.min(255, b + Math.floor(160 * purpleRefl));
          }

          // City CBD golden reflections
          if (sx < 0.58 * WIDTH) {
            const cbdRefl = Math.sin(sx * 0.18 + ripple * 0.5 + t * 2.8);
            if (cbdRefl > 0.2) {
              const str = cbdRefl * (1 - waterT * 0.6);
              r = Math.min(255, Math.floor(r + 140 * str));
              g = Math.min(255, Math.floor(g + 110 * str));
              b = Math.min(255, Math.floor(b + 60 * str));
            }
          }
        }

        buffer[ptr++] = r;
        buffer[ptr++] = g;
        buffer[ptr++] = b;
      }
    }

    ffmpeg.stdin.write(header);
    ffmpeg.stdin.write(buffer);
  }

  ffmpeg.stdin.end();

  return new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });
}

async function main() {
  const pubPath = path.resolve('public/videos/singapore_skyline.mp4');
  const distPath = path.resolve('dist/videos/singapore_skyline.mp4');

  await renderSingaporeVideo(pubPath);
  fs.copyFileSync(pubPath, distPath);
  console.log('Singapore video rendered and copied successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
