import"./shared-DXXhQe6d.js";/* empty css               */SevenC.ensureDemo();const t=SevenC.getUser();if(!t)throw location.href="record.html",new Error("no user");document.getElementById("ms-name").textContent=t.name;document.getElementById("bp-email").textContent=t.email;document.getElementById("ms-iss").textContent=new Intl.DateTimeFormat("en-GB",{day:"2-digit",month:"short",year:"2-digit",timeZone:"Europe/Madrid"}).format(new Date(t.joined)).toUpperCase();startClock(document.getElementById("ms-time"),"Europe/Madrid","BCN · ");const n=SevenC.getArchive();document.getElementById("stat-count").textContent=String(n.length).padStart(2,"0");const a=document.getElementById("rows");a.innerHTML=n.map((e,o)=>`
    <a href="garment.html?no=${encodeURIComponent(e.no)}" class="record-row">
      <div class="no">${String(o+1).padStart(2,"0")}</div>
      <div class="g-block">
        <div class="g-sil"><img src="${e.img||"assets/aviatorjacket.jpeg"}" alt="${e.name}" loading="lazy"></div>
        <div class="g-meta">
          <div class="name">${e.name}</div>
          <div class="cat">${e.cat} · ${e.no}</div>
        </div>
      </div>
      <div class="arr"></div>
    </a>
  `).join("");document.getElementById("signout").addEventListener("click",e=>{e.preventDefault(),confirm("SIGN OUT OF 7C ARCHIVE?")&&(localStorage.clear(),location.href="index.html")});
