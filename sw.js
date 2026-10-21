const C='mis-cuentas-v5',A=['./','index.html','manifest.webmanifest','icon-180.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||!(u.origin===location.origin||/(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(u.hostname)))return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>{
    const n=fetch(e.request).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res}).catch(()=>r||caches.match('index.html'));
    return r||n;
  }));
});
