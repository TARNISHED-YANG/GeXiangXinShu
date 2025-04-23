document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.button');
    button.textContent = '旋转图片';
    const pic = document.querySelectorAll('.pic_item');
    console.log(pic);
    let rotation = 0;
    button.addEventListener('click', function() {
        rotation += 90;
        pic.forEach((element, index) => {
            const currentRotation = 90 * index;
            element.style.transform = `rotateY(${currentRotation + rotation}deg) translateZ(350px)`; // 修改旋转角度
        });
    });
});
