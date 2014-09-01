$(document).ready(function() {


	$(".archive_issue .overlay").hover(function(){
		$(this).stop().animate({opacity: 0},600);
	}, function(){
		$(this).stop().animate({opacity: 1.0},600);
	});

	$("#search input").focus(function(){	
		if($(this).val() == 'Search'){
			$(this).val('').css("color","#000");
		}
	});

	$("#search input").blur(function(){
		if($(this).val() == ''){
			$(this).val('Search').css("color","#999");
		}
	});
	$("#ns_widget_mailchimp-email-2").focus(function(){	
		if($(this).val() == 'email'){
			$(this).val('');
		}
	});

	$("#ns_widget_mailchimp-email-2").blur(function(){
		if($(this).val() == ''){
			$(this).val('email');
		}
	});

	$(".archive-header").hover(
		function() {
			$(this).parent().find("ul").show();
		}, function() {
			$(this).parent().find("ul").hide();
		}
	);
});