import { useState, useEffect } from "react";

/* ═══════════════════ THEME ═══════════════════ */
const t={bg:"#07070a",sf:"#0e0e13",sf2:"#131318",card:"#101015",cardH:"#17171e",bdr:"#1d1d26",bdr2:"#282832",tx:"#ededf0",tx2:"#888894",tx3:"#50505c",acc:"#5b8def",accD:"rgba(91,141,239,0.1)",grn:"#34d399",grnD:"rgba(52,211,153,0.1)",red:"#f87171",redD:"rgba(248,113,113,0.1)",amb:"#fbbf24",ambD:"rgba(251,191,36,0.1)",pur:"#a78bfa",purD:"rgba(167,139,250,0.1)",cyn:"#22d3ee",cynD:"rgba(34,211,238,0.1)",inp:"#0b0b10",ov:"rgba(0,0,0,0.75)"};

/* ═══════════════════ ICONS ═══════════════════ */
const IC={
  building:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M3 21h18M3 7v14M21 7v14M6 11h2M6 15h2M10 11h2M10 15h2M14 11h2M14 15h2M18 11h2M18 15h2M9 21v-4h6v4M12 3l9 4M3 7l9-4"/></svg>,
  user:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  gear:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  db:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  list:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  info:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  lock:<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  moon:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  sun:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  bell:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  dl:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  upload:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  trash:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  check:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  plus:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  x:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  mapPin:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  clock:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  shield:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  save:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  edit:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
};

const SECTIONS=[
  {id:"general",label:"General",icon:"building"},
  {id:"app",label:"App Settings",icon:"gear"},
  {id:"profile",label:"User Profile",icon:"user"},
  {id:"security",label:"Security",icon:"lock"},
  {id:"data",label:"Data & Backup",icon:"db"},
  {id:"audit",label:"Audit Log",icon:"list"},
  {id:"about",label:"About",icon:"info"},
];

