---
name: Destination image mapping
description: Strict image/label rules per destination card — which local files and Unsplash URLs map to which labels
---

Each destination's `galleryImages` array in `src/data/destinations.ts` and `src/data/packages.ts` must use images that exactly match the label shown in `DestinationsGrid.tsx` and `PackagesGrid.tsx` `getImageLabel()` functions.

**Rules confirmed by the user:**
- **Nakuru**: local flamingo images only — `nakuru_flamingos_shore.jpg` (Flamingo Shoreline), `nakuru_flamingos_lake.jpg` (Lake View), `nakuru_flamingos_flock.jpg` (Flamingo Flock), `nakuru_lesser_flamingo.jpg` (Lesser Flamingo)
- **Naivasha**: `naivasha_hippos_shore.jpg` (Hippo Shores), `naivasha_boat_safari.jpg` (Boat Safari), Unsplash gorge/cycling URL (Hell's Gate)
- **Cape Town**: `capetown_table_mountain.jpg` (Table Mountain), `capetown_table_mountain_summit.jpg` (Summit View) — NO Camps Bay images
- **Zanzibar**: `zanzibar_turtle_sanctuary.jpg` (Nungwi Turtles), Unsplash Stone Town URL (Stone Town), Unsplash Kendwa beach URL (Kendwa Beach)
- **Kisumu**: `kisumu_lake_victoria_sunset.jpg` (Lake Victoria Sunset), `kisumu_dunga_lake_view.jpg` (Dunga Lake View)
- **Amboseli**: `amboseli_kibo_entrance.jpg` (Kibo Entrance), `amboseli_kibo_lounge.jpg` (Lounge)

**Why:** User explicitly requested no image/label mix-ups; each place must show only images of that place.

**How to apply:** When adding or changing any destination gallery, always update both the data file AND the `getImageLabel()` / `getImageIcon()` functions in both `DestinationsGrid.tsx` and `PackagesGrid.tsx`.
