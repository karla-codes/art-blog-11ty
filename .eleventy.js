const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const outdent = require("outdent");

// Eleventy Image Lazy Loading: https://www.aleksandrhovhannisyan.com/blog/eleventy-image-lazy-loading/

const ImageWidths = {
  ORIGINAL: null,
  PLACEHOLDER: 24,
};

const imageShortcode = async (
  relativeSrc,
  alt,
  widths = [400, 1080, 1800],
  baseFormat = "jpeg",
  optimizedFormats = ["webp"],
  sizes = "100vw"
) => {
  const { dir: imgDir } = path.parse(relativeSrc);
  const fullSrc = path.join(".", relativeSrc);

  const imageMetadata = await Image(fullSrc, {
    widths: [ImageWidths.ORIGINAL, ImageWidths.PLACEHOLDER, widths],
    formats: [...optimizedFormats, baseFormat],
    outputDir: path.join("public", imgDir),
    urlPath: imgDir,
  });

  // use reduce to get the placeholder and largest image corresponding to each format
  const formatSizes = Object.entries(imageMetadata).reduce((formatSizes, [format, images]) => {
    if (!formatSizes[format]) {
      const placeholder = images.find(image => image.width === ImageWidths.PLACEHOLDER);
      const largestVariant = images[images.length - 1];

      formatSizes[format] = {
        placeholder,
        largest: largestVariant,
      };
    }
    return formatSizes;
  }, {});

  const picture = `<picture class="lazy-picture">
    ${Object.values(imageMetadata)
      .map(formatEntries => {
        const { format: formatName, sourceType } = formatEntries[0];
        const placeholderSrcset = formatSizes[formatName].placeholder.url;
        const actualSrcset = formatEntries
          .filter(image => image.width !== ImageWidths.PLACEHOLDER)
          .map(image => image.srcset)
          .join(", ");

        return `<source type="${sourceType}" srcset="${placeholderSrcset}" data-srcset="${actualSrcset}" data-sizes="${sizes}">`;
      })
      .join("\n")}
    <img
      src="${formatSizes[baseFormat].placeholder.url}"
      data-src="${formatSizes[baseFormat].largest.url}"
      alt="${alt}"
      class="lazy-img"
      loading="lazy">
  </picture>`;
  return outdent`${picture}`;
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("sass/");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images/uploads");
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addNunjucksAsyncFilter("image", imageShortcode);
  eleventyConfig.addNunjucksShortcode("image", imageShortcode);
  eleventyConfig.addShortcode("image", imageShortcode);

  return {
    dir: {
      input: ".",
      output: "public",
    },
  };
};