/* ═══════════════════ COMPONENTS ═══════════════════ */
function Card({children,s={},title,desc}){return <div style={{background:t.card,border:`1px solid ${t.bdr}`,borderRadius:14,padding:"20px 22px",marginBottom:14,...s}}>{title&&<div style={{fontSize:14,fontWeight:600,color:t.tx,marginBottom:desc?2:14}}>{title}</div>}{desc&&<div style={{fontSize:11,color:t.tx3,marginBottom:14}}>{desc}</div>}{children}</div>}
function Inp({label,value,onChange,ph,type="text",s={},disabled}){return(<div style={{display:"flex",flexDirection:"column",gap:4,...s}}>{label&&<label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={ph} disabled={disabled} style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"9px 12px",color:disabled?t.tx3:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none",opacity:disabled?.6:1}} onFocus={e=>{if(!disabled)e.target.style.borderColor=t.acc}} onBlur={e=>e.target.style.borderColor=t.bdr}/></div>)}
function Sel({label,value,onChange,opts,s={}}){return(<div style={{display:"flex",flexDirection:"column",gap:4,...s}}>{label&&<label style={{fontSize:11,fontWeight:500,color:t.tx2}}>{label}</label>}<select value={value} onChange={e=>onChange(e.target.value)} style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"9px 12px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none",appearance:"auto"}}>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select></div>)}
function Toggle({on,onToggle,label,desc}){return(<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0"}}><div><div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{label}</div>{desc&&<div style={{fontSize:10.5,color:t.tx3,marginTop:1}}>{desc}</div>}</div><button onClick={onToggle} style={{width:44,height:24,borderRadius:12,border:"none",background:on?t.acc:t.bdr,cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}><div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:on?23:3,transition:"left .2s"}}/></button></div>)}
function Btn({children,v="default",onClick,s={},disabled}){const base={border:"none",borderRadius:9,cursor:disabled?"default":"pointer",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:500,display:"inline-flex",alignItems:"center",gap:5,transition:"all .15s",opacity:disabled?.5:1,...s};const vs={primary:{...base,background:`linear-gradient(135deg,${t.acc},#818cf8)`,color:"#fff",padding:"9px 18px"},default:{...base,background:t.sf2,border:`1px solid ${t.bdr}`,color:t.tx2,padding:"8px 14px"},danger:{...base,background:t.redD,color:t.red,padding:"8px 14px",border:`1px solid rgba(248,113,113,0.15)`},success:{...base,background:t.grnD,color:t.grn,padding:"8px 14px"}};return <button onClick={onClick} disabled={disabled} style={vs[v]||vs.default}>{children}</button>}

function SaveToast({show}){if(!show)return null;return <div style={{position:"fixed",bottom:24,right:24,background:t.grn,color:"#000",padding:"10px 20px",borderRadius:10,fontSize:13,fontWeight:500,display:"flex",alignItems:"center",gap:6,zIndex:100,boxShadow:"0 4px 20px rgba(52,211,153,0.3)"}}>{IC.check} Settings saved successfully</div>}

/* ═══════════════════ AUDIT LOG DATA ═══════════════════ */
const AUDIT_LOG=[
  {id:1,action:"Vehicle Sold",detail:"2024 Tesla Model S Plaid → James Mitchell",user:"Sarah Kim",time:"Mar 5, 2026 · 2:30 PM",color:t.grn},
  {id:2,action:"Customer Added",detail:"Liam Foster — Lead from Website",user:"System",time:"Mar 5, 2026 · 1:15 PM",color:t.cyn},
  {id:3,action:"Expense Created",detail:"Staff payroll — March ($46,500)",user:"Tom Liu",time:"Mar 5, 2026 · 11:00 AM",color:t.red},
  {id:4,action:"Vehicle Added",detail:"2024 McLaren 750S — Elizabeth lot",user:"Mike Reeves",time:"Mar 4, 2026 · 4:45 PM",color:t.acc},
  {id:5,action:"Document Uploaded",detail:"Lot Photos — New Arrivals (JPG, 12MB)",user:"Mike Reeves",time:"Mar 4, 2026 · 3:20 PM",color:t.pur},
  {id:6,action:"Customer Stage Changed",detail:"Sofia Petrov → Negotiating",user:"Sarah Kim",time:"Mar 4, 2026 · 2:00 PM",color:t.amb},
  {id:7,action:"Settings Updated",detail:"Tax rate changed to 6.625%",user:"John Dealer",time:"Mar 3, 2026 · 10:00 AM",color:t.tx2},
  {id:8,action:"Vehicle Sold",detail:"2024 Audi RS7 → Marcus Thompson",user:"Tom Liu",time:"Mar 3, 2026 · 9:15 AM",color:t.grn},
  {id:9,action:"Backup Created",detail:"Full database backup (24.3 MB)",user:"System",time:"Mar 2, 2026 · 12:00 AM",color:t.pur},
  {id:10,action:"Employee Added",detail:"Jake Wilson — Sales Associate",user:"Derek Brown",time:"Mar 1, 2026 · 8:30 AM",color:t.cyn},
];

/* ═══════════════════ MAIN SETTINGS PAGE ═══════════════════ */
export default function SettingsPage(){
  const[section,setSection]=useState("general");
  const[saved,setSaved]=useState(false);
  const save=()=>{setSaved(true);setTimeout(()=>setSaved(false),2500)};

  // General
  const[dealerName,setDealerName]=useState("AutoDealer Pro");
  const[ownerName,setOwnerName]=useState("John Dealer");
  const[ownerEmail,setOwnerEmail]=useState("john@autodealer.pro");
  const[ownerPhone,setOwnerPhone]=useState("(732) 555-0001");
  const[bizAddress,setBizAddress]=useState("1200 Auto Boulevard, Milltown NJ 08850");
  const[bizEmail,setBizEmail]=useState("info@autodealer.pro");
  const[timezone,setTimezone]=useState("America/New_York");
  const[currency,setCurrency]=useState("USD");
  const[taxRate,setTaxRate]=useState("6.625");
  const[hours,setHours]=useState({mon:"9:00 AM - 7:00 PM",tue:"9:00 AM - 7:00 PM",wed:"9:00 AM - 7:00 PM",thu:"9:00 AM - 7:00 PM",fri:"9:00 AM - 8:00 PM",sat:"10:00 AM - 6:00 PM",sun:"Closed"});

  // App
  const[darkMode,setDarkMode]=useState(true);
  const[notifSales,setNotifSales]=useState(true);
  const[notifLeads,setNotifLeads]=useState(true);
  const[notifExpenses,setNotifExpenses]=useState(false);
  const[notifService,setNotifService]=useState(true);
  const[notifEmail,setNotifEmail]=useState(true);
  const[markup,setMarkup]=useState("12");
  const[locs,setLocs]=useState([{id:1,name:"Milltown",addr:"1200 Auto Blvd, Milltown NJ",cap:"60"},{id:2,name:"Elizabeth",addr:"850 Premium Dr, Elizabeth NJ",cap:"40"}]);
  const[statuses,setStatuses]=useState(["In Stock","Sold","Reserved","In Service"]);
  const[expCats,setExpCats]=useState([{cat:"Rent",budget:"24000"},{cat:"Salaries",budget:"48000"},{cat:"Marketing",budget:"20000"},{cat:"Insurance",budget:"14000"},{cat:"Utilities",budget:"4000"},{cat:"Detailing",budget:"8000"},{cat:"Transport",budget:"6000"},{cat:"Repairs",budget:"10000"},{cat:"Legal",budget:"5000"},{cat:"Software",budget:"3000"}]);
  const[newCat,setNewCat]=useState("");const[newBudget,setNewBudget]=useState("");
  const[newStatus,setNewStatus]=useState("");

  // Profile
  const[profName,setProfName]=useState("John Dealer");
  const[profEmail,setProfEmail]=useState("john@autodealer.pro");
  const[profRole,setProfRole]=useState("Owner");
  const[profPhone,setProfPhone]=useState("(732) 555-0001");

  // Security
  const[curPass,setCurPass]=useState("");
  const[newPass,setNewPass]=useState("");
  const[confPass,setConfPass]=useState("");
  const[twoFA,setTwoFA]=useState(false);
  const[sessionTimeout,setSessionTimeout]=useState("30");

  const dayLabels={mon:"Monday",tue:"Tuesday",wed:"Wednesday",thu:"Thursday",fri:"Friday",sat:"Saturday",sun:"Sunday"};

  const renderSection=()=>{
    switch(section){
      case "general": return(<>
        <Card title="Dealership Information" desc="Your business identity and contact details">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <Inp label="Dealership Name" value={dealerName} onChange={setDealerName}/>
            <Inp label="Owner Name" value={ownerName} onChange={setOwnerName}/>
            <Inp label="Business Email" value={bizEmail} onChange={setBizEmail}/>
            <Inp label="Owner Phone" value={ownerPhone} onChange={setOwnerPhone}/>
            <Inp label="Business Address" value={bizAddress} onChange={setBizAddress} s={{gridColumn:"1/-1"}}/>
          </div>
        </Card>
        <Card title="Email Settings">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <Inp label="Primary Email" value={ownerEmail} onChange={setOwnerEmail}/>
            <Inp label="Reply-To Email" value={bizEmail} onChange={setBizEmail}/>
          </div>
        </Card>
        <Card title="Regional Settings">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
            <Sel label="Timezone" value={timezone} onChange={setTimezone} opts={["America/New_York","America/Chicago","America/Denver","America/Los_Angeles"]}/>
            <Sel label="Currency" value={currency} onChange={setCurrency} opts={["USD","EUR","GBP","CAD"]}/>
            <Inp label="Tax Rate (%)" value={taxRate} onChange={setTaxRate} type="number"/>
          </div>
        </Card>
        <Card title="Business Hours" desc="Set your operating hours for each day">
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {Object.entries(hours).map(([day,val])=>(
              <div key={day} style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{width:80,fontSize:12,fontWeight:500,color:t.tx}}>{dayLabels[day]}</span>
                <input value={val} onChange={e=>setHours(p=>({...p,[day]:e.target.value}))} style={{flex:1,background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"8px 12px",color:t.tx,fontSize:12.5,fontFamily:"inherit",outline:"none"}}/>
              </div>
            ))}
          </div>
        </Card>
        <Btn v="primary" onClick={save}>{IC.save} Save Changes</Btn>
      </>);

      case "app": return(<>
        <Card title="Appearance">
          <Toggle on={darkMode} onToggle={()=>setDarkMode(!darkMode)} label="Dark Mode" desc="Toggle between dark and light theme"/>
        </Card>
        <Card title="Default Markup" desc="Default profit margin when adding vehicles">
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Inp label="" value={markup} onChange={setMarkup} type="number" s={{width:80}}/>
            <span style={{fontSize:13,color:t.tx2,marginTop:2}}>% markup on cost</span>
          </div>
        </Card>
        <Card title="Manage Locations" desc="Add or edit your dealership locations">
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {locs.map((loc,i)=>(
              <div key={loc.id} style={{display:"flex",gap:8,alignItems:"flex-end"}}>
                <Inp label={i===0?"Name":""} value={loc.name} onChange={v=>setLocs(p=>p.map((l,j)=>j===i?{...l,name:v}:l))} s={{flex:1}}/>
                <Inp label={i===0?"Address":""} value={loc.addr} onChange={v=>setLocs(p=>p.map((l,j)=>j===i?{...l,addr:v}:l))} s={{flex:2}}/>
                <Inp label={i===0?"Capacity":""} value={loc.cap} onChange={v=>setLocs(p=>p.map((l,j)=>j===i?{...l,cap:v}:l))} type="number" s={{width:80}}/>
                {locs.length>1&&<button onClick={()=>setLocs(p=>p.filter((_,j)=>j!==i))} style={{background:t.redD,border:"none",borderRadius:7,padding:"8px",cursor:"pointer",color:t.red,display:"flex",marginBottom:0}}>{IC.trash}</button>}
              </div>
            ))}
            <Btn onClick={()=>setLocs(p=>[...p,{id:Date.now(),name:"",addr:"",cap:"30"}])} s={{alignSelf:"flex-start"}}>{IC.plus} Add Location</Btn>
          </div>
        </Card>
        <Card title="Vehicle Statuses" desc="Manage the status options for your inventory">
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
            {statuses.map(s=>(
              <div key={s} style={{display:"flex",alignItems:"center",gap:4,padding:"5px 10px",borderRadius:7,background:t.sf2,border:`1px solid ${t.bdr}`}}>
                <span style={{fontSize:12,color:t.tx}}>{s}</span>
                {statuses.length>2&&<button onClick={()=>setStatuses(p=>p.filter(x=>x!==s))} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex",padding:0}}>{IC.x}</button>}
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:6}}>
            <input value={newStatus} onChange={e=>setNewStatus(e.target.value)} placeholder="New status..." style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"7px 10px",color:t.tx,fontSize:12,fontFamily:"inherit",outline:"none",width:160}}/>
            <Btn onClick={()=>{if(newStatus&&!statuses.includes(newStatus)){setStatuses(p=>[...p,newStatus]);setNewStatus("")}}}>{IC.plus} Add</Btn>
          </div>
        </Card>
        <Card title="Expense Categories & Budgets" desc="Configure expense tracking categories with monthly budgets">
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {expCats.map((ec,i)=>(
              <div key={i} style={{display:"flex",gap:8,alignItems:"center"}}>
                <Inp value={ec.cat} onChange={v=>setExpCats(p=>p.map((c,j)=>j===i?{...c,cat:v}:c))} s={{flex:1}}/>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <span style={{fontSize:11,color:t.tx3}}>$</span>
                  <input value={ec.budget} onChange={e=>setExpCats(p=>p.map((c,j)=>j===i?{...c,budget:e.target.value}:c))} type="number" style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"7px 10px",color:t.tx,fontSize:12,fontFamily:"inherit",outline:"none",width:90}}/>
                  <span style={{fontSize:10,color:t.tx3}}>/mo</span>
                </div>
                <button onClick={()=>setExpCats(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:t.tx3,display:"flex"}}>{IC.trash}</button>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:6,marginTop:10}}>
            <input value={newCat} onChange={e=>setNewCat(e.target.value)} placeholder="Category name" style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"7px 10px",color:t.tx,fontSize:12,fontFamily:"inherit",outline:"none",flex:1}}/>
            <input value={newBudget} onChange={e=>setNewBudget(e.target.value)} placeholder="Budget" type="number" style={{background:t.inp,border:`1px solid ${t.bdr}`,borderRadius:8,padding:"7px 10px",color:t.tx,fontSize:12,fontFamily:"inherit",outline:"none",width:90}}/>
            <Btn onClick={()=>{if(newCat){setExpCats(p=>[...p,{cat:newCat,budget:newBudget||"0"}]);setNewCat("");setNewBudget("")}}}>{IC.plus} Add</Btn>
          </div>
        </Card>
        <Card title="Notifications" desc="Choose what you get notified about">
          <div style={{display:"flex",flexDirection:"column"}}>
            <Toggle on={notifSales} onToggle={()=>setNotifSales(!notifSales)} label="New Sales" desc="Get notified when a vehicle is sold"/>
            <div style={{borderBottom:`1px solid ${t.bdr}`}}/>
            <Toggle on={notifLeads} onToggle={()=>setNotifLeads(!notifLeads)} label="New Leads" desc="Alert when new customer leads come in"/>
            <div style={{borderBottom:`1px solid ${t.bdr}`}}/>
            <Toggle on={notifExpenses} onToggle={()=>setNotifExpenses(!notifExpenses)} label="Expense Alerts" desc="Notify when expenses exceed budget"/>
            <div style={{borderBottom:`1px solid ${t.bdr}`}}/>
            <Toggle on={notifService} onToggle={()=>setNotifService(!notifService)} label="Service Updates" desc="Vehicle service status changes"/>
            <div style={{borderBottom:`1px solid ${t.bdr}`}}/>
            <Toggle on={notifEmail} onToggle={()=>setNotifEmail(!notifEmail)} label="Email Notifications" desc="Receive notifications via email"/>
          </div>
        </Card>
        <Btn v="primary" onClick={save}>{IC.save} Save Changes</Btn>
      </>);

      case "profile": return(<>
        <Card title="Your Profile" desc="Manage your personal information">
          <div style={{display:"flex",gap:18,marginBottom:18,flexWrap:"wrap"}}>
            <div style={{width:72,height:72,borderRadius:"50%",background:`linear-gradient(135deg,${t.acc},#818cf8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:600,color:"#fff",flexShrink:0}}>JD</div>
            <div style={{flex:1,minWidth:200}}>
              <div style={{fontSize:16,fontWeight:600,color:t.tx}}>{profName}</div>
              <div style={{fontSize:12,color:t.tx3,marginTop:2}}>{profRole}</div>
              <div style={{display:"flex",gap:6,marginTop:8}}>
                <Btn s={{fontSize:11}}>{IC.upload} Change Photo</Btn>
                <Btn v="danger" s={{fontSize:11}}>Remove</Btn>
              </div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <Inp label="Full Name" value={profName} onChange={setProfName}/>
            <Inp label="Email" value={profEmail} onChange={setProfEmail}/>
            <Inp label="Phone" value={profPhone} onChange={setProfPhone}/>
            <Sel label="Role" value={profRole} onChange={setProfRole} opts={["Owner","Admin","Sales Manager","Sales Associate","Finance Manager"]}/>
          </div>
        </Card>
        <Btn v="primary" onClick={save}>{IC.save} Save Profile</Btn>
      </>);

      case "security": return(<>
        <Card title="Change Password" desc="Update your account password">
          <div style={{display:"flex",flexDirection:"column",gap:12,maxWidth:400}}>
            <Inp label="Current Password" value={curPass} onChange={setCurPass} type="password" ph="••••••••"/>
            <Inp label="New Password" value={newPass} onChange={setNewPass} type="password" ph="••••••••"/>
            <Inp label="Confirm New Password" value={confPass} onChange={setConfPass} type="password" ph="••••••••"/>
            {newPass&&confPass&&newPass!==confPass&&<div style={{fontSize:11,color:t.red}}>Passwords do not match</div>}
          </div>
          <div style={{marginTop:14}}><Btn v="primary" onClick={()=>{setCurPass("");setNewPass("");setConfPass("");save()}} disabled={!curPass||!newPass||newPass!==confPass}>{IC.lock} Update Password</Btn></div>
        </Card>
        <Card title="Two-Factor Authentication">
          <Toggle on={twoFA} onToggle={()=>setTwoFA(!twoFA)} label="Enable 2FA" desc="Add an extra layer of security to your account"/>
          {twoFA&&<div style={{marginTop:10,padding:"12px 14px",background:t.grnD,borderRadius:8,border:`1px solid rgba(52,211,153,0.15)`,fontSize:12,color:t.grn,display:"flex",alignItems:"center",gap:6}}>{IC.shield} Two-factor authentication is enabled</div>}
        </Card>
        <Card title="Session Settings">
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <Sel label="Auto-logout after inactivity" value={sessionTimeout} onChange={setSessionTimeout} opts={["15","30","60","120","Never"]} s={{width:200}}/>
            <span style={{fontSize:11,color:t.tx3,marginTop:18}}>minutes</span>
          </div>
        </Card>
        <Card title="Active Sessions">
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[{device:"Chrome on Windows",ip:"192.168.1.45",time:"Active now",current:true},{device:"Safari on iPhone",ip:"192.168.1.22",time:"2 hours ago",current:false}].map((s,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:t.sf2,borderRadius:8,border:`1px solid ${s.current?t.grn+"30":t.bdr}`}}>
                <div><div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{s.device}{s.current&&<span style={{marginLeft:6,padding:"1px 6px",borderRadius:4,fontSize:9.5,background:t.grnD,color:t.grn,fontWeight:500}}>Current</span>}</div><div style={{fontSize:10.5,color:t.tx3}}>{s.ip} · {s.time}</div></div>
                {!s.current&&<Btn v="danger" s={{fontSize:10.5,padding:"4px 10px"}}>Revoke</Btn>}
              </div>
            ))}
          </div>
        </Card>
      </>);

      case "data": return(<>
        <Card title="Export Data" desc="Download your dealership data in CSV or PDF format">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            {[["Inventory","32 vehicles","CSV"],["Sales History","15 records","CSV"],["Customers","15 contacts","CSV"],["Expenses","20 records","CSV"],["Financial Report","Full summary","PDF"],["All Data","Complete backup","ZIP"]].map(([n,d,f])=>(
              <div key={n} style={{padding:"14px 16px",background:t.sf2,borderRadius:10,border:`1px solid ${t.bdr}`,cursor:"pointer",transition:"all .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=t.acc} onMouseLeave={e=>e.currentTarget.style.borderColor=t.bdr}>
                <div style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{n}</div>
                <div style={{fontSize:10.5,color:t.tx3,marginTop:2}}>{d}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
                  <span style={{padding:"2px 7px",borderRadius:4,fontSize:10,background:t.accD,color:t.acc,fontWeight:500}}>{f}</span>
                  <span style={{color:t.acc,display:"flex"}}>{IC.dl}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Backup & Restore" desc="Create backups of your data or restore from a previous backup">
          <div style={{display:"flex",gap:10,marginBottom:14}}>
            <Btn v="primary" onClick={save}>{IC.save} Create Backup Now</Btn>
            <Btn>{IC.upload} Restore from Backup</Btn>
          </div>
          <div style={{fontSize:11,fontWeight:500,color:t.tx2,marginBottom:8}}>Recent Backups</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {[{date:"Mar 2, 2026 · 12:00 AM",size:"24.3 MB",type:"Automatic"},{date:"Feb 23, 2026 · 12:00 AM",size:"23.8 MB",type:"Automatic"},{date:"Feb 15, 2026 · 3:30 PM",size:"23.1 MB",type:"Manual"}].map((b,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:t.sf2,borderRadius:8,border:`1px solid ${t.bdr}`}}>
                <div><div style={{fontSize:12,fontWeight:500,color:t.tx}}>{b.date}</div><div style={{fontSize:10.5,color:t.tx3}}>{b.size} · {b.type}</div></div>
                <div style={{display:"flex",gap:4}}>
                  <Btn s={{fontSize:10.5,padding:"4px 10px"}}>{IC.dl} Download</Btn>
                  <Btn s={{fontSize:10.5,padding:"4px 10px"}}>Restore</Btn>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Danger Zone" desc="These actions are irreversible">
          <div style={{display:"flex",gap:10}}>
            <Btn v="danger">{IC.trash} Reset Demo Data</Btn>
            <Btn v="danger">{IC.trash} Clear All Data</Btn>
          </div>
          <div style={{fontSize:10.5,color:t.red,marginTop:8}}>Warning: Clearing all data will permanently delete all vehicles, sales, customers, expenses, and documents.</div>
        </Card>
      </>);

      case "audit": return(<>
        <Card title="Activity Log" desc="Recent actions performed in the system">
          <div style={{display:"flex",flexDirection:"column",gap:0}}>
            {AUDIT_LOG.map((entry,i)=>(
              <div key={entry.id} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:i<AUDIT_LOG.length-1?`1px solid ${t.bdr}`:"none"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:entry.color,marginTop:5,flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:4}}>
                    <div>
                      <span style={{fontSize:12.5,fontWeight:500,color:t.tx}}>{entry.action}</span>
                      <div style={{fontSize:11.5,color:t.tx2,marginTop:2}}>{entry.detail}</div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:10.5,color:t.tx3}}>{entry.time}</div>
                      <div style={{fontSize:10,color:t.tx3,display:"flex",alignItems:"center",gap:3,justifyContent:"flex-end",marginTop:2}}>{IC.user} {entry.user}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </>);

      case "about": return(<>
        <Card title="AutoDealer Pro">
          <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:18}}>
            <div style={{width:56,height:56,borderRadius:12,background:`linear-gradient(135deg,${t.acc},#818cf8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700,color:"#fff"}}>AD</div>
            <div>
              <div style={{fontSize:18,fontWeight:600,color:t.tx}}>AutoDealer Pro</div>
              <div style={{fontSize:12,color:t.tx3}}>Dealership Management System</div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[["Version","2.0.0 (Build 2026.03)"],["License","Professional"],["Last Updated","March 5, 2026"],["Environment","Production"]].map(([l,v])=>(
              <div key={l} style={{padding:"10px 12px",background:t.sf2,borderRadius:8,border:`1px solid ${t.bdr}`}}>
                <div style={{fontSize:10,color:t.tx3,textTransform:"uppercase",letterSpacing:".05em"}}>{l}</div>
                <div style={{fontSize:13,fontWeight:500,color:t.tx,marginTop:2}}>{v}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Support & Contact">
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[["Support Email","support@autodealer.pro"],["Phone","1-800-AUTO-PRO (1-800-288-6776)"],["Documentation","docs.autodealer.pro"],["Status Page","status.autodealer.pro"]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${t.bdr}`}}>
                <span style={{fontSize:12,color:t.tx2}}>{l}</span>
                <span style={{fontSize:12.5,fontWeight:500,color:t.acc}}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="System Info">
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {[["Database","PostgreSQL 16.1"],["Frontend","React 18.2"],["Backend","Django 5.0"],["Hosting","AWS us-east-1"],["Storage","42.7 MB / 10 GB used"]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"6px 0"}}>
                <span style={{fontSize:11.5,color:t.tx3}}>{l}</span>
                <span style={{fontSize:11.5,color:t.tx2}}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </>);

      default: return null;
    }
  };

  return(
    <div style={{minHeight:"100vh",background:t.bg,color:t.tx,fontFamily:"'Outfit',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${t.bdr};border-radius:3px}body{font-family:'Outfit',sans-serif;background:${t.bg}}input::placeholder{color:${t.tx3}}`}</style>

      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 24px",borderBottom:`1px solid ${t.bdr}`,background:t.sf,position:"sticky",top:0,zIndex:20}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${t.acc},#818cf8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>AD</div>
          <h1 style={{fontSize:17,fontWeight:600,letterSpacing:"-.02em",margin:0}}>Settings</h1>
        </div>
      </header>

      <div style={{display:"flex",minHeight:"calc(100vh - 57px)"}}>
        {/* SIDEBAR NAV */}
        <nav style={{width:210,borderRight:`1px solid ${t.bdr}`,padding:"14px 8px",background:t.sf,flexShrink:0}}>
          {SECTIONS.map(s=>{const active=section===s.id;return(
            <button key={s.id} onClick={()=>setSection(s.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 13px",borderRadius:9,border:"none",cursor:"pointer",background:active?t.accD:"transparent",color:active?t.acc:t.tx2,fontSize:12.5,fontWeight:active?500:400,fontFamily:"'Outfit',sans-serif",transition:"all .15s",marginBottom:2}}>
              <span style={{display:"flex"}}>{IC[s.icon]}</span>{s.label}
            </button>
          )})}
        </nav>

        {/* CONTENT */}
        <div style={{flex:1,padding:"22px 28px",maxWidth:720,overflow:"auto"}}>
          <div style={{fontSize:18,fontWeight:600,color:t.tx,marginBottom:4}}>{SECTIONS.find(s=>s.id===section)?.label}</div>
          <div style={{fontSize:11.5,color:t.tx3,marginBottom:18}}>
            {{general:"Manage your dealership information and business settings",app:"Configure application features and preferences",profile:"Your personal account information",security:"Password, authentication, and session settings",data:"Export, backup, and manage your data",audit:"View recent system activity and changes",about:"Application information and support"}[section]}
          </div>
          {renderSection()}
        </div>
      </div>

      <SaveToast show={saved}/>
    </div>
  );
}
