import { useState, useMemo, useEffect, useRef } from "react";

/* ═══════════════════ THEME ═══════════════════ */
const t={bg:"#07070a",sf:"#0e0e13",sf2:"#131318",card:"#101015",cardH:"#17171e",bdr:"#1d1d26",bdr2:"#282832",tx:"#ededf0",tx2:"#888894",tx3:"#50505c",acc:"#5b8def",accD:"rgba(91,141,239,0.1)",grn:"#34d399",grnD:"rgba(52,211,153,0.1)",red:"#f87171",redD:"rgba(248,113,113,0.1)",amb:"#fbbf24",ambD:"rgba(251,191,36,0.1)",pur:"#a78bfa",purD:"rgba(167,139,250,0.1)",cyn:"#22d3ee",cynD:"rgba(34,211,238,0.1)",inp:"#0b0b10",ov:"rgba(0,0,0,0.75)",pink:"#f472b6",pinkD:"rgba(244,114,182,0.1)",lime:"#a3e635",org:"#fb923c"};

const TYPE_COL={PDF:t.red,DOCX:t.acc,XLSX:t.grn,PNG:t.pur,JPG:t.amb,CSV:t.cyn,TXT:t.tx2,PPTX:t.org};
const TYPE_ICON={
  PDF:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15h6" strokeWidth="2"/></svg>,
  DOCX:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>,
  XLSX:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><rect x="8" y="12" width="8" height="6" rx="1"/><line x1="12" y1="12" x2="12" y2="18"/><line x1="8" y1="15" x2="16" y2="15"/></svg>,
  IMG:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
};
const getIcon=(type)=>TYPE_ICON[type]||TYPE_ICON.PDF;

const CATEGORIES=["Sales","Insurance","Legal","Finance","Service","HR","Marketing"];
const CAT_COL={Sales:t.acc,Insurance:t.amb,Legal:"#94a3b8",Finance:t.grn,Service:t.pur,HR:t.pink,Marketing:t.cyn};
const CAT_ICON={Sales:"💰",Insurance:"🛡️",Legal:"⚖️",Finance:"📊",Service:"🔧",HR:"👥",Marketing:"📣"};

/* ═══════════════════ ICONS ═══════════════════ */
const IC={
  file:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  search:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  plus:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  x:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  trash:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  dl:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  eye:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  upload:<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  filter:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  reset:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>,
  grid:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  table:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
  folder:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
  folderOpen:<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
  clock:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  hdd:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>,
  tag:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  aUp:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  aDn:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  chL:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>,
  chR:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>,
  user:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
};

