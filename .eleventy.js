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
      .sort((a, b) => b.date - a.date);
  });

  // Layout alias
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  
  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes", // Update this path if layouts are directly in _includes
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};