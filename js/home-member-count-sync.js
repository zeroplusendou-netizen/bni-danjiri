/* BNI Danjiri homepage public member count sync, 2026-11-06. */
(()=>{'use strict';
const run=async()=>{
 const labels=[...document.querySelectorAll('.hero-stat-label')];
 const label=labels.find(el=>el.textContent.trim()==='メンバー数');
 if(!label)return;
 const card=label.closest('.hero-stat-card');
 if(!card)return;
 try{
  const response=await fetch('members.html',{cache:'no-store',credentials:'omit'});
  if(!response.ok)throw new Error('member page unavailable');
  const html=await response.text();
  const page=new DOMParser().parseFromString(html,'text/html');
  const cards=[...page.querySelectorAll('.category-section .member-card')];
  if(!cards.length)throw new Error('no public members');
  const count=cards.filter(c=>c.querySelector('.member-name')?.textContent.trim()).length;
  if(!count)throw new Error('member names missing');
  const number=card.querySelector('.hero-stat-number');
  if(number)number.innerHTML=String(count)+'<span style="font-size:28px">名</span>';
  const note=[...card.querySelectorAll('div')].find(el=>el.children.length===0&&/2025年12月18日現在/.test(el.textContent));
  if(note)note.textContent='※公開メンバーページの掲載人数と連動';
 }catch(e){console.warn('member count sync unavailable',e);}
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();