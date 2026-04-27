import { useState, useMemo, useEffect } from "react";

/* ═══════════════════ THEME (matches inventory page) ═══════════════════ */
const t = {
  bg:"#07070a",sf:"#0e0e13",sf2:"#131318",card:"#101015",cardH:"#17171e",
  bdr:"#1d1d26",bdr2:"#282832",tx:"#ededf0",tx2:"#888894",tx3:"#50505c",
  acc:"#5b8def",accD:"rgba(91,141,239,0.1)",accG:"rgba(91,141,239,0.22)",
  grn:"#34d399",grnD:"rgba(52,211,153,0.1)",red:"#f87171",redD:"rgba(248,113,113,0.1)",
  amb:"#fbbf24",ambD:"rgba(251,191,36,0.1)",pur:"#a78bfa",purD:"rgba(167,139,250,0.1)",
  cyn:"#22d3ee",cynD:"rgba(34,211,238,0.1)",inp:"#0b0b10",ov:"rgba(0,0,0,0.75)",
};

/* ═══════════════════ ICONS ═══════════════════ */
const IC = {
  trend:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  car:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17v1a1 1 0 001 1h1a1 1 0 001-1v-1m10 0v1a1 1 0 001 1h1a1 1 0 001-1v-1"/><circle cx="7.5" cy="14" r="1.5"/><circle cx="16.5" cy="14" r="1.5"/></svg>,
  dollar:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  clock:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  box:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  receipt:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2z"/><path d="M8 10h8M8 14h4"/></svg>,
  mapPin:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  alert:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  plus:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  eye:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  chR:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>,
  aUp:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  aDn:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  barChart:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  wrench:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
};

/* ═══════════════════ SAMPLE DATA ═══════════════════ */
const LOCATIONS = ["Milltown", "Elizabeth"];

