
    $(function() {
        // Number of items and limits the number of items per page
      //  var numberOfItems = $(".contant").length;
      var base_url = $('#base_url').val();
      var csrf_token = $('#csrf_token').val();
      var totalRecords=$('#totalRecords').val();
      if(totalRecords!=undefined){
        var numberOfItems = totalRecords;
      }else{
        var numberOfItems = $(".contant").length;
      }
      

        var limitPerPage = 12;
        // Total pages rounded upwards
        var totalPages = Math.ceil(numberOfItems / limitPerPage);
        // Number of buttons at the top, not counting prev/next,
        // but including the dotted buttons.
        // Must be at least 5:
        var paginationSize = 5;
        var currentPage;
  
        function showPage(whichPage) {

            if (whichPage < 1 || whichPage > totalPages) return false;
            currentPage = whichPage;
            $(".contant").hide();
            $(".contant").slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();
            // Replace the navigation items (not prev/next):     
            $(".pagination li").slice(1, -1).remove();
            getPageList(totalPages, currentPage, paginationSize).forEach(item => {
                $("<li>").addClass("page-item")
                    .addClass(item ? "current-page" : "disabled")
                    .toggleClass("active", item === currentPage).append(
                        $("<a>").addClass("page-link").attr({
                            href: "javascript:void(0)"
                        }).text(item || "...")
                    ).insertBefore("#next-page");
            });
            // Disable prev/next when at first/last page:
            $("#previous-page").toggleClass("disabled", currentPage === 1);
            $("#next-page").toggleClass("disabled", currentPage === totalPages);
            return true;
        }
    
        // Include the prev/next buttons:
        $(".pagination").append(
            $("<li>").addClass("page-item").attr({ id: "previous-page" }).append(
                $("<a>").addClass("page-link").attr({
                    href: "javascript:void(0)"
                }).text("Prev")
            ),
            $("<li>").addClass("page-item").attr({ id: "next-page" }).append(
                $("<a>").addClass("page-link").attr({
                    href: "javascript:void(0)"
                }).text("Next")
            )
        );
        // Show the page links
        $('#dataList').show();
        showPage(1);
    


        // Use event delegation, as these items are recreated later    
      

      
        if(totalRecords!=undefined){
        $(document).on("click", ".pagination li.current-page", function() {
            $('#dataList').html('');
            $('#loadingImage').show();
            getCategoryPaginationPages(parseInt($(this).text()));

         });
        } else{
            $(document).on("click", ".pagination li.current-page:not(.active)", function() {
                return showPage(+$(this).text());
     
             });
        }
        $("#next-page").on("click", function() {
            if(totalRecords!=undefined){
                $('#dataList').html('');
                $('#loadingImage').show();
          getCategoryPaginationPages(parseInt(currentPage) + 1);
    
          }else{
            return showPage(currentPage + 1);
          }
        });
    
        $("#previous-page").on("click", function() {
            if(totalRecords!=undefined){
                $('#dataList').html('');
                $('#loadingImage').show();
            getCategoryPaginationPages(parseInt(currentPage) - 1);

         }else{
            return showPage(currentPage - 1);
         }
        });


        function getCategoryPaginationPages(pageId){
            currentPage=pageId;
            if (currentPage < 1 || currentPage > totalPages) return false;
            var search=$('#categorySearch').val();
            $.ajax({  
                url: base_url+"categories/ajaxPaginationData1",
               data: { page:pageId, 'csrf_token_name': csrf_token,'search':search },
               type: "POST",
            success: function(response){  
                   $('#dataList').html(response);
                
                
             $(".pagination li").slice(1, -1).remove();
                   $('#loadingImage').hide();

                  var totalRecords=$('#totalRecords'+pageId).val();


                  var totalPages = Math.ceil(totalRecords / limitPerPage);
                   getPageList(totalPages, currentPage, paginationSize).forEach(item => {
                       $("<li>").addClass("page-item")
                           .addClass(item ? "current-page" : "disabled")
                           .toggleClass("active", item === currentPage).append(
                               $("<a>").addClass("page-link").attr({
                                   href: "javascript:void(0)"
                               }).text(item || "...")
                           ).insertBefore("#next-page");
                   });
         
                   $("#previous-page").toggleClass("disabled", currentPage === 1);
                   $("#next-page").toggleClass("disabled", currentPage === totalPages);
                 //  showPage(pageId);
                }
              });  

            //  showPage1(currentPage);
            
        }
    
        $('#categorySearch').keyup(function(){
            getCategoryPaginationPages(1);
          });
    });
    


    function getPageList(totalPages, page, maxLength) {
        if (maxLength < 5) throw "maxLength must be at least 5";

        function range(start, end) {
            return Array.from(Array(end - start + 1), (_, i) => i + start);
        }
    
        var sideWidth = maxLength < 9 ? 1 : 2;
        var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
        var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
        if (totalPages <= maxLength) {
            // no breaks in list
            return range(1, totalPages);
        }
        if (page <= maxLength - sideWidth - 1 - rightWidth) {
            // no break on left of page
            return range(1, maxLength - sideWidth - 1)
                .concat(0, range(totalPages - sideWidth + 1, totalPages));
        }
        if (page >= totalPages - sideWidth - 1 - rightWidth) {
            // no break on right of page
            return range(1, sideWidth)
                .concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
        }
        // Breaks on both sides
        return range(1, sideWidth)
            .concat(0, range(page - leftWidth, page + rightWidth),
                0, range(totalPages - sideWidth + 1, totalPages));
    }
