import { useState, lazy, Suspense } from "react";

const pages = {
  dashboard: lazy(() => import("./pages/Dashboard")),
  inventory: lazy(() => import("./pages/Inventory")),
  sales: lazy(() => import("./pages/Sales")),
  customers: lazy(() => import("./pages/Customers")),
  expenses: lazy(() => import("./pages/Expenses")),
  employees: lazy(() => import("./pages/Employees")),
  locations: lazy(() => import("./pages/Locations")),
  documents: lazy(() => import("./pages/Documents")),
  settings: lazy(() => import("./pages/Settings")),
};

const T={bg:"#07070a",sf:"#0e0e13",bdr:"#1d1d26",tx:"#ededf0",tx2:"#888894",tx3:"#50505c",acc:"#5b8def",accD:"rgba(91,141,239,0.1)",grn:"#34d399",ov:"rgba(0,0,0,0.75)"};

const IC={
  grid:<svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  car:<svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17v1a1 1 0 001 1h1a1 1 0 001-1v-1m10 0v1a1 1 0 001 1h1a1 1 0 001-1v-1"/><circle cx="7.5" cy="14" r="1.5"/><circle cx="16.5" cy="14" r="1.5"/></svg>,
  trend:<svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  users:<svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  receipt:<svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2z"/><path d="M8 10h8M8 14h4"/></svg>,
  badge:<svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><circle cx="9" cy="15" r="2"/></svg>,
  mapPin:<svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  file:<svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  gear:<svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  menu:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
};

const NAV=[
  {id:"dashboard",label:"Dashboard",icon:"grid"},
  {id:"inventory",label:"Inventory",icon:"car"},
  {id:"sales",label:"Sales",icon:"trend"},
  {id:"customers",label:"Customers",icon:"users"},
  {id:"expenses",label:"Expenses",icon:"receipt"},
  {id:"employees",label:"Employees",icon:"badge"},
  {id:"locations",label:"Locations",icon:"mapPin"},
  {id:"documents",label:"Documents",icon:"file"},
  {id:"settings",label:"Settings",icon:"gear"},
];

const Loading=()=><div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:T.tx3,fontSize:13}}>Loading...</div>;

export default function App(){
  const[page,setPage]=useState("dashboard");
  const[collapsed,setCollapsed]=useState(false);
  const[mobileNav,setMobileNav]=useState(false);
  const sw=collapsed?62:220;
  const PageComp=pages[page]||pages.dashboard;

  return(
    <div style={{display:"flex",height:"100vh",width:"100vw",background:T.bg,color:T.tx,fontFamily:"'Outfit',sans-serif",overflow:"hidden"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${T.bdr};border-radius:3px}body{font-family:'Outfit',sans-serif;background:${T.bg}}input::placeholder{color:${T.tx3}}@media(max-width:768px){.sidebar-d{display:none!important}.mob-toggle{display:flex!important}}@media(min-width:769px){.mob-toggle{display:none!important}.mob-ov{display:none!important}}`}</style>

      <aside className="sidebar-d" style={{width:sw,minWidth:sw,height:"100%",background:T.sf,borderRight:`1px solid ${T.bdr}`,display:"flex",flexDirection:"column",transition:"width .3s,min-width .3s",overflow:"hidden",zIndex:10}}>
        <div onClick={()=>setCollapsed(!collapsed)} style={{padding:collapsed?"16px 0":"16px 18px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${T.bdr}`,height:56,justifyContent:collapsed?"center":"flex-start",cursor:"pointer"}}>
          <div style={{width:30,height:30,borderRadius:8,background:`linear-gradient(135deg,${T.acc},#818cf8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff",flexShrink:0}}>AD</div>
          {!collapsed&&<div><div style={{fontSize:13.5,fontWeight:600,color:T.tx}}>AutoDealer</div><div style={{fontSize:9,color:T.tx3,letterSpacing:".05em"}}>PRO</div></div>}
        </div>
        <nav style={{padding:"10px 6px",flex:1,display:"flex",flexDirection:"column",gap:1}}>
          {NAV.map(item=>{const active=page===item.id;return(
            <button key={item.id} onClick={()=>setPage(item.id)} style={{display:"flex",alignItems:"center",gap:10,padding:collapsed?"9px 0":"9px 12px",justifyContent:collapsed?"center":"flex-start",borderRadius:8,border:"none",cursor:"pointer",width:"100%",background:active?T.accD:"transparent",color:active?T.acc:T.tx2,fontSize:12.5,fontWeight:active?500:400,transition:"all .15s",fontFamily:"'Outfit',sans-serif"}}>
              <span style={{flexShrink:0,display:"flex"}}>{IC[item.icon]}</span>
              {!collapsed&&<span>{item.label}</span>}
            </button>
          )})}
        </nav>
        <div style={{padding:collapsed?"14px 0":"14px 16px",borderTop:`1px solid ${T.bdr}`,display:"flex",alignItems:"center",gap:9,justifyContent:collapsed?"center":"flex-start"}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${T.grn},#059669)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:600,color:"#fff",flexShrink:0}}>JD</div>
          {!collapsed&&<div><div style={{fontSize:12,fontWeight:500,color:T.tx}}>John Dealer</div><div style={{fontSize:9.5,color:T.tx3}}>Owner</div></div>}
        </div>
      </aside>

      {mobileNav&&<div className="mob-ov" style={{position:"fixed",inset:0,zIndex:50}} onClick={()=>setMobileNav(false)}>
        <div style={{position:"absolute",inset:0,background:T.ov}}/>
        <aside onClick={e=>e.stopPropagation()} style={{width:250,height:"100%",background:T.sf,borderRight:`1px solid ${T.bdr}`,display:"flex",flexDirection:"column",position:"relative",zIndex:51}}>
          <div style={{padding:"16px 18px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${T.bdr}`,height:56}}>
            <div style={{width:30,height:30,borderRadius:8,background:`linear-gradient(135deg,${T.acc},#818cf8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff"}}>AD</div>
            <div><div style={{fontSize:13.5,fontWeight:600,color:T.tx}}>AutoDealer</div><div style={{fontSize:9,color:T.tx3}}>PRO</div></div>
          </div>
          <nav style={{padding:"10px 6px",flex:1,display:"flex",flexDirection:"column",gap:1}}>
            {NAV.map(item=>{const active=page===item.id;return(
              <button key={item.id} onClick={()=>{setPage(item.id);setMobileNav(false)}} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:8,border:"none",cursor:"pointer",width:"100%",background:active?T.accD:"transparent",color:active?T.acc:T.tx2,fontSize:12.5,fontWeight:active?500:400,fontFamily:"'Outfit',sans-serif"}}>
                <span style={{display:"flex"}}>{IC[item.icon]}</span><span>{item.label}</span>
              </button>
            )})}
          </nav>
        </aside>
      </div>}

      <main style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <header style={{height:56,display:"flex",alignItems:"center",padding:"0 22px",borderBottom:`1px solid ${T.bdr}`,background:T.sf,flexShrink:0}}>
          <button className="mob-toggle" onClick={()=>setMobileNav(true)} style={{background:"none",border:"none",cursor:"pointer",color:T.tx2,display:"none",alignItems:"center",marginRight:10}}>{IC.menu}</button>
          <h1 style={{fontSize:16,fontWeight:600,letterSpacing:"-.02em",margin:0}}>{NAV.find(n=>n.id===page)?.label||"Dashboard"}</h1>
        </header>
        <div style={{flex:1,overflow:"auto"}}>
          <Suspense fallback={<Loading/>}><PageComp/></Suspense>
        </div>
      </main>
    </div>
  );
}
