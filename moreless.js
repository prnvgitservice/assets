(()=> {
    var $;
  
    ($ = jQuery).fn.moreLess = function(e) {
      var $content, $moreLabel, $lessLabel;
      var settings = $.extend({
        moreLabel: "Read more",
        lessLabel: "Read less",
        moreClass: "",
        lessClass: "",
        wordsCount: 50
      }, e);
  
      this.each(function(i) {
        var $el = $(this);
        var content = $el.html().trim();
        var words = content.split(/\s+/);
  
        if (words.length > settings.wordsCount) {
          var truncated = words.slice(0, settings.wordsCount).join(" ");
          var moreContent = '<span class="incodit-expand-content ' + settings.moreClass + '">' + settings.moreLabel + "</span>";
  
          $content = $('<span class="content">' + truncated + '</span><span class="truncated">' + words.slice(settings.wordsCount).join(" ") + '</span>');
          $moreLabel = $(moreContent);
          $el.html($content).append($moreLabel);
        }
      });
  
      $(document).on("click", ".incodit-expand-content", function(e) {
        e.preventDefault();
        var $el = $(this);
        var $content = $el.parent().find(".content");
        var $truncated = $el.parent().find(".truncated");
        var lessContent = '<span class="incodit-collapse-content ' + settings.lessClass + '">' + settings.lessLabel + "</span>";
  
        $content.hide();
        $truncated.show();
        $lessLabel = $(lessContent);
        $el.replaceWith($lessLabel);
      });
  
      $(document).on("click", ".incodit-collapse-content", function(e) {
        e.preventDefault();
        var $el = $(this);
        var $content = $el.parent().find(".content");
        var $truncated = $el.parent().find(".truncated");
        var moreContent = '<span class="incodit-expand-content ' + settings.moreClass + '">' + settings.moreLabel + "</span>";
  
        $truncated.hide();
        $content.show();
        $moreLabel = $(moreContent);
        $el.replaceWith($moreLabel);
      });
    };
  })();
  