// JAY ABO · 공통 헤더/푸터 자동 삽입
(function () {
  const BASE = window.JAY_BASE || '/jayabo-site';
  // 2026-11-21: 암웨이 규정상 후원자 번호 공개 페이지 노출 금지
  // 번호는 JS 상수로만 유지 (클릭 시 클립보드 복사 전용) · HTML 에 렌더링 X
  const SPONSOR_NUM_FOR_COPY = '7027465675';
  const SPONSOR_NUM = '';  // 레거시 템플릿 치환용 · 화면엔 빈 값

  // 현재 경로에 따라 · 어느 메뉴가 active인지
  const path = location.pathname;
  const isActive = (test) => {
    if (test === 'home') return path === '/' || path.endsWith('/index.html') || path === BASE || path === BASE + '/';
    if (test === 'products') return path.includes('products.html') || (path.includes('/pages/') && !path.includes('guide_'));
    if (test === 'business') return path.includes('business.html');
    if (test === 'guide') return path.includes('guide_') || path.includes('guide.html');
    if (test === 'blog') return path.includes('/blog');
    return false;
  };
  const cls = (t) => isActive(t) ? 'active' : '';

  const KAKAO_URL = 'https://pf.kakao.com/_xaxbUNX/chat'; // 암웨이 JAY 카카오 채널 1:1 채팅
  const NAVER_BLOG_URL = 'https://blog.naver.com/bbaamm22';

  // ===== 헤더 =====
  const headerHTML = `
  <header class="jay-header">
    <div class="jay-header-inner">
      <a class="jay-logo" href="${BASE}/">JAY ABO</a>
      <button class="jay-hamburger" onclick="document.querySelector('.jay-nav').classList.toggle('open')" aria-label="메뉴">☰</button>
      <nav class="jay-nav">
        <a class="${cls('home')}" href="${BASE}/">홈</a>
        <a class="${cls('products')}" href="${BASE}/products.html">상품</a>
        <a class="${cls('business')}" href="${BASE}/business.html">부업</a>
        <a class="${cls('guide')}" href="${BASE}/guide.html">가이드</a>
        <a class="${cls('blog')}" href="${NAVER_BLOG_URL}" target="_blank">블로그 ↗</a>
      </nav>
      <a class="jay-cta-kakao" href="${KAKAO_URL}" target="_blank">💬 카톡 상담</a>
    </div>
  </header>`;

  // ===== 푸터 =====
  const footerHTML = `
  <footer class="jay-footer">
    <div class="jay-footer-inner">
      <div class="jay-footer-grid">
        <div>
          <h4>JAY ABO</h4>
          <p style="font-size:13px;line-height:1.7;color:#8a92a3">
            뉴트리라이트·아티스트리 등 · 검증된 상품을 · 후원자를 통해 안심 구매.
          </p>
          <a href="javascript:void(0)" onclick="(window.copySponsorAndGoKakao||function(){window.location.href='https://pf.kakao.com/_xaxbUNX/chat'})(); return false;" class="jay-sponsor-badge" style="text-decoration:none;color:inherit;cursor:pointer">💬 카톡 상담 (번호 자동 복사)</a>
        </div>
        <div>
          <h4>상품</h4>
          <ul>
            <li><a href="${BASE}/products.html?cat=nutrition">영양건강</a></li>
            <li><a href="${BASE}/products.html?cat=skin">스킨케어</a></li>
            <li><a href="${BASE}/products.html?cat=body">바디케어</a></li>
            <li><a href="${BASE}/products.html?cat=home">주방·가정</a></li>
          </ul>
        </div>
        <div>
          <h4>가이드</h4>
          <ul>
            <li><a href="${BASE}/pages/guide_amway_101.html">암웨이 처음이신가요?</a></li>
            <li><a href="${BASE}/pages/guide_signup.html">회원가입 가이드</a></li>
            <li><a href="${BASE}/pages/guide_purchase.html">구매 가이드</a></li>
          </ul>
        </div>
        <div>
          <h4>연결</h4>
          <ul>
            <li><a href="${NAVER_BLOG_URL}" target="_blank">네이버 블로그 ↗</a></li>
            <li><a href="${KAKAO_URL}" target="_blank">카톡 상담 ↗</a></li>
            <li><a href="tel:1588-2500">암웨이 고객센터 1588-2500</a></li>
          </ul>
        </div>
      </div>
      <div class="jay-footer-bottom">
        JAY ABO · 회원가입·후원자 안내는 <a href="javascript:void(0)" onclick="(window.copySponsorAndGoKakao||function(){window.location.href='https://pf.kakao.com/_xaxbUNX/chat'})(); return false;" style="color:#ff9d75;cursor:pointer">카카오 채널 「암웨이 JAY」</a>에서 개별 상담<br>
        &copy; ${new Date().getFullYear()} JAY ABO. 정식 등록 AmwayBusinessOwner.
      </div>
    </div>
  </footer>`;

  // ===== 삽입 =====
  function inject() {
    // 헤더 · body 첫 자식으로
    if (!document.querySelector('.jay-header')) {
      document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
    // 푸터 · body 마지막
    if (!document.querySelector('.jay-footer')) {
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
