module Jekyll

  class PrismBlock < Liquid::Block
    include Liquid::StandardFilters

    OPTIONS_SYNTAX = %r{^([a-zA-Z0-9.+#-]+)((\s+\w+(=[0-9,-]+)?)*)$}

    def initialize(tag_name, markup, tokens)
      super
      if markup.strip =~ OPTIONS_SYNTAX
        @lang = $1
        if defined?($2) && $2 != ''
          tmp_options = {}
          $2.split.each do |opt|
            key, value = opt.split('=')
            if value.nil?
              value = true
            end
            tmp_options[key] = value
          end
          @options = tmp_options
        else
          @options = { "lineNumbers" => "" }
        end
      else
        raise SyntaxError.new("Syntax Error in 'prism' - Valid syntax: prism <lang> [linenos(='1-5')]")
      end
    end

    def render(context)
      code = h(super).strip

      if @options["lineNumbers"] == true
        @options["lineNumbers"] = "line-numbers"
      end

      <<-HTML
<div class="code-wrapper mb-base">
  <div class="container">
    <pre class="#{@options["lineNumbers"]}"><code class='language-#{@lang}'>#{code}</code></pre>
  </div>
</div>
      HTML
    end
  end

end

Liquid::Template.register_tag('prism', Jekyll::PrismBlock)
