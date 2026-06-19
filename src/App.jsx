import { useState } from "react";
import {
  LayoutDashboard, Package, ShoppingBag, Bell,
  Sparkles, AlertTriangle, CheckCircle, Edit2, Save, X,
  Plus, RefreshCw, Eye, EyeOff, DollarSign,
  MessageCircle, TrendingUp, ChevronRight
} from "lucide-react";

const INIT_PRODUCTS = [
  { id:1,  name:"Toor Dal",              cat:"Dals & Pulses",     price:6.00,  stock:true,  views:142, orders:38, notifyCount:0  },
  { id:2,  name:"Moong Dal",             cat:"Dals & Pulses",     price:8.00,  stock:true,  views:98,  orders:12, notifyCount:0  },
  { id:3,  name:"Chana Dal",             cat:"Dals & Pulses",     price:6.00,  stock:true,  views:76,  orders:9,  notifyCount:0  },
  { id:4,  name:"Masoor Dal",            cat:"Dals & Pulses",     price:5.50,  stock:true,  views:54,  orders:7,  notifyCount:0  },
  { id:5,  name:"Aged Basmati Rice",     cat:"Rice",              price:13.00, stock:true,  views:201, orders:44, notifyCount:0  },
  { id:6,  name:"Ponni Boiled Rice",     cat:"Rice",              price:19.00, stock:true,  views:167, orders:31, notifyCount:0  },
  { id:7,  name:"Sonamasoori Rice",      cat:"Rice",              price:null,  stock:false, views:89,  orders:0,  notifyCount:23 },
  { id:8,  name:"Sorghum Millets",       cat:"Millets",           price:7.00,  stock:true,  views:43,  orders:5,  notifyCount:0  },
  { id:9,  name:"Pearl Millets (Bajra)", cat:"Millets",           price:10.00, stock:true,  views:38,  orders:3,  notifyCount:0  },
  { id:10, name:"Ashwagandha Powder",    cat:"Herbal & Wellness", price:15.50, stock:true,  views:312, orders:67, notifyCount:0  },
  { id:11, name:"Amla Fruit Powder",     cat:"Herbal & Wellness", price:13.50, stock:true,  views:278, orders:54, notifyCount:0  },
  { id:12, name:"Moringa Leaf Powder",   cat:"Herbal & Wellness", price:10.50, stock:true,  views:198, orders:41, notifyCount:0  },
  { id:13, name:"Mango Pickle",          cat:"Pickles",           price:null,  stock:false, views:134, orders:0,  notifyCount:41 },
  { id:14, name:"Gongura Pickle",        cat:"Pickles",           price:null,  stock:false, views:119, orders:0,  notifyCount:37 },
  { id:15, name:"Idli Karam Powder",     cat:"Podis",             price:null,  stock:false, views:88,  orders:0,  notifyCount:29 },
  { id:16, name:"Chakki Atta",           cat:"Flour",             price:null,  stock:true,  views:72,  orders:0,  notifyCount:0  },
  { id:17, name:"Turmeric Root Powder",  cat:"Herbal & Wellness", price:8.00,  stock:true,  views:156, orders:28, notifyCount:0  },
  { id:18, name:"Triphala Powder",       cat:"Herbal & Wellness", price:6.00,  stock:true,  views:122, orders:19, notifyCount:0  },
];

const ORDERS = [
  { id:"ORD-001", customer:"Priya S.",   items:"Ashwagandha, Amla Powder",     total:29.00, time:"2h ago", status:"confirmed" },
  { id:"ORD-002", customer:"Ravi K.",    items:"Toor Dal × 2, Basmati Rice",   total:25.00, time:"4h ago", status:"confirmed" },
  { id:"ORD-003", customer:"Meena T.",   items:"Moringa Powder, Turmeric",     total:18.50, time:"6h ago", status:"delivered" },
  { id:"ORD-004", customer:"Suresh P.",  items:"Ponni Rice, Chana Dal",        total:25.00, time:"1d ago", status:"delivered" },
  { id:"ORD-005", customer:"Lakshmi R.", items:"Gongura Pickle (pre-order)",   total:0,     time:"1d ago", status:"waiting"   },
];

