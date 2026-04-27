import { useState, useMemo, useEffect } from "react";

/* ═══════════════════ THEME ═══════════════════ */
const t={bg:"#07070a",sf:"#0e0e13",sf2:"#131318",card:"#101015",cardH:"#17171e",bdr:"#1d1d26",bdr2:"#282832",tx:"#ededf0",tx2:"#888894",tx3:"#50505c",acc:"#5b8def",accD:"rgba(91,141,239,0.1)",grn:"#34d399",grnD:"rgba(52,211,153,0.1)",red:"#f87171",redD:"rgba(248,113,113,0.1)",amb:"#fbbf24",ambD:"rgba(251,191,36,0.1)",pur:"#a78bfa",purD:"rgba(167,139,250,0.1)",cyn:"#22d3ee",cynD:"rgba(34,211,238,0.1)",inp:"#0b0b10",ov:"rgba(0,0,0,0.75)",pink:"#f472b6",pinkD:"rgba(244,114,182,0.1)",lime:"#a3e635",org:"#fb923c"};

const ROLES=["Sales Manager","Sales Associate","Finance Manager","Lot Manager","Service Advisor","Customer Relations","General Manager"];
const LOCATIONS=["Milltown","Elizabeth"];
const EMP_COLS=[t.acc,t.grn,t.pur,t.amb,t.cyn,t.pink,t.org,t.red,t.lime];

/* ═══════════════════ ICONS ═══════════════════ */
const IC={
  users:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  dollar:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  trend:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  trophy:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 1012 0V2z"/></svg>,
  star:<svg width="12" height="12" fill="currentColor" stroke="none" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  starO:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  search:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  plus:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  x:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  edit:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  filter:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  reset:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>,
  phone:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  mail:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  mapPin:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  calendar:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  target:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  grid:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  table:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
  aUp:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  aDn:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  chL:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>,
  chR:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>,
  check:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
};

/* ═══════════════════ SAMPLE DATA ═══════════════════ */
const EMP_DATA=[
  {id:1,name:"Sarah Kim",role:"Sales Manager",email:"sarah.kim@autodealer.pro",phone:"(732) 555-1001",location:"Milltown",startDate:"Mar 2020",status:"Active",sales:14,revenue:820000,commission:38000,rating:4.8,targetMonthly:80000,achievedMonthly:72000,recentSales:["2024 Tesla Model S Plaid","2024 BMW M3 CS","2023 Porsche Cayenne GTS","2024 Mercedes-Benz AMG C 63","2023 Ferrari Roma"]},
  {id:2,name:"Mike Reeves",role:"Sales Associate",email:"mike.r@autodealer.pro",phone:"(732) 555-1002",location:"Elizabeth",startDate:"Jun 2021",status:"Active",sales:11,revenue:560000,commission:24000,rating:4.5,targetMonthly:60000,achievedMonthly:55000,recentSales:["2024 Land Rover Range Rover Velar","2023 Porsche Taycan 4S"]},
  {id:3,name:"Tom Liu",role:"Finance Manager",email:"tom.liu@autodealer.pro",phone:"(732) 555-1003",location:"Milltown",startDate:"Jan 2021",status:"Active",sales:8,revenue:410000,commission:18000,rating:4.3,targetMonthly:50000,achievedMonthly:42000,recentSales:["2024 Audi RS7","2023 BMW X5 M"]},
  {id:4,name:"Ana Martinez",role:"Sales Associate",email:"ana.m@autodealer.pro",phone:"(908) 555-1004",location:"Elizabeth",startDate:"Sep 2021",status:"Active",sales:12,revenue:640000,commission:28000,rating:4.7,targetMonthly:65000,achievedMonthly:68000,recentSales:["2023 Mercedes-Benz GLE 63S","2024 Lexus LC 500","2024 Chevrolet Corvette"]},
  {id:5,name:"Derek Brown",role:"Lot Manager",email:"derek.b@autodealer.pro",phone:"(732) 555-1005",location:"Milltown",startDate:"Apr 2020",status:"Active",sales:6,revenue:280000,commission:12000,rating:4.1,targetMonthly:35000,achievedMonthly:28000,recentSales:[]},
  {id:6,name:"Lisa Chen",role:"Service Advisor",email:"lisa.c@autodealer.pro",phone:"(908) 555-1006",location:"Elizabeth",startDate:"Nov 2022",status:"Active",sales:3,revenue:120000,commission:5000,rating:4.4,targetMonthly:20000,achievedMonthly:18000,recentSales:[]},
  {id:7,name:"Jake Wilson",role:"Sales Associate",email:"jake.w@autodealer.pro",phone:"(732) 555-1007",location:"Milltown",startDate:"Feb 2023",status:"Active",sales:7,revenue:340000,commission:15000,rating:3.9,targetMonthly:55000,achievedMonthly:38000,recentSales:["2024 Genesis G70"]},
  {id:8,name:"Nina Patel",role:"Customer Relations",email:"nina.p@autodealer.pro",phone:"(908) 555-1008",location:"Elizabeth",startDate:"Aug 2023",status:"Active",sales:2,revenue:98000,commission:4000,rating:4.6,targetMonthly:15000,achievedMonthly:14000,recentSales:[]},
  {id:9,name:"Chris Taylor",role:"Sales Associate",email:"chris.t@autodealer.pro",phone:"(732) 555-1009",location:"Milltown",startDate:"Oct 2022",status:"Inactive",sales:5,revenue:210000,commission:9000,rating:3.5,targetMonthly:50000,achievedMonthly:0,recentSales:[]},
];

