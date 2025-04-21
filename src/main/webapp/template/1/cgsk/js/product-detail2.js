$(document).ready(function() {
    // 视频播放按钮点击事件
    $('.play-button').click(function() {
        const videoContainer = $(this).parent();

        // 后端获取视频路径, 通过 AJAX 请求获取视频流
        const videoId = 4;  // 这里可以是动态获取的 ID
        const videoUrl = `/SelectVideo/policemen/${videoId}`;

        // 创建 video 元素并播放视频
        const videoElement = $('<video controls autoplay>')
            .attr({
                'width': '100%',
                'height': '100%',
                'poster': '/template/1/cgsk/img/test3.jpg'
            })
            .html(`<source src="${videoUrl}" type="video/mp4">`);

        // 替换视频占位符为视频播放器
        videoContainer.html(videoElement);
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

        $('section').each(function() {
            const sectionTop = $(this).offset().top;

            if (scrollTop + windowHeight * 0.8 > sectionTop) {
                $(this).addClass('animated');
            }
        });

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

    // 星空风格的粒子效果配置
    particlesJS('particles-js-detail2', {
        "particles": {
            "number": {
                "value": 120,
                "density": {
                    "enable": true,
                    "value_area": 1000
                }
            },
            "color": {
                "value": ["#ffffff", "#87CEEB", "#00BFFF", "#1E90FF"]
            },
            "shape": {
                "type": ["circle", "star"],
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.6,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.5,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 2.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 200,
                "color": "#87CEEB",
                "opacity": 0.15,
                "width": 0.8
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "bounce",
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
                    "mode": "connect"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "connect": {
                    "distance": 150,
                    "line_linked": {
                        "opacity": 0.3
                    },
                    "radius": 150
                },
                "push": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}); 