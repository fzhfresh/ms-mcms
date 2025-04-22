// 获取 URL 参数中的 id
const urlParams = new URLSearchParams(window.location.search);
const articleId = parseInt(urlParams.get('id'));

// 从 JSON 文件中获取文章数据并渲染
fetch('/template/1/cgsk/data/articles.json')
    .then(response => response.json())
    .then(articles => {
        // 根据 ID 查找当前文章在数组中的索引
        const currentIndex = articles.findIndex(a => a.id === articleId);
        const article = articles[currentIndex];

        if (article) {
            document.title = article.title;

            const titleElem = document.querySelector('.article-title');
            const dateElem = document.querySelector('.article-date');
            const viewsElem = document.querySelector('.article-views');
            const textElem = document.querySelector('.article-text');
            const imageElem = document.querySelector('.article-image img');

            if (titleElem) titleElem.innerText = article.title;
            if (dateElem) dateElem.innerText = article.date;
            if (viewsElem) viewsElem.innerHTML = `<i class="fas fa-eye"></i> ${article.views}`;
            if (textElem) textElem.innerHTML = `<p>${article.content}</p>`;
            if (imageElem) imageElem.src = article.image;

            // 上一篇 / 下一篇逻辑
            const prevArticle = articles[currentIndex - 1];
            const nextArticle = articles[currentIndex + 1];

            const prevLink = document.querySelector('.prev-article');
            const nextLink = document.querySelector('.next-article');

            if (prevLink) {
                if (prevArticle) {
                    prevLink.style.display = 'block';
                    prevLink.href = `index.html?id=${prevArticle.id}`;
                    const prevSpan = prevLink.querySelector('span');
                    if (prevSpan) {
                        prevSpan.innerText = `上一篇：${prevArticle.title}`;
                    }
                } else {
                    prevLink.style.display = 'none';
                }
            }

            if (nextLink) {
                if (nextArticle) {
                    nextLink.style.display = 'block';
                    nextLink.href = `index.html?id=${nextArticle.id}`;
                    const nextSpan = nextLink.querySelector('span');
                    if (nextSpan) {
                        nextSpan.innerText = `下一篇：${nextArticle.title}`;
                    }
                } else {
                    nextLink.style.display = 'none';
                }
            }

        } else {
            const section = document.querySelector('.article-section');
            if (section) section.innerHTML = '<p>文章不存在。</p>';
        }
    })
    .catch(error => {
        console.error('加载文章数据失败:', error);
    });



// 分享功能
document.querySelectorAll('.share-btn').forEach(btn => {
    //微信鼠标悬停时显示二维码
    btn.addEventListener('mouseenter', (e) => {
        const type = btn.classList[1];
        const title = document.querySelector('.article-title')?.textContent || '';
        const url = window.location.href;

        if (type === 'weixin') {
            const qrContainer = document.getElementById('weixin-qrcode');
            qrContainer.innerHTML = '';
            new QRCode(qrContainer, {
                text: url,
                width: 150,
                height: 150
            });
            qrContainer.style.display = 'block';
        }
    });
    btn.addEventListener('mouseleave', () => {
        const qrContainer = document.getElementById('weixin-qrcode');
        qrContainer.style.display = 'none';
    });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const type = btn.classList[1]; // 获取分享类型 weixin / weibo / qq
        const title = document.querySelector('.article-title')?.textContent || '';
        const url = window.location.href;

        switch (type) {
            case 'weixin':
                break;
            case 'weibo':
                window.open(`http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
                break;
            case 'qq':
                window.open(`http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
                break;
        }
    });
});

// 平滑滚动锚点（排除无效 href）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');

        // 确保 href 是有效的，并且是一个 DOM 元素的选择器
        if (href && href !== '#' && document.querySelector(href)) {
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn('无效的锚点链接:', href);
        }
    });
});

// 阅读进度条
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// 图片点击放大
document.querySelectorAll('.article-image img').forEach(img => {
    img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            cursor: pointer;
        `;
        const largeImg = document.createElement('img');
        largeImg.src = img.src;
        largeImg.style.cssText = `
            max-width: 90%;
            max-height: 90vh;
            object-fit: contain;
        `;
        overlay.appendChild(largeImg);
        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => overlay.remove());
    });
});

// 动态加载 articles.json 并渲染新闻列表
fetch('/template/1/cgsk/data/articles.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('news-list');
        if (!container) {
            console.warn('找不到 #news-list 容器，跳过渲染。');
            return;
        }

        data.forEach(article => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.innerHTML = `
                <div class="news-image">
                    <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="news-content">
                    <h3 class="news-title">${article.title}</h3>
                    <div class="news-date">${article.date}</div>
                    <p class="news-excerpt">${article.content.substring(0, 60)}...</p>
                    <a href="index.html?id=${article.id}" class="read-more">文章详情</a>
                </div>
            `;
            container.appendChild(card);
        });

        // 悬浮效果
        document.querySelectorAll('.news-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    })
    .catch(error => {
        console.error('加载新闻数据失败:', error);
    });

// 分页点击效果
document.querySelectorAll('.pagination a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.pagination a.active')?.classList.remove('active');
        link.classList.add('active');
    });
});

// 平滑锚点跳转（如有）
document.querySelectorAll('.prev-article, .next-article').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // 阻止默认行为
        const href = this.href;  // 获取链接的 href

        // 直接跳转到链接地址
        window.location.href = href;
    });
});
