
module Jekyll

  class PostSummary < Liquid::Block

    def initialize(tag_name, text, tokens)
      super
    end

    require "kramdown"
    def render(context)
      html = Kramdown::Document.new(super).to_html
      '<div class="post__summary">' + html + '</div>'
    end

  end

end

Liquid::Template.register_tag('post_summary', Jekyll::PostSummary)
