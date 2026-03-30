# GitHub Copilot Instructions

## Project Type
This is a Bootstrap 3-based static HTML site for Azure App Service deployment.

## Critical Rules - DO NOT

**Never perform these actions:**

- ❌ **DO NOT** modify Bootstrap core files (`css/bootstrap*.css`, `js/bootstrap*.js`)
- ❌ **DO NOT** remove IE compatibility shims or scripts (html5shiv, respond.js, IE10 viewport workarounds, ie-emulation-modes-warning.js)
- ❌ **DO NOT** remove or modify IE compatibility meta tags (`X-UA-Compatible`)
- ❌ **DO NOT** add server-side code (PHP, ASP.NET, Node.js backend, etc.) without updating project structure
- ❌ **DO NOT** break responsive grid by incorrectly nesting Bootstrap containers
- ❌ **DO NOT** use inline styles excessively - use CSS classes instead
- ❌ **DO NOT** create HTML pages without the responsive viewport meta tag
- ❌ **DO NOT** upgrade to Bootstrap 4 or 5 without explicit approval
- ❌ **DO NOT** remove or replace jQuery (Bootstrap 3 depends on it)
- ❌ **DO NOT** modify or delete files in the `fonts/` directory
- ❌ **DO NOT** add modern JavaScript frameworks (React, Vue, Angular) without restructuring
- ❌ **DO NOT** use ES6+ features (arrow functions, promises, async/await) without a transpiler setup
- ❌ **DO NOT** add build tools (npm, webpack, gulp) without discussing project architecture changes
- ❌ **DO NOT** remove accessibility features (aria-labels, alt text, semantic HTML)
- ❌ **DO NOT** change Bootstrap's default grid breakpoints or responsive classes
- ❌ **DO NOT** remove the carousel functionality or navbar structure
- ❌ **DO NOT** add CSS preprocessors (SASS, LESS) without a build pipeline
- ❌ **DO NOT** modify image paths without verifying all references are updated
- ❌ **DO NOT** delete or modify the `CONTRIBUTING.md`, `LICENSE`, or `README.md` files

## Required Dependencies

The following must remain intact:
- jQuery (must load before Bootstrap JS)
- html5shiv and respond.js for IE8-9 support
- IE10 viewport bug workaround CSS and JS
- Bootstrap CSS/JS load order

## Before Making Changes

1. Read `.github/instructions/azure-bootstrap-site.instructions.md` for detailed guidelines
2. Verify changes don't violate the deny patterns above
3. Test responsive behavior across Bootstrap breakpoints
4. Ensure IE compatibility is maintained

## Customization Approach

- Add custom styles to `carousel.css` or new CSS files (never modify Bootstrap core)
- Place custom JavaScript after Bootstrap scripts
- Use Bootstrap utility classes before creating custom CSS
- Follow mobile-first responsive design principles
