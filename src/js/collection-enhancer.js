document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('/projects/')) {
      enhanceProjectPage();
    }
  });
 
  function enhanceProjectPage() {
    const projectContent = document.querySelector('.project-content');
    const projectDetail = document.querySelector('.project-detail');
    
    if (projectContent || projectDetail) {
      const container = projectContent || projectDetail;
      
      const paragraphs = container.querySelectorAll('p');
      const headings = container.querySelectorAll('h2, h3');
      const images = container.querySelectorAll('img');
      const lists = container.querySelectorAll('ul, ol');
      
      enhanceParagraphs(paragraphs);
      enhanceHeadings(headings);
      enhanceImages(images);
      enhanceLists(lists);
      
      enhanceExhibitionHistory(container);
      
      enhanceDetailsSection(container);
    } else {
      enhanceGenericContent();
    }
  }
  

  function enhanceParagraphs(paragraphs) {
    if (!paragraphs || paragraphs.length === 0) return;
    
    paragraphs.forEach((paragraph, index) => {
      if (isInSpecialContainer(paragraph)) return;
      
      const prevElement = paragraph.previousElementSibling;
      if (prevElement && ['H1', 'H2', 'H3'].includes(prevElement.tagName)) {
        paragraph.style.fontSize = '1.05em';
      }
      
      if (index % 4 === 2 && index > 0 && index < paragraphs.length - 1) {
        paragraph.classList.add('highlight-box');
        
        if (index % 2 === 0) {
          paragraph.classList.add('right');
        } else {
          paragraph.classList.add('left');
        }
      }
      
      if (index % 7 === 3 && index > 1) {
        paragraph.classList.add('offset-element');
        if (index % 2 === 0) {
          paragraph.classList.add('right');
        }
      }
      
      if (isPotentialQuote(paragraph.textContent)) {
        paragraph.classList.add('large-quote');
      }
      
      highlightKeywords(paragraph);
    });
  }
  

  function enhanceHeadings(headings) {
    if (!headings || headings.length === 0) return;
    

    headings.forEach((heading, index) => {

      if (index === 0) return;

      const separator = document.createElement('hr');
      separator.className = 'fade-line';
      heading.parentNode.insertBefore(separator, heading);
    });
  }

  function enhanceImages(images) {
    if (!images || images.length === 0) return;
    
    images.forEach((image, index) => {
      if (isInSpecialContainer(image) || image.closest('.thumbnail')) return;
      
      const container = document.createElement('div');
      container.className = 'image-container';
      
      image.parentNode.replaceChild(container, image);
      container.appendChild(image);
      
      image.classList.add('artistic-frame');
      
      if (image.alt && image.alt.trim() !== '') {
        const caption = document.createElement('div');
        caption.className = 'image-caption';
        
        if (index % 2 === 0) {
          caption.classList.add('right');
        }
        
        caption.textContent = image.alt;
        container.appendChild(caption);
      }
    });
  }
  

  function enhanceLists(lists) {
    if (!lists || lists.length === 0) return;
    
    lists.forEach(list => {
      if (isInSpecialContainer(list)) return;
      
      const prevElement = list.previousElementSibling;
      if (prevElement && ['H2', 'H3'].includes(prevElement.tagName)) {
        const details = document.createElement('div');
        details.className = 'details';
        
        list.parentNode.insertBefore(details, prevElement);
        details.appendChild(prevElement);
        details.appendChild(list);
      }
    });
  }
  

  function enhanceExhibitionHistory(container) {
    const exhibitionHeading = Array.from(container.querySelectorAll('h2, h3')).find(
      heading => heading.textContent.toLowerCase().includes('exhibition') || 
                heading.textContent.toLowerCase().includes('history')
    );
    
    if (exhibitionHeading) {
      const historySection = document.createElement('div');
      historySection.className = 'exhibition-history';
      
      let nextElement = exhibitionHeading.nextElementSibling;
      while (nextElement && !['UL', 'OL'].includes(nextElement.tagName)) {
        nextElement = nextElement.nextElementSibling;
      }
      
      if (nextElement && ['UL', 'OL'].includes(nextElement.tagName)) {
        exhibitionHeading.parentNode.insertBefore(historySection, exhibitionHeading);
        historySection.appendChild(exhibitionHeading);
        historySection.appendChild(nextElement);
      }
    }
  }
  

  function enhanceDetailsSection(container) {
    const detailsHeading = Array.from(container.querySelectorAll('h2, h3')).find(
      heading => heading.textContent.toLowerCase().includes('detail') ||
                heading.textContent.toLowerCase().includes('specifications') ||
                heading.textContent.toLowerCase().includes('specs')
    );
    
    if (detailsHeading) {
      const techInfo = document.createElement('div');
      techInfo.className = 'tech-info';
      
      const elements = [detailsHeading];
      let nextElement = detailsHeading.nextElementSibling;
      
      while (nextElement && !['H1', 'H2', 'H3'].includes(nextElement.tagName)) {
        elements.push(nextElement);
        nextElement = nextElement.nextElementSibling;
      }
      
      detailsHeading.parentNode.insertBefore(techInfo, detailsHeading);
      elements.forEach(el => techInfo.appendChild(el));
    }
  }
  

  function enhanceGenericContent() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    const header = container.querySelector('header') || 
                  container.querySelector('.project-header') ||
                  container.querySelector('h1');
    
    if (header) {
      let currentElement = header.nextElementSibling;
      const contentElements = [];
      
      while (currentElement) {
        if (['P', 'IMG', 'UL', 'OL'].includes(currentElement.tagName)) {
          contentElements.push(currentElement);
        }
        currentElement = currentElement.nextElementSibling;
      }
      
      if (contentElements.length > 0) {
        const paragraphs = contentElements.filter(el => el.tagName === 'P');
        const images = contentElements.filter(el => el.tagName === 'IMG');
        const lists = contentElements.filter(el => ['UL', 'OL'].includes(el.tagName));
        
        enhanceParagraphs(paragraphs);
        enhanceImages(images);
        enhanceLists(lists);
      }
    }
  }
  
  
  
  function isInSpecialContainer(element) {
    return element.closest('.highlight-box') || 
           element.closest('.details') ||
           element.closest('.tech-info') ||
           element.closest('.image-container') ||
           element.closest('.exhibition-history');
  }
  

  function isPotentialQuote(text) {
    if (!text) return false;
    
    const quoteMarks = (text.match(/[""''"]/g) || []).length;
    
    return quoteMarks >= 2 && text.length > 80 && text.includes('"');
  }

  function highlightKeywords(element) {
    if (!element.innerHTML) return;
    
    const keywords = [
      'exhibition', 'gallery', 'museum', 'collection', 'series',
      'installation', 'composition', 'technique', 'medium', 'artist statement'
    ];
    
    for (const keyword of keywords) {
      if (element.innerHTML.toLowerCase().includes(keyword.toLowerCase())) {
        const regex = new RegExp(`(${keyword})`, 'i');
        
        element.innerHTML = element.innerHTML.replace(
          regex, 
          '<span class="highlight-text">$1</span>'
        );
        
        break;
      }
    }
  }