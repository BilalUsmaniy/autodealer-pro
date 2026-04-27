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
  org:"#fb923c",orgD:"rgba(251,146,60,0.1)",
};

const CATEGORIES=["Rent","Salaries","Marketing","Insurance","Utilities","Detailing","Transport","Repairs","Legal","Software","Parts","Office Supplies"];
const CAT_COL={Rent:t.pur,Salaries:t.acc,Marketing:t.pink,Insurance:t.amb,Utilities:t.cyn,Detailing:t.grn,Transport:t.org,Repairs:t.red,Legal:"#94a3b8",Software:t.lime,Parts:t.amb,"Office Supplies":t.cyn};
const CAT_BUDGET={Rent:24000,Salaries:48000,Marketing:20000,Insurance:14000,Utilities:4000,Detailing:8000,Transport:6000,Repairs:10000,Legal:5000,Software:3000,Parts:7000,"Office Supplies":2000};

const STATUSES=["Paid","Pending","Overdue"];
const ST_COL={Paid:t.grn,Pending:t.amb,Overdue:t.red};
const PAY_METHODS=["Bank Transfer","Credit Card","Cash","Check","ACH"];
const VENDORS=["Houston Property Mgmt","ADP Payroll","Google Ads","Meta Ads","State Farm","NJ Electric Co","DetailPro LLC","AutoTransport Inc","Mike's Body Shop","LegalZoom","Salesforce","AutoZone","Staples","Spectrum","Shell Gas","CarFax"];

/* ═══════════════════ ICONS ═══════════════════ */
const IC={
  receipt:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2z"/><path d="M8 10h8M8 14h4"/></svg>,
  dollar:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  trend:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  repeat:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>,
  tag:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  calendar:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  search:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  plus:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  x:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  edit:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  filter:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  reset:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>,
  dl:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  check:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  aUp:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  aDn:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  chL:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>,
  chR:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>,
};

/* ═══════════════════ SAMPLE DATA ═══════════════════ */
const EXPENSES_DATA=[
  {id:1,desc:"Main lot lease — March",cat:"Rent",amount:24000,date:"Mar 1, 2026",status:"Paid",recurring:true,vendor:"Houston Property Mgmt",payMethod:"Bank Transfer",refNo:"INV-2026-0301",month:"Mar"},
  {id:2,desc:"Staff payroll — February",cat:"Salaries",amount:45000,date:"Feb 28, 2026",status:"Paid",recurring:true,vendor:"ADP Payroll",payMethod:"ACH",refNo:"PAY-2026-0228",month:"Feb"},
  {id:3,desc:"Google Ads — Q1 campaign",cat:"Marketing",amount:8500,date:"Mar 2, 2026",status:"Paid",recurring:false,vendor:"Google Ads",payMethod:"Credit Card",refNo:"GA-2026-Q1",month:"Mar"},
  {id:4,desc:"Fleet insurance renewal",cat:"Insurance",amount:12800,date:"Feb 15, 2026",status:"Paid",recurring:true,vendor:"State Farm",payMethod:"Bank Transfer",refNo:"INS-2026-0215",month:"Feb"},
  {id:5,desc:"Electric bill — February",cat:"Utilities",amount:2850,date:"Feb 28, 2026",status:"Paid",recurring:true,vendor:"NJ Electric Co",payMethod:"ACH",refNo:"UTIL-2026-0228",month:"Feb"},
  {id:6,desc:"Vehicle detailing x18 cars",cat:"Detailing",amount:5400,date:"Mar 3, 2026",status:"Paid",recurring:false,vendor:"DetailPro LLC",payMethod:"Check",refNo:"DET-2026-0303",month:"Mar"},
  {id:7,desc:"Transport 4 vehicles from auction",cat:"Transport",amount:4800,date:"Feb 20, 2026",status:"Paid",recurring:false,vendor:"AutoTransport Inc",payMethod:"Bank Transfer",refNo:"TRN-2026-0220",month:"Feb"},
  {id:8,desc:"Body shop — Range Rover repairs",cat:"Repairs",amount:6200,date:"Mar 2, 2026",status:"Pending",recurring:false,vendor:"Mike's Body Shop",payMethod:"Check",refNo:"REP-2026-0302",month:"Mar"},
  {id:9,desc:"Legal consultation — lease review",cat:"Legal",amount:3500,date:"Feb 10, 2026",status:"Paid",recurring:false,vendor:"LegalZoom",payMethod:"Credit Card",refNo:"LEG-2026-0210",month:"Feb"},
  {id:10,desc:"CRM subscription — annual",cat:"Software",amount:2100,date:"Jan 15, 2026",status:"Paid",recurring:true,vendor:"Salesforce",payMethod:"Credit Card",refNo:"SW-2026-0115",month:"Jan"},
  {id:11,desc:"Facebook/Instagram Ads — Feb",cat:"Marketing",amount:6200,date:"Feb 28, 2026",status:"Paid",recurring:true,vendor:"Meta Ads",payMethod:"Credit Card",refNo:"META-2026-0228",month:"Feb"},
  {id:12,desc:"Brake pads & rotors — bulk order",cat:"Parts",amount:4800,date:"Mar 1, 2026",status:"Pending",recurring:false,vendor:"AutoZone",payMethod:"Credit Card",refNo:"PRT-2026-0301",month:"Mar"},
  {id:13,desc:"Office supplies — Q1",cat:"Office Supplies",amount:890,date:"Jan 20, 2026",status:"Paid",recurring:false,vendor:"Staples",payMethod:"Credit Card",refNo:"OFF-2026-0120",month:"Jan"},
  {id:14,desc:"Water & gas — February",cat:"Utilities",amount:1350,date:"Feb 28, 2026",status:"Paid",recurring:true,vendor:"Spectrum",payMethod:"ACH",refNo:"UTIL-2026-0228B",month:"Feb"},
  {id:15,desc:"Google Ads — Feb continuation",cat:"Marketing",amount:4200,date:"Feb 15, 2026",status:"Paid",recurring:true,vendor:"Google Ads",payMethod:"Credit Card",refNo:"GA-2026-0215",month:"Feb"},
  {id:16,desc:"Staff payroll — March",cat:"Salaries",amount:46500,date:"Mar 5, 2026",status:"Pending",recurring:true,vendor:"ADP Payroll",payMethod:"ACH",refNo:"PAY-2026-0305",month:"Mar"},
  {id:17,desc:"Main lot lease — April (advance)",cat:"Rent",amount:24000,date:"Mar 5, 2026",status:"Pending",recurring:true,vendor:"Houston Property Mgmt",payMethod:"Bank Transfer",refNo:"INV-2026-0305",month:"Mar"},
  {id:18,desc:"Tire inventory — Michelin",cat:"Parts",amount:6800,date:"Mar 4, 2026",status:"Overdue",recurring:false,vendor:"AutoZone",payMethod:"Bank Transfer",refNo:"PRT-2026-0304",month:"Mar"},
  {id:19,desc:"Fuel for lot vehicles",cat:"Transport",amount:1200,date:"Feb 25, 2026",status:"Paid",recurring:true,vendor:"Shell Gas",payMethod:"Credit Card",refNo:"FUEL-2026-0225",month:"Feb"},
  {id:20,desc:"CarFax reports — monthly sub",cat:"Software",amount:500,date:"Mar 1, 2026",status:"Paid",recurring:true,vendor:"CarFax",payMethod:"Credit Card",refNo:"CF-2026-0301",month:"Mar"},
];

