// ===== SPORTSVIVA GAME SYSTEM V3 - আলাদা ফাইল =====
let selectedPlayers=4, selectedEntry=50, offlinePlayers=2, currentGame='LUDO', gameMode='online';
let userPoints=parseInt(localStorage.getItem('sv_points')||'1150');

function updatePoints(){let rp=document.querySelector('.rp b'); if(rp) rp.innerText=userPoints.toLocaleString();}
function openGame(type){currentGame=type; document.getElementById('gameTitle').innerText=type; document.getElementById('gameModal').style.display='flex'; calcPot();}
function closeGame(){document.getElementById('gameModal').style.display='none'}
function setMode(m){
  gameMode=m;
  document.querySelectorAll('.m-tab').forEach(e=>e.classList.remove('active'));
  document.getElementById(m=='online'?'modeOnline':m=='offline'?'modeOffline':'modeBt').classList.add('active');
  document.getElementById('onlineSection').style.display=m=='online'?'block':'none';
  document.getElementById('offlineSection').style.display=m=='offline'?'block':'none';
  document.getElementById('btSection').style.display=m=='bt'?'block':'none';
  document.getElementById('playBtn').innerText=m=='online'?`🎲 খেলা শুরু (${selectedEntry} পয়েন্ট)`:(m=='offline'?`🎮 অফলাইন খেলা শুরু (${offlinePlayers} জন)`:`📡 ব্লুটুথ খুঁজুন`);
}
function selectP(el,n){document.querySelectorAll('#onlineSection .p-opt').forEach(o=>o.classList.remove('active')); el.classList.add('active'); selectedPlayers=n; calcPot();}
function selOff(el,n){document.querySelectorAll('#offlineSection .p-opt').forEach(o=>o.classList.remove('active')); el.classList.add('active'); offlinePlayers=n;}
function selectE(el,v){document.querySelectorAll('.e-opt').forEach(o=>o.classList.remove('active')); el.classList.add('active'); selectedEntry=v; calcPot();}
function calcPot(){
  let total=selectedEntry*selectedPlayers; let winner=total-Math.floor(total*0.1);
  let info=document.getElementById('entryInfo');
  if(info) info.innerHTML=`💰 এন্ট্রি: <b>${selectedEntry}</b> x ${selectedPlayers}=${total} পয়েন্ট<br>🥇 উইনার: <b style="color:#facc15">${winner} পয়েন্ট</b> (≈ ${(winner/100*20)} টাকা)<br><span style="font-size:9px">📊 200x2=400 পট, উইনার 360 | 300x4=1200 পট, উইনার 1080</span>`;
  if(gameMode=='online'){let b=document.getElementById('playBtn'); if(b) b.innerText=`🎲 খেলা শুরু (${selectedEntry} পয়েন্ট কাটবে)`;}
}
function startGame(){
  if(gameMode=='offline'){alert('🎮 অফলাইন '+currentGame+' শুরু!\n\n👥 '+offlinePlayers+' জন এক মোবাইলে পালা করে খেলুন\n🎲 পয়েন্ট কাটবে না, শুধু মজা!'); closeGame(); return;}
  if(gameMode=='bt'){alert('📡 ব্লুটুথ মোড\n\n1. ব্লুটুথ অন করুন\n2. বন্ধুর ফোনে SportsViva ওপেন করুন\n3. কানেক্ট করুন\n\nনেট ছাড়া খেলা!'); closeGame(); return;}
  if(userPoints<selectedEntry){alert('❌ পয়েন্ট কম! আছে '+userPoints+', লাগবে '+selectedEntry); return;}
  userPoints-=selectedEntry; localStorage.setItem('sv_points',userPoints); updatePoints(); closeGame();
  let total=selectedEntry*selectedPlayers; let winner=total-Math.floor(total*0.1);
  setTimeout(()=>{
    if(Math.random()<0.48){
      userPoints+=winner; localStorage.setItem('sv_points',userPoints); updatePoints();
      alert('🎉 '+currentGame+' এ জিতেছেন!\n\n🏆 পেয়েছেন: '+winner+' পয়েন্ট\n💰 বর্তমান: '+userPoints+' পয়েন্ট\n\n💡 Shop থেকে কেনাকাটা করুন! 100 পয়েন্ট = 20 টাকা');
    }else{
      alert('😔 হেরে গেছেন!\n\n💰 এন্ট্রি '+selectedEntry+' কাটা হয়েছে\n🏦 বর্তমান: '+userPoints+'\n\nআবার চেষ্টা করুন!');
    }
  },600);
}
document.addEventListener('DOMContentLoaded',()=>{updatePoints(); let e=document.getElementById('entryInfo'); if(e) calcPot();
  document.querySelectorAll('.card').forEach(c=>{
    if(c.innerText.includes('LUDU')){c.style.cursor='pointer'; c.onclick=()=>openGame('LUDO');}
    if(c.innerText.includes('CARROM')){c.style.cursor='pointer'; c.onclick=()=>openGame('CARROM BOARD');}
  });
});