const genVIN = () => { const c = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789"; return Array.from({length:17}, () => c[Math.floor(Math.random()*c.length)]).join(""); };

const SAMPLE_CARS = [
  {id:1,year:2024,make:"BMW",model:"M4 Competition",color:"Alpine White",price:84995,cost:72400,status:"In Stock",location:"Milltown",days:12,mileage:1200,expenses:[{id:1,description:"Ceramic coating",amount:1200,date:"Feb 15, 2026"}],soldInfo:null,addedAt:Date.now()-100000},
  {id:2,year:2024,make:"Mercedes-Benz",model:"AMG GT 63",color:"Obsidian Black",price:137995,cost:119200,status:"Reserved",location:"Elizabeth",days:3,mileage:850,expenses:[],soldInfo:null,addedAt:Date.now()-200000},
  {id:3,year:2023,make:"Porsche",model:"911 Turbo S",color:"Guards Red",price:228500,cost:198000,status:"In Stock",location:"Milltown",days:28,mileage:3200,expenses:[{id:2,description:"PPF wrap",amount:3500,date:"Jan 20, 2026"}],soldInfo:null,addedAt:Date.now()-300000},
  {id:4,year:2024,make:"Tesla",model:"Model S Plaid",color:"Pearl White",price:108990,cost:94500,status:"Sold",location:"Elizabeth",days:0,mileage:100,expenses:[],soldInfo:{date:"Mar 1, 2026",buyer:"James Mitchell",salePrice:108990},addedAt:Date.now()-400000},
  {id:5,year:2024,make:"Audi",model:"RS e-tron GT",color:"Nardo Grey",price:152400,cost:131800,status:"In Stock",location:"Milltown",days:45,mileage:4500,expenses:[{id:3,description:"Tire replacement",amount:2800,date:"Feb 28, 2026"}],soldInfo:null,addedAt:Date.now()-500000},
  {id:6,year:2023,make:"Lamborghini",model:"Huracán EVO",color:"Yellow",price:268000,cost:232000,status:"In Stock",location:"Elizabeth",days:52,mileage:2800,expenses:[],soldInfo:null,addedAt:Date.now()-600000},
  {id:7,year:2024,make:"Land Rover",model:"Range Rover Sport",color:"British Racing Green",price:115995,cost:99800,status:"In Service",location:"Milltown",days:7,mileage:8200,expenses:[{id:4,description:"Brake replacement",amount:4200,date:"Mar 2, 2026"},{id:5,description:"Oil change",amount:350,date:"Mar 2, 2026"}],soldInfo:null,addedAt:Date.now()-700000},
  {id:8,year:2024,make:"Ferrari",model:"296 GTB",color:"Red",price:352000,cost:310000,status:"In Stock",location:"Elizabeth",days:18,mileage:650,expenses:[],soldInfo:null,addedAt:Date.now()-800000},
  {id:9,year:2024,make:"Toyota",model:"GR Supra",color:"Blue",price:58250,cost:49800,status:"Sold",location:"Milltown",days:0,mileage:3400,expenses:[{id:6,description:"Detail",amount:400,date:"Feb 10, 2026"}],soldInfo:{date:"Feb 25, 2026",buyer:"Elena Rodriguez",salePrice:57500},addedAt:Date.now()-900000},
  {id:10,year:2024,make:"Chevrolet",model:"Corvette",color:"Orange",price:72995,cost:62000,status:"Reserved",location:"Elizabeth",days:8,mileage:1100,expenses:[],soldInfo:null,addedAt:Date.now()-1000000},
  {id:11,year:2023,make:"Rolls-Royce",model:"Ghost",color:"Black",price:345000,cost:298000,status:"In Stock",location:"Milltown",days:38,mileage:5600,expenses:[{id:7,description:"Interior detail",amount:800,date:"Feb 20, 2026"}],soldInfo:null,addedAt:Date.now()-1100000},
  {id:12,year:2024,make:"McLaren",model:"750S",color:"Silver",price:299000,cost:260000,status:"In Stock",location:"Elizabeth",days:15,mileage:420,expenses:[],soldInfo:null,addedAt:Date.now()-1200000},
  {id:13,year:2024,make:"BMW",model:"M3 CS",color:"Black",price:78500,cost:66000,status:"Sold",location:"Milltown",days:0,mileage:2100,expenses:[],soldInfo:{date:"Feb 20, 2026",buyer:"David Chen",salePrice:77000},addedAt:Date.now()-1300000},
  {id:14,year:2023,make:"Mercedes-Benz",model:"GLE 63S",color:"White",price:119750,cost:102000,status:"Sold",location:"Elizabeth",days:0,mileage:6400,expenses:[{id:8,description:"Windshield repair",amount:600,date:"Jan 15, 2026"}],soldInfo:{date:"Feb 28, 2026",buyer:"Priya Sharma",salePrice:118000},addedAt:Date.now()-1400000},
  {id:15,year:2024,make:"Porsche",model:"Cayenne GTS",color:"Midnight Blue",price:112000,cost:96500,status:"In Stock",location:"Milltown",days:22,mileage:7800,expenses:[],soldInfo:null,addedAt:Date.now()-1500000},
  {id:16,year:2024,make:"Audi",model:"RS7",color:"Metallic Gray",price:125900,cost:108000,status:"Sold",location:"Elizabeth",days:0,mileage:3100,expenses:[],soldInfo:{date:"Mar 3, 2026",buyer:"Marcus Thompson",salePrice:124500},addedAt:Date.now()-1600000},
  {id:17,year:2023,make:"Bentley",model:"Continental GT",color:"Burgundy",price:225000,cost:195000,status:"In Stock",location:"Elizabeth",days:35,mileage:4200,expenses:[{id:9,description:"Chrome polish",amount:500,date:"Feb 5, 2026"}],soldInfo:null,addedAt:Date.now()-1700000},
  {id:18,year:2024,make:"Genesis",model:"G80",color:"Gray",price:58700,cost:49200,status:"In Stock",location:"Milltown",days:10,mileage:1800,expenses:[],soldInfo:null,addedAt:Date.now()-1800000},
];

// Monthly revenue data (simulated)
const MONTHLY_DATA = [
  {m:"Apr '25",rev:185000,profit:28000,sold:4},
  {m:"May",rev:225000,profit:34000,sold:5},
  {m:"Jun",rev:198000,profit:29000,sold:4},
  {m:"Jul",rev:312000,profit:48000,sold:7},
  {m:"Aug",rev:278000,profit:41000,sold:6},
  {m:"Sep",rev:345000,profit:54000,sold:8},
  {m:"Oct",rev:298000,profit:43000,sold:6},
  {m:"Nov",rev:410000,profit:65000,sold:9},
  {m:"Dec",rev:456000,profit:74000,sold:10},
  {m:"Jan '26",rev:389000,profit:58000,sold:8},
  {m:"Feb",rev:372000,profit:55000,sold:7},
  {m:"Mar",rev:486000,profit:78000,sold:5},
];

const EXPENSE_CATS = [
  {cat:"Marketing",amount:18500,color:t.acc},
  {cat:"Rent",amount:24000,color:t.pur},
  {cat:"Salaries",amount:45000,color:t.grn},
  {cat:"Insurance",amount:12800,color:t.amb},
  {cat:"Detailing",amount:6400,color:t.cyn},
  {cat:"Repairs",amount:8900,color:t.red},
  {cat:"Utilities",amount:3200,color:"#f472b6"},
  {cat:"Software",amount:2100,color:"#a3e635"},
];

/* ═══════════════════ HELPERS ═══════════════════ */
const fmt = n => "$" + n.toLocaleString();
const fK = n => n>=1e6?"$"+(n/1e6).toFixed(2)+"M":n>=1e3?"$"+(n/1e3).toFixed(1)+"K":"$"+n;

const stCfg = {
  "In Stock":{c:t.grn,bg:t.grnD},"Sold":{c:t.acc,bg:t.accD},
  "Reserved":{c:t.amb,bg:t.ambD},"In Service":{c:t.pur,bg:t.purD},
};

/* ═══════════════════ SHARED COMPONENTS ═══════════════════ */
function Badge({s}){const cfg=stCfg[s]||{c:t.tx2,bg:"rgba(255,255,255,.05)"};return <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"2px 9px",borderRadius:20,background:cfg.bg,color:cfg.c,fontSize:10.5,fontWeight:500,whiteSpace:"nowrap"}}><span style={{width:4,height:4,borderRadius:"50%",background:cfg.c}}/>{s}</span>}

