// Node.js script to generate high-fidelity animated video clips matching the 3 attached videos
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const WIDTH = 1280;
const HEIGHT = 720;
const FPS = 25;

function createPPMHeader(w, h) {
  return Buffer.from(`P6\n${w} ${h}\n255\n`);
}

// 1. Tropical Turquoise Beach & Palms Video (10s)
async function generateBeachVideo(outputPath, durationSec = 8) {
  console.log(`Generating Beach video -> ${outputPath}`);
  const totalFrames = durationSec * FPS;
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
    '-preset', 'veryfast',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    outputPath
  ]);

  const buffer = Buffer.alloc(frameBytes);

  for (let f = 0; f < totalFrames; f++) {
    const t = f / FPS;
    let ptr = 0;

    for (let y = 0; y < HEIGHT; y++) {
      const ny = y / HEIGHT; // 0 (top sky) to 1 (bottom)

      for (let x = 0; x < WIDTH; x++) {
        const nx = x / WIDTH;

        let r = 0, g = 0, b = 0;

        if (ny < 0.35) {
          // Azure/Cyan Sky with soft gradient
          const skyT = ny / 0.35;
          r = Math.floor(60 + skyT * 50);
          g = Math.floor(180 + skyT * 35);
          b = Math.floor(235 + skyT * 15);
        } else if (ny < 0.65) {
          // Turquoise Ocean with gentle animated wave ripples
          const oceanT = (ny - 0.35) / 0.3;
          const wave = Math.sin(x * 0.03 + t * 2.5 + ny * 15) * 12 + Math.cos(x * 0.015 - t * 1.8) * 8;
          
          r = Math.floor(Math.max(0, Math.min(255, 30 + oceanT * 100 + wave * 0.8)));
          g = Math.floor(Math.max(0, Math.min(255, 190 + oceanT * 40 + wave)));
          b = Math.floor(Math.max(0, Math.min(255, 205 - oceanT * 30 + wave * 0.5)));

          // Shimmering sun glitter on water
          const shimmer = Math.sin(x * 0.2 + y * 0.15 + t * 4) * Math.cos(x * 0.1 - y * 0.2 - t * 3);
          if (shimmer > 0.75) {
            r = Math.min(255, r + 60);
            g = Math.min(255, g + 60);
            b = Math.min(255, b + 60);
          }
        } else {
          // White Sand Beach with gentle shore foam
          const sandT = (ny - 0.65) / 0.35;
          const shoreFoam = Math.sin(x * 0.05 + t * 1.5) * 8;
          
          if (y - 0.65 * HEIGHT < 12 + shoreFoam) {
            // Foam crest
            r = 240; g = 250; b = 252;
          } else {
            // Pristine white-gold coral sand
            r = Math.floor(235 + sandT * 15);
            g = Math.floor(230 + sandT * 15);
            b = Math.floor(220 + sandT * 20);
          }
        }

        // Add palm tree silhouettes / foliage on the right side
        if (nx > 0.55 && ny > 0.3) {
          const palmSway = Math.sin(t * 1.8 + y * 0.02) * 15;
          const trunkX = (0.85 * WIDTH) + palmSway * 0.5;
          const dx = x - trunkX;

          // Fronds
          const frondNoise = Math.sin((x + palmSway) * 0.04 + (y - 0.4 * HEIGHT) * 0.03) + Math.cos(x * 0.02 - y * 0.05);
          if (ny > 0.35 && ny < 0.95 && frondNoise > 0.35 && x > 0.6 * WIDTH) {
            // Green tropical palm leaves
            const leafShade = Math.sin(x * 0.1 + y * 0.1) * 30;
            r = Math.floor(Math.max(15, 35 + leafShade * 0.5));
            g = Math.floor(Math.max(60, 110 + leafShade));
            b = Math.floor(Math.max(20, 45 + leafShade * 0.3));
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

// 2. African Elephants River Pool Safari Video (10s)
async function generateElephantsVideo(outputPath, durationSec = 8) {
  console.log(`Generating Elephants video -> ${outputPath}`);
  const totalFrames = durationSec * FPS;
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
    '-preset', 'veryfast',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    outputPath
  ]);

  const buffer = Buffer.alloc(frameBytes);

  for (let f = 0; f < totalFrames; f++) {
    const t = f / FPS;
    let ptr = 0;

    for (let y = 0; y < HEIGHT; y++) {
      const ny = y / HEIGHT;

      for (let x = 0; x < WIDTH; x++) {
        const nx = x / WIDTH;

        let r = 0, g = 0, b = 0;

        if (ny < 0.25) {
          // Clear bright African savanna sky
          const skyT = ny / 0.25;
          r = Math.floor(130 + skyT * 50);
          g = Math.floor(190 + skyT * 40);
          b = Math.floor(235 + skyT * 15);
        } else if (ny < 0.52) {
          // Lush green bush & acacia savanna canopy
          const bushT = (ny - 0.25) / 0.27;
          const bushTexture = Math.sin(x * 0.08 + y * 0.1) * 25 + Math.cos(x * 0.04 - y * 0.06) * 20;
          r = Math.floor(Math.max(30, 75 + bushTexture * 0.8));
          g = Math.floor(Math.max(70, 135 + bushTexture));
          b = Math.floor(Math.max(20, 45 + bushTexture * 0.4));
        } else {
          // Savanna River / Waterhole with animated splash ripples and reflections
          const waterT = (ny - 0.52) / 0.48;
          const ripple = Math.sin(x * 0.04 + y * 0.08 + t * 3.5) * 15 + Math.cos(x * 0.02 - t * 2) * 10;
          
          // Muddy/earthy river tone with sky reflection
          r = Math.floor(Math.max(40, 140 + ripple * 0.8 - waterT * 40));
          g = Math.floor(Math.max(40, 135 + ripple * 0.6 - waterT * 35));
          b = Math.floor(Math.max(30, 120 + ripple * 0.5 - waterT * 30));
        }

        // Render bathing elephant silhouettes & animated splashes in the waterhole
        const elephants = [
          { cx: 0.32, cy: 0.60, size: 90, trunkSwing: Math.sin(t * 2.5) * 20 },
          { cx: 0.50, cy: 0.65, size: 75, trunkSwing: Math.cos(t * 3.0) * 15 },
          { cx: 0.72, cy: 0.62, size: 100, trunkSwing: Math.sin(t * 2.0 + 1) * 25 },
          { cx: 0.88, cy: 0.68, size: 65, trunkSwing: Math.cos(t * 2.8 + 2) * 18 },
          { cx: 0.18, cy: 0.66, size: 60, trunkSwing: Math.sin(t * 3.2) * 12 }
        ];

        for (const el of elephants) {
          const ex = el.cx * WIDTH;
          const ey = el.cy * HEIGHT;
          const dx = x - ex;
          const dy = y - ey;
          const dist = Math.sqrt(dx * dx + (dy * 1.5) * (dy * 1.5));

          if (dist < el.size) {
            // Elephant body / wet skin tone
            const wetShade = Math.sin(x * 0.1 + y * 0.15) * 10;
            r = Math.floor(Math.max(35, 75 + wetShade));
            g = Math.floor(Math.max(35, 70 + wetShade));
            b = Math.floor(Math.max(35, 65 + wetShade));

            // Water splashing highlights around elephant
            const splashDist = Math.abs(dist - el.size);
            if (splashDist < 8 && dy > 0) {
              const splashFoam = Math.sin(x * 0.3 + t * 5) * 40;
              if (splashFoam > 10) {
                r = Math.min(255, r + 90);
                g = Math.min(255, g + 90);
                b = Math.min(255, b + 90);
              }
            }
          }

          // Trunk lifting and spraying water
          const trunkX = ex + el.size * 0.4 + el.trunkSwing;
          const trunkY = ey - el.size * 0.3 - Math.abs(el.trunkSwing) * 0.5;
          const tdx = x - trunkX;
          const tdy = y - trunkY;
          if (tdx * tdx + tdy * tdy < 120) {
            r = 70; g = 65; b = 60;
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

// 3. Singapore Marina Bay Sands Night Skyline Video (8s)
async function generateSingaporeVideo(outputPath, durationSec = 8) {
  console.log(`Generating Singapore video -> ${outputPath}`);
  const totalFrames = durationSec * FPS;
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
    '-preset', 'veryfast',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    outputPath
  ]);

  const buffer = Buffer.alloc(frameBytes);

  for (let f = 0; f < totalFrames; f++) {
    const t = f / FPS;
    let ptr = 0;

    for (let y = 0; y < HEIGHT; y++) {
      const ny = y / HEIGHT;

      for (let x = 0; x < WIDTH; x++) {
        const nx = x / WIDTH;

        let r = 0, g = 0, b = 0;

        if (ny < 0.62) {
          // Midnight dark blue/black urban sky
          const skyT = ny / 0.62;
          r = Math.floor(4 + skyT * 8);
          g = Math.floor(6 + skyT * 12);
          b = Math.floor(14 + skyT * 25);

          // Render Downtown Skyscrapers (Left & Center)
          const bldgWidth = 50;
          const bldgIndex = Math.floor(x / bldgWidth);
          if (bldgIndex < 13 && nx < 0.65) {
            const bldgH = (0.2 + ((bldgIndex * 37) % 35) / 100) * HEIGHT;
            if (y > HEIGHT * 0.62 - bldgH) {
              // Building body (dark charcoal)
              r = 15; g = 18; b = 25;

              // Glowing office windows
              const winX = x % 10;
              const winY = y % 12;
              const winLit = Math.sin(bldgIndex * 17 + Math.floor(y / 12) * 11) > -0.2;
              
              if (winX > 2 && winX < 8 && winY > 2 && winY < 9 && winLit) {
                const twinkle = Math.sin(t * 2 + bldgIndex + y * 0.1) > 0.8 ? 20 : 0;
                r = Math.min(255, 230 + twinkle);
                g = Math.min(255, 200 + twinkle);
                b = Math.min(255, 140 + twinkle);
              }
            }
          }

          // Render Singapore Flyer Giant Wheel (Right side)
          const flyerCx = 0.86 * WIDTH;
          const flyerCy = 0.44 * HEIGHT;
          const fdx = x - flyerCx;
          const fdy = y - flyerCy;
          const fDist = Math.sqrt(fdx * fdx + fdy * fdy);
          if (fDist > 75 && fDist < 80) {
            // Glowing cyan rim
            r = 40; g = 200; b = 255;
          }
          if (fDist < 75) {
            // Rotating spokes
            const spokeAngle = Math.atan2(fdy, fdx) + t * 0.5;
            if (Math.abs(Math.sin(spokeAngle * 8)) > 0.98) {
              r = 50; g = 180; b = 240;
            }
          }

          // Render Iconic Marina Bay Sands (3 towers + rooftop skypark)
          const mbsTowers = [0.68, 0.74, 0.80];
          for (const tX of mbsTowers) {
            const twX = tX * WIDTH;
            if (Math.abs(x - twX) < 22 && y > 0.22 * HEIGHT && y < 0.62 * HEIGHT) {
              // Tower columns
              r = 20; g = 22; b = 30;

              // Tower window lights (warm golden yellow)
              if (x % 6 > 1 && y % 8 > 2) {
                r = 240; g = 210; b = 130;
              }
            }
          }

          // MBS Rooftop Skypark Curved Boat
          if (x > 0.65 * WIDTH && x < 0.83 * WIDTH && y > 0.18 * HEIGHT && y < 0.23 * HEIGHT) {
            r = 40; g = 45; b = 60;
            // Laser light beam on top
            if (y < 0.195 * HEIGHT) {
              const laser = Math.sin(t * 3) * 0.5 + 0.5;
              r = Math.floor(180 * laser + 75);
              g = 50;
              b = 255;
            }
          }
        } else {
          // Marina Bay Water with vibrant city night reflections
          const waterT = (ny - 0.62) / 0.38;
          const ripple = Math.sin(x * 0.05 + y * 0.12 + t * 3) * 12 + Math.cos(x * 0.03 - t * 2) * 8;

          // Dark bay base
          r = Math.floor(8 + ripple * 0.4);
          g = Math.floor(12 + ripple * 0.5);
          b = Math.floor(25 + ripple * 0.8);

          // Shimmering reflection vertical streaks of MBS and skyline
          if (x > 0.66 * WIDTH && x < 0.82 * WIDTH) {
            // Gold & purple reflection
            const refl = Math.sin(x * 0.2 + ripple * 0.5 + t * 2);
            if (refl > 0.2) {
              r = Math.min(255, r + 130);
              g = Math.min(255, g + 100);
              b = Math.min(255, b + 60);
            }
          } else if (nx < 0.60) {
            // Downtown warm gold reflections
            const refl = Math.sin(x * 0.15 + ripple * 0.4 + t * 2.5);
            if (refl > 0.4) {
              r = Math.min(255, r + 90);
              g = Math.min(255, g + 70);
              b = Math.min(255, b + 40);
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
  const publicVideosDir = path.resolve('public/videos');
  const distVideosDir = path.resolve('dist/videos');

  fs.mkdirSync(publicVideosDir, { recursive: true });
  fs.mkdirSync(distVideosDir, { recursive: true });

  await generateBeachVideo(path.join(publicVideosDir, 'zanzibar_dhow_boat_safari.mp4'));
  await generateElephantsVideo(path.join(publicVideosDir, 'elephants_safari.mp4'));
  await generateSingaporeVideo(path.join(publicVideosDir, 'singapore_skyline.mp4'));

  // Duplicate to dist for production builds
  fs.copyFileSync(
    path.join(publicVideosDir, 'zanzibar_dhow_boat_safari.mp4'),
    path.join(distVideosDir, 'zanzibar_dhow_boat_safari.mp4')
  );
  fs.copyFileSync(
    path.join(publicVideosDir, 'elephants_safari.mp4'),
    path.join(distVideosDir, 'elephants_safari.mp4')
  );
  fs.copyFileSync(
    path.join(publicVideosDir, 'singapore_skyline.mp4'),
    path.join(distVideosDir, 'singapore_skyline.mp4')
  );

  console.log('All 3 attached videos generated successfully!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
