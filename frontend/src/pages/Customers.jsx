import { useState, useMemo, useEffect } from "react";

/* ═══════════════════ THEME ═══════════════════ */
const t = {
  bg:"#07070a",sf:"#0e0e13",sf2:"#131318",card:"#101015",cardH:"#17171e",
  bdr:"#1d1d26",bdr2:"#282832",tx:"#ededf0",tx2:"#888894",tx3:"#50505c",
  acc:"#5b8def",accD:"rgba(91,141,239,0.1)",
  grn:"#34d399",grnD:"rgba(52,211,153,0.1)",red:"#f87171",redD:"rgba(248,113,113,0.1)",
  amb:"#fbbf24",ambD:"rgba(251,191,36,0.1)",pur:"#a78bfa",purD:"rgba(167,139,250,0.1)",
  cyn:"#22d3ee",cynD:"rgba(34,211,238,0.1)",inp:"#0b0b10",ov:"rgba(0,0,0,0.75)",
  pink:"#f472b6",pinkD:"rgba(244,114,182,0.1)",
};

const STAGES=["Lead","Contacted","Negotiating","Closed Won","Closed Lost"];
const STAGE_COL={Lead:t.cyn,Contacted:t.acc,Negotiating:t.amb,"Closed Won":t.grn,"Closed Lost":t.red};
const SOURCES=["Walk-in","Website","Referral","Social Media","Auto Trader","CarGurus","Phone Call"];
const SRC_COL={"Walk-in":t.acc,Website:t.grn,Referral:t.pur,"Social Media":t.pink,"Auto Trader":t.amb,CarGurus:t.cyn,"Phone Call":t.red};

/* ═══════════════════ ICONS ═══════════════════ */
const IC={
  users:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  user:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  dollar:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  trend:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  star:<svg width="12" height="12" fill="currentColor" stroke="none" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  starO:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  search:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  plus:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  x:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  edit:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  phone:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  mail:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  mapPin:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  car:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2"/><circle cx="7.5" cy="14" r="1.5"/><circle cx="16.5" cy="14" r="1.5"/></svg>,
  note:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  filter:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  reset:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>,
  dl:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  clock:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  aUp:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  aDn:<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  chL:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>,
  chR:<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>,
  calendar:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  kanban:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="3" y="3" width="5" height="18" rx="1"/><rect x="10" y="3" width="5" height="12" rx="1"/><rect x="17" y="3" width="5" height="15" rx="1"/></svg>,
  table:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
  target:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  calPlus:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/></svg>,
};