function Card({children,s={}}){return <div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:14,...s}}>{children}</div>}

function Stat({label,val,chg,up,sub,icon,delay=0,color}){
  const[v,setV]=useState(false);
  useEffect(()=>{const tm=setTimeout(()=>setV(true),delay);return()=>clearTimeout(tm)},[]);
  return(
    <div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:13,padding:"16px 18px",flex:1,minWidth:155,opacity:v?1:0,transform:v?"translateY(0)":"translateY(10px)",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <span style={{fontSize:10,color:t.tx3,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:500}}>{label}</span>
        {icon&&<span style={{color:color||t.tx3,opacity:.6,display:"flex"}}>{icon}</span>}
      </div>
      <div style={{display:"flex",alignItems:"baseline",gap:8}}>
        <span style={{fontSize:23,fontWeight:600,color:color||t.tx,letterSpacing:"-0.02em"}}>{val}</span>
        {chg&&<span style={{display:"inline-flex",alignItems:"center",gap:2,fontSize:10.5,fontWeight:500,color:up?t.grn:t.red}}>{up?IC.aUp:IC.aDn}{chg}</span>}
      </div>
      {sub&&<div style={{fontSize:10,color:t.tx3,marginTop:2}}>{sub}</div>}
    </div>
  );
}

function ProgressBar({pct,color,h=5}){
  return <div style={{height:h,borderRadius:h,background:t.sf2,width:"100%"}}><div style={{height:"100%",borderRadius:h,background:color,width:`${Math.min(100,pct)}%`,transition:"width 0.8s cubic-bezier(0.16,1,0.3,1)"}}/></div>;
}

/* ═══════════════════ CHARTS ═══════════════════ */
function BarChart({data,h=155}){
  const max=Math.max(...data.map(d=>d.rev));const bw=Math.max(8,240/data.length);const[hov,setHov]=useState(null);
  return(
    <svg width="100%" viewBox={`0 0 ${data.length*(bw+5)} ${h+28}`} preserveAspectRatio="xMidYMid meet" style={{display:"block"}}>
      {data.map((d,i)=>{const bh=(d.rev/max)*h;const ph=(d.profit/max)*h;const x=i*(bw+5);const isH=hov===i;
        return(<g key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{cursor:"pointer"}}>
          <rect x={x} y={h-bh} width={bw} height={bh} rx={3} fill={isH?t.acc:t.accD} style={{transition:"fill 0.2s"}}/>
          <rect x={x} y={h-ph} width={bw} height={ph} rx={3} fill={isH?t.grn:t.grnD} style={{transition:"fill 0.2s",opacity:.9}}/>
          <text x={x+bw/2} y={h+14} textAnchor="middle" fill={t.tx3} fontSize="8" fontFamily="'Outfit',sans-serif">{d.m}</text>
          {isH&&<><rect x={Math.max(0,x+bw/2-52)} y={h-bh-34} width={104} height={26} rx={5} fill={t.sf} stroke={t.bdr}/><text x={x+bw/2} y={h-bh-17} textAnchor="middle" fill={t.tx} fontSize="9.5" fontWeight="500" fontFamily="monospace">{fK(d.rev)} rev · {fK(d.profit)} profit</text></>}
        </g>);
      })}
    </svg>
  );
}

