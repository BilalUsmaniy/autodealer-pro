import { useState, useMemo, useRef, useEffect } from "react";

/* ═══════════════════ COMPREHENSIVE MAKE/MODEL DATABASE ═══════════════════ */
const VEHICLE_DB = {
  "Acura": ["ILX","Integra","MDX","RDX","TLX","NSX"],
  "Alfa Romeo": ["Giulia","Stelvio","Tonale","4C Spider"],
  "Aston Martin": ["DB11","DB12","DBX","Vantage","DBS Superleggera","Valkyrie"],
  "Audi": ["A3","A4","A5","A6","A7","A8","Q3","Q5","Q7","Q8","e-tron GT","RS3","RS5","RS6 Avant","RS7","RS e-tron GT","R8","TT","S4","S5","S6","S7","S8","SQ5","SQ7","SQ8"],
  "Bentley": ["Bentayga","Continental GT","Flying Spur"],
  "BMW": ["2 Series","3 Series","4 Series","5 Series","7 Series","8 Series","i4","i5","i7","iX","X1","X2","X3","X4","X5","X6","X7","XM","Z4","M2","M3","M4","M5","M8","X3 M","X4 M","X5 M","X6 M"],
  "Buick": ["Enclave","Encore","Encore GX","Envista","Envision"],
  "Cadillac": ["CT4","CT5","Escalade","Escalade-V","LYRIQ","XT4","XT5","XT6","V-Series"],
  "Chevrolet": ["Blazer","Bolt EV","Bolt EUV","Camaro","Colorado","Corvette","Equinox","Malibu","Silverado 1500","Silverado 2500HD","Silverado 3500HD","Suburban","Tahoe","Trailblazer","Traverse","Trax"],
  "Chrysler": ["300","Pacifica","Pacifica Hybrid"],
  "Dodge": ["Challenger","Charger","Durango","Hornet"],
  "Ferrari": ["296 GTB","296 GTS","812 Competizione","F8 Tributo","Roma","SF90 Stradale","SF90 Spider","Purosangue","Daytona SP3"],
  "Fiat": ["500X","500e"],
  "Ford": ["Bronco","Bronco Sport","Edge","Escape","Expedition","Explorer","F-150","F-150 Lightning","F-250","F-350","Maverick","Mustang","Mustang Mach-E","Ranger","Transit"],
  "Genesis": ["G70","G80","G90","GV60","GV70","GV80"],
  "GMC": ["Acadia","Canyon","Hummer EV","Sierra 1500","Sierra 2500HD","Sierra 3500HD","Terrain","Yukon","Yukon XL"],
  "Honda": ["Accord","Civic","CR-V","HR-V","Odyssey","Passport","Pilot","Prologue","Ridgeline"],
  "Hyundai": ["Elantra","IONIQ 5","IONIQ 6","Kona","Palisade","Santa Cruz","Santa Fe","Sonata","Tucson","Venue"],
  "Infiniti": ["Q50","Q60","QX50","QX55","QX60","QX80"],
  "Jaguar": ["E-PACE","F-PACE","F-TYPE","I-PACE","XF"],
  "Jeep": ["Cherokee","Compass","Gladiator","Grand Cherokee","Grand Cherokee 4xe","Grand Wagoneer","Renegade","Wagoneer","Wrangler","Wrangler 4xe"],
  "Kia": ["Carnival","EV6","EV9","Forte","K5","Niro","Rio","Seltos","Sorento","Soul","Sportage","Stinger","Telluride"],
  "Lamborghini": ["Huracán EVO","Huracán STO","Huracán Tecnica","Revuelto","Urus","Urus S"],
  "Land Rover": ["Defender","Discovery","Discovery Sport","Range Rover","Range Rover Evoque","Range Rover Sport","Range Rover Velar"],
  "Lexus": ["ES","GX","IS","IS 500","LC","LS","LX","NX","RC","RC F","RX","RZ","TX","UX"],
  "Lincoln": ["Aviator","Corsair","Nautilus","Navigator"],
  "Lotus": ["Eletre","Emira","Evija"],
  "Lucid": ["Air","Air Grand Touring","Air Pure","Air Touring"],
  "Maserati": ["Ghibli","GranTurismo","Grecale","Levante","MC20","MC20 Cielo","Quattroporte"],
  "Mazda": ["CX-30","CX-5","CX-50","CX-70","CX-90","Mazda3","MX-5 Miata","MX-30"],
  "McLaren": ["720S","750S","765LT","Artura","GT"],
  "Mercedes-Benz": ["A-Class","AMG GT","C-Class","CLA","CLE","CLS","E-Class","EQB","EQE","EQS","G-Class","GLA","GLB","GLC","GLE","GLS","Maybach S-Class","Maybach GLS","S-Class","SL","AMG GT 63","AMG C 63","AMG E 63"],
  "Mini": ["Clubman","Cooper","Countryman","Hardtop"],
  "Mitsubishi": ["Eclipse Cross","Mirage","Outlander","Outlander PHEV"],
  "Nissan": ["Altima","Ariya","Frontier","KICKS","Leaf","Maxima","Murano","Pathfinder","Rogue","Sentra","Titan","Versa","Z"],
  "Polestar": ["Polestar 2","Polestar 3"],
  "Porsche": ["718 Boxster","718 Cayman","911","911 Turbo","911 Turbo S","911 GT3","911 GT3 RS","Cayenne","Cayenne GTS","Cayenne Turbo GT","Macan","Panamera","Panamera GTS","Taycan","Taycan 4S","Taycan Turbo S"],
  "Ram": ["1500","2500","3500","ProMaster"],
  "Rivian": ["R1S","R1T"],
  "Rolls-Royce": ["Cullinan","Ghost","Phantom","Spectre","Wraith"],
  "Subaru": ["Ascent","BRZ","Crosstrek","Forester","Impreza","Legacy","Outback","Solterra","WRX"],
  "Tesla": ["Model 3","Model S","Model S Plaid","Model X","Model Y","Cybertruck"],
  "Toyota": ["4Runner","bZ4X","Camry","Corolla","Corolla Cross","Crown","GR86","GR Corolla","GR Supra","Grand Highlander","Highlander","Land Cruiser","Mirai","Prius","Prius Prime","RAV4","RAV4 Prime","Sequoia","Sienna","Tacoma","Tundra","Venza"],
  "Volkswagen": ["Arteon","Atlas","Atlas Cross Sport","Golf","Golf GTI","Golf R","ID.4","ID.Buzz","Jetta","Jetta GLI","Taos","Tiguan"],
  "Volvo": ["C40 Recharge","S60","S90","V60","V90","XC40","XC40 Recharge","XC60","XC90"],
};

const ALL_MAKES = Object.keys(VEHICLE_DB).sort();

