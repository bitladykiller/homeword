/**
 * 3D 向日葵拖拽旋转
 */
const Sunflower3D = {
    wrapper: null,
    isDragging: false,
    startX: 0,
    startY: 0,
    currentRotX: -10,
    currentRotY: 0,
    
    init() {
        this.wrapper = document.getElementById('sunflower3dWrapper');
        if (!this.wrapper) return;
        
        const container = document.getElementById('sunflower3d');
        
        // 鼠标拖拽
        container.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.startX = e.clientX;
            this.startY = e.clientY;
            container.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            const dx = e.clientX - this.startX;
            const dy = e.clientY - this.startY;
            this.currentRotY += dx * 0.5;
            this.currentRotX -= dy * 0.5;
            this.currentRotX = Math.max(-45, Math.min(45, this.currentRotX));
            this.wrapper.style.transform = `rotateX(${this.currentRotX}deg) rotateY(${this.currentRotY}deg)`;
            this.startX = e.clientX;
            this.startY = e.clientY;
        });
        
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            container.style.cursor = 'grab';
        });
        
        // 触摸支持
        container.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            const dx = e.touches[0].clientX - this.startX;
            const dy = e.touches[0].clientY - this.startY;
            this.currentRotY += dx * 0.5;
            this.currentRotX -= dy * 0.5;
            this.currentRotX = Math.max(-45, Math.min(45, this.currentRotX));
            this.wrapper.style.transform = `rotateX(${this.currentRotX}deg) rotateY(${this.currentRotY}deg)`;
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', () => {
            this.isDragging = false;
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => Sunflower3D.init(), 700);
});

window.Sunflower3D = Sunflower3D;
