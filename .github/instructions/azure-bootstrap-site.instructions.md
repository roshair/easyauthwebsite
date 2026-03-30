---
description: "Use when working with this Azure App Service HTML/Bootstrap project. Covers Bootstrap components, static site structure, Azure deployment, HTML/CSS/JavaScript patterns, and responsive design for this carousel-based web app."
applyTo: ["**/*.html", "**/*.css", "**/*.js", "*.md"]
---

# Azure App Service Bootstrap Site Instructions

This project is a Bootstrap 3-based static HTML site designed for deployment to Azure App Service.

## Project Structure

- **Root HTML files**: Main pages (index.html, etc.)
- **css/**: Bootstrap CSS and custom stylesheets
- **js/**: Bootstrap JavaScript and custom scripts
- **fonts/**: Bootstrap icon fonts
- **img/**: Site images and assets
- **carousel.css**: Custom carousel styling

## Bootstrap Guidelines

### Component Usage
- Prefer Bootstrap's built-in components over custom implementations
- Use Bootstrap utility classes (e.g., `container`, `row`, `col-*`) for layout
- Leverage responsive grid system: `col-xs-*`, `col-sm-*`, `col-md-*`, `col-lg-*`
- Use Bootstrap's navbar, carousel, and button components as shown in the template

### Customization Rules
- **Never modify** files in `css/bootstrap*.css` or `js/bootstrap*.js` directly
- Place custom styles in `carousel.css` or create new CSS files
- Override Bootstrap variables through custom CSS, not by editing core files
- Keep Bootstrap dependencies intact (jQuery, html5shiv, respond.js for IE support)

## HTML Standards

### Structure
- Always include responsive meta viewport tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Use semantic HTML5 elements where appropriate
- Maintain consistent indentation (2 spaces as shown in existing files)
- Include IE compatibility meta tags and shims as in the template

### Accessibility
- Provide alt text for all images
- Use proper heading hierarchy (h1 → h6)
- Include aria-labels for interactive elements
- Ensure keyboard navigation works for Bootstrap components

## CSS Practices

### Organization
- Link Bootstrap core CSS before custom stylesheets
- Order: `bootstrap.min.css` → `bootstrap-theme.min.css` → custom CSS
- Use minified versions (*.min.css) for production Bootstrap files
- Place IE10 viewport bug workaround CSS as shown in template

### Responsive Design
- Test all changes across Bootstrap's breakpoints (xs, sm, md, lg)
- Use mobile-first approach (base styles, then media queries for larger screens)
- Leverage Bootstrap's responsive utility classes (hidden-xs, visible-md, etc.)

## JavaScript Guidelines

### Dependencies
- jQuery must load before Bootstrap JavaScript
- Include IE support scripts (html5shiv, respond.js) for IE8-9
- Load scripts at end of body for performance
- Use `bootstrap.min.js` (minified) for production

### Custom Scripts
- Place custom JavaScript after Bootstrap scripts
- Avoid jQuery version conflicts
- Test interactive components (carousel, navbar collapse) across browsers

## Azure App Service Deployment

### Configuration
- Keep the simple static structure - no server-side processing required
- Ensure all paths are relative or absolute from root
- Consider adding `web.config` if custom routing or headers are needed
- Optimize assets (minify CSS/JS, compress images) before deployment

### Git Deployment
- Commit all necessary files (HTML, CSS, JS, fonts, images)
- Use `.gitignore` for local dev files, but include all production assets
- Azure App Service can deploy directly from Git repository

### Performance
- Use minified Bootstrap files (already in place)
- Consider CDN for Bootstrap if external resources are acceptable
- Compress images in `img/` folder
- Enable caching headers via web.config if needed

## Testing Checklist

Before committing changes:
- [ ] Test responsive behavior (mobile, tablet, desktop)
- [ ] Verify Bootstrap components work (navbar collapse, carousel)
- [ ] Check cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Validate HTML (W3C validator)
- [ ] Ensure all images load and have alt text
- [ ] Test on Azure App Service staging slot if available

## Common Tasks

### Adding a new page
1. Copy `index.html` as template
2. Update title and content
3. Maintain navbar structure for consistency
4. Link Bootstrap CSS/JS in same order

### Modifying carousel
- Edit carousel items in HTML within `.carousel` div
- Adjust timing via data attributes or JavaScript
- Add images to `img/` folder
- Update carousel indicators to match slide count

### Styling changes
- Add rules to `carousel.css` or new custom CSS file
- Use Bootstrap classes first, custom CSS for specifics only
- Test responsive behavior after changes
- Maintain specificity to avoid Bootstrap conflicts

## Do Not

- ❌ Modify Bootstrap core files (css/bootstrap*.css, js/bootstrap*.js)
- ❌ Remove IE compatibility shims without testing in IE
- ❌ Break responsive grid by nesting containers incorrectly
- ❌ Add server-side code (PHP, ASP.NET) without updating project structure
- ❌ Use inline styles excessively - prefer classes
- ❌ Forget meta viewport tag on new HTML pages
