(function ($) {
    'use strict';
    $(function(){
        var data,
            form,
            first_name,
            last_name,
            email,
            city,
            referral,
            error_msg = $('<p class="error">Please fill in all fields</p>'),
            archive_list = $('.hidden-archive-list'),
            read_more = $('.read-more');
        form = $('form#subscribe');
        first_name = $('input[name="first-name"]', form);
        last_name = $('input[name="last-name"]', form);
        email = $('input[name="email"]', form);
        city = $('input[name="city"]', form);
        referral = $('input[name="referral"]', form);
        form.before(error_msg.hide());

        // {{{ function prepare() 
        function prepare() 
        {
            var isValid = function(data){
                if (data.first_name === first_name.attr('placeholder') || data.first_name === '')
                {
                    return false;
                }
                if (data.last_name === last_name.attr('placeholder') || data.last_name === '')
                {
                    return false;
                }
                if (data.email === email.attr('placeholder') || data.email === '')
                {
                    return false;
                }
                if (data.city === city.attr('placeholder') || data.city === '')
                {
                    return false;
                }
                return true;
            };

            data = {
                action: 'magazine_subscribe_prepare',
                first_name: first_name.val(),
                last_name: last_name.val(),
                email: email.val(),
                city: city.val(),
                referral: referral.val()
            };
            if (isValid(data)) {
                error_msg.hide();
                $.post('/wp-admin/admin-ajax.php', data, function(response) {
                    var form,
                        i,
                        params;
                    if (response.skip_amazon === true)
                    {
                        if(response.success === false){
                            error_msg.html('There was an error subscribing you to the Magazine Subscription.');
                            error_msg.show();
                            return false;
                        }
                        else{
                            location.href = '/publications/magazines/subscribe/thank-you/';
                        }
                    }
                    else
                    {
                        form = $('<form style="display:hidden;" method="POST" action="' + response.endpoint + '" />');
                        params = response.params;
                        for (i in params) {
                            if (params.hasOwnProperty(i))
                            {
                                form.append('<input type="hidden" name="' + i + '" value="' + params[i] + '" />');
                            }
                        }
                        form
                            .append('<input type="hidden" name="signature" value="' + response.signature + '" />')
                            .appendTo('body');
                        form.submit();
                    }
                }, 'json');
            } else {
                error_msg.html('Please fill in all fields');
                error_msg.show();
            }
            return false;
        }
        // }}}

        $('form#subscribe').submit(function () {
            return prepare();
        });
        $('form#subscribe a').click(function () {
            return prepare();
        });

        $('.open-archive').click(function(){
            if(archive_list.hasClass('opened')){
                archive_list.removeClass('opened');
            }
            else{
                archive_list.addClass('opened');
            }
            archive_list.toggle(400);
        });

        $('.about-archive-link').click(function(event){
                event.preventDefault();
                var el = $(this),
                    url = window.location.href.split('#'),
                    target = $('#listing-previous').find(el.attr('href'));
                window.location.href= url[0] + el.attr('href');
            console.log(archive_list.hasClass('opened'));
            if(!archive_list.hasClass('opened')){
                $('.open-archive').click();
            }
            $('html, body').stop().animate(
                { 'scrollTop': target[0].offsetTop - 10 },
                400, 'swing');
        });

        $('#spreads-listing li a').each(function(){
            $(this).html('<img src="'+$(this).data('thumb')+'"/>');
        });

        $('.continue-reading').click(function(){
            read_more.slideDown(400);
            $(this).css({ visibility: 'hidden' });
        });

    });
}(jQuery));