/* ═══════════════════ SAMPLE DATA ═══════════════════ */
const DOCS=[
  {id:1,name:"Bill of Sale — Tesla Model S Plaid",type:"PDF",size:245000,pages:3,date:"Mar 1, 2026",cat:"Sales",vehicle:"2024 Tesla Model S Plaid",customer:"James Mitchell",uploadedBy:"Sarah Kim",tags:["sale","tesla","completed"]},
  {id:2,name:"Fleet Insurance Certificate 2026",type:"PDF",size:1200000,pages:12,date:"Feb 15, 2026",cat:"Insurance",vehicle:null,customer:null,uploadedBy:"Derek Brown",tags:["insurance","fleet","annual"]},
  {id:3,name:"Main Lot Lease Agreement",type:"DOCX",size:890000,pages:8,date:"Jan 5, 2026",cat:"Legal",vehicle:null,customer:null,uploadedBy:"Tom Liu",tags:["lease","milltown","contract"]},
  {id:4,name:"Q1 2026 Financial Report",type:"XLSX",size:2100000,pages:5,date:"Mar 2, 2026",cat:"Finance",vehicle:null,customer:null,uploadedBy:"Ana Martinez",tags:["quarterly","report","q1"]},
  {id:5,name:"Vehicle Inspection — Porsche 911",type:"PDF",size:3400000,pages:4,date:"Feb 28, 2026",cat:"Service",vehicle:"2023 Porsche 911 Turbo S",customer:null,uploadedBy:"Mike Reeves",tags:["inspection","porsche"]},
  {id:6,name:"Marketing Budget 2026",type:"XLSX",size:560000,pages:2,date:"Jan 12, 2026",cat:"Marketing",vehicle:null,customer:null,uploadedBy:"Sarah Kim",tags:["budget","marketing","annual"]},
  {id:7,name:"Employee Handbook v4.2",type:"PDF",size:4800000,pages:45,date:"Jan 2, 2026",cat:"HR",vehicle:null,customer:null,uploadedBy:"Derek Brown",tags:["handbook","hr","policy"]},
  {id:8,name:"Trade-In Appraisal — BMW M3",type:"PDF",size:180000,pages:2,date:"Mar 2, 2026",cat:"Sales",vehicle:"2024 BMW M3 CS",customer:"David Chen",uploadedBy:"Sarah Kim",tags:["trade-in","appraisal","bmw"]},
  {id:9,name:"Warranty Policy Document",type:"DOCX",size:320000,pages:6,date:"Feb 10, 2026",cat:"Legal",vehicle:null,customer:null,uploadedBy:"Tom Liu",tags:["warranty","policy"]},
  {id:10,name:"Monthly Sales Report — February",type:"XLSX",size:1400000,pages:3,date:"Mar 1, 2026",cat:"Finance",vehicle:null,customer:null,uploadedBy:"Ana Martinez",tags:["monthly","sales","february"]},
  {id:11,name:"Customer Agreement — Priya Sharma",type:"PDF",size:290000,pages:4,date:"Feb 28, 2026",cat:"Sales",vehicle:"2023 Mercedes-Benz GLE 63S",customer:"Priya Sharma",uploadedBy:"Ana Martinez",tags:["agreement","mercedes"]},
  {id:12,name:"Fire Safety Compliance Report",type:"PDF",size:1800000,pages:8,date:"Jan 20, 2026",cat:"Legal",vehicle:null,customer:null,uploadedBy:"Derek Brown",tags:["safety","compliance"]},
  {id:13,name:"Facebook Ad Creatives — March",type:"PNG",size:8500000,pages:null,date:"Mar 3, 2026",cat:"Marketing",vehicle:null,customer:null,uploadedBy:"Sarah Kim",tags:["ads","creative","march"]},
  {id:14,name:"Lot Photos — New Arrivals",type:"JPG",size:12000000,pages:null,date:"Mar 4, 2026",cat:"Marketing",vehicle:null,customer:null,uploadedBy:"Mike Reeves",tags:["photos","inventory"]},
  {id:15,name:"Payroll Summary — February",type:"XLSX",size:680000,pages:2,date:"Feb 28, 2026",cat:"HR",vehicle:null,customer:null,uploadedBy:"Tom Liu",tags:["payroll","february"]},
  {id:16,name:"Service Receipt — Range Rover",type:"PDF",size:150000,pages:1,date:"Mar 2, 2026",cat:"Service",vehicle:"2024 Range Rover Sport",customer:null,uploadedBy:"Mike Reeves",tags:["service","receipt","rangerover"]},
  {id:17,name:"Vendor Contract — DetailPro",type:"DOCX",size:420000,pages:5,date:"Feb 5, 2026",cat:"Legal",vehicle:null,customer:null,uploadedBy:"Derek Brown",tags:["vendor","contract"]},
  {id:18,name:"Inventory Valuation Report",type:"CSV",size:340000,pages:null,date:"Mar 5, 2026",cat:"Finance",vehicle:null,customer:null,uploadedBy:"Ana Martinez",tags:["inventory","valuation"]},
];

const fmtSize=(b)=>{if(b>=1e6)return(b/1e6).toFixed(1)+" MB";if(b>=1e3)return Math.round(b/1e3)+" KB";return b+" B"};
const fK=n=>n>=1e6?"$"+(n/1e6).toFixed(2)+"M":n>=1e3?"$"+(n/1e3).toFixed(1)+"K":"$"+n;
const totalSize=DOCS.reduce((s,d)=>s+d.size,0);

