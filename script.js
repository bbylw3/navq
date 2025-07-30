document.addEventListener("DOMContentLoaded", function () {
  // 页面加载完成后隐藏加载动画
  const loadingOverlay = document.querySelector('.loading-overlay');
  if (loadingOverlay) {
    // 添加一个最小加载时间，确保动画可见
    setTimeout(() => {
      loadingOverlay.classList.add('hidden');
    }, 800);
  }

  // 动态生成导航链接
  const navList = document.getElementById('navList');
  navData.forEach(category => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${category.id}`;
    a.textContent = category.name;
    a.setAttribute('data-category', category.id);
    li.appendChild(a);
    navList.appendChild(li);
  });

  // 动态生成分类内容
  const categoriesContainer = document.getElementById('categoriesContainer');
  Object.keys(linkData).forEach(categoryId => {
    const category = navData.find(cat => cat.id === categoryId);
    if (category) {
      const categoryTitle = document.createElement('h2');
      categoryTitle.className = 'category-title';
      categoryTitle.id = categoryId;
      categoryTitle.textContent = category.name;
      
      const linkGrid = document.createElement('section');
      linkGrid.className = 'link-grid';
      
      linkData[categoryId].forEach((link, index) => {
        const linkCard = document.createElement('div');
        linkCard.className = 'link-card';
        
        // 添加延迟动画效果
        linkCard.style.animationDelay = `${index * 0.05}s`;
        
        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.target = '_blank';
        anchor.setAttribute('aria-label', link.name);
        
        const icon = document.createElement('i');
        icon.className = link.icon;
        icon.setAttribute('aria-hidden', 'true');
        
        const title = document.createElement('h3');
        title.textContent = link.name;
        
        linkCard.appendChild(anchor);
        linkCard.appendChild(icon);
        linkCard.appendChild(title);
        linkGrid.appendChild(linkCard);
      });
      
      categoriesContainer.appendChild(categoryTitle);
      categoriesContainer.appendChild(linkGrid);
    }
  });

  // 导航链接交互
  var navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
      var targetId = this.getAttribute("href").split("#")[1];
      var targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });

        var newUrl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "#" +
          targetId;
        window.history.pushState({ path: newUrl }, "", newUrl);
      }
    });
  });

  // 处理URL hash变化
  function handleHashChange() {
    var hash = window.location.hash;
    if (hash) {
      var targetElement = document.getElementById(hash.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        var activeLink = document.querySelector(
          'nav a[href="' + hash + '"]'
        );
        if (activeLink) {
          navLinks.forEach((l) => l.classList.remove("active"));
          activeLink.classList.add("active");
        }
      }
    }
  }

  window.addEventListener("hashchange", handleHashChange);
  handleHashChange(); // Call on initial load

  // 搜索功能
  const searchInput = document.getElementById('searchInput');
  
  // 添加搜索框聚焦效果
  searchInput.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  searchInput.addEventListener('blur', function() {
    this.parentElement.classList.remove('focused');
  });
  
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    
    // 如果搜索框为空，显示所有内容
    if (searchTerm === '') {
      document.querySelectorAll('.link-card').forEach(card => {
        card.style.display = 'flex';
      });
      document.querySelectorAll('.category-title').forEach(title => {
        title.style.display = 'block';
      });
      document.querySelectorAll('.link-grid').forEach(grid => {
        grid.style.display = 'grid';
      });
      removeNoResultsMessage();
      return;
    }
    
    // 隐藏所有分类标题和网格
    document.querySelectorAll('.category-title').forEach(title => {
      title.style.display = 'none';
    });
    document.querySelectorAll('.link-grid').forEach(grid => {
      grid.style.display = 'none';
    });
    
    // 搜索匹配的卡片
    let hasResults = false;
    document.querySelectorAll('.link-card').forEach(card => {
      const cardText = card.querySelector('h3').textContent.toLowerCase();
      if (cardText.includes(searchTerm)) {
        card.style.display = 'flex';
        hasResults = true;
        
        // 显示父级网格和关联的分类标题
        const grid = card.closest('.link-grid');
        grid.style.display = 'grid';
        const title = grid.previousElementSibling;
        if (title && title.classList.contains('category-title')) {
          title.style.display = 'block';
        }
      } else {
        card.style.display = 'none';
      }
    });
    
    // 如果没有结果，显示提示信息
    if (!hasResults) {
      showNoResultsMessage();
    } else {
      removeNoResultsMessage();
    }
  });
  
  function showNoResultsMessage() {
    removeNoResultsMessage(); // 先移除已有的消息
    
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.id = 'noResultsMessage';
    noResults.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i><p>没有找到匹配的网站</p><p>请尝试其他关键词</p>';
    categoriesContainer.appendChild(noResults);
  }
  
  function removeNoResultsMessage() {
    const existingMessage = document.getElementById('noResultsMessage');
    if (existingMessage) {
      existingMessage.remove();
    }
  }
  
  // 添加键盘快捷键支持
  document.addEventListener('keydown', function(e) {
    // Ctrl + K 或 Cmd + K 聚焦搜索框
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select(); // 选中所有文本
    }
    
    // ESC键清除搜索
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.value = '';
      searchInput.blur();
      // 触发input事件以清除搜索结果
      searchInput.dispatchEvent(new Event('input'));
    }
  });
  
  // 添加页面加载动画
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});