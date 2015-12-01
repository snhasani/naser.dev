
module Jekyll

  class PostContentContainer < Liquid::Block

    def initialize(tag_name, text, tokens)
      super
    end

    require "kramdown"
    def render(context)
      html = Kramdown::Document.new(super).to_html
      '<div class="container">' + html + '</div>'
    end

  end

end

Liquid::Template.register_tag('container', Jekyll::PostContentContainer)
