module.exports = function(eleventyConfig) {
  // Pass through files
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  
  // Date formatting filter
  eleventyConfig.addFilter("dateFilter", function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Add a custom 'limit' filter
  eleventyConfig.addFilter("limit", function(array, limit) {
    if (!Array.isArray(array)) return [];
    return array.slice(0, limit);
  });

  // Add a custom 'markdown' filter
  const markdownIt = require("markdown-it");
  const markdownLib = markdownIt({ html: true });
  eleventyConfig.addFilter("markdown", function(content) {
    if (typeof content !== 'string') return '';
    return markdownLib.render(content);
  });
  
  // Projects Collection
  eleventyConfig.addCollection("projects", function(collection) {
    return collection.getFilteredByGlob("src/_projects/**/*.md")
      .map(item => {
        // Add default layout if not specified
        if (!item.data.layout) {
          item.data.layout = "layouts/project.njk";
        }
        return item;
      })
      .sort((a, b) => {
        // Safe date comparison with fallback
        const dateA = a.date instanceof Date ? a.date : new Date(0);
        const dateB = b.date instanceof Date ? b.date : new Date(0);
        return dateB - dateA;
      });
  });
  
  // Artwork Pages Collection - Generate individual artwork pages
  eleventyConfig.addCollection("artworkPages", function(collection) {
    let artworkPages = [];
    
    // Get all projects that have artwork
    const projects = collection.getFilteredByGlob("src/_projects/**/*.md");
    
    projects.forEach(project => {
      // Skip if no artworks
      if (!project.data.artworks || !Array.isArray(project.data.artworks)) {
        return;
      }
      
      // Sort artworks by order if available
      const artworks = [...project.data.artworks].sort((a, b) => {
        return (a.order || 0) - (b.order || 0);
      });
      
      // Create pages for each artwork
      artworks.forEach((artwork, index) => {
        // Determine previous and next artwork
        const prevArtwork = index > 0 ? artworks[index - 1] : null;
        const nextArtwork = index < artworks.length - 1 ? artworks[index + 1] : null;
        
        // Create a new "page" for this artwork
        artworkPages.push({
          project: project,
          artwork: artwork,
          prevArtwork: prevArtwork,
          nextArtwork: nextArtwork,
          // Use the project's permalink but with artwork identifier appended
          outputPath: `_site/projects/${project.fileSlug}/artwork/${artwork.order || index}/index.html`,
          url: `/projects/${project.fileSlug}/artwork/${artwork.order || index}/`,
          data: {
            layout: "layouts/artwork.njk",
            title: `${artwork.title} | ${project.data.title}`,
            permalink: `/projects/${project.fileSlug}/artwork/${artwork.order || index}/`,
          }
        });
      });
    });
    
    return artworkPages;
  });

  // Pages Collection - Add dedicated handling
  eleventyConfig.addCollection("pages", function(collection) {
    // Get all pages with layout: layouts/page.njk or in pages directory
    return collection.getFilteredByGlob([
      "src/index.njk", 
      "src/bio.njk", 
      "src/contact.njk",
      "src/resume.njk",
      "src/shop.njk"
    ]).map(item => {
      // Set default layout for pages if not specified
      if (!item.data.layout) {
        item.data.layout = "layouts/base.njk";
      }
      return item;
    });
  });

  // Layout aliases
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('project', 'layouts/project.njk');
  eleventyConfig.addLayoutAlias('artwork', 'layouts/artwork.njk');
  
  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes", // Confirm layouts are directly in _includes
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};