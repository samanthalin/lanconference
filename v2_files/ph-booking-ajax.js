
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

jQuery(document).ready(function ($) {
  function generate_booking_info_text(from, to, cost,custom_messages,result) {
    $('.display_time_from').val(from);
    $('.display_time_to').val(to);
    if ($('#calender_type').val() == 'date' && $('#charge_per_night').length && $('#charge_per_night').val() == 'yes') {
      from_text = phive_booking_ajax.checkin;
      to_text = phive_booking_ajax.checkout;
    } else {
      from_text = phive_booking_ajax.booking;
      to_text = phive_booking_ajax.to;
    }
    if (from !== to && phive_booking_ajax.display_end_time) 
    {
      from_date=new Date(result.org_from_date);
      to_date=new Date(result.org_to_date);
      if($('#calender_type').val() != 'date' && $('#calender_type').val() != 'month'  && from_date.getMonth()==to_date.getMonth() && from_date.getFullYear()==to_date.getFullYear() && from_date.getDate()==to_date.getDate())
      {
        var wp_date_format    = jQuery("#ph_booking_wp_time_format").val();
        var hours = to_date.getHours();
        var ampm = hours >= 12 ? 'pm' : 'am';
        to_time   = ph_convert_time_to_wp_time_format(wp_date_format,to_date,ampm);
        date_html = "<b>" + from_text + ":</b>&nbsp;" + from + "&nbsp;<b>" + to_text + "</b>&nbsp;"+to_time ;
      }
      else
      {
        date_html = "<b>" + from_text + ":</b>&nbsp;" + from + "&nbsp;<b>" + to_text + "</b>&nbsp;" + to;  
      }
      
    } else {
      date_html = "<b>" + phive_booking_ajax.booking + ":</b>&nbsp;" + from;
    } //for Addon


    jQuery('.from_text').val(from_text);
    jQuery('.to_text').val(to_text).trigger('change');
    if(custom_messages == '')
      return '<p id="booking_info_text">' + date_html + '</p> <p id="booking_price_text"> <b>' + phive_booking_ajax.booking_cost + ':&nbsp;</b>' + cost + '</p>';
    else
      return '<p id="booking_info_text">' + date_html + '</p> <p id="booking_price_text"> <b>' + phive_booking_ajax.booking_cost + ':&nbsp;</b>' + cost + '</p> <p id="booking_custom_text"> ' + custom_messages + '</p>';
  }
  function timezoneOffset(date_string){
        // passing default parameter value doesn't work in safari
        if (date_string === undefined || !date_string) 
        {
          date_string = '';
        }
        let date = new Date(date_string),
            timezoneOffset = date.getTimezoneOffset(),
            hours = ('00' + Math.floor(Math.abs(timezoneOffset/60))).slice(-2),
            minutes = ('00' + Math.abs(timezoneOffset%60)).slice(-2),
            string = (timezoneOffset >= 0 ? '-' : '+') + hours + ':' + minutes;
        return string;
    }
function ph_convert_date_to_wp_date_format(wp_format,date){
  
  months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  new_date = new Date(date+'T'+'00:00'+timezoneOffset(date));
  
  month = ( "0" + ( new_date.getMonth() + 1 ) ).slice(-2);
  date = ( "0" + new_date.getDate() ).slice(-2);
  switch(wp_format){
    case 'j F Y':display_date =  date+' '+phive_booking_ajax.months[new_date.getMonth()]+' '+new_date.getFullYear();
    break;
    case 'F j, Y':display_date =  phive_booking_ajax.months[new_date.getMonth()]+' '+date+', '+new_date.getFullYear();
    break;
    case 'Y-m-d' :display_date = new_date.getFullYear()+'-'+month+'-'+date;
    break;
    case 'm/d/Y': display_date = month+'/'+date+'/'+new_date.getFullYear();
    break;
    case 'd/m/Y': display_date = date+'/'+month+'/'+new_date.getFullYear();
    break;
    default: display_date = new_date.getFullYear()+'-'+month+'-'+date;
    break;

  }
  return display_date;
}
function ph_convert_time_to_wp_time_format(wp_format,date,am_pm){
  var hours = date.getHours();
  var minutes = date.getMinutes();
  wp_format = wp_format+"";
  switch(wp_format){
    case "g:i a":
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes; 
                display_time = hours + ':' + minutes +' '+am_pm.toLowerCase();
               break;
    case "g:i A": 
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
              display_time = hours + ':' + minutes +' '+am_pm.toUpperCase();
            break;
    case "H:i": 
              hours=hours.toString().padStart(2,0);
              minutes=minutes.toString().padStart(2,0);
              display_time = hours+':'+minutes;
            break;
    case "G \\h i \\m\\i\\n": 
              display_time = hours+' h '+minutes+' min';
            break;
    default : 
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
              display_time = hours + ':' + minutes +' '+am_pm.toUpperCase();
      break;

  }
  return display_time;
}
  function resetSelection(fullReset) {
    console.log("reseted from ajax");
    fullReset = fullReset || 'yes';
    date_from = '';
    date_to = '';
    click = 0;
    $(".single_add_to_cart_button").addClass("disabled");
    $(".selected-date").each(function () {
      $(this).removeClass("selected-date");
    });

    $(".ph-date-from").val("");
    $(".ph-date-to").val("");
    $('.element_from').val("");
    $('.element_to').val("");
    $('.element_from_date').val("");
    $('.element_from_time').val("");
    $('.element_to_date').val("");
    $('.element_to_time').val("");

    if (fullReset == 'yes') {
      $(".booking-info-wraper").html("");
    }

    if ($(".not-startable").length) {
      $(".not-startable").removeClass("hide-not-startable");
    }
  }
  /*function formate_date( input_date ){
    var date = new Date( input_date.replace(/-/g, "/") ); //Safari bowser will accept only with seprator '/'
    
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
    var strDate = date.getDate() + '-' + month + '-' + date.getFullYear();
      if( $("#calender_type").val() =='time' ){
      strDate += " ";
      strDate += date.getHours()<10 ? "0"+date.getHours() : date.getHours();
      strDate += ":"
      strDate += date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
    }
    return strDate;
  }*/
  // Calculate the booking price.


  jQuery(".ph-date-to").on('change', function () {
    calculate_booking_price();
  });
  jQuery(".addon,.wc-pao-addon-field,.ph-addons").on('change', function () {
    from = jQuery(".ph-date-from").val();

    if (from != '') {
      calculate_booking_price();
    }
  });

  function calculate_booking_price() {
    if ($('.input-disabled').length || !jQuery(".ph-date-from").length) {
      return;
    }

    $(".shipping-price-related").addClass('input-disabled');
    $(".shipping-price-related").attr("disabled", true);

    var loding_ico_url = $("#plugin_dir_url").val() + "/resources/icons/loading2.gif";
   
    $(".booking-info-wraper").html('<img class="loading-ico" align="middle" src="' + loding_ico_url + '">');
    $(".single_add_to_cart_button").addClass("disabled");
    var from = jQuery(".ph-date-from").val();
    var to = jQuery(".ph-date-to").val();
    var person_details = [];
    $('.input-person').each(function () {
      if ($(this).val() != '') person_details.push(parseInt($(this).val()));else person_details.push(0);
    }); // for range values select min available slot

    var available_slots = $('.selected-date').map(function () {
      var attr = $(this).attr('data-title');

      if (_typeof(attr) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined)) && attr !== false) {
        return parseInt($(this).attr('data-title'));
      } else {
        if ($(this).text() == '' || ( $( ".selected-date" ).last().find('.callender-full-date').val() == $(this).find('.callender-full-date').val() && $('#charge_per_night').val()=='yes') ) return; // If try to book between months or per night booking and Consider each participant as booking is marked 
        return 0;
      }
    }).get();
    var available_slot = Math.min.apply(Math, available_slots); // for range values select min available slot

    var available_slots_to_displays = $('.selected-date').map(function () {
      var attr = $(this).attr('data-max');

      if (_typeof(attr) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined)) && attr !== false) {
        return parseInt($(this).attr('data-max'));
      } else {
        if ($(this).text() == ''  )  return; // If try to book between months and Consider each participant as booking is marked

        return 0;
      }
    }).get();
    var available_slots_to_display = Math.min.apply(Math, available_slots_to_displays);
    var persons_as_booking = $('#persons_as_booking').val();

    if (persons_as_booking == 'yes') {
      person_details_count = person_details.reduce(function (a, b) {
        return a + b;
      }, 0);

      if (person_details_count > available_slot) {
        var message = phive_booking_ajax.available_slot_message;
        message = message.replace('%available_slot', available_slots_to_display);
        $('.booking-info-wraper').html('<p id="booking_info_text"><span class="not-available-msg">' + message + '</span></p>');
        $(".shipping-price-related").removeClass('input-disabled');
        $(".shipping-price-related").removeAttr("disabled");
        return false;
      }
    }

    var total_numer_persons = 0;
    $('.input-person').each(function () {
      // total_numer_persons += parseInt($(this).val());
      Number.isInteger = Number.isInteger || function(value)
       {
         return typeof value === 'number' &&
         isFinite(value) &&
         Math.floor(value) === value;
       };
      if(Number.isInteger(parseInt($(this).val())))
      {
        total_numer_persons += parseInt($(this).val());
      }
    });

    if (persons_as_booking != 'yes' && total_numer_persons > parseInt($('#phive_booking_maximum_number_of_allowed_participant').val()) && parseInt($('#phive_booking_maximum_number_of_allowed_participant').val()) != 'NaN') {
      var message = phive_booking_ajax.maximum_participant_warning;
      message = message.replace('%total', total_numer_persons);
      message = message.replace('%max', parseInt($('#phive_booking_maximum_number_of_allowed_participant').val()));
      $('.booking-info-wraper').html('<p id="booking_info_text"><span class="not-available-msg">' + message + '</span></p>');
      $(".shipping-price-related").removeClass('input-disabled');
      $(".shipping-price-related").removeAttr("disabled");
      return false;
    }

    // if (persons_as_booking != 'yes' && total_numer_persons < parseInt($
    if (total_numer_persons < parseInt($('#phive_booking_minimum_number_of_required_participant').val()) && parseInt($('#phive_booking_minimum_number_of_required_participant').val()) != 'NaN') {
      var message = phive_booking_ajax.minimum_participant_warning;
      // message = message.replace('%total', total_numer_persons);
      message = message.replace('%min', parseInt($('#phive_booking_minimum_number_of_required_participant').val()));
      $('.booking-info-wraper').html('<p id="booking_info_text"><span class="not-available-msg">' + message + '</span></p>');
      $(".shipping-price-related").removeClass('input-disabled');
      $(".shipping-price-related").removeAttr("disabled");
      return false;
    }

    resources_type=$('.resources_type').val();
    if(resources_type=='single')
    {
      resources_details = [];
      selected_resources=$('.phive_book_resources').val();
      $(".phive_book_resources option").each(function(i){
        if($(this).val()=='')
          return true;
        val='no';
        if(selected_resources == $(this).val())
        {
          val='yes';
        }
        resources_details.push(val);
      });
    }
    else
    {
      resources_details = [];
      $('.input-resources').each(function () {
        val = $(this).is(":checked") ? 'yes' : 'no';
        resources_details.push(val);
      });
    }

    product_id = jQuery("#phive_product_id").val();

    if (from.length === 0 || to.length === 0) {
      return;
    }

    $(".ph_booking_addon_data").val();
    addon_data = jQuery('.addon').serialize();
    if(parseInt($(".wc-pao-addon-field").length)>0)
    {
      addon_data = jQuery('.wc-pao-addon-field').serialize();
    }
     product_addon_data = '';
    if(parseInt($(".phive-addon-field").length)>0)
    {
      product_addon_data = jQuery('.phive-addon-field').serialize();
    }
    custom_time_period = '';
    if ($(".cutome_time_period").length > 0)
    {
        custom_time_period =  $(".cutome_time_period").find(':selected').val();
    }
    var data = {
      action: 'phive_get_booked_price',
      // security : phive_booking_ajax.security,
      product_id: product_id,
      book_from: from,
      book_to: to,
      person_details: person_details,
      resources_details: resources_details,
      addon_data: addon_data,
      product_addon_data: product_addon_data,
      asset: $(".input-assets").val(),
      custom_fields: $(".custom_fields").val(),
      custom_time_period: custom_time_period
    };
    jQuery(".ph-calendar-date").prop('disabled', true);
    $.post(phive_booking_ajax.ajaxurl, data, function (res) {
      result = jQuery.parseJSON(res);
      jQuery(".ph-calendar-date").prop('disabled', false); // Confirm the response of last request.
      // The price should updated only for last request incase another request send immediately

      $(".shipping-price-related").removeClass('input-disabled');
      $(".shipping-price-related").removeAttr("disabled");
      $(".single_add_to_cart_button").removeClass("disabled");
      $(".callender-msg").html('');

      if (result.error_msg) {
        resetSelection();
        $('.booking-info-wraper').html(result.error_msg);
        // $("#phive_booked_price").val('');
        $(".phive_booked_price").val('');
        // $(".phive_book_assets").val(asset);
      } else {
        if (to != '') {
          var to_date_obj = new Date(to);
          var from_date_obj = new Date(from);

          if (from_date_obj.getTime() > to_date_obj.getTime()) {
            resetSelection();
            $('.booking-info-wraper').html('<p id="booking_info_text"><span class="not-available-msg">Booking start date cannot be higher than end date.</span></p>');
            // $("#phive_booked_price").val('');
            $(".phive_booked_price").val('');
            $(".phive_book_assets").val('');
          } else {
            // $(".price").html( result.price_html ); //to change the main product price
            // $("#phive_booked_price").val(result.price);
            $(".phive_booked_price").val(result.price);
            $(".phive_book_assets").val(result.asset_id); //in the case of monthpicker, take last date of 'TO' month
            var custom_messages='';
            if(result.custom_messages)
            {
              custom_messages=result.custom_messages;
            }

            if(result.product_addon_data)
            {
              $(".ph_booking_product_addon_data").val(result.product_addon_data);
            }

            if(result.addon_data)
            {
              $(".ph_booking_addon_data").val(result.addon_data);
            }
            /*if( (to.match(new RegExp("-", "g")) || []).length < 2 ){
              var date = new Date( to.replace(/-/g, "/") ); //Safari bowser will accept only with separator '/'
              var LastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
              to = to+"-"+LastDay.getDate();
            }*/

            booking_info_text = generate_booking_info_text(result.from_date, result.to_date, result.price_html,custom_messages,result);
            $('.booking-info-wraper').html(booking_info_text).trigger('change');
          }
        }
      }
    });
  }

