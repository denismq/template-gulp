import jQuery from 'jquery';
window.$ = jQuery;

import jqueryValidate from 'jquery-validation';
//import validate from 'jquery-validation';
//import jQueryValidation from 'jquery-validation';
//require('jquery-validation');

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
  $('.js-register').validate({
    onfocusout: false,
    showFirstOnly: true,
    showFirstValidation: false,
    forceShowError: false,
    forceShowRemoteError: false,
    errorPlacement: function (error, element) {
      if (element.attr('id') == 'check_terms') {
        //$('.box-terms').append(error);
        $(element).parent().parent().append(error);
      } else if (element.attr('id') == 'check_privacy') {
        $('.box-privacy').append(error);
      } else {
        error.insertAfter(element);
      }
    },
  });

  /*
    https://github.com/smokenight/jQuery-Validation-Plugin-using-data-attributes/blob/master/README.md
    jQuery Validation custom validation methods
    jQuery validate custom rule in data attributes
    https://gist.github.com/johnnyreilly/5867188
    https://johnnyreilly.com/jquery-validate-native-unobtrusive-validation
    https://www.educba.com/jquery-validate-errorplacement/
    https://jqueryvalidation.org/files/demo/radio-checkbox-select-demo.html
    how to validate checkbox in jquery validate
    

  */
})(jQuery);