const MONTHLY_TREND=[
  {m:"Oct",val:98000},{m:"Nov",val:105000},{m:"Dec",val:112000},
  {m:"Jan",val:95000},{m:"Feb",val:108000},{m:"Mar",val:118290},
];

/* ═══════════════════ HELPERS ═══════════════════ */
const fmt=n=>"$"+n.toLocaleString();
const fK=n=>n>=1e6?"$"+(n/1e6).toFixed(2)+"M":n>=1e3?"$"+(n/1e3).toFixed(1)+"K":"$"+n;

/* ═══════════════════ SHARED COMPONENTS ═══════════════════ */
function Card({children,s={}}){return <div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:14,...s}}>{children}</div>}
function Stat({label,val,chg,up,sub,icon,delay=0,color}){const[v,setV]=useState(false);useEffect(()=>{const tm=setTimeout(()=>setV(true),delay);return()=>clearTimeout(tm)},[]);return(<div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:13,padding:"16px 18px",flex:1,minWidth:150,opacity:v?1:0,transform:v?"translateY(0)":"translateY(10px)",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span style={{fontSize:10,color:t.tx3,textTransform:"uppercase",letterSpacing:".07em",fontWeight:500}}>{label}</span>{icon&&<span style={{color:color||t.tx3,opacity:.6,display:"flex"}}>{icon}</span>}</div><div style={{display:"flex",alignItems:"baseline",gap:8}}><span style={{fontSize:22,fontWeight:600,color:color||t.tx,letterSpacing:"-.02em"}}>{val}</span>{chg&&<span style={{display:"inline-flex",alignItems:"center",gap:2,fontSize:10.5,fontWeight:500,color:up?t.grn:t.red}}>{up?IC.aUp:IC.aDn}{chg}</span>}</div>{sub&&<div style={{fontSize:10,color:t.tx3,marginTop:2}}>{sub}</div>}</div>)}
function Btn({children,v="default",onClick,s={},disabled}){const base={border:"none",borderRadius:9,cursor:disabled?"default":"pointer",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:500,display:"inline-flex",alignItems:"center",gap:5,transition:"all .15s",opacity:disabled?.5:1,...s};const vs={primary:{...base,background:`linear-gradient(135deg,${t.acc},#818cf8)`,color:"#fff",padding:"8px 16px"},default:{...base,background:t.sf2,border:`1px solid ${t.bdr}`,color:t.tx2,padding:"7px 13px"},ghost:{...base,background:"transparent",color:t.tx3,padding:"7px 10px"},danger:{...base,background:t.redD,color:t.red,padding:"7px 13px"}};return <button onClick={onClick} disabled={disabled} style={vs[v]||vs.default}>{children}</button>}
function ProgressBar({pct,color,h=5,bg}){return <div style={{height:h,borderRadius:h,background:bg||t.sf2,width:"100%"}}><div style={{height:"100%",borderRadius:h,background:color,width:`${Math.min(100,pct)}%`,transition:"width .8s cubic-bezier(.16,1,.3,1)"}}/></div>}
function Badge({s}){const c=ST_COL[s]||t.tx2;return <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"2px 9px",borderRadius:20,background:`${c}18`,color:c,fontSize:10.5,fontWeight:500,whiteSpace:"nowrap"}}><span style={{width:4,height:4,borderRadius:"50%",background:c}}/>{s}</span>}
function Pagination({total,page,perPage,onPage}){const pages=Math.ceil(total/perPage);if(pages<=1)return null;return(<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderTop:`1px solid ${t.bdr}`}}><span style={{fontSize:11.5,color:t.tx3}}>Showing {(page-1)*perPage+1}–{Math.min(page*perPage,total)} of {total}</span><div style={{display:"flex",gap:3}}><Btn onClick={()=>onPage(Math.max(1,page-1))} disabled={page===1}>{IC.chL}</Btn>{Array.from({length:Math.min(pages,7)},(_,i)=>{let p=i+1;if(pages>7){const st=Math.max(1,Math.min(page-3,pages-6));p=st+i}return <button key={p} onClick={()=>onPage(p)} style={{width:28,height:28,borderRadius:6,border:"none",background:p===page?t.accD:"transparent",color:p===page?t.acc:t.tx3,fontSize:11.5,fontWeight:p===page?600:400,cursor:"pointer",fontFamily:"inherit"}}>{p}</button>})}<Btn onClick={()=>onPage(Math.min(pages,page+1))} disabled={page===pages}>{IC.chR}</Btn></div></div>)}
function Modal({open,onClose,title,children,w=600}){if(!open)return null;return(<div style={{position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}><div style={{position:"absolute",inset:0,background:t.ov,backdropFilter:"blur(6px)"}}/><div onClick={e=>e.stopPropagation()} style={{position:"relative",background:t.sf,border:`1px solid ${t.bdr}`,borderRadius:16,width:w,maxWidth:"95vw",maxHeight:"88vh",overflow:"auto",padding:"22px 26px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><h3 style={{fontSize:15,fontWeight:600,margin:0,color:t.tx}}>{title}</h3><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex"}}>{IC.x}</button></div>{children}</div></div>)}
function Inp({label,value,onChange,ph,type="text",s={}}){return(<div style={{display:"flex",flexDirection:"column",gap:4,...s}}>{label&&<label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={ph} style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none"}} onFocus={e=>e.target.style.borderColor=t.acc} onBlur={e=>e.target.style.borderColor=t.bdr}/></div>)}
function Sel({label,value,onChange,opts,s={}}){return(<div style={{display:"flex",flexDirection:"column",gap:4,...s}}>{label&&<label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}<select value={value} onChange={e=>onChange(e.target.value)} style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none",appearance:"auto"}}>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select></div>)}

/* ═══════════════════ CHARTS ═══════════════════ */
function DonutChart({segments,size=120,stroke=13}){const total=segments.reduce((s,x)=>s+x.val,0);const r=(size-stroke)/2;const circ=2*Math.PI*r;let offset=0;const[hov,setHov]=useState(null);return(<div style={{position:"relative",width:size,height:size}}><svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={t.sf2} strokeWidth={stroke}/>{segments.map((seg,i)=>{const pct=seg.val/total;const dash=pct*circ;const o=offset;offset+=dash;return <circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={seg.color} strokeWidth={hov===i?stroke+4:stroke} strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-o} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"all .3s",cursor:"pointer"}} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}/>})}</svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:16,fontWeight:600,color:t.tx}}>{fK(total)}</div><div style={{fontSize:8.5,color:t.tx3,textTransform:"uppercase",letterSpacing:".05em"}}>Total</div></div></div>)}

