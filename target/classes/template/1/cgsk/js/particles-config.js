// 外部粒子配置
const outerParticlesConfig = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 1000
            }
        },
        color: {
            value: ["#e3f2fd", "#bbdefb", "#90caf9"]
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.2,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 120,
            color: "#90caf9",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "bounce",
            bounce: true,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "repulse"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 0.4
                }
            },
            repulse: {
                distance: 150,
                duration: 0.4
            }
        }
    },
    retina_detect: true
};

// 内部粒子配置（产品卡片）
const particlesConfig1 = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ["#e3f2fd", "#bbdefb"]
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.4,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 2,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.5,
                sync: false
            }
        },
        line_linked: {
            enable: false
        },
        move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce",
            bounce: true,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "bubble"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 100,
                size: 4,
                duration: 2,
                opacity: 0.8,
                speed: 3
            },
            push: {
                particles_nb: 3
            }
        }
    },
    retina_detect: true
};

// 初始化两个粒子效果
document.addEventListener("DOMContentLoaded", function() {
    // 初始化外部粒子
    if (document.getElementById('particles-js-outer')) {
        particlesJS('particles-js-outer', outerParticlesConfig);
    }
    
    // 初始化内部粒子
    if (document.getElementById('particles-js-1')) {
        particlesJS('particles-js-1', particlesConfig1);
    }
});