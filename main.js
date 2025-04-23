document.addEventListener("DOMContentLoaded", function() {
    const jumpTo = document.querySelector('.jump_to');
    const firstPage = document.querySelector('.first_page');
    const firstPageImg = document.querySelector('.first_page #first_page_book_name'); // 获取 img 元素
    const intro = document.querySelector('.intro');
    const star = document.querySelector('.first_page .star_image'); 
    const chap = document.querySelector('.four_chap');
    const chapItems = document.querySelectorAll('.four_chap > div'); // 获取所有 chap 元素
    const starImages = document.querySelectorAll('.first_page .star_image'); // 获取所有 star 图片
    console.log(chap);
    let flag = 0; // 标志位
    chap.style.opacity = '0'; // 明确初始状态

    jumpTo.addEventListener('click', function() {
        if (flag == 0) { // 仅在未缩放时执行
            firstPage.classList.add('shrink');
            firstPageImg.style.opacity = '0'; // 设置 img 元素透明度
            flag = 1; // 设置标志位为 true
            intro.style.opacity = '1'; // 设置 intro 元素透明度
            jumpTo.textContent = '继续点击';
            star.style.opacity = '1';
        } else if (flag == 1) {
            console.log(1);
            flag = 2;
            jumpTo.style.opacity = '0';
            jumpTo.style.cursor = 'default'; // 设置光标样式为默认
            jumpTo.style.pointerEvents = 'none'; // 禁用点击事件
            jumpTo.style.zIndex = '-3'; // 改变 Z-index
            chap.style.zIndex = '3'; // 改变 Z-index
            firstPage.classList.add('mid'); // 添加 mid 状态
            intro.style.opacity = '0';
            chap.style.opacity = '1';
        }
    });

    // 为每个 chap 元素添加鼠标悬停事件监听器
    chapItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() { // 改用 mouseenter
            console.log('mouseenter');
            if (flag === 2) {
                starImages.forEach((img, imgIndex) => {
                    img.style.transition = 'opacity 0.3s'; // 添加过渡动画
                    img.style.opacity = imgIndex === index ? '1' : '0';
                });
            }
        });
    });
});