/* ═══════════════════ SAMPLE DATA ═══════════════════ */
const CUST_DATA = [
  {id:1,name:"James Mitchell",email:"james.mitchell@email.com",phone:"(713) 555-1201",address:"142 Oak Lane, Milltown NJ",stage:"Closed Won",source:"Walk-in",interest:"Tesla Model S",rating:5,totalSpent:108990,purchases:[{car:"2024 Tesla Model S Plaid",date:"Mar 1, 2026",price:108990}],notes:"VIP client. Interested in annual upgrades.",lastContact:"Mar 1, 2026",addedAt:Date.now()-100000},
  {id:2,name:"Elena Rodriguez",email:"elena.r@email.com",phone:"(908) 555-3344",address:"88 Maple Ave, Elizabeth NJ",stage:"Closed Won",source:"Website",interest:"Toyota GR Supra",rating:4,totalSpent:57500,purchases:[{car:"2024 Toyota GR Supra",date:"Feb 25, 2026",price:57500}],notes:"First-time buyer. Very happy with purchase.",lastContact:"Feb 25, 2026",addedAt:Date.now()-200000},
  {id:3,name:"David Chen",email:"d.chen@techcorp.com",phone:"(732) 555-7788",address:"301 Pine St, Milltown NJ",stage:"Closed Won",source:"Referral",interest:"BMW M3",rating:5,totalSpent:77000,purchases:[{car:"2024 BMW M3 CS",date:"Feb 20, 2026",price:77000}],notes:"Referred by James Mitchell. Fleet potential.",lastContact:"Feb 20, 2026",addedAt:Date.now()-300000},
  {id:4,name:"Priya Sharma",email:"priya.sharma@gmail.com",phone:"(908) 555-2299",address:"67 Cedar Rd, Elizabeth NJ",stage:"Closed Won",source:"Auto Trader",interest:"Mercedes-Benz GLE",rating:4,totalSpent:118000,purchases:[{car:"2023 Mercedes-Benz GLE 63S",date:"Feb 28, 2026",price:118000}],notes:"Looking at SUVs for family. May return for second vehicle.",lastContact:"Feb 28, 2026",addedAt:Date.now()-400000},
  {id:5,name:"Marcus Thompson",email:"marcus.t@outlook.com",phone:"(732) 555-4411",address:"220 Elm Blvd, Milltown NJ",stage:"Closed Won",source:"Social Media",interest:"Audi RS7",rating:5,totalSpent:124500,purchases:[{car:"2024 Audi RS7",date:"Mar 3, 2026",price:124500}],notes:"Instagram follower. Loves performance cars.",lastContact:"Mar 3, 2026",addedAt:Date.now()-500000},
  {id:6,name:"Sofia Petrov",email:"sofia.p@email.com",phone:"(908) 555-6677",address:"15 Birch Way, Elizabeth NJ",stage:"Negotiating",source:"Walk-in",interest:"Porsche 911 Turbo S",rating:4,totalSpent:0,purchases:[],notes:"Test drove 911 twice. Discussing financing options.",lastContact:"Mar 4, 2026",addedAt:Date.now()-600000},
  {id:7,name:"Ryan O'Brien",email:"ryan.ob@gmail.com",phone:"(732) 555-8833",address:"445 Walnut Dr, Milltown NJ",stage:"Negotiating",source:"Website",interest:"Range Rover Sport",rating:3,totalSpent:0,purchases:[],notes:"Comparing with BMW X5. Price-sensitive.",lastContact:"Mar 3, 2026",addedAt:Date.now()-700000},
  {id:8,name:"Mei Tanaka",email:"mei.tanaka@corp.jp",phone:"(908) 555-9900",address:"78 Spruce Ct, Elizabeth NJ",stage:"Contacted",source:"Referral",interest:"Lexus LC 500",rating:4,totalSpent:0,purchases:[],notes:"Referred by Elena Rodriguez. Scheduled test drive.",lastContact:"Mar 2, 2026",addedAt:Date.now()-800000},
  {id:9,name:"Carlos Garcia",email:"carlos.g@email.com",phone:"(732) 555-1122",address:"190 Ash St, Milltown NJ",stage:"Lead",source:"CarGurus",interest:"BMW X5 M",rating:2,totalSpent:0,purchases:[],notes:"Online inquiry. No response to follow-up yet.",lastContact:"Mar 1, 2026",addedAt:Date.now()-900000},
  {id:10,name:"Natasha Williams",email:"natasha.w@outlook.com",phone:"(908) 555-3366",address:"56 Poplar Ln, Elizabeth NJ",stage:"Contacted",source:"Phone Call",interest:"Mercedes-Benz AMG C 63",rating:3,totalSpent:0,purchases:[],notes:"Called about AMG C63. Scheduled visit for Saturday.",lastContact:"Mar 4, 2026",addedAt:Date.now()-1000000},
  {id:11,name:"Ahmed Al-Rashid",email:"ahmed.ar@email.com",phone:"(732) 555-5544",address:"333 Hickory Ave, Milltown NJ",stage:"Closed Lost",source:"Auto Trader",interest:"Genesis G70",rating:2,totalSpent:0,purchases:[],notes:"Went with competitor. Price was main factor.",lastContact:"Feb 28, 2026",addedAt:Date.now()-1100000},
  {id:12,name:"Isabella Rossi",email:"isabella.r@email.com",phone:"(908) 555-7722",address:"12 Magnolia Dr, Elizabeth NJ",stage:"Lead",source:"Social Media",interest:"Porsche Taycan",rating:3,totalSpent:0,purchases:[],notes:"Liked our Instagram post. DMed about Taycan.",lastContact:"Mar 4, 2026",addedAt:Date.now()-1200000},
  {id:13,name:"Liam Foster",email:"liam.f@email.com",phone:"(732) 555-0088",address:"89 Chestnut Rd, Milltown NJ",stage:"Lead",source:"Website",interest:"Chevrolet Corvette",rating:2,totalSpent:0,purchases:[],notes:"Filled out contact form. Interested in orange Corvette.",lastContact:"Mar 5, 2026",addedAt:Date.now()-1300000},
  {id:14,name:"Zara Patel",email:"zara.p@gmail.com",phone:"(908) 555-4499",address:"201 Willow St, Elizabeth NJ",stage:"Negotiating",source:"Walk-in",interest:"Ferrari 296 GTB",rating:5,totalSpent:0,purchases:[],notes:"Serious buyer. Discussing trade-in of current vehicle.",lastContact:"Mar 4, 2026",addedAt:Date.now()-1400000},
  {id:15,name:"Daniel Hawk",email:"d.hawk@corp.com",phone:"(732) 555-6600",address:"77 Sycamore Blvd, Milltown NJ",stage:"Contacted",source:"Referral",interest:"Lamborghini Huracán",rating:4,totalSpent:0,purchases:[],notes:"High net worth. Referred by Marcus Thompson.",lastContact:"Mar 3, 2026",addedAt:Date.now()-1500000},
];

const ACTIVITY = [
  {id:1,type:"stage",customer:"Sofia Petrov",detail:"Moved to Negotiating",time:"2 hours ago",color:t.amb},
  {id:2,type:"note",customer:"Zara Patel",detail:"Added note: Discussing trade-in",time:"3 hours ago",color:t.pur},
  {id:3,type:"contact",customer:"Mei Tanaka",detail:"Scheduled test drive for Saturday",time:"5 hours ago",color:t.acc},
  {id:4,type:"sale",customer:"Marcus Thompson",detail:"Closed Won — 2024 Audi RS7 ($124,500)",time:"Yesterday",color:t.grn},
  {id:5,type:"lead",customer:"Liam Foster",detail:"New lead from Website",time:"Yesterday",color:t.cyn},
  {id:6,type:"contact",customer:"Natasha Williams",detail:"Phone call — scheduled visit",time:"Yesterday",color:t.acc},
  {id:7,type:"lost",customer:"Ahmed Al-Rashid",detail:"Closed Lost — went with competitor",time:"2 days ago",color:t.red},
  {id:8,type:"lead",customer:"Isabella Rossi",detail:"New lead from Social Media",time:"2 days ago",color:t.cyn},
];

/* ═══════════════════ HELPERS ═══════════════════ */
const fmt=n=>"$"+n.toLocaleString();
const fK=n=>n>=1e6?"$"+(n/1e6).toFixed(2)+"M":n>=1e3?"$"+(n/1e3).toFixed(1)+"K":"$"+n;