const NOTIFY_LIST = [
  { product:"Mango Pickle",     count:41, topAsked:"Mon, Wed, Fri" },
  { product:"Gongura Pickle",   count:37, topAsked:"Tue, Thu"      },
  { product:"Idli Karam Powder",count:29, topAsked:"Daily"         },
  { product:"Sonamasoori Rice", count:23, topAsked:"Weekend"       },
  { product:"Finger Millets",   count:14, topAsked:"Mon–Wed"       },
  { product:"Hibiscus Powder",  count:11, topAsked:"Weekend"       },
];

const AI_INSIGHTS = [
  { type:"alert",  icon:AlertTriangle, color:"#dc2626", bg:"#fef2f2", border:"#fecaca",
    title:"41 customers waiting for Mango Pickle",
    body:"Stock Mango Pickle first — 41 signups. At avg $28/order that's ~$1,148 in week-1 revenue. Contact G Pulla Reddy supplier this week.",
    action:"View notify list →", tab:"notify" },
  { type:"alert",  icon:AlertTriangle, color:"#d97706", bg:"#fffbeb", border:"#fde68a",
    title:"Chakki Atta has no price — customers can't order it",
    body:"Royal Chakki Atta is listed In Stock but has no price set. Add a price to unlock orders immediately.",
    action:"Edit product →", tab:"products" },
  { type:"alert",  icon:AlertTriangle, color:"#dc2626", bg:"#fef2f2", border:"#fecaca",
    title:"Sonamasoori Rice: 23 waiting but it's already in stock",
    body:"You have Royal Organic Sonamasoori in inventory but it's showing Coming Soon. Flip it live and WhatsApp the 23 waiting customers now.",
    action:"Edit product →", tab:"products" },
  { type:"insight", icon:TrendingUp, color:"#16a34a", bg:"#f0fdf4", border:"#bbf7d0",
    title:"Herbal & Wellness is your #1 category",
    body:"Ashwagandha (67 orders), Amla (54), Moringa (41) are your top 3. Customers who buy one wellness item typically buy 2–3 more. Expand this range.",
    action:null },
  { type:"insight", icon:TrendingUp, color:"#7c3aed", bg:"#faf5ff", border:"#ddd6fe",
    title:"Millets converting poorly — 11% vs 30% site average",
    body:"Sorghum (43 views, 5 orders) and Bajra (38 views, 3 orders) are underperforming. Try adding a short recipe tip on the product card to help customers understand how to cook them.",
    action:null },
  { type:"insight", icon:CheckCircle, color:"#0891b2", bg:"#f0f9ff", border:"#bae6fd",
    title:"Bundle opportunity: Dal + Rice combo could lift avg order 15%",
    body:"38 bought Toor Dal, 44 bought Basmati — but only 12 bought both. A Dal-Chawal Bundle at $17.50 (saving $1.50) is an easy upsell.",
    action:null },
];

const STATUS = {
  confirmed:{ bg:"#dcfce7", color:"#166534", label:"Confirmed" },
  delivered:{ bg:"#dbeafe", color:"#1e40af", label:"Delivered" },
  waiting:  { bg:"#fef9c3", color:"#854d0e", label:"Waiting"   },
};

const NAV = [
  { id:"dashboard", label:"Home",     icon:LayoutDashboard },
  { id:"products",  label:"Products", icon:Package          },
  { id:"orders",    label:"Orders",   icon:ShoppingBag      },
  { id:"notify",    label:"Notify",   icon:Bell             },
  { id:"ai",        label:"AI",       icon:Sparkles         },
];

