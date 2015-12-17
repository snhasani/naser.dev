class Aparat < Liquid::Tag
  Syntax = /^\s*([^\s]+)(\s+(\d+)\s+(\d+)\s*)?/

  def initialize(tagName, markup, tokens)
    super

    if markup =~ Syntax then
      @src = $1

      if $2.nil? then
          @width = 640
          @height = 360
      else
          @width = $2.to_i
          @height = $3.to_i
      end
    else
      raise "No src provided in the \"aparat\" tag"
    end
  end

  def render(context)
    viseo_tag =  '<div class="video-wrapper text-center">'
    viseo_tag += "<iframe src width=\"#{@width}\" height=\"#{@height}\" "
    viseo_tag += "data-layzr=\"#{@src}\"></iframe>"
    viseo_tag += '</div>'
  end

  Liquid::Template.register_tag "aparat", self
end
