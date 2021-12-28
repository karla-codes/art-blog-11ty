module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("sass/");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("admin");

  return {
    dir: {
      input: ".",
      output: "public",
    },
  };
};
