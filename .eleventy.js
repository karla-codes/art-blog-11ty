module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/admin");

  return {
    pathPrefix: "/src/",

    dir: {
      input: "src",
      output: "public",
    },
  };
};
