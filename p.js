const initCardHover = () => {
    const wrappers = document.querySelectorAll('.card-wrapper');
    const lightPics = document.querySelectorAll('.light_pic .pin_hole');
    

    wrappers.forEach(wrapper => {
        let currentActive = null;
        
        // 鼠标进入包装容器
        wrapper.addEventListener('mouseenter', () => {
            const index = parseInt(wrapper.dataset.index);
            console.log(index);
            currentActive = index; 

            // 隐藏所有非默认图片
            lightPics.forEach((img, i) => {
                img.style.opacity = 0;
            });

            // 显示对应图片
            if(lightPics[currentActive]) {
                lightPics[currentActive].style.opacity = 1;
            }
        });

        // 鼠标离开包装容器
        wrapper.addEventListener('mouseleave', () => {
            // 恢复默认显示
            lightPics.forEach((img, i) => {
                img.style.opacity = i === 0 || i === 6 ? 1 : 0;
            });
        });
    });
};
// 创建观察器
const createObserver = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                handleElementIntersection(entry.target, observer);
            }
        });
    }, { rootMargin: "-40% 0px", threshold: 0 });

    return observer;
};

// 处理元素进入视口的逻辑
const handleElementIntersection = (target, observer) => {
    target.classList.add('active');

    // 仅为 .slide_intro 元素绑定点击事件
    if (target.classList.contains('slide_intro')) {
        bindClickEvent(target, observer);
    }


    // 停止观察当前元素
    observer.unobserve(target);
};


// 绑定点击事件
const bindClickEvent = (target, observer) => {
    const handleClick = () => {
        // 移除 active 类以触发滑出动画
        target.classList.remove('active');
        const imgs_box=document.querySelectorAll('.cards')[0];
        setTimeout(() => {
            imgs_box.classList.add('active');
        }, 500);
        const label=document.querySelector('.light_label');
        label.style.opacity=0;
        // 过渡结束后不再观察该元素
        target.addEventListener('transitionend', () => {
            // 不再重新观察该元素
        }, { once: true });
    };

    // 绑定点击事件（仅触发一次）
    target.addEventListener('click', handleClick, { once: true });
};

//sun-moon 轨迹切换逻辑
const init_button = () => {
    let sun_state=1;//1 为显示状态
    const sun_button=document.querySelector('.sun_button');
    const sun_path=document.querySelector('.sun_path');
    sun_button.addEventListener('click', () => {
       if(sun_state==1)
       {
            sun_button.style.opacity=0.5;
            sun_path.style.opacity=0;
            sun_state=0;
       }
       else 
       {
            sun_button.style.opacity=1;
            sun_path.style.opacity=1;
            sun_state=1;
       }
    });

    let moon_state=1;//1 为显示状态
    const moon_button=document.querySelector('.moon_button');
    const moon_path=document.querySelector('.moon_path');
    moon_button.addEventListener('click', () => {
       if(moon_state==1)
       {
            moon_button.style.opacity=0.5;
            moon_path.style.opacity=0;
            moon_state=0;
       }
       else 
       {
            moon_button.style.opacity=1;
            moon_path.style.opacity=1;
            moon_state=1;
       }
    });
}
//初始化 shadow——part 的文字切换逻辑
const init_year = () => {
    const texts= ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE'];
    let index=0;
    const text_element = document.querySelector('.year_content');
    const prev_button = document.querySelector('.year_prev');
    const next_button = document.querySelector('.year_next');
    function update_text(direction) {
     //防止需要等待动画，使用setTimeOut
     setTimeout(() => {
         if (direction === 'prev')
        {
             index = (index - 1 + texts.length) % texts.length;
         } else {
             index = (index + 1) % texts.length;
         }
         text_element.textContent = texts[index];
         // 恢复不透明
     }, 1); // 这个时间需要和CSS过渡时间保持一致
    }
     prev_button.addEventListener('click', () => update_text('prev'));
     next_button.addEventListener('click', () => update_text('next'));
}
// 初始化函数
const initialize = () => {
    const observer = createObserver();

    // 批量观察所有 .slide_in 元素
    document.querySelectorAll('.slide_in').forEach(box => {
        box.style.transitionDelay = `${Math.random() * 0.5}s`;
        observer.observe(box);
    });
    initCardHover();
    init_button();  
    init_year();
};

// 页面加载完成后执行初始化
window.addEventListener('DOMContentLoaded', initialize);