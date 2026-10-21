import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

const FPS = 30;
const SCENE_LENGTH = FPS * 15;
const INK = "#123b57";
const BLUE = "#168bd2";

const Cloud: React.FC<{
  x: number;
  y: number;
  scale?: number;
  color?: string;
}> = ({ x, y, scale = 1, color = "#ffffff" }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 400,
      height: 180,
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      filter: "drop-shadow(0 12px 10px #397ca522)",
    }}
  >
    <div style={{ position: "absolute", left: 15, top: 70, width: 350, height: 92, borderRadius: 60, background: color }} />
    <div style={{ position: "absolute", left: 45, top: 43, width: 145, height: 120, borderRadius: "50%", background: color }} />
    <div style={{ position: "absolute", left: 140, top: 5, width: 155, height: 155, borderRadius: "50%", background: color }} />
    <div style={{ position: "absolute", left: 250, top: 55, width: 125, height: 108, borderRadius: "50%", background: color }} />
  </div>
);

const Sun: React.FC<{ x: number; y: number; size: number; frame: number }> = ({ x, y, size, frame }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: "50%",
      background: "#ffd457",
      transform: `scale(${1 + Math.sin(frame / 18) * 0.035})`,
      boxShadow: "0 0 0 18px #ffd45745, 0 0 60px #ffc93c88",
    }}
  />
);

const WaterDrop: React.FC<{ x: number; y: number; size: number; color?: string }> = ({ x, y, size, color = BLUE }) => (
  <svg viewBox="0 0 100 130" style={{ position: "absolute", left: x, top: y, width: size, height: size * 1.3 }}>
    <path d="M50 4C39 25 9 60 9 85a41 41 0 0 0 82 0C91 60 61 25 50 4Z" fill={color} />
    <path d="M31 78c2-12 10-23 19-33" fill="none" stroke="#ffffffa8" strokeLinecap="round" strokeWidth="8" />
  </svg>
);

const Droppy: React.FC<{
  x: number;
  y: number;
  size: number;
  frame: number;
  mood?: "happy" | "curious" | "excited";
}> = ({ x, y, size, frame, mood = "happy" }) => {
  const bob = Math.sin(frame / 13) * 13;
  const blink = frame % 137 > 130 ? 0.18 : 1;
  const smile = mood === "curious" ? "M91 153 Q110 145 129 153" : "M88 148 Q110 170 132 148";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + bob,
        width: size,
        height: size * 1.2,
        transform: `rotate(${Math.sin(frame / 24) * 3}deg)`,
        filter: "drop-shadow(0 18px 16px #075f9b35)",
      }}
    >
      <svg viewBox="0 0 220 260" width="100%" height="100%">
        <defs>
          <linearGradient id="droppy-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a9f2ff" />
            <stop offset="0.58" stopColor="#37b7ed" />
            <stop offset="1" stopColor="#0874c4" />
          </linearGradient>
        </defs>
        <path d="M110 8C88 44 25 111 25 162a85 85 0 0 0 170 0C195 111 132 44 110 8Z" fill="url(#droppy-fill)" stroke="#ffffff" strokeWidth="8" />
        <path d="M73 103c7-15 17-29 28-40" fill="none" stroke="#ffffffb8" strokeLinecap="round" strokeWidth="12" />
        <ellipse cx="84" cy="137" rx="8" ry={9 * blink} fill={INK} />
        <ellipse cx="137" cy="137" rx="8" ry={9 * blink} fill={INK} />
        <path d={smile} fill="none" stroke={INK} strokeLinecap="round" strokeWidth="6" />
        {mood === "excited" && <path d="m50 99 9-12m102 12 9-12" stroke={INK} strokeLinecap="round" strokeWidth="6" />}
        <ellipse cx="68" cy="153" rx="10" ry="6" fill="#ff9b9b" opacity="0.72" />
        <ellipse cx="152" cy="153" rx="10" ry="6" fill="#ff9b9b" opacity="0.72" />
      </svg>
    </div>
  );
};

const Ocean: React.FC<{ top: number }> = ({ top }) => (
  <>
    <div style={{ position: "absolute", left: 0, right: 0, top: top + 40, height: 420, background: "#4ec4dc" }} />
    <svg viewBox="0 0 1080 130" style={{ position: "absolute", top, width: "100%", height: 130 }}>
      <path d="M0 45 Q135 0 270 45T540 45T810 45T1080 45V130H0Z" fill="#70d9e8" />
      <path d="M0 66 Q140 22 280 66T560 66T840 66T1120 66" fill="none" stroke="#c5f5f4" strokeWidth="10" />
    </svg>
  </>
);