function BarChart({data,h=130}){const max=Math.max(...data.map(d=>d.val));const bw=Math.max(14,180/data.length);const[hov,setHov]=useState(null);return(<svg width="100%" viewBox={`0 0 ${data.length*(bw+8)} ${h+28}`} preserveAspectRatio="xMidYMid meet" style={{display:"block"}}>{data.map((d,i)=>{const bh=(d.val/max)*h;const x=i*(bw+8);const isH=hov===i;return(<g key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{cursor:"pointer"}}><rect x={x} y={h-bh} width={bw} height={bh} rx={4} fill={isH?t.red:`${t.red}35`} style={{transition:"fill .2s"}}/><text x={x+bw/2} y={h+14} textAnchor="middle" fill={t.tx3} fontSize="9" fontFamily="'Outfit',sans-serif">{d.m}</text>{isH&&<><rect x={Math.max(0,x+bw/2-36)} y={h-bh-30} width={72} height={22} rx={5} fill={t.sf} stroke={t.bdr}/><text x={x+bw/2} y={h-bh-15} textAnchor="middle" fill={t.tx} fontSize="10" fontWeight="500" fontFamily="monospace">{fK(d.val)}</text></>}</g>)})}</svg>)}

/* ═══════════════════ MAIN EXPENSES PAGE ═══════════════════ */
export default function ExpensesPage(){
  const[expenses,setExpenses]=useState(EXPENSES_DATA);
  const[search,setSearch]=useState("");
  const[fCat,setFCat]=useState("All");
  const[fStatus,setFStatus]=useState("All");
  const[fMonth,setFMonth]=useState("All");
  const[fVendor,setFVendor]=useState("All");
  const[showFilters,setShowFilters]=useState(false);
  const[pg,setPg]=useState(1);const PP=8;
  const[hovR,setHovR]=useState(null);
  const[sortK,setSortK]=useState(null);const[sortD,setSortD]=useState("desc");
  const[showAdd,setShowAdd]=useState(false);
  const[editExp,setEditExp]=useState(null);

  const hasFilters=fCat!=="All"||fStatus!=="All"||fMonth!=="All"||fVendor!=="All"||search;
  const resetFilters=()=>{setFCat("All");setFStatus("All");setFMonth("All");setFVendor("All");setSearch("");setSortK(null);setSortD("desc");setPg(1)};

  const activeVendors=useMemo(()=>["All",...new Set(expenses.map(e=>e.vendor))].sort(),[expenses]);
  const activeMonths=useMemo(()=>["All",...new Set(expenses.map(e=>e.month))],[expenses]);

  const filtered=useMemo(()=>{
    let l=[...expenses];
    if(fCat!=="All")l=l.filter(e=>e.cat===fCat);
    if(fStatus!=="All")l=l.filter(e=>e.status===fStatus);
    if(fMonth!=="All")l=l.filter(e=>e.month===fMonth);
    if(fVendor!=="All")l=l.filter(e=>e.vendor===fVendor);
    if(search){const q=search.toLowerCase();l=l.filter(e=>`${e.desc} ${e.vendor} ${e.refNo} ${e.cat}`.toLowerCase().includes(q))}
    if(sortK)l.sort((a,b)=>{const av=a[sortK],bv=b[sortK];return typeof av==="number"?(sortD==="asc"?av-bv:bv-av):(sortD==="asc"?String(av).localeCompare(String(bv)):String(bv).localeCompare(String(av)))});
    return l;
  },[expenses,fCat,fStatus,fMonth,fVendor,search,sortK,sortD]);

  const paged=filtered.slice((pg-1)*PP,pg*PP);
  const handleSort=k=>{if(sortK===k)setSortD(d=>d==="asc"?"desc":"asc");else{setSortK(k);setSortD("asc")}};
  const handleDel=id=>{setExpenses(p=>p.filter(e=>e.id!==id))};

  // Stats
  const totalExp=expenses.reduce((s,e)=>s+e.amount,0);
  const paidAmt=expenses.filter(e=>e.status==="Paid").reduce((s,e)=>s+e.amount,0);
  const pendingAmt=expenses.filter(e=>e.status==="Pending").reduce((s,e)=>s+e.amount,0);
  const overdueAmt=expenses.filter(e=>e.status==="Overdue").reduce((s,e)=>s+e.amount,0);
  const avgMonthly=Math.round(MONTHLY_TREND.reduce((s,d)=>s+d.val,0)/MONTHLY_TREND.length);
  const recurringCount=expenses.filter(e=>e.recurring).length;
  const recurringAmt=expenses.filter(e=>e.recurring).reduce((s,e)=>s+e.amount,0);
  const thisMonth=expenses.filter(e=>e.month==="Mar").reduce((s,e)=>s+e.amount,0);
  const lastMonth=expenses.filter(e=>e.month==="Feb").reduce((s,e)=>s+e.amount,0);
  const monthChange=lastMonth>0?((thisMonth-lastMonth)/lastMonth*100).toFixed(1):0;

  // Category breakdown
  const catTotals={};expenses.forEach(e=>{catTotals[e.cat]=(catTotals[e.cat]||0)+e.amount});
  const catSegs=Object.entries(catTotals).sort((a,b)=>b[1]-a[1]).map(([k,v])=>({val:v,color:CAT_COL[k]||t.tx3,label:k}));
  const biggestCat=catSegs[0]||{label:"—",val:0};

  const exportCSV=()=>{const h="Date,Description,Category,Vendor,Amount,Status,Recurring,Payment Method,Reference\n";const r=filtered.map(e=>`${e.date},"${e.desc}",${e.cat},"${e.vendor}",${e.amount},${e.status},${e.recurring?"Yes":"No"},${e.payMethod},${e.refNo}`).join("\n");const b=new Blob([h+r],{type:"text/csv"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download="expenses.csv";a.click()};

  const thS={textAlign:"left",padding:"10px 12px",fontSize:10,color:t.tx3,fontWeight:500,textTransform:"uppercase",letterSpacing:".06em",cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"};

  return(
    <div style={{minHeight:"100vh",background:t.bg,color:t.tx,fontFamily:"'Outfit',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${t.bdr};border-radius:3px}body{font-family:'Outfit',sans-serif;background:${t.bg}}`}</style>

      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 24px",borderBottom:`1px solid ${t.bdr}`,background:t.sf,position:"sticky",top:0,zIndex:20,flexWrap:"wrap",gap:10}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${t.acc},#818cf8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>AD</div>
          <div><h1 style={{fontSize:17,fontWeight:600,letterSpacing:"-.02em",margin:0}}>Expenses</h1><span style={{fontSize:10.5,color:t.tx3}}>{expenses.length} records · {fK(totalExp)} total</span></div>
        </div>
        <div style={{display:"flex",gap:8}}><Btn onClick={exportCSV}>{IC.dl} Export</Btn><Btn v="primary" onClick={()=>setShowAdd(true)}>{IC.plus} Add Expense</Btn></div>
      </header>

      <div style={{padding:"18px 24px",display:"flex",flexDirection:"column",gap:18}}>

        {/* STATS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:10}}>
          <Stat label="Total Expenses" val={fK(totalExp)} icon={IC.receipt} delay={0} color={t.red}/>
          <Stat label="Paid" val={fK(paidAmt)} sub={`${expenses.filter(e=>e.status==="Paid").length} transactions`} icon={IC.check} delay={60} color={t.grn}/>
          <Stat label="Pending + Overdue" val={fK(pendingAmt+overdueAmt)} sub={overdueAmt>0?`${fK(overdueAmt)} overdue`:""} icon={IC.dollar} delay={120} color={t.amb}/>
          <Stat label="Monthly Avg" val={fK(avgMonthly)} icon={IC.trend} delay={180}/>
          <Stat label="Biggest Category" val={biggestCat.label} sub={fK(biggestCat.val)} icon={IC.tag} delay={240} color={CAT_COL[biggestCat.label]}/>
          <Stat label="This vs Last Month" val={fK(thisMonth)} chg={`${Math.abs(monthChange)}%`} up={thisMonth<=lastMonth} sub={`Last: ${fK(lastMonth)}`} icon={IC.calendar} delay={300}/>
        </div>

        {/* Recurring summary mini */}
        <div style={{display:"flex",gap:10}}>
          <Card s={{flex:1,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:38,height:38,borderRadius:9,background:t.purD,display:"flex",alignItems:"center",justifyContent:"center",color:t.pur}}>{IC.repeat}</div>
            <div><div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{recurringCount} Recurring Expenses</div><div style={{fontSize:11,color:t.tx3}}>{fK(recurringAmt)} monthly commitment</div></div>
          </Card>
          <Card s={{flex:1,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:38,height:38,borderRadius:9,background:t.redD,display:"flex",alignItems:"center",justifyContent:"center",color:t.red}}>{IC.receipt}</div>
            <div><div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{expenses.filter(e=>e.status==="Overdue").length} Overdue</div><div style={{fontSize:11,color:t.red}}>{fK(overdueAmt)} needs attention</div></div>
          </Card>
        </div>

        {/* ROW 1: Category Donut + Monthly Trend */}
        <div style={{display:"grid",gridTemplateColumns:"3fr 5fr",gap:14}}>
          <Card s={{padding:"18px 20px",display:"flex",flexDirection:"column"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:2}}>By Category</div>
            <div style={{fontSize:10.5,color:t.tx3,marginBottom:14}}>Expense distribution</div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><DonutChart segments={catSegs} size={118} stroke={12}/></div>
            <div style={{display:"flex",flexDirection:"column",gap:5,marginTop:"auto"}}>
              {catSegs.slice(0,6).map(s=><div key={s.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:t.tx2}}><span style={{width:6,height:6,borderRadius:2,background:s.color}}/>{s.label}</span><span style={{fontSize:11,fontWeight:500,color:t.tx,fontFamily:"monospace"}}>{fK(s.val)}</span></div>)}
            </div>
          </Card>

          <Card s={{padding:"18px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
              <div><div style={{fontSize:13.5,fontWeight:500,color:t.tx}}>Monthly Expenses</div><div style={{fontSize:10.5,color:t.tx3,marginTop:1}}>6-month trend</div></div>
              <span style={{fontSize:12,fontWeight:500,color:t.red}}>{fK(MONTHLY_TREND[MONTHLY_TREND.length-1].val)} this month</span>
            </div>
            <BarChart data={MONTHLY_TREND}/>
          </Card>
        </div>

        {/* ROW 2: Paid vs Pending + Budget vs Actual */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>Payment Status</div>
            <div style={{display:"flex",gap:4,height:24,borderRadius:6,overflow:"hidden",marginBottom:14}}>
              {[{v:paidAmt,c:t.grn,l:"Paid"},{v:pendingAmt,c:t.amb,l:"Pending"},{v:overdueAmt,c:t.red,l:"Overdue"}].filter(s=>s.v>0).map(s=><div key={s.l} style={{flex:s.v,background:s.c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff",fontWeight:500,minWidth:s.v>0?24:0}}>{Math.round(s.v/totalExp*100)}%</div>)}
            </div>
            {[{l:"Paid",v:paidAmt,c:t.grn,n:expenses.filter(e=>e.status==="Paid").length},{l:"Pending",v:pendingAmt,c:t.amb,n:expenses.filter(e=>e.status==="Pending").length},{l:"Overdue",v:overdueAmt,c:t.red,n:expenses.filter(e=>e.status==="Overdue").length}].map(s=>(
              <div key={s.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${t.bdr}`}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{width:8,height:8,borderRadius:2,background:s.c}}/><span style={{fontSize:12,color:t.tx}}>{s.l}</span><span style={{fontSize:10.5,color:t.tx3}}>({s.n})</span></div>
                <span style={{fontSize:13,fontWeight:600,color:s.c,fontFamily:"monospace"}}>{fK(s.v)}</span>
              </div>
            ))}
          </Card>

          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>Budget vs Actual</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {catSegs.slice(0,6).map(s=>{
                const budget=CAT_BUDGET[s.label]||10000;const pct=Math.round(s.val/budget*100);const over=pct>100;
                return(<div key={s.label}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:11.5,fontWeight:500,color:t.tx}}>{s.label}</span>
                    <span style={{fontSize:10.5,color:over?t.red:t.tx3}}>{fK(s.val)} / {fK(budget)} <span style={{fontWeight:500,color:over?t.red:pct>80?t.amb:t.grn}}>({pct}%)</span></span>
                  </div>
                  <div style={{position:"relative"}}>
                    <ProgressBar pct={Math.min(pct,100)} color={over?t.red:pct>80?t.amb:s.color} h={6}/>
                    {over&&<div style={{position:"absolute",right:0,top:-2,width:2,height:10,background:t.red,borderRadius:1}}/>}
                  </div>
                </div>)
              })}
            </div>
            <div style={{display:"flex",gap:10,marginTop:12,fontSize:10,color:t.tx3}}>
              <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:6,height:6,borderRadius:1.5,background:t.grn}}/>Under budget</span>
              <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:6,height:6,borderRadius:1.5,background:t.amb}}/>Near limit</span>
              <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:6,height:6,borderRadius:1.5,background:t.red}}/>Over budget</span>
            </div>
          </Card>
        </div>

        {/* ROW 3: Top Categories + Recurring Summary */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>Top Categories</div>
            {catSegs.slice(0,7).map((s,i)=>(
              <div key={s.label} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <span style={{width:18,fontSize:11,color:t.tx3,textAlign:"right"}}>{i+1}.</span>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,fontWeight:500,color:t.tx}}>{s.label}</span><span style={{fontSize:11.5,fontFamily:"monospace",color:t.tx2}}>{fK(s.val)}</span></div>
                  <ProgressBar pct={(s.val/catSegs[0].val)*100} color={s.color} h={5}/>
                </div>
              </div>
            ))}
          </Card>

          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>Recurring Expenses</div>
            {expenses.filter(e=>e.recurring).sort((a,b)=>b.amount-a.amount).slice(0,7).map((e,i)=>(
              <div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:i<6?`1px solid ${t.bdr}`:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{width:6,height:6,borderRadius:"50%",background:CAT_COL[e.cat]||t.tx3}}/>
                  <div><div style={{fontSize:12,fontWeight:500,color:t.tx}}>{e.desc.length>35?e.desc.slice(0,35)+"...":e.desc}</div><div style={{fontSize:10,color:t.tx3}}>{e.vendor} · {e.cat}</div></div>
                </div>
                <span style={{fontSize:12,fontWeight:500,color:t.red,fontFamily:"monospace"}}>{fK(e.amount)}</span>
              </div>
            ))}
            <div style={{marginTop:12,padding:"10px 12px",background:t.sf2,borderRadius:8,border:`1px solid ${t.bdr}`,display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:11.5,fontWeight:500,color:t.tx}}>Total Recurring</span>
              <span style={{fontSize:13,fontWeight:600,color:t.pur,fontFamily:"monospace"}}>{fK(recurringAmt)}/mo</span>
            </div>
          </Card>
        </div>

        {/* TOOLBAR */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{display:"flex",alignItems:"center",gap:5,background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"6px 10px",minWidth:180}}>
              <span style={{color:t.tx3,display:"flex"}}>{IC.search}</span>
              <input placeholder="Search description, vendor, ref..." value={search} onChange={e=>{setSearch(e.target.value);setPg(1)}} style={{background:"none",border:"none",outline:"none",color:t.tx,fontSize:12,width:"100%",fontFamily:"inherit"}}/>
              {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex"}}>{IC.x}</button>}
            </div>
            <Btn onClick={()=>setShowFilters(!showFilters)} s={{background:showFilters?t.accD:t.sf2,color:showFilters?t.acc:t.tx2}}>{IC.filter} Filters{hasFilters&&<span style={{width:6,height:6,borderRadius:"50%",background:t.acc}}/>}</Btn>
            {hasFilters&&<Btn v="ghost" onClick={resetFilters}>{IC.reset} Reset</Btn>}
          </div>
          <span style={{fontSize:11.5,color:t.tx3}}>{filtered.length} expense{filtered.length!==1?"s":""} · {fK(filtered.reduce((s,e)=>s+e.amount,0))} total</span>
        </div>

        {showFilters&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:8,padding:"14px 16px",background:t.card,borderRadius:12,border:`1px solid ${t.bdr}`}}>
          <Sel label="Category" value={fCat} onChange={v=>{setFCat(v);setPg(1)}} opts={["All",...CATEGORIES]}/>
          <Sel label="Status" value={fStatus} onChange={v=>{setFStatus(v);setPg(1)}} opts={["All",...STATUSES]}/>
          <Sel label="Month" value={fMonth} onChange={v=>{setFMonth(v);setPg(1)}} opts={activeMonths}/>
          <Sel label="Vendor" value={fVendor} onChange={v=>{setFVendor(v);setPg(1)}} opts={activeVendors}/>
        </div>}

        {/* TABLE */}
        <Card s={{overflow:"hidden"}}>
          <div style={{overflow:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:1100}}>
              <thead><tr style={{borderBottom:`1px solid ${t.bdr}`}}>
                {[["Date","date"],["Description","desc"],["Category","cat"],["Vendor","vendor"],["Amount","amount"],["Status","status"],["Recurring",null],["Method","payMethod"],["Ref #","refNo"],["",null]].map(([h,k])=>(
                  <th key={h||"act"} style={thS} onClick={()=>k&&handleSort(k)}><span style={{display:"inline-flex",alignItems:"center",gap:2}}>{h}{sortK===k&&(sortD==="asc"?IC.aUp:IC.aDn)}</span></th>
                ))}
              </tr></thead>
              <tbody>{paged.map((e,i)=>{const isH=hovR===e.id;return(
                <tr key={e.id} onMouseEnter={()=>setHovR(e.id)} onMouseLeave={()=>setHovR(null)} style={{borderBottom:i<paged.length-1?`1px solid ${t.bdr}`:"none",background:isH?t.cardH:"transparent",transition:"background .1s"}}>
                  <td style={{padding:"10px 12px",fontSize:11.5,color:t.tx2,whiteSpace:"nowrap"}}>{e.date}</td>
                  <td style={{padding:"10px 12px"}}><div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{e.desc}</div></td>
                  <td style={{padding:"10px 12px"}}><span style={{padding:"2px 8px",borderRadius:5,fontSize:10.5,background:`${CAT_COL[e.cat]||t.tx3}15`,color:CAT_COL[e.cat]||t.tx3,fontWeight:500}}>{e.cat}</span></td>
                  <td style={{padding:"10px 12px",fontSize:11.5,color:t.tx2}}>{e.vendor}</td>
                  <td style={{padding:"10px 12px",fontSize:12.5,fontWeight:600,fontFamily:"monospace",color:t.red}}>{fmt(e.amount)}</td>
                  <td style={{padding:"10px 12px"}}><Badge s={e.status}/></td>
                  <td style={{padding:"10px 12px"}}>{e.recurring&&<span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 7px",borderRadius:5,background:t.purD,color:t.pur,fontSize:10,fontWeight:500}}>{IC.repeat} Yes</span>}</td>
                  <td style={{padding:"10px 12px",fontSize:11,color:t.tx3}}>{e.payMethod}</td>
                  <td style={{padding:"10px 12px",fontSize:10.5,fontFamily:"monospace",color:t.tx3}}>{e.refNo}</td>
                  <td style={{padding:"10px 12px"}}><div style={{display:"flex",gap:3,opacity:isH?1:0,transition:"opacity .1s"}}>
                    <button onClick={()=>setEditExp(e)} style={{background:t.sf2,border:`1px solid ${t.bdr}`,borderRadius:5,padding:"3px 6px",cursor:"pointer",color:t.tx2,display:"flex"}}>{IC.edit}</button>
                    <button onClick={()=>handleDel(e.id)} style={{background:t.redD,border:"none",borderRadius:5,padding:"3px 6px",cursor:"pointer",color:t.red,display:"flex"}}>{IC.trash}</button>
                  </div></td>
                </tr>
              )})}{paged.length===0&&<tr><td colSpan={10} style={{padding:40,textAlign:"center",color:t.tx3}}>No expenses match your filters</td></tr>}</tbody>
            </table>
          </div>
          <Pagination total={filtered.length} page={pg} perPage={PP} onPage={setPg}/>
        </Card>
      </div>

      {/* ADD MODAL */}
      <AddExpenseModal open={showAdd} onClose={()=>setShowAdd(false)} onAdd={e=>{setExpenses(p=>[e,...p]);setShowAdd(false)}}/>

      {/* EDIT MODAL */}
      <Modal open={!!editExp} onClose={()=>setEditExp(null)} title="Edit Expense" w={660}>
        {editExp&&<EditExpForm exp={editExp} onSave={u=>{setExpenses(p=>p.map(e=>e.id===u.id?u:e));setEditExp(null)}} onCancel={()=>setEditExp(null)}/>}
      </Modal>
    </div>
  );
}

/* ═══════════════════ ADD EXPENSE ═══════════════════ */
function AddExpenseModal({open,onClose,onAdd}){
  const[desc,setDesc]=useState("");const[cat,setCat]=useState("Marketing");const[amount,setAmount]=useState("");
  const[vendor,setVendor]=useState("");const[payMethod,setPayMethod]=useState("Credit Card");const[refNo,setRefNo]=useState("");
  const[status,setStatus]=useState("Pending");const[recurring,setRecurring]=useState(false);
  const reset=()=>{setDesc("");setCat("Marketing");setAmount("");setVendor("");setPayMethod("Credit Card");setRefNo("");setStatus("Pending");setRecurring(false)};
  return(
    <Modal open={open} onClose={()=>{onClose();reset()}} title="Add New Expense" w={660}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Inp label="Description" value={desc} onChange={setDesc} ph="What is this expense for?" s={{gridColumn:"1/-1"}}/>
        <Sel label="Category" value={cat} onChange={setCat} opts={CATEGORIES}/>
        <Inp label="Amount ($)" value={amount} onChange={setAmount} type="number" ph="0.00"/>
        <Inp label="Vendor / Payee" value={vendor} onChange={setVendor} ph="Company or person"/>
        <Sel label="Payment Method" value={payMethod} onChange={setPayMethod} opts={PAY_METHODS}/>
        <Inp label="Reference / Invoice #" value={refNo} onChange={setRefNo} ph="INV-2026-XXXX"/>
        <Sel label="Status" value={status} onChange={setStatus} opts={STATUSES}/>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          <label style={{fontSize:11,fontWeight:500,color:t.tx2}}>Recurring?</label>
          <button onClick={()=>setRecurring(!recurring)} style={{display:"flex",alignItems:"center",gap:8,background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",cursor:"pointer",color:t.tx,fontSize:12.5,fontFamily:"inherit"}}>
            <span style={{width:18,height:18,borderRadius:4,border:`2px solid ${recurring?t.pur:t.bdr}`,background:recurring?t.purD:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{recurring&&<span style={{color:t.pur,display:"flex"}}>{IC.check}</span>}</span>
            {recurring?"Yes — recurring monthly":"No — one-time expense"}
          </button>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:18}}>
        <Btn onClick={()=>{onClose();reset()}}>Cancel</Btn>
        <Btn v="primary" onClick={()=>{if(!desc||!amount)return;onAdd({id:Date.now(),desc,cat,amount:parseFloat(amount)||0,date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),status,recurring,vendor:vendor||"—",payMethod,refNo:refNo||`EXP-${Date.now().toString().slice(-6)}`,month:new Date().toLocaleDateString("en-US",{month:"short"})});reset()}} disabled={!desc||!amount}>Add Expense</Btn>
      </div>
    </Modal>
  );
}

/* ═══════════════════ EDIT FORM ═══════════════════ */
function EditExpForm({exp,onSave,onCancel}){
  const[f,sF]=useState({...exp,amount:String(exp.amount)});const u=(k,v)=>sF(p=>({...p,[k]:v}));
  return(<>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Inp label="Description" value={f.desc} onChange={v=>u("desc",v)} s={{gridColumn:"1/-1"}}/>
      <Sel label="Category" value={f.cat} onChange={v=>u("cat",v)} opts={CATEGORIES}/>
      <Inp label="Amount ($)" value={f.amount} onChange={v=>u("amount",v)} type="number"/>
      <Inp label="Vendor" value={f.vendor} onChange={v=>u("vendor",v)}/>
      <Sel label="Payment Method" value={f.payMethod} onChange={v=>u("payMethod",v)} opts={PAY_METHODS}/>
      <Inp label="Reference #" value={f.refNo} onChange={v=>u("refNo",v)}/>
      <Sel label="Status" value={f.status} onChange={v=>u("status",v)} opts={STATUSES}/>
      <div style={{display:"flex",flexDirection:"column",gap:4}}>
        <label style={{fontSize:11,fontWeight:500,color:t.tx2}}>Recurring?</label>
        <button onClick={()=>u("recurring",!f.recurring)} style={{display:"flex",alignItems:"center",gap:8,background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",cursor:"pointer",color:t.tx,fontSize:12.5,fontFamily:"inherit"}}>
          <span style={{width:18,height:18,borderRadius:4,border:`2px solid ${f.recurring?t.pur:t.bdr}`,background:f.recurring?t.purD:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{f.recurring&&<span style={{color:t.pur,display:"flex"}}>{IC.check}</span>}</span>
          {f.recurring?"Recurring":"One-time"}
        </button>
      </div>
    </div>
    <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:18}}>
      <Btn onClick={onCancel}>Cancel</Btn>
      <Btn v="primary" onClick={()=>onSave({...f,amount:parseFloat(f.amount)||0})}>Save Changes</Btn>
    </div>
  </>);
}
