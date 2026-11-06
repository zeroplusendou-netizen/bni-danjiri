/* BNI Danjiri public chapter metrics, sourced from operator-managed server records. */
(() => {
 'use strict';
 const pick=(label)=>[...document.querySelectorAll('.hero-stat-card')].find(card=>
   [...card.querySelectorAll('.hero-stat-label')].some(el=>el.textContent.trim()===label));
 const set=async()=>{
  try{
   const response=await fetch('/chapter-stats.php',{cache:'no-store',credentials:'omit'});
   if(!response.ok)throw new Error('Statistics unavailable');
   const d=await response.json();
   const num=(x)=>Number.isSafeInteger(x)&&x>=0?x:null;
   const referrals=num(d.referrals),sales=num(d.sales_man);
   const referralCard=pick('紹介実績（総合計）');
   const salesCard=pick('総売上貢献額');
   if(referralCard&&referrals!==null){
    const el=referralCard.querySelector('.hero-stat-number');
    if(el){
     const count=document.createTextNode((d.referral_approx?'約':'')+referrals.toLocaleString('ja-JP'));
     const suffix=document.createElement('span');
     suffix.style.fontSize='24px';
     suffix.textContent=d.referral_unit==='件（累計）'?'件（累計）':'件/年';
     el.replaceChildren(count,suffix);
    }
   }
   if(salesCard&&sales!==null){
    const el=salesCard.querySelector('.hero-stat-number');
    if(el){
     const n=document.createTextNode(sales.toLocaleString('ja-JP'));
     const suffix=document.createElement('span');suffix.style.fontSize='28px';suffix.textContent='万円';
     el.replaceChildren(n,suffix);
    }
   }
   if(d.as_of&&/^\d{4}-\d{2}-\d{2}$/.test(d.as_of)){
    for(const card of [referralCard,salesCard]){
     if(!card)continue;
     let note=card.querySelector('.chapter-stat-asof');
     if(!note){note=document.createElement('div');note.className='chapter-stat-asof';note.style.cssText='font-size:11px;opacity:.75;margin-top:6px;';card.append(note);}
     const [y,m,day]=d.as_of.split('-');
     note.textContent='※'+y+'年'+Number(m)+'月'+Number(day)+'日現在';
    }
   }
  }catch(err){console.warn('Chapter metrics not loaded',err);}
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',set,{once:true});
 else set();
})();