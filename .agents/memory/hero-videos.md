---
name: Hero video cycling
description: Hero component cycles all 3 videos in sequence, not a random single pick
---

`src/components/Hero.tsx` cycles through all three clips in order:
1. `elephants_waterhole.mp4`
2. `zanzibar_beach_palms.mp4`
3. `singapore_marina_bay.mp4`

It uses `loop=false` and advances on the video's `ended` event with a 600ms CSS opacity crossfade. The previously used approach (random pick at module load) was removed by the user's request.

**Why:** User explicitly wants all 3 videos to play on the hero, not just one.

**How to apply:** Never add `loop` back to the hero video element. If adding new hero clips, append to `HERO_VIDEOS` array — the cycling logic handles any array length automatically.