function AreaChart({data,h=80,color=t.acc}){
  const vals=data.map(d=>d.rev);const max=Math.max(...vals);const min=Math.min(...vals)*0.85;const range=max-min||1;const w=260;
  const pts=vals.map((v,i)=>`${(i/(vals.length-1))*w},${h-((v-min)/range)*(h-8)-4}`).join(" ");
  return(
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet" style={{display:"block"}}>
      <defs><linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".2"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#areaG)"/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {vals.map((v,i)=>{const x=(i/(vals.length-1))*w;const y=h-((v-min)/range)*(h-8)-4;
        return i===vals.length-1?<circle key={i} cx={x} cy={y} r="3.5" fill={color} stroke={t.card} strokeWidth="2"/>:null;
      })}
    </svg>
  );
}

function DonutChart({segments,size=130,stroke=14}){
  const total=segments.reduce((s,x)=>s+x.val,0);const r=(size-stroke)/2;const circ=2*Math.PI*r;
  let offset=0;const[hov,setHov]=useState(null);
  return(
    <div style={{position:"relative",width:size,height:size}}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={t.sf2} strokeWidth={stroke}/>
        {segments.map((seg,i)=>{const pct=seg.val/total;const dash=pct*circ;const o=offset;offset+=dash;
          return <circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={seg.color} strokeWidth={hov===i?stroke+4:stroke} strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-o} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"all 0.3s",cursor:"pointer"}} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}/>;
        })}
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div style={{fontSize:20,fontWeight:600,color:t.tx}}>{total}</div>
        <div style={{fontSize:9,color:t.tx3,textTransform:"uppercase",letterSpacing:"0.05em"}}>Total</div>
      </div>
    </div>
  );
}

function HorizBar({items,maxVal}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {items.map((item,i)=>(
        <div key={item.label}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
            <span style={{fontSize:12,fontWeight:500,color:t.tx}}>{item.label}</span>
            <span style={{fontSize:11,color:t.tx3}}>{item.sub}</span>
          </div>
          <ProgressBar pct={(item.val/maxVal)*100} color={item.color} h={6}/>
        </div>
      ))}
    </div>
  );
}