/* ═══════════════════ COMPONENTS ═══════════════════ */
function Card({children,s={}}){return <div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:14,...s}}>{children}</div>}
function Stat({label,val,sub,icon,delay=0,color}){const[v,setV]=useState(false);useEffect(()=>{const tm=setTimeout(()=>setV(true),delay);return()=>clearTimeout(tm)},[]);return(<div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:13,padding:"16px 18px",flex:1,minWidth:150,opacity:v?1:0,transform:v?"translateY(0)":"translateY(10px)",transition:"all .5s cubic-bezier(.16,1,.3,1)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span style={{fontSize:10,color:t.tx3,textTransform:"uppercase",letterSpacing:".07em",fontWeight:500}}>{label}</span>{icon&&<span style={{color:color||t.tx3,opacity:.6,display:"flex"}}>{icon}</span>}</div><div style={{fontSize:22,fontWeight:600,color:color||t.tx,letterSpacing:"-.02em"}}>{val}</div>{sub&&<div style={{fontSize:10,color:t.tx3,marginTop:2}}>{sub}</div>}</div>)}
function Btn({children,v="default",onClick,s={},disabled}){const base={border:"none",borderRadius:9,cursor:disabled?"default":"pointer",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:500,display:"inline-flex",alignItems:"center",gap:5,transition:"all .15s",opacity:disabled?.5:1,...s};const vs={primary:{...base,background:`linear-gradient(135deg,${t.acc},#818cf8)`,color:"#fff",padding:"8px 16px"},default:{...base,background:t.sf2,border:`1px solid ${t.bdr}`,color:t.tx2,padding:"7px 13px"},ghost:{...base,background:"transparent",color:t.tx3,padding:"7px 10px"},danger:{...base,background:t.redD,color:t.red,padding:"7px 13px"}};return <button onClick={onClick} disabled={disabled} style={vs[v]||vs.default}>{children}</button>}
function Modal({open,onClose,title,children,w=600}){if(!open)return null;return(<div style={{position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}><div style={{position:"absolute",inset:0,background:t.ov,backdropFilter:"blur(6px)"}}/><div onClick={e=>e.stopPropagation()} style={{position:"relative",background:t.sf,border:`1px solid ${t.bdr}`,borderRadius:16,width:w,maxWidth:"95vw",maxHeight:"88vh",overflow:"auto",padding:"22px 26px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><h3 style={{fontSize:15,fontWeight:600,margin:0,color:t.tx}}>{title}</h3><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex"}}>{IC.x}</button></div>{children}</div></div>)}
function Inp({label,value,onChange,ph,s={}}){return(<div style={{display:"flex",flexDirection:"column",gap:4,...s}}>{label&&<label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}<input value={value} onChange={e=>onChange(e.target.value)} placeholder={ph} style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none"}} onFocus={e=>e.target.style.borderColor=t.acc} onBlur={e=>e.target.style.borderColor=t.bdr}/></div>)}
function Sel({label,value,onChange,opts,s={}}){return(<div style={{display:"flex",flexDirection:"column",gap:4,...s}}>{label&&<label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}<select value={value} onChange={e=>onChange(e.target.value)} style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none",appearance:"auto"}}>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select></div>)}
function Pagination({total,page,perPage,onPage}){const pages=Math.ceil(total/perPage);if(pages<=1)return null;return(<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderTop:`1px solid ${t.bdr}`}}><span style={{fontSize:11.5,color:t.tx3}}>{(page-1)*perPage+1}–{Math.min(page*perPage,total)} of {total}</span><div style={{display:"flex",gap:3}}><Btn onClick={()=>onPage(Math.max(1,page-1))} disabled={page===1}>{IC.chL}</Btn>{Array.from({length:Math.min(pages,5)},(_,i)=>{let p=i+1;if(pages>5){const st=Math.max(1,Math.min(page-2,pages-4));p=st+i}return <button key={p} onClick={()=>onPage(p)} style={{width:28,height:28,borderRadius:6,border:"none",background:p===page?t.accD:"transparent",color:p===page?t.acc:t.tx3,fontSize:11.5,fontWeight:p===page?600:400,cursor:"pointer",fontFamily:"inherit"}}>{p}</button>})}<Btn onClick={()=>onPage(Math.min(pages,page+1))} disabled={page===pages}>{IC.chR}</Btn></div></div>)}

function DonutChart({segments,size=115,stroke=12}){const total=segments.reduce((s,x)=>s+x.val,0);const r=(size-stroke)/2;const circ=2*Math.PI*r;let offset=0;const[hov,setHov]=useState(null);return(<div style={{position:"relative",width:size,height:size}}><svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={t.sf2} strokeWidth={stroke}/>{segments.map((seg,i)=>{const pct=seg.val/total;const dash=pct*circ;const o=offset;offset+=dash;return <circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={seg.color} strokeWidth={hov===i?stroke+3:stroke} strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-o} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"all .3s",cursor:"pointer"}} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}/>})}</svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:16,fontWeight:600,color:t.tx}}>{total}</div><div style={{fontSize:8,color:t.tx3,textTransform:"uppercase"}}>Files</div></div></div>)}

