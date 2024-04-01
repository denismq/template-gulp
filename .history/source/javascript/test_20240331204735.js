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
      //debugger;
      /*if (element.attr('id') === 'check_terms') {
        $('.c-form__row .box-terms').append(error);
        //element.parent().append(error);
        //error.appendTo(element.parent('div').next('div'));
        //$(element).append("<span class='error_label'>" + error + '</span>');
      } else if (element.attr('id') === 'check_privacy') {
        $('.box-privacy').append(error);
      } else {
        error.insertAfter(element);
      }*/
      if (element.attr('type') === 'checkbox') {
        error.insertAfter($(element).siblings('label'));
      } else {
        error.insertAfter($(element));
      }
    },
    showErrors: function (errorMap, errorList) {
      $('.js-register label.error').remove();
      if (this.settings.forceShowRemoteError) {
        this.defaultShowErrors();
        this.settings.forceShowRemoteError = false;
      } else {
        if (this.settings.showFirstValidation) {
          $('.error').removeClass('error');
          if (errorList.length == 0 || this.settings.forceShowError) {
            this.defaultShowErrors();
            this.settings.forceShowError = false;
          } else if (this.settings.showFirstOnly) {
            if (errorList.length) {
              // this.resetForm();
              this.settings.forceShowError = true;
              this.element(errorList[0].element);
            }
          }
        }
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
