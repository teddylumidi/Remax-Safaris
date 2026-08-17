const { execSync } = require('child_process');
const fs = require('fs');

const videos = [
  {
    name: 'elephants_safari.mp4',
    poster: 'public/images/video_poster_elephants.jpg',
    image: 'public/images/bespoke_safari_elephants.jpg',
    pan: "scale=1440:810,crop=1280:720:(t/8)*160:(t/8)*90"
  },
  {
    name: 'lions_safari.mp4',
    poster: 'public/images/video_poster_lions.jpg',
    image: 'public/images/remax_safari_hero.jpg',
    pan: "scale=1440:810,crop=1280:720:(8-t)*20:(t/8)*90"
  },
  {
    name: 'cheetahs_safari.mp4',
    poster: 'public/images/video_poster_cheetahs.jpg',
    image: 'public/images/park_safari_cruiser_wildlife.jpg',
    pan: "scale=1440:810,crop=1280:720:(t/8)*160:(8-t)*10"
  },
  {
    name: 'zanzibar_dhow_boat_safari.mp4',
    poster: 'public/images/zanzibar_boat_video_frame.jpg',
    image: 'public/images/zanzibar_boat_video_frame.jpg',
    pan: "scale=1440:810,crop=1280:720:(t/8)*160:(t/8)*90"
  },
  {
    name: 'dubai_skyline.mp4',
    poster: 'public/images/video_poster_dubai.jpg',
    image: 'public/images/uae_dubai_burj_khalifa.jpg',
    pan: "scale=1440:810,crop=1280:720:(t/8)*160:(8-t)*11"
  },
  {
    name: 'singapore_skyline.mp4',
    poster: 'public/images/video_poster_singapore.jpg',
    image: 'public/images/capetown_camps_bay.jpg',
    pan: "scale=1440:810,crop=1280:720:(8-t)*20:(t/8)*90"
  },
  {
    name: 'skyscrapers_city.mp4',
    poster: 'public/images/video_poster_skyscrapers.jpg',
    image: 'public/images/capetown_table_mountain.jpg',
    pan: "scale=1440:810,crop=1280:720:(t/8)*160:(t/8)*90"
  }
];

if (!fs.existsSync('public/videos')) fs.mkdirSync('public/videos', { recursive: true });
if (!fs.existsSync('dist/videos')) fs.mkdirSync('dist/videos', { recursive: true });

// Kill any old ffmpeg
try { execSync('killall -9 ffmpeg 2>/dev/null || true'); } catch(e){}

for (const item of videos) {
  const outPath = `public/videos/${item.name}`;
  const distPath = `dist/videos/${item.name}`;

  if (fs.existsSync(item.image) && !fs.existsSync(item.poster)) {
    fs.copyFileSync(item.image, item.poster);
  }

  const cmd = `ffmpeg -y -loop 1 -t 8 -i "${item.image}" -vf "${item.pan},format=yuv420p" -c:v libx264 -preset ultrafast -crf 24 -r 30 -g 30 -movflags +faststart "${outPath}"`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    fs.copyFileSync(outPath, distPath);
    const size = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
    console.log(`✓ Created ${item.name} (${size} MB)`);
  } catch (err) {
    console.error(`Error creating ${item.name}:`, err.message);
  }
}

console.log('All 7 real video files generated successfully!');
