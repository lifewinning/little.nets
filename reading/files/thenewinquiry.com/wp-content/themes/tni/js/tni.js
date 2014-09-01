function twitter_sidebar (data) {
    'use strict';
    var ago,
        block,
        entities,
        entities_map,
        entity_types,
        entity_type,
        entity,
        hashtag,
        hashtags,
        i, j, k,
        mentions,
        timestamp,
        text,
        tweet,
        url,
        urls,
        url_regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi,
        url_link = function (text, entities) {
            return text.replace(url_regexp, function(match) {
                var url = (/^[a-z]+:/i).test(match) ? match : "http://"+match;
                var text = match;
                for(var i = 0; i < entities.length; ++i) {
                    var entity = entities[i];
                    if (entity.url == url && entity.expanded_url) {
                        url = entity.expanded_url;
                        text = entity.display_url;
                        break;
                    }
                }
                return "<a href=\""+escape_html(url)+"\">"+escape_html(text)+"</a>";
            });
        },
        escape_html = function (s) {
            return s.replace(/</g,"&lt;").replace(/>/g,"^&gt;");
        };
        
    block = jQuery('#tweet-copy');
    tweet = data[0];
    text = tweet.text;
    entities_map = {};
    /**
     * entities = { offset: [type, string] }
     */
    entity_types = ['hashtags', 'user_mentions', 'urls'];
    for (i in entity_types) {
        entity_type = entity_types[i];
        entities = tweet.entities[entity_type];
        if (entities.length > 0) {
            if (entity_type === 'urls') {
                text = url_link(text, entities);
            }
        }
    }
    text = text.replace(/(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi,
        ' <a href="http://search.twitter.com/search?q=&tag=$1&lang=all&from=newinquiry%2BOR%2B">#$1</a>')
        .replace(/(^|[\W])@(\w+)/gi, "$1@<a href=\"http://twitter.com/$2\">$2</a>");
    block 
        .append('<span>' + text  + '</span>');
}

(function ($) {
    // latest tweet in header
    $.post('/wp-content/themes/tni/js/test_feed.php',
        function(data){
            $('#tweet-copy').append(data);
    });
    /*'use strict';
    var callback,
        handle,
        uri;
    callback = 'twitter_sidebar';
    handle = 'newinquiry';
    uri = 'https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=' + handle + '&count=1&exclude_replies=true&callback=' + callback;
    $('body')
        .append('<script src="' + uri + '" />');*/
}(jQuery));

(function ($) {
    // block quotes
    'use strict';
    $('.content blockquote')
        .prepend('<em class="quote open"><img src="/wp-content/themes/tni/img/block-quote-left.jpg" alt="" /></em>')
        .append('<em class="quote close"><img src="/wp-content/themes/tni/img/block-quote-right.jpg" alt="" /></em>');
}(jQuery));

(function ($) {
    return;
    // margin notes
    'use strict';
    var notes;
    notes = $('#single .content .margin-note');
    notes.each(function(i, el) {
        var align,
            featured,
            note,
            side,
            type,
            offset,
            wrapper;
        note = $(el);
        align = note.data('align');
        side = note.data('side');
        type = note.data('type');
        wrapper = $('<div class="margin-note-wrapper margin-note-align-' + align + '" />');
        if (type === 'note') {
            offset = note.position().top;
        } else if (type === 'credit') {
            featured = $('#single .featured-image');
            offset = featured.position().top;
            offset += featured.outerHeight(true);
            offset -= note.outerHeight(true);
        }
                //'top': offset
        wrapper
            .addClass('margin-note-wrapper-' + side)
            .css({
                'top': offset
            })
            .appendTo('#single .content')
            .append(note);
    });
}(jQuery));

(function ($) {
    'use strict';
    // magazine subscribe form
    $(function () {
        var button,
            fields,
            form,
            images,
            inputs,
            link,
            popup,
            result;
        popup = $('#subscribe-form');
        form = $('form', popup);
        fields = $('.field', form);
        images = $('img', form);
        inputs = $('input', form);
        button = $('a', form);
        result = $('p.result', form);
        form
            .submit(function(){
                $(this).trigger('clear-placeholder');
            });
        /*
        function sweep(i)
        {
            inputs.each(function (j) {
                var input;
                input = inputs.eq(j);
                if (j === i) {
                    input
                        .show()
                        .focus();
                    images.eq(i).hide();
                } else if (input.val() === '') {
                    input.hide();
                    images.eq(j).show();
                } else {
                    input.show();
                    images.eq(i).hide();
                }
            });
        }

        fields.each(function (i, field) {
            images.eq(i).click(function () {
                sweep(i);
            });
            inputs.eq(i).click(function () {
                sweep(i);
            });
        });
        */
    });
}(jQuery));
(function ($) {
    'use strict';
    // sideline newsletter popup
    $(function () {
        var button,
            close,
            fields,
            form,
            images,
            inputs,
            links,
            popup,
            result;
        links = $('a[rel="newsletter-popup"]');
        popup = $('#popup-newsletter');
        close = $('#popup-newsletter-close');
        form = $('form', popup);
        fields = $('.field', form);
        images = $('img', form);
        inputs = $('input', form);
        button = $('button', form);
        result = $('p.result', form);
        /*
        function sweep(i)
        {
            inputs.each(function (j) {
                var input;
                input = inputs.eq(j);
                if (j === i) {
                    input
                        .show()
                        .focus();
                    images.eq(i).hide();
                } else if (input.val() === '') {
                    input.hide();
                    images.eq(j).show();
                } else {
                    input.show();
                    images.eq(i).hide();
                }
            });
        }

        fields.each(function (i, field) {
            images.eq(i).click(function () {
                sweep(i);
            });
            inputs.eq(i).click(function () {
                sweep(i);
            });
        });
        */

        links.click(function (e) {
            e.stopPropagation();
            popup
                .show()
                .click(function (e) {
                    e.stopPropagation();
                });
            return false;
        });
        close.click(function () {
            popup.hide();
        });
        button.click(function () {
            var data,
                first_name,
                last_name,
                email,
                city;
            form.trigger('clear-placeholder');
            first_name = $('input[name="first-name"]', form);
            last_name = $('input[name="last-name"]', form);
            email = $('input[name="email"]', form);
            city = $('input[name="city"]', form);
            data = {
                action: 'newsletter_subscribe',
                first_name: first_name.val(),
                last_name: last_name.val(),
                email: email.val(),
                city: city.val()
            };
            result.text('');

            jQuery.post('/wp-admin/admin-ajax.php', data, function(response) {
                if (response.status) {
                    result.text('Thank you. Please click on the link in the email we sent to you to confirm your subscription.');
                } else {
                    result.append('<em>There was a problem. Please check your form and try again.</em>');
                    $('input', form).focusout();
                }
            }, 'json');
            return false;
        });
    });
}(jQuery));

(function ($) {
    'use strict';
    $(function () {
        $('body')
            .click(function () {
                $('#popup-newsletter').hide();
            });
    });
}(jQuery));

// removing hover underlines for anchors with images
(function ($) {
    'use strict';
    $(function () {
        $('a').has('img').attr('rel', 'image');
    });
}(jQuery));

// search
(function ($) {
    'use strict';
    $(function () {
        $('#search form')
            .submit(function () {
                var el = $(this);
                el.trigger('clear-placeholder');
                $('input[name="q"]').val($('input[name="s"]').val());
                return true;
            });
    });
}(jQuery));

(function ($) {
    $(function(){
        $('form')
            .bind('clear-placeholder', function(){
                $('input, textarea', this)
                    .each(function(){
                        var el = $(this);
                        if (el.attr('placeholder') === el.val())
                        {
                            el.val('');
                        }
                    });
            });
        $('input, textarea')
            .focusout(function(){
                var el = $(this);
                if (el.val().length === 0)
                {
                    el.val(el.attr('placeholder'));
                }
            })
            .focusin(function(){
                var el = $(this);
                if (el.val() === el.attr('placeholder'))
                {
                    el.val('');
                }
            })
            .each(function(){
                $(this).focusout();
            });
    });
})(jQuery);

//navigation fix for ARCHIVE anchor link
(function ($) {
    'use strict';
    $(function () {
        var url = location.href,
            nav = $('nav#access'),
            archive_img = nav.find('img[alt="Archive"]'),
            magazine_img = nav.find('img[alt="Magazine"]');

        if(url.indexOf('publications/magazines/#listing') !== -1){
            archive_img.attr('src', 'http://tni.kratedev.com/wp-content/themes/tni/img/nav/archive-on.png');
            magazine_img.attr('src', 'http://tni.kratedev.com/wp-content/themes/tni/img/nav/magazine-off.png');

            archive_img.parent().parent().removeClass('off').addClass('on');
            magazine_img.parent().parent().removeClass('on').addClass('off');
        }
    });
}(jQuery));