/* ═══════════════════ STANDARD COLORS ═══════════════════ */
const STANDARD_COLORS = [
  "Black","White","Silver","Gray","Red","Blue","Navy Blue","Dark Blue",
  "Green","Dark Green","Brown","Beige","Gold","Yellow","Orange",
  "Purple","Burgundy","Maroon","Champagne","Pearl White","Metallic Silver",
  "Metallic Gray","Metallic Blue","Metallic Red","Metallic Green","Metallic Black",
  "Matte Black","Matte Gray","Matte White","Charcoal","Ivory","Tan",
  "Bronze","Copper","Midnight Blue","Oxford White","Magnetic Gray",
  "Lunar Silver","Obsidian Black","Alpine White","Glacier White","Sapphire Blue",
  "Ruby Red","Emerald Green","Platinum","Titanium","Gunmetal","Ice Blue",
  "Desert Sand","Forest Green","Steel Blue","Wine Red","Cream"
];

const STATUSES = ["In Stock", "Sold", "Reserved", "In Service"];
const LOCATIONS = ["Milltown", "Elizabeth"];
const YEARS = Array.from({length:30}, (_, i) => String(2025 - i));
const FUEL_TYPES = ["Gasoline", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"];
const TRANSMISSIONS = ["Automatic", "Manual", "CVT", "Dual-Clutch"];

/* ═══════════════════ THEME ═══════════════════ */
const dark = {
  bg:"#07070a",sf:"#0e0e13",sf2:"#131318",card:"#101015",cardH:"#17171e",
  bdr:"#1d1d26",bdr2:"#282832",tx:"#ededf0",tx2:"#888894",tx3:"#50505c",
  acc:"#5b8def",accD:"rgba(91,141,239,0.1)",accG:"rgba(91,141,239,0.22)",
  grn:"#34d399",grnD:"rgba(52,211,153,0.1)",red:"#f87171",redD:"rgba(248,113,113,0.1)",
  amb:"#fbbf24",ambD:"rgba(251,191,36,0.1)",pur:"#a78bfa",purD:"rgba(167,139,250,0.1)",
  cyn:"#22d3ee",cynD:"rgba(34,211,238,0.1)",inp:"#0b0b10",ov:"rgba(0,0,0,0.75)",
  sellGrn:"#10b981",sellGrnD:"rgba(16,185,129,0.12)",
};
const t = dark;

/* ═══════════════════ ICONS ═══════════════════ */
const IC = {
  search:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  plus:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  x:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  eye:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  edit:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  dl:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  aUp:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  aDn:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  chL:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>,
  chR:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>,
  car:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17v1a1 1 0 001 1h1a1 1 0 001-1v-1m10 0v1a1 1 0 001 1h1a1 1 0 001-1v-1"/><circle cx="7.5" cy="14" r="1.5"/><circle cx="16.5" cy="14" r="1.5"/></svg>,
  img:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  upload:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  dollar:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  sell:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  check:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  reset:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>,
  filter:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  receipt:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2z"/><path d="M8 10h8M8 14h4"/></svg>,
  clock:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};

/* ═══════════════════ HELPERS ═══════════════════ */
const fmt = n => "$" + n.toLocaleString();
const fK = n => n >= 1e6 ? "$" + (n/1e6).toFixed(2) + "M" : n >= 1e3 ? "$" + (n/1e3).toFixed(1) + "K" : "$" + n;
const genVIN = () => { const c = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789"; return Array.from({length:17}, () => c[Math.floor(Math.random()*c.length)]).join(""); };

const stCfg = {
  "In Stock": {c: t.grn, bg: t.grnD},
  "Sold": {c: t.acc, bg: t.accD},
  "Reserved": {c: t.amb, bg: t.ambD},
  "In Service": {c: t.pur, bg: t.purD},
};

/* ═══════════════════ GENERATE SAMPLE DATA ═══════════════════ */
const genSampleCars = () => {
  const samples = [
    {make:"BMW",model:"M4",year:2024,color:"Alpine White",price:84995,cost:72400,status:"In Stock",loc:"Milltown",miles:1200,fuel:"Gasoline",trans:"Automatic",engine:"3.0L I6 Twin-Turbo"},
    {make:"Mercedes-Benz",model:"AMG GT 63",year:2024,color:"Obsidian Black",price:137995,cost:119200,status:"Reserved",loc:"Elizabeth",miles:850,fuel:"Gasoline",trans:"Automatic",engine:"4.0L V8 Bi-Turbo"},
    {make:"Porsche",model:"911 Turbo S",year:2023,color:"Red",price:228500,cost:198000,status:"In Stock",loc:"Milltown",miles:3200,fuel:"Gasoline",trans:"Dual-Clutch",engine:"3.7L Flat-6 Twin-Turbo"},
    {make:"Tesla",model:"Model S Plaid",year:2024,color:"Pearl White",price:108990,cost:94500,status:"Sold",loc:"Elizabeth",miles:100,fuel:"Electric",trans:"Automatic",engine:"Tri Motor Electric"},
    {make:"Audi",model:"RS e-tron GT",year:2024,color:"Metallic Gray",price:152400,cost:131800,status:"In Stock",loc:"Milltown",miles:4500,fuel:"Electric",trans:"Automatic",engine:"Dual Motor Electric"},
    {make:"Lamborghini",model:"Huracán EVO",year:2023,color:"Yellow",price:268000,cost:232000,status:"In Stock",loc:"Elizabeth",miles:2800,fuel:"Gasoline",trans:"Dual-Clutch",engine:"5.2L V10"},
    {make:"Land Rover",model:"Range Rover Sport",year:2024,color:"Green",price:115995,cost:99800,status:"In Service",loc:"Milltown",miles:8200,fuel:"Gasoline",trans:"Automatic",engine:"4.4L V8 Twin-Turbo"},
    {make:"Ferrari",model:"296 GTB",year:2024,color:"Red",price:352000,cost:310000,status:"In Stock",loc:"Elizabeth",miles:650,fuel:"Hybrid",trans:"Dual-Clutch",engine:"3.0L V6 Hybrid"},
    {make:"Toyota",model:"GR Supra",year:2024,color:"Blue",price:58250,cost:49800,status:"In Stock",loc:"Milltown",miles:3400,fuel:"Gasoline",trans:"Manual",engine:"3.0L I6 Turbo"},
    {make:"Chevrolet",model:"Corvette",year:2024,color:"Orange",price:72995,cost:62000,status:"Reserved",loc:"Elizabeth",miles:1100,fuel:"Gasoline",trans:"Dual-Clutch",engine:"6.2L V8"},
    {make:"Rolls-Royce",model:"Ghost",year:2023,color:"Black",price:345000,cost:298000,status:"In Stock",loc:"Milltown",miles:5600,fuel:"Gasoline",trans:"Automatic",engine:"6.75L V12 Twin-Turbo"},
    {make:"McLaren",model:"750S",year:2024,color:"Silver",price:299000,cost:260000,status:"In Stock",loc:"Elizabeth",miles:420,fuel:"Gasoline",trans:"Dual-Clutch",engine:"4.0L V8 Twin-Turbo"},
  ];
  return samples.map((s, i) => ({
    id: Date.now() - (samples.length - i) * 100000,
    year: s.year, make: s.make, model: s.model, vin: genVIN(), color: s.color,
    price: s.price, cost: s.cost, status: s.status, location: s.loc,
    days: s.status === "Sold" ? 0 : Math.floor(Math.random() * 50),
    mileage: s.miles, fuel: s.fuel, transmission: s.trans, engine: s.engine,
    imageData: null,
    expenses: [],
    soldInfo: s.status === "Sold" ? { date: "Mar 1, 2026", buyer: "James Mitchell", salePrice: s.price } : null,
    addedAt: Date.now() - (samples.length - i) * 100000,
  }));
};

/* ═══════════════════ COMPONENTS ═══════════════════ */
function Badge({status}) {
  const cfg = stCfg[status] || {c: t.tx2, bg: "rgba(255,255,255,0.05)"};
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:20,background:cfg.bg,color:cfg.c,fontSize:11,fontWeight:500,whiteSpace:"nowrap"}}>
      <span style={{width:5,height:5,borderRadius:"50%",background:cfg.c}}/>{status}
    </span>
  );
}