function Sparkline({vals,color=t.acc,w=70,h=24}){
  const max=Math.max(...vals);const min=Math.min(...vals);const range=max-min||1;
  const pts=vals.map((v,i)=>`${(i/(vals.length-1))*w},${h-((v-min)/range)*(h-4)-2}`).join(" ");
  return <svg width={w} height={h} style={{display:"block"}}><polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

/* ═══════════════════ MAIN DASHBOARD ═══════════════════ */
export default function Dashboard() {
  const cars = SAMPLE_CARS;
  const soldCars = cars.filter(c => c.status === "Sold");
  const inStockCars = cars.filter(c => c.status === "In Stock");
  const reservedCars = cars.filter(c => c.status === "Reserved");
  const inServiceCars = cars.filter(c => c.status === "In Service");

  // Stats
  const totalRevenue = soldCars.reduce((s, c) => s + (c.soldInfo?.salePrice || 0), 0);
  const totalCost = soldCars.reduce((s, c) => s + c.cost, 0);
  const totalProfit = totalRevenue - totalCost;
  const totalInventoryValue = cars.filter(c => c.status !== "Sold").reduce((s, c) => s + c.price, 0);
  const avgDays = Math.round(cars.filter(c => c.days > 0).reduce((s, c) => s + c.days, 0) / Math.max(1, cars.filter(c => c.days > 0).length));
  const totalVehicleExpenses = cars.reduce((s, c) => s + c.expenses.reduce((es, e) => es + e.amount, 0), 0);
  const totalBizExpenses = EXPENSE_CATS.reduce((s, e) => s + e.amount, 0);

  // By location
  const milltown = cars.filter(c => c.location === "Milltown");
  const elizabeth = cars.filter(c => c.location === "Elizabeth");
  const milltownRev = milltown.filter(c => c.status === "Sold").reduce((s, c) => s + (c.soldInfo?.salePrice || 0), 0);
  const elizabethRev = elizabeth.filter(c => c.status === "Sold").reduce((s, c) => s + (c.soldInfo?.salePrice || 0), 0);

  // Top makes
  const makeCount = {};
  cars.forEach(c => { makeCount[c.make] = (makeCount[c.make] || 0) + 1; });
  const topMakes = Object.entries(makeCount).sort((a, b) => b[1] - a[1]).slice(0, 6);

  // Inventory status segments
  const statusSegs = [
    {val: inStockCars.length, color: t.grn, label: "In Stock"},
    {val: soldCars.length, color: t.acc, label: "Sold"},
    {val: reservedCars.length, color: t.amb, label: "Reserved"},
    {val: inServiceCars.length, color: t.pur, label: "In Service"},
  ].filter(s => s.val > 0);

  // Recent sales (sorted by date)
  const recentSales = soldCars.sort((a, b) => b.addedAt - a.addedAt).slice(0, 5);

  // Recent additions
  const recentAdded = [...cars].sort((a, b) => b.addedAt - a.addedAt).slice(0, 5);

  // Aging stock (longest on lot, not sold)
  const agingStock = cars.filter(c => c.status !== "Sold" && c.days != null).sort((a, b) => b.days - a.days).slice(0, 5);

  // Alerts
  const alerts = [];
  const aging30 = cars.filter(c => c.status === "In Stock" && c.days > 30);
  if (aging30.length > 0) alerts.push({type:"warning", msg:`${aging30.length} vehicle${aging30.length>1?"s":""} over 30 days on lot`, color:t.amb});
  if (inServiceCars.length > 0) alerts.push({type:"info", msg:`${inServiceCars.length} vehicle${inServiceCars.length>1?"s":""} currently in service`, color:t.pur});
  const lowLoc = LOCATIONS.filter(l => cars.filter(c => c.location === l && c.status === "In Stock").length < 4);
  lowLoc.forEach(l => alerts.push({type:"alert", msg:`Low stock at ${l} (${cars.filter(c=>c.location===l&&c.status==="In Stock").length} in stock)`, color:t.red}));

  return (
    <div style={{minHeight:"100vh",background:t.bg,color:t.tx,fontFamily:"'Outfit',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${t.bdr};border-radius:3px}
        body{font-family:'Outfit',sans-serif;background:${t.bg}}
      `}</style>

      {/* HEADER */}
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 24px",borderBottom:`1px solid ${t.bdr}`,background:t.sf,position:"sticky",top:0,zIndex:20,flexWrap:"wrap",gap:10}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${t.acc},#818cf8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>AD</div>
          <div>
            <h1 style={{fontSize:17,fontWeight:600,letterSpacing:"-0.02em",margin:0}}>Dashboard</h1>
            <span style={{fontSize:10.5,color:t.tx3}}>AutoDealer Pro · March 2026</span>
          </div>
        </div>
        {/* Quick Actions */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button style={{display:"flex",alignItems:"center",gap:5,padding:"8px 14px",borderRadius:9,border:`1px solid ${t.bdr}`,background:t.sf2,color:t.tx2,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>{IC.eye} View Inventory</button>
          <button style={{display:"flex",alignItems:"center",gap:5,padding:"8px 14px",borderRadius:9,border:"none",background:`linear-gradient(135deg,${t.acc},#818cf8)`,color:"#fff",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>{IC.plus} Add Vehicle</button>
        </div>
      </header>

      <div style={{padding:"18px 24px",display:"flex",flexDirection:"column",gap:18}}>

        {/* ═══ ALERTS ═══ */}
        {alerts.length > 0 && (
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {alerts.map((a, i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",borderRadius:10,background:`${a.color}10`,border:`1px solid ${a.color}22`,flex:1,minWidth:200}}>
                <span style={{color:a.color,display:"flex"}}>{IC.alert}</span>
                <span style={{fontSize:12,color:a.color,fontWeight:500}}>{a.msg}</span>
              </div>
            ))}
          </div>
        )}

        {/* ═══ STAT CARDS ═══ */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:10}}>
          <Stat label="Total Revenue" val={fK(totalRevenue)} chg="12.5%" up sub={`${soldCars.length} cars sold`} icon={IC.dollar} delay={0} color={t.grn}/>
          <Stat label="Profit" val={fK(totalProfit)} chg="9.2%" up sub="After costs" icon={IC.trend} delay={60} color={t.grn}/>
          <Stat label="Cars Sold" val={soldCars.length} sub={`${cars.length} total all time`} icon={IC.car} delay={120}/>
          <Stat label="Inventory Value" val={fK(totalInventoryValue)} sub={`${cars.filter(c=>c.status!=="Sold").length} vehicles`} icon={IC.box} delay={180}/>
          <Stat label="Avg Days on Lot" val={`${avgDays}d`} chg="2.1%" up={false} sub="Target: 20 days" icon={IC.clock} delay={240}/>
          <Stat label="Total Expenses" val={fK(totalBizExpenses + totalVehicleExpenses)} sub={`Vehicle: ${fK(totalVehicleExpenses)}`} icon={IC.receipt} delay={300} color={t.red}/>
        </div>

        {/* ═══ INVENTORY STATUS MINI CARDS ═══ */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
          {[
            {l:"In Stock",v:inStockCars.length,c:t.grn,bg:t.grnD},
            {l:"Sold",v:soldCars.length,c:t.acc,bg:t.accD},
            {l:"Reserved",v:reservedCars.length,c:t.amb,bg:t.ambD},
            {l:"In Service",v:inServiceCars.length,c:t.pur,bg:t.purD},
          ].map(s=>(
            <div key={s.l} style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,borderRadius:8,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",color:s.c,fontWeight:600,fontSize:15}}>{s.v}</div>
              <div><div style={{fontSize:11.5,fontWeight:500,color:t.tx}}>{s.l}</div><div style={{fontSize:10,color:t.tx3}}>{Math.round(s.v/cars.length*100)}% of total</div></div>
            </div>
          ))}
        </div>

        {/* ═══ ROW 1: Revenue Chart + Inventory Donut ═══ */}
        <div style={{display:"grid",gridTemplateColumns:"5fr 3fr",gap:14}}>
          <Card s={{padding:"18px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div><div style={{fontSize:13.5,fontWeight:500,color:t.tx}}>Revenue & Profit</div><div style={{fontSize:10.5,color:t.tx3,marginTop:1}}>Monthly overview — 12 months</div></div>
              <div style={{display:"flex",gap:12}}>
                {[["Revenue",t.acc],["Profit",t.grn]].map(([l,c])=><span key={l} style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:t.tx3}}><span style={{width:7,height:7,borderRadius:2,background:c,opacity:.6}}/>{l}</span>)}
              </div>
            </div>
            <BarChart data={MONTHLY_DATA}/>
          </Card>

          <Card s={{padding:"18px 20px",display:"flex",flexDirection:"column"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:2}}>Inventory Status</div>
            <div style={{fontSize:10.5,color:t.tx3,marginBottom:14}}>Current distribution</div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:14}}>
              <DonutChart segments={statusSegs}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:7,marginTop:"auto"}}>
              {statusSegs.map(s=>(
                <div key={s.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{display:"flex",alignItems:"center",gap:6,fontSize:11.5,color:t.tx2}}><span style={{width:7,height:7,borderRadius:2,background:s.color}}/>{s.label}</span>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:12,fontWeight:500,color:t.tx}}>{s.val}</span>
                    <span style={{fontSize:10,color:t.tx3}}>{Math.round(s.val/cars.length*100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ═══ ROW 2: Sales Trend + Top Makes ═══ */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:2}}>Sales Trend</div>
            <div style={{fontSize:10.5,color:t.tx3,marginBottom:12}}>Revenue progression</div>
            <AreaChart data={MONTHLY_DATA}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:14}}>
              {[["Best Month","Dec — "+fK(456000),t.grn],["Avg Monthly",fK(Math.round(MONTHLY_DATA.reduce((s,d)=>s+d.rev,0)/12)),t.acc],["Total Cars Sold",MONTHLY_DATA.reduce((s,d)=>s+d.sold,0).toString(),t.tx]].map(([l,v,c])=>(
                <div key={l}><div style={{fontSize:9.5,color:t.tx3}}>{l}</div><div style={{fontSize:13,fontWeight:500,color:c,marginTop:2}}>{v}</div></div>
              ))}
            </div>
          </Card>

          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>Top Makes in Inventory</div>
            <HorizBar items={topMakes.map(([make,count],i)=>({
              label:make,val:count,sub:`${count} (${Math.round(count/cars.length*100)}%)`,
              color:[t.acc,t.grn,t.pur,t.amb,t.cyn,t.red][i]
            }))} maxVal={topMakes[0]?.[1]||1}/>
          </Card>
        </div>

        {/* ═══ ROW 3: Revenue by Location + Expense Breakdown ═══ */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>Revenue by Location</div>
            <div style={{display:"flex",gap:14}}>
              {[
                {name:"Milltown",rev:milltownRev,cars:milltown.length,inStock:milltown.filter(c=>c.status==="In Stock").length,color:t.acc},
                {name:"Elizabeth",rev:elizabethRev,cars:elizabeth.length,inStock:elizabeth.filter(c=>c.status==="In Stock").length,color:t.pur},
              ].map(loc=>(
                <div key={loc.name} style={{flex:1,background:t.sf2,borderRadius:10,padding:"14px 16px",border:`1px solid ${t.bdr}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <span style={{fontSize:13,fontWeight:600,color:t.tx}}>{loc.name}</span>
                    <span style={{display:"flex",alignItems:"center",gap:3,color:loc.color}}>{IC.mapPin}</span>
                  </div>
                  <div style={{fontSize:20,fontWeight:600,color:loc.color,fontFamily:"monospace",marginBottom:10}}>{fK(loc.rev)}</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                    {[["Total Cars",loc.cars],["In Stock",loc.inStock]].map(([l,v])=>(
                      <div key={l}><div style={{fontSize:9,color:t.tx3,textTransform:"uppercase",letterSpacing:"0.05em"}}>{l}</div><div style={{fontSize:14,fontWeight:500,color:t.tx,marginTop:1}}>{v}</div></div>
                    ))}
                  </div>
                  <div style={{marginTop:10}}><ProgressBar pct={loc.rev/Math.max(milltownRev,elizabethRev,1)*100} color={loc.color}/></div>
                </div>
              ))}
            </div>
          </Card>

          <Card s={{padding:"18px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div><div style={{fontSize:13.5,fontWeight:500,color:t.tx}}>Expense Breakdown</div><div style={{fontSize:10.5,color:t.tx3,marginTop:1}}>Monthly business expenses</div></div>
              <span style={{fontSize:14,fontWeight:600,color:t.red}}>{fK(totalBizExpenses)}</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {EXPENSE_CATS.sort((a,b)=>b.amount-a.amount).slice(0,6).map(e=>(
                <div key={e.cat}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:12,fontWeight:500,color:t.tx}}>{e.cat}</span>
                    <span style={{fontSize:11.5,fontFamily:"monospace",color:t.tx2}}>{fK(e.amount)}</span>
                  </div>
                  <ProgressBar pct={(e.amount/EXPENSE_CATS[0].amount)*100} color={e.color}/>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ═══ ROW 4: Recent Sales + Recent Additions ═══ */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <Card s={{padding:"18px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:13.5,fontWeight:500,color:t.tx}}>Recent Sales</div>
              <span style={{fontSize:11,color:t.acc,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}>View all {IC.chR}</span>
            </div>
            {recentSales.length === 0 ? (
              <div style={{padding:20,textAlign:"center",color:t.tx3,fontSize:12}}>No sales yet</div>
            ) : recentSales.map((car, i) => {
              const profit = (car.soldInfo?.salePrice || 0) - car.cost - car.expenses.reduce((s,e)=>s+e.amount,0);
              return (
                <div key={car.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<recentSales.length-1?`1px solid ${t.bdr}`:"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:32,height:32,borderRadius:7,background:t.accD,display:"flex",alignItems:"center",justifyContent:"center",color:t.acc}}>{IC.car}</div>
                    <div>
                      <div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{car.year} {car.make} {car.model}</div>
                      <div style={{fontSize:10,color:t.tx3}}>{car.soldInfo?.buyer} · {car.soldInfo?.date}</div>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:12.5,fontWeight:600,color:t.grn}}>{fmt(car.soldInfo?.salePrice || 0)}</div>
                    <div style={{fontSize:10,color:profit>0?t.grn:t.red}}>Profit: {fK(profit)}</div>
                  </div>
                </div>
              );
            })}
          </Card>

          <Card s={{padding:"18px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:13.5,fontWeight:500,color:t.tx}}>Recently Added</div>
              <span style={{fontSize:11,color:t.acc,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}>View all {IC.chR}</span>
            </div>
            {recentAdded.map((car, i) => (
              <div key={car.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<recentAdded.length-1?`1px solid ${t.bdr}`:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:32,height:32,borderRadius:7,background:t.grnD,display:"flex",alignItems:"center",justifyContent:"center",color:t.grn}}>{IC.plus}</div>
                  <div>
                    <div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{car.year} {car.make} {car.model}</div>
                    <div style={{fontSize:10,color:t.tx3}}>{car.color} · {car.location}</div>
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:12.5,fontWeight:500,fontFamily:"monospace",color:t.tx}}>{fK(car.price)}</div>
                  <Badge s={car.status}/>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* ═══ ROW 5: Aging Stock + Location Capacity ═══ */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <Card s={{padding:"18px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div>
                <div style={{fontSize:13.5,fontWeight:500,color:t.tx}}>Aging Stock</div>
                <div style={{fontSize:10.5,color:t.tx3}}>Longest days on lot</div>
              </div>
              <span style={{color:t.amb,display:"flex"}}>{IC.alert}</span>
            </div>
            {agingStock.map((car, i) => (
              <div key={car.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<agingStock.length-1?`1px solid ${t.bdr}`:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:32,height:32,borderRadius:7,background:car.days>30?t.ambD:t.sf2,display:"flex",alignItems:"center",justifyContent:"center",color:car.days>30?t.amb:t.tx3,fontSize:11,fontWeight:600}}>{car.days}d</div>
                  <div>
                    <div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{car.year} {car.make} {car.model}</div>
                    <div style={{fontSize:10,color:t.tx3}}>{car.location} · {car.color}</div>
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:12.5,fontWeight:500,fontFamily:"monospace",color:t.tx}}>{fK(car.price)}</div>
                  <Badge s={car.status}/>
                </div>
              </div>
            ))}
          </Card>

          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>Location Capacity</div>
            {[
              {name:"Milltown",data:milltown,cap:60,color:t.acc},
              {name:"Elizabeth",data:elizabeth,cap:40,color:t.pur},
            ].map(loc=>{
              const inStock=loc.data.filter(c=>c.status==="In Stock").length;
              const total=loc.data.length;
              const pct=Math.round(total/loc.cap*100);
              const soldLoc=loc.data.filter(c=>c.status==="Sold").length;
              const reservedLoc=loc.data.filter(c=>c.status==="Reserved").length;
              const serviceLoc=loc.data.filter(c=>c.status==="In Service").length;
              return(
                <div key={loc.name} style={{marginBottom:18}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{color:loc.color,display:"flex"}}>{IC.mapPin}</span>
                      <span style={{fontSize:13,fontWeight:600,color:t.tx}}>{loc.name}</span>
                    </div>
                    <span style={{fontSize:11.5,color:loc.color,fontWeight:500}}>{pct}% · {total}/{loc.cap}</span>
                  </div>
                  <ProgressBar pct={pct} color={loc.color} h={7}/>
                  <div style={{display:"flex",gap:4,height:14,borderRadius:3,overflow:"hidden",marginTop:8}}>
                    {[{v:inStock,c:t.grn},{v:soldLoc,c:t.acc},{v:reservedLoc,c:t.amb},{v:serviceLoc,c:t.pur}].filter(s=>s.v>0).map((s,i)=><div key={i} style={{flex:s.v,background:s.c,minWidth:s.v>0?6:0}}/>)}
                  </div>
                  <div style={{display:"flex",gap:10,marginTop:8,flexWrap:"wrap"}}>
                    {[["In Stock",inStock,t.grn],["Sold",soldLoc,t.acc],["Reserved",reservedLoc,t.amb],["Service",serviceLoc,t.pur]].map(([l,v,c])=>(
                      <span key={l} style={{fontSize:10,color:t.tx3,display:"flex",alignItems:"center",gap:3}}><span style={{width:5,height:5,borderRadius:1.5,background:c}}/>{l}: {v}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </Card>
        </div>

      </div>
    </div>
  );
}
