$(document).ready(function() {
    // 视频播放按钮点击事件
    $('.play-button').click(function() {
        // 这里可以替换为真实的视频播放逻辑
        // 示例：用iframe嵌入视频
        const videoContainer = $(this).parent();
        const videoFrame = $('<iframe>').attr({
            'src': 'video/1.mp4',
            'frameborder': '0',
            'allowfullscreen': 'true',
            'width': '100%',
            'height': '100%'
        });
        
        videoContainer.html(videoFrame);
    });

    // 特性卡片动画效果
    $('.feature-card').hover(
        function() {
            $(this).find('.feature-icon').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.feature-icon').css('transform', 'scale(1)');
        }
    );

    // 滚动动画效果
    $(window).scroll(function() {
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        
        // 为每个section添加动画
        $('section').each(function() {
            const sectionTop = $(this).offset().top;
            
            if (scrollTop + windowHeight * 0.8 > sectionTop) {
                $(this).addClass('animated');
            }
        });
        
        // 为特性卡片添加延迟动画
        if ($('.feature-cards').length) {
            const featureCardsTop = $('.feature-cards').offset().top;
            
            if (scrollTop + windowHeight * 0.8 > featureCardsTop) {
                $('.feature-card').each(function(index) {
                    setTimeout(() => {
                        $(this).addClass('animated');
                    }, index * 200);
                });
            }
        }
    });

    // 触发初始滚动检查以处理已可见的元素
    $(window).trigger('scroll');
    
    // 平滑滚动到锚点
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.hash);
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 800);
        }
    });
});

// 粒子效果配置
particlesJS('particles-js-detail', {
    "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 1000
            }
        },
        "color": {
            "value": ["#4fc3f7", "#29b6f6", "#03a9f4", "#b3e5fc"]
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            }
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 0.8,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 4,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1.5,
                "size_min": 0.5,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "enable": true,
            "speed": 3,
            "direction": "bottom",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": ["grab", "bubble"]
            },
            "onclick": {
                "enable": true,
                "mode": ["push", "repulse"]
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 150,
                "line_linked": {
                    "opacity": 0.3
                }
            },
            "bubble": {
                "distance": 150,
                "size": 8,
                "duration": 2,
                "opacity": 0.8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 2
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// 监听滚动事件，添加动画效果
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const featureCards = document.querySelectorAll('.feature-card');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animated');
            }
        });
        
        featureCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.75) {
                card.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 初始检查
}); 