function Btn({children, v="default", onClick, s={}, disabled}) {
  const base = {border:"none",borderRadius:9,cursor:disabled?"default":"pointer",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:500,display:"inline-flex",alignItems:"center",gap:5,transition:"all 0.15s",opacity:disabled?0.5:1,...s};
  const vs = {
    primary:{...base,background:`linear-gradient(135deg,${t.acc},#818cf8)`,color:"#fff",padding:"8px 16px"},
    default:{...base,background:t.sf2,border:`1px solid ${t.bdr}`,color:t.tx2,padding:"7px 13px"},
    danger:{...base,background:t.redD,color:t.red,padding:"7px 13px"},
    sell:{...base,background:t.sellGrnD,color:t.sellGrn,padding:"7px 13px",border:`1px solid rgba(16,185,129,0.2)`},
    ghost:{...base,background:"transparent",color:t.tx3,padding:"7px 10px"},
  };
  return <button onClick={onClick} disabled={disabled} style={vs[v]||vs.default}>{children}</button>;
}

function Modal({open, onClose, title, children, w=580}) {
  if (!open) return null;
  return (
    <div style={{position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:t.ov,backdropFilter:"blur(6px)"}}/>
      <div onClick={e=>e.stopPropagation()} style={{position:"relative",background:t.sf,border:`1px solid ${t.bdr}`,borderRadius:16,width:w,maxWidth:"95vw",maxHeight:"88vh",overflow:"auto",padding:"22px 26px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <h3 style={{fontSize:15,fontWeight:600,margin:0,color:t.tx}}>{title}</h3>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex"}}>{IC.x}</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Inp({label, value, onChange, ph, type="text", s={}}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:4,...s}}>
      {label && <label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={ph}
        style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none",transition:"border 0.15s"}}
        onFocus={e=>e.target.style.borderColor=t.acc} onBlur={e=>e.target.style.borderColor=t.bdr}
      />
    </div>
  );
}

