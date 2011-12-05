(function($){
 
   var methods = {
      init : function(opts) {
         var defaults = {
            dataType: 'json',
            data: null,
            type: 'post',
            url: '',
            success: function() {},
            beforeSend: function() {},
            //dataFilter: function(data,type) { return data;},
            error: function() {},
            complete: function() {}
         };
         $.fn.ajaxCb.options =  $.extend(defaults, opts);
         
         //the guts
         return this.each(function() {
               var obj = $(this);
               obj.click(function() {
                  methods.execute(obj);
               });
               
         });
      },
      destroy: function() {
         
      },
      execute: function(obj){
         
         if( typeof obj == 'undefined')
            obj = $(this);
         
         //alias the options   
         var o = $.fn.ajaxCb.options;
         
         //merge the cb value and checked state into the options data object
         var _cb_data = { ajaxCbChecked: obj.is(':checked'), ajaxCbValue: obj.val() };
         o.data = $.extend(o.data,_cb_data);
         
         //if we have data attached to the element lets merge that also
         var _count = 0;
         $.each(obj.data(), function(i, e) {
            if( _count > 0)
               o.data[i] = e;
               _count++;
         });
         
         
         $.ajax({
            dataType: o.dataType,
            url: o.url,
            type: o.type,
            data: o.data,
            success: function(data,status,xhr) { o.success(data,status,xhr) },
            beforeSend: function(xhr) { o.beforeSend(xhr) },
            //dataFilter: function(data,type) { o.dataFilter(data,type) },
            error: function(xhr,status,error) { o.error(xhr,status,error) },
            complete: function(xhr,status) { o.complete(xhr,status) }
            
         });
      }
   }
   
   $.fn.ajaxCb = function(method) {
      
      if ( methods[method] )
      {
         return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
      }
      else if ( typeof method === 'object' || ! method )
      {
         return methods.init.apply( this, arguments );
      }
      else
      {
         $.error( 'Method ' +  method + ' does not exist on jQuery.ajaxCb' );
         return null;
      }
   };
})(jQuery);