import jQuery from 'jquery';
window.$ = jQuery;

import jqueryValidate from 'jquery-validation';

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

  $('.js-form-validate').validate();
})(jQuery);
