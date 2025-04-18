// 导航菜单切换
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navMenu = document.querySelector(".nav-menu");

mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileMenuBtn.innerHTML = navMenu.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (window.innerWidth <= 992) {
      const dropdown = item.querySelector(".dropdown");
      if (dropdown && e.target.closest(".nav-link")) {
        e.preventDefault();
        const isOpen =
          dropdown.style.maxHeight === "500px" ||
          dropdown.style.maxHeight === "";
        dropdown.style.maxHeight = isOpen ? "0" : "500px";
      } else {
        navMenu.classList.remove("active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 992) {
    navMenu.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      dropdown.style.maxHeight = "";
    });
  }
});

// Banner轮播
let currentBannerIndex = 0;
const bannerSlides = document.querySelectorAll(".banner-slide");
const bannerDots = document.querySelectorAll(".banner-dots .dot");

function showBannerSlide(index) {
  bannerSlides.forEach((slide) => slide.classList.remove("active"));
  bannerDots.forEach((dot) => dot.classList.remove("active"));

  bannerSlides[index].classList.add("active");
  bannerDots[index].classList.add("active");
  currentBannerIndex = index;
}

function nextBannerSlide() {
  let nextIndex = (currentBannerIndex + 1) % bannerSlides.length;
  showBannerSlide(nextIndex);
}

// 自动轮播
let bannerInterval = setInterval(nextBannerSlide, 5000);

// 点击圆点切换
bannerDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    clearInterval(bannerInterval);
    showBannerSlide(index);
    bannerInterval = setInterval(nextBannerSlide, 5000);
  });
});

// 鼠标悬停暂停轮播
const banner = document.querySelector(".banner");
banner.addEventListener("mouseenter", () => {
  clearInterval(bannerInterval);
});

banner.addEventListener("mouseleave", () => {
  bannerInterval = setInterval(nextBannerSlide, 5000);
});

// 产品轮播
let currentProductIndex = 0;
const productSlides = document.querySelectorAll(".product-slide");
const productDots = document.querySelectorAll(".product-dots .product-dot");

function showProductSlide(index) {
  productSlides.forEach((slide) => {
    slide.classList.remove("active");
    slide.style.opacity = "0";
    slide.style.transform = "translateX(50px)";
  });

  setTimeout(() => {
    productSlides[index].classList.add("active");
    productSlides[index].style.opacity = "1";
    productSlides[index].style.transform = "translateX(0)";
  }, 50);

  productDots.forEach((dot) => dot.classList.remove("active"));
  productDots[index].classList.add("active");
  currentProductIndex = index;
}

// 点击圆点切换产品
productDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showProductSlide(index);
  });
});

// 自动轮播产品
let productInterval = setInterval(() => {
  let nextIndex = (currentProductIndex + 1) % productSlides.length;
  showProductSlide(nextIndex);
}, 5000);

// 鼠标悬停暂停产品轮播
const productSlider = document.querySelector(".product-slider");
productSlider.addEventListener("mouseenter", () => {
  clearInterval(productInterval);
});

productSlider.addEventListener("mouseleave", () => {
  productInterval = setInterval(() => {
    let nextIndex = (currentProductIndex + 1) % productSlides.length;
    showProductSlide(nextIndex);
  }, 8000);
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // 更新导航菜单活动状态
      if (targetId !== "#home") {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
        });

        const navLink = document.querySelector(`.nav-link[href="${targetId}"]`);
        if (navLink) {
          navLink.classList.add("active");
        }
      }

      // 如果是移动端，关闭菜单
      if (window.innerWidth <= 992) {
        navMenu.classList.remove("active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});

// 点击圆点切换产品
productDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showProductSlide(index);
  });
});

// 视频弹出层功能
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoClose = document.querySelector('.video-close');
const btnVideos = document.querySelectorAll('.btn-video');

