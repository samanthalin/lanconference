$(document).ready(function(){
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
	//footer
	var currentYear = (new Date).getFullYear();
	$(".current-year").text( (new Date).getFullYear() );
});