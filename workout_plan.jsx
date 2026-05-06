import { useState } from "react";

// YouTube search URL generator — opens exercise form video directly
const ytSearch = (name) => `https://www.youtube.com/results?search_query=${encodeURIComponent(name + " exercise form tutorial")}`;

// YouTube video IDs for thumbnail previews — manually curated popular exercise videos
const YT_THUMBS = {
  "Bench Press": "rT7DgCr-3pg",
  "Bent Over Barbell Row": "FWJR5Ve8bnQ",
  "Overhead Press": "2yjwXTZQDDI",
  "Lat Pulldown": "CAwf7n6Luuc",
  "Dumbbell Hammer Curls": "zC3nLlEVAeI",
  "Barbell Back Squat": "ultWZbUMPL8",
  "Romanian Deadlift": "7j-2w4-P14I",
  "Bulgarian Split Squat": "2C-uNgKwPLE",
  "Leg Press": "IZxyjW7MPJQ",
  "Calf Raises": "3UWi44yN-wM",
  "Deadlift": "op9kVnSso6Q",
  "Incline Dumbbell Press": "8iPEnn-ltC8",
  "Barbell Front Squat": "m4ytaCJZpl0",
  "Dumbbell Row": "pYcpY20QaE8",
  "Farmers Walk": "Fkzk_RqlYig",
  "Hip Thrust": "SEdqd1n0icg",
  "Cable Kickback": "mPxAelYTkmI",
  "Glute Bridge": "OUgsJ8-Vi0E",
  "Sumo Squat": "kSMJbAfVUdA",
  "Step Up": "dQqApCGd5Ss",
  "Box Jump": "52r_Ul5k03g",
  "Broad Jump": "96FDN2FGHLQ",
  "Tuck Jump": "JlI_1cMkUuM",
  "Burpee": "TU8QYVW0gDU",
  "Mountain Climber": "nmwgirgXLYM",
  "Ab Crunch Machine": "m2MWpJfITPY",
  "Hanging Leg Raise": "hdng3Nm1x_E",
  "Russian Twist": "wkD8rjkodUI",
  "Plank": "ASdvN_XEl_c",
  "Side Plank": "K2VljzCC16g",
  "Battle Rope": "sP1eEpCEEoI",
  "Wall Sit": "y-wV4Lz6pJo",
  "Shadow Boxing": "EYFxEH6IB1Y",
  "Heavy Bag": "CvJgjM7aDzs",
  "Ladder Drill": "n4-PNRg5jog",
  "Lateral Bound": "hQeVDFcsTqQ",
  "Dead Hang": "JI-lGVTMXe4",
  "Foam Roll": "0P_YU5KAQWY",
  "Treadmill Jog": "8_gQmgmUASQ",
  "Cycling": "0QPLDAynJhk",
};

const getThumb = (key) => {
  if (YT_THUMBS[key]) return `https://img.youtube.com/vi/${YT_THUMBS[key]}/mqdefault.jpg`;
  for (const [k, id] of Object.entries(YT_THUMBS)) {
    if (key.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(key.toLowerCase())) {
      return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
    }
  }
  return null;
};

const getYtLink = (key) => {
  if (YT_THUMBS[key]) return `https://www.youtube.com/watch?v=${YT_THUMBS[key]}`;
  for (const [k, id] of Object.entries(YT_THUMBS)) {
    if (key.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(key.toLowerCase())) {
      return `https://www.youtube.com/watch?v=${id}`;
    }
  }
  return ytSearch(key);
};

