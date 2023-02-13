const { DateTime } = require("luxon")
const Image = require("@11ty/eleventy-img")
const path = require("path")

// async function generateImages() {
//   let stats = await Image("images/uploads/choco-peanut-donut.jpg")
//   console.log(stats)
// }

// generateImages()
const imageShortcode = async (src, alt, sizes) => {
  let metadata = await Image(src, {
    widths: [300, 900],
    formats: ["webp", "jpeg"],
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src)
      const name = path.basename(src, extension)

      return `${name}-${width}.${format}`
    },
    dryRun: true,
  })

  console.log(metadata)

  let imgAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  }

  return Image.generateHTML(metadata, imgAttributes)
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("sass/")
  eleventyConfig.addPassthroughCopy("css")
  eleventyConfig.addPassthroughCopy("images/uploads")
  eleventyConfig.addPassthroughCopy("admin")

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("LL-dd-yy")
  })

  eleventyConfig.addAsyncShortcode("image", imageShortcode)

  return {
    dir: {
      input: ".",
      output: "public",
    },
  }
}
