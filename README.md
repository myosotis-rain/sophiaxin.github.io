# Sophia Xin - Portfolio

Modern, responsive portfolio website showcasing design and development work.

## 🏗️ Project Structure

```
my-portfolio/
├── index.html              # Main landing page
├── about.html              # About page
├── [project-pages].html    # Individual project pages
├── 
├── css/                    # 📁 Clean CSS Architecture (5 files)
│   ├── main.css           # Import coordinator
│   ├── variables.css      # Colors, spacing, reset & base styles
│   ├── layout.css         # Navigation, hero, sections & animations
│   ├── components.css     # Buttons, cards & UI components
│   └── pages.css          # About, projects & responsive styles
├── 
├── js/                     # 📁 JavaScript Modules
│   ├── main.js            # Main JS coordinator
│   ├── script.js          # Portfolio interactions & animations
│   └── sketch.js          # p5.js creative sketch
├── 
└── media/                  # 📁 All images & graphics
```

## 🎨 Design System

### Color Palette
- **Primary**: Blueish purple-lavender system (`#A6AAD4`, `#9A9ED0`)
- **Backgrounds**: Ethereal lavender gradients
- **Text**: Sophisticated gray scale (`#5E5F65` to `#2E2F35`)

### Typography
- **Font**: Inter (Google Fonts)
- **Scale**: Fluid typography using `clamp()` for responsive sizing

### Spacing
- **System**: 8px base unit (xs: 8px → 4xl: 128px)
- **Responsive**: Scales down on mobile devices

## 🚀 Features

- **Modular CSS Architecture**: Easy to maintain and extend
- **Interactive p5.js Sketch**: Ethereal particle system in hero section
- **Responsive Design**: Mobile-first approach
- **Performance Optimized**: Modular loading and minimal dependencies
- **Professional Portfolio**: Clean, modern design for showcasing work

## 🛠️ Development

The modular structure makes it easy to:
- **Add new components**: Create new CSS files in appropriate directories
- **Modify design system**: Update variables in `css/base/variables.css`
- **Add animations**: Extend `css/animations/` directory
- **Responsive improvements**: Update `css/utils/responsive.css`

## 📱 Browser Support

Modern browsers supporting:
- CSS Custom Properties
- CSS Grid & Flexbox  
- ES6+ JavaScript
- HTML5 Canvas (for p5.js)

---

Built with modern web standards and clean architecture for easy maintenance and extensibility.