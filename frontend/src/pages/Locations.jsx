import { useState, useMemo, useEffect } from "react";

/* ═══════════════════ THEME ═══════════════════ */
const t={bg:"#07070a",sf:"#0e0e13",sf2:"#131318",card:"#101015",cardH:"#17171e",bdr:"#1d1d26",bdr2:"#282832",tx:"#ededf0",tx2:"#888894",tx3:"#50505c",acc:"#5b8def",accD:"rgba(91,141,239,0.1)",grn:"#34d399",grnD:"rgba(52,211,153,0.1)",red:"#f87171",redD:"rgba(248,113,113,0.1)",amb:"#fbbf24",ambD:"rgba(251,191,36,0.1)",pur:"#a78bfa",purD:"rgba(167,139,250,0.1)",cyn:"#22d3ee",cynD:"rgba(34,211,238,0.1)",inp:"#0b0b10",ov:"rgba(0,0,0,0.75)",pink:"#f472b6"};

const LOC_COLS=[t.acc,t.pur];
const STATUS_COL={"In Stock":t.grn,Sold:t.acc,Reserved:t.amb,"In Service":t.pur};

/* ═══════════════════ ICONS ═══════════════════ */
const IC={
  mapPin:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  car:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2"/><circle cx="7.5" cy="14" r="1.5"/><circle cx="16.5" cy="14" r="1.5"/></svg>,
  dollar:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  trophy:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22M18 2H6v7a6 6 0 1012 0V2z"/></svg>,
  target:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  box:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
  phone:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  user:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  clock:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  plus:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  x:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  edit:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  eye:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  aUp:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  aDn:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  chL:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>,
  compare:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
};

/* ═══════════════════ SAMPLE DATA ═══════════════════ */
const LOCS_DATA=[
  {id:1,name:"Milltown",address:"1200 Auto Boulevard, Milltown NJ 08850",phone:"(732) 555-0100",manager:"Derek Brown",capacity:60,hours:{weekday:"9:00 AM – 7:00 PM",saturday:"10:00 AM – 6:00 PM",sunday:"Closed"}},
  {id:2,name:"Elizabeth",address:"850 Premium Drive, Elizabeth NJ 07201",phone:"(908) 555-0200",manager:"Lisa Chen",capacity:40,hours:{weekday:"9:00 AM – 7:00 PM",saturday:"10:00 AM – 5:00 PM",sunday:"11:00 AM – 4:00 PM"}},
];

const CARS=[
  {id:1,name:"2024 BMW M4 Competition",color:"Alpine White",price:84995,status:"In Stock",location:"Milltown",days:12},
  {id:2,name:"2024 Mercedes-Benz AMG GT 63",color:"Obsidian Black",price:137995,status:"Reserved",location:"Elizabeth",days:3},
  {id:3,name:"2023 Porsche 911 Turbo S",color:"Guards Red",price:228500,status:"In Stock",location:"Milltown",days:28},
  {id:4,name:"2024 Tesla Model S Plaid",color:"Pearl White",price:108990,status:"Sold",location:"Elizabeth",days:0},
  {id:5,name:"2024 Audi RS e-tron GT",color:"Nardo Grey",price:152400,status:"In Stock",location:"Milltown",days:45},
  {id:6,name:"2023 Lamborghini Huracán EVO",color:"Yellow",price:268000,status:"In Stock",location:"Elizabeth",days:52},
  {id:7,name:"2024 Range Rover Sport SVR",color:"Green",price:115995,status:"In Service",location:"Milltown",days:7},
  {id:8,name:"2024 Ferrari 296 GTB",color:"Red",price:352000,status:"In Stock",location:"Elizabeth",days:18},
  {id:9,name:"2024 Toyota GR Supra",color:"Blue",price:58250,status:"Sold",location:"Milltown",days:0},
  {id:10,name:"2024 Chevrolet Corvette",color:"Orange",price:72995,status:"Reserved",location:"Elizabeth",days:8},
  {id:11,name:"2023 Rolls-Royce Ghost",color:"Black",price:345000,status:"In Stock",location:"Milltown",days:38},
  {id:12,name:"2024 McLaren 750S",color:"Silver",price:299000,status:"In Stock",location:"Elizabeth",days:15},
  {id:13,name:"2024 BMW M3 CS",color:"Black",price:78500,status:"Sold",location:"Milltown",days:0},
  {id:14,name:"2023 Mercedes-Benz GLE 63S",color:"White",price:119750,status:"Sold",location:"Elizabeth",days:0},
  {id:15,name:"2024 Porsche Cayenne GTS",color:"Midnight Blue",price:112000,status:"In Stock",location:"Milltown",days:22},
  {id:16,name:"2024 Audi RS7",color:"Metallic Gray",price:125900,status:"Sold",location:"Elizabeth",days:0},
  {id:17,name:"2023 Bentley Continental GT",color:"Burgundy",price:225000,status:"In Stock",location:"Elizabeth",days:35},
  {id:18,name:"2024 Genesis G80",color:"Gray",price:58700,status:"In Stock",location:"Milltown",days:10},
];

