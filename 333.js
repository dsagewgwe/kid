const loginAll = document.getElementById('login-all');
const registerAll = document.getElementById('register-all');
const togglebtn = document.querySelectorAll('.toggle-btn');
const link = document.querySelector('.link');
const homeall = document.querySelector('.home-all');
// 初始隐藏注册内容
togglebtn.forEach(button => {
    button.addEventListener('click', () => {
        // 获取按钮要显示的目标内容的ID
        const target = button.getAttribute('data-target');

        // 根据目标内容的ID切换内容的可见性
        if (target === 'login') {
            // 切换登录内容的可见性
            loginAll.classList.toggle('active-popup');
            loginAll.style.display = loginAll.style.display === 'block' ? 'none' : 'block';
            loginAll.classList.add('active-popup');

            // 隐藏注册内容
            registerAll.classList.remove('active-popup');
            registerAll.style.display = 'none';
            homeall.classList.remove('active-popup');
            homeall.style.display = 'none';
            
        } else if (target === 'register') {
            // 切换注册内容的可见性
            registerAll.classList.toggle('active-popup');
            registerAll.style.display = registerAll.style.display === 'block' ? 'none' : 'block';
            registerAll.classList.add('active-popup');

            // 隐藏登录内容
            loginAll.classList.remove('active-popup');
            loginAll.style.display = 'none';
            homeall.classList.remove('active-popup');
            homeall.style.display = 'none';
            
        } else if (target === 'home') {
            // 切换注册内容的可见性
            homeall.classList.toggle('active-popup');
            homeall.style.display = homeall.style.display === 'block' ? 'none' : 'block';

            // 隐藏登录内容
            loginAll.classList.remove('active-popup');
            loginAll.style.display = 'none';
            registerAll.classList.remove('active-popup');
            registerAll.style.display = 'none';
            
        }
    });
});

const wrapper1 = document.querySelector('.wrapper1');
const forgotLink = document.querySelector('.forgot-link');
const login2link = document.querySelector('.login2-link');

function toggleClass(element, className) {
    element.classList.toggle(className);
}
forgotLink.addEventListener('click', () => {
    toggleClass(wrapper1, 'active');
});

login2link.addEventListener('click', () => {
    toggleClass(wrapper1, 'active');
});