const DAYS = [
  {
    day:"D1", title:"POWER STRIKE", subtitle:"Upper Body Strength + Boxing", focus:["Strength","Boxing"], color:"#E63946", icon:"🥊",
    blocks: [
      { name:"WARM-UP", time:"8 min", exercises:[
        { name:"Treadmill Light Jog", sets:"1", reps:"3 min", rest:"—", note:"Increase pace gradually", yt:"Treadmill Jog" },
        { name:"Arm Circles & Shoulder Rolls", sets:"1", reps:"1 min", rest:"—", note:"Both directions", yt:"" },
        { name:"Shadow Boxing (Jab-Cross)", sets:"3", reps:"1 min", rest:"30s", note:"Form & footwork focus", yt:"Shadow Boxing" },
      ]},
      { name:"STRENGTH — UPPER", time:"25 min", exercises:[
        { name:"Bench Press", sets:"4", reps:"6-8", rest:"90s", note:"80-85% 1RM", yt:"Bench Press" },
        { name:"Bent Over Barbell Row", sets:"4", reps:"6-8", rest:"90s", note:"Squeeze lats at top", yt:"Bent Over Barbell Row" },
        { name:"Overhead Press (Standing)", sets:"3", reps:"8-10", rest:"75s", note:"Brace core tight", yt:"Overhead Press" },
        { name:"Lat Pulldown", sets:"3", reps:"8-10", rest:"60s", note:"Full ROM", yt:"Lat Pulldown" },
        { name:"Dumbbell Hammer Curls", sets:"3", reps:"10-12", rest:"60s", note:"Grip for boxing", yt:"Dumbbell Hammer Curls" },
      ]},
      { name:"BOXING ROUNDS", time:"15 min", exercises:[
        { name:"Heavy Bag — Jab-Cross-Hook", sets:"3", reps:"3 min", rest:"60s", note:"Rotate hips", yt:"Heavy Bag" },
        { name:"Heavy Bag — Body Shots", sets:"2", reps:"2 min", rest:"60s", note:"Stay low", yt:"Heavy Bag" },
        { name:"Heavy Bag — Free Blitz", sets:"2", reps:"1 min", rest:"60s", note:"Max intensity", yt:"Heavy Bag" },
      ]},
      { name:"🍑 GLUTE + ISO FINISHER", time:"10 min", exercises:[
        { name:"Barbell Hip Thrust", sets:"4", reps:"12", rest:"60s", note:"Squeeze 2s at top", yt:"Hip Thrust" },
        { name:"Plank Hold", sets:"3", reps:"45s", rest:"30s", note:"Posterior pelvic tilt", yt:"Plank" },
        { name:"Wall Sit", sets:"2", reps:"45s", rest:"30s", note:"Thighs parallel", yt:"Wall Sit" },
        { name:"Dead Hang", sets:"2", reps:"30s", rest:"30s", note:"Grip endurance", yt:"Dead Hang" },
      ]},
    ],
  },
  {
    day:"D2", title:"FOOTWORK LAB", subtitle:"Agility + Plyometrics + Cardio", focus:["Agility","Plyo","Cardio"], color:"#00B4D8", icon:"⚡",
    blocks: [
      { name:"WARM-UP", time:"5 min", exercises:[
        { name:"Cycling (Easy)", sets:"1", reps:"3 min", rest:"—", note:"Light resistance", yt:"Cycling" },
        { name:"High Knees", sets:"2", reps:"30s", rest:"15s", note:"Drive knees up", yt:"" },
      ]},
      { name:"AGILITY CIRCUIT", time:"20 min", exercises:[
        { name:"Ladder — In-In-Out-Out", sets:"4", reps:"2 lengths", rest:"30s", note:"Speed first", yt:"Ladder Drill" },
        { name:"Ladder — Icky Shuffle", sets:"4", reps:"2 lengths", rest:"30s", note:"Balls of feet", yt:"Ladder Drill" },
        { name:"Cone Shuttle (5-10-5)", sets:"5", reps:"1 each", rest:"45s", note:"Explosive cuts", yt:"Lateral Bound" },
        { name:"Hurdle Lateral Hops", sets:"4", reps:"6 hurdles", rest:"30s", note:"Quick contacts", yt:"Lateral Bound" },
        { name:"Hurdle Forward Bounds", sets:"4", reps:"6 hurdles", rest:"30s", note:"Drive knees", yt:"Broad Jump" },
      ]},
      { name:"PLYOMETRIC POWER", time:"12 min", exercises:[
        { name:"Box Jumps", sets:"4", reps:"8", rest:"45s", note:"Land soft, step down", yt:"Box Jump" },
        { name:"Broad Jumps", sets:"4", reps:"6", rest:"45s", note:"Triple extension", yt:"Broad Jump" },
        { name:"Lateral Bounds", sets:"3", reps:"8 each", rest:"45s", note:"Stick the landing", yt:"Lateral Bound" },
        { name:"Tuck Jumps", sets:"3", reps:"8", rest:"45s", note:"Knees to chest", yt:"Tuck Jump" },
      ]},
      { name:"CARDIO + GLUTE BURN", time:"18 min", exercises:[
        { name:"Treadmill HIIT Sprints", sets:"8", reps:"20s on / 40s off", rest:"built-in", note:"Max effort", yt:"Treadmill Jog" },
        { name:"Heavy Rope Slams", sets:"3", reps:"30s", rest:"30s", note:"Full body waves", yt:"Battle Rope" },
        { name:"Cable Kickback", sets:"3", reps:"15 each", rest:"45s", note:"Squeeze glute at top", yt:"Cable Kickback" },
        { name:"Glute Bridge (Weighted)", sets:"3", reps:"15", rest:"45s", note:"Plate on hips", yt:"Glute Bridge" },
      ]},
    ],
  },
  {
    day:"D3", title:"IRON LEGS", subtitle:"Lower Body + Core + Glutes", focus:["Strength","Core","Glutes"], color:"#FF9F1C", icon:"🦵",
    blocks: [
      { name:"WARM-UP", time:"6 min", exercises:[
        { name:"Cycling (Moderate)", sets:"1", reps:"3 min", rest:"—", note:"Build resistance", yt:"Cycling" },
        { name:"Bodyweight Squats", sets:"2", reps:"15", rest:"—", note:"Full depth", yt:"Barbell Back Squat" },
      ]},
      { name:"STRENGTH — LOWER", time:"28 min", exercises:[
        { name:"Barbell Back Squat", sets:"5", reps:"5", rest:"2 min", note:"80-85% 1RM", yt:"Barbell Back Squat" },
        { name:"Romanian Deadlift", sets:"4", reps:"8", rest:"90s", note:"Stretch hamstrings", yt:"Romanian Deadlift" },
        { name:"Bulgarian Split Squat", sets:"3", reps:"10 each", rest:"60s", note:"Hold dumbbells", yt:"Bulgarian Split Squat" },
        { name:"Sumo Squat (Dumbbell)", sets:"3", reps:"12", rest:"60s", note:"Wide stance — glutes", yt:"Sumo Squat" },
        { name:"Calf Raises (Machine)", sets:"4", reps:"15", rest:"45s", note:"Pause at top 1s", yt:"Calf Raises" },
      ]},
      { name:"🍑 GLUTE ISOLATION", time:"10 min", exercises:[
        { name:"Barbell Hip Thrust", sets:"4", reps:"12", rest:"60s", note:"Primary glute builder", yt:"Hip Thrust" },
        { name:"Cable Kickback", sets:"3", reps:"12 each", rest:"45s", note:"Controlled tempo", yt:"Cable Kickback" },
        { name:"Dumbbell Step Ups (High)", sets:"3", reps:"10 each", rest:"45s", note:"Drive through heel", yt:"Step Up" },
      ]},
      { name:"CORE CIRCUIT", time:"10 min", exercises:[
        { name:"Ab Crunch Machine (Angle 2)", sets:"3", reps:"15", rest:"30s", note:"Slow negatives", yt:"Ab Crunch Machine" },
        { name:"Hanging Leg Raises", sets:"3", reps:"12", rest:"30s", note:"Control the swing", yt:"Hanging Leg Raise" },
        { name:"Russian Twists (Weighted)", sets:"3", reps:"20 total", rest:"30s", note:"Feet off ground", yt:"Russian Twist" },
        { name:"Plank Hold", sets:"3", reps:"45s", rest:"30s", note:"Squeeze glutes too", yt:"Plank" },
      ]},
    ],
  },
  {
    day:"D4", title:"WAR READY", subtitle:"Boxing + Ropes + Conditioning", focus:["Boxing","Cardio"], color:"#D62828", icon:"🔥",
    blocks: [
      { name:"WARM-UP", time:"6 min", exercises:[
        { name:"Treadmill Jog", sets:"1", reps:"3 min", rest:"—", note:"Loosen up", yt:"Treadmill Jog" },
        { name:"Shadow Boxing (All Combos)", sets:"2", reps:"90s", rest:"30s", note:"Add slips + rolls", yt:"Shadow Boxing" },
      ]},
      { name:"BOXING SKILL ROUNDS", time:"20 min", exercises:[
        { name:"Heavy Bag — 1-2-3-2", sets:"3", reps:"3 min", rest:"60s", note:"Jab-Cross-Hook-Cross", yt:"Heavy Bag" },
        { name:"Heavy Bag — Slip-Counter", sets:"3", reps:"2 min", rest:"60s", note:"Slip L, counter R", yt:"Heavy Bag" },
        { name:"Heavy Bag — Southpaw", sets:"2", reps:"2 min", rest:"60s", note:"Switch stance", yt:"Heavy Bag" },
        { name:"Heavy Bag — Burnout", sets:"1", reps:"3 min", rest:"—", note:"NONSTOP punching", yt:"Heavy Bag" },
      ]},
      { name:"HEAVY ROPE CONDITIONING", time:"12 min", exercises:[
        { name:"Alternating Waves", sets:"4", reps:"30s on/30s off", rest:"built-in", note:"High amplitude", yt:"Battle Rope" },
        { name:"Slam Waves", sets:"3", reps:"30s", rest:"30s", note:"Full overhead", yt:"Battle Rope" },
        { name:"Lateral Whips", sets:"3", reps:"30s", rest:"30s", note:"Side to side", yt:"Battle Rope" },
      ]},
      { name:"METABOLIC + GLUTE", time:"12 min", exercises:[
        { name:"Cycling — Tabata", sets:"8", reps:"20s max / 10s rest", rest:"built-in", note:"4 min total", yt:"Cycling" },
        { name:"Burpees", sets:"3", reps:"10", rest:"45s", note:"Chest to floor", yt:"Burpee" },
        { name:"Mountain Climbers", sets:"3", reps:"30s", rest:"30s", note:"Sprint pace", yt:"Mountain Climber" },
        { name:"Glute Bridge Hold (Iso)", sets:"3", reps:"30s", rest:"30s", note:"Squeeze at top", yt:"Glute Bridge" },
      ]},
    ],
  },
  {
    day:"D5", title:"FULL ARSENAL", subtitle:"Full Body + Agility + Glutes", focus:["Strength","Agility","Glutes"], color:"#7B2CBF", icon:"💪",
    blocks: [
      { name:"WARM-UP", time:"6 min", exercises:[
        { name:"Treadmill Incline Walk", sets:"1", reps:"3 min", rest:"—", note:"12-15% incline", yt:"Treadmill Jog" },
        { name:"Bodyweight Squats", sets:"2", reps:"15", rest:"—", note:"Dynamic warm-up", yt:"Barbell Back Squat" },
      ]},
      { name:"STRENGTH — FULL BODY", time:"25 min", exercises:[
        { name:"Deadlift (Conventional)", sets:"5", reps:"5", rest:"2 min", note:"Brace hard", yt:"Deadlift" },
        { name:"Incline Dumbbell Press", sets:"4", reps:"8-10", rest:"75s", note:"30° angle", yt:"Incline Dumbbell Press" },
        { name:"Barbell Front Squat", sets:"4", reps:"6-8", rest:"90s", note:"Upright torso", yt:"Barbell Front Squat" },
        { name:"Single Arm DB Row", sets:"3", reps:"10 each", rest:"60s", note:"Anti-rotation", yt:"Dumbbell Row" },
        { name:"Farmer's Walk", sets:"3", reps:"40m", rest:"60s", note:"Heaviest DBs", yt:"Farmers Walk" },
      ]},
      { name:"AGILITY + PLYO", time:"15 min", exercises:[
        { name:"Ladder — Ali Shuffle", sets:"4", reps:"2 lengths", rest:"30s", note:"Boxing footwork", yt:"Ladder Drill" },
        { name:"Cone — T-Drill", sets:"4", reps:"1 each", rest:"45s", note:"Sprint-shuffle-back", yt:"Lateral Bound" },
        { name:"Box Jumps", sets:"4", reps:"5", rest:"45s", note:"Explosive", yt:"Box Jump" },
        { name:"Tuck Jumps", sets:"3", reps:"8", rest:"45s", note:"Max height", yt:"Tuck Jump" },
      ]},
      { name:"🍑 GLUTE + CORE", time:"12 min", exercises:[
        { name:"Barbell Hip Thrust", sets:"4", reps:"12", rest:"60s", note:"Heavy squeeze 2s", yt:"Hip Thrust" },
        { name:"Ab Crunch Machine (Oblique)", sets:"3", reps:"12 each", rest:"30s", note:"Rotation for hooks", yt:"Ab Crunch Machine" },
        { name:"Side Plank", sets:"2", reps:"30s each", rest:"30s", note:"Hip stacked", yt:"Side Plank" },
        { name:"Cable Kickback", sets:"3", reps:"12 each", rest:"45s", note:"Full extension", yt:"Cable Kickback" },
      ]},
    ],
  },
  {
    day:"D6", title:"RECOVERY", subtitle:"Light Cardio + Mobility + Shadow", focus:["Recovery","Mobility"], color:"#2D6A4F", icon:"🧘",
    blocks: [
      { name:"LOW-INTENSITY CARDIO", time:"25 min", exercises:[
        { name:"Cycling (Easy Spin)", sets:"1", reps:"15 min", rest:"—", note:"HR 120-130", yt:"Cycling" },
        { name:"Treadmill Incline Walk", sets:"1", reps:"10 min", rest:"—", note:"12%, 5.5 km/h", yt:"Treadmill Jog" },
      ]},
      { name:"SHADOW BOXING", time:"10 min", exercises:[
        { name:"Footwork Only", sets:"2", reps:"2 min", rest:"30s", note:"Angles, pivots", yt:"Shadow Boxing" },
        { name:"Slow Motion Combos", sets:"2", reps:"2 min", rest:"30s", note:"Perfect form", yt:"Shadow Boxing" },
        { name:"Slip & Roll Drills", sets:"2", reps:"2 min", rest:"30s", note:"Head movement", yt:"Shadow Boxing" },
      ]},
      { name:"MOBILITY & STRETCH", time:"15 min", exercises:[
        { name:"Hip 90/90 Stretch", sets:"2", reps:"60s each", rest:"—", note:"Int + ext rotation", yt:"" },
        { name:"Pigeon Stretch", sets:"2", reps:"60s each", rest:"—", note:"Deep hip/glute opener", yt:"" },
        { name:"Foam Roll (Full Body)", sets:"1", reps:"5 min", rest:"—", note:"Quads, glutes, lats", yt:"Foam Roll" },
      ]},
    ],
  },
];

