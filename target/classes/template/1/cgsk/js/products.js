$(document).ready(function() {
    // 处理URL中的锚点，显示对应的卡片内容
    function handleHashChange() {
        var hash = window.location.hash;
        if (hash === '#yiwu-card') {
            $('#yiwu-card').addClass('active');
            $('#university-card').removeClass('active');
            $('#yiwu-btn').addClass('active');
            $('#university-btn').removeClass('active');
            // 如果不是来自按钮点击，则执行平滑滚动
            if (!window.skipScroll) {
                $('html, body').animate({
                    scrollTop: $('.product-qt').offset().top - 80
                }, 800);
            }
            window.skipScroll = false;
        } else if (hash === '#university-card') {
            $('#university-card').addClass('active');
            $('#yiwu-card').removeClass('active');
            $('#university-btn').addClass('active');
            $('#yiwu-btn').removeClass('active');
            // 如果不是来自按钮点击，则执行平滑滚动
            if (!window.skipScroll) {
                $('html, body').animate({
                    scrollTop: $('.product-qt').offset().top - 80
                }, 800);
            }
            window.skipScroll = false;
        }
    }

    // 页面加载时处理锚点
    handleHashChange();

    // 监听URL hash变化
    $(window).on('hashchange', handleHashChange);
    
    // 处理顶部导航菜单中的内部链接
    $('.page-link').click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        window.skipScroll = false;
        
        // 根据目标ID切换卡片显示
        if (target === '#yiwu-card') {
            $('#yiwu-card').addClass('active');
            $('#university-card').removeClass('active');
            $('#yiwu-btn').addClass('active');
            $('#university-btn').removeClass('active');
        } else if (target === '#university-card') {
            $('#university-card').addClass('active');
            $('#yiwu-card').removeClass('active');
            $('#university-btn').addClass('active');
            $('#yiwu-btn').removeClass('active');
        }
        
        // 平滑滚动到目标位置
        $('html, body').animate({
            scrollTop: $('.product-qt').offset().top - 80
        }, 800);
        
        // 更新URL但不刷新页面
        history.pushState(null, null, target);
    });
    
    // 处理页脚中的内部锚点链接
    $('.footer-link[href^="#"]').click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        window.skipScroll = false;
        
        // 根据目标ID切换卡片显示
        if (target === '#yiwu-card') {
            $('#yiwu-card').addClass('active');
            $('#university-card').removeClass('active');
            $('#yiwu-btn').addClass('active');
            $('#university-btn').removeClass('active');
        } else if (target === '#university-card') {
            $('#university-card').addClass('active');
            $('#yiwu-card').removeClass('active');
            $('#university-btn').addClass('active');
            $('#yiwu-btn').removeClass('active');
        }
        
        // 平滑滚动到目标位置
        $('html, body').animate({
            scrollTop: $('.product-qt').offset().top - 80
        }, 800);
        
        // 更新URL但不刷新页面
        history.pushState(null, null, target);
    });

    // 切换卡片内容的功能 - product-qt部分
    $('#yiwu-btn').click(function(e) {
        e.preventDefault();
        window.skipScroll = true;
        $('#yiwu-card').addClass('active');
        $('#university-card').removeClass('active');
        $('#yiwu-btn').addClass('active');
        $('#university-btn').removeClass('active');
        // 更新URL而不刷新页面
        history.pushState(null, null, '#yiwu-card');
    });
    
    $('#university-btn').click(function(e) {
        e.preventDefault();
        window.skipScroll = true;
        $('#university-card').addClass('active');
        $('#yiwu-card').removeClass('active');
        $('#university-btn').addClass('active');
        $('#yiwu-btn').removeClass('active');
        // 更新URL而不刷新页面
        history.pushState(null, null, '#university-card');
    });
    
    // 产品卡片切换功能
    $('.tab-button').click(function() {
        var targetTab = $(this).data('tab');
        
        // 移除所有按钮和卡片的active类
        $('.tab-button').removeClass('active');
        $('.product-tab').removeClass('active');
        
        // 添加active类到被点击的按钮和对应的卡片
        $(this).addClass('active');
        $('#' + targetTab).addClass('active');
    });

    // 添加按钮点击波纹效果
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建波纹元素
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // 设置波纹位置
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // 添加波纹到按钮
            button.appendChild(ripple);
            
            // 动画结束后移除波纹元素
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
});