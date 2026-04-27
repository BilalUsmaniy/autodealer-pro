import { useState, useMemo, useEffect } from "react";

/* ═══════════════════ THEME ═══════════════════ */
const t = {
  bg:"#07070a",sf:"#0e0e13",sf2:"#131318",card:"#101015",cardH:"#17171e",
  bdr:"#1d1d26",bdr2:"#282832",tx:"#ededf0",tx2:"#888894",tx3:"#50505c",
  acc:"#5b8def",accD:"rgba(91,141,239,0.1)",
  grn:"#34d399",grnD:"rgba(52,211,153,0.1)",red:"#f87171",redD:"rgba(248,113,113,0.1)",
  amb:"#fbbf24",ambD:"rgba(251,191,36,0.1)",pur:"#a78bfa",purD:"rgba(167,139,250,0.1)",
  cyn:"#22d3ee",cynD:"rgba(34,211,238,0.1)",inp:"#0b0b10",ov:"rgba(0,0,0,0.75)",
  pink:"#f472b6",pinkD:"rgba(244,114,182,0.1)",lime:"#a3e635",limeD:"rgba(163,230,53,0.1)",
};

/* ═══════════════════ ICONS ═══════════════════ */
const IC = {
  trend:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  car:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17v1a1 1 0 001 1h1a1 1 0 001-1v-1m10 0v1a1 1 0 001 1h1a1 1 0 001-1v-1"/><circle cx="7.5" cy="14" r="1.5"/><circle cx="16.5" cy="14" r="1.5"/></svg>,
  dollar:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  clock:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  calendar:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  star:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  search:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  filter:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  dl:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  reset:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>,
  x:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  eye:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  aUp:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  aDn:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  chL:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>,
  chR:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>,
  mapPin:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  user:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  badge:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>,
};

/* ═══════════════════ SAMPLE SALES DATA ═══════════════════ */
const SALESPERSONS = ["Sarah Kim","Mike Reeves","Tom Liu","Ana Martinez","Derek Brown"];
const METHODS = ["Cash","Finance","Lease"];

const SALES_DATA = [
  {id:1,year:2024,make:"Tesla",model:"Model S Plaid",color:"Pearl White",buyer:"James Mitchell",salesperson:"Sarah Kim",method:"Finance",cost:94500,salePrice:108990,expenses:0,date:"Mar 1, 2026",daysToSell:18,location:"Elizabeth"},
  {id:2,year:2024,make:"Toyota",model:"GR Supra",color:"Blue",buyer:"Elena Rodriguez",salesperson:"Mike Reeves",method:"Cash",cost:49800,salePrice:57500,expenses:400,date:"Feb 25, 2026",daysToSell:22,location:"Milltown"},
  {id:3,year:2024,make:"BMW",model:"M3 CS",color:"Black",buyer:"David Chen",salesperson:"Sarah Kim",method:"Finance",cost:66000,salePrice:77000,expenses:0,date:"Feb 20, 2026",daysToSell:14,location:"Milltown"},
  {id:4,year:2023,make:"Mercedes-Benz",model:"GLE 63S",color:"White",buyer:"Priya Sharma",salesperson:"Ana Martinez",method:"Lease",cost:102000,salePrice:118000,expenses:600,date:"Feb 28, 2026",daysToSell:30,location:"Elizabeth"},
  {id:5,year:2024,make:"Audi",model:"RS7",color:"Metallic Gray",buyer:"Marcus Thompson",salesperson:"Tom Liu",method:"Finance",cost:108000,salePrice:124500,expenses:0,date:"Mar 3, 2026",daysToSell:12,location:"Elizabeth"},
  {id:6,year:2023,make:"Porsche",model:"Cayenne GTS",color:"Black",buyer:"Sofia Petrov",salesperson:"Sarah Kim",method:"Cash",cost:88000,salePrice:105000,expenses:1200,date:"Feb 15, 2026",daysToSell:35,location:"Milltown"},
  {id:7,year:2024,make:"Land Rover",model:"Range Rover Velar",color:"Gray",buyer:"Ryan O'Brien",salesperson:"Mike Reeves",method:"Finance",cost:62000,salePrice:72500,expenses:800,date:"Feb 10, 2026",daysToSell:20,location:"Elizabeth"},
  {id:8,year:2024,make:"Lexus",model:"LC 500",color:"Red",buyer:"Mei Tanaka",salesperson:"Ana Martinez",method:"Cash",cost:78000,salePrice:94500,expenses:0,date:"Jan 28, 2026",daysToSell:16,location:"Milltown"},
  {id:9,year:2023,make:"BMW",model:"X5 M",color:"Midnight Blue",buyer:"Carlos Garcia",salesperson:"Tom Liu",method:"Lease",cost:85000,salePrice:98000,expenses:500,date:"Jan 20, 2026",daysToSell:28,location:"Elizabeth"},
  {id:10,year:2024,make:"Mercedes-Benz",model:"AMG C 63",color:"White",buyer:"Natasha Williams",salesperson:"Sarah Kim",method:"Finance",cost:72000,salePrice:84000,expenses:0,date:"Jan 15, 2026",daysToSell:10,location:"Milltown"},
  {id:11,year:2024,make:"Genesis",model:"G70",color:"Silver",buyer:"Ahmed Al-Rashid",salesperson:"Derek Brown",method:"Cash",cost:42000,salePrice:49800,expenses:300,date:"Jan 10, 2026",daysToSell:25,location:"Elizabeth"},
  {id:12,year:2023,make:"Porsche",model:"Taycan 4S",color:"White",buyer:"Isabella Rossi",salesperson:"Mike Reeves",method:"Finance",cost:95000,salePrice:112000,expenses:0,date:"Jan 5, 2026",daysToSell:19,location:"Milltown"},
  {id:13,year:2024,make:"Chevrolet",model:"Corvette",color:"Orange",buyer:"Liam Foster",salesperson:"Ana Martinez",method:"Cash",cost:62000,salePrice:74500,expenses:0,date:"Dec 28, 2025",daysToSell:15,location:"Elizabeth"},
  {id:14,year:2024,make:"Audi",model:"Q8 e-tron",color:"Black",buyer:"Zara Patel",salesperson:"Tom Liu",method:"Lease",cost:74000,salePrice:86500,expenses:900,date:"Dec 20, 2025",daysToSell:32,location:"Milltown"},
  {id:15,year:2023,make:"Ferrari",model:"Roma",color:"Red",buyer:"Daniel Hawk",salesperson:"Sarah Kim",method:"Cash",cost:225000,salePrice:265000,expenses:2000,date:"Dec 15, 2025",daysToSell:8,location:"Elizabeth"},
];