/* ═══════════════════ HELPERS ═══════════════════ */
const fmt=n=>"$"+n.toLocaleString();
const fK=n=>n>=1e6?"$"+(n/1e6).toFixed(2)+"M":n>=1e3?"$"+(n/1e3).toFixed(1)+"K":"$"+n;

/* ═══════════════════ COMPONENTS ═══════════════════ */
function Card({children,s={}}){return <div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:14,...s}}>{children}</div>}
function Stat({label,val,chg,up,sub,icon,delay=0,color}){const[v,setV]=useState(false);useEffect(()=>{const tm=setTimeout(()=>setV(true),delay);return()=>clearTimeout(tm)},[]);return(<div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:13,padding:"16px 18px",flex:1,minWidth:150,opacity:v?1:0,transform:v?"translateY(0)":"translateY(10px)",transition:"all .5s cubic-bezier(.16,1,.3,1)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span style={{fontSize:10,color:t.tx3,textTransform:"uppercase",letterSpacing:".07em",fontWeight:500}}>{label}</span>{icon&&<span style={{color:color||t.tx3,opacity:.6,display:"flex"}}>{icon}</span>}</div><div style={{fontSize:22,fontWeight:600,color:color||t.tx,letterSpacing:"-.02em"}}>{val}</div>{sub&&<div style={{fontSize:10,color:t.tx3,marginTop:2}}>{sub}</div>}</div>)}
function Btn({children,v="default",onClick,s={},disabled}){const base={border:"none",borderRadius:9,cursor:disabled?"default":"pointer",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:500,display:"inline-flex",alignItems:"center",gap:5,transition:"all .15s",opacity:disabled?.5:1,...s};const vs={primary:{...base,background:`linear-gradient(135deg,${t.acc},#818cf8)`,color:"#fff",padding:"8px 16px"},default:{...base,background:t.sf2,border:`1px solid ${t.bdr}`,color:t.tx2,padding:"7px 13px"},ghost:{...base,background:"transparent",color:t.tx3,padding:"7px 10px"},danger:{...base,background:t.redD,color:t.red,padding:"7px 13px"}};return <button onClick={onClick} disabled={disabled} style={vs[v]||vs.default}>{children}</button>}
function ProgressBar({pct,color,h=5}){return <div style={{height:h,borderRadius:h,background:t.sf2,width:"100%"}}><div style={{height:"100%",borderRadius:h,background:color,width:`${Math.min(100,pct)}%`,transition:"width .8s cubic-bezier(.16,1,.3,1)"}}/></div>}
function Stars({rating,size=12,onChange}){return <div style={{display:"flex",gap:1}}>{[1,2,3,4,5].map(i=><span key={i} onClick={()=>onChange&&onChange(i)} style={{cursor:onChange?"pointer":"default",color:i<=Math.round(rating)?t.amb:t.bdr2,display:"flex"}}>{i<=Math.round(rating)?IC.star:IC.starO}</span>)}</div>}
function Modal({open,onClose,title,children,w=620}){if(!open)return null;return(<div style={{position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}><div style={{position:"absolute",inset:0,background:t.ov,backdropFilter:"blur(6px)"}}/><div onClick={e=>e.stopPropagation()} style={{position:"relative",background:t.sf,border:`1px solid ${t.bdr}`,borderRadius:16,width:w,maxWidth:"95vw",maxHeight:"88vh",overflow:"auto",padding:"22px 26px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><h3 style={{fontSize:15,fontWeight:600,margin:0,color:t.tx}}>{title}</h3><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex"}}>{IC.x}</button></div>{children}</div></div>)}
function Inp({label,value,onChange,ph,type="text",s={}}){return(<div style={{display:"flex",flexDirection:"column",gap:4,...s}}>{label&&<label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={ph} style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none"}} onFocus={e=>e.target.style.borderColor=t.acc} onBlur={e=>e.target.style.borderColor=t.bdr}/></div>)}
function Sel({label,value,onChange,opts,s={}}){return(<div style={{display:"flex",flexDirection:"column",gap:4,...s}}>{label&&<label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}<select value={value} onChange={e=>onChange(e.target.value)} style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none",appearance:"auto"}}>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select></div>)}

function DonutChart({segments,size=110,stroke=11}){const total=segments.reduce((s,x)=>s+x.val,0);const r=(size-stroke)/2;const circ=2*Math.PI*r;let offset=0;const[hov,setHov]=useState(null);return(<div style={{position:"relative",width:size,height:size}}><svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={t.sf2} strokeWidth={stroke}/>{segments.map((seg,i)=>{const pct=seg.val/total;const dash=pct*circ;const o=offset;offset+=dash;return <circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={seg.color} strokeWidth={hov===i?stroke+3:stroke} strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-o} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"all .3s",cursor:"pointer"}} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}/>})}</svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:15,fontWeight:600,color:t.tx}}>{fK(total)}</div><div style={{fontSize:8,color:t.tx3,textTransform:"uppercase"}}>Total</div></div></div>)}

/* ═══════════════════ MAIN PAGE ═══════════════════ */
export default function EmployeesPage(){
  const[emps,setEmps]=useState(EMP_DATA);
  const[view,setView]=useState("cards");
  const[search,setSearch]=useState("");
  const[fRole,setFRole]=useState("All");
  const[fLoc,setFLoc]=useState("All");
  const[fStatus,setFStatus]=useState("All");
  const[showFilters,setShowFilters]=useState(false);
  const[hovR,setHovR]=useState(null);
  const[sortK,setSortK]=useState(null);const[sortD,setSortD]=useState("desc");
  const[detail,setDetail]=useState(null);
  const[showAdd,setShowAdd]=useState(false);
  const[editEmp,setEditEmp]=useState(null);

  const hasFilters=fRole!=="All"||fLoc!=="All"||fStatus!=="All"||search;
  const resetFilters=()=>{setFRole("All");setFLoc("All");setFStatus("All");setSearch("");setSortK(null);setSortD("desc")};

  const filtered=useMemo(()=>{
    let l=[...emps];
    if(fRole!=="All")l=l.filter(e=>e.role===fRole);
    if(fLoc!=="All")l=l.filter(e=>e.location===fLoc);
    if(fStatus!=="All")l=l.filter(e=>e.status===fStatus);
    if(search){const q=search.toLowerCase();l=l.filter(e=>`${e.name} ${e.role} ${e.email}`.toLowerCase().includes(q))}
    if(sortK)l.sort((a,b)=>{const av=a[sortK],bv=b[sortK];return typeof av==="number"?(sortD==="asc"?av-bv:bv-av):(sortD==="asc"?String(av).localeCompare(String(bv)):String(bv).localeCompare(String(av)))});
    else l.sort((a,b)=>b.revenue-a.revenue);
    return l;
  },[emps,fRole,fLoc,fStatus,search,sortK,sortD]);

  const handleSort=k=>{if(sortK===k)setSortD(d=>d==="asc"?"desc":"asc");else{setSortK(k);setSortD("asc")}};
  const handleDel=id=>{setEmps(p=>p.filter(e=>e.id!==id));setDetail(null)};

  // Stats
  const active=emps.filter(e=>e.status==="Active");
  const totalSales=active.reduce((s,e)=>s+e.sales,0);
  const totalRev=active.reduce((s,e)=>s+e.revenue,0);
  const totalComm=active.reduce((s,e)=>s+e.commission,0);
  const avgRating=active.length?(active.reduce((s,e)=>s+e.rating,0)/active.length).toFixed(1):"0";
  const topPerformer=active.sort((a,b)=>b.revenue-a.revenue)[0];

  // Charts
  const commSegs=active.sort((a,b)=>b.commission-a.commission).slice(0,6).map((e,i)=>({val:e.commission,color:EMP_COLS[i],label:e.name}));
  const revRanked=active.sort((a,b)=>b.revenue-a.revenue).slice(0,6);

  const thS={textAlign:"left",padding:"10px 12px",fontSize:10,color:t.tx3,fontWeight:500,textTransform:"uppercase",letterSpacing:".06em",cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"};

  return(
    <div style={{minHeight:"100vh",background:t.bg,color:t.tx,fontFamily:"'Outfit',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${t.bdr};border-radius:3px}body{font-family:'Outfit',sans-serif;background:${t.bg}}`}</style>

      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 24px",borderBottom:`1px solid ${t.bdr}`,background:t.sf,position:"sticky",top:0,zIndex:20,flexWrap:"wrap",gap:10}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${t.acc},#818cf8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>AD</div>
          <div><h1 style={{fontSize:17,fontWeight:600,letterSpacing:"-.02em",margin:0}}>Employees</h1><span style={{fontSize:10.5,color:t.tx3}}>{active.length} active · {emps.length} total</span></div>
        </div>
        <Btn v="primary" onClick={()=>setShowAdd(true)}>{IC.plus} Add Employee</Btn>
      </header>

      <div style={{padding:"18px 24px",display:"flex",flexDirection:"column",gap:18}}>

        {/* STATS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10}}>
          <Stat label="Team Size" val={active.length} sub={`${emps.length-active.length} inactive`} icon={IC.users} delay={0}/>
          <Stat label="Total Sales" val={totalSales} chg="8%" up icon={IC.trend} delay={60}/>
          <Stat label="Revenue Generated" val={fK(totalRev)} icon={IC.dollar} delay={120} color={t.grn}/>
          <Stat label="Commissions Paid" val={fK(totalComm)} icon={IC.dollar} delay={180} color={t.amb}/>
          <Stat label="Top Performer" val={topPerformer?.name.split(" ")[0]||"—"} sub={topPerformer?fK(topPerformer.revenue)+" revenue":""} icon={IC.trophy} delay={240} color={t.acc}/>
          <Stat label="Avg Rating" val={avgRating} sub="Out of 5.0" icon={IC.star} delay={300} color={t.amb}/>
        </div>

        {/* ROW 1: Revenue Ranking + Commission Donut */}
        <div style={{display:"grid",gridTemplateColumns:"5fr 3fr",gap:14}}>
          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>Revenue by Salesperson</div>
            {revRanked.map((e,i)=>{const col=EMP_COLS[i];const pct=revRanked[0]?.revenue?(e.revenue/revRanked[0].revenue)*100:0;return(
              <div key={e.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:`${col}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:600,color:col,flexShrink:0}}>{e.name.split(" ").map(n=>n[0]).join("")}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:12,fontWeight:500,color:t.tx}}>{e.name}</span>
                    <span style={{fontSize:11.5,fontFamily:"monospace",color:col,fontWeight:500}}>{fK(e.revenue)}</span>
                  </div>
                  <ProgressBar pct={pct} color={col} h={6}/>
                </div>
              </div>
            )})}
          </Card>

          <Card s={{padding:"18px 20px",display:"flex",flexDirection:"column"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:2}}>Commission Breakdown</div>
            <div style={{fontSize:10.5,color:t.tx3,marginBottom:14}}>By team member</div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><DonutChart segments={commSegs}/></div>
            <div style={{display:"flex",flexDirection:"column",gap:5,marginTop:"auto"}}>
              {commSegs.map(s=><div key={s.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:t.tx2}}><span style={{width:6,height:6,borderRadius:2,background:s.color}}/>{s.label}</span><span style={{fontSize:11,fontWeight:500,color:t.tx,fontFamily:"monospace"}}>{fK(s.val)}</span></div>)}
            </div>
          </Card>
        </div>

        {/* TARGET ACHIEVEMENT */}
        <Card s={{padding:"18px 20px"}}>
          <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>Monthly Target Achievement</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
            {active.map((e,i)=>{const pct=e.targetMonthly>0?Math.round(e.achievedMonthly/e.targetMonthly*100):0;const col=pct>=100?t.grn:pct>=70?t.amb:t.red;return(
              <div key={e.id} style={{background:t.sf2,borderRadius:10,padding:"12px 14px",border:`1px solid ${t.bdr}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{width:24,height:24,borderRadius:"50%",background:`${EMP_COLS[i]}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:600,color:EMP_COLS[i]}}>{e.name.split(" ").map(n=>n[0]).join("")}</div>
                    <span style={{fontSize:12,fontWeight:500,color:t.tx}}>{e.name.split(" ")[0]}</span>
                  </div>
                  <span style={{fontSize:12,fontWeight:600,color:col}}>{pct}%</span>
                </div>
                <ProgressBar pct={pct} color={col} h={6}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:10,color:t.tx3}}>
                  <span>{fK(e.achievedMonthly)} achieved</span>
                  <span>{fK(e.targetMonthly)} target</span>
                </div>
              </div>
            )})}
          </div>
        </Card>

        {/* TOOLBAR */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{display:"flex",border:`1px solid ${t.bdr}`,borderRadius:7,overflow:"hidden"}}>
              {[["cards","Cards",IC.grid],["table","Table",IC.table]].map(([m,l,icon])=>(
                <button key={m} onClick={()=>setView(m)} style={{padding:"5px 10px",background:view===m?t.sf2:"transparent",color:view===m?t.tx:t.tx3,border:"none",fontSize:11,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}>{icon}{l}</button>
              ))}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:5,background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"6px 10px",minWidth:160}}>
              <span style={{color:t.tx3,display:"flex"}}>{IC.search}</span>
              <input placeholder="Search name, role..." value={search} onChange={e=>setSearch(e.target.value)} style={{background:"none",border:"none",outline:"none",color:t.tx,fontSize:12,width:"100%",fontFamily:"inherit"}}/>
              {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex"}}>{IC.x}</button>}
            </div>
            <Btn onClick={()=>setShowFilters(!showFilters)} s={{background:showFilters?t.accD:t.sf2,color:showFilters?t.acc:t.tx2}}>{IC.filter} Filters{hasFilters&&<span style={{width:6,height:6,borderRadius:"50%",background:t.acc}}/>}</Btn>
            {hasFilters&&<Btn v="ghost" onClick={resetFilters}>{IC.reset} Reset</Btn>}
          </div>
          <span style={{fontSize:11.5,color:t.tx3}}>{filtered.length} employee{filtered.length!==1?"s":""}</span>
        </div>

        {showFilters&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:8,padding:"14px 16px",background:t.card,borderRadius:12,border:`1px solid ${t.bdr}`}}>
          <Sel label="Role" value={fRole} onChange={setFRole} opts={["All",...ROLES]}/>
          <Sel label="Location" value={fLoc} onChange={setFLoc} opts={["All",...LOCATIONS]}/>
          <Sel label="Status" value={fStatus} onChange={setFStatus} opts={["All","Active","Inactive"]}/>
        </div>}

        {/* CARDS VIEW */}
        {view==="cards"?(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>
            {filtered.map((emp,i)=>{const col=EMP_COLS[i%EMP_COLS.length];const pct=emp.targetMonthly>0?Math.round(emp.achievedMonthly/emp.targetMonthly*100):0;const tCol=pct>=100?t.grn:pct>=70?t.amb:t.red;return(
              <Card key={emp.id} s={{padding:"20px 22px",cursor:"pointer",transition:"all .15s",opacity:emp.status==="Inactive"?.6:1}} >
                <div onClick={()=>setDetail(emp)} >
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                    <div style={{width:46,height:46,borderRadius:"50%",background:`${col}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:600,color:col,flexShrink:0}}>{emp.name.split(" ").map(n=>n[0]).join("")}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:14,fontWeight:600,color:t.tx}}>{emp.name}</span>
                        <span style={{padding:"1px 6px",borderRadius:4,fontSize:9.5,background:emp.status==="Active"?t.grnD:t.redD,color:emp.status==="Active"?t.grn:t.red,fontWeight:500}}>{emp.status}</span>
                      </div>
                      <div style={{fontSize:11.5,color:t.tx3}}>{emp.role}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:2,color:t.amb}}>{IC.star}<span style={{fontSize:12,fontWeight:500}}>{emp.rating}</span></div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
                    {[["Sales",emp.sales,t.tx],["Revenue",fK(emp.revenue),t.grn],["Commission",fK(emp.commission),t.amb]].map(([l,v,c])=>(
                      <div key={l}><div style={{fontSize:9.5,color:t.tx3,textTransform:"uppercase",letterSpacing:".05em"}}>{l}</div><div style={{fontSize:14,fontWeight:500,color:c,marginTop:1}}>{v}</div></div>
                    ))}
                  </div>
                  <div style={{marginBottom:6}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                      <span style={{fontSize:10.5,color:t.tx3}}>Monthly Target</span>
                      <span style={{fontSize:10.5,color:tCol,fontWeight:500}}>{pct}%</span>
                    </div>
                    <ProgressBar pct={pct} color={tCol}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10.5,color:t.tx3,paddingTop:10,borderTop:`1px solid ${t.bdr}`}}>
                    <span style={{display:"flex",alignItems:"center",gap:3}}>{IC.mapPin} {emp.location}</span>
                    <span style={{display:"flex",alignItems:"center",gap:3}}>{IC.calendar} Since {emp.startDate}</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:4,marginTop:10}} onClick={e=>e.stopPropagation()}>
                  <Btn onClick={()=>setEditEmp(emp)} s={{flex:1,justifyContent:"center"}}>{IC.edit} Edit</Btn>
                  <Btn v="danger" onClick={()=>handleDel(emp.id)} s={{padding:"7px 10px"}}>{IC.trash}</Btn>
                </div>
              </Card>
            )})}
          </div>
        ):(
          /* TABLE VIEW */
          <Card s={{overflow:"hidden"}}>
            <div style={{overflow:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:1000}}>
                <thead><tr style={{borderBottom:`1px solid ${t.bdr}`}}>
                  {[["Name","name"],["Role","role"],["Location","location"],["Sales","sales"],["Revenue","revenue"],["Commission","commission"],["Rating","rating"],["Target","achievedMonthly"],["Status",null],["",null]].map(([h,k])=>(
                    <th key={h||"act"} style={thS} onClick={()=>k&&handleSort(k)}><span style={{display:"inline-flex",alignItems:"center",gap:2}}>{h}{sortK===k&&(sortD==="asc"?IC.aUp:IC.aDn)}</span></th>
                  ))}
                </tr></thead>
                <tbody>{filtered.map((emp,i)=>{const isH=hovR===emp.id;const col=EMP_COLS[i%EMP_COLS.length];const pct=emp.targetMonthly>0?Math.round(emp.achievedMonthly/emp.targetMonthly*100):0;const tCol=pct>=100?t.grn:pct>=70?t.amb:t.red;return(
                  <tr key={emp.id} onMouseEnter={()=>setHovR(emp.id)} onMouseLeave={()=>setHovR(null)} onClick={()=>setDetail(emp)} style={{borderBottom:i<filtered.length-1?`1px solid ${t.bdr}`:"none",background:isH?t.cardH:"transparent",transition:"background .1s",cursor:"pointer",opacity:emp.status==="Inactive"?.5:1}}>
                    <td style={{padding:"10px 12px"}}><div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:30,height:30,borderRadius:"50%",background:`${col}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10.5,fontWeight:600,color:col}}>{emp.name.split(" ").map(n=>n[0]).join("")}</div><div><div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{emp.name}</div><div style={{fontSize:10,color:t.tx3}}>{emp.email}</div></div></div></td>
                    <td style={{padding:"10px 12px",fontSize:12,color:t.tx2}}>{emp.role}</td>
                    <td style={{padding:"10px 12px",fontSize:12,color:t.tx2}}>{emp.location}</td>
                    <td style={{padding:"10px 12px",fontSize:12.5,fontWeight:500,color:t.tx}}>{emp.sales}</td>
                    <td style={{padding:"10px 12px",fontSize:12,fontWeight:500,fontFamily:"monospace",color:t.grn}}>{fK(emp.revenue)}</td>
                    <td style={{padding:"10px 12px",fontSize:12,fontFamily:"monospace",color:t.amb}}>{fK(emp.commission)}</td>
                    <td style={{padding:"10px 12px"}}><Stars rating={emp.rating}/></td>
                    <td style={{padding:"10px 12px"}}><div style={{display:"flex",alignItems:"center",gap:6,minWidth:100}}><ProgressBar pct={pct} color={tCol} h={5}/><span style={{fontSize:10.5,color:tCol,fontWeight:500,whiteSpace:"nowrap"}}>{pct}%</span></div></td>
                    <td style={{padding:"10px 12px"}}><span style={{padding:"2px 7px",borderRadius:10,fontSize:10,background:emp.status==="Active"?t.grnD:t.redD,color:emp.status==="Active"?t.grn:t.red,fontWeight:500}}>{emp.status}</span></td>
                    <td style={{padding:"10px 12px"}}><div style={{display:"flex",gap:3,opacity:isH?1:0,transition:"opacity .1s"}} onClick={e=>e.stopPropagation()}>
                      <button onClick={()=>setEditEmp(emp)} style={{background:t.sf2,border:`1px solid ${t.bdr}`,borderRadius:5,padding:"3px 6px",cursor:"pointer",color:t.tx2,display:"flex"}}>{IC.edit}</button>
                      <button onClick={()=>handleDel(emp.id)} style={{background:t.redD,border:"none",borderRadius:5,padding:"3px 6px",cursor:"pointer",color:t.red,display:"flex"}}>{IC.trash}</button>
                    </div></td>
                  </tr>
                )})}</tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* ADD MODAL */}
      <AddEmpModal open={showAdd} onClose={()=>setShowAdd(false)} onAdd={e=>{setEmps(p=>[e,...p]);setShowAdd(false)}}/>

      {/* EDIT MODAL */}
      <Modal open={!!editEmp} onClose={()=>setEditEmp(null)} title="Edit Employee" w={640}>
        {editEmp&&<EditEmpForm emp={editEmp} onSave={u=>{setEmps(p=>p.map(e=>e.id===u.id?u:e));setEditEmp(null)}} onCancel={()=>setEditEmp(null)}/>}
      </Modal>

      {/* DETAIL MODAL */}
      <Modal open={!!detail} onClose={()=>setDetail(null)} title="Employee Profile" w={680}>
        {detail&&<DetailView emp={detail} onEdit={()=>{setEditEmp(detail);setDetail(null)}} onDel={()=>handleDel(detail.id)}/>}
      </Modal>
    </div>
  );
}

/* ═══════════════════ ADD EMPLOYEE ═══════════════════ */
function AddEmpModal({open,onClose,onAdd}){
  const[name,setName]=useState("");const[role,setRole]=useState("Sales Associate");const[email,setEmail]=useState("");const[phone,setPhone]=useState("");const[loc,setLoc]=useState("Milltown");const[target,setTarget]=useState("50000");
  const reset=()=>{setName("");setRole("Sales Associate");setEmail("");setPhone("");setLoc("Milltown");setTarget("50000")};
  return(
    <Modal open={open} onClose={()=>{onClose();reset()}} title="Add New Employee" w={640}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Inp label="Full Name" value={name} onChange={setName} ph="John Smith"/>
        <Sel label="Role" value={role} onChange={setRole} opts={ROLES}/>
        <Inp label="Email" value={email} onChange={setEmail} ph="john@autodealer.pro"/>
        <Inp label="Phone" value={phone} onChange={setPhone} ph="(732) 555-0000"/>
        <Sel label="Location" value={loc} onChange={setLoc} opts={LOCATIONS}/>
        <Inp label="Monthly Target ($)" value={target} onChange={setTarget} type="number"/>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:18}}>
        <Btn onClick={()=>{onClose();reset()}}>Cancel</Btn>
        <Btn v="primary" onClick={()=>{if(!name)return;onAdd({id:Date.now(),name,role,email,phone,location:loc,startDate:new Date().toLocaleDateString("en-US",{month:"short",year:"numeric"}),status:"Active",sales:0,revenue:0,commission:0,rating:0,targetMonthly:parseInt(target)||0,achievedMonthly:0,recentSales:[]});reset()}} disabled={!name}>Add Employee</Btn>
      </div>
    </Modal>
  );
}

/* ═══════════════════ EDIT FORM ═══════════════════ */
function EditEmpForm({emp,onSave,onCancel}){
  const[f,sF]=useState({...emp,targetMonthly:String(emp.targetMonthly),achievedMonthly:String(emp.achievedMonthly),commission:String(emp.commission)});
  const u=(k,v)=>sF(p=>({...p,[k]:v}));
  return(<>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Inp label="Name" value={f.name} onChange={v=>u("name",v)}/>
      <Sel label="Role" value={f.role} onChange={v=>u("role",v)} opts={ROLES}/>
      <Inp label="Email" value={f.email} onChange={v=>u("email",v)}/>
      <Inp label="Phone" value={f.phone} onChange={v=>u("phone",v)}/>
      <Sel label="Location" value={f.location} onChange={v=>u("location",v)} opts={LOCATIONS}/>
      <Sel label="Status" value={f.status} onChange={v=>u("status",v)} opts={["Active","Inactive"]}/>
      <Inp label="Monthly Target ($)" value={f.targetMonthly} onChange={v=>u("targetMonthly",v)} type="number"/>
      <Inp label="Achieved This Month ($)" value={f.achievedMonthly} onChange={v=>u("achievedMonthly",v)} type="number"/>
      <Inp label="Commission ($)" value={f.commission} onChange={v=>u("commission",v)} type="number"/>
      <div style={{display:"flex",flexDirection:"column",gap:4}}><label style={{fontSize:11,fontWeight:500,color:t.tx2}}>Rating</label><Stars rating={f.rating} onChange={v=>u("rating",v)}/></div>
    </div>
    <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:18}}>
      <Btn onClick={onCancel}>Cancel</Btn>
      <Btn v="primary" onClick={()=>onSave({...f,targetMonthly:parseInt(f.targetMonthly)||0,achievedMonthly:parseInt(f.achievedMonthly)||0,commission:parseInt(f.commission)||0})}>Save Changes</Btn>
    </div>
  </>);
}

/* ═══════════════════ DETAIL VIEW ═══════════════════ */
function DetailView({emp:e,onEdit,onDel}){
  const col=EMP_COLS[e.id%EMP_COLS.length];
  const pct=e.targetMonthly>0?Math.round(e.achievedMonthly/e.targetMonthly*100):0;
  const tCol=pct>=100?t.grn:pct>=70?t.amb:t.red;
  return(<div>
    <div style={{display:"flex",gap:16,marginBottom:18,flexWrap:"wrap"}}>
      <div style={{width:70,height:70,borderRadius:"50%",background:`${col}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:600,color:col,flexShrink:0}}>{e.name.split(" ").map(n=>n[0]).join("")}</div>
      <div style={{flex:1,minWidth:200}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
          <span style={{fontSize:19,fontWeight:600,color:t.tx}}>{e.name}</span>
          <span style={{padding:"2px 8px",borderRadius:10,fontSize:10,background:e.status==="Active"?t.grnD:t.redD,color:e.status==="Active"?t.grn:t.red,fontWeight:500}}>{e.status}</span>
        </div>
        <div style={{fontSize:12.5,color:t.tx2,marginBottom:6}}>{e.role}</div>
        <div style={{display:"flex",gap:4}}><Stars rating={e.rating}/><span style={{fontSize:11,color:t.amb,marginLeft:4}}>{e.rating}/5.0</span></div>
      </div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
      {[["Email",e.email,IC.mail],["Phone",e.phone,IC.phone],["Location",e.location,IC.mapPin],["Start Date",e.startDate,IC.calendar],["Role",e.role,IC.users]].map(([l,v,icon])=>(
        <div key={l}><div style={{fontSize:9.5,color:t.tx3,textTransform:"uppercase",letterSpacing:".05em",marginBottom:2}}>{l}</div><div style={{fontSize:12,color:t.tx,display:"flex",alignItems:"center",gap:4}}><span style={{color:t.tx3,display:"flex",transform:"scale(0.85)"}}>{icon}</span>{v}</div></div>
      ))}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
      {[["Sales",e.sales,t.tx],["Revenue",fK(e.revenue),t.grn],["Commission",fK(e.commission),t.amb]].map(([l,v,c])=>(
        <div key={l} style={{background:t.sf2,borderRadius:10,padding:"12px 14px",border:`1px solid ${t.bdr}`}}>
          <div style={{fontSize:9.5,color:t.tx3,textTransform:"uppercase"}}>{l}</div>
          <div style={{fontSize:18,fontWeight:600,color:c,marginTop:2}}>{v}</div>
        </div>
      ))}
    </div>

    <div style={{marginBottom:16,padding:"14px 16px",background:t.sf2,borderRadius:10,border:`1px solid ${t.bdr}`}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{fontSize:12,fontWeight:500,color:t.tx}}>Monthly Target Achievement</span>
        <span style={{fontSize:13,fontWeight:600,color:tCol}}>{pct}%</span>
      </div>
      <ProgressBar pct={pct} color={tCol} h={8}/>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:10.5,color:t.tx3}}>
        <span>Achieved: {fK(e.achievedMonthly)}</span>
        <span>Target: {fK(e.targetMonthly)}</span>
      </div>
    </div>

    {e.recentSales.length>0&&<div style={{marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:500,color:t.tx2,marginBottom:8}}>Recent Sales</div>
      <div style={{display:"flex",flexDirection:"column",gap:4}}>
        {e.recentSales.map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",background:t.inp,borderRadius:7,border:`1px solid ${t.bdr}`}}>
            <span style={{color:t.grn,display:"flex"}}>{IC.check}</span>
            <span style={{fontSize:12,color:t.tx}}>{s}</span>
          </div>
        ))}
      </div>
    </div>}

    <div style={{display:"flex",justifyContent:"flex-end",gap:6}}>
      <Btn v="danger" onClick={onDel}>{IC.trash} Delete</Btn>
      <Btn onClick={onEdit}>{IC.edit} Edit</Btn>
    </div>
  </div>);
}
