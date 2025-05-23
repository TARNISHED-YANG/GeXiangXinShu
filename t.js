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
    const m_e=document.querySelector('.moon_earth_imgs');
    
    //chara.addEventListener('click',()=>
    button.addEventListener('click',()=>
    {
        console.log(1)
        if(state==0)
        {
            //更改 button 图片
            button.src="part_2/Webpage_2_3/button_2.png";
            title.style.opacity=0;
            intro.style.opacity=1;
            chara.classList.add('change');
            m_e.classList.add('change');
           
            state=1;
        }
        else if(state==1)
        {
           //更改 button 图片
           button.src="part_2/Webpage_2_3/button_1.png";
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
    const chara = document.querySelector('.moon_chara');
    const moon_chara = document.querySelectorAll('.moon_chara img');
    const moon_images=document.querySelectorAll('.moon_earth_imgs img');
    const moon_text=document.querySelector('.intro .intro_text')
    console.log(moon_images)
    let currentIndex = 0;
    texts =
    [
        "月初无月（农历初一）“月与日同度，则光体皆晦，人不可见，谓之合朔。”解释：朔为日月同经的时刻，月球完全背对太阳，暗面朝向地球，故初一不可见",
        "半月（初七/初八）“月体分阴阳，向日为阳，背日为阴。上弦月，阳在西而阴在东。”解释：上弦月时，月球西侧被照亮。",
        "满月（农历十五或十六）“若遇望夜，则日月躔度相对，一边光处全向于地，普照人间；一边暗处全向于天，人所不见。” 解释：望时地球位于日月之间，月球受光面完全朝向地球，形成满月。",
        "半月（廿二/廿三）“自朔而望，阳渐长而阴消；自望而晦，阴渐长而阳退。弦者，阴阳平分之象也。下弦月，阳在东而阴在西。”  解释：下弦月时，月球东侧被照亮。",
        "月末无月之夜（农历廿九或三十) “光尽体伏谓之晦，谓三十日，不见也。” 解释：晦为月末无月之夜，此时月光完全消失，人不可见，对应农历三十日或小月二十九日。"
    ]
    console.log(currentIndex)
    chara.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % moon_chara.length;
         // 将所有图片的透明度设置为 0
        moon_chara.forEach((img, index) => {
            img.style.opacity = 0;
        });
        moon_images.forEach((img, index) => {
            img.style.opacity = 0;
        });
        console.log(texts[currentIndex]);
        moon_text.textContent = texts[currentIndex]; // 更新文本
        // 将当前图片的透明度设置为 1
        moon_chara[currentIndex].style.opacity = 1;
        moon_images[currentIndex].style.opacity = 1;
        // 更新当前索引，循环显示
    });

    // 初始化显示第一张图片
    moon_text.textContent = texts[currentIndex]; 
    moon_chara[currentIndex].style.opacity = 1;
    moon_images[currentIndex].style.opacity = 1;
};
const init_jump_to =()=>
{
    const jump_imgs = document.querySelectorAll(".book_part .slide_img")
    var to = 2400
    jump_imgs[2].addEventListener("click", function () {
        window.scrollTo({
            top: to,
            behavior: "smooth"
        });
    })
    jump_imgs[6].addEventListener("click", function () {
        window.scrollTo({
            top: to,
            behavior: "smooth"
        });
    })
}
const initialize = () => {
    const observer = createObserver();

    // 批量观察所有 .slide_in 元素
    document.querySelectorAll('.slide_in').forEach(box => {
        box.style.transitionDelay = `${Math.random() * 1}s`;
        observer.observe(box);
    });
    init_moon_button();
    init_chara();
    init_jump_to();
};



window.addEventListener('DOMContentLoaded', initialize);