//   $('.time-picker-wraper #ph-calendar-days').on("click", ".ph-calendar-date", function () {
  $('.time-picker-wraper .ph-ul-date').on("click", ".ph-calendar-date", function () {
    var from = jQuery(".ph-date-from").val();
    var to = jQuery(".ph-date-to").val();

    var loding_ico_url = $("#plugin_dir_url").val() + "/resources/icons/loading2.gif";
    $(".ph-ul-time").show();
//     $("#ph-calendar-time").html('<img class="loading-ico" align="middle" src="' + loding_ico_url + '">');
  $(".ph-ul-time").html('<img class="loading-ico" align="middle" src="' + loding_ico_url + '">');
    var product_id = jQuery("#phive_product_id").val();
    if(from=='' || (from!='' && to!='') )
    {
      $(".ph-calendar-overlay").show();
      from_date=convert_date_to_wp_format($('.timepicker-selected-date .callender-full-date').val());
      $('.element_from_date').val(from_date).change();
      $('.element_from_time').val('');
      $('.element_from_time').scrollTop();
      $('.element_from_time').trigger('click');
      $('.element_from_time').focus();
      $('.element_to_date').val('');
      $('.element_to_time').val('');
    }
    else{
      $(".ph-calendar-overlay").show();
      to_date=convert_date_to_wp_format($('.timepicker-selected-date .callender-full-date').val());
      $('.element_to_date').val(to_date);
      $('.element_to_time').val('');
      $('.element_to_time').scrollTop();
      $('.element_to_time').trigger('click');
      $('.element_to_time').focus();
    }
    var data = {
      action: 'phive_get_booked_datas_of_date',
      product_id: product_id,
      date: $('.timepicker-selected-date .callender-full-date').val(),
      type: 'time-picker',
      asset: $(".input-assets").val()
    };
    jQuery(".ph-calendar-date").prop('disabled', true);
    $.post(phive_booking_ajax.ajaxurl, data, function (res) {

      $(".ph-calendar-overlay").hide();
      jQuery(".ph-calendar-date").prop('disabled', false);
      // $("#ph-calendar-time").html(res).trigger('change');

      if($('#calendar_design').val()=='3')
      {
        $('.time-calendar-date-section').hide();
        $('.ph-calendar-container .time-picker').show();
      }
      $(".ph-ul-time").html(res);
      // change slot time as end time while showing time calendar for end time
      if($('#calendar_design').val()=='3')
      {
        if(from!='' &&  to=='' ) 
        {
          $('.ph_calendar_time_start').hide();
          $('.ph_calendar_time_end').show();
        }
      }
      $('#ph-calendar-time').trigger('change');
      $(this).addClass("timepicker-selected-date");
      $(".booking-info-wraper").html('');
    });
  });

  function convert_date_to_wp_format(date)
  {
      var wp_date_format    = jQuery("#ph_booking_wp_date_format").val();
      date=ph_convert_date_to_wp_date_format(wp_date_format,date);
      return date;
  }
});