import"./shared-D79tJYRG.js";/* empty css               */SevenC.ensureDemo();const t=SevenC.getUser();if(!t)throw location.href="record.html",new Error("no user");const n={jacket:'<svg viewBox="0 0 100 130" fill="none" stroke="currentColor" stroke-width=".6"><path d="M30 25 L20 50 L22 120 L78 120 L80 50 L70 25 L60 18 L55 22 L50 25 L45 22 L40 18 Z"/><path d="M50 25 L50 120"/></svg>',pants:'<svg viewBox="0 0 100 140" fill="none" stroke="currentColor" stroke-width=".6"><path d="M30 10 L30 130 L46 130 L50 60 L54 130 L70 130 L70 10 Z"/></svg>',knit:'<svg viewBox="0 0 100 120" fill="none" stroke="currentColor" stroke-width=".6"><path d="M28 22 L20 50 L28 55 L28 112 L72 112 L72 55 L80 50 L72 22 L58 18 L50 24 L42 18 Z"/></svg>'};document.getElementById("ms-name").textContent=t.name;document.getElementById("bp-email").textContent=t.email;document.getElementById("ms-iss").textContent=new Intl.DateTimeFormat("en-GB",{day:"2-digit",month:"short",year:"2-digit",timeZone:"Europe/Madrid"}).format(new Date(t.joined)).toUpperCase();startClock(document.getElementById("ms-time"),"Europe/Madrid","BCN · ");const o=SevenC.getArchive();document.getElementById("stat-count").textContent=String(o.length).padStart(2,"0");const i=document.getElementById("rows");i.innerHTML=o.map((e,r)=>`
    <a href="garment.html?no=${encodeURIComponent(e.no)}" class="record-row">
      <div class="no">${String(r+1).padStart(2,"0")}</div>
      <div class="g-block">
        <div class="g-sil">${n[e.silhouette]||n.jacket}</div>
        <div class="g-meta">
          <div class="name">${e.name}</div>
          <div class="cat">${e.cat} · ${e.no}</div>
        </div>
      </div>
      <div class="arr"></div>
    </a>
  `).join("");document.getElementById("signout").addEventListener("click",e=>{e.preventDefault(),confirm("SIGN OUT OF 7C ARCHIVE?")&&(localStorage.clear(),location.href="index.html")});
