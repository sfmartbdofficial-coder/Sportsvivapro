let selectedPlayers = 2;
let currentGame = '';

function openGame(name){
  currentGame = name;
  selectedPlayers = 2;
  document.getElementById('gameTitle').innerText = name;
  calcPot();
  document.getElementById('gameModal').style.display = 'flex';
  document.getElementById('gameModal').style.alignItems = 'center';
  document.getElementById('gameModal').style.justifyContent = 'center';
}

function closeGame(){
  document.getElementById('gameModal').style.display = 'none';
}

function selectP(el,num){
  document.querySelectorAll('.p-opt').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  selectedPlayers = num;
  calcPot();
}

function calcPot(){
  let entry = 50;
  let total = entry * selectedPlayers;
  let charge = Math.floor(total*0.1);
  let winner = total - charge;
  document.getElementById('entryInfo').innerHTML = `
    💰 এন্ট্রি: <b>${entry} পয়েন্ট</b> (প্রতি জন)<br>
    🏆 টোটাল পট: <b>${total} পয়েন্ট</b> (${selectedPlayers} জন)<br>
    🥇 উইনার পাবে: <b style="color:#facc15">${winner} পয়েন্ট</b><br>
    <span style="font-size:10px;color:#8fcf8f">10% চার্জ কাটা হবে</span>
  `;
}

function startGame(){
  let pointsEl = document.querySelector('[class*=\"Reward\"]') || document.getElementById('userPoints');
  let currentPoints = 1540; // আপনার পয়েন্ট
  let entry = 50;
  
  if(currentPoints < entry){
    alert('❌ পয়েন্ট কম আছে! আগে গেম খেলে পয়েন্ট জমান!');
    return;
  }

  // এখানে আসল গেম শুরু হবে
  closeGame();
  
  // সুন্দর লোডিং
  let loading = document.createElement('div');
  loading.id = 'gameLoading';
  loading.style = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:10000;display:flex;flex-direction:column;justify-content:center;align-items:center;color:white;';
  loading.innerHTML = `
    <div style="font-size:40px; margin-bottom:15px;">🎮</div>
    <div style="font-size:18px; font-weight:bold; color:#facc15;">${currentGame} শুরু হচ্ছে...</div>
    <div style="margin-top:10px;">${selectedPlayers} জন প্লেয়ার খুঁজছি...</div>
    <div style="margin-top:15px; width:80%; max-width:300px; height:6px; background:#374151; border-radius:10px; overflow:hidden;">
      <div id="progress" style="width:0%; height:100%; background:#facc15; transition:width 2s;"></div>
    </div>
  `;
  document.body.appendChild(loading);
  
  setTimeout(()=>{ document.getElementById('progress').style.width='100%'; },100);
  
  setTimeout(()=>{
    document.body.removeChild(loading);
    
    // এখানে আপনি আসল গেমের লিংক দিবেন
    // এখন ডেমো হিসেবে 3 সেকেন্ড পর জেতার মেসেজ দেখাবে
    
    if(confirm(`🎯 ${currentGame} খেলা শুরু করবেন?\n\n(এখন ডেমো চলছে, OK চাপলে 3 সেকেন্ড পর রেজাল্ট আসবে)`)){
      
      let playingDiv = document.createElement('div');
      playingDiv.style = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#111827;z-index:10000;display:flex;justify-content:center;align-items:center;flex-direction:column;color:white;';
      playingDiv.innerHTML = '<div style="font-size:50px;">🎯</div><div style="margin-top:10px; color:#facc15;">গেম চলছে...</div><div style="font-size:12px; margin-top:5px;">জেতার চেষ্টা করুন!</div>';
      document.body.appendChild(playingDiv);
      
      setTimeout(()=>{
        document.body.removeChild(playingDiv);
        
        // জেতার পর আপনার ওই সুন্দর মেসেজটা
        let winPoints = 90;
        let newTotal = 1630;
        
        setTimeout(()=>{
          alert(`🎉 ${currentGame} এ জিতেছেন!\n\n🏆 পেয়েছেন: ${winPoints} পয়েন্ট\n💰 বর্তমান: ${newTotal} পয়েন্ট\n\n💡 Shop থেকে কেনাকাটা করুন! 100 পয়েন্ট = 20 টাকা`);
          location.reload();
        },300);
        
      },3000); // 3 সেকেন্ড খেলার সময়
    }
  },2500);
}
