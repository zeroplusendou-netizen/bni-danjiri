// ========================================
// ナビゲーション: ハンバーガーメニュー
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // アニメーション
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(45deg) translateY(8px)' 
            : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(-45deg) translateY(-8px)' 
            : 'none';
    });
    
    // メニューリンククリック時にメニューを閉じる
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ========================================
// FAQ: アコーディオン機能
// ========================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // 全てのFAQを閉じる
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // クリックされたFAQを開く(既に開いていた場合は閉じる)
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ========================================
// スムーススクロール
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // "#" のみの場合はスクロールしない
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// スクロールアニメーション: Intersection Observer
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象の要素
const animateElements = document.querySelectorAll(`
    .stats-card,
    .value-card,
    .online-card,
    .category-card,
    .step-card,
    .faq-item,
    .feature-item
`);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// ヘッダー: スクロール時の背景変更
// ========================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// ========================================
// フォーム: 紹介経路の条件付き表示
// ========================================
const referralSource = document.getElementById('referral-source');
const referrerNameGroup = document.getElementById('referrer-name-group');
const referrerNameInput = document.getElementById('referrer-name');

if (referralSource && referrerNameGroup && referrerNameInput) {
    referralSource.addEventListener('change', function() {
        if (this.value === 'メンバーからの紹介') {
            referrerNameGroup.style.display = 'block';
            referrerNameInput.required = true;
        } else {
            referrerNameGroup.style.display = 'none';
            referrerNameInput.required = false;
            referrerNameInput.value = ''; // 値をクリア
        }
    });
}

// ========================================
// フォーム: EmailJS + Formspree送信処理 (contact.htmlで使用)
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // EmailJS初期化（後で設定が必要）
    // 使用方法: https://dashboard.emailjs.com/ でアカウント作成後、
    // YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID を設定
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // 送信中の表示
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
        submitButton.disabled = true;
        
        try {
            // 1. Formspreeへ送信（管理者通知用）
            const formData = new FormData(contactForm);
            const formspreeResponse = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!formspreeResponse.ok) {
                throw new Error('Formspree送信失敗');
            }
            
            // 2. EmailJSで自動返信メール送信
            const emailjsConfig = {
                publicKey: 'eOUHlUfpj7a5NtbC3',     // ✅ 設定済み
                serviceId: 'service_dq4a61m',       // ✅ Gmail経由で設定済み
                templateId: 'template_jyirxvn'      // ✅ 自動返信テンプレート設定済み
            };
            
            // EmailJSが設定されている場合のみ実行
            if (emailjsConfig.publicKey !== 'YOUR_PUBLIC_KEY') {
                try {
                    // EmailJS初期化
                    emailjs.init(emailjsConfig.publicKey);
                    
                    // フォームデータを取得
                    const templateParams = {
                        to_email: document.getElementById('email').value,
                        to_name: document.getElementById('name').value,
                        company: document.getElementById('company').value || '未入力',
                        phone: document.getElementById('phone').value,
                        business: document.getElementById('business').value,
                        preferred_date: document.getElementById('preferred-date').value || '未定',
                        referral_source: document.getElementById('referral-source').value,
                        referrer_name: document.getElementById('referrer-name').value || '該当なし',
                        message: document.getElementById('message').value || '特になし'
                    };
                    
                    // EmailJS送信
                    await emailjs.send(
                        emailjsConfig.serviceId,
                        emailjsConfig.templateId,
                        templateParams
                    );
                } catch (emailError) {
                    console.warn('EmailJS自動返信の送信に失敗しましたが、管理者への通知は成功しています:', emailError);
                    // EmailJS失敗してもFormspreeは成功しているので続行
                }
            }
            
            // 送信成功
            showSuccessMessage();
            contactForm.reset();
            
            // 紹介者名欄を非表示に戻す
            if (referrerNameGroup) {
                referrerNameGroup.style.display = 'none';
                if (referrerNameInput) {
                    referrerNameInput.required = false;
                }
            }
            
        } catch (error) {
            console.error('送信エラー:', error);
            alert('送信に失敗しました。しばらくしてから再度お試しください。');
        } finally {
            // ボタンを元に戻す
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// 送信成功メッセージを表示
function showSuccessMessage() {
    // 成功メッセージのHTML要素を作成
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #E31C24, #a01118);
        color: white;
        padding: 40px 60px;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        animation: fadeInScale 0.3s ease;
    `;
    
    successDiv.innerHTML = `
        <div style="font-size: 64px; margin-bottom: 20px;">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3 style="font-size: 28px; font-weight: 700; margin-bottom: 16px;">送信完了</h3>
        <p style="font-size: 18px; line-height: 1.6; opacity: 0.95;">
            この度は、BNI だんじりチャプターの見学申込をいただき、<br>
            誠にありがとうございます。<br><br>
            自動返信メールをお送りしましたので、ご確認ください。<br>
            メールには見学当日のご案内とZoomリンクを記載しております。<br><br>
            <span style="font-size: 15px; opacity: 0.85;">
            ※ 日程に不備がある場合や定員に達している場合は、<br>
            担当者よりご連絡させていただきます。
            </span>
        </p>
    `;
    
    // オーバーレイ（背景）を作成
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    // アニメーション用のCSSを追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    // ページに追加
    document.body.appendChild(overlay);
    document.body.appendChild(successDiv);
    
    // 3秒後に自動で閉じる
    setTimeout(() => {
        successDiv.style.animation = 'fadeOut 0.3s ease';
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successDiv);
            document.body.removeChild(overlay);
        }, 300);
    }, 3000);
    
    // クリックで閉じる
    overlay.addEventListener('click', () => {
        document.body.removeChild(successDiv);
        document.body.removeChild(overlay);
    });
}

// メールアドレスバリデーション関数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================================
// メンバーフィルター機能 (members.htmlで使用)
// ========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const memberCards = document.querySelectorAll('.member-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // アクティブボタンの切り替え
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // メンバーカードのフィルタリング
            memberCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========================================
// ページトップへ戻るボタン
// ========================================
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-top-btn';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #E31C24, #a01118);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 16px rgba(227, 28, 36, 0.3);
        z-index: 999;
        font-size: 20px;
    `;
    
    document.body.appendChild(button);
    
    // スクロール時の表示/非表示
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    // クリック時のスクロール
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ホバー効果
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 8px 24px rgba(227, 28, 36, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 16px rgba(227, 28, 36, 0.3)';
    });
};

// ページ読み込み時にボタンを作成
createScrollTopButton();

// ========================================
// ページ読み込み完了時の処理
// ========================================
window.addEventListener('load', () => {
    // ローディングアニメーションの非表示など
    document.body.style.opacity = '1';
});

// ========================================
// 現在のページのナビゲーションハイライト
// ========================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinksAll = document.querySelectorAll('.nav-link');

navLinksAll.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.style.color = '#E31C24';
        link.style.fontWeight = '700';
    }
});

console.log('BNI だんじりチャプター公式サイト - JavaScript読み込み完了✅');