const MONTHLY_SALES = [
  {m:"Apr",rev:185000,profit:28000,sold:3},{m:"May",rev:225000,profit:34000,sold:4},
  {m:"Jun",rev:198000,profit:29000,sold:3},{m:"Jul",rev:312000,profit:48000,sold:5},
  {m:"Aug",rev:278000,profit:41000,sold:4},{m:"Sep",rev:345000,profit:54000,sold:6},
  {m:"Oct",rev:298000,profit:43000,sold:5},{m:"Nov",rev:410000,profit:65000,sold:7},
  {m:"Dec",rev:425500,profit:68000,sold:3},{m:"Jan",rev:438300,profit:70000,sold:4},
  {m:"Feb",rev:429500,profit:62000,sold:4},{m:"Mar",rev:310490,profit:52000,sold:3},
];

/* ═══════════════════ HELPERS ═══════════════════ */
const fmt = n => "$" + n.toLocaleString();
const fK = n => n>=1e6?"$"+(n/1e6).toFixed(2)+"M":n>=1e3?"$"+(n/1e3).toFixed(1)+"K":"$"+n;

/* ═══════════════════ COMPONENTS ═══════════════════ */
function Card({children,s={}}){return <div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:14,...s}}>{children}</div>}

function Stat({label,val,chg,up,sub,icon,delay=0,color}){
  const[v,setV]=useState(false);
  useEffect(()=>{const tm=setTimeout(()=>setV(true),delay);return()=>clearTimeout(tm)},[]);
  return(
    <div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:13,padding:"16px 18px",flex:1,minWidth:150,opacity:v?1:0,transform:v?"translateY(0)":"translateY(10px)",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <span style={{fontSize:10,color:t.tx3,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:500}}>{label}</span>
        {icon&&<span style={{color:color||t.tx3,opacity:.6,display:"flex"}}>{icon}</span>}
      </div>
      <div style={{display:"flex",alignItems:"baseline",gap:8}}>
        <span style={{fontSize:22,fontWeight:600,color:color||t.tx,letterSpacing:"-0.02em"}}>{val}</span>
        {chg&&<span style={{display:"inline-flex",alignItems:"center",gap:2,fontSize:10.5,fontWeight:500,color:up?t.grn:t.red}}>{up?IC.aUp:IC.aDn}{chg}</span>}
      </div>
      {sub&&<div style={{fontSize:10,color:t.tx3,marginTop:2}}>{sub}</div>}
    </div>
  );
}

function Btn({children,v="default",onClick,s={},disabled}){
  const base={border:"none",borderRadius:9,cursor:disabled?"default":"pointer",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:500,display:"inline-flex",alignItems:"center",gap:5,transition:"all 0.15s",opacity:disabled?0.5:1,...s};
  const vs={primary:{...base,background:`linear-gradient(135deg,${t.acc},#818cf8)`,color:"#fff",padding:"8px 16px"},default:{...base,background:t.sf2,border:`1px solid ${t.bdr}`,color:t.tx2,padding:"7px 13px"},ghost:{...base,background:"transparent",color:t.tx3,padding:"7px 10px"}};
  return <button onClick={onClick} disabled={disabled} style={vs[v]||vs.default}>{children}</button>;
}

