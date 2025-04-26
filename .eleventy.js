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
  
  // Artworks Collection - Individual artworks
  eleventyConfig.addCollection("artworks", function(collection) {
    return collection.getFilteredByGlob("src/_artworks/**/*.md")
      .sort((a, b) => {
        // Sort by date (newest first)
        const dateA = a.date instanceof Date ? a.date : new Date(a.date || 0);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date || 0);
        return dateB - dateA;
      });
  });

  // Projects Collection - Collections of artworks
  eleventyConfig.addCollection("projects", function(collection) {
    return collection.getFilteredByGlob("src/_projects/**/*.md")
      .sort((a, b) => {
        // Sort by date (newest first)
        const dateA = a.date instanceof Date ? a.date : new Date(a.date || 0);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date || 0);
        return dateB - dateA;
      });
  });

    // Artwork Pages Collection - Generate individual artwork pages
  eleventyConfig.addCollection("artworkPages", function(collection) {
    return collection.getFilteredByGlob("src/_artworks/**/*.md")
      .map(artwork => {
        // Set default layout if not specified
        if (!artwork.data.layout) {
          artwork.data.layout = "layouts/artwork.njk";
        }
        return artwork;
      });
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

  // Helper filter to get artwork by slug
  eleventyConfig.addFilter("getArtworkBySlug", function(artworks, slug) {
    return artworks.find(artwork => artwork.fileSlug === slug);
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