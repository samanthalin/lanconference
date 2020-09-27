$(document).ready(function(){
  //menu
  $('.hamburger').click(function(){
    $(this).toggleClass('open');
    $('.mobile-nav-dropdown').toggleClass('active');
    $('.submenu-open i').removeClass('fa-minus');
    $('.submenu-open i').addClass('fa-plus');
    $('.menu-open').removeClass('menu-open');
    return false;
  });
  $('.submenu-open').click(function(){
    var menu = $(this).attr('submenu-pointer');
    $(menu).toggleClass('menu-open');
    $(this).find('i').toggleClass('fa-plus');
    $(this).find('i').toggleClass('fa-minus');
    return false;
  });

  //homepage
  $('#index form .submit').click(function(){
    $('#index form').hide();
    $('#index .message').show()
    $('html, body').scrollTop($('#index .inquery').offset().top);
  });
  //inquery
  $('#inquery form .submit').click(function(){
    $('#inquery form').hide();
    $('#inquery .message').show()
    window.scrollTo(0, 0);
  });

  //shopping cart
  //--q1
  $('#shoppingCart .q1 .option').click(function(){
    $(this).siblings().removeClass('selected');
    $(this).toggleClass('selected');
  });
  //--q3
  $('#shoppingCart .q3 .option').click(function(){
    $(this).toggleClass('selected');
  });
  //--submit
  $('#shoppingCart .information .button').click(function(){
    $('#shoppingCart .main').hide();
    $('#shoppingCart .message').show();
    window.scrollTo(0, 0);
    return false;
  });

  //gallery
  var $grid = $('.grid').masonry();
  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });

  //footer
  var currentYear = (new Date).getFullYear();
  $(".current-year").text( (new Date).getFullYear() );
});