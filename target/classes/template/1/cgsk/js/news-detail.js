// 获取 URL 参数中的 id
const urlParams = new URLSearchParams(window.location.search);
const articleId = parseInt(urlParams.get('id'));

// 模拟文章数据
const articles = [
    {
        id: 1,
        title: '巴南区副区长杨昆一行莅临我司考察调研',
        date: '2024年12月18日',
        views: 1123,
        content: '11月27日上午，巴南区副区长杨昆率队考察重工数科，了解其数字课程平台在工程学院的使用及独特设计。喻旸总经理介绍了教评产品改造计划、平台对接方案及人工智能应用。重工数科将持续优化产品与服务，助力高校数字化转型。',
        image: '/template/1/cgsk/images/news/2.jpg'
    },
    {
        id: 2,
        title: '我司代表出席工程学院专升本教学专题会',
        date: '2024年12月09日',
        views: 998,
        content: '11月20日，重庆工程学院2024级专升本教学工作专题会在双桥校区召开，重工数科代表龙友红就数字课程平台试点情况作汇报，平台上线以来运行稳定、反馈良好，学生满意度高；与会领导对平台效果予以积极评价；下一阶段重工数科将持续优化，全新功能预计下学期上线。',
        image: '/template/1/cgsk/images/news/3.jpg'
    },
    {
        id: 3,
        title: '我司代表出席应用型人才培养体系建设推进会',
        date: '2024年11月04日',
        views: 876,
        content: '10月25日，重庆工程学院召开应用型人才培养推进会，重工数科代表参会。会议聚焦产教融合，明确数字化教学与混合式教学模式的重要性。喻旸总经理阐释数字课程平台定位及发展规划，双方就人才培养与课程建设达成深化共识，将正式启动线上线下混合式教学服务。',
        image: '/template/1/cgsk/images/news/4.jpg'
    },
    {
        id: 4,
        title: '巴南区委领导莅临我司考察调研',
        date: '2024年10月30日',
        views: 801,
        content: '近日，巴南区委书记等领导赴重工数科考察，工程学院及重工数科相关负责人陪同。领导们了解平台情况并听取公司发展汇报，给予肯定，赞许其设立前瞻性。重工数科将借此次考察深化合作，打造人才培养高地。',
        image: '/template/1/cgsk/images/news/5.jpg'
    },
    {
        id: 5,
        title: '我司2024年第二次股东会成功召开',
        date: '2024年10月14日',
        views: 805,
        content: '9月27日下午，重工数科2024年第二次股东会议于重庆工程学院行政大楼召开，会上总结筹备成果、规划四季度目标，王万均董事长和李德志总经理对公司实绩予以肯定并表示支持，重工数科将积极探索，书写智慧教育新篇。',
        image: '/template/1/cgsk/images/news/6.jpg'
    },
    {
        id: 6,
        title: '重工数科数字课程平台正式亮相工程学院',
        date: '2024年10月09日',
        views: 952,
        content: '9月20日新学期开学时，由我司设计研发的通关式学做一体化数字课程平台在重庆工程学院双桥校区正式投入使用，首周课后获师生积极评价，该平台是重工数科应新时代产学研用体系需求打造的教学产品第一弹，据实施成员现场反馈及校方问卷统计，平台操作性能良好、运行稳定、广受好评 。',
        image: '/template/1/cgsk/images/news/7.jpg'
    }
];

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

    // 上一篇 / 下一篇逻辑（使用数组索引）
    const prevArticle = articles[currentIndex - 1];
    const nextArticle = articles[currentIndex + 1];

    const prevLink = document.querySelector('.prev-article');
    const nextLink = document.querySelector('.next-article');

    // 先将上下篇链接显示出来
    if (prevLink) {
        if (prevArticle) {
            prevLink.style.display = 'block'; // 确保显示
            prevLink.href = `news-detail.html?id=${prevArticle.id}`;
            prevLink.querySelector('span').innerText = `上一篇：${prevArticle.title}`;
        } else {
            prevLink.style.display = 'none'; // 没有上一篇，隐藏
        }
    }

    if (nextLink) {
        if (nextArticle) {
            nextLink.style.display = 'block'; // 确保显示
            nextLink.href = `news-detail.html?id=${nextArticle.id}`;
            nextLink.querySelector('span').innerText = `下一篇：${nextArticle.title}`;
        } else {
            nextLink.style.display = 'none'; // 没有下一篇，隐藏
        }
    }
} else {
    const section = document.querySelector('.article-section');
    if (section) section.innerHTML = '<p>文章不存在。</p>';
}


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
        const href = this.getAttribute('href');

        // 确保 href 是有效的
        if (href && href !== '#') {
            const target = document.querySelector(href);

            // 如果目标元素存在，执行平滑滚动
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
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
                    <a href="news-detail.html?id=${article.id}" class="read-more">文章详情</a>
                </div>
            `;
            container.appendChild(card);
        });

        // 悬浮效果（可选）
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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');

        // 检查 href 是否有效并非 `#`，同时确认目标元素存在
        if (href && href !== '#' && document.querySelector(href)) {
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn('无效的锚点链接:', href);
        }
    });
});

