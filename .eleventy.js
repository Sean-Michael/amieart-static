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
    return array.slice(0, limit);
  });

  // Add a custom 'markdown' filter
  const markdownIt = require("markdown-it");
  const markdownLib = markdownIt({ html: true });
  eleventyConfig.addFilter("markdown", function(content) {
    return markdownLib.render(content);
  });
  
  // Collections
  eleventyConfig.addCollection("projects", function(collection) {
    return collection.getFilteredByGlob("src/_projects/**/*.md")
      .map(item => {
        // Add default layout if not specified
        if (!item.data.layout) {
          item.data.layout = "layouts/project.njk";
        }
        return item;
      })
      .sort((a, b) => b.date - a.date);
  });

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


  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('project', 'layouts/project.njk');

  
  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};