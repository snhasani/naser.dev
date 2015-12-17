class Video < Liquid::Tag
  Syntax = /^\s*([^\s]+)(\s+(\d+)\s+(\d+)\s*)?/

  def initialize(tagName, markup, tokens)
    super
    if markup =~ Syntax then
      @link = $1
    end
  end

  def render(context)
    "<div class=\"video-container\"><video controls><source src=\"#{@link}\"></video></div>"
  end

  Liquid::Template.register_tag "video", self
end
