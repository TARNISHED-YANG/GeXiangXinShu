const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // 移除观察避免重复触发
            observer.unobserve(entry.target);
        }
    });
}, {
    rootMargin: "-20% 0px",  // 提前20%视口触发
    threshold: 0.1
});

// 批量观察所有元素
document.querySelectorAll('.slide_in').forEach(box => {
    // 设置随机延迟增强视差效果
    // box.style.transitionDelay = `${Math.random() * 0.5}s`;
    observer.observe(box);
});

const slider = document.getElementById('slider');
const rounds_pics = document.querySelector('.rounds');
const images = Array.from(document.querySelectorAll('.rounds img'));
const text = document.querySelector('.poly_times');
const cut_pics = document.querySelector('.cut_pics');
let round_intro_flag=false;
function changeV() {
    spdVal = parseFloat(slider.value);
    const speedPercent = parseFloat(spdVal);
    slider.style.background = `linear-gradient(to right, #ffa200, white ${speedPercent}%, white`
};

function showImage(index) {
    images.forEach((img, i) => {
      img.style.opacity = i === index ? 1: 0;
      img.style.transition = 'opacity 0.5s ease'; // 添加过渡动画
    });
  }
  
  slider.addEventListener('input', function() {
    const value = parseInt(this.value);
    const index = value/25; 
    if (index !== -1) showImage(index);
    if(index==0) text.textContent='4';
    if(index==1) text.textContent='8';
    if(index==2) text.textContent='16';
    if(index==3) text.textContent='32';
    if(index==4) text.textContent='16384';
    if(!round_intro_flag)
    {
        round_intro_flag=true;
        cut_imgs =  Array.from(document.querySelectorAll('.cut_pics img'));
        cut_imgs.forEach((img, i) => {
            setTimeout(() => {
                img.classList.add('active');
              }, i * 300); // 延迟 i*100 毫秒
          });
    }
  });

showImage(0);