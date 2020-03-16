$(document).ready(function(){
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
	//footer
	var currentYear = (new Date).getFullYear();
	$(".current-year").text( (new Date).getFullYear() );
});