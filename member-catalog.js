/* BNI Danjiri — A4 printable member directory. Read-only; sourced from the live public member cards. */
(() => {
 'use strict';
 const order=['housing','management','cost-reduction','growth','creative','restaurant'];
 const names={housing:'住宅関連',management:'経営サポート','cost-reduction':'経費削減',growth:'事業成長',creative:'クリエイティブ',restaurant:'飲食店'};
 const normalize=s=>String(s||'').replace(/[\s　]+/g,'').trim();
 const clean=s=>String(s||'').replace(/\s+/g,' ').replace(/^アピールポイント\s*/,'').trim();
 const text=(el,selector)=>clean(el.querySelector(selector)?.textContent);
 const node=(tag,klass,content)=>{
  const e=document.createElement(tag);
  if(klass)e.className=klass;
  if(content!==undefined)e.textContent=content;
  return e;
 };
 let records=[],profiles=new Map(),root,originalTitle=document.title;
 const limit=(t,n)=>{const chars=[...String(t||'')];return chars.length>n?chars.slice(0,n).join('').replace(/[、・\s]+$/,'')+'…':chars.join('');};
 const groupName=id=>names[id]||'専門分野';
 const fromCards=()=> {
  const found=[];
  document.querySelectorAll('.category-section').forEach(section=>{
   section.querySelectorAll('.member-card').forEach(card=>{
    const name=text(card,'.member-name');
    if(!name)return;
    const image=card.querySelector('.avatar-img');
    let src=image?.getAttribute('src')||'';
    if(!src||src.startsWith('data:'))src='images/member-avatar-placeholder.svg';
    found.push({
      name,section:section.id,category:text(card,'.member-category-tag'),
      company:text(card,'.member-company'),
      photo:src,
      usp:text(card,'.member-usp-box'),
      appeal:text(card,'.member-appeal-box')
    });
   });
  });
  return found;
 };
 const combine=record=>{
  const p=profiles.get(normalize(record.name))||{};
  const main=clean(p.services)||clean(record.usp)||clean(p.specialty);
  const distinctive=clean(p.solutions)||clean(record.appeal);
  const target=clean(p.ideal_customer);
  return {...record,main,distinctive,target};
 };
 const createCard=(m,seq)=>{
  const article=node('article','mc-card');
  const header=node('div','mc-card-top');
  const portrait=node('div','mc-photo-wrap');
  const img=node('img','mc-photo');
  img.src=m.photo;img.alt=m.name+'さんのプロフィール写真';img.loading='eager';
  img.onerror=()=>{if(!img.src.includes('member-avatar-placeholder.svg'))img.src='images/member-avatar-placeholder.svg';};
  portrait.append(img);
  const identity=node('div','mc-identity');
  identity.append(node('span','mc-group-chip',groupName(m.section)),node('h3','mc-name',m.name),node('p','mc-specialty',m.category));
  if(m.company&&m.company!=='プロフィール準備中')identity.append(node('p','mc-company',limit(m.company,39)));
  header.append(portrait,identity);
  const body=node('div','mc-card-body');
  const service=node('div','mc-service');
  service.append(node('span','mc-field-label','WHAT I DO / できること'),node('p','mc-main',limit(m.main||('専門カテゴリー：'+m.category),110)));
  body.append(service);
  const targetText=m.target||m.distinctive;
  if(targetText){
   const ref=node('div','mc-referral');
   ref.append(node('span','mc-field-label',m.target?'WHO I CAN HELP / つながりたい方':'STRENGTH / 強み・特徴'),node('p','mc-ref-text',limit(targetText,101)));
   body.append(ref);
  }else{
   const blank=node('div','mc-referral mc-referral-empty');
   blank.append(node('span','mc-field-label','INTRODUCE / 紹介のヒント'),node('p','mc-ref-text','専門分野について、Web版プロフィールで詳細をご確認ください。'));
   body.append(blank);
  }
  const footer=node('div','mc-card-footer');
  footer.append(node('span','mc-id',String(seq).padStart(2,'0')+' / '+groupName(m.section)),node('span','mc-see-web','WEB PROFILE ↗'));
  article.append(header,body,footer);
  return article;
 };
 const spread=()=>{
  const grouped=Object.fromEntries(order.map(id=>[id,[]]));
  records.map(combine).forEach(m=>(grouped[m.section]||(grouped[m.section]=[])).push(m));
  const result=[];
  let remaining=true;
  while(remaining){
    remaining=false;
    order.forEach(id=>{if(grouped[id]?.length){result.push(grouped[id].shift());remaining=true;}});
  }
  return result;
 };
 const pageFrame=(kind,index,total)=>{
  const page=node('section','mc-page mc-'+kind);
  page.setAttribute('aria-label',kind==='cover'?'カタログ表紙':'メンバー紹介 '+index+'ページ');
  page.dataset.page=String(index);
  const footer=node('footer','mc-page-footer');
  footer.append(node('span','','BNI だんじりチャプター | MEMBER CATALOG'),
    node('span','','bni-danjiri.jp/members.html'),
    node('span','',String(index).padStart(2,'0')+' / '+String(total).padStart(2,'0')));
  page.append(footer);
  return page;
 };
 const cover=(n,total,groups)=>{
  const page=pageFrame('cover',1,total);
  const visual=node('div','mc-cover-visual');
  visual.append(node('span','mc-cover-super','BNI  DANJIRI  CHAPTER'),
                node('span','mc-cover-edition','PROFESSIONAL DIRECTORY  ·  2026'),
                node('div','mc-cover-rule'));
  const content=node('div','mc-cover-content');
  content.append(node('p','mc-cover-lead','異業種の出会いを、信頼でつなぐ。'),
                 node('h1','mc-cover-title','人と事業を、\nつなぐ一冊。'),
                 node('p','mc-cover-sub','「この人なら、あの人に紹介したい。」\nそんな出会いが生まれる、BNIだんじりチャプターのメンバーカタログ。'));
  const figures=node('div','mc-cover-figures');
  const g1=node('div','mc-cover-figure');g1.append(node('strong','',String(n)),node('span','','PROFESSIONALS / 専門家'));
  const g2=node('div','mc-cover-figure');g2.append(node('strong','',String(order.filter(x=>groups[x]>0).length)),node('span','','FIELDS / 専門分野グループ'));
  figures.append(g1,g2);
  const tags=node('div','mc-cover-groups');
  order.forEach(id=>{if(groups[id]>0)tags.append(node('span','',groupName(id)+' '+groups[id]+'名'));});
  content.append(figures,node('h2','mc-cover-small-title','幅広い専門分野から、探す・つながる・紹介する。'),tags);
  const closing=node('div','mc-cover-cta');
  closing.append(node('span','mc-cover-cta-kicker','HOW TO USE THIS CATALOG'),
    node('p','','① 職種や強みから、気になる専門家を探す'),
    node('p','','② 「あの人に合いそう」と思う相手をイメージする'),
    node('p','','③ 詳しくは公式Webのメンバー紹介ページへ'));
  content.append(closing);
  visual.append(content);
  page.insertBefore(visual,page.lastElementChild);
  return page;
 };
 const listing=(list,index,total,start)=>{
  const page=pageFrame('listing',index,total);
  const heading=node('header','mc-listing-head');
  const left=node('div');
  left.append(node('span','mc-listing-kicker','BNI DANJIRI / MEMBERS DIRECTORY'),
    node('h2','mc-listing-title','信頼から、次の紹介が生まれる。'),
    node('p','mc-listing-sub','多彩な職種の専門家と、ビジネスの可能性を広げよう。'));
  heading.append(left,node('span','mc-listing-page',String(index-1).padStart(2,'0')+'  /  '+String(total-1).padStart(2,'0')));
  const grid=node('div','mc-grid');
  list.forEach((m,i)=>grid.append(createCard(m,start+i+1)));
  if(list.length<6){
   const more=node('div','mc-last-message');
   more.append(node('span','mc-last-eyebrow','YOUR NEXT CONNECTION'),
     node('h3','','つながりたい人が、\nここにいる。'),
     node('p','','メンバーの最新情報や公式サイトへのリンクは、Webの紹介ページからご覧いただけます。'),
     node('strong','','bni-danjiri.jp/members.html'));
   grid.append(more);
  }
  page.insertBefore(heading,page.lastElementChild);
  page.insertBefore(grid,page.lastElementChild);
  return page;
 };
 function build(){
  if(!records.length)return;
  if(!root){root=node('div','member-print-catalog');root.id='memberPrintCatalog';document.body.append(root);}
  root.replaceChildren();
  const list=spread();
  const groups={};records.forEach(m=>{groups[m.section]=(groups[m.section]||0)+1;});
  const sheets=Math.ceil(list.length/6),total=sheets+1;
  root.append(cover(list.length,total,groups));
  for(let i=0;i<sheets;i++)root.append(listing(list.slice(i*6,(i+1)*6),i+2,total,i*6));
  root.dataset.count=String(list.length);
  root.dataset.pages=String(total);
 }
 const configurePreview=()=>{
  const show=new URLSearchParams(location.search).get('catalog')==='1';
  if(!show)return;
  document.body.classList.add('catalog-preview');
  const bar=node('nav','mc-preview-toolbar');
  const back=node('a','mc-preview-back','← メンバー紹介へ戻る');
  back.href='members.html';
  const title=node('strong','','BNIだんじり メンバーカタログ');
  const print=node('button','mc-preview-print','印刷・PDFに保存');
  print.type='button';print.addEventListener('click',()=>window.print());
  bar.append(back,title,print);
  document.body.insertBefore(bar,document.body.firstChild);
  document.title='BNIだんじりチャプター｜メンバーカタログ';
 };
 const start=()=>{
  records=fromCards();
  if(!records.length)return;
  build();
  configurePreview();
  window.addEventListener('beforeprint',()=>{
    build();
    document.title='BNIだんじり｜メンバーカタログ';
  });
  window.addEventListener('afterprint',()=>{if(!document.body.classList.contains('catalog-preview'))document.title=originalTitle;});
  fetch('/expert-data.php',{credentials:'omit',cache:'no-store'})
   .then(r=>{if(!r.ok)throw new Error('details unavailable');return r.json();})
   .then(data=>{profiles=new Map((data.members||[]).map(p=>[normalize(p.name),p]));build();})
   .catch(()=>{/* The static member descriptions remain the source of truth if the optional endpoint fails. */});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
 else start();
})();