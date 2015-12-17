# https://github.com/paulrobertlloyd/jekyll-figure
#
# This plugin provides a liquid tag that enables you to generate a <figure> element. It takes optional caption and class parameters.

# {% figure [caption:"Caption (markdown)"] [class:"class1 class2"] %}
# Figure content (markdown)
# {% endfigure %}
# Examples

# In simplest usage:

# {% figure %}
# Content
# {% endfigure %}
# <figure>
#   <p>Content</p>
# </figure>
# If a figure contains an image (or multiple images), the surrounding <p> will be stripped:

# {% figure %}
# ![Image](/path/to/image.jpg)
# {% endfigure %}
# <figure>
#   <img src="/path/to/image.jpg" alt="Image" />
# </figure>
# You can provide a caption. Any markdown will be rendered:

# {% figure caption:"*Markdown* caption" %}
# Content
# {% endfigure %}
# <figure>
#   <p>Content</p>
#   <figcaption><em>Markdown</em> caption</figcaption>
# </figure>
# You can also provide a class name(es) for CSS styling:

# {% figure caption:"A caption" | class:"classname" %}
# Content
# {% endfigure %}
# <figure class="classname">
#   <p>Content</p>
#   <figcaption>A caption</figcaption>
# </figure>
# Finally, the caption parameter will accept liquid ouput markup:

# {% figure caption:"{{ page.title }}" %}
# Content
# {% endfigure %}
# <figure>
#   <p>Content</p>
#   <figcaption>The title of my post</figcaption>
# </figure>

module Jekyll
  module Figure

    class FigureTag < Liquid::Block
      def initialize(tag_name, markup, tokens)
        @markup = markup
        super
      end

      def render(context)
        # Gather settings
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

        # Render any liquid variables
        markup = Liquid::Template.parse(@markup).render(context)

        # Extract tag attributes
        attributes = {}
        markup.scan(Liquid::TagAttributes) do |key, value|
          attributes[key] = value
        end

        @caption = attributes['caption']
        @class = attributes['class']

        # Caption: convert markdown and remove paragraphs
        unless @caption.nil?
          figure_caption = @caption.gsub!(/\A"|"\Z/, '')
          figure_caption = converter.convert(figure_caption).gsub(/<\/?p[^>]*>/, '').chomp
          figure_caption = "  <figcaption>#{figure_caption}</figcaption>\n"
        end

        # Class name(s)
        if @class
          figure_class = @class.gsub!(/\A"|"\Z/, '')
          figure_class = " class\=\"lazy #{figure_class}\""
        else
          figure_class = " class\=\"lazy\""
        end

        # Content: convert markdown and remove paragraphs containing images
        figure_main = converter.convert(super(context)).gsub(/^<p>\s*((<img[^<]+?)+)\s*<\/p>(.*)/, '\\1').gsub!(/[\n]+/, "\n  ");

        # Used to escape markdown parsing rendering
        markdown_escape = "\ "

        # Render <figure>
        figure_tag =  "<figure#{figure_class}>"
        figure_tag += "#{figure_main}\n"
        figure_tag += "#{figure_caption}"
        figure_tag += "</figure>"
      end
    end

  end
end

Liquid::Template.register_tag('figure', Jekyll::Figure::FigureTag)
