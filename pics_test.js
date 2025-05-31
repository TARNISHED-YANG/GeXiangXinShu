document.addEventListener('DOMContentLoaded', () => {
    const prev_button = document.querySelector('.prev_button');
    const next_button = document.querySelector('.next_button');
    const pic = document.querySelectorAll('.pic_item');
    console.log(pic);
    const totalPages=pic.length;
    let rotation = 0;
    let currentPage=0;
    prev_button.style.display = 'none';
    prev_button.addEventListener('click', function() {
        if(currentPage>0){
            currentPage--;
            rotation -= 90;
            pic.forEach((element, index) => {
                const currentRotation = 90 * index;
                element.style.transform = `rotateY(${currentRotation + rotation}deg) translateZ(350px)`; // 修改旋转角度
            });
        }
        prev_button.style.display = currentPage === 0 ? 'none' : 'block';
        next_button.style.display = currentPage === totalPages - 1 ? 'none' : 'block';
    });
    next_button.addEventListener('click', function() {
        if(currentPage<totalPages-1){
            currentPage++;
            rotation += 90;
            pic.forEach((element, index) => {
                const currentRotation = 90 * index;
                element.style.transform = `rotateY(${currentRotation + rotation}deg) translateZ(350px)`; // 修改旋转角度
            });
        }
        prev_button.style.display = currentPage === 0 ? 'none' : 'block';
        next_button.style.display = currentPage === totalPages - 1 ? 'none' : 'block';
    });
});
