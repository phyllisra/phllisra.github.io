// 初始化 AOS
AOS.init({
    duration: 1000,
    once: true
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// 作品筛选功能
const filterButtons = document.querySelectorAll('.filter-btn');
const carouselTrack = document.querySelector('.carousel-track');

// 作品数据
const works = [
    // 分析图 (从 G:\Cursor test\images1) - 5张图片
    { 
        type: 'analysis',
        src: 'assets/images/analysis/1.jpg',
        title: '分析图1',
        description: '空间功能分析'
    },
    { 
        type: 'analysis',
        src: 'assets/images/analysis/2.jpg',
        title: '分析图2',
        description: '空间结构分析'
    },
    { 
        type: 'analysis',
        src: 'assets/images/analysis/3.jpg',
        title: '分析图3',
        description: '空间布局分析'
    },
    { 
        type: 'analysis',
        src: 'assets/images/analysis/4.jpg',
        title: '分析图4',
        description: '空间分析'
    },
    { 
        type: 'analysis',
        src: 'assets/images/analysis/5.jpg',
        title: '分析图5',
        description: '空间研究'
    },

    // 效果图 (从 G:\Cursor test\images2) - 8张图片
    { 
        type: 'rendering',
        src: 'assets/images/rendering/1.jpg',
        title: '效果图1',
        description: '建筑外观展示'
    },
    { 
        type: 'rendering',
        src: 'assets/images/rendering/2.jpg',
        title: '效果图2',
        description: '室内空间展示'
    },
    { 
        type: 'rendering',
        src: 'assets/images/rendering/3.jpg',
        title: '效果图3',
        description: '景观效果展示'
    },
    { 
        type: 'rendering',
        src: 'assets/images/rendering/4.jpg',
        title: '效果图4',
        description: '建筑细部展示'
    },
    { 
        type: 'rendering',
        src: 'assets/images/rendering/5.jpg',
        title: '效果图5',
        description: '空间氛围展示'
    },
    { 
        type: 'rendering',
        src: 'assets/images/rendering/6.jpg',
        title: '效果图6',
        description: '建筑立面展示'
    },
    { 
        type: 'rendering',
        src: 'assets/images/rendering/7.jpg',
        title: '效果图7',
        description: '室内视角展示'
    },
    { 
        type: 'rendering',
        src: 'assets/images/rendering/8.jpg',
        title: '效果图8',
        description: '整体空间展示'
    },

    // 标识设计 (从 G:\Cursor test\images3) - 8张图片
    { 
        type: 'logo',
        src: 'assets/images/logo/1.jpg',
        title: '标识设计1',
        description: '品牌主标识'
    },
    { 
        type: 'logo',
        src: 'assets/images/logo/2.jpg',
        title: '标识设计2',
        description: '辅助图形设计'
    },
    { 
        type: 'logo',
        src: 'assets/images/logo/3.jpg',
        title: '标识设计3',
        description: '应用系统展示'
    },
    { 
        type: 'logo',
        src: 'assets/images/logo/4.jpg',
        title: '标识设计4',
        description: '品牌辅助标识'
    },
    { 
        type: 'logo',
        src: 'assets/images/logo/5.jpg',
        title: '标识设计5',
        description: '品牌扩展标识'
    },
    { 
        type: 'logo',
        src: 'assets/images/logo/6.jpg',
        title: '标识设计6',
        description: '品牌应用标识'
    },
    { 
        type: 'logo',
        src: 'assets/images/logo/7.jpg',
        title: '标识设计7',
        description: '品牌扩展应用标识'
    },
    { 
        type: 'logo',
        src: 'assets/images/logo/8.jpg',
        title: '标识设计8',
        description: '整体系统展示'
    },

    // 作品集
    { 
        type: 'portfolio',
        src: 'https://raw.githubusercontent.com/你的用户名/phyllisra-portfolio/main/portfolio/个人作品集郑祎旋.pdf',
        title: '',
        description: ''
    }
];

// 轮播图相关变量
let currentSlide = 0;
let currentType = 'analysis';

// 改进的初始化作品展示函数
function initializePortfolio() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // 创建作品展示
    works.forEach(work => {
        const item = document.createElement('div');
        item.className = `portfolio-item ${work.type}`;
        
        const fileExtension = work.src.split('.').pop().toLowerCase();
        const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
        const isPDF = fileExtension === 'pdf';
        
        if (isPDF) {
            item.innerHTML = `
                <div class="portfolio-pdf">
                    <i class="fas fa-file-pdf"></i>
                    <a href="${work.src}" target="_blank">查看PDF</a>
                    <div class="portfolio-item-info">
                        <h3>${work.title}</h3>
                        <p>${work.description}</p>
                    </div>
                </div>
            `;
        } else if (isImage) {
            item.innerHTML = `
                <img src="${work.src}" 
                     alt="${work.title}" 
                     onerror="this.style.display='none'; this.parentElement.classList.add('load-error');"
                     onload="this.style.display='block'; this.parentElement.classList.remove('load-error');">
                <div class="portfolio-item-info">
                    <h3>${work.title}</h3>
                    <p>${work.description}</p>
                </div>
            `;
        }
        
        carouselTrack.appendChild(item);
    });

    // 更新轮播图控制
    function updateCarousel() {
        const items = document.querySelectorAll(`.portfolio-item.${currentType}`);
        const maxSlides = items.length;
        
        // 更新按钮状态
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === maxSlides - 1;
        
        // 更新滑动位置
        items.forEach((item, index) => {
            item.style.transform = `translateX(-${currentSlide * 100}%)`;
        });
    }

    // 按钮事件监听
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        const items = document.querySelectorAll(`.portfolio-item.${currentType}`);
        if (currentSlide < items.length - 1) {
            currentSlide++;
            updateCarousel();
        }
    });

    // 筛选功能更新
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            currentType = filter;
            currentSlide = 0;
            
            document.querySelectorAll('.portfolio-item').forEach(item => {
                if (item.classList.contains(filter)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
            
            updateCarousel();
        });
    });

    // 初始化显示
    const firstButton = document.querySelector('.filter-btn[data-filter="analysis"]');
    if (firstButton) {
        firstButton.click();
    }
}

// 添加调试函数
function debugImageLoading() {
    console.log('Current works array:', works);
    works.forEach(work => {
        if (work.src.match(/\.(jpg|jpeg|png|gif)$/i)) {
            const img = new Image();
            img.onload = () => console.log(`Successfully loaded: ${work.src}`);
            img.onerror = () => console.error(`Failed to load: ${work.src}`);
            img.src = work.src;
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    debugImageLoading();
    initializePortfolio();
}); 