function ProgressBar({pct,color,h=5}){
  return <div style={{height:h,borderRadius:h,background:t.sf2,width:"100%"}}><div style={{height:"100%",borderRadius:h,background:color,width:`${Math.min(100,pct)}%`,transition:"width 0.8s cubic-bezier(0.16,1,0.3,1)"}}/></div>;
}

function Pagination({total,page,perPage,onPage}){
  const pages=Math.ceil(total/perPage);if(pages<=1)return null;
  return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderTop:`1px solid ${t.bdr}`}}>
      <span style={{fontSize:11.5,color:t.tx3}}>Showing {(page-1)*perPage+1}–{Math.min(page*perPage,total)} of {total}</span>
      <div style={{display:"flex",gap:3}}>
        <Btn onClick={()=>onPage(Math.max(1,page-1))} disabled={page===1}>{IC.chL}</Btn>
        {Array.from({length:Math.min(pages,7)},(_,i)=>{let p=i+1;if(pages>7){const start=Math.max(1,Math.min(page-3,pages-6));p=start+i;}
          return <button key={p} onClick={()=>onPage(p)} style={{width:28,height:28,borderRadius:6,border:"none",background:p===page?t.accD:"transparent",color:p===page?t.acc:t.tx3,fontSize:11.5,fontWeight:p===page?600:400,cursor:"pointer",fontFamily:"inherit"}}>{p}</button>;
        })}
        <Btn onClick={()=>onPage(Math.min(pages,page+1))} disabled={page===pages}>{IC.chR}</Btn>
      </div>
    </div>
  );
}

function Modal({open,onClose,title,children,w=600}){
  if(!open)return null;
  return(
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

/* ═══════════════════ CHARTS ═══════════════════ */
function BarChart({data,h=150}){
  const max=Math.max(...data.map(d=>d.rev));const bw=Math.max(8,240/data.length);const[hov,setHov]=useState(null);
  return(
    <svg width="100%" viewBox={`0 0 ${data.length*(bw+5)} ${h+28}`} preserveAspectRatio="xMidYMid meet" style={{display:"block"}}>
      {data.map((d,i)=>{const bh=(d.rev/max)*h;const ph=(d.profit/max)*h;const x=i*(bw+5);const isH=hov===i;
        return(<g key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{cursor:"pointer"}}>
          <rect x={x} y={h-bh} width={bw} height={bh} rx={3} fill={isH?t.acc:t.accD} style={{transition:"fill 0.2s"}}/>
          <rect x={x} y={h-ph} width={bw} height={ph} rx={3} fill={isH?t.grn:t.grnD} style={{transition:"fill 0.2s",opacity:.9}}/>
          <text x={x+bw/2} y={h+14} textAnchor="middle" fill={t.tx3} fontSize="8.5" fontFamily="'Outfit',sans-serif">{d.m}</text>
          {isH&&<><rect x={Math.max(0,x+bw/2-55)} y={h-bh-34} width={110} height={26} rx={5} fill={t.sf} stroke={t.bdr}/><text x={x+bw/2} y={h-bh-17} textAnchor="middle" fill={t.tx} fontSize="9" fontWeight="500" fontFamily="monospace">{fK(d.rev)} rev · {fK(d.profit)} profit</text></>}
        </g>);
      })}
    </svg>
  );
}

function AreaChart({data,h=80,color=t.grn}){
  const vals=data.map(d=>d.profit);const max=Math.max(...vals);const min=Math.min(...vals)*0.85;const range=max-min||1;const w=260;
  const pts=vals.map((v,i)=>`${(i/(vals.length-1))*w},${h-((v-min)/range)*(h-8)-4}`).join(" ");
  return(
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet" style={{display:"block"}}>
      <defs><linearGradient id="profitG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".2"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#profitG)"/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {vals.map((v,i)=>{const x=(i/(vals.length-1))*w;const y=h-((v-min)/range)*(h-8)-4;return i===vals.length-1?<circle key={i} cx={x} cy={y} r="3.5" fill={color} stroke={t.card} strokeWidth="2"/>:null})}
    </svg>
  );
}

function DonutChart({segments,size=120,stroke=13}){
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
        <div style={{fontSize:18,fontWeight:600,color:t.tx}}>{total}</div>
        <div style={{fontSize:8.5,color:t.tx3,textTransform:"uppercase",letterSpacing:"0.05em"}}>Sales</div>
      </div>
    </div>
  );
}