const FC = { Strength:"#E63946", Boxing:"#D62828", Agility:"#00B4D8", Plyo:"#0096C7", Cardio:"#FF9F1C", Core:"#FF9F1C", Conditioning:"#F77F00", Recovery:"#2D6A4F", Mobility:"#40916C", Glutes:"#E040FB" };
const QC = { great:"#2D6A4F", good:"#40916C", ok:"#FF9F1C", poor:"#E63946" };

export default function App() {
  const [tab, setTab] = useState("workout");
  const [day, setDay] = useState(0);
  const [exp, setExp] = useState({});
  const [done, setDone] = useState({});
  const [showVid, setShowVid] = useState(null);
  const [sleep, setSleep] = useState([
    { d:"Mon",bed:"23:00",wake:"06:30",h:7.5,q:"good" },
    { d:"Tue",bed:"23:30",wake:"06:30",h:7.0,q:"ok" },
    { d:"Wed",bed:"22:30",wake:"06:00",h:7.5,q:"great" },
    { d:"Thu",bed:"00:00",wake:"07:00",h:7.0,q:"ok" },
    { d:"Fri",bed:"23:00",wake:"06:30",h:7.5,q:"good" },
    { d:"Sat",bed:"00:30",wake:"08:00",h:7.5,q:"good" },
    { d:"Sun",bed:"22:00",wake:"06:00",h:8.0,q:"great" },
  ]);
  const [editIdx, setEditIdx] = useState(null);
  const [tBed, setTBed] = useState("");
  const [tWake, setTWake] = useState("");

  const cur = DAYS[day];
  const totEx = cur.blocks.reduce((a,b) => a + b.exercises.length, 0);
  const doneN = cur.blocks.reduce((a,bl,bi) => a + bl.exercises.filter((_,ei) => done[`${day}-${bi}-${ei}`]).length, 0);
  const avgS = (sleep.reduce((a,s) => a + s.h, 0) / sleep.length).toFixed(1);
  const calcH = (b,w) => { const [bh,bm]=b.split(":").map(Number); const [wh,wm]=w.split(":").map(Number); let d=(wh*60+wm)-(bh*60+bm); if(d<0)d+=1440; return Math.round(d/6)/10; };
  const saveS = (i) => { const h=calcH(tBed,tWake); const q=h>=7.5?"great":h>=7?"good":h>=6?"ok":"poor"; setSleep(p=>p.map((s,j)=>j===i?{...s,bed:tBed,wake:tWake,h,q}:s)); setEditIdx(null); };

  const M = { fontFamily:"'JetBrains Mono',monospace" };
  const B = { fontFamily:"'Barlow',sans-serif" };

  return (
    <div style={{ fontFamily:"'Oswald',sans-serif", background:"#08080C", color:"#F0F0F0", minHeight:"100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <div style={{ background:`linear-gradient(135deg,${cur.color}15,#08080C)`, borderBottom:`2px solid ${cur.color}30`, padding:"18px 16px 12px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ ...M, fontSize:"9px", letterSpacing:"3px", color:cur.color }}>6-DAY PROGRAM</div>
            <h1 style={{ fontSize:"32px", margin:0, letterSpacing:"1px", lineHeight:1, fontWeight:700 }}>FIGHT<span style={{color:cur.color}}>FIT</span></h1>
            <div style={{ ...B, fontSize:"11px", color:"#555", marginTop:"3px" }}>Boxing · Strength · Agility · Fat Loss</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ ...M, fontSize:"9px", color:"#444" }}>BW</div>
            <div style={{ fontSize:"26px", fontWeight:700, lineHeight:1 }}>83<span style={{fontSize:"12px",color:"#555"}}>kg</span></div>
            <div style={{ ...M, fontSize:"9px", color:cur.color, marginTop:"2px" }}>~24% BF</div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display:"flex", borderBottom:"1px solid #151518" }}>
        {[["workout","🏋️","TRAIN"],["stats","📊","STATS"],["sleep","🌙","SLEEP"]].map(([id,ic,lb]) => (
          <button key={id} onClick={()=>setTab(id)} style={{
            flex:1, padding:"10px 6px 8px", background:tab===id?`${cur.color}0D`:"transparent",
            border:"none", borderBottom:tab===id?`2px solid ${cur.color}`:"2px solid transparent",
            color:tab===id?cur.color:"#444", fontFamily:"'Oswald',sans-serif", fontSize:"11px", letterSpacing:"2px", cursor:"pointer",
          }}>{ic} {lb}</button>
        ))}
      </div>

      {/* ========== WORKOUT ========== */}
      {tab === "workout" && <>
        <div style={{ display:"flex", overflowX:"auto", borderBottom:"1px solid #151518", scrollbarWidth:"none" }}>
          {DAYS.map((d,i) => (
            <button key={i} onClick={()=>{setDay(i);setExp({});setShowVid(null);}} style={{
              flex:"1 0 auto", minWidth:"52px", padding:"10px 4px 8px", textAlign:"center",
              background:day===i?`${d.color}10`:"transparent", border:"none",
              borderBottom:day===i?`3px solid ${d.color}`:"3px solid transparent",
              color:day===i?d.color:"#444", fontFamily:"'Oswald',sans-serif", fontSize:"12px", cursor:"pointer",
            }}>
              <div style={{fontSize:"16px",marginBottom:"1px"}}>{d.icon}</div>
              <div style={{...M,fontSize:"8px",opacity:.5}}>{d.day}</div>
            </button>
          ))}
        </div>

        <div style={{ padding:"14px 14px 0" }}>
          <h2 style={{fontSize:"22px",margin:0,fontWeight:700}}>{cur.icon} {cur.title}</h2>
          <div style={{...B,fontSize:"12px",color:"#555",margin:"3px 0 8px"}}>{cur.subtitle}</div>
          <div style={{display:"flex",gap:"5px",flexWrap:"wrap",marginBottom:"10px"}}>
            {cur.focus.map(f=>(
              <span key={f} style={{...M,fontSize:"8px",letterSpacing:"1.5px",padding:"2px 7px",borderRadius:"3px",background:`${FC[f]||"#555"}15`,color:FC[f]||"#888",border:`1px solid ${FC[f]||"#555"}30`,textTransform:"uppercase"}}>{f}</span>
            ))}
          </div>
          <div style={{marginBottom:"14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",...M,fontSize:"9px",color:"#444",marginBottom:"4px"}}>
              <span>PROGRESS</span><span style={{color:cur.color}}>{doneN}/{totEx}</span>
            </div>
            <div style={{height:"3px",background:"#151518",borderRadius:"2px",overflow:"hidden"}}>
              <div style={{height:"100%",width:`${totEx>0?(doneN/totEx)*100:0}%`,background:cur.color,borderRadius:"2px",transition:"width .4s"}} />
            </div>
          </div>
        </div>

        <div style={{ padding:"0 14px 24px" }}>
          {cur.blocks.map((bl,bi) => {
            const isE = exp[bi] !== false;
            const bD = bl.exercises.filter((_,ei)=>done[`${day}-${bi}-${ei}`]).length;
            return (
              <div key={bi} style={{marginBottom:"8px",background:"#0E0E12",borderRadius:"8px",border:"1px solid #18181E",overflow:"hidden"}}>
                <button onClick={()=>setExp(p=>({...p,[bi]:!p[bi]}))} style={{
                  width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"11px 12px",background:"transparent",border:"none",cursor:"pointer",color:"#F0F0F0",
                }}>
                  <div style={{display:"flex",alignItems:"center",gap:"9px"}}>
                    <div style={{width:"3px",height:"22px",background:cur.color,borderRadius:"2px"}} />
                    <div style={{textAlign:"left"}}>
                      <div style={{fontSize:"13px",fontWeight:600,letterSpacing:"1px"}}>{bl.name}</div>
                      <div style={{...M,fontSize:"8px",color:"#444",marginTop:"1px"}}>{bl.time} · {bl.exercises.length} exercises</div>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:"7px"}}>
                    {bD>0&&<span style={{...M,fontSize:"9px",color:cur.color}}>{bD}/{bl.exercises.length}</span>}
                    <span style={{fontSize:"11px",color:"#444",transform:isE?"rotate(180deg)":"rotate(0)",transition:"transform .2s",display:"inline-block"}}>▼</span>
                  </div>
                </button>
                {isE && <div style={{padding:"0 12px 10px"}}>
                  {bl.exercises.map((ex,ei) => {
                    const k=`${day}-${bi}-${ei}`;
                    const d2=done[k];
                    const thumb = getThumb(ex.yt);
                    const link = ex.yt ? getYtLink(ex.yt) : ytSearch(ex.name);
                    return (
                      <div key={ei} style={{borderTop:ei>0?"1px solid #18181E":"none",padding:"9px 0",opacity:d2?.4:1,transition:"opacity .2s"}}>
                        <div style={{display:"flex",alignItems:"flex-start",gap:"9px"}}>
                          <div onClick={()=>setDone(p=>({...p,[k]:!p[k]}))} style={{
                            width:"18px",height:"18px",borderRadius:"3px",flexShrink:0,marginTop:"1px",cursor:"pointer",
                            border:`2px solid ${d2?cur.color:"#2A2A30"}`,background:d2?cur.color:"transparent",
                            display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",
                          }}>{d2&&<span style={{color:"#FFF",fontSize:"10px",fontWeight:"bold"}}>✓</span>}</div>
                          <div style={{flex:1}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                              <div style={{...B,fontSize:"13px",fontWeight:600,color:d2?"#555":"#DDD",textDecoration:d2?"line-through":"none"}}>{ex.name}</div>
                              {thumb && <button onClick={()=>setShowVid(showVid===k?null:k)} style={{
                                background:`${cur.color}12`,border:`1px solid ${cur.color}30`,borderRadius:"4px",
                                color:cur.color,...M,fontSize:"8px",padding:"2px 7px",cursor:"pointer",letterSpacing:"1px",
                              }}>{showVid===k?"HIDE":"▶ HOW"}</button>}
                            </div>
                            <div style={{display:"flex",gap:"6px",alignItems:"center",flexWrap:"wrap",marginTop:"3px"}}>
                              <span style={{...M,fontSize:"9px",color:cur.color,background:`${cur.color}10`,padding:"1px 5px",borderRadius:"3px"}}>{ex.sets}×{ex.reps}</span>
                              <span style={{...M,fontSize:"9px",color:"#444"}}>Rest:{ex.rest}</span>
                              {ex.note&&<span style={{...B,fontSize:"10px",color:"#444",fontStyle:"italic"}}>{ex.note}</span>}
                            </div>
                            {showVid===k&&thumb&&(
                              <a href={link} target="_blank" rel="noopener noreferrer" style={{display:"block",marginTop:"7px",textDecoration:"none"}}>
                                <div style={{position:"relative",borderRadius:"6px",overflow:"hidden",border:`1px solid ${cur.color}30`}}>
                                  <img src={thumb} alt={ex.name} style={{width:"100%",display:"block",borderRadius:"6px"}} />
                                  <div style={{
                                    position:"absolute",top:0,left:0,right:0,bottom:0,
                                    display:"flex",alignItems:"center",justifyContent:"center",
                                    background:"rgba(0,0,0,0.4)",
                                  }}>
                                    <div style={{
                                      width:"48px",height:"48px",borderRadius:"50%",
                                      background:"rgba(255,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",
                                    }}>
                                      <div style={{width:0,height:0,borderTop:"10px solid transparent",borderBottom:"10px solid transparent",borderLeft:"18px solid #FFF",marginLeft:"3px"}} />
                                    </div>
                                  </div>
                                  <div style={{
                                    position:"absolute",bottom:"6px",left:"8px",
                                    ...M,fontSize:"9px",color:"#FFF",background:"rgba(0,0,0,0.7)",
                                    padding:"2px 8px",borderRadius:"3px",letterSpacing:"0.5px",
                                  }}>
                                    Tap to watch form tutorial
                                  </div>
                                </div>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>}
              </div>
            );
          })}
        </div>
      </>}

      {/* ========== STATS ========== */}
      {tab === "stats" && <div style={{padding:"16px 14px"}}>
        <h2 style={{fontSize:"20px",margin:"0 0 14px",fontWeight:700}}>📊 BODY ANALYSIS</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"16px"}}>
          {[{l:"WEIGHT",v:"83",u:"kg",c:"#E63946"},{l:"BODY FAT",v:"~24",u:"%",c:"#FF9F1C"},{l:"TARGET BF",v:"15",u:"%",c:"#2D6A4F"},{l:"FAT LOSS",v:"~7.5",u:"kg",c:"#00B4D8"}].map(s=>(
            <div key={s.l} style={{background:"#0E0E12",borderRadius:"8px",border:"1px solid #18181E",padding:"12px",textAlign:"center"}}>
              <div style={{...M,fontSize:"8px",letterSpacing:"1.5px",color:"#444",marginBottom:"4px"}}>{s.l}</div>
              <div style={{fontSize:"28px",fontWeight:700,color:s.c,lineHeight:1}}>{s.v}<span style={{fontSize:"12px",color:"#555"}}>{s.u}</span></div>
            </div>
          ))}
        </div>

        <div style={{background:"#0E0E12",borderRadius:"8px",border:"1px solid #18181E",padding:"14px",marginBottom:"12px"}}>
          <div style={{fontSize:"13px",fontWeight:600,letterSpacing:"1px",marginBottom:"8px"}}>🎯 PRIORITY ZONES</div>
          {[{a:"Belly & Love Handles",p:"HIGH",c:"#E63946"},{a:"Glutes / Butt Fat",p:"HIGH",c:"#E040FB"},{a:"Lower Chest",p:"MED",c:"#FF9F1C"},{a:"Muscle Definition",p:"GOAL",c:"#00B4D8"}].map(z=>(
            <div key={z.a} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderTop:"1px solid #18181E"}}>
              <span style={{...B,fontSize:"12px",color:"#AAA"}}>{z.a}</span>
              <span style={{...M,fontSize:"8px",letterSpacing:"1px",padding:"2px 7px",borderRadius:"3px",background:`${z.c}15`,color:z.c,border:`1px solid ${z.c}30`}}>{z.p}</span>
            </div>
          ))}
        </div>

        <div style={{background:"#0E0E12",borderRadius:"8px",border:"1px solid #18181E",padding:"14px",marginBottom:"12px"}}>
          <div style={{fontSize:"13px",fontWeight:600,letterSpacing:"1px",marginBottom:"8px"}}>📐 WEEKLY VOLUME</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"6px"}}>
            {[{l:"STRENGTH",v:"3x",c:"#E63946"},{l:"BOXING",v:"3x",c:"#D62828"},{l:"AGILITY",v:"2x",c:"#00B4D8"},{l:"PLYO",v:"2x",c:"#0096C7"},{l:"GLUTES",v:"4x",c:"#E040FB"},{l:"RECOVERY",v:"1x",c:"#2D6A4F"}].map(s=>(
              <div key={s.l} style={{background:`${s.c}08`,border:`1px solid ${s.c}18`,borderRadius:"6px",padding:"8px",textAlign:"center"}}>
                <div style={{fontSize:"18px",fontWeight:700,color:s.c}}>{s.v}</div>
                <div style={{...M,fontSize:"7px",letterSpacing:"1px",color:"#444"}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:"#0E0E12",borderRadius:"8px",border:"1px solid #18181E",padding:"14px"}}>
          <div style={{fontSize:"13px",fontWeight:600,letterSpacing:"1px",marginBottom:"6px"}}>🍽️ DAILY NUTRITION</div>
          <div style={{...B,fontSize:"11px",color:"#666",lineHeight:1.8}}>
            {[["Calories","1800-2000 kcal","#FF9F1C"],["Protein","135-165g","#E63946"],["Carbs","180-220g","#00B4D8"],["Fats","50-65g","#2D6A4F"],["Water","3.5-4L","#0096C7"]].map(([n,v,c])=>(
              <div key={n} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:"1px solid #18181E"}}>
                <span>{n}</span><span style={{color:c,...M,fontSize:"10px"}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>}

      {/* ========== SLEEP ========== */}
      {tab === "sleep" && <div style={{padding:"16px 14px"}}>
        <h2 style={{fontSize:"20px",margin:"0 0 3px",fontWeight:700}}>🌙 SLEEP TRACKER</h2>
        <div style={{...B,fontSize:"11px",color:"#444",marginBottom:"14px"}}>7-8h critical for recovery & fat loss</div>

        <div style={{background:"linear-gradient(135deg,#7B2CBF10,#08080C)",borderRadius:"8px",border:"1px solid #7B2CBF30",padding:"14px",textAlign:"center",marginBottom:"14px"}}>
          <div style={{...M,fontSize:"8px",letterSpacing:"2px",color:"#7B2CBF"}}>WEEKLY AVG</div>
          <div style={{fontSize:"40px",fontWeight:700,color:Number(avgS)>=7?"#2D6A4F":"#FF9F1C",lineHeight:1}}>{avgS}<span style={{fontSize:"14px",color:"#555"}}>hrs</span></div>
          <div style={{...M,fontSize:"9px",color:Number(avgS)>=7.5?"#40916C":Number(avgS)>=7?"#FF9F1C":"#E63946",marginTop:"3px"}}>
            {Number(avgS)>=7.5?"✓ ON TARGET":Number(avgS)>=7?"⚠ BORDERLINE":"✗ IMPROVE"}
          </div>
        </div>

        {sleep.map((s,i)=>(
          <div key={i} style={{background:"#0E0E12",borderRadius:"8px",border:"1px solid #18181E",padding:"10px 12px",marginBottom:"6px"}}>
            {editIdx===i ? (
              <div>
                <div style={{...B,fontSize:"13px",fontWeight:600,marginBottom:"6px"}}>{s.d}</div>
                <div style={{display:"flex",gap:"6px",marginBottom:"6px"}}>
                  <div style={{flex:1}}>
                    <div style={{...M,fontSize:"8px",color:"#444",marginBottom:"2px"}}>BED</div>
                    <input type="time" value={tBed} onChange={e=>setTBed(e.target.value)} style={{width:"100%",background:"#18181E",border:"1px solid #2A2A30",borderRadius:"4px",color:"#FFF",padding:"5px 6px",...M,fontSize:"11px"}} />
                  </div>
                  <div style={{flex:1}}>
                    <div style={{...M,fontSize:"8px",color:"#444",marginBottom:"2px"}}>WAKE</div>
                    <input type="time" value={tWake} onChange={e=>setTWake(e.target.value)} style={{width:"100%",background:"#18181E",border:"1px solid #2A2A30",borderRadius:"4px",color:"#FFF",padding:"5px 6px",...M,fontSize:"11px"}} />
                  </div>
                </div>
                <div style={{display:"flex",gap:"6px"}}>
                  <button onClick={()=>saveS(i)} style={{flex:1,background:"#2D6A4F",border:"none",borderRadius:"4px",color:"#FFF",padding:"7px",cursor:"pointer",fontFamily:"'Oswald',sans-serif",fontSize:"11px",letterSpacing:"1px"}}>SAVE</button>
                  <button onClick={()=>setEditIdx(null)} style={{flex:1,background:"#2A2A30",border:"none",borderRadius:"4px",color:"#888",padding:"7px",cursor:"pointer",fontFamily:"'Oswald',sans-serif",fontSize:"11px",letterSpacing:"1px"}}>CANCEL</button>
                </div>
              </div>
            ) : (
              <div onClick={()=>{setEditIdx(i);setTBed(s.bed);setTWake(s.wake);}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                <div>
                  <div style={{...B,fontSize:"13px",fontWeight:600,color:"#CCC"}}>{s.d}</div>
                  <div style={{...M,fontSize:"9px",color:"#444",marginTop:"1px"}}>{s.bed} → {s.wake}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:"20px",fontWeight:700,color:QC[s.q],lineHeight:1}}>{s.h}<span style={{fontSize:"10px",color:"#555"}}>h</span></div>
                  <div style={{...M,fontSize:"7px",letterSpacing:"1px",color:QC[s.q],textTransform:"uppercase",marginTop:"1px"}}>{s.q}</div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div style={{background:"#0E0E12",borderRadius:"8px",border:"1px solid #18181E",padding:"14px",marginTop:"10px"}}>
          <div style={{fontSize:"12px",fontWeight:600,letterSpacing:"1px",marginBottom:"10px"}}>WEEKLY VIEW</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:"5px",height:"90px"}}>
            {sleep.map((s,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"3px"}}>
                <div style={{...M,fontSize:"8px",color:QC[s.q]}}>{s.h}</div>
                <div style={{width:"100%",borderRadius:"3px 3px 0 0",height:`${(s.h/10)*90}px`,background:`linear-gradient(180deg,${QC[s.q]},${QC[s.q]}44)`,transition:"height .3s"}} />
                <div style={{...M,fontSize:"8px",color:"#444"}}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:"#0E0E12",borderRadius:"8px",border:"1px solid #18181E",padding:"12px",marginTop:"10px"}}>
          <div style={{fontSize:"11px",fontWeight:600,letterSpacing:"1px",marginBottom:"4px"}}>⏰ RECOMMENDED</div>
          <div style={{...B,fontSize:"11px",color:"#555",lineHeight:1.7}}>
            Bed by 22:30 · Wake at 06:00 · No screens 30min before bed · Room 18-20°C · No caffeine after 2 PM
          </div>
        </div>
      </div>}

      <div style={{padding:"10px 14px 28px",borderTop:"1px solid #151518",background:"#06060A"}}>
        <div style={{...B,fontSize:"10px",color:"#2A2A30",textAlign:"center"}}>Day 7 = Full Rest · Built for Tharun · 83kg → Definition</div>
      </div>
    </div>
  );
}
