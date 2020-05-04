jQuery(document).ready(function($){
	$(".span-month").hide();
	$(".span-year").hide();
	const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
	month = jQuery( ".callender-month" ).val();
	year = jQuery( ".callender-year" ).val();
	month=get_month(month);
	date = year+"-"+month+"-02";
	console.log("strt date"+date);
	// date= "2019-11-01";
	current_date=new Date(date);
	var offset 			= new Date().getTimezoneOffset();
	offset 				= offset == 0 ? 0 : -offset;
	console.log("-----------------offset--------------",offset);
	var new_date 		= new Date(current_date.getTime() - ((offset) * 60000) );
	current_date=new_date
	console.log(current_date);

    next_year = new Date(current_date.getFullYear() + parseInt(2), current_date.getMonth(),current_date.getDate());
    // alert(next_year);
    html='';
    console.log(current_date);
    while(current_date<=next_year)
    {
    	// console.log(current_date);
    	html+="<option data-month='"+monthNames[current_date.getMonth()]+"' data-year='"+current_date.getFullYear()+"' value='"+monthNames[current_date.getMonth()]+"-"+current_date.getFullYear()+"'>"+ph_booking_month_picker_date.months[current_date.getMonth()]+" "+current_date.getFullYear()+"</option>";

    	current_date = new Date(current_date.getFullYear() , current_date.getMonth()+ parseInt(1),current_date.getDate());
    }
	$('.month-year-wraper').append("<select style='text-transform: uppercase;'' class='booking_month' id='booking_month'>"+html+"</slecet>");
	$(".booking_month").change( function(){
		// alert(jQuery(this).find(':selected').attr('data-month'));
		// jQuery( ".callender-month" ).val(jQuery(this).find(':selected').attr('data-month'));
		// jQuery( ".callender-year" ).val(jQuery(this).find(':selected').attr('data-year'));
		year=jQuery(this).find(':selected').attr('data-year');
		month=jQuery(this).find(':selected').attr('data-month');
		month=get_month(month);
		date = year+"-"+month+"-02";
		date=new Date(date);

		var offset 			= new Date().getTimezoneOffset();
		offset 				= offset == 0 ? 0 : -offset;
		var new_date 		= new Date(date.getTime() - ((offset) * 60000) );
		date=new_date
		// console.log(" new "+date);
	    previous_month = new Date(date.getFullYear() , date.getMonth() - parseInt(1),date.getDate());
		// return false;
		// resetSelection() // The plugin is not supports to select backward.
		product_id = jQuery( "#phive_product_id" ).val();
		month = jQuery( ".callender-month" ).val();
		year = jQuery( ".callender-year" ).val();
		month=monthNames[previous_month.getMonth()];
		year=previous_month.getFullYear();
		calender_type= jQuery("#calender_type").val();
		if(calender_type=='time'){
			calendar_for='time-picker';
		}
		else if(calender_type == 'date' ){
			calendar_for = 'date-picker';
		}else{
			calendar_for = '';
		}
		var data = {
			action: 'phive_get_callender_next_month',
			// security : phive_booking_locale.security,
			product_id: product_id,
			month: month,
			year: year,
			calendar_for:calendar_for,
			asset: $(".input-assets").val(),
		};
		
		$("#ph-calendar-overlay").show();
		
		$.post( ph_booking_month_picker_date.ajaxurl, data, function(res) {
			$("#ph-calendar-overlay").hide();
			if(calender_type=='time'){
				$("#ph-calendar-time").html( '<center>'+ph_booking_month_picker_date.Please_Pick_a_Date+'</center>');
			}

			result = jQuery.parseJSON(res);

			$("#ph-calendar-days").html(result.days);

			jQuery( ".callender-month" ).val(result.month);
			jQuery( ".callender-year" ).val(result.year);
			
			jQuery( ".span-month" ).html( ph_booking_month_picker_date.months[monthNames.indexOf(result.month)] )
			jQuery( ".span-year" ).html(result.year)
			
			//override_deactive_by_charge_by_night();

		});
	})
	$('.callender-month').change(function(){
		month=$('.callender-month').val();
		year=$('.callender-year').val();

		old_month=jQuery('.booking_month').find(':selected').attr('data-month');
		// alert(old_month);
		if(month=='December' && old_month=='January')
		{
			year=parseInt(year)-1;
		}
		else if(old_month=='December' && month=='January')
		{
			year=parseInt(year)+1;
		}
		// alert(month+"-"+year);
		$('.booking_month').val(month+"-"+year);
		// $('.booking_month').each(function(){

		// });
	});
});
function get_month(month)
{
	var monthArray = new Array();
	monthArray["January"]="01";
	monthArray["February"]="02";
	monthArray["March"]="03";
	monthArray["April"]="04";
	monthArray["May"]="05";
	monthArray["June"]="06";
	monthArray["July"]="07";
	monthArray["August"]="08";
	monthArray["September"]="09";
	monthArray["October"]="10";
	monthArray["November"]="11";
	monthArray["December"]="12";
	return monthArray[month];

}