const HookArt: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <Sun x={790} y={560} size={150} frame={frame} />
    <Cloud x={50} y={700} scale={0.78} />
    <Ocean top={1180} />
    <Droppy x={395} y={820} size={280} frame={frame} mood="excited" />
    <div style={{ position: "absolute", top: 1320, left: 135, color: "#ffffff", fontSize: 30, fontWeight: 900 }}>OCEAN</div>
  </>
);

const EvaporationArt: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <Sun x={770} y={520} size={155} frame={frame} />
    <Ocean top={1120} />
    {[0, 1, 2, 3].map((i) => (
      <div key={i} style={{ position: "absolute", left: 335 + i * 105, top: 1000 - ((frame * 2 + i * 95) % 430), width: 48, height: 22, borderRadius: 50, background: "#ffffff88", filter: "blur(3px)" }} />
    ))}
    <svg viewBox="0 0 1080 560" style={{ position: "absolute", left: 0, top: 540, width: "100%", height: 560 }}>
      <path d="M330 430 Q335 250 405 120m145 310 Q570 250 620 140" fill="none" stroke="#ffffff" strokeDasharray="16 20" strokeLinecap="round" strokeWidth="8" />
      <path d="m381 139 28-35 10 44m179 12 27-35 11 43" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="9" />
    </svg>
    <Droppy x={80} y={850} size={210} frame={frame} mood="curious" />
    <div style={{ position: "absolute", left: 350, top: 740, color: INK, fontSize: 29, fontWeight: 900 }}>INVISIBLE WATER VAPOR RISES</div>
    <div style={{ position: "absolute", left: 360, top: 1150, color: INK, fontSize: 30, fontWeight: 900 }}>WARM WATER</div>
  </>
);

const CondensationArt: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1280, height: 220, background: "#a9e5de" }} />
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={i} style={{ position: "absolute", left: 310 + i * 90, top: 1070 - ((frame * 2 + i * 82) % 390), width: 24, height: 24, borderRadius: "50%", background: "#77d4e8" }} />
    ))}
    <Cloud x={286 + Math.sin(frame / 24) * 14} y={670} scale={1.08} />
    {Array.from({ length: 12 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 12;
      return <WaterDrop key={i} x={530 + Math.cos(angle) * 165} y={780 + Math.sin(angle) * 84} size={14} color="#45afe0" />;
    })}
    <Droppy x={75} y={960} size={200} frame={frame} mood="curious" />
    <div style={{ position: "absolute", left: 345, top: 1030, fontSize: 30, fontWeight: 900, color: "#ffffff" }}>COOLER AIR</div>
    <div style={{ position: "absolute", right: 45, top: 940, padding: "16px 22px", borderRadius: 50, background: "#ffd457", color: INK, fontSize: 26, fontWeight: 900, transform: `translateY(${Math.sin(frame / 15) * 8}px)` }}>TINY DROPLETS!</div>
  </>
);

const RainArt: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <Cloud x={255} y={585} scale={1.2} color="#d9e5ec" />
    <Cloud x={315} y={560} scale={1.08} />
    {Array.from({ length: 9 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 220 + i * 82, top: 790 + ((frame * 8 + i * 78) % 510), width: 13, height: 48, borderRadius: 12, background: i % 2 ? BLUE : "#51c3ec", transform: "rotate(18deg)" }} />
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1330, height: 180, background: "#68c9a1" }} />
    <svg viewBox="0 0 1080 180" style={{ position: "absolute", top: 1290, width: "100%", height: 180 }}>
      <path d="M0 90 Q180 20 360 90T720 90T1080 90V180H0Z" fill="#8bd8b5" />
      <path d="M120 70h100m620 20h120" stroke="#d8ffe8" strokeLinecap="round" strokeWidth="12" />
    </svg>
    <Droppy x={82} y={1050} size={220} frame={frame} mood="excited" />
  </>
);

const CycleArt: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1345, height: 160, background: "#5bc6dc" }} />
    <svg viewBox="0 0 1080 760" style={{ position: "absolute", left: 30, top: 510, width: 1020, height: 760 }}>
      <defs><marker id="cycle-arrow" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" refX="8" refY="6" orient="auto"><path d="M0 0 12 6 0 12Z" fill="#ff8068" /></marker></defs>
      <path d="M310 540 Q80 440 170 220M250 170Q500 20 730 165M790 230Q950 400 750 565" fill="none" stroke="#ff8068" strokeDasharray="18 14" strokeLinecap="round" strokeWidth="12" markerEnd="url(#cycle-arrow)" />
    </svg>
    <Sun x={775} y={555} size={125} frame={frame} />
    <Cloud x={345} y={675} scale={0.82} />
    <Droppy x={410} y={880} size={240} frame={frame} />
    <div style={{ position: "absolute", left: 52, top: 755, fontSize: 24, fontWeight: 900, color: BLUE }}>EVAPORATION</div>
    <div style={{ position: "absolute", right: 38, top: 760, fontSize: 24, fontWeight: 900, color: BLUE }}>CONDENSATION</div>
    <div style={{ position: "absolute", left: 405, top: 1270, fontSize: 24, fontWeight: 900, color: "#0874b6" }}>PRECIPITATION</div>
  </>
);