// 打开视频弹出层
btnVideos.forEach(btn => {
    btn.addEventListener('click', function() {
        const videoSrc = this.getAttribute('data-video');
        if (videoSrc) {
            // 设置视频源
            modalVideo.querySelector('source').src = videoSrc;
            // 重新加载视频
            modalVideo.load();
            // 显示弹出层
            videoModal.style.display = 'block';
            // 禁止页面滚动
            document.body.classList.add('modal-open');
            // 自动播放视频
            modalVideo.play();
        }
    });
});

// 关闭视频弹出层
videoClose.addEventListener('click', closeVideoModal);

// 点击弹出层背景也关闭
videoModal.addEventListener('click', function(event) {
    if (event.target === videoModal) {
        closeVideoModal();
    }
});

// 监听 ESC 键关闭弹出层
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && videoModal.style.display === 'block') {
        closeVideoModal();
    }
});

// 关闭视频弹出层的函数
function closeVideoModal() {
    // 暂停视频播放
    modalVideo.pause();
    // 隐藏弹出层
    videoModal.style.display = 'none';
    // 恢复页面滚动
    document.body.classList.remove('modal-open');
}

// 对话框管理
const dialogBoxes = {
    chat: {
        btn: document.getElementById('customer-service'),
        box: document.getElementById('chat-box'),
        close: document.getElementById('chat-close')
    },
    hotline: {
        btn: document.getElementById('hotline'),
        box: document.getElementById('hotline-box'),
        close: document.getElementById('hotline-close')
    },
    feedback: {
        btn: document.getElementById('feedback'),
        box: document.getElementById('feedback-form'),
        close: document.getElementById('feedback-close')
    },
    follow: {
        btn: document.getElementById('follow-us'),
        box: document.getElementById('follow-box'),
        close: document.getElementById('follow-close')
    }
};

let currentOpenDialog = null;

// 显示/隐藏元素的辅助函数
const showElement = (element) => {
    if (element) {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        element.style.transform = 'translateY(0)';
    }
};

const hideElement = (element) => {
    if (element) {
        element.style.opacity = '0';
        element.style.visibility = 'hidden';
        element.style.transform = 'translateY(20px)';
    }
};

const isVisible = (element) => {
    return element && element.style.visibility === 'visible';
};

// 关闭所有对话框
const closeAllDialogs = () => {
    Object.values(dialogBoxes).forEach(dialog => {
        if (dialog.box) {
            hideElement(dialog.box);
        }
    });
    currentOpenDialog = null;
};

// 初始化对话框事件
Object.entries(dialogBoxes).forEach(([key, dialog]) => {
    if (dialog.btn && dialog.box && dialog.close) {
        // 按钮点击事件
        dialog.btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // 如果当前对话框已打开，则关闭它
            if (currentOpenDialog === key) {
                hideElement(dialog.box);
                currentOpenDialog = null;
                return;
            }
            
            // 关闭其他对话框，打开当前对话框
            closeAllDialogs();
            showElement(dialog.box);
            currentOpenDialog = key;
        });

        // 关闭按钮事件
        dialog.close.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            hideElement(dialog.box);
            currentOpenDialog = null;
        });

        // 对话框内部点击阻止冒泡
        dialog.box.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // 初始化时隐藏对话框
        hideElement(dialog.box);
    }
});

// 点击页面其他地方关闭所有对话框
document.addEventListener('click', () => {
    closeAllDialogs();
});

// 客服消息发送功能
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatBody = document.getElementById('chat-body');

if (chatSend && chatInput && chatBody) {
    chatSend.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            // 添加用户消息
            const userMessage = document.createElement('div');
            userMessage.classList.add('chat-message', 'user');
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            messageContent.textContent = message;
            userMessage.appendChild(messageContent);
            chatBody.appendChild(userMessage);

            // 模拟客服回复
            setTimeout(() => {
                const agentMessage = document.createElement('div');
                agentMessage.classList.add('chat-message', 'agent');
                const agentMessageContent = document.createElement('div');
                agentMessageContent.classList.add('message-content');
                agentMessageContent.textContent = '感谢您的提问，我们会尽快为您解答！';
                agentMessage.appendChild(agentMessageContent);
                chatBody.appendChild(agentMessage);
                
                // 自动滚动到底部
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);

            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    });

    // 按Enter键发送消息
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatSend.click();
        }
    });
}

