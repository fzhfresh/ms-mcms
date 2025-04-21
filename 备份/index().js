$(document).ready(function () {
    // 动态加载头部
    $('#header').load('/template/1/cgsk/header.html', function() {
        // 初始化移动菜单
        initMobileMenu();

        // 初始化导航项
        initNavItems();

        // 初始化导航栏跟随滚动
        initStickyNav();
    });

    // 动态加载底部
    $('#footer').load('/template/1/cgsk/footer.html');
});

// 初始化移动菜单
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            mobileMenuBtn.innerHTML = navMenu.classList.contains("active")
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
    }
}

// 初始化导航项
function initNavItems() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            if (window.innerWidth <= 992) {
                const dropdown = item.querySelector(".dropdown");
                if (dropdown && e.target.closest(".nav-link")) {
                    e.preventDefault();
                    const isOpen = dropdown.style.maxHeight === "500px" || dropdown.style.maxHeight === "";
                    dropdown.style.maxHeight = isOpen ? "0" : "500px";
                } else {
                    navMenu.classList.remove("active");
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
}

// 初始化导航栏跟随滚动
function initStickyNav() {
    const navContainer = document.querySelector(".nav-container");

    if (navContainer) {
        navContainer.addEventListener("scroll", function() {
            // 确保 nav-container 有一个 scroll 事件监听器
            // 但是通常 nav-container 不会触发 scroll 事件
            // 我们需要监听 window 的 scroll 事件
        });
    }
}

window.addEventListener("resize", () => {
    const navMenu = document.querySelector(".nav-menu");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

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
    productInterval = setInterval(nextProductSlide, 8000); // 确保这里调用的是 nextProductSlide
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
                const navMenu = document.querySelector(".nav-menu");
                const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
                navMenu.classList.remove("active");
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
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
            modalVideo.querySelector('source').src = videoSrc;
            modalVideo.load();
            videoModal.style.display = 'block';
            document.body.classList.add('modal-open');
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
    modalVideo.pause();
    videoModal.style.display = 'none';
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
        dialog.btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (currentOpenDialog === key) {
                hideElement(dialog.box);
                currentOpenDialog = null;
                return;
            }

            closeAllDialogs();
            showElement(dialog.box);
            currentOpenDialog = key;
        });

        dialog.close.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            hideElement(dialog.box);
            currentOpenDialog = null;
        });

        dialog.box.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        hideElement(dialog.box);
    }
});

// 点击页面其他地方关闭所有对话框
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dialog-box') &&
        !e.target.closest('.tool-item')) {
        closeAllDialogs();
    }
});

// 客服消息发送功能
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatBody = document.getElementById('chat-body');

if (chatSend && chatInput && chatBody) {
    chatSend.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            const userMessage = document.createElement('div');
            userMessage.classList.add('chat-message', 'user');
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            messageContent.textContent = message;
            userMessage.appendChild(messageContent);
            chatBody.appendChild(userMessage);

            setTimeout(() => {
                const agentMessage = document.createElement('div');
                agentMessage.classList.add('chat-message', 'agent');
                const agentMessageContent = document.createElement('div');
                agentMessageContent.classList.add('message-content');
                agentMessageContent.textContent = '感谢您的提问，我们会尽快为您解答！';
                agentMessage.appendChild(agentMessageContent);
                chatBody.appendChild(agentMessage);

                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);

            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    });

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
    button.addEventListener('mouseenter', () => {
        showElement(qrPopup);
    });

    button.addEventListener('mouseleave', () => {
        hideElement(qrPopup);
    });

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isVisible(qrPopup)) {
            hideElement(qrPopup);
        } else {
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

// 防止弹窗内部点击关闭
const hotlineBox = document.getElementById('hotline-box');
const followBox = document.getElementById('follow-box');

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
    const scrollSpeed = 0.5;
    const logos = partnerTrack.querySelectorAll('.partner-logo');
    const logoWidth = logos[0].offsetWidth;
    const originalSetWidth = logoWidth * (logos.length / 2);

    partnerTrack.style.transform = 'translateX(0)';

    function animate() {
        if (!isMouseOver) {
            scrollPosition -= scrollSpeed;
            if (Math.abs(scrollPosition) >= originalSetWidth) {
                scrollPosition = 0;
            }
            partnerTrack.style.transform = `translateX(${scrollPosition}px)`;
        }
        animationId = requestAnimationFrame(animate);
    }

    partnerTrack.addEventListener('mouseenter', () => {
        isMouseOver = true;
    });

    partnerTrack.addEventListener('mouseleave', () => {
        isMouseOver = false;
    });

    animate();

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
});

// 最新动态
const articles = [
    {
        id: 1,
        title: '巴南区副区长杨昆一行莅临我司考察调研',
        date: '2025年2月21日',
        views: 1123,
        content: '近日，巴南区委领导考察调研重工数科，肯定其发展成果，赞许其前瞻性，重工数科将借此深化与政府合作，打造技术人才培养高地。',
        image: 'https://picsum.photos/600/400'
    },
    {
        id: 2,
        title: '我司代表出席工程学院专升本教学专题会',
        date: '2024年12月18日',
        views: 998,
        content: '11月20日重庆工程学院专升本教学工作专题会上，重工数科代表汇报教学课程平台试点实施情况，下阶段将优化平台并引入更多优质课程，新功能预计下半年上线。',
        image: 'https://picsum.photos/600/401'
    },
    {
        id: 3,
        title: '我司代表出席应用型人才培养体系建设推进会',
        date: '2024年12月9日',
        views: 876,
        content: '10月25日重庆工程学院应用型人才培养体系建设推进会上，重工数科代表介绍教学课程平台情况，会议深化共识，重工数科将配合各学科领域推进教学改革并开展线上线下混合式教学服务。',
        image: 'https://picsum.photos/600/402'
    },
    {
        id: 4,
        title: '巴南区委领导莅临我司考察调研',
        date: '2024年11月4日',
        views: 801,
        content: '近日，巴南区委书记等领导赴重工数科考察，了解平台情况并听取公司发展汇报，给予肯定，赞许其设立前瞻性。',
        image: 'https://picsum.photos/600/403'
    }
];

const main = document.querySelector('.news-main');
const mainData = articles[0];
if (main && mainData) {
    main.href = `news-detail.html?id=${mainData.id}`;
    const img = main.querySelector('.news-image img');
    const year = main.querySelector('.news-date .year');
    const day = main.querySelector('.news-date .day');
    const title = main.querySelector('.news-title');
    const desc = main.querySelector('.news-desc');

    if (img) img.src = mainData.image;
    if (img) img.alt = mainData.title;
    if (year) year.textContent = mainData.date.split('年')[0] + '年';
    if (day) day.textContent = mainData.date.split('年')[1].split('月')[0] + '月';
    if (title) title.textContent = mainData.title;
    if (desc) desc.textContent = mainData.content.slice(0, 60) + '...';
}

const items = document.querySelectorAll('.news-item');
for (let i = 0; i < items.length; i++) {
    const article = articles[i + 1]; // 从第二条开始
    if (!article) continue;
    const item = items[i];
    item.href = `news-detail.html?id=${article.id}`;

    const year = item.querySelector('.year');
    const month = item.querySelector('.month');
    const title = item.querySelector('.news-item-title');
    const desc = item.querySelector('.news-item-desc');

    if (year) year.textContent = article.date.split('年')[0] + '年';
    if (month) month.textContent = article.date.split('年')[1].split('月')[0] + '月';
    if (title) title.textContent = article.title;
    if (desc) desc.textContent = article.content.slice(0, 50) + '...';
}