/* ═══════════════════ MAIN PAGE ═══════════════════ */
export default function DocumentsPage(){
  const[docs,setDocs]=useState(DOCS);
  const[view,setView]=useState("grid");
  const[search,setSearch]=useState("");
  const[fCat,setFCat]=useState("All");
  const[fType,setFType]=useState("All");
  const[showFilters,setShowFilters]=useState(false);
  const[pg,setPg]=useState(1);const PP=12;
  const[hovR,setHovR]=useState(null);
  const[sortK,setSortK]=useState(null);const[sortD,setSortD]=useState("desc");
  const[showUpload,setShowUpload]=useState(false);
  const[detail,setDetail]=useState(null);
  const[folderCat,setFolderCat]=useState(null);
  const[dragging,setDragging]=useState(false);

  const hasFilters=fCat!=="All"||fType!=="All"||search;
  const resetFilters=()=>{setFCat("All");setFType("All");setSearch("");setSortK(null);setSortD("desc");setPg(1);setFolderCat(null)};

  const types=useMemo(()=>["All",...new Set(docs.map(d=>d.type))],[docs]);

  const filtered=useMemo(()=>{
    let l=[...docs];
    const activeCat=folderCat||fCat;
    if(activeCat!=="All")l=l.filter(d=>d.cat===activeCat);
    if(fType!=="All")l=l.filter(d=>d.type===fType);
    if(search){const q=search.toLowerCase();l=l.filter(d=>`${d.name} ${d.cat} ${d.type} ${d.tags.join(" ")} ${d.vehicle||""} ${d.customer||""} ${d.uploadedBy}`.toLowerCase().includes(q))}
    if(sortK)l.sort((a,b)=>{const av=a[sortK],bv=b[sortK];return typeof av==="number"?(sortD==="asc"?av-bv:bv-av):(sortD==="asc"?String(av||"").localeCompare(String(bv||"")):String(bv||"").localeCompare(String(av||"")))});
    return l;
  },[docs,fCat,fType,search,sortK,sortD,folderCat]);

  const paged=filtered.slice((pg-1)*PP,pg*PP);
  const handleSort=k=>{if(sortK===k)setSortD(d=>d==="asc"?"desc":"asc");else{setSortK(k);setSortD("asc")}};
  const handleDel=id=>{setDocs(p=>p.filter(d=>d.id!==id));setDetail(null)};

  // Stats
  const typeCounts={};docs.forEach(d=>{typeCounts[d.type]=(typeCounts[d.type]||0)+1});
  const typeSegs=Object.entries(typeCounts).sort((a,b)=>b[1]-a[1]).map(([k,v])=>({val:v,color:TYPE_COL[k]||t.tx3,label:k}));
  const catCounts={};docs.forEach(d=>{catCounts[d.cat]=(catCounts[d.cat]||0)+1});
  const recentDocs=docs.filter(d=>d.date.includes("Mar")).length;

  const handleDrop=e=>{e.preventDefault();setDragging(false);setShowUpload(true)};

  const thS={textAlign:"left",padding:"10px 12px",fontSize:10,color:t.tx3,fontWeight:500,textTransform:"uppercase",letterSpacing:".06em",cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"};

  return(
    <div style={{minHeight:"100vh",background:t.bg,color:t.tx,fontFamily:"'Outfit',sans-serif"}} onDragOver={e=>{e.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={handleDrop}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${t.bdr};border-radius:3px}body{font-family:'Outfit',sans-serif;background:${t.bg}}`}</style>

      {/* Drag overlay */}
      {dragging&&<div style={{position:"fixed",inset:0,zIndex:999,background:"rgba(91,141,239,0.08)",border:"3px dashed rgba(91,141,239,0.4)",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:10}}><span style={{color:t.acc,display:"flex",transform:"scale(2)"}}>{IC.upload}</span><span style={{fontSize:16,fontWeight:500,color:t.acc}}>Drop files here to upload</span></div>}

      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 24px",borderBottom:`1px solid ${t.bdr}`,background:t.sf,position:"sticky",top:0,zIndex:20,flexWrap:"wrap",gap:10}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${t.acc},#818cf8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>AD</div>
          <div><h1 style={{fontSize:17,fontWeight:600,letterSpacing:"-.02em",margin:0}}>Documents</h1><span style={{fontSize:10.5,color:t.tx3}}>{docs.length} files · {fmtSize(totalSize)}</span></div>
        </div>
        <Btn v="primary" onClick={()=>setShowUpload(true)}>{IC.upload} Upload</Btn>
      </header>

      <div style={{padding:"18px 24px",display:"flex",flexDirection:"column",gap:18}}>

        {/* STATS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10}}>
          <Stat label="Total Documents" val={docs.length} icon={IC.file} delay={0}/>
          <Stat label="File Types" val={Object.keys(typeCounts).length} sub={Object.entries(typeCounts).map(([k,v])=>`${v} ${k}`).join(", ")} icon={IC.file} delay={60}/>
          <Stat label="Storage Used" val={fmtSize(totalSize)} icon={IC.hdd} delay={120} color={t.acc}/>
          <Stat label="Recent Uploads" val={recentDocs} sub="This month (March)" icon={IC.upload} delay={180} color={t.grn}/>
          <Stat label="Categories" val={Object.keys(catCounts).length} sub={`${Math.max(...Object.values(catCounts))} in largest`} icon={IC.folder} delay={240}/>
        </div>

        {/* ROW 1: Type Donut + Recent Feed */}
        <div style={{display:"grid",gridTemplateColumns:"3fr 5fr",gap:14}}>
          <Card s={{padding:"18px 20px",display:"flex",flexDirection:"column"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>By File Type</div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><DonutChart segments={typeSegs}/></div>
            <div style={{display:"flex",flexDirection:"column",gap:5,marginTop:"auto"}}>
              {typeSegs.map(s=><div key={s.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:t.tx2}}><span style={{width:6,height:6,borderRadius:2,background:s.color}}/>{s.label}</span><span style={{fontSize:11.5,fontWeight:500,color:t.tx}}>{s.val}</span></div>)}
            </div>
          </Card>

          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:12}}>Recent Documents</div>
            {docs.sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,6).map((d,i)=>(
              <div key={d.id} onClick={()=>setDetail(d)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<5?`1px solid ${t.bdr}`:"none",cursor:"pointer",transition:"background .1s"}} onMouseEnter={e=>e.currentTarget.style.background=t.cardH} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{width:34,height:34,borderRadius:8,background:`${TYPE_COL[d.type]||t.tx3}15`,display:"flex",alignItems:"center",justifyContent:"center",color:TYPE_COL[d.type]||t.tx3,flexShrink:0}}>{getIcon(d.type==="PNG"||d.type==="JPG"?"IMG":d.type)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:500,color:t.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</div>
                  <div style={{fontSize:10,color:t.tx3}}>{d.type} · {fmtSize(d.size)} · {d.uploadedBy}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:10.5,color:t.tx3}}>{d.date}</div><span style={{padding:"1px 6px",borderRadius:4,fontSize:9.5,background:`${CAT_COL[d.cat]||t.tx3}15`,color:CAT_COL[d.cat]||t.tx3,fontWeight:500}}>{d.cat}</span></div>
              </div>
            ))}
          </Card>
        </div>

        {/* CATEGORY FOLDERS */}
        <div>
          <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>{IC.folder} Category Folders {folderCat&&<span style={{fontSize:11,color:t.acc,cursor:"pointer",fontWeight:400}} onClick={()=>{setFolderCat(null);setPg(1)}}>← Back to all</span>}</div>
          {!folderCat?(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:8}}>
              {CATEGORIES.map(cat=>{const count=catCounts[cat]||0;const col=CAT_COL[cat]||t.tx3;return(
                <div key={cat} onClick={()=>{setFolderCat(cat);setPg(1)}} style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:10,padding:"14px 16px",cursor:"pointer",transition:"all .15s",textAlign:"center"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=col;e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.bdr;e.currentTarget.style.transform="none"}}>
                  <div style={{fontSize:24,marginBottom:6}}>{CAT_ICON[cat]}</div>
                  <div style={{fontSize:12,fontWeight:500,color:t.tx}}>{cat}</div>
                  <div style={{fontSize:10.5,color:col,fontWeight:500,marginTop:2}}>{count} file{count!==1?"s":""}</div>
                </div>
              )})}
            </div>
          ):(
            <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:`${CAT_COL[folderCat]}10`,borderRadius:10,border:`1px solid ${CAT_COL[folderCat]}20`}}>
              <span style={{fontSize:22}}>{CAT_ICON[folderCat]}</span>
              <div><div style={{fontSize:13,fontWeight:600,color:t.tx}}>{folderCat}</div><div style={{fontSize:10.5,color:t.tx3}}>{filtered.length} document{filtered.length!==1?"s":""}</div></div>
            </div>
          )}
        </div>

        {/* TOOLBAR */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{display:"flex",alignItems:"center",gap:5,background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"6px 10px",minWidth:170}}>
              <span style={{color:t.tx3,display:"flex"}}>{IC.search}</span>
              <input placeholder="Search files, tags, people..." value={search} onChange={e=>{setSearch(e.target.value);setPg(1)}} style={{background:"none",border:"none",outline:"none",color:t.tx,fontSize:12,width:"100%",fontFamily:"inherit"}}/>
              {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex"}}>{IC.x}</button>}
            </div>
            <Btn onClick={()=>setShowFilters(!showFilters)} s={{background:showFilters?t.accD:t.sf2,color:showFilters?t.acc:t.tx2}}>{IC.filter} Filters{hasFilters&&<span style={{width:6,height:6,borderRadius:"50%",background:t.acc}}/>}</Btn>
            {(hasFilters||folderCat)&&<Btn v="ghost" onClick={resetFilters}>{IC.reset} Reset</Btn>}
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <span style={{fontSize:11.5,color:t.tx3}}>{filtered.length} file{filtered.length!==1?"s":""}</span>
            <div style={{display:"flex",border:`1px solid ${t.bdr}`,borderRadius:7,overflow:"hidden"}}>
              {[["grid","Grid",IC.grid],["table","Table",IC.table]].map(([m,l,icon])=>(
                <button key={m} onClick={()=>setView(m)} style={{padding:"5px 10px",background:view===m?t.sf2:"transparent",color:view===m?t.tx:t.tx3,border:"none",fontSize:11,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}>{icon}{l}</button>
              ))}
            </div>
          </div>
        </div>

        {showFilters&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8,padding:"14px 16px",background:t.card,borderRadius:12,border:`1px solid ${t.bdr}`}}>
          <Sel label="Category" value={fCat} onChange={v=>{setFCat(v);setFolderCat(null);setPg(1)}} opts={["All",...CATEGORIES]}/>
          <Sel label="File Type" value={fType} onChange={v=>{setFType(v);setPg(1)}} opts={types}/>
        </div>}

        {/* GRID VIEW */}
        {view==="grid"?(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:10}}>
            {paged.map(d=>{const col=TYPE_COL[d.type]||t.tx3;return(
              <div key={d.id} onClick={()=>setDetail(d)} style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:12,overflow:"hidden",cursor:"pointer",transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=t.bdr2;e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.bdr;e.currentTarget.style.transform="none"}}>
                <div style={{height:65,background:`${col}08`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                  <span style={{color:col,opacity:.6,transform:"scale(1.8)",display:"flex"}}>{getIcon(d.type==="PNG"||d.type==="JPG"?"IMG":d.type)}</span>
                  <span style={{position:"absolute",top:8,right:8,padding:"2px 7px",borderRadius:4,fontSize:9.5,background:`${col}20`,color:col,fontWeight:600}}>{d.type}</span>
                  <span style={{position:"absolute",top:8,left:8,padding:"2px 7px",borderRadius:4,fontSize:9.5,background:`${CAT_COL[d.cat]}15`,color:CAT_COL[d.cat],fontWeight:500}}>{d.cat}</span>
                </div>
                <div style={{padding:"12px 14px"}}>
                  <div style={{fontSize:12.5,fontWeight:500,color:t.tx,marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10.5,color:t.tx3,marginBottom:6}}>
                    <span>{fmtSize(d.size)}{d.pages?` · ${d.pages} pg`:""}</span>
                    <span>{d.date}</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",alignItems:"center",gap:3,fontSize:10,color:t.tx3}}><span style={{display:"flex",transform:"scale(0.85)"}}>{IC.user}</span>{d.uploadedBy}</div>
                    <div style={{display:"flex",gap:3}} onClick={e=>e.stopPropagation()}>
                      <button style={{background:t.sf2,border:`1px solid ${t.bdr}`,borderRadius:5,padding:"3px 5px",cursor:"pointer",color:t.tx2,display:"flex"}}>{IC.eye}</button>
                      <button style={{background:t.sf2,border:`1px solid ${t.bdr}`,borderRadius:5,padding:"3px 5px",cursor:"pointer",color:t.tx2,display:"flex"}}>{IC.dl}</button>
                      <button onClick={()=>handleDel(d.id)} style={{background:t.redD,border:"none",borderRadius:5,padding:"3px 5px",cursor:"pointer",color:t.red,display:"flex"}}>{IC.trash}</button>
                    </div>
                  </div>
                  {d.tags.length>0&&<div style={{display:"flex",gap:3,marginTop:6,flexWrap:"wrap"}}>{d.tags.slice(0,3).map(tag=><span key={tag} style={{padding:"1px 6px",borderRadius:4,fontSize:9,background:t.sf2,color:t.tx3,border:`1px solid ${t.bdr}`}}>{tag}</span>)}{d.tags.length>3&&<span style={{fontSize:9,color:t.tx3}}>+{d.tags.length-3}</span>}</div>}
                </div>
              </div>
            )})}
            {paged.length===0&&<div style={{gridColumn:"1/-1",padding:40,textAlign:"center",color:t.tx3}}>No documents match your filters</div>}
          </div>
        ):(
          /* TABLE VIEW */
          <Card s={{overflow:"hidden"}}>
            <div style={{overflow:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:900}}>
                <thead><tr style={{borderBottom:`1px solid ${t.bdr}`}}>
                  {[["Name","name"],["Type","type"],["Size","size"],["Category","cat"],["Uploaded By","uploadedBy"],["Related To",null],["Tags",null],["Date","date"],["",null]].map(([h,k])=>(
                    <th key={h||"act"} style={thS} onClick={()=>k&&handleSort(k)}><span style={{display:"inline-flex",alignItems:"center",gap:2}}>{h}{sortK===k&&(sortD==="asc"?IC.aUp:IC.aDn)}</span></th>
                  ))}
                </tr></thead>
                <tbody>{paged.map((d,i)=>{const col=TYPE_COL[d.type]||t.tx3;const isH=hovR===d.id;return(
                  <tr key={d.id} onMouseEnter={()=>setHovR(d.id)} onMouseLeave={()=>setHovR(null)} style={{borderBottom:i<paged.length-1?`1px solid ${t.bdr}`:"none",background:isH?t.cardH:"transparent",transition:"background .1s",cursor:"pointer"}} onClick={()=>setDetail(d)}>
                    <td style={{padding:"10px 12px"}}><div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:32,height:32,borderRadius:7,background:`${col}15`,display:"flex",alignItems:"center",justifyContent:"center",color:col,flexShrink:0}}>{getIcon(d.type==="PNG"||d.type==="JPG"?"IMG":d.type)}</div><div style={{fontSize:12.5,fontWeight:500,color:t.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:220}}>{d.name}</div></div></td>
                    <td style={{padding:"10px 12px"}}><span style={{padding:"2px 7px",borderRadius:4,fontSize:10,background:`${col}18`,color:col,fontWeight:600}}>{d.type}</span></td>
                    <td style={{padding:"10px 12px",fontSize:11.5,color:t.tx2}}>{fmtSize(d.size)}</td>
                    <td style={{padding:"10px 12px"}}><span style={{padding:"2px 7px",borderRadius:4,fontSize:10.5,background:`${CAT_COL[d.cat]}15`,color:CAT_COL[d.cat],fontWeight:500}}>{d.cat}</span></td>
                    <td style={{padding:"10px 12px",fontSize:11.5,color:t.tx2}}>{d.uploadedBy}</td>
                    <td style={{padding:"10px 12px",fontSize:11,color:t.tx3}}>{d.vehicle||d.customer||"—"}</td>
                    <td style={{padding:"10px 12px"}}><div style={{display:"flex",gap:2,flexWrap:"wrap"}}>{d.tags.slice(0,2).map(tag=><span key={tag} style={{padding:"1px 5px",borderRadius:3,fontSize:9,background:t.sf2,color:t.tx3}}>{tag}</span>)}</div></td>
                    <td style={{padding:"10px 12px",fontSize:11,color:t.tx3,whiteSpace:"nowrap"}}>{d.date}</td>
                    <td style={{padding:"10px 12px"}}><div style={{display:"flex",gap:3,opacity:isH?1:0,transition:"opacity .1s"}} onClick={e=>e.stopPropagation()}>
                      <button style={{background:t.sf2,border:`1px solid ${t.bdr}`,borderRadius:5,padding:"3px 5px",cursor:"pointer",color:t.tx2,display:"flex"}}>{IC.eye}</button>
                      <button style={{background:t.sf2,border:`1px solid ${t.bdr}`,borderRadius:5,padding:"3px 5px",cursor:"pointer",color:t.tx2,display:"flex"}}>{IC.dl}</button>
                      <button onClick={()=>handleDel(d.id)} style={{background:t.redD,border:"none",borderRadius:5,padding:"3px 5px",cursor:"pointer",color:t.red,display:"flex"}}>{IC.trash}</button>
                    </div></td>
                  </tr>
                )})}</tbody>
              </table>
            </div>
            <Pagination total={filtered.length} page={pg} perPage={PP} onPage={setPg}/>
          </Card>
        )}
      </div>

      {/* UPLOAD MODAL */}
      <UploadModal open={showUpload} onClose={()=>setShowUpload(false)} onUpload={d=>{setDocs(p=>[d,...p]);setShowUpload(false)}}/>

      {/* DETAIL MODAL */}
      <Modal open={!!detail} onClose={()=>setDetail(null)} title="Document Details" w={620}>
        {detail&&<DetailView doc={detail} onDel={()=>handleDel(detail.id)}/>}
      </Modal>
    </div>
  );
}

/* ═══════════════════ UPLOAD MODAL ═══════════════════ */
function UploadModal({open,onClose,onUpload}){
  const[name,setName]=useState("");const[type,setType]=useState("PDF");const[cat,setCat]=useState("Sales");
  const[vehicle,setVehicle]=useState("");const[customer,setCustomer]=useState("");const[tags,setTags]=useState("");
  const[upBy,setUpBy]=useState("Sarah Kim");
  const fileRef=useRef(null);const[fileName,setFileName]=useState("");
  const handleFile=e=>{const f=e.target.files[0];if(f){setFileName(f.name);if(!name)setName(f.name.replace(/\.[^/.]+$/,""));const ext=f.name.split(".").pop().toUpperCase();if(["PDF","DOCX","XLSX","PNG","JPG","CSV","TXT","PPTX"].includes(ext))setType(ext)}};
  const reset=()=>{setName("");setType("PDF");setCat("Sales");setVehicle("");setCustomer("");setTags("");setUpBy("Sarah Kim");setFileName("")};
  return(
    <Modal open={open} onClose={()=>{onClose();reset()}} title="Upload Document" w={640}>
      <div onClick={()=>fileRef.current?.click()} style={{height:100,borderRadius:12,border:`2px dashed ${t.bdr}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,cursor:"pointer",marginBottom:16,transition:"border .2s",background:t.inp}} onMouseEnter={e=>e.currentTarget.style.borderColor=t.acc} onMouseLeave={e=>e.currentTarget.style.borderColor=t.bdr}>
        <span style={{color:t.acc,display:"flex"}}>{IC.upload}</span>
        <span style={{fontSize:12,color:t.tx2}}>{fileName||"Click to select a file or drag & drop"}</span>
        <span style={{fontSize:10,color:t.tx3}}>PDF, DOCX, XLSX, PNG, JPG, CSV</span>
      </div>
      <input ref={fileRef} type="file" onChange={handleFile} style={{display:"none"}}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Inp label="Document Name" value={name} onChange={setName} ph="Enter document name" s={{gridColumn:"1/-1"}}/>
        <Sel label="File Type" value={type} onChange={setType} opts={["PDF","DOCX","XLSX","PNG","JPG","CSV","TXT","PPTX"]}/>
        <Sel label="Category" value={cat} onChange={setCat} opts={CATEGORIES}/>
        <Inp label="Related Vehicle" value={vehicle} onChange={setVehicle} ph="e.g. 2024 BMW M4 (optional)"/>
        <Inp label="Related Customer" value={customer} onChange={setCustomer} ph="e.g. James Mitchell (optional)"/>
        <Sel label="Uploaded By" value={upBy} onChange={setUpBy} opts={["Sarah Kim","Mike Reeves","Tom Liu","Ana Martinez","Derek Brown"]}/>
        <Inp label="Tags (comma-separated)" value={tags} onChange={setTags} ph="e.g. sale, contract, urgent"/>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:18}}>
        <Btn onClick={()=>{onClose();reset()}}>Cancel</Btn>
        <Btn v="primary" onClick={()=>{if(!name)return;onUpload({id:Date.now(),name,type,size:Math.floor(100000+Math.random()*5000000),pages:["PNG","JPG"].includes(type)?null:Math.floor(1+Math.random()*10),date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),cat,vehicle:vehicle||null,customer:customer||null,uploadedBy:upBy,tags:tags?tags.split(",").map(t=>t.trim()).filter(Boolean):[]});reset()}} disabled={!name}>{IC.upload} Upload</Btn>
      </div>
    </Modal>
  );
}

