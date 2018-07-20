

const search = (input = '', table = '') => {
  $("input#inputSearchSubject").keyup(function(){
    _this = this;
    $.each($(`${table} tbody tr`), function() {
        if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
            $(this).fadeOut();
        else 
            $(this).fadeIn();
    });
  });
}
  