/* ═══════════════════ COMPONENTS ═══════════════════ */
function Card({children,s={}}){return <div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:14,...s}}>{children}</div>}
function Stat({label,val,chg,up,sub,icon,delay=0,color}){const[v,setV]=useState(false);useEffect(()=>{const tm=setTimeout(()=>setV(true),delay);return()=>clearTimeout(tm)},[]);return(<div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:13,padding:"16px 18px",flex:1,minWidth:150,opacity:v?1:0,transform:v?"translateY(0)":"translateY(10px)",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span style={{fontSize:10,color:t.tx3,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:500}}>{label}</span>{icon&&<span style={{color:color||t.tx3,opacity:.6,display:"flex"}}>{icon}</span>}</div><div style={{display:"flex",alignItems:"baseline",gap:8}}><span style={{fontSize:22,fontWeight:600,color:color||t.tx,letterSpacing:"-0.02em"}}>{val}</span>{chg&&<span style={{display:"inline-flex",alignItems:"center",gap:2,fontSize:10.5,fontWeight:500,color:up?t.grn:t.red}}>{up?IC.aUp:IC.aDn}{chg}</span>}</div>{sub&&<div style={{fontSize:10,color:t.tx3,marginTop:2}}>{sub}</div>}</div>)}
function Btn({children,v="default",onClick,s={},disabled}){const base={border:"none",borderRadius:9,cursor:disabled?"default":"pointer",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:500,display:"inline-flex",alignItems:"center",gap:5,transition:"all 0.15s",opacity:disabled?.5:1,...s};const vs={primary:{...base,background:`linear-gradient(135deg,${t.acc},#818cf8)`,color:"#fff",padding:"8px 16px"},default:{...base,background:t.sf2,border:`1px solid ${t.bdr}`,color:t.tx2,padding:"7px 13px"},ghost:{...base,background:"transparent",color:t.tx3,padding:"7px 10px"},danger:{...base,background:t.redD,color:t.red,padding:"7px 13px"}};return <button onClick={onClick} disabled={disabled} style={vs[v]||vs.default}>{children}</button>}
function ProgressBar({pct,color,h=5}){return <div style={{height:h,borderRadius:h,background:t.sf2,width:"100%"}}><div style={{height:"100%",borderRadius:h,background:color,width:`${Math.min(100,pct)}%`,transition:"width 0.8s cubic-bezier(0.16,1,0.3,1)"}}/></div>}
function Badge({s:st}){const c=STAGE_COL[st]||t.tx2;return <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"2px 9px",borderRadius:20,background:`${c}18`,color:c,fontSize:10.5,fontWeight:500,whiteSpace:"nowrap"}}><span style={{width:4,height:4,borderRadius:"50%",background:c}}/>{st}</span>}
function Stars({rating,onChange}){return <div style={{display:"flex",gap:1}}>{[1,2,3,4,5].map(i=><span key={i} onClick={()=>onChange&&onChange(i)} style={{cursor:onChange?"pointer":"default",color:i<=rating?t.amb:t.bdr2,display:"flex"}}>{i<=rating?IC.star:IC.starO}</span>)}</div>}
function Pagination({total,page,perPage,onPage}){const pages=Math.ceil(total/perPage);if(pages<=1)return null;return(<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderTop:`1px solid ${t.bdr}`}}><span style={{fontSize:11.5,color:t.tx3}}>Showing {(page-1)*perPage+1}–{Math.min(page*perPage,total)} of {total}</span><div style={{display:"flex",gap:3}}><Btn onClick={()=>onPage(Math.max(1,page-1))} disabled={page===1}>{IC.chL}</Btn>{Array.from({length:Math.min(pages,7)},(_,i)=>{let p=i+1;if(pages>7){const start=Math.max(1,Math.min(page-3,pages-6));p=start+i}return <button key={p} onClick={()=>onPage(p)} style={{width:28,height:28,borderRadius:6,border:"none",background:p===page?t.accD:"transparent",color:p===page?t.acc:t.tx3,fontSize:11.5,fontWeight:p===page?600:400,cursor:"pointer",fontFamily:"inherit"}}>{p}</button>})}<Btn onClick={()=>onPage(Math.min(pages,page+1))} disabled={page===pages}>{IC.chR}</Btn></div></div>)}

