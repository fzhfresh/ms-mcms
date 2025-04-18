// 平滑滚动到锚点
document.addEventListener("DOMContentLoaded", function () {
  // 通用平滑滚动函数
  function smoothScroll(targetElement, offset = 80) {
    if (targetElement) {
      // 获取导航栏高度
      const navHeight = document.querySelector('.nav-container').offsetHeight || 0;
      // 获取子导航栏高度
      const subNavHeight = document.querySelector('.sub-nav').offsetHeight || 0;
      // 计算总偏移量（导航栏 + 子导航栏 + 额外空间）
      const totalOffset = navHeight + subNavHeight + offset;

      // 获取元素的位置
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

      // 使用原生的平滑滚动
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
        block: 'start'
      });

      // 备用方案：如果浏览器不支持原生平滑滚动
      if (!('scrollBehavior' in document.documentElement.style)) {
        window.scroll({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  // 处理所有页内链接的点击事件（包括页脚和其他位置的链接）
  function handleInternalLinks() {
    // 获取所有指向本页面section的链接
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          smoothScroll(targetElement);
          
          // 如果是导航链接，更新active状态
          const correspondingNavLink = document.querySelector(`.sub-nav a[href="#${targetId}"]`);
          if (correspondingNavLink) {
            document.querySelectorAll(".sub-nav a").forEach(navLink => {
              navLink.classList.remove("active");
            });
            correspondingNavLink.classList.add("active");
          }
        }
      });
    });
  }

  // 处理从其他页面跳转过来的情况
  const hash = window.location.hash;
  if (hash) {
    // 防止直接跳转
    event.preventDefault();
    
    // 给浏览器一点时间来完成页面渲染
    setTimeout(() => {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        smoothScroll(targetElement);
        
        // 更新导航栏active状态
        const correspondingLink = document.querySelector(`.sub-nav a[href="${hash}"]`);
        if (correspondingLink) {
          document.querySelectorAll(".sub-nav a").forEach(link => link.classList.remove("active"));
          correspondingLink.classList.add("active");
        }
      }
    }, 300);
  }

  // 获取所有子导航链接
  const subNavLinks = document.querySelectorAll(".sub-nav a");

  // 为每个子导航链接添加点击事件
  subNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // 移除所有active类
      subNavLinks.forEach((l) => l.classList.remove("active"));

      // 为当前点击的链接添加active类
      this.classList.add("active");

      // 获取目标元素
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      // 使用平滑滚动函数
      smoothScroll(targetElement);
    });
  });

  // 监听滚动事件，更新活动菜单项
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll(".section");
    // 获取导航栏和子导航栏的总高度
    const navHeight = document.querySelector('.nav-container').offsetHeight;
    const subNavHeight = document.querySelector('.sub-nav').offsetHeight;
    const totalOffset = navHeight + subNavHeight;
    
    const scrollPosition = window.scrollY + totalOffset + 50;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        const activeLink = document.querySelector(`.sub-nav a[href="#${sectionId}"]`);
        if (activeLink) {
          document.querySelectorAll(".sub-nav a").forEach(link => link.classList.remove("active"));
          activeLink.classList.add("active");
        }
      }
    });
  });

  // 初始化页内链接处理
  handleInternalLinks();

  // 视频播放功能
  document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.video-banner');
    const video = videoContainer.querySelector('video');
    const playButton = document.getElementById('playVideo');

    if (!video || !playButton) {
        console.error('视频或播放按钮元素未找到');
        return;
    }

    // 视频点击处理函数
    function toggleVideo() {
        if (video.paused) {
            // 尝试播放视频
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // 播放成功
                    playButton.style.display = 'none';
                }).catch(error => {
                    // 播放失败
                    console.error('视频播放失败:', error);
                    alert('视频播放失败，请检查视频文件是否存在或格式是否正确');
                });
            }
        } else {
            // 暂停视频
            video.pause();
            playButton.style.display = 'flex';
        }
    }

    // 播放按钮点击事件
    playButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleVideo();
    });

    // 视频点击事件
    video.addEventListener('click', function(e) {
        e.preventDefault();
        toggleVideo();
    });

    // 视频结束时显示播放按钮
    video.addEventListener('ended', function() {
        playButton.style.display = 'flex';
        video.currentTime = 0; // 重置到视频开始
    });

    // 视频加载错误处理
    video.addEventListener('error', function() {
        console.error('视频加载失败');
        playButton.style.display = 'none';
        const errorMessage = document.createElement('div');
        errorMessage.className = 'video-error';
        errorMessage.textContent = '视频加载失败，请检查视频文件';
        videoContainer.appendChild(errorMessage);
    });

    // 添加加载中状态
    video.addEventListener('loadstart', function() {
        playButton.style.opacity = '0.5';
    });

    video.addEventListener('canplay', function() {
        playButton.style.opacity = '1';
    });

    // 键盘控制
    document.addEventListener('keydown', function(e) {
        const videoRect = video.getBoundingClientRect();
        const isVideoInView = (
            videoRect.top >= 0 &&
            videoRect.left >= 0 &&
            videoRect.bottom <= window.innerHeight &&
            videoRect.right <= window.innerWidth
        );
        
        if (isVideoInView) {
            // 空格键控制播放/暂停
            if (e.code === 'Space') {
                e.preventDefault();
                toggleVideo();
            }
            // F 键控制全屏
            else if (e.code === 'KeyF') {
                e.preventDefault();
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    video.requestFullscreen().catch(err => {
                        console.error('全屏切换失败:', err);
                    });
                }
            }
        }
    });
  });
});