function Sel({label, value, onChange, opts, s={}, searchable}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const filtered = searchable && q ? opts.filter(o => o.toLowerCase().includes(q.toLowerCase())) : opts;

  useEffect(() => {
    if (!open) return;
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (!searchable) {
    return (
      <div style={{display:"flex",flexDirection:"column",gap:4,...s}}>
        {label && <label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}
        <select value={value} onChange={e=>onChange(e.target.value)}
          style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none",appearance:"auto"}}>
          {opts.map(o=><option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:4,position:"relative",...s}} ref={ref}>
      {label && <label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}
      <div onClick={()=>setOpen(!open)} style={{background:t.inp,border:`1px solid ${open?t.acc:t.bdr}`,borderRadius:8,padding:"8px 11px",color:t.tx,fontSize:12.5,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"border 0.15s"}}>
        <span>{value || "Select..."}</span>
        <span style={{color:t.tx3,fontSize:10}}>{open?"▲":"▼"}</span>
      </div>
      {open && (
        <div style={{position:"absolute",top:"100%",left:0,right:0,zIndex:100,marginTop:4,background:t.sf,border:`1px solid ${t.bdr}`,borderRadius:10,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.4)"}}>
          <div style={{padding:"6px 8px",borderBottom:`1px solid ${t.bdr}`}}>
            <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Type to search..."
              style={{width:"100%",background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:6,padding:"6px 9px",color:t.tx,fontSize:12,fontFamily:"inherit",outline:"none"}}/>
          </div>
          <div style={{maxHeight:200,overflow:"auto"}}>
            {filtered.length === 0 && <div style={{padding:"10px 12px",fontSize:12,color:t.tx3}}>No results</div>}
            {filtered.map(o => (
              <div key={o} onClick={()=>{onChange(o);setOpen(false);setQ("")}}
                style={{padding:"7px 12px",fontSize:12,color:value===o?t.acc:t.tx,background:value===o?t.accD:"transparent",cursor:"pointer",transition:"background 0.1s"}}
                onMouseEnter={e=>e.target.style.background=t.cardH} onMouseLeave={e=>e.target.style.background=value===o?t.accD:"transparent"}>
                {o}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ImageUpload({imageData, onUpload, onRemove}) {
  const fileRef = useRef(null);
  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onUpload(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:4}}>
      <label style={{fontSize:11,fontWeight:500,color:t.tx2}}>Vehicle Photo</label>
      {imageData ? (
        <div style={{position:"relative",borderRadius:10,overflow:"hidden",border:`1px solid ${t.bdr}`}}>
          <img src={imageData} alt="Vehicle" style={{width:"100%",height:140,objectFit:"cover",display:"block"}}/>
          <button onClick={onRemove} style={{position:"absolute",top:6,right:6,background:"rgba(0,0,0,0.7)",border:"none",borderRadius:"50%",width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}>{IC.x}</button>
        </div>
      ) : (
        <div onClick={()=>fileRef.current?.click()} style={{height:100,borderRadius:10,border:`2px dashed ${t.bdr}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,cursor:"pointer",transition:"border 0.2s",color:t.tx3}}
          onMouseEnter={e=>e.currentTarget.style.borderColor=t.acc} onMouseLeave={e=>e.currentTarget.style.borderColor=t.bdr}>
          {IC.upload}
          <span style={{fontSize:11}}>Click to upload photo</span>
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{display:"none"}}/>
    </div>
  );
}

function ExpenseManager({expenses, onAdd, onRemove}) {
  const [showForm, setShowForm] = useState(false);
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState("");
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const handleAdd = () => {
    if (!desc || !cost) return;
    onAdd({id: Date.now(), description: desc, amount: parseFloat(cost) || 0, date: new Date().toLocaleDateString("en-US", {month:"short",day:"numeric",year:"numeric"})});
    setDesc(""); setCost(""); setShowForm(false);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <label style={{fontSize:11,fontWeight:500,color:t.tx2}}>Expenses {expenses.length > 0 && <span style={{color:t.red}}>({fmt(total)} total)</span>}</label>
        {!showForm && <button onClick={()=>setShowForm(true)} style={{background:"none",border:"none",cursor:"pointer",color:t.acc,fontSize:11,fontWeight:500,fontFamily:"inherit",display:"flex",alignItems:"center",gap:3}}>{IC.plus} Add</button>}
      </div>
      {showForm && (
        <div style={{display:"flex",gap:6,alignItems:"flex-end"}}>
          <Inp label="" value={desc} onChange={setDesc} ph="Description" s={{flex:2}}/>
          <Inp label="" value={cost} onChange={setCost} ph="Amount" type="number" s={{flex:1}}/>
          <Btn v="primary" onClick={handleAdd} s={{marginBottom:0,height:35}}>{IC.check}</Btn>
          <Btn onClick={()=>{setShowForm(false);setDesc("");setCost("")}} s={{height:35}}>{IC.x}</Btn>
        </div>
      )}
      {expenses.length > 0 && (
        <div style={{display:"flex",flexDirection:"column",gap:3,maxHeight:140,overflow:"auto"}}>
          {expenses.map(e => (
            <div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 10px",background:t.inp,borderRadius:7,border:`1px solid ${t.bdr}`}}>
              <div>
                <span style={{fontSize:12,color:t.tx}}>{e.description}</span>
                <span style={{fontSize:10,color:t.tx3,marginLeft:8}}>{e.date}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:12,fontWeight:500,color:t.red,fontFamily:"monospace"}}>{fmt(e.amount)}</span>
                <button onClick={()=>onRemove(e.id)} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex",padding:2}}>{IC.trash}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Pagination({total, page, perPage, onPage}) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderTop:`1px solid ${t.bdr}`}}>
      <span style={{fontSize:11.5,color:t.tx3}}>Showing {(page-1)*perPage+1}–{Math.min(page*perPage,total)} of {total}</span>
      <div style={{display:"flex",gap:3}}>
        <Btn onClick={()=>onPage(Math.max(1,page-1))} disabled={page===1}>{IC.chL}</Btn>
        {Array.from({length:Math.min(pages,7)},(_,i)=>{
          let p=i+1; if(pages>7){const start=Math.max(1,Math.min(page-3,pages-6));p=start+i;}
          return <button key={p} onClick={()=>onPage(p)} style={{width:28,height:28,borderRadius:6,border:"none",background:p===page?t.accD:"transparent",color:p===page?t.acc:t.tx3,fontSize:11.5,fontWeight:p===page?600:400,cursor:"pointer",fontFamily:"inherit"}}>{p}</button>;
        })}
        <Btn onClick={()=>onPage(Math.min(pages,page+1))} disabled={page===pages}>{IC.chR}</Btn>
      </div>
    </div>
  );
}

/* ═══════════════════ MAIN APP ═══════════════════ */
export default function InventoryApp() {
  const [cars, setCars] = useState(() => genSampleCars());
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [pg, setPg] = useState(1);
  const PP = 10;
  const [hovR, setHovR] = useState(null);

  // Filters
  const [fStatus, setFStatus] = useState("All");
  const [fMake, setFMake] = useState("All");
  const [fYear, setFYear] = useState("All");
  const [fColor, setFColor] = useState("All");
  const [fLocation, setFLocation] = useState("All");
  const [fFuel, setFFuel] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Sort
  const [sortK, setSortK] = useState(null);
  const [sortD, setSortD] = useState("desc"); // default newest first

  // Modals
  const [showAdd, setShowAdd] = useState(false);
  const [detail, setDetail] = useState(null);
  const [editCar, setEditCar] = useState(null);
  const [sellCar, setSellCar] = useState(null);

  const activeMakes = useMemo(() => ["All", ...new Set(cars.map(c => c.make))].sort(), [cars]);
  const activeColors = useMemo(() => ["All", ...new Set(cars.map(c => c.color))].sort(), [cars]);
  const activeYears = useMemo(() => ["All", ...new Set(cars.map(c => String(c.year)))].sort((a,b) => b.localeCompare(a)), [cars]);

  const hasActiveFilters = fStatus !== "All" || fMake !== "All" || fYear !== "All" || fColor !== "All" || fLocation !== "All" || fFuel !== "All" || search;
  const resetFilters = () => { setFStatus("All"); setFMake("All"); setFYear("All"); setFColor("All"); setFLocation("All"); setFFuel("All"); setSearch(""); setSortK(null); setSortD("desc"); setPg(1); };

  const filtered = useMemo(() => {
    let l = [...cars];
    if (fStatus !== "All") l = l.filter(c => c.status === fStatus);
    if (fMake !== "All") l = l.filter(c => c.make === fMake);
    if (fYear !== "All") l = l.filter(c => String(c.year) === fYear);
    if (fColor !== "All") l = l.filter(c => c.color === fColor);
    if (fLocation !== "All") l = l.filter(c => c.location === fLocation);
    if (fFuel !== "All") l = l.filter(c => c.fuel === fFuel);
    if (search) { const q = search.toLowerCase(); l = l.filter(c => `${c.year} ${c.make} ${c.model} ${c.vin} ${c.color} ${c.engine}`.toLowerCase().includes(q)); }
    if (sortK) {
      l.sort((a, b) => {
        const av = a[sortK], bv = b[sortK];
        if (typeof av === "number") return sortD === "asc" ? av - bv : bv - av;
        return sortD === "asc" ? String(av||"").localeCompare(String(bv||"")) : String(bv||"").localeCompare(String(av||""));
      });
    } else {
      l.sort((a, b) => b.addedAt - a.addedAt); // newest first by default
    }
    return l;
  }, [cars, fStatus, fMake, fYear, fColor, fLocation, fFuel, search, sortK, sortD]);

  const paged = filtered.slice((pg-1)*PP, pg*PP);
  const handleSort = k => { if (sortK === k) setSortD(d => d==="asc"?"desc":"asc"); else { setSortK(k); setSortD("asc"); } };
  const handleDel = id => { setCars(p => p.filter(c => c.id !== id)); setDetail(null); };

  const exportCSV = () => {
    const h = "Year,Make,Model,VIN,Color,Price,Cost,Status,Location,Mileage,Fuel,Engine,Expenses Total\n";
    const r = filtered.map(c => `${c.year},"${c.make}","${c.model}",${c.vin},"${c.color}",${c.price},${c.cost},${c.status},${c.location},${c.mileage},${c.fuel},"${c.engine}",${c.expenses.reduce((s,e)=>s+e.amount,0)}`).join("\n");
    const b = new Blob([h + r], {type:"text/csv"}); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = "inventory.csv"; a.click();
  };

  const handleSell = (carId, buyerName, salePrice) => {
    setCars(prev => prev.map(c => c.id === carId ? {...c, status: "Sold", days: 0, soldInfo: {date: new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}), buyer: buyerName, salePrice: parseFloat(salePrice) || c.price}} : c));
    setSellCar(null);
  };

  const thS = {textAlign:"left",padding:"10px 12px",fontSize:10,color:t.tx3,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.06em",cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"};

  // Stats
  const inStock = cars.filter(c=>c.status==="In Stock").length;
  const sold = cars.filter(c=>c.status==="Sold").length;
  const reserved = cars.filter(c=>c.status==="Reserved").length;
  const totalValue = cars.filter(c=>c.status!=="Sold").reduce((s,c)=>s+c.price,0);

  return (
    <div style={{minHeight:"100vh",background:t.bg,color:t.tx,fontFamily:"'Outfit',sans-serif",padding:"0"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${t.bdr};border-radius:3px}
        body{font-family:'Outfit',sans-serif;background:${t.bg}}
        input::placeholder{color:${t.tx3}}
      `}</style>

      {/* HEADER */}
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 24px",borderBottom:`1px solid ${t.bdr}`,background:t.sf,position:"sticky",top:0,zIndex:20,flexWrap:"wrap",gap:10}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${t.acc},#818cf8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>AD</div>
          <div>
            <h1 style={{fontSize:17,fontWeight:600,letterSpacing:"-0.02em",margin:0}}>Inventory</h1>
            <span style={{fontSize:10.5,color:t.tx3}}>{cars.length} vehicles · {fK(totalValue)} total value</span>
          </div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <Btn onClick={exportCSV}>{IC.dl} Export</Btn>
          <Btn v="primary" onClick={()=>setShowAdd(true)}>{IC.plus} Add Vehicle</Btn>
        </div>
      </header>

      <div style={{padding:"18px 24px",display:"flex",flexDirection:"column",gap:16}}>
        {/* STAT CARDS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10}}>
          {[
            {l:"In Stock",v:inStock,c:t.grn,bg:t.grnD},
            {l:"Sold",v:sold,c:t.acc,bg:t.accD},
            {l:"Reserved",v:reserved,c:t.amb,bg:t.ambD},
            {l:"In Service",v:cars.filter(c=>c.status==="In Service").length,c:t.pur,bg:t.purD},
          ].map(s=>(
            <div key={s.l} onClick={()=>{setFStatus(s.l===fStatus?"All":s.l);setPg(1)}} style={{background:t.card,border:`1px solid ${fStatus===s.l?s.c:t.bdr}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",transition:"all 0.2s"}}>
              <div style={{fontSize:10,color:t.tx3,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>{s.l}</div>
              <div style={{fontSize:22,fontWeight:600,color:s.c}}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* TOOLBAR */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{display:"flex",alignItems:"center",gap:5,background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"6px 10px",minWidth:170}}>
              <span style={{color:t.tx3,display:"flex"}}>{IC.search}</span>
              <input placeholder="VIN, make, model..." value={search} onChange={e=>{setSearch(e.target.value);setPg(1)}}
                style={{background:"none",border:"none",outline:"none",color:t.tx,fontSize:12,width:"100%",fontFamily:"inherit"}}/>
              {search && <button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex"}}>{IC.x}</button>}
            </div>
            <Btn onClick={()=>setShowFilters(!showFilters)} s={{background:showFilters?t.accD:t.sf2,color:showFilters?t.acc:t.tx2}}>
              {IC.filter} Filters {hasActiveFilters && <span style={{width:6,height:6,borderRadius:"50%",background:t.acc}}/>}
            </Btn>
            {hasActiveFilters && <Btn v="ghost" onClick={resetFilters}>{IC.reset} Reset</Btn>}
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <span style={{fontSize:11.5,color:t.tx3}}>{filtered.length} result{filtered.length!==1?"s":""}</span>
            <div style={{display:"flex",border:`1px solid ${t.bdr}`,borderRadius:7,overflow:"hidden"}}>
              {["table","grid"].map(m=>(
                <button key={m} onClick={()=>setView(m)} style={{padding:"5px 10px",background:view===m?t.sf2:"transparent",color:view===m?t.tx:t.tx3,border:"none",fontSize:11,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{m}</button>
              ))}
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        {showFilters && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:8,padding:"14px 16px",background:t.card,borderRadius:12,border:`1px solid ${t.bdr}`,animation:"slideDown 0.2s ease"}}>
            <Sel label="Status" value={fStatus} onChange={v=>{setFStatus(v);setPg(1)}} opts={["All",...STATUSES]}/>
            <Sel label="Make" value={fMake} onChange={v=>{setFMake(v);setPg(1)}} opts={activeMakes} searchable/>
            <Sel label="Year" value={fYear} onChange={v=>{setFYear(v);setPg(1)}} opts={activeYears}/>
            <Sel label="Color" value={fColor} onChange={v=>{setFColor(v);setPg(1)}} opts={activeColors} searchable/>
            <Sel label="Location" value={fLocation} onChange={v=>{setFLocation(v);setPg(1)}} opts={["All",...LOCATIONS]}/>
            <Sel label="Fuel" value={fFuel} onChange={v=>{setFFuel(v);setPg(1)}} opts={["All",...FUEL_TYPES]}/>
          </div>
        )}

        {/* TABLE VIEW */}
        {view === "table" ? (
          <div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:14,overflow:"hidden"}}>
            <div style={{overflow:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:1050}}>
                <thead><tr style={{borderBottom:`1px solid ${t.bdr}`}}>
                  {[["Vehicle","make"],["VIN","vin"],["Color","color"],["Location","location"],["Status","status"],["Days","days"],["Cost","cost"],["Price","price"],["Expenses",null],["Margin",null],["",null]].map(([h,k])=>(
                    <th key={h||"act"} style={thS} onClick={()=>k&&handleSort(k)}>
                      <span style={{display:"inline-flex",alignItems:"center",gap:2}}>{h}{sortK===k&&(sortD==="asc"?IC.aUp:IC.aDn)}</span>
                    </th>
                  ))}
                </tr></thead>
                <tbody>
                  {paged.map((car,i)=>{
                    const expTotal = car.expenses.reduce((s,e)=>s+e.amount,0);
                    const margin = car.price - car.cost - expTotal;
                    const isHov = hovR === car.id;
                    return (
                      <tr key={car.id} onMouseEnter={()=>setHovR(car.id)} onMouseLeave={()=>setHovR(null)}
                        style={{borderBottom:i<paged.length-1?`1px solid ${t.bdr}`:"none",background:isHov?t.cardH:"transparent",transition:"background 0.1s",cursor:"pointer"}}
                        onClick={()=>setDetail(car)}>
                        <td style={{padding:"10px 12px"}}>
                          <div style={{display:"flex",alignItems:"center",gap:10}}>
                            {car.imageData ? (
                              <img src={car.imageData} alt="" style={{width:40,height:30,objectFit:"cover",borderRadius:6,border:`1px solid ${t.bdr}`}}/>
                            ) : (
                              <div style={{width:40,height:30,borderRadius:6,background:t.sf2,display:"flex",alignItems:"center",justifyContent:"center",color:t.tx3,border:`1px solid ${t.bdr}`}}><span style={{transform:"scale(0.7)",display:"flex"}}>{IC.car}</span></div>
                            )}
                            <div>
                              <div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{car.year} {car.make} {car.model}</div>
                              <div style={{fontSize:10,color:t.tx3}}>{car.mileage.toLocaleString()} mi · {car.engine}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{padding:"10px 12px",fontSize:10.5,color:t.tx2,fontFamily:"monospace"}}>{car.vin.slice(0,11)}…</td>
                        <td style={{padding:"10px 12px",fontSize:11.5,color:t.tx2}}>{car.color}</td>
                        <td style={{padding:"10px 12px",fontSize:11.5,color:t.tx2}}>{car.location}</td>
                        <td style={{padding:"10px 12px"}}><Badge status={car.status}/></td>
                        <td style={{padding:"10px 12px",fontSize:12,color:car.days>30?t.amb:t.tx2}}>{car.days!=null?`${car.days}d`:"—"}</td>
                        <td style={{padding:"10px 12px",fontSize:11.5,fontFamily:"monospace",color:t.tx2}}>{fK(car.cost)}</td>
                        <td style={{padding:"10px 12px",fontSize:11.5,fontWeight:500,fontFamily:"monospace",color:t.tx}}>{fK(car.price)}</td>
                        <td style={{padding:"10px 12px",fontSize:11.5,fontFamily:"monospace",color:expTotal>0?t.red:t.tx3}}>{expTotal>0?`-${fK(expTotal)}`:"—"}</td>
                        <td style={{padding:"10px 12px"}}><span style={{fontSize:11.5,fontWeight:500,color:margin>0?t.grn:t.red}}>{fK(margin)}</span></td>
                        <td style={{padding:"10px 12px"}}>
                          <div style={{display:"flex",gap:3,opacity:isHov?1:0,transition:"opacity 0.1s"}} onClick={e=>e.stopPropagation()}>
                            {car.status !== "Sold" && <Btn v="sell" onClick={()=>setSellCar(car)} s={{padding:"4px 8px",fontSize:10.5}}>{IC.sell} Sell</Btn>}
                            <button onClick={()=>setEditCar(car)} style={{background:t.sf2,border:`1px solid ${t.bdr}`,borderRadius:5,padding:"3px 6px",cursor:"pointer",color:t.tx2,display:"flex"}}>{IC.edit}</button>
                            <button onClick={()=>handleDel(car.id)} style={{background:t.redD,border:"none",borderRadius:5,padding:"3px 6px",cursor:"pointer",color:t.red,display:"flex"}}>{IC.trash}</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {paged.length === 0 && <tr><td colSpan={11} style={{padding:40,textAlign:"center",color:t.tx3,fontSize:13}}>No vehicles match your filters</td></tr>}
                </tbody>
              </table>
            </div>
            <Pagination total={filtered.length} page={pg} perPage={PP} onPage={setPg}/>
          </div>
        ) : (
          /* GRID VIEW */
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:12}}>
              {filtered.slice(0, 24).map(car => {
                const expTotal = car.expenses.reduce((s,e)=>s+e.amount,0);
                const margin = car.price - car.cost - expTotal;
                return (
                  <div key={car.id} onClick={()=>setDetail(car)}
                    style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:12,overflow:"hidden",cursor:"pointer",transition:"all 0.2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=t.bdr2;e.currentTarget.style.transform="translateY(-2px)"}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=t.bdr;e.currentTarget.style.transform="none"}}>
                    <div style={{height:110,background:car.imageData?undefined:`linear-gradient(135deg,${t.accD},${t.purD})`,position:"relative",overflow:"hidden"}}>
                      {car.imageData ? <img src={car.imageData} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",opacity:.3}}><span style={{transform:"scale(2)",display:"flex"}}>{IC.car}</span></div>}
                      <div style={{position:"absolute",top:8,right:8}}><Badge status={car.status}/></div>
                      <div style={{position:"absolute",bottom:8,left:8,display:"flex",gap:3}}>
                        <span style={{padding:"2px 6px",borderRadius:4,fontSize:9.5,background:"rgba(0,0,0,.6)",color:"#fff",fontWeight:500}}>{car.fuel}</span>
                        <span style={{padding:"2px 6px",borderRadius:4,fontSize:9.5,background:"rgba(0,0,0,.6)",color:"#fff"}}>{car.location}</span>
                      </div>
                    </div>
                    <div style={{padding:"13px 15px"}}>
                      <div style={{fontSize:13.5,fontWeight:600,color:t.tx,marginBottom:2}}>{car.year} {car.make} {car.model}</div>
                      <div style={{fontSize:10.5,color:t.tx3,marginBottom:10}}>{car.color} · {car.mileage.toLocaleString()} mi</div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                        <span style={{fontSize:17,fontWeight:600,fontFamily:"monospace",color:t.tx}}>{fmt(car.price)}</span>
                        <span style={{fontSize:11,color:margin>0?t.grn:t.red,fontWeight:500}}>{margin>0?"+":""}{fK(margin)}</span>
                      </div>
                      {car.status !== "Sold" && (
                        <button onClick={e=>{e.stopPropagation();setSellCar(car)}}
                          style={{width:"100%",marginTop:10,padding:"7px",borderRadius:8,border:`1px solid rgba(16,185,129,0.2)`,background:t.sellGrnD,color:t.sellGrn,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                          {IC.sell} Sell Vehicle
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ═══════ ADD VEHICLE MODAL ═══════ */}
      <AddVehicleModal open={showAdd} onClose={()=>setShowAdd(false)} onAdd={car=>{setCars(p=>[car,...p]);setShowAdd(false);setPg(1)}}/>

      {/* ═══════ DETAIL MODAL ═══════ */}
      <Modal open={!!detail} onClose={()=>setDetail(null)} title="Vehicle Details" w={740}>
        {detail && <DetailView car={detail} onEdit={()=>{setEditCar(detail);setDetail(null)}} onDel={()=>handleDel(detail.id)} onSell={()=>{setSellCar(detail);setDetail(null)}}/>}
      </Modal>

      {/* ═══════ EDIT MODAL ═══════ */}
      <Modal open={!!editCar} onClose={()=>setEditCar(null)} title="Edit Vehicle" w={680}>
        {editCar && <EditVehicleForm car={editCar} onSave={u=>{setCars(p=>p.map(c=>c.id===u.id?u:c));setEditCar(null)}} onCancel={()=>setEditCar(null)}/>}
      </Modal>

      {/* ═══════ SELL MODAL ═══════ */}
      <SellModal car={sellCar} open={!!sellCar} onClose={()=>setSellCar(null)} onSell={handleSell}/>
    </div>
  );
}

/* ═══════════════════ ADD VEHICLE MODAL ═══════════════════ */
function AddVehicleModal({open, onClose, onAdd}) {
  const [make, setMake] = useState("BMW");
  const [model, setModel] = useState(VEHICLE_DB["BMW"][0]);
  const [year, setYear] = useState("2024");
  const [color, setColor] = useState("Black");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [fuel, setFuel] = useState("Gasoline");
  const [trans, setTrans] = useState("Automatic");
  const [engine, setEngine] = useState("");
  const [location, setLocation] = useState("Milltown");
  const [imgData, setImgData] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const handleMakeChange = v => { setMake(v); setModel(VEHICLE_DB[v]?.[0] || ""); };

  const handleSubmit = () => {
    const now = Date.now();
    onAdd({
      id: now, year: parseInt(year), make, model, vin: genVIN(), color,
      price: parseFloat(price) || 0, cost: parseFloat(cost) || 0,
      status: "In Stock", location, days: 0, mileage: parseInt(mileage) || 0,
      fuel, transmission: trans, engine: engine || "N/A",
      imageData: imgData, expenses: [...expenses],
      soldInfo: null, addedAt: now,
    });
    // Reset
    setMake("BMW"); setModel(VEHICLE_DB["BMW"][0]); setYear("2024"); setColor("Black");
    setCost(""); setPrice(""); setMileage(""); setFuel("Gasoline"); setTrans("Automatic");
    setEngine(""); setLocation("Milltown"); setImgData(null); setExpenses([]);
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New Vehicle" w={700}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Sel label="Make" value={make} onChange={handleMakeChange} opts={ALL_MAKES} searchable/>
        <Sel label="Model" value={model} onChange={setModel} opts={VEHICLE_DB[make]||[]} searchable/>
        <Sel label="Year" value={year} onChange={setYear} opts={YEARS}/>
        <Sel label="Color" value={color} onChange={setColor} opts={STANDARD_COLORS} searchable/>
        <Inp label="Cost ($)" value={cost} onChange={setCost} type="number" ph="Purchase cost"/>
        <Inp label="Listing Price ($)" value={price} onChange={setPrice} type="number" ph="Listing price"/>
        <Inp label="Mileage" value={mileage} onChange={setMileage} type="number" ph="Odometer reading"/>
        <Sel label="Fuel Type" value={fuel} onChange={setFuel} opts={FUEL_TYPES}/>
        <Sel label="Transmission" value={trans} onChange={setTrans} opts={TRANSMISSIONS}/>
        <Inp label="Engine" value={engine} onChange={setEngine} ph="e.g. 3.0L I6 Turbo"/>
        <Sel label="Location" value={location} onChange={setLocation} opts={LOCATIONS}/>
      </div>
      <div style={{marginTop:14}}><ImageUpload imageData={imgData} onUpload={setImgData} onRemove={()=>setImgData(null)}/></div>
      <div style={{marginTop:14}}><ExpenseManager expenses={expenses} onAdd={e=>setExpenses(p=>[...p,e])} onRemove={id=>setExpenses(p=>p.filter(e=>e.id!==id))}/></div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:18}}>
        <Btn onClick={onClose}>Cancel</Btn>
        <Btn v="primary" onClick={handleSubmit} disabled={!make||!model}>Add Vehicle</Btn>
      </div>
    </Modal>
  );
}

/* ═══════════════════ EDIT FORM ═══════════════════ */
function EditVehicleForm({car, onSave, onCancel}) {
  const [f, sF] = useState({...car, price:String(car.price), cost:String(car.cost), mileage:String(car.mileage), year:String(car.year)});
  const u = (k,v) => sF(p => ({...p,[k]:v}));

  return (
    <>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Sel label="Make" value={f.make} onChange={v=>{u("make",v);u("model",VEHICLE_DB[v]?.[0]||"")}} opts={ALL_MAKES} searchable/>
        <Sel label="Model" value={f.model} onChange={v=>u("model",v)} opts={VEHICLE_DB[f.make]||[]} searchable/>
        <Sel label="Year" value={f.year} onChange={v=>u("year",v)} opts={YEARS}/>
        <Sel label="Color" value={f.color} onChange={v=>u("color",v)} opts={STANDARD_COLORS} searchable/>
        <Inp label="Cost ($)" value={f.cost} onChange={v=>u("cost",v)} type="number"/>
        <Inp label="Price ($)" value={f.price} onChange={v=>u("price",v)} type="number"/>
        <Inp label="Mileage" value={f.mileage} onChange={v=>u("mileage",v)} type="number"/>
        <Sel label="Fuel" value={f.fuel} onChange={v=>u("fuel",v)} opts={FUEL_TYPES}/>
        <Sel label="Transmission" value={f.transmission} onChange={v=>u("transmission",v)} opts={TRANSMISSIONS}/>
        <Inp label="Engine" value={f.engine} onChange={v=>u("engine",v)}/>
        <Sel label="Status" value={f.status} onChange={v=>u("status",v)} opts={STATUSES}/>
        <Sel label="Location" value={f.location} onChange={v=>u("location",v)} opts={LOCATIONS}/>
      </div>
      <div style={{marginTop:14}}><ImageUpload imageData={f.imageData} onUpload={v=>u("imageData",v)} onRemove={()=>u("imageData",null)}/></div>
      <div style={{marginTop:14}}><ExpenseManager expenses={f.expenses||[]} onAdd={e=>u("expenses",[...(f.expenses||[]),e])} onRemove={id=>u("expenses",(f.expenses||[]).filter(e=>e.id!==id))}/></div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:18}}>
        <Btn onClick={onCancel}>Cancel</Btn>
        <Btn v="primary" onClick={()=>onSave({...f,year:parseInt(f.year),price:parseFloat(f.price)||0,cost:parseFloat(f.cost)||0,mileage:parseInt(f.mileage)||0})}>Save Changes</Btn>
      </div>
    </>
  );
}

/* ═══════════════════ DETAIL VIEW ═══════════════════ */
function DetailView({car, onEdit, onDel, onSell}) {
  const expTotal = car.expenses.reduce((s,e)=>s+e.amount,0);
  const margin = car.price - car.cost - expTotal;

  return (
    <div>
      <div style={{display:"flex",gap:18,marginBottom:18,flexWrap:"wrap"}}>
        <div style={{width:200,height:145,borderRadius:12,overflow:"hidden",border:`1px solid ${t.bdr}`,flexShrink:0,background:`linear-gradient(135deg,${t.accD},${t.purD})`}}>
          {car.imageData ? <img src={car.imageData} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",opacity:.3}}><span style={{transform:"scale(2.5)",display:"flex"}}>{IC.car}</span></div>}
        </div>
        <div style={{flex:1,minWidth:220}}>
          <h3 style={{margin:"0 0 4px",fontSize:19,fontWeight:600,color:t.tx}}>{car.year} {car.make} {car.model}</h3>
          <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
            <Badge status={car.status}/>
            <span style={{fontSize:11,color:t.tx3,display:"flex",alignItems:"center",gap:3}}>{IC.mapPin} {car.location}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
            {[["VIN",car.vin,"mono"],["Color",car.color],["Mileage",`${car.mileage.toLocaleString()} mi`],["Days on Lot",car.days!=null?`${car.days} days`:"N/A"],["Engine",car.engine],["Fuel",car.fuel],["Transmission",car.transmission]].map(([k,v,ff])=>(
              <div key={k}><div style={{fontSize:9,color:t.tx3,textTransform:"uppercase",letterSpacing:"0.06em"}}>{k}</div><div style={{fontSize:12,color:t.tx,fontFamily:ff==="mono"?"monospace":"inherit",marginTop:1}}>{v}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* Financials */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:16}}>
        {[["Cost",fmt(car.cost),t.tx2],["Price",fmt(car.price),t.tx],["Expenses",expTotal>0?fmt(expTotal):"$0",t.red],["Net Margin",fmt(margin),margin>0?t.grn:t.red]].map(([l,v,c])=>(
          <div key={l} style={{background:t.sf2,borderRadius:10,padding:"11px 13px",border:`1px solid ${t.bdr}`}}>
            <div style={{fontSize:9.5,color:t.tx3,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
            <div style={{fontSize:16,fontWeight:600,color:c,fontFamily:"monospace",marginTop:2}}>{v}</div>
          </div>
        ))}
      </div>

      {/* Expense History */}
      {car.expenses.length > 0 && (
        <div style={{marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:500,color:t.tx2,marginBottom:8,display:"flex",alignItems:"center",gap:5}}>{IC.receipt} Expense History</div>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {car.expenses.map(e=>(
              <div key={e.id} style={{display:"flex",justifyContent:"space-between",padding:"7px 11px",background:t.inp,borderRadius:7,border:`1px solid ${t.bdr}`}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:12,color:t.tx}}>{e.description}</span>
                  <span style={{fontSize:10,color:t.tx3,display:"flex",alignItems:"center",gap:3}}>{IC.clock} {e.date}</span>
                </div>
                <span style={{fontSize:12,fontWeight:500,color:t.red,fontFamily:"monospace"}}>{fmt(e.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sold Info */}
      {car.soldInfo && (
        <div style={{padding:"12px 14px",background:t.accD,borderRadius:10,border:`1px solid rgba(91,141,239,0.15)`,marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:500,color:t.acc,marginBottom:6}}>Sale Information</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[["Buyer",car.soldInfo.buyer],["Sale Date",car.soldInfo.date],["Sale Price",fmt(car.soldInfo.salePrice)]].map(([l,v])=>(
              <div key={l}><div style={{fontSize:9.5,color:t.tx3,textTransform:"uppercase"}}>{l}</div><div style={{fontSize:12.5,color:t.tx,fontWeight:500,marginTop:1}}>{v}</div></div>
            ))}
          </div>
        </div>
      )}

      <div style={{display:"flex",justifyContent:"flex-end",gap:6}}>
        <Btn v="danger" onClick={onDel}>{IC.trash} Delete</Btn>
        <Btn onClick={onEdit}>{IC.edit} Edit</Btn>
        {car.status !== "Sold" && <Btn v="sell" onClick={onSell}>{IC.sell} Sell Vehicle</Btn>}
      </div>
    </div>
  );
}

/* ═══════════════════ SELL MODAL ═══════════════════ */
function SellModal({car, open, onClose, onSell}) {
  const [buyer, setBuyer] = useState("");
  const [salePrice, setSalePrice] = useState("");

  useEffect(() => {
    if (car) setSalePrice(String(car.price));
  }, [car]);

  if (!car) return null;
  const expTotal = car.expenses.reduce((s,e)=>s+e.amount,0);
  const netProfit = (parseFloat(salePrice)||0) - car.cost - expTotal;

  return (
    <Modal open={open} onClose={()=>{onClose();setBuyer("");setSalePrice("")}} title="Sell Vehicle" w={500}>
      <div style={{padding:"14px 16px",background:t.sf2,borderRadius:10,border:`1px solid ${t.bdr}`,marginBottom:16}}>
        <div style={{fontSize:14,fontWeight:600,color:t.tx}}>{car.year} {car.make} {car.model}</div>
        <div style={{fontSize:11.5,color:t.tx3,marginTop:2}}>{car.vin} · {car.color}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <Inp label="Buyer Name" value={buyer} onChange={setBuyer} ph="Enter buyer's full name"/>
        <Inp label="Sale Price ($)" value={salePrice} onChange={setSalePrice} type="number" ph="Final sale price"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:16}}>
        {[["Cost",fmt(car.cost),t.tx2],["Expenses",fmt(expTotal),t.red],["Net Profit",fmt(netProfit),netProfit>0?t.grn:t.red]].map(([l,v,c])=>(
          <div key={l} style={{background:t.inp,borderRadius:8,padding:"10px 12px",border:`1px solid ${t.bdr}`}}>
            <div style={{fontSize:9.5,color:t.tx3,textTransform:"uppercase"}}>{l}</div>
            <div style={{fontSize:15,fontWeight:600,color:c,fontFamily:"monospace",marginTop:2}}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:18}}>
        <Btn onClick={()=>{onClose();setBuyer("");setSalePrice("")}}>Cancel</Btn>
        <Btn v="sell" onClick={()=>{onSell(car.id,buyer,salePrice);setBuyer("");setSalePrice("")}} disabled={!buyer}>{IC.check} Confirm Sale</Btn>
      </div>
    </Modal>
  );
}
