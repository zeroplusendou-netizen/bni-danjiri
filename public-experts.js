(() => {
 const start=()=>{
  const cards=[...document.querySelectorAll('.member-card')];
  const dialog=document.getElementById('expertDetail');
  if(!cards.length||!dialog)return;
  const details=new WeakMap();
  const plain=(node)=>node?.textContent?.trim().replace(/\s+/g,' ')||'';
  const make=(tag,cls,txt)=>{
    const el=document.createElement(tag);
    if(cls)el.className=cls;
    if(txt!==undefined)el.textContent=txt;
    return el;
  };
  const crop=(s,n=95)=>s.length>n?s.slice(0,n).trimEnd()+'…':s;
  let profiles=new Map();
  async function getProfiles(){
   try{
     const res=await fetch('/expert-data.php',{credentials:'omit',cache:'no-store'});
     if(!res.ok)throw new Error('profile API unavailable');
     const data=await res.json();
     profiles=new Map((data.members||[]).map(p=>[p.name,p]));
   }catch(err){console.warn('Optional profile details unavailable',err);}
   render();
  }
  function createBlock(label,content,klass){
    if(!content)return null;
    const x=make('section','expert-detail-block '+(klass||''));
    x.append(make('h3','',label),make('p','',content));
    return x;
  }
  function render(){
   cards.forEach(card=>{
    const name=plain(card.querySelector('.member-name'));
    const category=plain(card.querySelector('.member-category-tag'));
    const company=plain(card.querySelector('.member-company'));
    const usp=plain(card.querySelector('.member-usp-box'));
    const appeal=plain(card.querySelector('.member-appeal-box'));
    const photo=card.querySelector('.avatar-img')?.getAttribute('src')||'';
    const originalLinks=[...card.querySelectorAll('.member-link-btn')].map(a=>({label:plain(a),url:a.href}));
    const p=profiles.get(name)||{};
    const specialty=p.specialty||category;
    const primary=p.services||usp||'専門サービスについてご案内しています。';
    const challenge=p.solutions||'';
    const target=p.ideal_customer||'';
    const record={name,category,company,usp,appeal,photo,links:originalLinks,...p};
    details.set(card,record);
    card.dataset.search=[name,category,company,usp,appeal,...Object.values(p)].join(' ').toLocaleLowerCase('ja-JP');
    const head=card.querySelector('.card-header-flex')?.cloneNode(true)||make('div','card-header-flex');
    const kicker=make('p','expert-card-label','WHAT WE DO');
    const title=make('h4','expert-card-title',crop(specialty,55));
    const summary=make('p','expert-card-summary',crop(primary,105));
    const core=make('div','expert-card-core');
    core.append(kicker,title,summary);
    const note=make('div','expert-card-note');
    note.append(make('span','expert-card-note-label',challenge?'こんなお悩みに':'サービスの特徴'),make('p','',crop(challenge||usp||appeal,96)));
    const targetBlock=target?make('p','expert-card-target',crop(target,85)):null;
    if(targetBlock)targetBlock.prepend(make('strong','', 'ご相談いただきたい方：'));
    const button=make('button','expert-open','この専門家を詳しく見る');
    button.type='button';
    button.addEventListener('click',()=>openDetail(record));
    const footer=make('div','expert-card-footer');
    footer.append(button);
    card.replaceChildren(head,core,note,...(targetBlock?[targetBlock]:[]),footer);
    card.classList.add('public-expert-card');
   });
   document.body.classList.add('public-experts-ready');
   document.getElementById('memberSearch')?.dispatchEvent(new Event('input'));
  }
  function openDetail(rec){
   const content=dialog.querySelector('.expert-detail-body');
   content.replaceChildren();
   const hero=make('div','expert-detail-header');
   const image=make('img','expert-detail-avatar');
   image.src=rec.photo;
   image.alt=rec.name;
   image.loading='lazy';
   const about=make('div','expert-detail-intro');
   about.append(make('p','expert-detail-category',rec.category),make('h2','',rec.name),make('p','expert-detail-company',rec.company));
   hero.append(image,about);
   content.append(hero);
   const blocks=[
    ['どんな専門家？',rec.specialty||rec.usp],
    ['主なサービス',rec.services||rec.usp],
    ['このようなお悩みに',rec.solutions],
    ['ご相談いただきたい方',rec.ideal_customer],
    ['選ばれる理由・特徴',rec.usp],
    ['実績・事例',rec.proof],
    ['対応エリア',rec.area],
    ['仕事への想い',rec.story],
    ['その他のご案内',rec.appeal.replace(/^アピールポイント\s*/,'')]
   ];
   const used=new Set();
   blocks.forEach(([label,value])=>{
      if(!value||used.has(value.trim()))return;
      used.add(value.trim());
      const b=createBlock(label,value);
      if(b)content.append(b);
   });
   if(rec.links.length){
     const sec=make('section','expert-detail-block expert-links');
     sec.append(make('h3','','公式サイト・SNS'));
     const links=make('div','expert-detail-links');
     rec.links.forEach(l=>{
       if(!/^https?:\/\//i.test(l.url))return;
       const a=make('a','expert-link',l.label||'Webサイト');
       a.href=l.url;a.target='_blank';a.rel='noopener noreferrer';
       links.append(a);
     });
     sec.append(links);content.append(sec);
   }
   const action=make('div','expert-dialog-actions');
   const contact=make('a','expert-contact','この専門家について問い合わせる');
   contact.href='expert-contact.php?member='+encodeURIComponent(rec.name);
   action.append(contact);content.append(action);
   dialog.showModal();
  }
  const close=dialog.querySelector('.expert-detail-close');
  close?.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  getProfiles();
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();