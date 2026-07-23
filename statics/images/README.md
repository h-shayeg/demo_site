This folder is where real raster images (JPG/PNG/WebP) should go once you have them:

- images/profile.jpg — your actual headshot (currently a CSS gradient placeholder with initials on about.html)
- images/projects/ — screenshots for individual projects (currently gradient + icon placeholders on projects.html, project-single.html, and the homepage)
- images/blog/ — cover images for blog posts (currently gradient + icon placeholders on blog.html and blog-single.html)

The template intentionally ships with zero binary images so it stays lightweight and dependency-free.
All "photos" you see in the templates are CSS gradients + inline SVG icons (see icons/icons.svg), styled via
.project-thumb, .blog-thumb, and .profile-photo in css/pages.css.

To swap in a real image, replace the relevant placeholder <div> with an <img src="images/your-file.jpg" alt="...">
and remove the gradient/icon markup, or keep both and layer the image on top — whichever suits your Django templates.