function Modal({open,onClose,title,children,w=600}){if(!open)return null;return(<div style={{position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}><div style={{position:"absolute",inset:0,background:t.ov,backdropFilter:"blur(6px)"}}/><div onClick={e=>e.stopPropagation()} style={{position:"relative",background:t.sf,border:`1px solid ${t.bdr}`,borderRadius:16,width:w,maxWidth:"95vw",maxHeight:"88vh",overflow:"auto",padding:"22px 26px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><h3 style={{fontSize:15,fontWeight:600,margin:0,color:t.tx}}>{title}</h3><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex"}}>{IC.x}</button></div>{children}</div></div>)}

function Inp({label,value,onChange,ph,type="text",s={}}){return(<div style={{display:"flex",flexDirection:"column",gap:4,...s}}>{label&&<label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={ph} style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none"}} onFocus={e=>e.target.style.borderColor=t.acc} onBlur={e=>e.target.style.borderColor=t.bdr}/></div>)}
function Sel({label,value,onChange,opts,s={}}){return(<div style={{display:"flex",flexDirection:"column",gap:4,...s}}>{label&&<label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}<select value={value} onChange={e=>onChange(e.target.value)} style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none",appearance:"auto"}}>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select></div>)}
function Textarea({label,value,onChange,ph,s={}}){return(<div style={{display:"flex",flexDirection:"column",gap:4,...s}}>{label&&<label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}<textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={ph} rows={3} style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 11px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none",resize:"vertical"}} onFocus={e=>e.target.style.borderColor=t.acc} onBlur={e=>e.target.style.borderColor=t.bdr}/></div>)}

function DonutChart({segments,size=120,stroke=13}){const total=segments.reduce((s,x)=>s+x.val,0);const r=(size-stroke)/2;const circ=2*Math.PI*r;let offset=0;const[hov,setHov]=useState(null);return(<div style={{position:"relative",width:size,height:size}}><svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={t.sf2} strokeWidth={stroke}/>{segments.map((seg,i)=>{const pct=seg.val/total;const dash=pct*circ;const o=offset;offset+=dash;return <circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={seg.color} strokeWidth={hov===i?stroke+4:stroke} strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-o} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"all 0.3s",cursor:"pointer"}} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}/>})}</svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:18,fontWeight:600,color:t.tx}}>{total}</div><div style={{fontSize:8.5,color:t.tx3,textTransform:"uppercase",letterSpacing:".05em"}}>Total</div></div></div>)}

/* ═══════════════════ MAIN CRM PAGE ═══════════════════ */
export default function CRMPage(){
  const[customers,setCustomers]=useState(CUST_DATA);
  const[view,setView]=useState("table");
  const[search,setSearch]=useState("");
  const[fStage,setFStage]=useState("All");
  const[fSource,setFSource]=useState("All");
  const[showFilters,setShowFilters]=useState(false);
  const[pg,setPg]=useState(1);const PP=8;
  const[hovR,setHovR]=useState(null);
  const[sortK,setSortK]=useState(null);const[sortD,setSortD]=useState("desc");
  const[detail,setDetail]=useState(null);
  const[showAdd,setShowAdd]=useState(false);
  const[editCust,setEditCust]=useState(null);

  const hasFilters=fStage!=="All"||fSource!=="All"||search;
  const resetFilters=()=>{setFStage("All");setFSource("All");setSearch("");setSortK(null);setSortD("desc");setPg(1)};

  const filtered=useMemo(()=>{
    let l=[...customers];
    if(fStage!=="All")l=l.filter(c=>c.stage===fStage);
    if(fSource!=="All")l=l.filter(c=>c.source===fSource);
    if(search){const q=search.toLowerCase();l=l.filter(c=>`${c.name} ${c.email} ${c.phone} ${c.interest}`.toLowerCase().includes(q))}
    if(sortK)l.sort((a,b)=>{const av=a[sortK],bv=b[sortK];return typeof av==="number"?(sortD==="asc"?av-bv:bv-av):(sortD==="asc"?String(av).localeCompare(String(bv)):String(bv).localeCompare(String(av)))});
    else l.sort((a,b)=>b.addedAt-a.addedAt);
    return l;
  },[customers,fStage,fSource,search,sortK,sortD]);

  const paged=filtered.slice((pg-1)*PP,pg*PP);
  const handleSort=k=>{if(sortK===k)setSortD(d=>d==="asc"?"desc":"asc");else{setSortK(k);setSortD("asc")}};
  const handleDel=id=>{setCustomers(p=>p.filter(c=>c.id!==id));setDetail(null)};
  const moveStage=(id,newStage)=>{setCustomers(p=>p.map(c=>c.id===id?{...c,stage:newStage}:c))};

  // Stats
  const closedWon=customers.filter(c=>c.stage==="Closed Won");
  const activeLeads=customers.filter(c=>["Lead","Contacted","Negotiating"].includes(c.stage)).length;
  const convRate=customers.length?Math.round(closedWon.length/customers.length*100):0;
  const totalRev=closedWon.reduce((s,c)=>s+c.totalSpent,0);
  const avgSpend=closedWon.length?Math.round(totalRev/closedWon.length):0;
  const newThisMonth=customers.filter(c=>c.lastContact.includes("Mar")).length;

  // Charts
  const srcCounts={};customers.forEach(c=>{srcCounts[c.source]=(srcCounts[c.source]||0)+1});
  const srcSegs=Object.entries(srcCounts).sort((a,b)=>b[1]-a[1]).map(([k,v])=>({val:v,color:SRC_COL[k]||t.tx3,label:k}));

  const stageCounts=STAGES.map(s=>({stage:s,count:customers.filter(c=>c.stage===s).length,color:STAGE_COL[s]}));

  const topSpenders=customers.filter(c=>c.totalSpent>0).sort((a,b)=>b.totalSpent-a.totalSpent).slice(0,5);

  const thS={textAlign:"left",padding:"10px 12px",fontSize:10,color:t.tx3,fontWeight:500,textTransform:"uppercase",letterSpacing:".06em",cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"};

  return(
    <div style={{minHeight:"100vh",background:t.bg,color:t.tx,fontFamily:"'Outfit',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${t.bdr};border-radius:3px}body{font-family:'Outfit',sans-serif;background:${t.bg}}`}</style>

      {/* HEADER */}
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 24px",borderBottom:`1px solid ${t.bdr}`,background:t.sf,position:"sticky",top:0,zIndex:20,flexWrap:"wrap",gap:10}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${t.acc},#818cf8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>AD</div>
          <div><h1 style={{fontSize:17,fontWeight:600,letterSpacing:"-0.02em",margin:0}}>Customers</h1><span style={{fontSize:10.5,color:t.tx3}}>{customers.length} total · {activeLeads} active leads</span></div>
        </div>
        <div style={{display:"flex",gap:8}}><Btn onClick={()=>setShowAdd(true)} v="primary">{IC.plus} Add Customer</Btn></div>
      </header>

      <div style={{padding:"18px 24px",display:"flex",flexDirection:"column",gap:18}}>

        {/* STATS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10}}>
          <Stat label="Total Customers" val={customers.length} icon={IC.users} delay={0}/>
          <Stat label="Active Leads" val={activeLeads} chg="5 new" up icon={IC.target} delay={60} color={t.cyn}/>
          <Stat label="Conversion Rate" val={`${convRate}%`} chg="3.2%" up icon={IC.trend} delay={120} color={t.grn}/>
          <Stat label="Total Revenue" val={fK(totalRev)} icon={IC.dollar} delay={180} color={t.grn}/>
          <Stat label="Avg Spend" val={fK(avgSpend)} sub="Per closed customer" icon={IC.dollar} delay={240}/>
          <Stat label="New This Month" val={newThisMonth} icon={IC.calPlus} delay={300} color={t.acc}/>
        </div>

        {/* ROW 1: Pipeline Funnel + Source Donut */}
        <div style={{display:"grid",gridTemplateColumns:"5fr 3fr",gap:14}}>
          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>Pipeline Funnel</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {stageCounts.map((s,i)=>{const maxC=Math.max(...stageCounts.map(x=>x.count),1);const widthPct=30+((s.count/maxC)*70);
                return(<div key={s.stage} style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{width:90,fontSize:11.5,color:t.tx2,textAlign:"right",flexShrink:0}}>{s.stage}</span>
                  <div style={{flex:1,position:"relative"}}>
                    <div style={{height:28,borderRadius:6,background:`${s.color}15`,width:`${widthPct}%`,display:"flex",alignItems:"center",paddingLeft:10,transition:"width 0.8s cubic-bezier(0.16,1,0.3,1)"}}>
                      <div style={{height:"100%",borderRadius:6,background:`${s.color}35`,width:`${(s.count/maxC)*100}%`,position:"absolute",left:0,top:0,transition:"width 0.8s"}}/>
                      <span style={{fontSize:13,fontWeight:600,color:s.color,position:"relative",zIndex:1}}>{s.count}</span>
                    </div>
                  </div>
                  <span style={{fontSize:10.5,color:t.tx3,width:35,textAlign:"right"}}>{customers.length?Math.round(s.count/customers.length*100):0}%</span>
                </div>)
              })}
            </div>
            <div style={{marginTop:14,display:"flex",gap:6,height:8,borderRadius:4,overflow:"hidden"}}>
              {stageCounts.filter(s=>s.count>0).map(s=><div key={s.stage} style={{flex:s.count,background:s.color,transition:"flex 0.5s"}}/>)}
            </div>
          </Card>

          <Card s={{padding:"18px 20px",display:"flex",flexDirection:"column"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:2}}>Customer Sources</div>
            <div style={{fontSize:10.5,color:t.tx3,marginBottom:14}}>Where customers come from</div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><DonutChart segments={srcSegs} size={115} stroke={12}/></div>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:"auto"}}>
              {srcSegs.slice(0,5).map(s=><div key={s.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:t.tx2}}><span style={{width:6,height:6,borderRadius:2,background:s.color}}/>{s.label}</span><span style={{fontSize:11.5,fontWeight:500,color:t.tx}}>{s.val}</span></div>)}
            </div>
          </Card>
        </div>

        {/* ROW 2: Top Spenders + Recent Activity */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:12}}>Top Customers by Spend</div>
            {topSpenders.map((c,i)=>{const cols=[t.grn,t.acc,t.pur,t.amb,t.cyn];return(
              <div key={c.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<topSpenders.length-1?`1px solid ${t.bdr}`:"none"}}>
                <div style={{width:30,height:30,borderRadius:"50%",background:`${cols[i]}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:600,color:cols[i]}}>{c.name.split(" ").map(n=>n[0]).join("")}</div>
                <div style={{flex:1}}><div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{c.name}</div><div style={{fontSize:10,color:t.tx3}}>{c.purchases.length} purchase{c.purchases.length!==1?"s":""}</div></div>
                <span style={{fontSize:13,fontWeight:600,color:t.grn,fontFamily:"monospace"}}>{fK(c.totalSpent)}</span>
              </div>
            )})}
            {topSpenders.length===0&&<div style={{padding:20,textAlign:"center",color:t.tx3,fontSize:12}}>No purchases yet</div>}
          </Card>

          <Card s={{padding:"18px 20px"}}>
            <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:12}}>Recent Activity</div>
            <div style={{display:"flex",flexDirection:"column",gap:0}}>
              {ACTIVITY.slice(0,6).map((a,i)=>(
                <div key={a.id} style={{display:"flex",gap:10,padding:"9px 0",borderBottom:i<5?`1px solid ${t.bdr}`:"none"}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:a.color,marginTop:5,flexShrink:0}}/>
                  <div><div style={{fontSize:12,color:t.tx}}><span style={{fontWeight:500}}>{a.customer}</span> — {a.detail}</div><div style={{fontSize:10,color:t.tx3,marginTop:1,display:"flex",alignItems:"center",gap:3}}>{IC.clock} {a.time}</div></div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CONVERSION RATE VISUAL */}
        <Card s={{padding:"18px 20px"}}>
          <div style={{fontSize:13.5,fontWeight:500,color:t.tx,marginBottom:14}}>Conversion Funnel</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            {stageCounts.slice(0,-1).map((s,i)=>{
              const nextCount=stageCounts[i+1]?.count||0;const convPct=s.count>0?Math.round(nextCount/s.count*100):0;
              return(<div key={s.stage} style={{display:"flex",alignItems:"center",gap:6,flex:1}}>
                <div style={{flex:1,textAlign:"center",padding:"10px 8px",background:`${s.color}10`,borderRadius:8,border:`1px solid ${s.color}20`}}>
                  <div style={{fontSize:18,fontWeight:600,color:s.color}}>{s.count}</div>
                  <div style={{fontSize:10,color:t.tx3,marginTop:2}}>{s.stage}</div>
                </div>
                {i<stageCounts.length-2&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,flexShrink:0}}>
                  <span style={{fontSize:10,fontWeight:500,color:convPct>50?t.grn:convPct>25?t.amb:t.red}}>{convPct}%</span>
                  <span style={{color:t.tx3,display:"flex"}}>{IC.chR}</span>
                </div>}
              </div>)
            })}
          </div>
        </Card>

        {/* VIEW TOGGLE + TOOLBAR */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <div style={{display:"flex",border:`1px solid ${t.bdr}`,borderRadius:7,overflow:"hidden"}}>
              {[["table","Table",IC.table],["kanban","Board",IC.kanban]].map(([m,l,icon])=>(
                <button key={m} onClick={()=>setView(m)} style={{padding:"6px 12px",background:view===m?t.sf2:"transparent",color:view===m?t.tx:t.tx3,border:"none",fontSize:11.5,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}>{icon}{l}</button>
              ))}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:5,background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"6px 10px",minWidth:170}}>
              <span style={{color:t.tx3,display:"flex"}}>{IC.search}</span>
              <input placeholder="Search name, email, interest..." value={search} onChange={e=>{setSearch(e.target.value);setPg(1)}} style={{background:"none",border:"none",outline:"none",color:t.tx,fontSize:12,width:"100%",fontFamily:"inherit"}}/>
              {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex"}}>{IC.x}</button>}
            </div>
            <Btn onClick={()=>setShowFilters(!showFilters)} s={{background:showFilters?t.accD:t.sf2,color:showFilters?t.acc:t.tx2}}>{IC.filter} Filters{hasFilters&&<span style={{width:6,height:6,borderRadius:"50%",background:t.acc}}/>}</Btn>
            {hasFilters&&<Btn v="ghost" onClick={resetFilters}>{IC.reset} Reset</Btn>}
          </div>
          <span style={{fontSize:11.5,color:t.tx3}}>{filtered.length} customer{filtered.length!==1?"s":""}</span>
        </div>

        {showFilters&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8,padding:"14px 16px",background:t.card,borderRadius:12,border:`1px solid ${t.bdr}`}}>
          <Sel label="Stage" value={fStage} onChange={v=>{setFStage(v);setPg(1)}} opts={["All",...STAGES]}/>
          <Sel label="Source" value={fSource} onChange={v=>{setFSource(v);setPg(1)}} opts={["All",...SOURCES]}/>
        </div>}

        {/* ═══ TABLE VIEW ═══ */}
        {view==="table"?(
          <Card s={{overflow:"hidden"}}>
            <div style={{overflow:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:1050}}>
                <thead><tr style={{borderBottom:`1px solid ${t.bdr}`}}>
                  {[["Name","name"],["Contact",null],["Stage","stage"],["Source","source"],["Interest","interest"],["Rating","rating"],["Spent","totalSpent"],["Last Contact","lastContact"],["",null]].map(([h,k])=>(
                    <th key={h||"act"} style={thS} onClick={()=>k&&handleSort(k)}><span style={{display:"inline-flex",alignItems:"center",gap:2}}>{h}{sortK===k&&(sortD==="asc"?IC.aUp:IC.aDn)}</span></th>
                  ))}
                </tr></thead>
                <tbody>{paged.map((c,i)=>{const isH=hovR===c.id;return(
                  <tr key={c.id} onMouseEnter={()=>setHovR(c.id)} onMouseLeave={()=>setHovR(null)} style={{borderBottom:i<paged.length-1?`1px solid ${t.bdr}`:"none",background:isH?t.cardH:"transparent",transition:"background 0.1s",cursor:"pointer"}} onClick={()=>setDetail(c)}>
                    <td style={{padding:"10px 12px"}}><div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:32,height:32,borderRadius:"50%",background:t.accD,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,color:t.acc}}>{c.name.split(" ").map(n=>n[0]).join("")}</div><div><div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{c.name}</div><div style={{fontSize:10,color:t.tx3}}>{c.address?.split(",")[0]}</div></div></div></td>
                    <td style={{padding:"10px 12px"}}><div style={{fontSize:11.5,color:t.tx2}}>{c.email}</div><div style={{fontSize:10.5,color:t.tx3}}>{c.phone}</div></td>
                    <td style={{padding:"10px 12px"}}><Badge s={c.stage}/></td>
                    <td style={{padding:"10px 12px"}}><span style={{padding:"2px 8px",borderRadius:5,fontSize:10.5,background:`${SRC_COL[c.source]||t.tx3}15`,color:SRC_COL[c.source]||t.tx3,fontWeight:500}}>{c.source}</span></td>
                    <td style={{padding:"10px 12px",fontSize:11.5,color:t.tx2}}>{c.interest}</td>
                    <td style={{padding:"10px 12px"}}><Stars rating={c.rating}/></td>
                    <td style={{padding:"10px 12px",fontSize:12,fontFamily:"monospace",color:c.totalSpent>0?t.grn:t.tx3}}>{c.totalSpent>0?fK(c.totalSpent):"—"}</td>
                    <td style={{padding:"10px 12px",fontSize:11,color:t.tx3}}>{c.lastContact}</td>
                    <td style={{padding:"10px 12px"}}><div style={{display:"flex",gap:3,opacity:isH?1:0,transition:"opacity 0.1s"}} onClick={e=>e.stopPropagation()}>
                      <button onClick={()=>setEditCust(c)} style={{background:t.sf2,border:`1px solid ${t.bdr}`,borderRadius:5,padding:"3px 6px",cursor:"pointer",color:t.tx2,display:"flex"}}>{IC.edit}</button>
                      <button onClick={()=>handleDel(c.id)} style={{background:t.redD,border:"none",borderRadius:5,padding:"3px 6px",cursor:"pointer",color:t.red,display:"flex"}}>{IC.trash}</button>
                    </div></td>
                  </tr>
                )})}{paged.length===0&&<tr><td colSpan={9} style={{padding:40,textAlign:"center",color:t.tx3}}>No customers match your filters</td></tr>}</tbody>
              </table>
            </div>
            <Pagination total={filtered.length} page={pg} perPage={PP} onPage={setPg}/>
          </Card>
        ):(
          /* ═══ KANBAN BOARD ═══ */
          <div style={{display:"grid",gridTemplateColumns:`repeat(${STAGES.length},1fr)`,gap:10,overflow:"auto",minWidth:900}}>
            {STAGES.map(stage=>{
              const stageCusts=filtered.filter(c=>c.stage===stage);
              const col=STAGE_COL[stage];
              return(
                <div key={stage} style={{background:t.sf2,borderRadius:12,border:`1px solid ${t.bdr}`,display:"flex",flexDirection:"column",minHeight:300}}>
                  <div style={{padding:"12px 14px",borderBottom:`1px solid ${t.bdr}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:col}}/>
                      <span style={{fontSize:12.5,fontWeight:600,color:t.tx}}>{stage}</span>
                    </div>
                    <span style={{fontSize:11,fontWeight:500,color:col,background:`${col}18`,padding:"2px 8px",borderRadius:10}}>{stageCusts.length}</span>
                  </div>
                  <div style={{padding:"8px 8px",flex:1,display:"flex",flexDirection:"column",gap:6,overflow:"auto"}}>
                    {stageCusts.map(c=>(
                      <div key={c.id} onClick={()=>setDetail(c)} style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:10,padding:"12px 13px",cursor:"pointer",transition:"all 0.15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=t.bdr2;e.currentTarget.style.transform="translateY(-1px)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.bdr;e.currentTarget.style.transform="none"}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                          <div style={{width:28,height:28,borderRadius:"50%",background:`${col}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9.5,fontWeight:600,color:col}}>{c.name.split(" ").map(n=>n[0]).join("")}</div>
                          <div><div style={{fontSize:12,fontWeight:500,color:t.tx}}>{c.name}</div><div style={{fontSize:10,color:t.tx3}}>{c.source}</div></div>
                        </div>
                        <div style={{fontSize:10.5,color:t.tx2,marginBottom:4,display:"flex",alignItems:"center",gap:4}}>{IC.car}<span>{c.interest}</span></div>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <Stars rating={c.rating}/>
                          {c.totalSpent>0&&<span style={{fontSize:10.5,fontWeight:500,color:t.grn}}>{fK(c.totalSpent)}</span>}
                        </div>
                        {c.notes&&<div style={{fontSize:10,color:t.tx3,marginTop:6,padding:"5px 7px",background:t.sf2,borderRadius:5,lineHeight:1.3}}>{c.notes.slice(0,60)}{c.notes.length>60?"...":""}</div>}
                        {/* Stage move buttons */}
                        <div style={{display:"flex",gap:3,marginTop:8,flexWrap:"wrap"}}>
                          {STAGES.filter(s=>s!==stage).slice(0,3).map(s=>(
                            <button key={s} onClick={e=>{e.stopPropagation();moveStage(c.id,s)}} style={{padding:"2px 7px",borderRadius:5,border:`1px solid ${STAGE_COL[s]}25`,background:`${STAGE_COL[s]}10`,color:STAGE_COL[s],fontSize:9.5,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>→ {s}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                    {stageCusts.length===0&&<div style={{padding:16,textAlign:"center",color:t.tx3,fontSize:11}}>No customers</div>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ═══ ADD CUSTOMER MODAL ═══ */}
      <AddCustomerModal open={showAdd} onClose={()=>setShowAdd(false)} onAdd={c=>{setCustomers(p=>[c,...p]);setShowAdd(false)}}/>

      {/* ═══ EDIT MODAL ═══ */}
      <Modal open={!!editCust} onClose={()=>setEditCust(null)} title="Edit Customer" w={640}>
        {editCust&&<EditCustForm cust={editCust} onSave={u=>{setCustomers(p=>p.map(c=>c.id===u.id?u:c));setEditCust(null)}} onCancel={()=>setEditCust(null)}/>}
      </Modal>

      {/* ═══ DETAIL MODAL ═══ */}
      <Modal open={!!detail} onClose={()=>setDetail(null)} title="Customer Profile" w={680}>
        {detail&&<DetailView cust={detail} onEdit={()=>{setEditCust(detail);setDetail(null)}} onDel={()=>handleDel(detail.id)} onMove={s=>{moveStage(detail.id,s);setDetail({...detail,stage:s})}}/>}
      </Modal>
    </div>
  );
}

/* ═══════════════════ ADD CUSTOMER ═══════════════════ */
function AddCustomerModal({open,onClose,onAdd}){
  const[name,setName]=useState("");const[email,setEmail]=useState("");const[phone,setPhone]=useState("");
  const[address,setAddress]=useState("");const[source,setSource]=useState("Walk-in");const[interest,setInterest]=useState("");
  const[notes,setNotes]=useState("");const[rating,setRating]=useState(3);
  const reset=()=>{setName("");setEmail("");setPhone("");setAddress("");setSource("Walk-in");setInterest("");setNotes("");setRating(3)};
  return(
    <Modal open={open} onClose={()=>{onClose();reset()}} title="Add New Customer" w={640}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Inp label="Full Name" value={name} onChange={setName} ph="John Smith"/>
        <Inp label="Email" value={email} onChange={setEmail} ph="john@email.com"/>
        <Inp label="Phone" value={phone} onChange={setPhone} ph="(555) 555-0000"/>
        <Sel label="Source" value={source} onChange={setSource} opts={SOURCES}/>
        <Inp label="Address" value={address} onChange={setAddress} ph="123 Main St, City NJ" s={{gridColumn:"1/-1"}}/>
        <Inp label="Interested In" value={interest} onChange={setInterest} ph="e.g. BMW M4, Tesla Model S"/>
        <div style={{display:"flex",flexDirection:"column",gap:4}}><label style={{fontSize:11,fontWeight:500,color:t.tx2}}>Priority Rating</label><Stars rating={rating} onChange={setRating}/></div>
        <Textarea label="Notes" value={notes} onChange={setNotes} ph="Any notes about this customer..." s={{gridColumn:"1/-1"}}/>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:18}}>
        <Btn onClick={()=>{onClose();reset()}}>Cancel</Btn>
        <Btn v="primary" onClick={()=>{if(!name)return;onAdd({id:Date.now(),name,email,phone,address,stage:"Lead",source,interest,rating,totalSpent:0,purchases:[],notes,lastContact:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),addedAt:Date.now()});reset()}} disabled={!name}>Add Customer</Btn>
      </div>
    </Modal>
  );
}

/* ═══════════════════ EDIT FORM ═══════════════════ */
function EditCustForm({cust,onSave,onCancel}){
  const[f,sF]=useState({...cust});const u=(k,v)=>sF(p=>({...p,[k]:v}));
  return(<>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Inp label="Full Name" value={f.name} onChange={v=>u("name",v)}/>
      <Inp label="Email" value={f.email} onChange={v=>u("email",v)}/>
      <Inp label="Phone" value={f.phone} onChange={v=>u("phone",v)}/>
      <Sel label="Source" value={f.source} onChange={v=>u("source",v)} opts={SOURCES}/>
      <Inp label="Address" value={f.address} onChange={v=>u("address",v)} s={{gridColumn:"1/-1"}}/>
      <Sel label="Stage" value={f.stage} onChange={v=>u("stage",v)} opts={STAGES}/>
      <Inp label="Interested In" value={f.interest} onChange={v=>u("interest",v)}/>
      <div style={{display:"flex",flexDirection:"column",gap:4}}><label style={{fontSize:11,fontWeight:500,color:t.tx2}}>Rating</label><Stars rating={f.rating} onChange={v=>u("rating",v)}/></div>
      <Textarea label="Notes" value={f.notes} onChange={v=>u("notes",v)} s={{gridColumn:"1/-1"}}/>
    </div>
    <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:18}}>
      <Btn onClick={onCancel}>Cancel</Btn>
      <Btn v="primary" onClick={()=>onSave(f)}>Save Changes</Btn>
    </div>
  </>);
}

/* ═══════════════════ DETAIL VIEW ═══════════════════ */
function DetailView({cust:c,onEdit,onDel,onMove}){
  const col=STAGE_COL[c.stage]||t.tx2;
  return(<div>
    <div style={{display:"flex",gap:16,marginBottom:18,flexWrap:"wrap"}}>
      <div style={{width:60,height:60,borderRadius:"50%",background:`${col}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:600,color:col,flexShrink:0}}>{c.name.split(" ").map(n=>n[0]).join("")}</div>
      <div style={{flex:1,minWidth:200}}>
        <h3 style={{margin:"0 0 4px",fontSize:18,fontWeight:600,color:t.tx}}>{c.name}</h3>
        <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}><Badge s={c.stage}/><span style={{padding:"2px 8px",borderRadius:5,fontSize:10.5,background:`${SRC_COL[c.source]||t.tx3}15`,color:SRC_COL[c.source]||t.tx3,fontWeight:500}}>{c.source}</span><Stars rating={c.rating}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[["Email",c.email,IC.mail],["Phone",c.phone,IC.phone],["Address",c.address,IC.mapPin],["Interested In",c.interest,IC.car],["Last Contact",c.lastContact,IC.calendar],["Total Spent",c.totalSpent>0?fmt(c.totalSpent):"—",IC.dollar]].map(([l,v,icon])=>(
            <div key={l}><div style={{fontSize:9.5,color:t.tx3,textTransform:"uppercase",letterSpacing:".05em",marginBottom:1}}>{l}</div><div style={{fontSize:12,color:t.tx,display:"flex",alignItems:"center",gap:4}}><span style={{color:t.tx3,display:"flex",transform:"scale(0.85)"}}>{icon}</span>{v||"—"}</div></div>
          ))}
        </div>
      </div>
    </div>

    {/* Stage Move */}
    <div style={{marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:500,color:t.tx2,marginBottom:6}}>Move to Stage</div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
        {STAGES.filter(s=>s!==c.stage).map(s=>(
          <button key={s} onClick={()=>onMove(s)} style={{padding:"5px 12px",borderRadius:7,border:`1px solid ${STAGE_COL[s]}30`,background:`${STAGE_COL[s]}10`,color:STAGE_COL[s],fontSize:11.5,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>→ {s}</button>
        ))}
      </div>
    </div>

    {/* Notes */}
    {c.notes&&<div style={{marginBottom:16,padding:"12px 14px",background:t.sf2,borderRadius:10,border:`1px solid ${t.bdr}`}}>
      <div style={{fontSize:11,fontWeight:500,color:t.tx2,marginBottom:4,display:"flex",alignItems:"center",gap:4}}>{IC.note} Notes</div>
      <div style={{fontSize:12.5,color:t.tx,lineHeight:1.5}}>{c.notes}</div>
    </div>}

    {/* Purchase History */}
    <div style={{marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:500,color:t.tx2,marginBottom:8,display:"flex",alignItems:"center",gap:4}}>{IC.car} Purchase History</div>
      {c.purchases.length>0?c.purchases.map((p,i)=>(
        <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:t.sf2,borderRadius:8,border:`1px solid ${t.bdr}`,marginBottom:4}}>
          <div><div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{p.car}</div><div style={{fontSize:10.5,color:t.tx3}}>{p.date}</div></div>
          <span style={{fontSize:13,fontWeight:600,color:t.grn,fontFamily:"monospace"}}>{fmt(p.price)}</span>
        </div>
      )):<div style={{padding:"12px",textAlign:"center",color:t.tx3,fontSize:11.5,background:t.sf2,borderRadius:8}}>No purchases yet</div>}
    </div>

    <div style={{display:"flex",justifyContent:"flex-end",gap:6}}>
      <Btn v="danger" onClick={onDel}>{IC.trash} Delete</Btn>
      <Btn onClick={onEdit}>{IC.edit} Edit</Btn>
    </div>
  </div>);
}
