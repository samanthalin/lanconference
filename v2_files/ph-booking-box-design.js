
jQuery(document).ready(function($){	
	$('.element_from,.element_from_date').click(function(){
		console.log("start date");
		$(this).focus();
		$('.ph-calendar-container').show();	
		$('.time-calendar-date-section').show();	
  		$('.ph-calendar-container .time-picker').hide();

	});
	$('.element_from_image').click(function(){

		$('.element_from').trigger('click');
		// $('.element_from_time').focus();
	});
	$('.element_to_image').click(function(){

		$('.element_to').trigger('click');
		// $('.element_from_time').focus();
	});
	$('.element_from_date_image').click(function(){

		$('.element_from_date').trigger('click');
		$('.element_from_date').focus();
	});
	$('.element_from_time_image').click(function(){

		$('.element_from_time').trigger('click');
		// $('.element_from_time').focus();
	});
	$('.element_to_date_image').click(function(){

		$('.element_to_date').trigger('click');
		// $('.element_to_date').focus();
	});
	$('.element_to_time_image').click(function(){

		$('.element_to_time').trigger('click');
		// $('.element_to_time').focus();
	});
	$('.element_to').click(function(){
		from_date=$('.element_from').val();
		if(from_date !='' && $(this).val()=='')
		{

			$('.ph-calendar-container').show();	
		}
		else
		{

			$('.element_from').trigger('click');
			$('.element_from').focus();
			$('.ph-calendar-container').show();	
		}
	});
	$('.element_from_time').click(function(){
		$('.ph_calendar_time_start').show();
		$('.ph_calendar_time_end').hide();
		from_date=$('.element_from_date').val();
		to_date=$('.element_to_date').val();
		if( $("#book_interval_type").val() == 'fixed' ){
			if(from_date!='')
			{
				$(this).focus();
				$('.ph-calendar-container').show();	
  				$('.time-calendar-date-section').hide();
  				$('.ph-calendar-container .time-picker').show();
			}
			else{
				$('.element_from_date').trigger('click');
				$('.element_from_date').focus();

  				$('.time-calendar-date-section').show();
  				$('.ph-calendar-container .time-picker').hide();
			}
		}
		else if($("#book_interval_type").val() == 'customer_choosen')
		{
			var across_the_day_booking		= jQuery('.across_the_day_booking').val();
			if(from_date!='' && across_the_day_booking=='no')
			{
				$(this).focus();
				$('.ph-calendar-container').show();	
  				$('.time-calendar-date-section').hide();
  				$('.ph-calendar-container .time-picker').show();
			}
			else if(from_date!='' && to_date!='')
			{
				if(from_date==to_date)
				{
					$(this).focus();
					$('.ph-calendar-container').show();	
	  				$('.time-calendar-date-section').hide();
	  				$('.ph-calendar-container .time-picker').show();
				}
				else
				{
					resetSelection();
					$('.element_from_date').trigger('click');
					$('.element_from_date').focus();

	  				$('.time-calendar-date-section').show();
	  				$('.ph-calendar-container .time-picker').hide();
				}
			}
			else if(from_date!='')
			{
				$(this).focus();
				$('.ph-calendar-container').show();	
  				$('.time-calendar-date-section').hide();
  				$('.ph-calendar-container .time-picker').show();
			}
			else{
				$('.element_from_date').trigger('click');
				$('.element_from_date').focus();

  				$('.time-calendar-date-section').show();
  				$('.ph-calendar-container .time-picker').hide();
			}
		}


	});
	$('.element_to_date').click(function(){
		from_date=$('.element_from_date').val();
		from_time=$('.element_from_time').val();
		end_time=$('.element_to_time').val();
		if(from_date!='' && from_time!='' && end_time!='' && $(this).val()!='')
		{

				$('.element_from_date').trigger('click');
				$('.element_from_date').focus();

  				$('.time-calendar-date-section').show();
  				$('.ph-calendar-container .time-picker').hide();
		}
		else if(from_date!='' && from_time!='')
		{
				$(this).focus();
				$('.ph-calendar-container').show();	
				$('.time-calendar-date-section').show();
				$('.ph-calendar-container .time-picker').hide();

		}	
		else if(from_date!='' )
		{
			if($(this).val()=='' || $(this).val()==from_date)
			{
			    $('.element_from_time').trigger('click');
			    $('.element_from_time').focus();
				$('.ph-calendar-container').show();	
				$('.time-calendar-date-section').hide();
				$('.ph-calendar-container .time-picker').show();
			}
			else
			{
				$('.element_from_date').trigger('click');
				$('.element_from_date').focus();

  				$('.time-calendar-date-section').show();
  				$('.ph-calendar-container .time-picker').hide();

			}
		}
		else
		{

				$('.element_from_date').trigger('click');
				$('.element_from_date').focus();

  				$('.time-calendar-date-section').show();
  				$('.ph-calendar-container .time-picker').hide();
		}

	});

	$('.element_to_time').click(function(){
		$('.ph_calendar_time_start').hide();
		$('.ph_calendar_time_end').show();
		from_date=$('.element_from_date').val();
		from_time=$('.element_from_time').val();
		to_date=$('.element_to_date').val();
		if($("#book_interval_type").val() == 'customer_choosen')
		{
			var across_the_day_booking		= jQuery('.across_the_day_booking').val();
			if($(this).val()!='' && across_the_day_booking=='no' )
			{
				console.log("end time selected");
				$('.element_from_time').trigger('click');
				$('.element_from_time').focus();

				$('.ph-calendar-container').show();	
  				$('.time-calendar-date-section').hide();
  				$('.ph-calendar-container .time-picker').show();
			}
			else if($(this).val()!='' && across_the_day_booking!='no' )
			{

  				if(from_date==to_date)
				{
					$('.element_from_time').trigger('click');
					$('.element_from_time').focus();

					$('.ph-calendar-container').show();	
	  				$('.time-calendar-date-section').hide();
	  				$('.ph-calendar-container .time-picker').show();
				}
				else
				{
					$('.element_from_date').trigger('click');
					$('.element_from_date').focus();

	  				$('.time-calendar-date-section').show();
	  				$('.ph-calendar-container .time-picker').hide();
				}
			}
			else if(from_date!='' && from_time!='' && across_the_day_booking=='no')
			{
				$(this).focus();
				$('.ph-calendar-container').show();	
  				$('.time-calendar-date-section').hide();
  				$('.ph-calendar-container .time-picker').show();
			}
			else if(from_date!='' && from_time=='' && across_the_day_booking=='no')
			{
				$('.element_from_time').trigger('click');
				$('.element_from_time').focus();

				$('.ph-calendar-container').show();	
  				$('.time-calendar-date-section').hide();
  				$('.ph-calendar-container .time-picker').show();
			}
			else if(from_date!='' && from_time!='' && to_date!='' && across_the_day_booking!='no')
			{
				$(this).focus();
				$('.ph-calendar-container').show();	
  				$('.time-calendar-date-section').hide();
  				$('.ph-calendar-container .time-picker').show();
			}
			else if(from_date!='' && from_time!='' && to_date=='' && across_the_day_booking!='no')
			{
				$('.element_to_date').trigger('click');
				$('.element_to_date').focus();

  				$('.time-calendar-date-section').show();
  				$('.ph-calendar-container .time-picker').hide();
			}
			else if(from_date!='' && from_time=='' && across_the_day_booking!='no')
			{
				$('.element_from_time').trigger('click');
				$('.element_from_time').focus();

				$('.ph-calendar-container').show();	
  				$('.time-calendar-date-section').hide();
  				$('.ph-calendar-container .time-picker').show();
			}
			else{
				$('.element_from_date').trigger('click');
				$('.element_from_date').focus();

  				$('.time-calendar-date-section').show();
  				$('.ph-calendar-container .time-picker').hide();
			}
		}


	});
	function resetSelection( fullReset ){
		console.log("reseted from box");
		$('.reset_action').val(2);
		$('.reset_action').change();
	}
	$('.element_from,.element_from_date').change(function(){
		clear_blocks();

	});
	function clear_blocks()
	{

		// $(".ph-date-from").val("");
		$(".ph-date-to").val("");
		$('.element_from').val("");
		$('.element_to').val("");
		// $('.element_from_date').val("");
		$('.element_from_time').val("");
		$('.element_to_date').val("");
		$('.element_to_time').val("");
	}
	mouse_is_inside = true;
	$('.ph-calendar-box-container,.ph-calendar-container').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });
    $('body').click(function(){
    	if(mouse_is_inside==false)
    	{
    		$('.ph-calendar-container').hide();	
    	}
    })
});
