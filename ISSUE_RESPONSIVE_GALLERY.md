# Issue: Add Responsive Image Gallery with Lightbox

## Title
Implement Responsive Image Gallery with Lightbox Feature

## Description
Replace placeholder images in the carousel with a proper image gallery that includes lightbox functionality for viewing full-size images. This will showcase Azure Web Apps features more effectively with real screenshots and diagrams.

## Current State
- Using placeholder gray images (data URIs)
- Limited to 3 carousel slides
- No image zoom or detailed view capability

## Proposed Implementation

### 1. Gallery Structure
- Create a dedicated gallery section below the carousel
- Grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile
- Minimum of 9-12 high-quality images showcasing:
  - Azure Portal screenshots
  - Deployment workflows
  - Architecture diagrams
  - Application features

### 2. Lightbox Implementation

#### Option A: Vanilla JavaScript (Recommended)
```javascript
// gallery.js
class Lightbox {
  constructor() {
    this.images = document.querySelectorAll('.gallery-item img');
    this.currentIndex = 0;
    this.init();
  }

  init() {
    this.createLightboxHTML();
    this.bindEvents();
  }

  createLightboxHTML() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <span class="close">&times;</span>
      <span class="prev">&#10094;</span>
      <span class="next">&#10095;</span>
      <img src="" alt="" class="lightbox-image">
      <div class="caption"></div>
    `;
    document.body.appendChild(lightbox);
  }

  open(index) {
    this.currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = this.images[index];
    document.querySelector('.lightbox-image').src = img.src;
    document.querySelector('.lightbox .caption').textContent = img.alt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  close() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  navigate(direction) {
    this.currentIndex += direction;
    if (this.currentIndex < 0) this.currentIndex = this.images.length - 1;
    if (this.currentIndex >= this.images.length) this.currentIndex = 0;
    this.open(this.currentIndex);
  }

  bindEvents() {
    this.images.forEach((img, index) => {
      img.addEventListener('click', () => this.open(index));
    });

    document.querySelector('.lightbox .close').addEventListener('click', () => this.close());
    document.querySelector('.lightbox .prev').addEventListener('click', () => this.navigate(-1));
    document.querySelector('.lightbox .next').addEventListener('click', () => this.navigate(1));
    
    document.getElementById('lightbox').addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') this.close();
    });

    document.addEventListener('keydown', (e) => {
      const lightbox = document.getElementById('lightbox');
      if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') this.close();
        if (e.key === 'ArrowLeft') this.navigate(-1);
        if (e.key === 'ArrowRight') this.navigate(1);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new Lightbox());
```

### 3. CSS Styles

```css
/* Gallery Grid */
.gallery {
  padding: 60px 0;
  background-color: #f9f9f9;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.gallery-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

.gallery-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.gallery-item .overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
  padding: 15px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.gallery-item:hover .overlay {
  transform: translateY(0);
}

/* Lightbox */
.lightbox {
  display: none;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s;
}

.lightbox-image {
  max-width: 90%;
  max-height: 80%;
  object-fit: contain;
  animation: zoomIn 0.3s;
}

.lightbox .close,
.lightbox .prev,
.lightbox .next {
  position: absolute;
  color: white;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s;
}

.lightbox .close {
  top: 20px;
  right: 40px;
}

.lightbox .close:hover {
  color: #ccc;
}

.lightbox .prev,
.lightbox .next {
  top: 50%;
  transform: translateY(-50%);
  padding: 16px;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
}

.lightbox .prev:hover,
.lightbox .next:hover {
  background: rgba(255,255,255,0.2);
}

.lightbox .prev {
  left: 20px;
}

.lightbox .next {
  right: 20px;
}

.lightbox .caption {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-align: center;
  max-width: 80%;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes zoomIn {
  from { transform: scale(0.8); }
  to { transform: scale(1); }
}
```

### 4. HTML Structure

Add to `index.html` after the carousel section:

```html
<!-- Image Gallery -->
<section class="gallery">
  <div class="container">
    <h2 class="text-center">Gallery</h2>
    <p class="text-center">Explore Azure App Service features and capabilities</p>
    
    <div class="gallery-grid">
      <div class="gallery-item">
        <img src="img/azure-portal.jpg" alt="Azure Portal Dashboard">
        <div class="overlay">
          <h4>Azure Portal</h4>
          <p>Manage your apps with ease</p>
        </div>
      </div>
      <!-- Add 8-11 more gallery items -->
    </div>
  </div>
</section>
```

## Files to Create/Modify

### New Files:
1. `gallery.js` - Lightbox functionality
2. `gallery.css` - Gallery and lightbox styles
3. `img/` - Add 9-12 high-quality images

### Modified Files:
1. `index.html` - Add gallery section and script/style includes

## Acceptance Criteria

- [ ] Gallery displays in responsive grid (3/2/1 columns)
- [ ] Images load with proper aspect ratios
- [ ] Hover effects work correctly
- [ ] Lightbox opens on image click
- [ ] Navigation arrows work (previous/next)
- [ ] Keyboard navigation works (←/→ arrows, ESC to close)
- [ ] Click outside image closes lightbox
- [ ] Smooth animations for open/close
- [ ] Caption displays image description
- [ ] Mobile-friendly touch gestures
- [ ] No layout shift when lightbox opens
- [ ] Works with screen readers

## Testing Checklist

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test responsive behavior on mobile/tablet
- [ ] Test keyboard navigation
- [ ] Test touch gestures on mobile
- [ ] Verify image loading performance
- [ ] Check accessibility with screen reader
- [ ] Test with slow network (loading states)
- [ ] Verify no JavaScript errors in console

## Priority
High

## Labels
`enhancement`, `ui/ux`, `media`, `accessibility`

## Estimated Effort
5-6 hours

## Dependencies
- High-quality images (can use Azure documentation screenshots)
- Consider lazy loading for performance

## Resources
- [Web.dev: Image Performance](https://web.dev/fast/#optimize-your-images)
- [A11y: Image Gallery Best Practices](https://www.w3.org/WAI/tutorials/images/)