export default function App() {
  const [tab, setTab]       = useState("dashboard");
  const [products, setProducts] = useState(INIT_PRODUCTS);
  const [editing, setEditing]   = useState(null);
  const [editVal, setEditVal]   = useState({});
  const [saved, setSaved]       = useState(null);
  const [aiQ, setAiQ]           = useState("");
  const [aiA, setAiA]           = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAsked, setAiAsked]   = useState(false);

  const totalRevenue = ORDERS.filter(o=>o.status!=="waiting").reduce((s,o)=>s+o.total,0);
  const totalOrders  = ORDERS.filter(o=>o.status!=="waiting").length;
  const totalNotify  = NOTIFY_LIST.reduce((s,n)=>s+n.count,0);
  const noPriceCount = products.filter(p=>p.price==null&&p.stock).length;

  const startEdit = p => { setEditing(p.id); setEditVal({name:p.name,price:p.price??'',stock:p.stock,cat:p.cat}); };
  const cancelEdit = () => { setEditing(null); setEditVal({}); };
  const saveEdit = id => {
    setProducts(ps=>ps.map(p=>p.id===id?{...p,name:editVal.name,price:editVal.price===''?null:parseFloat(editVal.price),stock:editVal.stock,cat:editVal.cat}:p));
    setEditing(null); setSaved(id); setTimeout(()=>setSaved(null),2000);
  };
  const toggleStock = id => setProducts(ps=>ps.map(p=>p.id===id?{...p,stock:!p.stock}:p));

  const askAI = async () => {
    if (!aiQ.trim()) return;
    setAiLoading(true); setAiAsked(true); setAiA("");
    try {
      const ctx = `Exotik-Desi LLC, Monmouth Junction NJ. Indian grocery, WhatsApp orders.
Top products: Ashwagandha (67 orders), Amla (54), Moringa (41), Basmati Rice (44), Toor Dal (38).
Notify-me waitlist: Mango Pickle (41), Gongura Pickle (37), Idli Karam (29), Sonamasoori Rice (23).
No price set: Chakki Atta. Weekly revenue: $97.50.`;
      const r = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-6", max_tokens:1000,
          system:`You are a business advisor for a small Indian grocery store. Give specific, actionable advice in 3-5 sentences using real product names and numbers from their data. Store data: ${ctx}`,
          messages:[{role:"user",content:aiQ}]
        })
      });
      const d = await r.json();
      setAiA(d.content?.map(c=>c.text||"").join("")||"No response.");
    } catch { setAiA("Could not connect. Try again."); }
    setAiLoading(false);
  };

  const SUGGESTIONS = ["Which products should I restock first?","Why are millets not selling?","What bundle deals should I create?","How do I grow revenue this month?"];

  return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",background:"#f8f7f4",fontFamily:"'Inter',system-ui,sans-serif",fontSize:14,maxWidth:480,margin:"0 auto",position:"relative"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        button{font-family:inherit;cursor:pointer;}
        input,select{font-family:inherit;}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>

      {/* ── TOP BAR ── */}
      <div style={{background:"#1c1917",padding:"14px 16px 12px",position:"sticky",top:0,zIndex:30,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontFamily:"Fraunces,serif",fontWeight:700,fontSize:17,color:"#fef3c7"}}>Exotik-Desi</div>
          <div style={{fontSize:10,color:"#78716c",letterSpacing:2,textTransform:"uppercase"}}>Admin</div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {noPriceCount>0&&<span style={{background:"#dc2626",color:"#fff",borderRadius:999,fontSize:10,fontWeight:700,padding:"3px 8px"}}>{noPriceCount} issues</span>}
          <span style={{background:"#7c3aed",color:"#fff",borderRadius:999,fontSize:10,fontWeight:700,padding:"3px 8px"}}>AI LIVE</span>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{flex:1,overflowY:"auto",padding:"16px 14px 80px"}}>

        {/* DASHBOARD */}
        {tab==="dashboard"&&(
          <div>
            <div style={{fontFamily:"Fraunces,serif",fontWeight:700,fontSize:20,marginBottom:4}}>Good morning 👋</div>
            <div style={{color:"#78716c",fontSize:13,marginBottom:16}}>Here's how the store is doing today.</div>

            {/* Stats 2x2 */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
              {[
                {label:"Revenue this week", val:`$${totalRevenue.toFixed(2)}`, icon:DollarSign, color:"#16a34a", bg:"#f0fdf4"},
                {label:"Orders placed",     val:totalOrders,                   icon:ShoppingBag, color:"#2563eb", bg:"#eff6ff"},
                {label:"Notify-me signups", val:totalNotify,                   icon:Bell,        color:"#d97706", bg:"#fffbeb"},
                {label:"Missing prices",    val:noPriceCount,                  icon:AlertTriangle,color:"#dc2626",bg:"#fef2f2"},
              ].map(s=>(
                <div key={s.label} style={{background:"#fff",border:"1px solid #e8e3da",borderRadius:12,padding:"14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:8}}>
                    <div style={{fontSize:11,color:"#78716c",fontWeight:500,lineHeight:1.3}}>{s.label}</div>
                    <div style={{width:28,height:28,borderRadius:7,background:s.bg,display:"grid",placeItems:"center",flexShrink:0}}>
                      <s.icon size={14} color={s.color}/>
                    </div>
                  </div>
                  <div style={{fontFamily:"Fraunces,serif",fontWeight:700,fontSize:24,color:"#1c1917"}}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* AI Alert */}
            <div onClick={()=>setTab("ai")} style={{background:"linear-gradient(90deg,#7c2d12,#c2410c)",borderRadius:12,padding:"14px 16px",marginBottom:16,cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
              <Sparkles size={18} color="#fde68a" style={{flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{color:"#fff",fontWeight:600,fontSize:13}}>AI found {AI_INSIGHTS.filter(i=>i.type==="alert").length} issues in your store</div>
                <div style={{color:"#fca5a5",fontSize:11,marginTop:2}}>Missing prices · High-demand out-of-stock · Low-converting products</div>
              </div>
              <ChevronRight size={16} color="#fca5a5"/>
            </div>

            {/* Recent orders */}
            <div style={{background:"#fff",border:"1px solid #e8e3da",borderRadius:12,overflow:"hidden"}}>
              <div style={{padding:"12px 14px",borderBottom:"1px solid #f0ece4",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontWeight:600}}>Recent orders</div>
                <button onClick={()=>setTab("orders")} style={{background:"none",border:"none",color:"#c2410c",fontWeight:600,fontSize:12}}>View all →</button>
              </div>
              {ORDERS.slice(0,4).map(o=>(
                <div key={o.id} style={{padding:"12px 14px",borderBottom:"1px solid #f0ece4"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:4}}>
                    <div style={{fontWeight:600,fontSize:13}}>{o.customer}</div>
                    <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:999,background:STATUS[o.status].bg,color:STATUS[o.status].color}}>{STATUS[o.status].label}</span>
                  </div>
                  <div style={{fontSize:12,color:"#78716c"}}>{o.items}</div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                    <span style={{fontSize:11,color:"#a8a29e"}}>{o.time} via WhatsApp</span>
                    <span style={{fontWeight:700,fontSize:13}}>{o.total>0?`$${o.total.toFixed(2)}`:"Pre-order"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {tab==="products"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div>
                <div style={{fontFamily:"Fraunces,serif",fontWeight:700,fontSize:20}}>Products</div>
                <div style={{color:"#78716c",fontSize:12,marginTop:2}}>{products.length} total · {noPriceCount} need prices</div>
              </div>
              <button style={{background:"#7c2d12",color:"#fff",border:"none",borderRadius:9,padding:"8px 14px",fontWeight:600,fontSize:12,display:"flex",alignItems:"center",gap:5}}>
                <Plus size={13}/> Add
              </button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {products.map(p=>(
                <div key={p.id} style={{background:"#fff",border:"1px solid #e8e3da",borderRadius:12,overflow:"hidden"}}>
                  {editing===p.id?(
                    <div style={{padding:"14px"}}>
                      <div style={{fontSize:11,fontWeight:600,color:"#78716c",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Editing</div>
                      <input value={editVal.name} onChange={e=>setEditVal(v=>({...v,name:e.target.value}))}
                        style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #d4cfc6",fontSize:13,marginBottom:8}}/>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                        <div>
                          <div style={{fontSize:11,color:"#78716c",marginBottom:4}}>Price ($)</div>
                          <input value={editVal.price} onChange={e=>setEditVal(v=>({...v,price:e.target.value}))}
                            placeholder="e.g. 6.00" type="number" step="0.50"
                            style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #d4cfc6",fontSize:13}}/>
                        </div>
                        <div>
                          <div style={{fontSize:11,color:"#78716c",marginBottom:4}}>Category</div>
                          <select value={editVal.cat} onChange={e=>setEditVal(v=>({...v,cat:e.target.value}))}
                            style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #d4cfc6",fontSize:12}}>
                            {["Dals & Pulses","Rice","Millets","Pickles","Podis","Herbal & Wellness","Flour"].map(c=><option key={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                      <label style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,cursor:"pointer",fontSize:13}}>
                        <input type="checkbox" checked={editVal.stock} onChange={e=>setEditVal(v=>({...v,stock:e.target.checked}))}/>
                        In stock (visible to customers)
                      </label>
                      <div style={{display:"flex",gap:8}}>
                        <button onClick={()=>saveEdit(p.id)} style={{flex:1,background:"#16a34a",color:"#fff",border:"none",borderRadius:8,padding:"10px",fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                          <Save size={13}/> Save changes
                        </button>
                        <button onClick={cancelEdit} style={{background:"#f0ece4",color:"#57534e",border:"none",borderRadius:8,padding:"10px 14px"}}>
                          <X size={14}/>
                        </button>
                      </div>
                    </div>
                  ):(
                    <div style={{padding:"13px 14px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:4}}>
                        <div style={{flex:1,marginRight:8}}>
                          <span style={{fontWeight:600,fontSize:13}}>{p.name}</span>
                          {!p.stock&&<span style={{marginLeft:6,fontSize:9,fontWeight:700,background:"#fef9c3",color:"#854d0e",padding:"2px 6px",borderRadius:999}}>OUT</span>}
                          {p.stock&&p.price==null&&<span style={{marginLeft:6,fontSize:9,fontWeight:700,background:"#fee2e2",color:"#dc2626",padding:"2px 6px",borderRadius:999}}>NO PRICE</span>}
                          {saved===p.id&&<span style={{marginLeft:6,fontSize:9,fontWeight:700,background:"#dcfce7",color:"#166534",padding:"2px 6px",borderRadius:999}}>✓ Saved</span>}
                        </div>
                        <span style={{fontFamily:"Fraunces,serif",fontWeight:700,fontSize:16,flexShrink:0,color:p.price==null?"#dc2626":"#1c1917"}}>
                          {p.price!=null?`$${p.price.toFixed(2)}`:"—"}
                        </span>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6}}>
                        <div style={{fontSize:11,color:"#a8a29e"}}>{p.cat} · {p.views} views · <span style={{color:p.orders>20?"#16a34a":"inherit",fontWeight:p.orders>20?600:400}}>{p.orders} orders</span></div>
                        <div style={{display:"flex",gap:6}}>
                          <button onClick={()=>startEdit(p)} style={{background:"#f0ece4",border:"none",borderRadius:7,padding:"6px 8px",color:"#57534e",display:"flex",alignItems:"center"}}>
                            <Edit2 size={12}/>
                          </button>
                          <button onClick={()=>toggleStock(p.id)} style={{background:p.stock?"#fef9c3":"#dcfce7",border:"none",borderRadius:7,padding:"6px 8px",color:p.stock?"#854d0e":"#166534",display:"flex",alignItems:"center"}}>
                            {p.stock?<EyeOff size={12}/>:<Eye size={12}/>}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab==="orders"&&(
          <div>
            <div style={{fontFamily:"Fraunces,serif",fontWeight:700,fontSize:20,marginBottom:4}}>Orders</div>
            <div style={{color:"#78716c",fontSize:12,marginBottom:16}}>All orders via WhatsApp</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {ORDERS.map(o=>(
                <div key={o.id} style={{background:"#fff",border:"1px solid #e8e3da",borderRadius:12,padding:"14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <div style={{fontWeight:600,fontSize:13}}>{o.customer}</div>
                    <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:999,background:STATUS[o.status].bg,color:STATUS[o.status].color}}>{STATUS[o.status].label}</span>
                  </div>
                  <div style={{fontSize:12,color:"#78716c",marginBottom:6}}>{o.items}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:11,color:"#a8a29e"}}>{o.id} · {o.time}</span>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontWeight:700}}>{o.total>0?`$${o.total.toFixed(2)}`:"Pre-order"}</span>
                      <button style={{background:"#16a34a",color:"#fff",border:"none",borderRadius:7,padding:"5px 10px",fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:4}}>
                        <MessageCircle size={11}/> Chat
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NOTIFY */}
        {tab==="notify"&&(
          <div>
            <div style={{fontFamily:"Fraunces,serif",fontWeight:700,fontSize:20,marginBottom:4}}>Notify-me List</div>
            <div style={{color:"#78716c",fontSize:12,marginBottom:12}}>{totalNotify} customers waiting</div>
            <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:12,padding:"12px 14px",marginBottom:14,display:"flex",gap:10,alignItems:"start"}}>
              <AlertTriangle size={16} color="#d97706" style={{flexShrink:0,marginTop:1}}/>
              <div style={{fontSize:12,color:"#92400e",lineHeight:1.5}}>
                <b>These are real customers ready to buy.</b> Stock Mango + Gongura Pickle first — 78 combined signups. WhatsApp them the moment stock arrives.
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {NOTIFY_LIST.sort((a,b)=>b.count-a.count).map(n=>(
                <div key={n.product} style={{background:"#fff",border:"1px solid #e8e3da",borderRadius:12,padding:"14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:4}}>
                    <div>
                      <div style={{fontWeight:600,fontSize:13}}>{n.product}</div>
                      <div style={{fontSize:11,color:"#a8a29e",marginTop:2}}>Most requested: {n.topAsked}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"Fraunces,serif",fontWeight:700,fontSize:22,color:"#c2410c"}}>{n.count}</div>
                      <div style={{fontSize:10,color:"#a8a29e"}}>waiting</div>
                    </div>
                  </div>
                  <button style={{width:"100%",marginTop:8,background:"#16a34a",color:"#fff",border:"none",borderRadius:8,padding:"9px",fontWeight:600,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                    <MessageCircle size={13}/> WhatsApp all {n.count} customers
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI INSIGHTS */}
        {tab==="ai"&&(
          <div>
            <div style={{fontFamily:"Fraunces,serif",fontWeight:700,fontSize:20,marginBottom:4}}>AI Insights</div>
            <div style={{color:"#78716c",fontSize:12,marginBottom:14}}>What's working, what's not, what to fix.</div>

            {/* Ask AI */}
            <div style={{background:"#1c1917",borderRadius:14,padding:"16px",marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <Sparkles size={15} color="#fde68a"/>
                <span style={{color:"#fef3c7",fontWeight:600,fontSize:13}}>Ask your store AI</span>
                <span style={{marginLeft:"auto",fontSize:9,fontWeight:700,background:"#7c3aed",color:"#fff",padding:"2px 7px",borderRadius:999}}>Claude AI</span>
              </div>
              <textarea
                value={aiQ} onChange={e=>setAiQ(e.target.value)}
                placeholder='e.g. "Which products should I restock first?"'
                rows={2}
                style={{width:"100%",padding:"10px 12px",borderRadius:9,border:"1px solid #44403c",background:"#292524",color:"#e7e5e4",fontSize:13,resize:"none",marginBottom:8}}
              />
              <button onClick={askAI} disabled={aiLoading} style={{
                width:"100%",background:"#c2410c",color:"#fff",border:"none",borderRadius:9,
                padding:"11px",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",
                justifyContent:"center",gap:7,opacity:aiLoading?0.7:1
              }}>
                {aiLoading?<RefreshCw size={14} style={{animation:"spin 1s linear infinite"}}/>:<Sparkles size={14}/>}
                {aiLoading?"Thinking…":"Get AI advice"}
              </button>
              {aiAsked&&(
                <div style={{marginTop:10,background:"#292524",borderRadius:10,padding:"12px",color:"#e7e5e4",fontSize:12,lineHeight:1.7,minHeight:50}}>
                  {aiLoading?<span style={{color:"#a8a29e"}}>Analysing your store data…</span>:aiA}
                </div>
              )}
              <div style={{marginTop:10,display:"flex",flexWrap:"wrap",gap:6}}>
                {SUGGESTIONS.map(s=>(
                  <button key={s} onClick={()=>setAiQ(s)}
                    style={{background:"#292524",border:"1px solid #44403c",color:"#a8a29e",borderRadius:999,padding:"4px 10px",fontSize:10}}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Insight cards */}
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {AI_INSIGHTS.map((ins,i)=>(
                <div key={i} style={{background:ins.bg,border:`1px solid ${ins.border}`,borderRadius:12,padding:"14px"}}>
                  <div style={{display:"flex",gap:10,alignItems:"start",marginBottom:6}}>
                    <div style={{width:30,height:30,borderRadius:8,background:"#fff",display:"grid",placeItems:"center",flexShrink:0}}>
                      <ins.icon size={15} color={ins.color}/>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:13,color:"#1c1917",marginBottom:4}}>{ins.title}</div>
                      <div style={{fontSize:12,color:"#57534e",lineHeight:1.6}}>{ins.body}</div>
                    </div>
                    <div style={{fontSize:10,fontWeight:700,color:ins.color,flexShrink:0}}>{ins.type==="alert"?"⚠ Fix":"💡"}</div>
                  </div>
                  {ins.action&&(
                    <button onClick={()=>ins.tab&&setTab(ins.tab)}
                      style={{background:"none",border:"none",color:ins.color,fontWeight:600,fontSize:12,padding:0,cursor:"pointer",marginTop:4}}>
                      {ins.action}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── BOTTOM NAV ── */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#fff",borderTop:"1px solid #e8e3da",display:"flex",zIndex:40}}>
        {NAV.map(n=>{
          const active = tab===n.id;
          const badge = n.id==="notify"?totalNotify:n.id==="ai"?AI_INSIGHTS.filter(i=>i.type==="alert").length:0;
          return (
            <button key={n.id} onClick={()=>setTab(n.id)} style={{
              flex:1,padding:"10px 4px 8px",border:"none",background:"transparent",
              display:"flex",flexDirection:"column",alignItems:"center",gap:3,
              color:active?"#7c2d12":"#a8a29e",position:"relative"
            }}>
              <div style={{position:"relative"}}>
                <n.icon size={20} strokeWidth={active?2.5:1.8}/>
                {badge>0&&<span style={{position:"absolute",top:-5,right:-6,background:"#ea580c",color:"#fff",borderRadius:999,fontSize:9,fontWeight:800,minWidth:16,height:16,display:"grid",placeItems:"center",padding:"0 3px"}}>{badge}</span>}
              </div>
              <span style={{fontSize:10,fontWeight:active?700:400}}>{n.label}</span>
              {active&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:24,height:2,background:"#7c2d12",borderRadius:1}}/>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