// 意见反馈表单提交
const feedbackForm = document.getElementById('feedbackForm');
const feedbackSubmit = feedbackForm ? feedbackForm.querySelector('.form-submit') : null;

if (feedbackSubmit) {
    feedbackSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('feedback-name').value;
        const contact = document.getElementById('feedback-contact').value;
        const content = document.getElementById('feedback-content').value;

        if (name && contact && content) {
            alert('感谢您的反馈，我们已收到您的信息！');
            feedbackForm.reset();
            closeAllDialogs();
        } else {
            alert('请填写完整的反馈信息！');
        }
    });
}

// 热线咨询二维码弹窗显示与隐藏
const showHideQrPopup = (button, qrPopup) => {
    // 鼠标悬停显示
    button.addEventListener('mouseenter', () => {
        showElement(qrPopup);
    });
    
    // 鼠标离开隐藏
    button.addEventListener('mouseleave', () => {
        hideElement(qrPopup);
    });
    
    // 点击切换显示/隐藏
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        if (isVisible(qrPopup)) {
            hideElement(qrPopup);
        } else {
            // 隐藏其他所有的二维码弹窗
            document.querySelectorAll('.qr-popup').forEach(popup => {
                hideElement(popup);
            });
            showElement(qrPopup);
        }
    });
};

// 点击页面其他地方关闭二维码弹窗
document.addEventListener('click', () => {
    document.querySelectorAll('.qr-popup').forEach(popup => {
        hideElement(popup);
    });
});

// 获取热线咨询和关注我们的元素
const hotlineBtn = document.getElementById('hotline');
const followBtn = document.getElementById('follow-us');
const hotlineBox = document.getElementById('hotline-box');
const followBox = document.getElementById('follow-box');
const hotlineClose = document.getElementById('hotline-close');
const followClose = document.getElementById('follow-close');


// 关闭按钮事件
if (hotlineClose) {
    hotlineClose.addEventListener('click', () => {
        hideElement(hotlineBox);
    });
}

if (followClose) {
    followClose.addEventListener('click', () => {
        hideElement(followBox);
    });
}

// 点击页面其他地方关闭弹窗
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dialog-box') && 
        !e.target.closest('.tool-item')) {
        hideElement(hotlineBox);
        hideElement(followBox);
    }
});

// 防止弹窗内部点击关闭
if (hotlineBox) {
    hotlineBox.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

if (followBox) {
    followBox.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// 合作伙伴logo循环滚动效果
document.addEventListener('DOMContentLoaded', function() {
    const partnerTrack = document.querySelector('.partner-track');
    if (!partnerTrack) return;

    let isMouseOver = false;
    let animationId = null;
    let scrollPosition = 0;

    // 设置动画参数
    const scrollSpeed = 0.5; // 降低滚动速度使其更平滑
    const logos = partnerTrack.querySelectorAll('.partner-logo');
    const logoWidth = logos[0].offsetWidth;
    const originalSetWidth = logoWidth * (logos.length / 2); // 只计算原始logo的总宽度

    // 设置初始位置
    partnerTrack.style.transform = 'translateX(0)';

    function animate() {
        if (!isMouseOver) {
            scrollPosition -= scrollSpeed;
            
            // 当滚动到一半时（即原始logo的末尾），重置位置到开始
            if (Math.abs(scrollPosition) >= originalSetWidth) {
                scrollPosition = 0;
            }
            
            partnerTrack.style.transform = `translateX(${scrollPosition}px)`;
        }
        animationId = requestAnimationFrame(animate);
    }

    // 鼠标悬停时暂停滚动
    partnerTrack.addEventListener('mouseenter', () => {
        isMouseOver = true;
    });

    // 鼠标离开时继续滚动
    partnerTrack.addEventListener('mouseleave', () => {
        isMouseOver = false;
    });

    // 开始动画
    animate();

    // 页面不可见时暂停动画
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
});
