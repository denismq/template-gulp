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
  /*
    https://github.com/smokenight/jQuery-Validation-Plugin-using-data-attributes/blob/master/README.md
    jQuery Validation custom validation methods
    jQuery validate custom rule in data attributes
    https://gist.github.com/johnnyreilly/5867188
    https://johnnyreilly.com/jquery-validate-native-unobtrusive-validation

  */
})(jQuery);
