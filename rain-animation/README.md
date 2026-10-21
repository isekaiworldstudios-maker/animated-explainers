# Rain Formation Explainer

A 75-second, vertical Remotion cartoon explaining how rain forms. The only composition is `RainExplainer` (1080x1920, 30 FPS).

## Preview

From this folder, start Remotion Studio:

```console
npm run dev
```

Select `RainExplainer` in Studio. If Studio was already open when the composition changed, restart it so it reloads the updated composition list.

If port 3000 is already serving an older Studio, start a fresh instance instead:

```console
npm run dev -- --port=3001 --force-new
```

Open `http://localhost:3001` and select `RainExplainer`.

## Render

From this folder, render an H.264 MP4:

```console
npx remotion render src/index.ts RainExplainer out/rain-explainer.mp4 --codec h264
```

The rendered video is written to `out/rain-explainer.mp4`.

## Checks

```console
npm run lint
```
