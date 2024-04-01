import jQuery from 'jquery';
window.$ = jQuery;

(function ($) {
  console.log('test de prueba con jquery');

  var v = $('form').validate({
    rules: {
      gender1: 'required',
    },
    errorPlacement: function (error, element) {
      if (element.is(':radio')) {
        // error append here
        error.appendTo('#radio');
      } else {
        error.insertAfter(element);
      }
    },
  });
})(jQuery);
