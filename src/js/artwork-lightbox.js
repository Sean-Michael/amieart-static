document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.createElement('div');
    lightbox.id = 'artwork-lightbox';
    lightbox.className = 'artwork-lightbox';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    
    const closeButton = document.createElement('span');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '&times;';
    
    const lightboxCaption = document.createElement('div');
    lightboxCaption.className = 'lightbox-caption';
    
    lightboxContent.appendChild(lightboxImage);
    lightboxContent.appendChild(closeButton);
    lightboxContent.appendChild(lightboxCaption);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    const artworkImages = document.querySelectorAll('.artwork-showcase-image, .thumbnail img');
    artworkImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        
        const zoomIndicator = document.createElement('div');
        zoomIndicator.className = 'zoom-indicator';
        zoomIndicator.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>';
        img.parentNode.style.position = 'relative';
        img.parentNode.appendChild(zoomIndicator);
        
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        });
    });
    
    closeButton.addEventListener('click', function() {
        closeLightbox();
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    function openLightbox(src, alt) {
        lightboxImage.src = src;
        lightboxCaption.textContent = alt || '';
        lightbox.style.display = 'flex';
        
        setTimeout(() => {
            lightbox.classList.add('active');
            lightboxContent.classList.add('active');
        }, 10);
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxContent.classList.remove('active');
        
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }, 300);
    }
});