/* ═══════════════════ DETAIL VIEW ═══════════════════ */
function DetailView({doc:d,onDel}){
  const col=TYPE_COL[d.type]||t.tx3;
  return(<div>
    <div style={{display:"flex",gap:16,marginBottom:18}}>
      <div style={{width:70,height:70,borderRadius:12,background:`${col}12`,display:"flex",alignItems:"center",justifyContent:"center",color:col,flexShrink:0}}><span style={{transform:"scale(2)",display:"flex"}}>{getIcon(d.type==="PNG"||d.type==="JPG"?"IMG":d.type)}</span></div>
      <div style={{flex:1}}>
        <h3 style={{margin:"0 0 4px",fontSize:16,fontWeight:600,color:t.tx}}>{d.name}</h3>
        <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
          <span style={{padding:"2px 8px",borderRadius:5,fontSize:10.5,background:`${col}18`,color:col,fontWeight:600}}>{d.type}</span>
          <span style={{padding:"2px 8px",borderRadius:5,fontSize:10.5,background:`${CAT_COL[d.cat]}15`,color:CAT_COL[d.cat],fontWeight:500}}>{d.cat}</span>
        </div>
      </div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
      {[["Size",fmtSize(d.size),t.tx],["Pages",d.pages?`${d.pages} pages`:"N/A",t.tx],["Date",d.date,t.tx]].map(([l,v,c])=>(
        <div key={l} style={{background:t.sf2,borderRadius:9,padding:"10px 12px",border:`1px solid ${t.bdr}`}}>
          <div style={{fontSize:9.5,color:t.tx3,textTransform:"uppercase",letterSpacing:".05em"}}>{l}</div>
          <div style={{fontSize:13,fontWeight:500,color:c,marginTop:2}}>{v}</div>
        </div>
      ))}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      {[["Uploaded By",d.uploadedBy,IC.user],["Vehicle",d.vehicle||"—",IC.file],["Customer",d.customer||"—",IC.user],["Category",d.cat,IC.folder]].map(([l,v,icon])=>(
        <div key={l}><div style={{fontSize:9.5,color:t.tx3,textTransform:"uppercase",letterSpacing:".05em",marginBottom:2}}>{l}</div><div style={{fontSize:12,color:t.tx,display:"flex",alignItems:"center",gap:4}}><span style={{color:t.tx3,display:"flex",transform:"scale(0.85)"}}>{icon}</span>{v}</div></div>
      ))}
    </div>

    {d.tags.length>0&&<div style={{marginBottom:16}}>
      <div style={{fontSize:10,color:t.tx3,textTransform:"uppercase",letterSpacing:".05em",marginBottom:6,display:"flex",alignItems:"center",gap:3}}>{IC.tag} Tags</div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{d.tags.map(tag=><span key={tag} style={{padding:"3px 9px",borderRadius:6,fontSize:11,background:t.sf2,color:t.tx2,border:`1px solid ${t.bdr}`}}>{tag}</span>)}</div>
    </div>}

    <div style={{display:"flex",justifyContent:"flex-end",gap:6}}>
      <Btn v="danger" onClick={onDel}>{IC.trash} Delete</Btn>
      <Btn>{IC.eye} Preview</Btn>
      <Btn v="primary">{IC.dl} Download</Btn>
    </div>
  </div>);
}