const scenes = [
  {
    title: "WHERE DOES RAIN\nCOME FROM?",
    subtitle: "Meet Droppy. Follow one little drop's big adventure.",
    caption: "Rain is water taking a trip through the sky!",
    background: "linear-gradient(180deg, #bdefff 0%, #e9fbff 72%, #c9f2ee 100%)",
    Art: HookArt,
  },
  {
    title: "THE SUN LIFTS\nWATER UP",
    subtitle: "Sunlight warms water in oceans, lakes, and rivers.",
    caption: "Some liquid water evaporates into invisible water vapor.",
    background: "linear-gradient(180deg, #9ce1fa 0%, #e8fbff 74%, #c5f3ed 100%)",
    Art: EvaporationArt,
  },
  {
    title: "COOL AIR BUILDS\nA CLOUD",
    subtitle: "Rising water vapor cools as it moves higher.",
    caption: "It condenses on tiny particles, making cloud droplets.",
    background: "linear-gradient(180deg, #b9e8fa 0%, #f2fbff 80%, #e3f6ef 100%)",
    Art: CondensationArt,
  },
  {
    title: "DROPLETS JOIN.\nTHEN FALL.",
    subtitle: "In warm clouds, droplets bump together and merge.",
    caption: "In cold clouds, ice crystals can also melt into rain.",
    background: "linear-gradient(180deg, #b9d9ec 0%, #e8f5fa 76%, #d8f1e8 100%)",
    Art: RainArt,
  },
  {
    title: "RAIN RETURNS\nTO EARTH",
    subtitle: "Water gathers, flows, and the journey begins again.",
    caption: "Water cycles through air, land, and living things. The end? Not quite!",
    background: "linear-gradient(180deg, #bdefff 0%, #eafaff 72%, #c5f1de 100%)",
    Art: CycleArt,
  },
];

export const RainExplainer: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#dff6ff", overflow: "hidden" }}>
      {scenes.map(({ title, subtitle, caption, background, Art }, index) => {
        const start = index * SCENE_LENGTH;
        const opacity =
          index === scenes.length - 1
            ? interpolate(frame, [start, start + 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : interpolate(
                frame,
                [start, start + 20, start + SCENE_LENGTH - 20, start + SCENE_LENGTH],
                [0, 1, 1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );
        const localFrame = frame - start;

        return (
          <AbsoluteFill
            key={title}
            style={{
              overflow: "hidden",
              opacity,
              background,
              color: INK,
              fontFamily: '"Trebuchet MS", "Avenir Next", sans-serif',
            }}
          >
            <div style={{ position: "absolute", top: 42, left: 54, right: 54, display: "flex", gap: 10 }}>
              {scenes.map((_, segment) => (
                <div key={segment} style={{ height: 8, flex: 1, borderRadius: 8, background: segment <= index ? BLUE : "#123b5730" }} />
              ))}
            </div>
            <div style={{ position: "absolute", top: 112, left: 62, right: 62, textAlign: "center" }}>
              <div style={{ marginBottom: 20, color: "#0874b6", fontSize: 26, fontWeight: 900, letterSpacing: 2, textTransform: "uppercase" }}>
                THE WATER CYCLE - {String(index + 1).padStart(2, "0")}
              </div>
              <div style={{ whiteSpace: "pre-line", fontSize: 70, fontWeight: 900, lineHeight: 1.02, textShadow: "0 4px 0 #ffffffa0" }}>{title}</div>
              <div style={{ marginTop: 18, fontSize: 32, lineHeight: 1.2, fontWeight: 700, color: "#315f78" }}>{subtitle}</div>
            </div>
            <div style={{ opacity: interpolate(localFrame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
              <Art frame={localFrame} />
            </div>
            <div style={{ position: "absolute", left: 56, right: 56, bottom: 76, padding: "28px 32px", borderRadius: 12, background: "#ffffffed", boxShadow: "0 12px 32px #164b6818", textAlign: "center", fontSize: 35, lineHeight: 1.25, fontWeight: 800 }}>
              {caption}
            </div>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
