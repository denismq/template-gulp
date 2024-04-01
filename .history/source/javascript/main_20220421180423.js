window.jQuery = $ = require('jquery');
var $ = require('jquery');

(function ($) {
  /*============== Script para Modales ===============*/
  $('.js-modal').click(function (evt) {
    $('.c-modal').addClass('active');
  });

  $('.c-modal__btn-close').click(function () {
    $('.c-modal').removeClass('active');
  });
  /*==================================================*/

  /*======= Script para flotar los labels de los input ==*/
  $('.c-form__input--value').on('blur', function () {
    if ($(this).val().trim() != '') {
      $(this).addClass('has-val');
    } else {
      $(this).removeClass('has-val');
    }
  });
  /*====================================================*/

  /*========== Script para flotar los labels en IE ==========*/
  $('.focus-label').on('click', function () {
    $(this).prev('input:first').focus();
  });
  /*===========================================================*/

  /*========= Script para seleccionar tipo de documento =======*/
  $('.custom-input__item--selection').on('click', function (evt) {
    var data = $(evt.currentTarget).data('option');
    var buttonNext = $('.c-form__button--next');

    $('.custom-input__item--selection').removeClass('active');
    $(evt.currentTarget).addClass('active');

    $('.c-form__document-type')
      .find('.c-form__document-item')
      .removeClass('active');
    $('.c-form__document-type')
      .find('.c-form__document-item[data-document=' + data + ']')
      .addClass('active');
    buttonNext.css('display', 'block');
  });
  /*============================================================*/

  /*======== Script para activar pasos ===========*/
  $('.steps__item').on('click', function (evt) {
    console.log($(this).index());
    $('.steps__item').removeClass('is-active');
    $(evt.currentTarget).prev().addClass('is-complete');
    $(evt.currentTarget).addClass('is-active');

    if ($(evt.currentTarget).hasClass('is-complete')) {
      $(evt.currentTarget).removeClass('is-complete');
    }
  });
  /*============================================= */

  /*=== Pruebas para mostrar mensajes de alerta */
  $('.prueba-error').on('click', function () {
    $('.alert-box').removeClass('loading');
    $('.alert-box').removeClass('valid');
    $('.alert-box').addClass('error');
  });

  $('.prueba-valid').on('click', function () {
    $('.alert-box').removeClass('error');
    $('.alert-box').removeClass('loading');
    $('.alert-box').addClass('valid');
  });

  $('.prueba-loading').on('click', function () {
    $('.alert-box').removeClass('valid');
    $('.alert-box').removeClass('error');
    $('.alert-box').addClass('loading');
  });
  /*==========================================*/
})(jQuery);
