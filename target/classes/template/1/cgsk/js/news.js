// 新闻卡片悬停效果
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// 分页点击效果
document.querySelectorAll('.pagination a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.pagination a.active')?.classList.remove('active');
        link.classList.add('active');
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 动态加载新闻数据并渲染新闻卡片
fetch('/template/1/cgsk/data/articles.json')
    .then(response => response.json())
    .then(data => {
        // 按时间排序（最新的新闻排在前面）
        data.sort((a, b) => {
            const dateA = new Date(a.date.replace('年', '-').replace('月', '-').replace('日', ''));
            const dateB = new Date(b.date.replace('年', '-').replace('月', '-').replace('日', ''));
            return dateB - dateA;  // 降序排列
        });

        const container = document.getElementById('news-list');

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
                    <a href="../newsDetail/news-detail.html?id=${article.id}" class="read-more">文章详情</a>
                </div>
            `;
            container.appendChild(card);
        });

        // 添加悬停效果
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

// 分页点击效果（如果有分页）
document.querySelectorAll('.pagination a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.pagination a.active')?.classList.remove('active');
        link.classList.add('active');
    });
});

// 平滑滚动锚点跳转
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
