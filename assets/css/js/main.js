(function(){
  const menuWrap = document.querySelector('.menu-wrap');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  function closeMenu(){
    if(!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.hidden = true;
  }

  function openMenu(){
    if(!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'true');
    nav.hidden = false;
  }

  if(toggle && nav && menuWrap){
    toggle.addEventListener('click', function(){
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if(isOpen) closeMenu();
      else openMenu();
    });

    document.addEventListener('click', function(event){
      if(!menuWrap.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', function(event){
      if(event.key === 'Escape') closeMenu();
    });

    nav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', closeMenu);
    });
  }

  const page = location.pathname.split('/').pop() || 'index.html';
  const hash = location.hash;
  document.querySelectorAll('nav a[data-page]').forEach(function(a){
    const key = a.getAttribute('data-page');
    const isHome = key === 'index.html' && page === 'index.html' && hash !== '#services';
    const isServices = key === 'services' && ((page === 'index.html' && hash === '#services') || (page !== 'index.html' && a.getAttribute('href') === 'index.html#services'));
    const isContact = key === 'contact.html' && page === 'contact.html';
    if(isHome || isServices || isContact){
      a.style.color = 'var(--text)';
      a.style.fontWeight = '700';
    }
  });

  const tiles = Array.from(document.querySelectorAll('.service-tile'));
  const detail = document.getElementById('service-detail');
  const detailMediaGrid = document.getElementById('service-media-grid');
  const detailImage = document.getElementById('service-detail-image');
  const detailImage2 = document.getElementById('service-detail-image-2');
  const detailShot2 = document.getElementById('service-shot-2');
  const detailCaption1 = document.getElementById('service-detail-caption-1');
  const detailCaption2 = document.getElementById('service-detail-caption-2');
  const detailTitle = document.getElementById('service-detail-title');
  const detailDescription = document.getElementById('service-detail-description');
  const detailPoints = document.getElementById('service-detail-points');
  const detailQuote = document.getElementById('service-detail-quote');

  function showService(tile){
    if(!detail || !detailImage || !detailTitle || !detailDescription || !detailPoints || !detailQuote) return;

    tiles.forEach(function(t){ t.classList.remove('is-active'); });
    tile.classList.add('is-active');

    const title = tile.dataset.title || 'Service Details';
    const description = tile.dataset.description || '';
    const points = (tile.dataset.points || '').split('|').filter(Boolean);
    const image = tile.dataset.image || 'assets/css/img/logo.png';
    const imageBefore = tile.dataset.imageBefore || '';
    const imageAfter = tile.dataset.imageAfter || '';
    const service = tile.dataset.service || '';

    detailTitle.textContent = title;
    detailDescription.textContent = description;
    detailPoints.innerHTML = '';
    points.forEach(function(point){
      const li = document.createElement('li');
      li.textContent = point;
      detailPoints.appendChild(li);
    });

    if(imageBefore && imageAfter && detailMediaGrid && detailImage2 && detailShot2 && detailCaption1 && detailCaption2){
      detailMediaGrid.classList.add('is-pair');
      detailShot2.hidden = false;

      detailImage.src = imageBefore;
      detailImage2.src = imageAfter;
      detailCaption1.textContent = 'Before';
      detailCaption2.textContent = 'After';
    } else {
      if(detailMediaGrid) detailMediaGrid.classList.remove('is-pair');
      if(detailShot2) detailShot2.hidden = true;
      if(detailCaption1) detailCaption1.textContent = '';
      if(detailCaption2) detailCaption2.textContent = '';
      detailImage.src = image;
    }

    detailImage.onerror = function(){
      detailImage.src = 'assets/css/img/logo.png';
    };
    if(detailImage2){
      detailImage2.onerror = function(){
        detailImage2.src = 'assets/css/img/logo.png';
      };
    }

    detailQuote.href = service
      ? 'contact.html?service=' + encodeURIComponent(service)
      : 'contact.html';

    detail.hidden = false;
  }

  if(tiles.length){
    tiles.forEach(function(tile){
      tile.addEventListener('click', function(){
        showService(tile);
      });
    });

    showService(tiles[0]);
  }

  const serviceSelect = document.querySelector('select[name="service"]');
  if(serviceSelect){
    const param = new URLSearchParams(window.location.search).get('service');
    if(param){
      const match = Array.from(serviceSelect.options).find(function(opt){
        return opt.text.trim().toLowerCase() === param.trim().toLowerCase();
      });
      if(match){
        serviceSelect.value = match.value;
      } else {
        const option = document.createElement('option');
        option.text = param;
        option.value = param;
        serviceSelect.appendChild(option);
        serviceSelect.value = param;
      }
    }
  }
})();
