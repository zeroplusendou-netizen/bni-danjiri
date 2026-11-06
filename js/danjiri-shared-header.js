/* BNI だんじりチャプター｜公式HP共通ヘッダー
 * Single source for logos, nav items, member login, and responsive menu behavior.
 * 2026-11-05. To edit nav across all public pages, edit only this file.
 */
(() => {
  'use strict';
  const slot=document.getElementById('danjiri-shared-header');
  if (!slot) return;
  const pathname=window.location.pathname;
  const current=pathname.endsWith('/')?'index.html':pathname.split('/').pop();
  const links=[
    ['index.html','トップ'],
    ['members.html','メンバー紹介'],
    ['about-bni.html','BNIとは'],
    ['activity.html','活動報告'],
    ['contact.html','見学申込']
  ];
  const menuItems=links.map(([href,label]) => {
    const isCurrent=href===current;
    const cls='nav-link'+(href==='contact.html'?' btn-primary-nav':'');
    return '<li><a href="'+href+'" class="'+cls+'"'+(isCurrent?' aria-current="page"':'')+'>'+label+'</a></li>';
  }).join('');
  const header=document.createElement('header');
  header.className='header public-site-header';
  header.innerHTML=
    '<nav class="nav container" aria-label="だんじりチャプター共通ナビゲーション">'
      +'<a href="index.html" class="nav-logo">'
        +'<img src="images/bni-logo.png" alt="BNIロゴ" class="logo-img">'
        +'<span class="chapter-name">だんじりチャプター</span>'
      +'</a>'
      +'<a class="mobile-member-login" href="/member/" aria-label="メンバー用ログイン">ログイン</a>'
      +'<button class="nav-toggle" id="danjiriNavToggle" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="danjiriNavMenu">'
        +'<span></span><span></span><span></span>'
      +'</button>'
      +'<ul class="nav-menu" id="danjiriNavMenu">'
        +menuItems
        +'<li><a href="/member/" class="nav-link member-entry-nav-link" aria-label="メンバー用ログイン">メンバー用ログイン</a></li>'
      +'</ul>'
    +'</nav>';
  slot.replaceWith(header);
  const toggle=header.querySelector('#danjiriNavToggle');
  const menu=header.querySelector('#danjiriNavMenu');
  const isMobile=() => window.innerWidth <= 1000;
  const setOpen=(open) => {
    if (!isMobile()) open=false;
    menu.classList.toggle('active',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');
    // A closed off-screen mobile menu must not be keyboard accessible.
    menu.inert=isMobile()&&!open;
  };
  setOpen(false);
  toggle.addEventListener('click',() => setOpen(!menu.classList.contains('active')));
  menu.addEventListener('click',e => {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown',e => {
    if (e.key==='Escape'&&menu.classList.contains('active')){
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click',e => {
    if (menu.classList.contains('active')&&!header.contains(e.target)) setOpen(false);
  });
  window.addEventListener('resize',() => setOpen(menu.classList.contains('active')),{passive:true});
})();