/* ═══════════════════ MAIN SALES PAGE ═══════════════════ */
export default function SalesPage() {
  const sales = SALES_DATA;

  // Filters
  const [search, setSearch] = useState("");
  const [fMethod, setFMethod] = useState("All");
  const [fSalesperson, setFSalesperson] = useState("All");
  const [fLocation, setFLocation] = useState("All");
  const [fMonth, setFMonth] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [pg, setPg] = useState(1);
  const PP = 8;
  const [sortK, setSortK] = useState(null);
  const [sortD, setSortD] = useState("desc");
  const [detail, setDetail] = useState(null);
  const [hovR, setHovR] = useState(null);

  const hasFilters = fMethod!=="All"||fSalesperson!=="All"||fLocation!=="All"||fMonth!=="All"||search;
  const resetFilters = () => {setFMethod("All");setFSalesperson("All");setFLocation("All");setFMonth("All");setSearch("");setSortK(null);setSortD("desc");setPg(1)};

  const months = useMemo(() => ["All",...new Set(sales.map(s => {const parts = s.date.split(" ");return parts[0]+" "+parts[2]}))],[sales]);

  const filtered = useMemo(() => {
    let l = [...sales];
    if (fMethod !== "All") l = l.filter(s => s.method === fMethod);
    if (fSalesperson !== "All") l = l.filter(s => s.salesperson === fSalesperson);
    if (fLocation !== "All") l = l.filter(s => s.location === fLocation);
    if (fMonth !== "All") l = l.filter(s => {const p=s.date.split(" ");return (p[0]+" "+p[2])===fMonth});
    if (search) { const q = search.toLowerCase(); l = l.filter(s => `${s.year} ${s.make} ${s.model} ${s.buyer} ${s.salesperson}`.toLowerCase().includes(q)); }
    if (sortK) {
      l.sort((a,b) => {
        let av, bv;
        if (sortK === "netProfit") { av = a.salePrice-a.cost-a.expenses; bv = b.salePrice-b.cost-b.expenses; }
        else if (sortK === "margin") { av = (a.salePrice-a.cost-a.expenses)/a.cost*100; bv = (b.salePrice-b.cost-b.expenses)/b.cost*100; }
        else { av = a[sortK]; bv = b[sortK]; }
        if (typeof av === "number") return sortD==="asc"?av-bv:bv-av;
        return sortD==="asc"?String(av).localeCompare(String(bv)):String(bv).localeCompare(String(av));
      });
    }
    return l;
  }, [sales, fMethod, fSalesperson, fLocation, fMonth, search, sortK, sortD]);

  const paged = filtered.slice((pg-1)*PP, pg*PP);
  const handleSort = k => { if(sortK===k) setSortD(d=>d==="asc"?"desc":"asc"); else {setSortK(k);setSortD("asc")} };

  // Stats
  const totalRevenue = sales.reduce((s,x) => s+x.salePrice, 0);
  const totalCost = sales.reduce((s,x) => s+x.cost, 0);
  const totalExpenses = sales.reduce((s,x) => s+x.expenses, 0);
  const totalProfit = totalRevenue - totalCost - totalExpenses;
  const avgProfit = sales.length ? Math.round(totalProfit / sales.length) : 0;
  const avgDaysToSell = sales.length ? Math.round(sales.reduce((s,x) => s+x.daysToSell, 0) / sales.length) : 0;
  const bestMonth = MONTHLY_SALES.reduce((best,m) => m.rev > best.rev ? m : best, MONTHLY_SALES[0]);

  // Chart data
  const methodCounts = {};
  sales.forEach(s => { methodCounts[s.method] = (methodCounts[s.method]||0) + 1 });
  const methodSegs = [
    {val: methodCounts["Finance"]||0, color: t.acc, label: "Finance"},
    {val: methodCounts["Cash"]||0, color: t.grn, label: "Cash"},
    {val: methodCounts["Lease"]||0, color: t.pur, label: "Lease"},
  ].filter(s => s.val > 0);

  const locationRev = {};
  sales.forEach(s => { locationRev[s.location] = (locationRev[s.location]||0) + s.salePrice });

  const makeCounts = {};
  sales.forEach(s => { makeCounts[s.make] = (makeCounts[s.make]||0) + 1 });
  const topMakes = Object.entries(makeCounts).sort((a,b) => b[1]-a[1]).slice(0,6);

  const spPerf = {};
  sales.forEach(s => {
    if (!spPerf[s.salesperson]) spPerf[s.salesperson] = {sales:0,revenue:0,profit:0};
    spPerf[s.salesperson].sales++;
    spPerf[s.salesperson].revenue += s.salePrice;
    spPerf[s.salesperson].profit += s.salePrice - s.cost - s.expenses;
  });
  const spList = Object.entries(spPerf).sort((a,b) => b[1].revenue - a[1].revenue);

  // Export
  const exportCSV = () => {
    const h = "Date,Vehicle,Buyer,Salesperson,Method,Location,Cost,Sale Price,Expenses,Net Profit,Margin %\n";
    const r = filtered.map(s => {
      const np = s.salePrice-s.cost-s.expenses;
      return `${s.date},"${s.year} ${s.make} ${s.model}","${s.buyer}","${s.salesperson}",${s.method},${s.location},${s.cost},${s.salePrice},${s.expenses},${np},${(np/s.cost*100).toFixed(1)}%`;
    }).join("\n");
    const b = new Blob([h+r],{type:"text/csv"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download="sales-history.csv";a.click();
  };

  const thS = {textAlign:"left",padding:"10px 12px",fontSize:10,color:t.tx3,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.06em",cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"};

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
            <h1 style={{fontSize:17,fontWeight:600,letterSpacing:"-0.02em",margin:0}}>Sales</h1>
            <span style={{fontSize:10.5,color:t.tx3}}>{sales.length} total sales · {fK(totalRevenue)} revenue</span>
          </div>
        </div>
        <Btn onClick={exportCSV}>{IC.dl} Export CSV</Btn>
      </header>

      <div style={{padding:"18px 24px",display:"flex",flexDirection:"column",gap:18}}>

        {/* ═══ STAT CARDS ═══ */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:10}}>
          <Stat label="Total Revenue" val={fK(totalRevenue)} chg="12.5%" up sub={`${sales.length} cars sold`} icon={IC.dollar} delay={0} color={t.grn}/>
          <Stat label="Total Profit" val={fK(totalProfit)} chg="9.2%" up sub={`After ${fK(totalExpenses)} expenses`} icon={IC.trend} delay={60} color={t.grn}/>
          <Stat label="Cars Sold" val={sales.length} sub="All time" icon={IC.car} delay={120}/>
          <Stat label="Avg Profit/Sale" val={fK(avgProfit)} sub="Net after expenses" icon={IC.dollar} delay={180}/>
          <Stat label="Avg Days to Sell" val={`${avgDaysToSell}d`} sub="Target: 20 days" icon={IC.clock} delay={240}/>
          <Stat label="Best Month" val={bestMonth.m} sub={fK(bestMonth.rev) + " revenue"} icon={IC.star} delay={300} color={t.amb}/>
        </div>

        {/* ═══ ROW 1: Revenue Chart + Payment Method Donut ═══ */}
        <div style={{display:"grid",gridTemplateColumns:"5fr 3fr",gap:14}}>
          <Card s={{padding:"18px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div><div style={{fontSize:13.5,fontWeight:500,color:t.tx}}>Monthly Sales Revenue</div><div style={{fontSize:10.5,color:t.tx3,marginTop:1}}>Revenue & profit — 12 months</div></div>
              <div style={{display:"flex",gap:12}}>
                {[["Revenue",t.acc],["Profit",t.grn]].map(([l,c])=><span key={l} style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:t.tx3}}><span style={{width:7,height:7,borderRadius:2,background:c,opacity:.6}}/>{l}</span>)}
              </div>
            </div>
            <BarChart data={MONTHLY_SALES}/>
          </Card>

          <Card s={{padding:"18px 20px",display:"flex",flexDirection:"column"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:2}}>Payment Methods</div>
            <div style={{fontSize:10.5,color:t.tx3,marginBottom:14}}>By transaction type</div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:14}}>
              <DonutChart segments={methodSegs}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:"auto"}}>
              {methodSegs.map(s=>{
                const rev = sales.filter(x=>x.method===s.label).reduce((sum,x)=>sum+x.salePrice,0);
                return(
                  <div key={s.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{display:"flex",alignItems:"center",gap:6,fontSize:11.5,color:t.tx2}}><span style={{width:7,height:7,borderRadius:2,background:s.color}}/>{s.label}</span>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:11.5,fontWeight:500,color:t.tx}}>{s.val} sales</span>
                      <span style={{fontSize:10,color:t.tx3}}>{fK(rev)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ═══ ROW 2: Profit Trend + Sales by Location ═══ */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:2}}>Profit Trend</div>
            <div style={{fontSize:10.5,color:t.tx3,marginBottom:12}}>Monthly net profit</div>
            <AreaChart data={MONTHLY_SALES} color={t.grn}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:14}}>
              {[["Best Profit",fK(Math.max(...MONTHLY_SALES.map(d=>d.profit))),t.grn],["Avg Monthly",fK(Math.round(MONTHLY_SALES.reduce((s,d)=>s+d.profit,0)/12)),t.acc],["Total Profit",fK(MONTHLY_SALES.reduce((s,d)=>s+d.profit,0)),t.grn]].map(([l,v,c])=>(
                <div key={l}><div style={{fontSize:9.5,color:t.tx3}}>{l}</div><div style={{fontSize:13,fontWeight:500,color:c,marginTop:2}}>{v}</div></div>
              ))}
            </div>
          </Card>

          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>Sales by Location</div>
            <div style={{display:"flex",gap:12}}>
              {[{name:"Milltown",color:t.acc},{name:"Elizabeth",color:t.pur}].map(loc=>{
                const locSales = sales.filter(s=>s.location===loc.name);
                const locRev = locSales.reduce((s,x)=>s+x.salePrice,0);
                const locProfit = locSales.reduce((s,x)=>s+x.salePrice-x.cost-x.expenses,0);
                return(
                  <div key={loc.name} style={{flex:1,background:t.sf2,borderRadius:10,padding:"14px 16px",border:`1px solid ${t.bdr}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:10}}>
                      <span style={{color:loc.color,display:"flex"}}>{IC.mapPin}</span>
                      <span style={{fontSize:13,fontWeight:600,color:t.tx}}>{loc.name}</span>
                    </div>
                    <div style={{fontSize:20,fontWeight:600,color:loc.color,fontFamily:"monospace",marginBottom:8}}>{fK(locRev)}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                      {[["Sales",locSales.length],["Profit",fK(locProfit)]].map(([l,v])=>(
                        <div key={l}><div style={{fontSize:9,color:t.tx3,textTransform:"uppercase"}}>{l}</div><div style={{fontSize:13,fontWeight:500,color:t.tx,marginTop:1}}>{v}</div></div>
                      ))}
                    </div>
                    <div style={{marginTop:8}}><ProgressBar pct={locRev/Math.max(...Object.values(locationRev),1)*100} color={loc.color}/></div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ═══ ROW 3: Top Makes + Salesperson Performance ═══ */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>Top Sold Makes</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {topMakes.map(([make,count],i)=>{
                const cols=[t.acc,t.grn,t.pur,t.amb,t.cyn,t.red];
                const rev = sales.filter(s=>s.make===make).reduce((s,x)=>s+x.salePrice,0);
                return(
                  <div key={make}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                      <span style={{fontSize:12,fontWeight:500,color:t.tx}}>{make}</span>
                      <span style={{fontSize:11,color:t.tx3}}>{count} sold · {fK(rev)}</span>
                    </div>
                    <ProgressBar pct={(count/topMakes[0][1])*100} color={cols[i]} h={6}/>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>Salesperson Performance</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {spList.map(([name,data],i)=>{
                const cols=[t.acc,t.grn,t.pur,t.amb,t.cyn];
                return(
                  <div key={name} style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:32,height:32,borderRadius:"50%",background:`${cols[i]}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10.5,fontWeight:600,color:cols[i],flexShrink:0}}>{name.split(" ").map(n=>n[0]).join("")}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                        <span style={{fontSize:12,fontWeight:500,color:t.tx}}>{name}</span>
                        <span style={{fontSize:11,color:t.tx3}}>{data.sales} sales · {fK(data.revenue)}</span>
                      </div>
                      <ProgressBar pct={(data.revenue/spList[0][1].revenue)*100} color={cols[i]}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ═══ SALES HISTORY TABLE ═══ */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div style={{fontSize:14,fontWeight:600,color:t.tx}}>Sales History</div>
          <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{display:"flex",alignItems:"center",gap:5,background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"6px 10px",minWidth:170}}>
              <span style={{color:t.tx3,display:"flex"}}>{IC.search}</span>
              <input placeholder="Search buyer, car, salesperson..." value={search} onChange={e=>{setSearch(e.target.value);setPg(1)}}
                style={{background:"none",border:"none",outline:"none",color:t.tx,fontSize:12,width:"100%",fontFamily:"inherit"}}/>
              {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex"}}>{IC.x}</button>}
            </div>
            <Btn onClick={()=>setShowFilters(!showFilters)} s={{background:showFilters?t.accD:t.sf2,color:showFilters?t.acc:t.tx2}}>
              {IC.filter} Filters {hasFilters&&<span style={{width:6,height:6,borderRadius:"50%",background:t.acc}}/>}
            </Btn>
            {hasFilters&&<Btn v="ghost" onClick={resetFilters}>{IC.reset} Reset</Btn>}
          </div>
        </div>

        {/* Filter bar */}
        {showFilters && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:8,padding:"14px 16px",background:t.card,borderRadius:12,border:`1px solid ${t.bdr}`}}>
            {[
              {label:"Method",val:fMethod,set:setFMethod,opts:["All",...METHODS]},
              {label:"Salesperson",val:fSalesperson,set:setFSalesperson,opts:["All",...SALESPERSONS]},
              {label:"Location",val:fLocation,set:setFLocation,opts:["All","Milltown","Elizabeth"]},
              {label:"Month",val:fMonth,set:setFMonth,opts:months},
            ].map(f=>(
              <div key={f.label} style={{display:"flex",flexDirection:"column",gap:4}}>
                <label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{f.label}</label>
                <select value={f.val} onChange={e=>{f.set(e.target.value);setPg(1)}}
                  style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none",appearance:"auto"}}>
                  {f.opts.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}

        <div style={{fontSize:11.5,color:t.tx3}}>{filtered.length} sale{filtered.length!==1?"s":""} found</div>

        <Card s={{overflow:"hidden"}}>
          <div style={{overflow:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:1150}}>
              <thead><tr style={{borderBottom:`1px solid ${t.bdr}`}}>
                {[["Date","date"],["Vehicle","make"],["Buyer","buyer"],["Salesperson","salesperson"],["Method","method"],["Location","location"],["Cost","cost"],["Sale Price","salePrice"],["Expenses","expenses"],["Net Profit","netProfit"],["Margin %","margin"],["",null]].map(([h,k])=>(
                  <th key={h||"act"} style={thS} onClick={()=>k&&handleSort(k)}>
                    <span style={{display:"inline-flex",alignItems:"center",gap:2}}>{h}{sortK===k&&(sortD==="asc"?IC.aUp:IC.aDn)}</span>
                  </th>
                ))}
              </tr></thead>
              <tbody>
                {paged.map((sale,i)=>{
                  const netProfit = sale.salePrice - sale.cost - sale.expenses;
                  const marginPct = sale.cost > 0 ? ((netProfit / sale.cost) * 100).toFixed(1) : "0.0";
                  const isHov = hovR === sale.id;
                  const methodColors = {Finance:t.acc,Cash:t.grn,Lease:t.pur};
                  return(
                    <tr key={sale.id} onMouseEnter={()=>setHovR(sale.id)} onMouseLeave={()=>setHovR(null)}
                      style={{borderBottom:i<paged.length-1?`1px solid ${t.bdr}`:"none",background:isHov?t.cardH:"transparent",transition:"background 0.1s",cursor:"pointer"}}
                      onClick={()=>setDetail(sale)}>
                      <td style={{padding:"10px 12px",fontSize:11.5,color:t.tx2,whiteSpace:"nowrap"}}>{sale.date}</td>
                      <td style={{padding:"10px 12px"}}>
                        <div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{sale.year} {sale.make} {sale.model}</div>
                        <div style={{fontSize:10,color:t.tx3}}>{sale.color}</div>
                      </td>
                      <td style={{padding:"10px 12px",fontSize:12,color:t.tx2}}>{sale.buyer}</td>
                      <td style={{padding:"10px 12px",fontSize:12,color:t.tx2}}>{sale.salesperson}</td>
                      <td style={{padding:"10px 12px"}}>
                        <span style={{padding:"2px 8px",borderRadius:5,fontSize:10.5,background:`${methodColors[sale.method]}15`,color:methodColors[sale.method],fontWeight:500,border:`1px solid ${methodColors[sale.method]}25`}}>{sale.method}</span>
                      </td>
                      <td style={{padding:"10px 12px",fontSize:11.5,color:t.tx2}}>{sale.location}</td>
                      <td style={{padding:"10px 12px",fontSize:11.5,fontFamily:"monospace",color:t.tx2}}>{fK(sale.cost)}</td>
                      <td style={{padding:"10px 12px",fontSize:11.5,fontWeight:500,fontFamily:"monospace",color:t.tx}}>{fK(sale.salePrice)}</td>
                      <td style={{padding:"10px 12px",fontSize:11.5,fontFamily:"monospace",color:sale.expenses>0?t.red:t.tx3}}>{sale.expenses>0?`-${fK(sale.expenses)}`:"—"}</td>
                      <td style={{padding:"10px 12px",fontSize:12,fontWeight:500,color:netProfit>0?t.grn:t.red}}>{fK(netProfit)}</td>
                      <td style={{padding:"10px 12px",fontSize:11.5,color:parseFloat(marginPct)>15?t.grn:parseFloat(marginPct)>8?t.amb:t.red}}>{marginPct}%</td>
                      <td style={{padding:"10px 12px"}}>
                        <div style={{opacity:isHov?1:0,transition:"opacity 0.1s"}} onClick={e=>e.stopPropagation()}>
                          <button onClick={()=>setDetail(sale)} style={{background:t.sf2,border:`1px solid ${t.bdr}`,borderRadius:5,padding:"3px 6px",cursor:"pointer",color:t.tx2,display:"flex"}}>{IC.eye}</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {paged.length===0&&<tr><td colSpan={12} style={{padding:40,textAlign:"center",color:t.tx3,fontSize:13}}>No sales match your filters</td></tr>}
              </tbody>
            </table>
          </div>
          <Pagination total={filtered.length} page={pg} perPage={PP} onPage={setPg}/>
        </Card>
      </div>

      {/* ═══ DETAIL MODAL ═══ */}
      <Modal open={!!detail} onClose={()=>setDetail(null)} title="Sale Details" w={640}>
        {detail && (() => {
          const netProfit = detail.salePrice - detail.cost - detail.expenses;
          const marginPct = detail.cost > 0 ? ((netProfit / detail.cost) * 100).toFixed(1) : "0.0";
          const methodColors = {Finance:t.acc,Cash:t.grn,Lease:t.pur};
          return (
            <div>
              {/* Vehicle & Buyer */}
              <div style={{display:"flex",gap:16,marginBottom:18,flexWrap:"wrap"}}>
                <div style={{flex:1,minWidth:200}}>
                  <h3 style={{fontSize:18,fontWeight:600,color:t.tx,margin:"0 0 4px"}}>{detail.year} {detail.make} {detail.model}</h3>
                  <div style={{fontSize:12,color:t.tx3,marginBottom:8}}>{detail.color}</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    {[
                      ["Buyer",detail.buyer,IC.user],
                      ["Salesperson",detail.salesperson,IC.badge],
                      ["Date",detail.date,IC.calendar],
                      ["Days to Sell",`${detail.daysToSell} days`,IC.clock],
                      ["Location",detail.location,IC.mapPin],
                      ["Method",detail.method,IC.dollar],
                    ].map(([l,v,icon])=>(
                      <div key={l}>
                        <div style={{fontSize:9.5,color:t.tx3,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:2}}>{l}</div>
                        <div style={{fontSize:12.5,color:t.tx,display:"flex",alignItems:"center",gap:5}}>
                          <span style={{color:t.tx3,display:"flex",transform:"scale(0.85)"}}>{icon}</span>
                          {l==="Method"?<span style={{padding:"2px 8px",borderRadius:5,fontSize:10.5,background:`${methodColors[v]}15`,color:methodColors[v],fontWeight:500}}>{v}</span>:v}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Financials */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:16}}>
                {[
                  ["Cost",fmt(detail.cost),t.tx2],
                  ["Sale Price",fmt(detail.salePrice),t.tx],
                  ["Expenses",detail.expenses>0?fmt(detail.expenses):"$0",t.red],
                  ["Net Profit",fmt(netProfit),netProfit>0?t.grn:t.red],
                ].map(([l,v,c])=>(
                  <div key={l} style={{background:t.sf2,borderRadius:10,padding:"11px 13px",border:`1px solid ${t.bdr}`}}>
                    <div style={{fontSize:9.5,color:t.tx3,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
                    <div style={{fontSize:16,fontWeight:600,color:c,fontFamily:"monospace",marginTop:2}}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Margin */}
              <div style={{display:"flex",gap:14,alignItems:"center",padding:"12px 16px",background:netProfit>0?t.grnD:t.redD,borderRadius:10,border:`1px solid ${netProfit>0?"rgba(52,211,153,0.15)":"rgba(248,113,113,0.15)"}`}}>
                <div>
                  <div style={{fontSize:10,color:t.tx3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Profit Margin</div>
                  <div style={{fontSize:22,fontWeight:600,color:netProfit>0?t.grn:t.red,marginTop:2}}>{marginPct}%</div>
                </div>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}>
                  <ProgressBar pct={Math.min(parseFloat(marginPct),50)} color={netProfit>0?t.grn:t.red} h={8}/>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:t.tx3}}>
                    <span>0%</span><span>25%</span><span>50%+</span>
                  </div>
                </div>
              </div>

              {/* Revenue breakdown */}
              <div style={{marginTop:16,padding:"12px 16px",background:t.sf2,borderRadius:10,border:`1px solid ${t.bdr}`}}>
                <div style={{fontSize:11,fontWeight:500,color:t.tx2,marginBottom:8}}>Revenue Breakdown</div>
                <div style={{display:"flex",alignItems:"center",gap:4,height:18,borderRadius:4,overflow:"hidden"}}>
                  <div style={{flex:detail.cost,background:t.tx3,borderRadius:3}} title="Cost"/>
                  {detail.expenses>0&&<div style={{flex:detail.expenses,background:t.red,borderRadius:3}} title="Expenses"/>}
                  <div style={{flex:netProfit>0?netProfit:0,background:t.grn,borderRadius:3}} title="Profit"/>
                </div>
                <div style={{display:"flex",gap:12,marginTop:8,fontSize:10,color:t.tx3}}>
                  <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:6,height:6,borderRadius:1.5,background:t.tx3}}/>Cost: {Math.round(detail.cost/detail.salePrice*100)}%</span>
                  {detail.expenses>0&&<span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:6,height:6,borderRadius:1.5,background:t.red}}/>Expenses: {Math.round(detail.expenses/detail.salePrice*100)}%</span>}
                  <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:6,height:6,borderRadius:1.5,background:t.grn}}/>Profit: {Math.round(Math.max(0,netProfit)/detail.salePrice*100)}%</span>
                </div>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