const SOLD_REV={Milltown:213750,Elizabeth:478640};

/* ═══════════════════ HELPERS ═══════════════════ */
const fmt=n=>"$"+n.toLocaleString();
const fK=n=>n>=1e6?"$"+(n/1e6).toFixed(2)+"M":n>=1e3?"$"+(n/1e3).toFixed(1)+"K":"$"+n;

/* ═══════════════════ COMPONENTS ═══════════════════ */
function Card({children,s={}}){return <div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:14,...s}}>{children}</div>}
function Stat({label,val,sub,icon,delay=0,color}){const[v,setV]=useState(false);useEffect(()=>{const tm=setTimeout(()=>setV(true),delay);return()=>clearTimeout(tm)},[]);return(<div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:13,padding:"16px 18px",flex:1,minWidth:150,opacity:v?1:0,transform:v?"translateY(0)":"translateY(10px)",transition:"all .5s cubic-bezier(.16,1,.3,1)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span style={{fontSize:10,color:t.tx3,textTransform:"uppercase",letterSpacing:".07em",fontWeight:500}}>{label}</span>{icon&&<span style={{color:color||t.tx3,opacity:.6,display:"flex"}}>{icon}</span>}</div><div style={{fontSize:22,fontWeight:600,color:color||t.tx,letterSpacing:"-.02em"}}>{val}</div>{sub&&<div style={{fontSize:10,color:t.tx3,marginTop:2}}>{sub}</div>}</div>)}
function Btn({children,v="default",onClick,s={},disabled}){const base={border:"none",borderRadius:9,cursor:disabled?"default":"pointer",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:500,display:"inline-flex",alignItems:"center",gap:5,transition:"all .15s",opacity:disabled?.5:1,...s};const vs={primary:{...base,background:`linear-gradient(135deg,${t.acc},#818cf8)`,color:"#fff",padding:"8px 16px"},default:{...base,background:t.sf2,border:`1px solid ${t.bdr}`,color:t.tx2,padding:"7px 13px"},danger:{...base,background:t.redD,color:t.red,padding:"7px 13px"}};return <button onClick={onClick} disabled={disabled} style={vs[v]||vs.default}>{children}</button>}
function ProgressBar({pct,color,h=6}){return <div style={{height:h,borderRadius:h,background:t.sf2,width:"100%"}}><div style={{height:"100%",borderRadius:h,background:color,width:`${Math.min(100,pct)}%`,transition:"width .8s cubic-bezier(.16,1,.3,1)"}}/></div>}
function Modal({open,onClose,title,children,w=640}){if(!open)return null;return(<div style={{position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}><div style={{position:"absolute",inset:0,background:t.ov,backdropFilter:"blur(6px)"}}/><div onClick={e=>e.stopPropagation()} style={{position:"relative",background:t.sf,border:`1px solid ${t.bdr}`,borderRadius:16,width:w,maxWidth:"95vw",maxHeight:"88vh",overflow:"auto",padding:"22px 26px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><h3 style={{fontSize:15,fontWeight:600,margin:0,color:t.tx}}>{title}</h3><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex"}}>{IC.x}</button></div>{children}</div></div>)}
function Inp({label,value,onChange,ph,type="text",s={}}){return(<div style={{display:"flex",flexDirection:"column",gap:4,...s}}>{label&&<label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={ph} style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none"}} onFocus={e=>e.target.style.borderColor=t.acc} onBlur={e=>e.target.style.borderColor=t.bdr}/></div>)}

function DonutChart({segments,size=100,stroke=10,centerLabel}){const total=segments.reduce((s,x)=>s+x.val,0);const r=(size-stroke)/2;const circ=2*Math.PI*r;let offset=0;return(<div style={{position:"relative",width:size,height:size}}><svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={t.sf2} strokeWidth={stroke}/>{segments.filter(s=>s.val>0).map((seg,i)=>{const pct=seg.val/total;const dash=pct*circ;const o=offset;offset+=dash;return <circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={seg.color} strokeWidth={stroke} strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-o} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"all .5s"}}/>})}</svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:14,fontWeight:600,color:t.tx}}>{total}</div>{centerLabel&&<div style={{fontSize:7.5,color:t.tx3,textTransform:"uppercase"}}>{centerLabel}</div>}</div></div>)}

function StatusBadge({s}){const c=STATUS_COL[s]||t.tx2;return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 8px",borderRadius:16,background:`${c}18`,color:c,fontSize:10,fontWeight:500,whiteSpace:"nowrap"}}><span style={{width:4,height:4,borderRadius:"50%",background:c}}/>{s}</span>}

/* ═══════════════════ MAIN PAGE ═══════════════════ */
export default function LocationsPage(){
  const[locs,setLocs]=useState(LOCS_DATA);
  const[showAdd,setShowAdd]=useState(false);
  const[editLoc,setEditLoc]=useState(null);
  const[viewLoc,setViewLoc]=useState(null);

  const totalCap=locs.reduce((s,l)=>s+l.capacity,0);
  const totalVehicles=CARS.length;
  const utilPct=totalCap>0?Math.round(totalVehicles/totalCap*100):0;
  const totalRev=Object.values(SOLD_REV).reduce((s,v)=>s+v,0);
  const topLoc=Object.entries(SOLD_REV).sort((a,b)=>b[1]-a[1])[0];

  const getLocCars=(name)=>CARS.filter(c=>c.location===name);
  const getLocStats=(name)=>{const cars=getLocCars(name);return{total:cars.length,inStock:cars.filter(c=>c.status==="In Stock").length,sold:cars.filter(c=>c.status==="Sold").length,reserved:cars.filter(c=>c.status==="Reserved").length,inService:cars.filter(c=>c.status==="In Service").length,value:cars.filter(c=>c.status!=="Sold").reduce((s,c)=>s+c.price,0),revenue:SOLD_REV[name]||0}};

  const handleDel=id=>{if(locs.length<=1)return;setLocs(p=>p.filter(l=>l.id!==id))};

  return(
    <div style={{minHeight:"100vh",background:t.bg,color:t.tx,fontFamily:"'Outfit',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${t.bdr};border-radius:3px}body{font-family:'Outfit',sans-serif;background:${t.bg}}`}</style>

      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 24px",borderBottom:`1px solid ${t.bdr}`,background:t.sf,position:"sticky",top:0,zIndex:20,flexWrap:"wrap",gap:10}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${t.acc},#818cf8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>AD</div>
          <div><h1 style={{fontSize:17,fontWeight:600,letterSpacing:"-.02em",margin:0}}>Locations</h1><span style={{fontSize:10.5,color:t.tx3}}>{locs.length} locations · {totalCap} total capacity</span></div>
        </div>
        <Btn v="primary" onClick={()=>setShowAdd(true)}>{IC.plus} Add Location</Btn>
      </header>

      <div style={{padding:"18px 24px",display:"flex",flexDirection:"column",gap:18}}>

        {/* STATS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10}}>
          <Stat label="Locations" val={locs.length} icon={IC.mapPin} delay={0}/>
          <Stat label="Total Capacity" val={totalCap} sub="Across all lots" icon={IC.box} delay={60}/>
          <Stat label="Total Vehicles" val={totalVehicles} sub={`${utilPct}% utilized`} icon={IC.car} delay={120}/>
          <Stat label="Utilization" val={`${utilPct}%`} icon={IC.target} delay={180} color={utilPct>80?t.amb:t.grn}/>
          <Stat label="Total Revenue" val={fK(totalRev)} icon={IC.dollar} delay={240} color={t.grn}/>
          <Stat label="Top Location" val={topLoc?topLoc[0]:"—"} sub={topLoc?fK(topLoc[1])+" revenue":""} icon={IC.trophy} delay={300} color={t.acc}/>
        </div>

        {/* LOCATION CARDS */}
        <div style={{display:"grid",gridTemplateColumns:`repeat(${locs.length},1fr)`,gap:14}}>
          {locs.map((loc,i)=>{const stats=getLocStats(loc.name);const pct=loc.capacity>0?Math.round(stats.total/loc.capacity*100):0;const col=LOC_COLS[i%LOC_COLS.length];const statusSegs=[{val:stats.inStock,color:t.grn},{val:stats.sold,color:t.acc},{val:stats.reserved,color:t.amb},{val:stats.inService,color:t.pur}];return(
            <Card key={loc.id} s={{padding:"22px 24px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:44,height:44,borderRadius:10,background:`${col}15`,display:"flex",alignItems:"center",justifyContent:"center",color:col}}>{IC.mapPin}</div>
                  <div><div style={{fontSize:17,fontWeight:600,color:t.tx}}>{loc.name}</div><div style={{fontSize:11.5,color:t.tx3}}>{loc.address}</div></div>
                </div>
                <span style={{fontSize:12,color:col,fontWeight:600,padding:"3px 10px",borderRadius:7,background:`${col}15`}}>{pct}%</span>
              </div>

              {/* Capacity bar */}
              <div style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:t.tx2}}>Capacity</span><span style={{fontSize:11.5,fontWeight:500,color:t.tx}}>{stats.total} / {loc.capacity}</span></div>
                <ProgressBar pct={pct} color={col} h={8}/>
              </div>

              {/* Status stacked bar */}
              <div style={{display:"flex",gap:3,height:20,borderRadius:5,overflow:"hidden",marginBottom:12}}>
                {statusSegs.filter(s=>s.val>0).map((s,j)=><div key={j} style={{flex:s.val,background:s.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#fff",fontWeight:500,minWidth:s.val>0?18:0,transition:"flex .5s"}}>{s.val}</div>)}
              </div>
              <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                {[["In Stock",stats.inStock,t.grn],["Sold",stats.sold,t.acc],["Reserved",stats.reserved,t.amb],["Service",stats.inService,t.pur]].map(([l,v,c])=>(
                  <span key={l} style={{display:"flex",alignItems:"center",gap:3,fontSize:10,color:t.tx3}}><span style={{width:5,height:5,borderRadius:1.5,background:c}}/>{l}: {v}</span>
                ))}
              </div>

              {/* Stats grid */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                {[["Revenue",fK(stats.revenue),t.grn],["Inventory Value",fK(stats.value),t.tx],["Manager",loc.manager,t.tx2],["Phone",loc.phone,t.tx2]].map(([l,v,c])=>(
                  <div key={l} style={{background:t.sf2,borderRadius:8,padding:"10px 12px",border:`1px solid ${t.bdr}`}}>
                    <div style={{fontSize:9,color:t.tx3,textTransform:"uppercase",letterSpacing:".05em"}}>{l}</div>
                    <div style={{fontSize:l==="Revenue"||l==="Inventory Value"?15:12,fontWeight:l==="Revenue"||l==="Inventory Value"?600:500,color:c,marginTop:2,fontFamily:l==="Revenue"||l==="Inventory Value"?"monospace":"inherit"}}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div style={{padding:"10px 12px",background:t.sf2,borderRadius:8,border:`1px solid ${t.bdr}`,marginBottom:14}}>
                <div style={{fontSize:10,color:t.tx3,textTransform:"uppercase",letterSpacing:".05em",marginBottom:6,display:"flex",alignItems:"center",gap:4}}>{IC.clock} Operating Hours</div>
                {Object.entries(loc.hours).map(([day,hrs])=>(
                  <div key={day} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",fontSize:11.5}}>
                    <span style={{color:t.tx2,textTransform:"capitalize"}}>{day}</span>
                    <span style={{color:hrs==="Closed"?t.red:t.tx,fontWeight:hrs==="Closed"?500:400}}>{hrs}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{display:"flex",gap:6}}>
                <Btn onClick={()=>setViewLoc(loc)} s={{flex:1,justifyContent:"center"}}>{IC.eye} View Cars</Btn>
                <Btn onClick={()=>setEditLoc(loc)} s={{padding:"7px 10px"}}>{IC.edit}</Btn>
                {locs.length>1&&<Btn v="danger" onClick={()=>handleDel(loc.id)} s={{padding:"7px 10px"}}>{IC.trash}</Btn>}
              </div>
            </Card>
          )})}
        </div>

        {/* SIDE-BY-SIDE COMPARISON */}
        <Card s={{padding:"20px 22px"}}>
          <div style={{fontSize:14,fontWeight:600,color:t.tx,marginBottom:4,display:"flex",alignItems:"center",gap:6}}>{IC.compare} Side-by-Side Comparison</div>
          <div style={{fontSize:11,color:t.tx3,marginBottom:16}}>How your locations stack up against each other</div>

          <div style={{overflow:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:500}}>
              <thead><tr style={{borderBottom:`1px solid ${t.bdr}`}}>
                <th style={{textAlign:"left",padding:"10px 12px",fontSize:10,color:t.tx3,fontWeight:500,textTransform:"uppercase",letterSpacing:".06em"}}>Metric</th>
                {locs.map((loc,i)=><th key={loc.id} style={{textAlign:"center",padding:"10px 12px",fontSize:11,fontWeight:600,color:LOC_COLS[i]}}>{loc.name}</th>)}
                <th style={{textAlign:"center",padding:"10px 12px",fontSize:10,color:t.tx3,fontWeight:500,textTransform:"uppercase"}}>Winner</th>
              </tr></thead>
              <tbody>
                {[
                  {label:"Total Vehicles",key:"total"},
                  {label:"In Stock",key:"inStock"},
                  {label:"Sold",key:"sold"},
                  {label:"Reserved",key:"reserved"},
                  {label:"Capacity",key:"cap"},
                  {label:"Utilization",key:"util"},
                  {label:"Revenue",key:"rev"},
                  {label:"Inventory Value",key:"val"},
                ].map((row,ri)=>{
                  const vals=locs.map((loc,i)=>{const s=getLocStats(loc.name);
                    if(row.key==="total")return s.total;if(row.key==="inStock")return s.inStock;if(row.key==="sold")return s.sold;
                    if(row.key==="reserved")return s.reserved;if(row.key==="cap")return loc.capacity;
                    if(row.key==="util")return loc.capacity>0?Math.round(s.total/loc.capacity*100):0;
                    if(row.key==="rev")return s.revenue;if(row.key==="val")return s.value;return 0;
                  });
                  const maxVal=Math.max(...vals);const winIdx=vals.indexOf(maxVal);
                  const isMoney=["rev","val"].includes(row.key);const isPct=row.key==="util";
                  return(
                    <tr key={row.key} style={{borderBottom:ri<7?`1px solid ${t.bdr}`:"none"}}>
                      <td style={{padding:"10px 12px",fontSize:12,color:t.tx2}}>{row.label}</td>
                      {vals.map((v,i)=><td key={i} style={{textAlign:"center",padding:"10px 12px",fontSize:13,fontWeight:v===maxVal?600:400,color:v===maxVal?LOC_COLS[i]:t.tx2,fontFamily:isMoney?"monospace":"inherit"}}>{isMoney?fK(v):isPct?v+"%":v}</td>)}
                      <td style={{textAlign:"center",padding:"10px 12px"}}><span style={{padding:"2px 8px",borderRadius:5,fontSize:10,background:`${LOC_COLS[winIdx]}15`,color:LOC_COLS[winIdx],fontWeight:500}}>{locs[winIdx]?.name}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* CAPACITY UTILIZATION VISUAL */}
        <Card s={{padding:"20px 22px"}}>
          <div style={{fontSize:14,fontWeight:600,color:t.tx,marginBottom:14}}>Capacity Utilization</div>
          <div style={{display:"flex",gap:20,alignItems:"center",justifyContent:"center",flexWrap:"wrap"}}>
            {locs.map((loc,i)=>{const stats=getLocStats(loc.name);const pct=loc.capacity>0?Math.round(stats.total/loc.capacity*100):0;const col=LOC_COLS[i];const segments=[{val:stats.inStock,color:t.grn},{val:stats.sold,color:t.acc},{val:stats.reserved,color:t.amb},{val:stats.inService,color:t.pur},{val:Math.max(0,loc.capacity-stats.total),color:t.sf2}];return(
              <div key={loc.id} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
                <DonutChart segments={segments} size={130} stroke={14} centerLabel="vehicles"/>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:14,fontWeight:600,color:col}}>{loc.name}</div>
                  <div style={{fontSize:11,color:t.tx3}}>{stats.total} / {loc.capacity} ({pct}%)</div>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"}}>
                  {[["Stock",stats.inStock,t.grn],["Sold",stats.sold,t.acc],["Rsv",stats.reserved,t.amb],["Svc",stats.inService,t.pur],["Empty",Math.max(0,loc.capacity-stats.total),t.tx3]].map(([l,v,c])=>(
                    <span key={l} style={{display:"flex",alignItems:"center",gap:3,fontSize:9.5,color:t.tx3}}><span style={{width:5,height:5,borderRadius:1.5,background:c}}/>{l}: {v}</span>
                  ))}
                </div>
              </div>
            )})}
          </div>
        </Card>

        {/* REVENUE COMPARISON */}
        <Card s={{padding:"20px 22px"}}>
          <div style={{fontSize:14,fontWeight:600,color:t.tx,marginBottom:14}}>Revenue Comparison</div>
          <div style={{display:"flex",gap:14}}>
            {locs.map((loc,i)=>{const stats=getLocStats(loc.name);const col=LOC_COLS[i];const maxRev=Math.max(...locs.map(l=>(SOLD_REV[l.name]||0)));return(
              <div key={loc.id} style={{flex:1,background:t.sf2,borderRadius:10,padding:"16px 18px",border:`1px solid ${t.bdr}`}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
                  <span style={{color:col,display:"flex"}}>{IC.mapPin}</span>
                  <span style={{fontSize:14,fontWeight:600,color:t.tx}}>{loc.name}</span>
                </div>
                <div style={{fontSize:26,fontWeight:600,color:col,fontFamily:"monospace",marginBottom:10}}>{fK(stats.revenue)}</div>
                <ProgressBar pct={maxRev>0?(stats.revenue/maxRev)*100:0} color={col} h={8}/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12}}>
                  {[["Cars Sold",stats.sold],["Avg Sale",stats.sold>0?fK(Math.round(stats.revenue/stats.sold)):"—"],["Value on Lot",fK(stats.value)],["Vehicles",stats.total]].map(([l,v])=>(
                    <div key={l}><div style={{fontSize:9,color:t.tx3,textTransform:"uppercase"}}>{l}</div><div style={{fontSize:13,fontWeight:500,color:t.tx,marginTop:1}}>{v}</div></div>
                  ))}
                </div>
              </div>
            )})}
          </div>
        </Card>
      </div>

      {/* ADD LOCATION MODAL */}
      <AddLocModal open={showAdd} onClose={()=>setShowAdd(false)} onAdd={l=>{setLocs(p=>[...p,l]);setShowAdd(false)}}/>

      {/* EDIT MODAL */}
      <Modal open={!!editLoc} onClose={()=>setEditLoc(null)} title="Edit Location" w={600}>
        {editLoc&&<EditLocForm loc={editLoc} onSave={u=>{setLocs(p=>p.map(l=>l.id===u.id?u:l));setEditLoc(null)}} onCancel={()=>setEditLoc(null)}/>}
      </Modal>

      {/* VEHICLE LIST MODAL */}
      <Modal open={!!viewLoc} onClose={()=>setViewLoc(null)} title={viewLoc?`Vehicles at ${viewLoc.name}`:""} w={720}>
        {viewLoc&&<VehicleList loc={viewLoc}/>}
      </Modal>
    </div>
  );
}

/* ═══════════════════ ADD LOCATION ═══════════════════ */
function AddLocModal({open,onClose,onAdd}){
  const[name,setName]=useState("");const[addr,setAddr]=useState("");const[phone,setPhone]=useState("");const[mgr,setMgr]=useState("");const[cap,setCap]=useState("50");
  const[wkday,setWkday]=useState("9:00 AM – 7:00 PM");const[sat,setSat]=useState("10:00 AM – 6:00 PM");const[sun,setSun]=useState("Closed");
  const reset=()=>{setName("");setAddr("");setPhone("");setMgr("");setCap("50");setWkday("9:00 AM – 7:00 PM");setSat("10:00 AM – 6:00 PM");setSun("Closed")};
  return(
    <Modal open={open} onClose={()=>{onClose();reset()}} title="Add New Location" w={600}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Inp label="Location Name" value={name} onChange={setName} ph="e.g. North Lot"/>
        <Inp label="Phone" value={phone} onChange={setPhone} ph="(555) 555-0000"/>
        <Inp label="Address" value={addr} onChange={setAddr} ph="Full address" s={{gridColumn:"1/-1"}}/>
        <Inp label="Manager" value={mgr} onChange={setMgr} ph="Manager name"/>
        <Inp label="Capacity" value={cap} onChange={setCap} type="number"/>
        <Inp label="Weekday Hours" value={wkday} onChange={setWkday}/>
        <Inp label="Saturday Hours" value={sat} onChange={setSat}/>
        <Inp label="Sunday Hours" value={sun} onChange={setSun} ph="e.g. Closed"/>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:18}}>
        <Btn onClick={()=>{onClose();reset()}}>Cancel</Btn>
        <Btn v="primary" onClick={()=>{if(!name)return;onAdd({id:Date.now(),name,address:addr,phone,manager:mgr,capacity:parseInt(cap)||50,hours:{weekday:wkday,saturday:sat,sunday:sun}});reset()}} disabled={!name}>Add Location</Btn>
      </div>
    </Modal>
  );
}

/* ═══════════════════ EDIT FORM ═══════════════════ */
function EditLocForm({loc,onSave,onCancel}){
  const[f,sF]=useState({...loc,capacity:String(loc.capacity)});const u=(k,v)=>sF(p=>({...p,[k]:v}));
  return(<>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Inp label="Name" value={f.name} onChange={v=>u("name",v)}/>
      <Inp label="Phone" value={f.phone} onChange={v=>u("phone",v)}/>
      <Inp label="Address" value={f.address} onChange={v=>u("address",v)} s={{gridColumn:"1/-1"}}/>
      <Inp label="Manager" value={f.manager} onChange={v=>u("manager",v)}/>
      <Inp label="Capacity" value={f.capacity} onChange={v=>u("capacity",v)} type="number"/>
      <Inp label="Weekday Hours" value={f.hours.weekday} onChange={v=>u("hours",{...f.hours,weekday:v})}/>
      <Inp label="Saturday" value={f.hours.saturday} onChange={v=>u("hours",{...f.hours,saturday:v})}/>
      <Inp label="Sunday" value={f.hours.sunday} onChange={v=>u("hours",{...f.hours,sunday:v})}/>
    </div>
    <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:18}}>
      <Btn onClick={onCancel}>Cancel</Btn>
      <Btn v="primary" onClick={()=>onSave({...f,capacity:parseInt(f.capacity)||0})}>Save Changes</Btn>
    </div>
  </>);
}

/* ═══════════════════ VEHICLE LIST ═══════════════════ */
function VehicleList({loc}){
  const cars=CARS.filter(c=>c.location===loc.name);
  const[filter,setFilter]=useState("All");
  const filtered=filter==="All"?cars:cars.filter(c=>c.status===filter);
  return(<div>
    <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
      {["All","In Stock","Sold","Reserved","In Service"].map(s=>(
        <button key={s} onClick={()=>setFilter(s)} style={{padding:"5px 10px",borderRadius:7,border:"none",background:filter===s?t.accD:"transparent",color:filter===s?t.acc:t.tx2,fontSize:11.5,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>{s}{s!=="All"&&<span style={{opacity:.5,marginLeft:4,fontSize:10}}>{cars.filter(c=>c.status===s).length}</span>}</button>
      ))}
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      {filtered.map(car=>(
        <div key={car.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:t.sf2,borderRadius:9,border:`1px solid ${t.bdr}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:7,background:`${STATUS_COL[car.status]}15`,display:"flex",alignItems:"center",justifyContent:"center",color:STATUS_COL[car.status]}}>{IC.car}</div>
            <div>
              <div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{car.name}</div>
              <div style={{fontSize:10.5,color:t.tx3}}>{car.color}{car.days>0?` · ${car.days}d on lot`:""}</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:13,fontWeight:500,fontFamily:"monospace",color:t.tx}}>{fK(car.price)}</span>
            <StatusBadge s={car.status}/>
          </div>
        </div>
      ))}
      {filtered.length===0&&<div style={{padding:20,textAlign:"center",color:t.tx3,fontSize:12}}>No vehicles with this status</div>}
    </div>
    <div style={{marginTop:14,padding:"10px 14px",background:t.card,borderRadius:9,border:`1px solid ${t.bdr}`,display:"flex",justifyContent:"space-between"}}>
      <span style={{fontSize:12,fontWeight:500,color:t.tx2}}>Total showing: {filtered.length} vehicles</span>
      <span style={{fontSize:12,fontWeight:500,color:t.grn,fontFamily:"monospace"}}>{fK(filtered.filter(c=>c.status!=="Sold").reduce((s,c)=>s+c.price,0))} lot value</span>
    </div>
  </div>);
}
