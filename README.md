#Usage
###The html
`<input data-param1="foo" data-param2="bar" type="checkbox" name="something" value="1" />`

###The Javascript
`
$('input[type="checkbox"]').click(function() {
        
        var mySuccess = function(data){
            alert(data.message);
        }
        
        var _opts = {
            url: 'ajax-test.html',
            success: mySuccess
        }
        
        _this = $(this);
        _this.ajaxCb(_opts);
        _this.ajaxCb('execute');
    });
    
    //or this way will work too!
    $('input[type="checkbox"]').ajaxCb({url:'ajax-test.html'});`
    
ajax-test.html should return a json object