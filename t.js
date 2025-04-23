const createObserver = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                handleElementIntersection(entry.target, observer);
            }
        });
    }, { rootMargin: "-10% 0px", threshold: 0 });

    return observer;
};
const handleElementIntersection = (target, observer) => {
    target.classList.add('active');
    // 停止观察当前元素
    observer.unobserve(target);
};

const init_chara =() =>
{
    let state=0;
    const chara=document.querySelector('.moon_chara');
    const button=document.querySelector('.moon_button');
    const title=document.querySelector('.little_title');
    const intro=document.querySelector('.intro');
    const m_e=document.querySelector('.moon_earth_img');
    
    chara.addEventListener('click',()=>
    {
        if(state==0)
        {
            button.style.opacity=0;
            title.style.opacity=0;
            intro.style.opacity=1;
            chara.classList.add('change');
            m_e.classList.add('change');
           
            state=1;
        }
        else if(state==1)
        {
            button.style.opacity=1;
            title.style.opacity=1;
            intro.style.opacity=0;
            m_e.classList.remove('change');
            chara.classList.remove('change');
            state=0;
        }
        console.log(m_e);
    }   
    )
}

const init_moon_button = () => {
    const moonButton = document.querySelector('.moon_button');
    const moonImages = document.querySelectorAll('.moon_chara img');
    let currentIndex = 0;

    moonButton.addEventListener('click', () => {
        // 将所有图片的透明度设置为 0
        if(moonButton.style.opacity==0)
        {
            return;
        }
        moonImages.forEach((img, index) => {
            img.style.opacity = 0;
        });

        // 将当前图片的透明度设置为 1
        moonImages[currentIndex].style.opacity = 1;

        // 更新当前索引，循环显示
        currentIndex = (currentIndex + 1) % moonImages.length;
    });

    // 初始化显示第一张图片
    moonImages[currentIndex].style.opacity = 1;
};

const initialize = () => {
    const observer = createObserver();

    // 批量观察所有 .slide_in 元素
    document.querySelectorAll('.slide_in').forEach(box => {
        box.style.transitionDelay = `${Math.random() * 1}s`;
        observer.observe(box);
    });
    init_moon_button();
    init_chara();
};


window.addEventListener('DOMContentLoaded', initialize);