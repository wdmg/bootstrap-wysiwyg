/**
 * Simple WYSIWYG editor for Bootstrap3
 *
 * @category        jQuery Plugin
 * @version         1.1.3
 * @author          Alexsander Vyshnyvetskyy <alex.vyshnyvetskyy@gmail.com>
 * @link            http://wdmg.github.io/bootstrap-wysiwyg
 * @copyright       Copyright (c) 2019 - 2020 W.D.M.Group, Ukraine
 * @license         https://opensource.org/licenses/MIT Massachusetts Institute of Technology (MIT) License
 *
 */

+function($) {

    "use strict";
    var _createClass = (function() {
        function defineProperties(target, props) {
            for (var key in props) {
                var prop = props[key];
                prop.configurable = true;
                if (prop.value) prop.writable = true;
            }
            Object.defineProperties(target, props);
        };
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    var _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };

    var WYSIWYG = (function($) {

        var className = "wysiwyg";
        var _jQueryNoConflict = $.fn[className];
        var defaults = {
            toolbar: [
                ['mode'],
                ['operations', ['undo', 'rendo', 'cut', 'copy', 'paste']],
                ['styles'],
                ['fonts', ['select', 'size']],
                ['text', ['bold', 'italic', 'underline', 'strike', 'subscript', 'superscript', 'font-color', 'bg-color']],
                ['align', ['left', 'center', 'right', 'justify']],
                ['lists', ['unordered', 'ordered', 'indent', 'outdent']],
                ['components', ['table', /*'chart'*/]],
                ['intervals', ['line-height', 'letter-spacing']],
                ['insert', ['emoji', 'link', 'image', 'video', 'symbol', /*'bookmark'*/]],
                ['special', ['print', 'unformat', 'visual', 'clean']],
                /*['fullscreen'],*/
            ],
            fontSizes: ['8px', '9px', '10px', '11px', '12px', '14px', '15px', '16px', '18px', '20px', '24px', '30px', '32px', '36px', '48px'],
            fontSizeDefault: '12px',
            fontFamilies: ['Open Sans', 'Arial', 'Arial Black', 'Courier', 'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times', 'Times New Roman', 'Verdana'],
            fontFamilyDefault: 'Open Sans',
            emojiDefault: ["\u{1f600}", "\u{1f62c}", "\u{1f601}", "\u{1f602}", "\u{1f603}", "\u{1f604}", "\u{1f605}", "\u{1f606}", "\u{1f607}", "\u{1f609}", "\u{1f60a}", "\u{1f642}", "\u{1f643}", "\u{1f60b}", "\u{1f60c}", "\u{1f60d}", "\u{1f618}", "\u{1f617}", "\u{1f619}", "\u{1f61a}", "\u{1f61c}", "\u{1f61d}", "\u{1f61b}", "\u{1f911}", "\u{1f913}", "\u{1f60e}", "\u{1f917}", "\u{1f60f}", "\u{1f636}", "\u{1f610}", "\u{1f611}", "\u{1f612}", "\u{1f644}", "\u{1f914}", "\u{1f633}", "\u{1f61e}", "\u{1f61f}", "\u{1f620}", "\u{1f621}", "\u{1f614}", "\u{1f615}", "\u{1f641}", "\u{1f623}", "\u{1f616}", "\u{1f62b}", "\u{1f629}", "\u{1f624}", "\u{1f62e}", "\u{1f631}", "\u{1f628}", "\u{1f630}", "\u{1f62f}", "\u{1f626}", "\u{1f627}", "\u{1f622}", "\u{1f625}", "\u{1f62a}", "\u{1f613}", "\u{1f62d}", "\u{1f635}", "\u{1f632}", "\u{1f910}", "\u{1f637}", "\u{1f912}", "\u{1f915}", "\u{1f634}", "\u{1f4a4}"],
            symbolsDefault: ["&lt;", "&gt;", "&laquo;", "&raquo;", "&lsaquo;", "&rsaquo;", "&quot;", "&prime;", "&Prime;", "&lsquo;", "&rsquo;", "&sbquo;", "&ldquo;", "&rdquo;", "&bdquo;", "&#10076;", "&#10075;", "&amp;", "&apos;", "&sect;", "&copy;", "&not;", "&reg;", "&macr;", "&deg;", "&plusmn;", "&sup1;", "&sup2;", "&sup3;", "&frac14;", "&frac12;", "&frac34;", "&acute;", "&micro;", "&para;", "&middot;", "&iquest;", "&fnof;", "&trade;", "&bull;", "&hellip;", "&oline;", "&ndash;", "&mdash;", "&permil;", "&#125;", "&#123;", "&#61;", "&ne;", "&cong;", "&asymp;", "&le;", "&ge;", "&ang;", "&perp;", "&radic;", "&sum;", "&int;", "&#8251;", "&divide;", "&infin;", "&#64;", "&#91;", "&#93;", "&larr;", "&uarr;", "&rarr;", "&darr;", "&harr;", "&crarr;", "&lArr;", "&uArr;", "&rArr;", "&dArr;", "&hArr;", "&#10144;", "&#10148;", "&#10149;", "&#10150;", "&#10163;", "&#8634;", "&#8635;", "&#8679;", "&#8617;", "&#11015;", "&#11014;", "&spades;", "&clubs;", "&hearts;", "&diams;", "&#9825;", "&#9826;", "&#9828;", "&#9831;", "&#8372;", "&euro;", "&dollar;", "&cent;", "&pound;", "&#8381;", "&yen;", "&#8377;", "&#22291;", "&#8376;"],
            colorPalette: [["rgb(0, 0, 0)","rgb(67, 67, 67)","rgb(102, 102, 102)","rgb(153, 153, 153)","rgb(183, 183, 183)","rgb(204, 204, 204)","rgb(217, 217, 217)","rgb(239, 239, 239)","rgb(243, 243, 243)","rgb(255, 255, 255)"],["rgb(152, 0, 0)","rgb(255, 0, 0)","rgb(255, 153, 0)","rgb(255, 255, 0)","rgb(0, 255, 0)","rgb(0, 255, 255)","rgb(74, 134, 232)","rgb(0, 0, 255)","rgb(153, 0, 255)","rgb(255, 0, 255)"],["rgb(230, 184, 175)","rgb(244, 204, 204)","rgb(252, 229, 205)","rgb(255, 242, 204)","rgb(217, 234, 211)","rgb(208, 224, 227)","rgb(201, 218, 248)","rgb(207, 226, 243)","rgb(217, 210, 233)","rgb(234, 209, 220)","rgb(221, 126, 107)","rgb(234, 153, 153)","rgb(249, 203, 156)","rgb(255, 229, 153)","rgb(182, 215, 168)","rgb(162, 196, 201)","rgb(164, 194, 244)","rgb(159, 197, 232)","rgb(180, 167, 214)","rgb(213, 166, 189)","rgb(204, 65, 37)","rgb(224, 102, 102)","rgb(246, 178, 107)","rgb(255, 217, 102)","rgb(147, 196, 125)","rgb(118, 165, 175)","rgb(109, 158, 235)","rgb(111, 168, 220)","rgb(142, 124, 195)","rgb(194, 123, 160)","rgb(166, 28, 0)","rgb(204, 0, 0)","rgb(230, 145, 56)","rgb(241, 194, 50)","rgb(106, 168, 79)","rgb(69, 129, 142)","rgb(60, 120, 216)","rgb(61, 133, 198)","rgb(103, 78, 167)","rgb(166, 77, 121)","rgb(133, 32, 12)","rgb(153, 0, 0)","rgb(180, 95, 6)","rgb(191, 144, 0)","rgb(56, 118, 29)","rgb(19, 79, 92)","rgb(17, 85, 204)","rgb(11, 83, 148)","rgb(53, 28, 117)","rgb(116, 27, 71)","rgb(91, 15, 0)","rgb(102, 0, 0)","rgb(120, 63, 4)","rgb(127, 96, 0)","rgb(39, 78, 19)","rgb(12, 52, 61)","rgb(28, 69, 135)","rgb(7, 55, 99)","rgb(32, 18, 77)","rgb(76, 17, 48)"]],
            mode: 'editor',
            language: 'en-us',
            translations: {},
            highlight: true,
            debug: false
        };

        const Styles = {
            'Header H1': {
                'action': 'formatblock',
                'value': 'h1',
                'wrap': '<h1 />',
            },
            'Header H2': {
                'action': 'formatblock',
                'value': 'h2',
                'wrap': '<h2 />',
            },
            'Header H3': {
                'action': 'formatblock',
                'value': 'h3',
                'wrap': '<h3 />',
            },
            'Header H4': {
                'action': 'formatblock',
                'value': 'h4',
                'wrap': '<h4 />',
            },
            'Header H5': {
                'action': 'formatblock',
                'value': 'h5',
                'wrap': '<h5 />',
            },
            'Header H6': {
                'action': 'formatblock',
                'value': 'h6',
                'wrap': '<h6 />',
            },
            'Paragraph': {
                'action': 'formatblock',
                'value': 'p',
                'wrap': '<p />',
            },
            'Blockquote': {
                'action': 'formatblock',
                'value': 'blockquote',
                'wrap': '<blockquote />',
            },
            'Preformatted': {
                'action': 'formatblock',
                'value': 'pre',
                'wrap': '<pre />',
            },
            'Div block': {
                'action': 'formatblock',
                'value': 'div',
                'wrap': '<div />',
            }
        }

        const videoServices = {
            youtube: 'YouTube',
            vimeo: 'Vimeo',
            dailymotion: 'Dailymotion',
            /*hulu: 'Hulu',
            twitch: 'Twitch',
            facebook: 'Facebook',
            vkontakte: 'vKontakte',
            twitter: 'Twitter',
            ustream: 'Ustream',*/
            source: 'Source media',
            /*embed: 'Embed code'*/
        };

        const urlSchemes = {
            https: 'https://',
            http: 'http://',
            mailto: 'mailto://',
            ftp: 'ftp://',
            feed: 'feed://',
            news: 'news://',
            tel: 'tel:',
            skype: 'skype:',
            telegram: 'tg://',
            whatsapp: 'whatsapp:',
            viber: 'viber:',
            other: 'other'
        };

        const urlLinkTarget = {
            blank: 'New tab',
            top: 'Main tab',
            self: 'Current tab',
            parent: 'Parent tab',
            /*iframe: 'Iframe',
            popup: 'PopUp',*/
        };

        const urlLinkRel = {
            nofollow: 'Do not follow (for robots)',
            noreferrer: 'Do not pass HTTP-referrer',
            /*archives: 'Link to the site archive',
            author: 'Link to the page about the author on the same domain',
            bookmark: 'Permalink to a section or post',
            first: 'Link to the first page',
            help: 'Help document link',
            index: 'Content Link',
            last: 'Link to the last page',
            license: 'Link to page with license agreement or copyright',
            me: 'Link to the author’s page on another domain',
            next: 'Link to the next page or section',
            prefetch: 'Indicates that the specified resource must be cached in advance.',
            prev: 'Link to previous page or section',
            search: 'Search Link',
            sidebar: 'Add link to browser favorites',
            tag: 'Indicates that the label (tag) is related to the current document.',
            up: 'Link to the parent page',
            answer: 'Answer to the question',
            chapter: 'Section or chapter of the current document',
            co-worker: 'Link to colleague’s page',
            colleague: 'Link to colleague’s page (not for work)',
            contact: 'Link to the page with contact information',
            details: 'Link to the page with details',
            edit: 'Editable version of the current document',
            friend: 'Link to friend’s page',
            question: 'Link to the question page',*/
        };

        var Editor = (function() {

            function Editor($element, config) {
                var _this = this;
                _classCallCheck(_this, Editor);

                // Merge default and custom options
                _this._config = $.extend({}, defaults, config);

                if (_this._config.debug)
                    console.log('Init WYSIWYG editor...');

                // Configure variables
                _this._editorId = 'wysiwyg-' + (String.fromCharCode(Math.floor(Math.random() * 11)) + Math.floor(Math.random() * 1000000)).trim();
                _this._$element = $element instanceof jQuery ? $element : $($element);
                _this._inputId = _this._$element.attr('id');

                // Wrap text input to container
                _this._$editor = $('<div id="' + _this._editorId + '" aria-describedby="#' + _this._inputId + '" class="wysiwyg-editor" />');
                _this._$element.wrap(_this._$editor);

                // Add content to editor
                _this._$content = $('<div class="editor-content" contenteditable="true" />');
                _this._$content.html(_this._$element.val());
                _this._$element.before(_this._$content);
                _this._source = _this._$element.val();

                _this._selection = document.getSelection();
                _this._popoverIsVisible = false;
                _this._$lastFocus = null;

                // Add toolbar to editor
                _this._$toolbar = $('<div class="wysiwyg-toolbar btn-toolbar" />');
                _this._$content.before(_this._$toolbar);

                // Add statusbar to editor
                _this._$statusbar = $('<div class="editor-statusbar" />');
                _this._$statusbar.stat = $('<span class="editor-statusbar-stat" />');
                _this._$statusbar.path = $('<span class="editor-statusbar-path" />');
                _this._$statusbar.append(_this._$statusbar.stat);
                _this._$statusbar.append(_this._$statusbar.path);
                _this._$content.after(_this._$statusbar);

                // Hide input editor
                _this._$element.addClass('hide');

                // Build toolbar by config
                if(typeof (_this._config.toolbar) == 'object') {
                    $.each(_this._config.toolbar, function (index, elem) {

                        var $toolbar = $('<div id="toolbarGroup-' + elem[0] + '" class="btn-group" role="group" />');

                        if(elem[0] === 'mode') { // Editor mode switcher

                            var editorButton = _this._buildTollbarButton('mode', 'editor', "fa fa-eye", null, "Editor");
                            var sourceButton = _this._buildTollbarButton('mode', 'source', "fa fa-code", null, "Source");

                            if(_this._config.mode == 'editor')
                                editorButton.addClass('active');
                            else
                                sourceButton.addClass('active');

                            $toolbar.append(editorButton);
                            $toolbar.append(sourceButton);

                        } else if(elem[0] === 'operations') { // Operations editor controls

                            $toolbar.append(_this._buildTollbarButton('operations', 'undo', "fa fa-reply", null, "Undo"));
                            $toolbar.append(_this._buildTollbarButton('operations', 'rendo', "fa fa-share", null, "Rendo"));
                            $toolbar.append(_this._buildTollbarButton('operations', 'cut', "fa fa-cut", null, "Cut"));
                            $toolbar.append(_this._buildTollbarButton('operations', 'copy', "fa fa-copy", null, "Copy"));
                            $toolbar.append(_this._buildTollbarButton('operations', 'paste', "fa fa-clipboard", null, "Paste"));

                        } else if(elem[0] === 'styles') { // Editor mode switcher

                            $toolbar.append(_this._buildTollbarDropdown('select-style', Styles, "Paragraph", "Text style"));

                        } else if(elem[0] === 'fonts') { // Font select and size

                            if(elem[1].indexOf('select', 0) !== -1) {

                                var fonts = {};
                                $.each(_this._config.fontFamilies, function(index, value) {
                                    fonts[value] = {
                                        'action': 'fontname',
                                        'value': value,
                                        'style': "font-family: " + value + ";"
                                    };
                                });

                                $toolbar.append(_this._buildTollbarDropdown('font-select', fonts, _this._config.fontFamilyDefault, "Font family"));
                            }

                            if(elem[1].indexOf('size', 0) !== -1) {
                                var sizes = {};
                                $.each(_this._config.fontSizes, function(index, value) {
                                    sizes[value] = {
                                        'action': 'fontsize',
                                        'value': value
                                    };
                                });
                                $toolbar.append(_this._buildTollbarDropdown('font-size', sizes, _this._config.fontSizeDefault, "Font size"));
                            }

                        } else if(elem[0] === 'text') { // Text decoration

                            if(elem[1].indexOf('bold', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('text', 'bold', "fa fa-bold", null, "Bold"));

                            if(elem[1].indexOf('italic', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('text', 'italic', "fa fa-italic", null, "Italic"));

                            if(elem[1].indexOf('underline', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('text', 'underline', "fa fa-underline", null, "Underline"));

                            if(elem[1].indexOf('strike', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('text', 'strike', "fa fa-strikethrough", null, "Striked text"));

                            if(elem[1].indexOf('subscript', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('text', 'subscript', "fa fa-subscript", null, "Subscript"));

                            if(elem[1].indexOf('superscript', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('text', 'superscript', "fa fa-superscript", null, "Superscript"));

                            if(elem[1].indexOf('bg-color', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('text', 'font-color', "fa fa-font", null, "Font color", _this._buildColorPalette(_this._config.colorPalette, "font-color", null)));

                            if(elem[1].indexOf('bg-color', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('text', 'bg-color', "fa fa-paint-brush", null, "Background color", _this._buildColorPalette(_this._config.colorPalette, "bg-color", true)));

                        } else if(elem[0] === 'align') { // Text aligment

                            if(elem[1].indexOf('left', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('align', 'left', "fa fa-align-left", null, "Align left", null));

                            if(elem[1].indexOf('center', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('align', 'center', "fa fa-align-center", null, "Align center", null));

                            if(elem[1].indexOf('right', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('align', 'right', "fa fa-align-right", null, "Align right", null));

                            if(elem[1].indexOf('justify', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('align', 'justify', "fa fa-align-justify", null, "Justify content", null));

                        } else if(elem[0] === 'lists') { // Lists && outdent

                            if(elem[1].indexOf('unordered', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('lists', 'unordered', "fa fa-list-ul", null, "Unordered list"));

                            if(elem[1].indexOf('ordered', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('lists', 'ordered', "fa fa-list-ol", null, "Ordered list"));

                            if(elem[1].indexOf('indent', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('lists', 'indent', "fa fa-indent", null, "Indent"));

                            if(elem[1].indexOf('outdent', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('lists', 'outdent', "fa fa-outdent", null, "Outdent"));

                        } else if(elem[0] === 'components') { // Components

                            if(elem[1].indexOf('table', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('components', 'table', "fa fa-table", null, "Insert table", _this._buildTableGrid()));

                            if(elem[1].indexOf('chart', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('components', 'chart', "fa fa-pie-chart", null, "Add chart"));

                        } else if(elem[0] === 'intervals') { // Text properties

                            if(elem[1].indexOf('line-height', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('interval', 'line-height', "fa fa-text-height", null, "Lines interval", _this._buildLineHeightList()));

                            if(elem[1].indexOf('letter-spacing', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('interval', 'letter-spacing', "fa fa-text-width", null, "Letter spacing", _this._buildLetterSpacingList()));

                        } else if(elem[0] === 'insert') { // Inserts

                            if(elem[1].indexOf('emoji', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('insert', 'emoji', "fa fa-smile fa-smile-o", null, "Add emoji", _this._buildEmojiList()));

                            if(elem[1].indexOf('link', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('insert', 'link', "fa fa-link", null, "Add URL", _this._buildUrlForm('link')));

                            if(elem[1].indexOf('image', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('insert', 'image', "fa fa-image", null, "Add image", _this._buildUrlForm('image')));

                            if(elem[1].indexOf('video', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('insert', 'video', "fa fa-video-camera fa-video", null, "Add video", _this._buildUrlForm('video')));

                            if(elem[1].indexOf('symbol', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('insert', 'symbol', "fa fa-hashtag", null, "Add symbol", _this._buildSymbolsList()));

                            if(elem[1].indexOf('bookmark', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('insert', 'bookmark', "fa fa-bookmark", null, "Add bookmark"));

                        } else if(elem[0] === 'special') { // Inserts

                            if(elem[1].indexOf('print', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('special', 'print', "fa fa-print", null, "Print"));

                            if(elem[1].indexOf('clean', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('special', 'clean', "fa fa-eraser", null, "Erase style"));

                            if(elem[1].indexOf('visual', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('special', 'visual', "fa fa-solar-panel", null, "Visual blocks"));

                            if(elem[1].indexOf('unformat', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('special', 'unformat', "fa fa-trash-o fa-trash-alt", null, "Clear HTML"));

                        } else if(elem[0] === 'fullscreen') { // Fullscreen mode

                            $toolbar.addClass('pull-right');
                            $toolbar.append(_this._buildTollbarButton('fullscreen', true, "fa fa-arrows-alt", null, "Fullscreen mode"));

                        }

                        _this._$toolbar.append($toolbar);

                    });
                }

                // Set behavior for toolbar buttons
                if(_this._$toolbar.length) {
                    _this._$toolbar.on('click', '[data-action]', function(event) {
                        var $target = $(event.currentTarget);
                        var action = $target.data('action');
                        var selection = _this._selection;
                        var value = $target.data('value');
                        var data = $target.data();

                        if (typeof (action) !== 'undefined' && typeof (value) !== 'undefined') {

                            if (_this._config.debug)
                                console.log('Switch action: `' + action + '` with value: `' + value + '`');

                            switch (action) {

                                case 'mode':
                                    switch (value) {
                                        case 'editor':
                                            if (_this._config.mode !== value) {
                                                _this._config.mode = value;
                                                _this._$content.html(_this._source);
                                                _this._$toolbar.find('[data-action="mode"]').removeClass('active');
                                                _this._$toolbar.find('[data-action="mode"][data-value="editor"]').addClass('active');
                                                _this._$content.addClass('editor-mode').removeClass('source-mode');
                                                _this._$content.focus();
                                            }

                                            _this._$toolbar.find('.btn-group').removeClass('hide');
                                            break;

                                        case 'source':

                                            _this._$toolbar.find('.btn-group').not('#toolbarGroup-' + action).addClass('hide');

                                            if (_this._config.mode !== value) {

                                                _this._config.mode = value;
                                                _this._source = _this._$content.html();

                                                var $source = $('<pre />');
                                                $source.text(_this._source);

                                                _this._$content.html(_this._trimSource($source.html()));

                                                if (_this._config.highlight) {
                                                    hljs.initHighlighting.called = false;
                                                    hljs.configure({
                                                        useBR: true,
                                                        languages: ['html', 'javascript', 'css']
                                                    });
                                                    hljs.highlightBlock(_this._$content.get(0));
                                                }

                                                _this._$toolbar.find('[data-action="mode"]').removeClass('active');
                                                _this._$toolbar.find('[data-action="mode"][data-value="source"]').addClass('active');

                                                _this._$content.removeClass('editor-mode').addClass('source-mode');
                                                _this._$content.focus();
                                            }
                                            break;
                                    }
                                    break;

                                case 'formatblock':
                                    _this._formatDoc('formatblock', value);
                                    break;

                                case 'fontname':
                                    _this._formatDoc('fontname', value);
                                    break;

                                case 'fontsize':
                                    _this._selection.anchorNode.parentElement.removeAttribute("size");
                                    _this._selection.anchorNode.parentElement.style.fontSize = value;
                                    break;

                                case 'style':
                                    var styles = _this._selection.anchorNode.parentElement.style.cssText;

                                    if(styles)
                                        styles += value;
                                    else
                                        styles = value;

                                    _this._selection.anchorNode.parentElement.removeAttribute("style");
                                    _this._selection.anchorNode.parentElement.style = styles;
                                    break;

                                case 'fullscreen':

                                    if (_this._config.debug)
                                        console.log('Fire action: ' + action + ' with value: ' + value + ' is not supported.');

                                    break;

                                case 'operations':
                                    switch (value) {
                                        case 'undo':
                                            _this._formatDoc('undo');
                                            break;

                                        case 'rendo':
                                            _this._formatDoc('rendo');
                                            break;
                                        case 'cut':
                                            _this._formatDoc('cut');
                                            break;

                                        case 'copy':
                                            _this._formatDoc('copy');
                                            break;

                                        case 'paste':
                                            _this._formatDoc('paste');
                                            break;
                                    }
                                    break;

                                case 'text':
                                    switch (value) {
                                        case 'bold':
                                            _this._formatDoc('bold');
                                            break;

                                        case 'italic':
                                            _this._formatDoc('italic');
                                            break;

                                        case 'underline':
                                            _this._formatDoc('underline');
                                            break;

                                        case 'strike':
                                            _this._formatDoc('strikeThrough');
                                            break;

                                        case 'subscript':
                                            _this._formatDoc('subscript');
                                            break;

                                        case 'superscript':
                                            _this._formatDoc('superscript');
                                            break;

                                    }
                                    break;

                                case 'font-color':
                                    if(value == 'unset') {

                                        if(_this._selection.anchorNode)
                                            _this._selection.anchorNode.parentElement.style.backgroundColor = "";

                                        if(_this._selection.anchorNode.parentElement.style.length)
                                            _this._selection.anchorNode.parentElement.removeAttribute("style");

                                    } else {
                                        _this._$toolbar.find('[data-action="text"][data-value="font-color"] > span').css('border-bottom-color', value);
                                        _this._formatDoc('foreColor', value);
                                    }
                                    break;

                                case 'bg-color':
                                    if(value == 'unset') {

                                        if(_this._selection.anchorNode)
                                            _this._selection.anchorNode.parentElement.style.backgroundColor = "";

                                        if(_this._selection.anchorNode.parentElement.style.length)
                                            _this._selection.anchorNode.parentElement.removeAttribute("style");

                                    } else {
                                        _this._$toolbar.find('[data-action="text"][data-value="bg-color"] > span').css('border-bottom-color', value);
                                        _this._formatDoc('hiliteColor', value);
                                    }
                                    break;

                                case 'align':
                                    switch (value) {
                                        case 'left':
                                            _this._formatDoc('justifyLeft');
                                            break;

                                        case 'center':
                                            _this._formatDoc('justifyCenter');
                                            break;

                                        case 'right':
                                            _this._formatDoc('justifyRight');
                                            break;

                                        case 'justify':
                                            _this._formatDoc('justifyFull');
                                            break;
                                    }
                                    break;


                                case 'lists':
                                    switch (value) {
                                        case 'unordered':
                                            _this._formatDoc('insertUnorderedList');
                                            break;

                                        case 'ordered':
                                            _this._formatDoc('insertOrderedList');
                                            break;

                                        case 'indent':
                                            _this._formatDoc('indent');
                                            break;

                                        case 'outdent':
                                            _this._formatDoc('outdent');
                                            break;
                                    }
                                    break;

                                case 'insert-table':
                                    if(_this._selection.anchorNode) {
                                        var options = value.split('|', 2);
                                        var $parent = $(_this._selection.anchorNode.parentElement);
                                        var content = _this._generateTable(parseFloat(options[0]), parseFloat(options[2]));
                                        $parent.after(content);
                                    }
                                    break;

                                case 'components':
                                    switch (value) {

                                        case 'chart':
                                            if (_this._config.debug)
                                                console.log('Fire action: ' + action + ' with value: ' + value + ' is not supported.');

                                            break;
                                    }
                                    break;

                                case 'line-height':
                                    if(_this._selection.anchorNode) {
                                        var lineHeight = parseFloat(value) * 100 + "%";

                                        if (parseFloat(value) == 0)
                                            _this._selection.anchorNode.parentElement.style.lineHeight = "inherit";
                                        else
                                            _this._selection.anchorNode.parentElement.style.lineHeight = lineHeight;
                                    }
                                    break;

                                case 'letter-spacing':
                                    if(_this._selection.anchorNode) {
                                        var letterSpacing = parseFloat(value) + "px";

                                        if (parseFloat(value) == 0)
                                            _this._selection.anchorNode.parentElement.style.letterSpacing = "inherit";
                                        else
                                            _this._selection.anchorNode.parentElement.style.letterSpacing = letterSpacing;

                                    }
                                    break;

                                case 'add-url':
                                    var text = _this._selection.toString();
                                    if(_this._selection && text) {

                                        var url = value;
                                        console.log(data);

                                        if (data.scheme) {
                                            if (data.scheme == 'https')
                                                url = 'https://' + url;
                                            else if (data.scheme == 'http')
                                                url = 'http://' + url;
                                            else if (data.scheme == 'mailto')
                                                url = 'mailto://' + url;
                                            else if (data.scheme == 'ftp')
                                                url = 'ftp://' + url;
                                            else if (data.scheme == 'feed')
                                                url = 'feed://' + url;
                                            else if (data.scheme == 'news')
                                                url = 'news://' + url;
                                            else if (data.scheme == 'tel')
                                                url = 'tel:' + url;
                                            else if (data.scheme == 'skype')
                                                url = 'skype:' + url;
                                            else if (data.scheme == 'tg')
                                                url = 'tg://' + url;
                                            else if (data.scheme == 'whatsapp')
                                                url = 'whatsapp:' + url;
                                            else if (data.scheme == 'viber')
                                                url = 'viber:' + url;
                                        }

                                        var title = '';
                                        if (data.title) {
                                            title = ' title="' + data.title + '"';
                                        }

                                        var className = '';
                                        if (data.class) {
                                            className = ' class="' + data.class + '"';
                                        }

                                        var target = '';
                                        if (data.target) {
                                            if (data.target == 'blank')
                                                target = ' target="_blank"';
                                            else if (data.target == 'top')
                                                target = ' target="_top"';
                                            else if (data.target == 'self')
                                                target = ' target="_self"';
                                            else if (data.target == 'parent')
                                                target = ' target="_parent"';
                                        }

                                        var rel = '';
                                        if (data.relation) {
                                            if (data.relation == 'nofollow')
                                                rel = ' rel="nofollow"';
                                            else if (data.relation == 'noreferrer')
                                                rel = ' rel="noreferrer"';
                                        }

                                        var $link = $('<a href="' + url + '"' + title + className + target + rel + ' />');
                                        $link.text(text);

                                        var range = _this._selection.getRangeAt(0);
                                        range.deleteContents();
                                        range.insertNode($link.get(0));
                                    }
                                    break;

                                case 'add-video':
                                    if(_this._selection && value) {

                                        var url = value;
                                        if (data.service) {
                                            if (data.service == 'youtube') {
                                                var videoId = null;
                                                var regExp = /^.*(youtube\/|youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                                                var match = url.match(regExp);

                                                if (match !== null && match[2].length == 11)
                                                    videoId = match[2];

                                                if (videoId)
                                                    url = 'https://www.youtube.com/embed/' + videoId;

                                            } else if (data.service == 'vimeo') {
                                                var videoId = null;
                                                var regExp = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;
                                                var match = url.match(regExp);

                                                if (match !== null && match[1].length == 9)
                                                    videoId = match[1];

                                                if (videoId)
                                                    url = 'https://player.vimeo.com/video/' + match[1];

                                            } else if (data.service == 'dailymotion') {
                                                var videoId = null;
                                                var regExp = /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
                                                var match = url.match(regExp);

                                                if (match !== null) {
                                                    if (match[4] !== undefined) {
                                                        videoId = match[4];
                                                    }
                                                    videoId = match[2];
                                                }

                                                if (videoId)
                                                    url = 'https://www.dailymotion.com/embed/video/' + videoId;

                                            }
                                        }

                                        var $embed = $('<div class="embed-responsive embed-responsive-16by9">' +
                                            '<iframe class="embed-responsive-item" src="' + url + '"></iframe>' +
                                        '</div>');
                                        var range = _this._selection.getRangeAt(0);
                                        range.deleteContents();
                                        range.insertNode($embed.get(0));
                                    }
                                    break;

                                case 'add-image':
                                    if(_this._selection && value) {
                                        var $image = $('<img src="' + value + '" />');
                                        var range = _this._selection.getRangeAt(0);
                                        range.deleteContents();
                                        range.insertNode($image.get(0));
                                    }
                                    break;

                                case 'insert-html':
                                    _this._formatDoc('insertHTML', value);
                                    break;

                                case 'special':
                                    switch (value) {
                                        case 'print':
                                            _this._printDoc();
                                            break;

                                        case 'clean':
                                            _this._formatDoc('removeFormat');
                                            break;

                                        case 'visual':
                                            if (_this._$content.hasClass('visual')) {
                                                _this._$toolbar.find('[data-action="special"][data-value="visual"]').removeClass('active');
                                                _this._$content.removeClass('visual');
                                                _this._$content.focus();
                                            } else {
                                                _this._$toolbar.find('[data-action="special"][data-value="visual"]').addClass('active');
                                                _this._$content.addClass('visual');
                                                _this._$content.focus();
                                            }
                                            break;

                                        case 'unformat':
                                            _this._formatDoc('selectAll');
                                            _this._formatDoc('removeFormat');
                                            var string = _this._$content.html();
                                            string = _this._stripTags(string);
                                            string = string.replace(/(\r\n|\n|\r)/g, '<!-- br -->');
                                            string = string.replace(/<!-- br -->/g, '<br/>');
                                            _this._$content.html(string);
                                            break;
                                    }
                                    break;

                                default:
                                    if (_this._config.debug)
                                        console.warn('Unrecognized action: ' + action + ' with value: ' + value);

                                    break;
                            }

                        }

                    });
                }

                // On selected content
                _this._$content.on('mouseup click focus', function (event) {
                    const $this = $(this);

                    if (_this._popoverIsVisible)
                        _this._hideAllPopovers();

                    if (event.target.type !== "text")
                        _this._selection = document.getSelection();

                    if (_this._selection.getRangeAt && _this._selection.rangeCount) {

                        if (_this._selection.parentNode) {
                            var $target = $(_this._selection.parentNode);
                            _this._updateState($target);
                        } else if (_this._selection.parentElement) {
                            var $target = $(_this._selection.parentElement);
                            _this._updateState($target);
                        }
                    }

                    if (_this._config.debug)
                        console.log('Current selection: ', _this._selection);

                    var $target = $(event.target);
                    _this._updateState($target);
                    $this.trigger('change');
                });

                // On click or keydown from content area
                _this._$content.on('keydown', function (event) {
                    const $this = $(this);

                    if(_this._popoverIsVisible)
                        _this._hideAllPopovers();

                    if(event.target.type !== "text")
                        _this._selection = document.getSelection();

                    if (_this._selection.getRangeAt && _this._selection.rangeCount) {

                        if (_this._selection.parentNode) {
                            var $target = $(_this._selection.parentNode);
                            _this._updateState($target);
                        } else if (_this._selection.parentElement) {
                            var $target = $(_this._selection.parentElement);
                            _this._updateState($target);
                        }
                    }

                    var $target = $(event.target);
                    _this._updateState($target);
                    $this.trigger('change');

                    if (_this._config.debug)
                        console.log('Keydown fired: ' + event.keyCode);

                });

                // On content change
                _this._$content.on('change', function(event) {
                    const $this = $(this);
                    setTimeout(function() {
                        if (_this._config.mode == 'editor')
                            _this._source = $this.html();
                        else
                            _this._source = $this.text();

                        if ($(_this._$element).is("textarea"))
                            _this._$element.html(_this._source);
                        else
                            _this._$element.val(_this._source);

                        if (_this._config.debug)
                            console.log('Content change...');

                    }, 200);
                });

                // On content lost focus
                _this._$content.on('blur', function() {
                    const $this = $(this);
                    _this._$lastFocus = this;
                    _this._selection = document.getSelection();
                    $this.trigger('change');

                    if (_this._config.debug)
                        console.log('Content lost focus: ', _this._selection);

                });

                // Set focus on content
                _this._$content.focus();

            }

            _createClass(Editor, {
                element: {
                    value: function element() {
                        var _this = this;
                        return _this._$element;
                    }
                },
                _replaceAll: {
                    value: function replaceAll(search, replace, string) {
                        return string.split(search).join(replace);
                    }
                },
                _stripTags: {
                    value: function stripTags(string, tags) {

                        var key, allowed_tags = [];
                        if (tags)
                            allowed_tags = tags.match(/([a-zA-Z]+)/gi);

                        if (typeof (string) !== 'string')
                            string = string.toString();

                        var matches = string.match(/(<\/?[\S][^>]*>)/gi);

                        for (key in matches) {

                            if (isNaN(key))
                                continue;

                            var html = matches[key].toString();
                            var allowed = false;

                            for (key in allowed_tags) {

                                var tag = allowed_tags[key];
                                var i = html.toLowerCase().indexOf('<'+ tag +'>');

                                if (i != 0)
                                    i = html.toLowerCase().indexOf('<'+ tag +' ');

                                if (i != 0)
                                    i = html.toLowerCase().indexOf('</'+ tag );

                                if (i == 0) {
                                    allowed = true;
                                    break;
                                }

                            }

                            if (!allowed)
                                string = this._replaceAll(html, "", string);

                        }

                        return string;
                    }
                },
                _trimSource: {
                    value: function trimSource(str) {
                        str = str.replace(/\s{4,}/g, "");
                        str = str.replace(/\t/g, ' ');
                        str = str.toString().trim().replace(/(\r\n|\n|\r)/g,"");
                        return str;
                    }
                },
                _getPath: {
                    value: function getPath(node, until, withNodes) {

                        var path, tags = [];
                        while (node.length) {

                            if (node[0].isEqualNode(until[0]))
                                break;

                            var realNode = node[0], name = realNode.localName;
                            var parent = node.parentsUntil(until);

                            if (!name)
                                break;
                            else
                                name = name.toLowerCase();

                            if (withNodes) {
                                var sameTagSiblings = parent.children(name);
                                if (sameTagSiblings.length > 1) {
                                    var allSiblings = parent.children();
                                    var index = allSiblings.index(realNode) + 1;
                                    if (index > 1) {
                                        name += ':nth-child(' + index + ')';
                                    }
                                }
                            }

                            tags.push(name);

                            var id = $(realNode).attr("id");
                            if (id)
                                name += "#" + id;

                            var classname = $(realNode).attr("class");
                            if (classname)
                                name += "." + classname.replace(/\./g, '.');

                            path = name + (path ? ' > ' + path : '');
                            node = parent;
                        }

                        return {
                            path: path,
                            tags: tags
                        };
                    }
                },
                _getTextStat: {
                    value: function getTextStat(el) {

                        var words = 0, length = 0, chars = 0, normalizedValue;
                        var isContentEditable = el && el.contentEditable;

                        if (isContentEditable)
                            normalizedValue = el.innerText.replace(/\r\n/g, "\n");
                        else
                            normalizedValue = el.value.replace(/\r\n/g, "\n");

                        words = this._stripTags(normalizedValue).split(' ').length;
                        length = normalizedValue.length;
                        chars = this._trimSource(normalizedValue.replace(/\s/g, "")).length;

                        return {
                            words: words,
                            length: length,
                            chars: chars
                        }
                    }
                },
                _getTextPosition: {
                    value: function getCursorPosition(el) {

                        var line = 0, start = 0, end = 0, selected = 0, normalizedValue, range, textInputRange, len, endRange;
                        var isContentEditable = el && el.contentEditable;

                        if ("selectionStart" in el && document.activeElement == el) {

                            start = el.selectionStart;
                            end = el.selectionEnd;
                            normalizedValue = el.value.replace(/\r\n/g, "\n");
                            line = normalizedValue.substr(0, el.selectionStart).split("\n").length;

                        } else if (isContentEditable) {

                            start = window.getSelection().getRangeAt(0).startOffset;
                            end = window.getSelection().getRangeAt(0).endOffset;

                            normalizedValue = el.innerText.replace(/\r\n/g, "\n");
                            line = (normalizedValue.substr(0, el.selectionStart).split("\n").length - 1);

                            if(line == 0)
                                line = 1;

                        } else {

                            range = this._selection.createRange();

                            if (range && range.parentElement() == el) {
                                len = el.value.length;
                                normalizedValue = el.value.replace(/\r\n/g, "\n");

                                // Create a working TextRange that lives only in the input
                                textInputRange = el.createTextRange();
                                textInputRange.moveToBookmark(range.getBookmark());

                                // Check if the start and end of the selection are at the very end
                                // of the input, since moveStart/moveEnd doesn't return what we want
                                // in those cases
                                endRange = el.createTextRange();
                                endRange.collapse(false);

                                if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                                    start = end = len;
                                } else {
                                    start = -textInputRange.moveStart("character", -len);
                                    start += normalizedValue.slice(0, start).split("\n").length - 1;

                                    if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                                        end = len;
                                    } else {
                                        end = -textInputRange.moveEnd("character", -len);
                                        end += normalizedValue.slice(0, end).split("\n").length - 1;
                                    }
                                }
                            }
                        }

                        selected = (this._selection.toString()).length;

                        return {
                            line: line,
                            start: start,
                            end: end,
                            selected: selected
                        }
                    }
                },
                _formatDoc: {
                    value: function formatDoc(command, value) {
                        document.execCommand(command, false, value);
                        this._$content.focus();
                    }
                },
                _printDoc: {
                    value: function printDoc() {
                        var print = window.open("","_blank","width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
                        print.document.open();
                        print.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + this._$content.get(0).innerHTML + "<\/body><\/html>");
                        print.document.close();
                    }
                },
                _hideAllPopovers: {
                    value: function hideAllPopovers() {
                        this._$toolbar.find('.popover').each(function() {
                            $(this).popover('hide');
                        });
                        this._popoverIsVisible = false;
                    }
                },
                _detectLanguage: {
                    value: function detectLanguage() {

                        var language = null;
                        if (navigator.languages && navigator.languages.length) {
                            language = navigator.languages[0];
                        } else {
                            language = navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
                        }

                        return language.toLowerCase();

                    }
                },
                _translate: {
                    value: function translate(string) {

                        var _this = this;
                        var language = _this._config.language;

                        if (typeof (language) === "undefined")
                            language = _this._detectLanguage();

                        if (_this._config.translations.hasOwnProperty(language)) {
                            if (_this._config.translations[language][string.toString()]) {
                                string = _this._config.translations[language][string.toString()];
                            }
                        }

                        return string.toLocaleString();
                    }
                },
                _buildTollbarButton: {
                    value: function buildTollbarButton(action, value, icon, hotkey, tooltip, content) {

                        var _this = this;
                        var selection = _this._selection;
                        var $button = $('<button type="button" class="btn btn-default" tabindex="-1" />');

                        if (action)
                            $button.attr('data-action', action);

                        if (value)
                            $button.attr('data-value', value);

                        if (hotkey)
                            $button.attr('data-hotkey', hotkey);

                        if (tooltip) {
                            $button.tooltip({
                                html: true,
                                placement: 'top',
                                container: 'body',
                                title: _this._translate(tooltip.toString().trim())
                            });
                        }

                        if (content) {
                            $button.popover({
                                html: true,
                                trigger: 'manual',
                                viewport: 'body',
                                placement: 'bottom',
                                content: function() {

                                    if (typeof (content) === "object")
                                        return content;
                                    else
                                        return $(content);

                                }
                            }).on('shown.bs.popover', function(event) {

                                var popoverId = $(event.target).attr('aria-describedby');
                                var $popover = _this._$toolbar.find('#'+popoverId);


                                var selection = _this._selection;
                                var range = selection.getRangeAt(0);
                                if(selection && range) {
                                    $popover.find('input').on('blur', function(event) {
                                        if (event.target.type == "text") {
                                            if (_this._$lastFocus) {
                                                setTimeout(function() {
                                                    _this._$lastFocus.focus();
                                                    _this._selectText(selection, range);
                                                }, 50);
                                            }
                                        }
                                        return false;
                                    });
                                }

                                $popover.on('click', function(event) {
                                    event.preventDefault();

                                    if (_this._config.debug) {
                                        console.log('Popover event target type: ' + event.target.type);
                                        console.log('Popover event target tag: ' + event.target.tagName);
                                    }

                                    if (!(event.target.type) && !(event.target.tagName.toLowerCase() == 'a'))
                                        return;

                                    if ($(event.target).get(0).hasAttribute('data-action')) {
                                        $popover.popover('hide');
                                    }

                                });

                                if ($popover.find('.table-grid').length) {
                                    $popover.find('.table-grid tr > td').hover(function() {
                                        $(this).addClass('selected');
                                        $(this).prevAll().addClass('selected');
                                        $(this).parent().prevAll().find('td:lt('+ ($(this).index() + 1) + ')').addClass('selected');
                                    }, function() {
                                        $(this).removeClass('selected');
                                        $(this).prevAll().removeClass('selected');
                                        $(this).parent().prevAll().find('td:lt('+ ($(this).index() + 1) + ')').removeClass('selected');
                                    });
                                }

                            }).on('click', function(event) {

                                if (_this._config.debug) {
                                    console.log('Element event target type: ' + event.target.type);
                                    console.log('Element event target tag: ' + event.target.tagName);
                                }

                                event.preventDefault();
                                event.stopPropagation();

                                if(_this._popoverIsVisible)
                                    _this._hideAllPopovers();

                                $button.popover('show');
                                _this._popoverIsVisible = true;
                            });

                        } else {
                            $button.on('click', function(event) {
                                event.preventDefault();
                                _this._hideAllPopovers();
                            });
                        }

                        if (icon)
                            $button.append('<span class="' + icon + '" />');

                        return $button;
                    }
                },
                _buildTollbarDropdown: {
                    value: function buildTollbarDropdown(action, list, label, tooltip) {

                        var $dropdown = $('<div class="dropdown" />');
                        var $dropdownBtn = $('<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" />');
                        var $dropdownMenu = $('<ul class="dropdown-menu" />');
                        var $dropdownItem = $('<li />');
                        var $dropdownLink = $('<a href="#" tabindex="-1" />');

                        if (typeof (list) == "object") {

                            $.each(list, function(index, elem) {

                                var $link = $dropdownLink.clone();
                                var $item = $dropdownItem.clone();

                                if (typeof (elem) == 'object') {

                                    if (elem['action'])
                                        $link.attr('data-action', elem['action']);

                                    if (elem['value'])
                                        $link.attr('data-value', elem['value']);

                                    if (elem['wrap'])
                                        $link.html($(elem['wrap']).text(index));
                                    else
                                        $link.text(index);

                                    if (elem['style'])
                                        $link.attr('style', elem['style'].toString());

                                    if(index == label)
                                        $item.addClass('active');

                                    $item.append($link);
                                    $dropdownMenu.append($item);

                                } else {

                                    $link.text(elem);
                                    $link.attr('data-action', action);
                                    $link.attr('data-value', elem);

                                    if(elem == label)
                                        $item.addClass('active');

                                    $item.append($link);
                                    $dropdownMenu.append($item);
                                }

                                $link.on('click', function (e) {
                                    e.preventDefault();
                                });

                            });
                        }

                        if (label)
                            $dropdownBtn.text(label + ' ');
                        else
                            $dropdownBtn.text('Dropdown ');

                        $dropdownBtn.append('<b class="caret" />');

                        if (tooltip) {
                            $dropdownBtn.tooltip({
                                html: true,
                                placement: 'top',
                                title: this._translate(tooltip.toString().trim())
                            });
                        }

                        $dropdown.append($dropdownBtn);
                        $dropdown.append($dropdownMenu);
                        return $dropdown;
                    }
                },
                _buildColorPalette: {
                    value: function buildColorPalette(palette, action, reset) {
                        var content = '';
                        $.each(palette, function (outer, colors) {
                            content += '<table class="color-palette"><tr>';
                            $.each(colors, function (inner, color) {
                                content += '<td><a href="#" data-action="' + action + '" data-value="' + color + '" style="background-color: ' + color + '">&nbsp;</a></td>'
                                content += ((parseInt(inner) + 1)%10 ? '' : '</tr>');
                                content += ((parseInt(inner) + 1)%10 ? '' : '<tr>');
                            });
                            content += '</tr></table>';
                        });

                        if(reset)
                            content += '<p><a href="#" class="btn btn-sm btn-block" data-action="' + action + '" data-value="unset">Reset color</a></p>';

                        return content;
                    }
                },
                _buildTableGrid: {
                    value: function buildColorPalette() {

                        var content = '<table class="table-grid">';

                        for(var row = 1; row <= 6; row++) {

                            content += '<tr>';

                            for(var column = 1; column <= 8; column++) {
                                content += '<td><a href="#" data-action="insert-table" data-value="' + row + '|'+ column +'">&nbsp;</a></td>'
                            }

                            content += '</tr>';
                        }

                        content += '</table>';
                        return content;
                    }
                },
                _buildLetterSpacingList: {
                    value: function buildLetterSpacingList() {
                        var content = '<ul class="nav nav-pills nav-stacked">\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="-5">-5</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="-3">-3</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="-2">-2</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="-1">-1</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="0">0</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="1">1</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="2">2</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="3">3</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="5">5</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="8">8</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="10">10</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="12">12</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="15">15</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="25">25</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="letter-spacing" data-value="50">50</a></li>\n' +
                            '</ul>';

                        return content;
                    }
                },
                _buildLineHeightList: {
                    value: function buildLineHeightList() {
                        var content = '<ul class="nav nav-pills nav-stacked">\n' +
                            '  <li role="presentation"><a href="#" data-action="line-height" data-value="0.5">0.5</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="line-height" data-value="1.0">1.0</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="line-height" data-value="1.15">1.15</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="line-height" data-value="1.5">1.5</a></li>\n' +
                            '  <li role="presentation"><a href="#" data-action="line-height" data-value="2.0">2.0</a></li>\n' +
                            '</ul>';

                        return content;
                    }
                },
                _selectText: {
                    value: function selectText(selection, range) {

                        if(!selection)
                            selection = document.getSelection();

                        if(!range)
                            range = selection.getRangeAt(0);

                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                },
                _buildEmojiList: {
                    value: function buildEmojiList() {
                        var emojis = this._config.emojiDefault;
                        if(emojis.length > 0) {
                            var maxRows = Math.round(emojis.length / 8)+1;
                            var content = '<table class="emojis-list">';
                            for(var row = 1, index = 0; row <= maxRows; row++) {
                                content += '<tr>';

                                for(var column = 1; column <= 8; column++) {

                                    if(index == emojis.length)
                                        break;

                                    content += '<td><a href="#" data-action="insert-html" data-value="' + emojis[index].toString() + '">'+ emojis[index] +'</a></td>';
                                    index++;
                                }
                                content += '</tr>';
                            }
                            content += '</table>';
                            return content;

                        } else {
                            return false;
                        }
                    }
                },
                _buildSymbolsList: {
                    value: function buildSymbolsList() {

                        var symbols = this._config.symbolsDefault;

                        if(symbols.length > 0) {
                            var maxRows = Math.round(symbols.length / 10);
                            var content = '<table class="symbols-list">';
                            for(var row = 1, index = 0; row <= maxRows; row++) {
                                content += '<tr>';

                                for(var column = 1; column <= 10; column++) {

                                    if(index == symbols.length)
                                        break;

                                    content += '<td><a href="#" data-action="insert-html" data-value="' + symbols[index] + '" style="min-width:16px;text-align:center;">'+ symbols[index] +'</a></td>';
                                    index++;
                                }
                                content += '</tr>';
                            }
                            content += '</table>';

                            return content;

                        } else {
                            return false;
                        }

                    }
                },
                _buildDdropdown: {
                    value: function buildDdropdown(dropdownId, buttonText, buttonCaret, menuItems, defaultValue, dataAttr) {

                        if (buttonText == null)
                            buttonText = 'Not set';

                        if (buttonCaret == null)
                            buttonCaret = '<span class="caret"></span>';

                        if (menuItems == null)
                            buttonCaret = {};

                        if (dataAttr == null)
                            dataAttr = 'data-value';

                        var $dropdown = $('<div class="dropdown" />');
                        var $dropdownButton = $('<button type="button" class="btn btn-block btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />');
                        $dropdownButton.attr('id', dropdownId);
                        $dropdownButton.html(buttonText + ' ' + buttonCaret);

                        // Build dropdown menu
                        var $dropdownMenu = $('<ul class="dropdown-menu" aria-labelledby="' + dropdownId + '" />');

                        if (!defaultValue)
                            $dropdownMenu.append('<li class="active"><a href="#">' + buttonText + '</a></li>');

                        for (let [id, name] of Object.entries(menuItems)) {
                            if (id.toString() == 'separator') {
                                $dropdownMenu.append('<li role="separator" class="divider"></li>');
                            } else if (defaultValue == id.toString()) {
                                $dropdownMenu.append('<li class="active"><a href="#" ' + dataAttr + '="' + id + '">' + name + '</a></li>');
                            } else {
                                $dropdownMenu.append('<li><a href="#" ' + dataAttr + '="' + id + '">' + name + '</a></li>');
                            }
                        }

                        // Click by dropdown menu items
                        $dropdownMenu.find('li').on('click', function(event) {
                            $dropdownMenu.find('li').removeClass('active');
                            $(this).addClass('active');
                            $dropdownButton.html($(this).text() + ' ' + buttonCaret);
                        });

                        $dropdown.append($dropdownButton);
                        $dropdown.append($dropdownMenu);
                        return $dropdown;
                    }
                },
                _buildUrlForm: {
                    value: function buildUrlForm(type) {

                        var _this = this;

                        if (this._config.debug)
                            console.log('Build URL form for type: ' + type);


                        var $form = $('<form class="form-horizontal" />');
                        var $formGroup = $('<div class="form-group" />');
                        var $container = $('<div class="col-xs-12 col-sm-12" />');
                        var $inputGroup = $('<div class="input-group input-group-sm" />');
                        var $dropdown = $('<div class="dropdown" />');
                        var $dropdownButton = $('<button type="button" class="btn btn-block btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />');

                        if (type == "image") {
                            $inputGroup.append('<span class="input-group-addon">Image:</span>');
                        } else if (type == "video") {
                            var $dropdown = _this._buildDdropdown('videoServices', 'YouTube', null, videoServices, 'youtube', 'data-service');
                            $dropdown.attr('class', 'input-group-btn');
                            $dropdown.find('.btn[data-toggle="dropdown"]').toggleClass('btn-default', 'btn-secondary');
                            $inputGroup.append($dropdown);
                        } else if (type == "link") {
                            var $dropdown = _this._buildDdropdown('urlSchemes', 'https://', null, urlSchemes, 'https', 'data-scheme');
                            $dropdown.attr('class', 'input-group-btn');
                            $dropdown.find('.btn[data-toggle="dropdown"]').toggleClass('btn-default', 'btn-secondary');
                            $inputGroup.append($dropdown);
                        }

                        var $input = $('<input type="text" class="form-control" placeholder="Type your URL..." />');
                        if (type == "image") {
                            $input.attr('id', "imageUrl");
                        } else if (type == "video") {
                            $input.attr('id', "videoUrl");
                        } else if (type == "link") {
                            $input.attr('id', "urlInput");
                        }
                        $inputGroup.append($input);

                        var $buttonWrap = $('<span class="input-group-btn" />');
                        var $button = $('<button type="button" class="btn btn-block btn-primary">Add</button>');

                        if (type == "image") {
                            $button.attr('data-action', "add-image");
                        } else if (type == "video") {
                            $button.attr('data-action', "add-video");
                        } else {
                            $button.attr('data-action', "add-url");
                        }

                        $button.on('click', function (event) {

                            var action = $(event.target).data('action');
                            $(event.target).data('value', $input.val());

                            if (action == "add-url") {
                                var urlScheme = $form.find('[aria-labelledby="urlSchemes"] li.active a[data-scheme]').first().data('scheme');
                                $(event.target).data('scheme', (urlScheme) ? urlScheme : null);

                                var urlTile = $form.find('#urlTile').val();
                                $(event.target).data('title', (urlTile) ? urlTile : null);

                                var urlClass = $form.find('#urlClass').val();
                                $(event.target).data('class', (urlClass) ? urlClass : null);

                                var urlLinkTarget = $form.find('[aria-labelledby="urlLinkTarget"] li.active a[data-target]').first().data('target');
                                $(event.target).data('target', (urlLinkTarget) ? urlLinkTarget : null);

                                var urlLinkRel = $form.find('[aria-labelledby="urlLinkRel"] li.active a[data-rel]').first().data('rel');
                                $(event.target).data('relation', (urlLinkRel) ? urlLinkRel : null);

                            } else if (action == "add-video") {
                                var videoService = $form.find('[aria-labelledby="videoServices"] li.active a[data-service]').first().data('service');
                                $(event.target).data('service', (videoService) ? videoService : null);
                            }

                            console.log($button.data());
                        });

                        $buttonWrap.append($button);
                        $inputGroup.append($buttonWrap);
                        $container.append($inputGroup);
                        $formGroup.append($container);
                        $form.append($formGroup);

                        if (type == "link") {
                            var content = '';
                            content += '<div class="form-group form-group-sm">';
                            content += '    <div class="form-row">';
                            content += '        <label class="col-xs-12 col-sm-4">Tile:</label>';
                            content += '        <div class="col-xs-12 col-sm-8">';
                            content += '            <input type="text" class="form-control" id="urlTile" placeholder="Title of link..." />';
                            content += '        </div>';
                            content += '    </div>';
                            content += '</div>';

                            content += '<div class="form-group form-group-sm">';
                            content += '    <div class="form-row">';
                            content += '        <label class="col-xs-12 col-sm-4">Class:</label>';
                            content += '        <div class="col-xs-12 col-sm-8">';
                            content += '            <input type="text" class="form-control" id="urlClass" placeholder="CSS class name..." />';
                            content += '        </div>';
                            content += '    </div>';
                            content += '</div>';

                            $form.append(content);

                            // Link target
                            var $formGroup = $('<div class="form-group form-group-sm" />');
                            var $inputGroup = $('<div class="form-row input-group-sm" />');
                            var $inputLabel = $('<label class="col-xs-12 col-sm-4" />');
                            $inputLabel.text('Target:');
                            $inputGroup.append($inputLabel);

                            var $dropdown = _this._buildDdropdown('urlLinkTarget', 'Not set', null, urlLinkTarget, null, 'data-target');
                            $dropdown.addClass('col-xs-12 col-sm-8');
                            $dropdown.find('.btn[data-toggle="dropdown"]').addClass('btn-sm');

                            $inputGroup.append($dropdown);
                            $formGroup.append($inputGroup);
                            $form.append($formGroup);

                            // Link rel
                            var $formGroup = $('<div class="form-group form-group-sm" />');
                            var $inputGroup = $('<div class="form-row input-group-sm" />');
                            var $inputLabel = $('<label class="col-xs-12 col-sm-4" />');
                            $inputLabel.text('Relation:');
                            $inputGroup.append($inputLabel);

                            var $dropdown = _this._buildDdropdown('urlLinkRel', 'Not set', null, urlLinkRel, null, 'data-rel')
                            $dropdown.addClass('col-xs-12 col-sm-8');
                            $dropdown.find('.btn[data-toggle="dropdown"]').addClass('btn-sm');

                            $inputGroup.append($dropdown);
                            $formGroup.append($inputGroup);
                            $form.append($formGroup);

                        }

                        return $form;
                    }
                },
                _generateTable: {
                    value: function generateTable(rows, columns) {

                        rows = parseInt(rows) + 1;
                        columns = parseInt(rows);

                        if(!columns) columns = 1;

                        var content = '<table class="table">';

                        for(var row = 1; row <= rows; row++) {

                            if (row == 1)
                                content += '<thead>';
                            else if (row == ((rows - row) - 1))
                                content += '<tbody>';

                            content += '<tr>';

                            for(var column = 1; column <= columns; column++) {

                                if (row == 1)
                                    content += '<th>Header ' + column + '</th>';
                                else
                                    content += '<td>&nbsp;</td>';
                            }

                            content += '</tr>';

                            if (row == 1)
                                content += '</thead>';
                            else if (row == rows)
                                content += '</tbody>';
                        }

                        content += '</table>';
                        return content;
                    }
                },
                _updateState: {
                    value: function updateState($target, reset) {
                        var _this = this;
                        if (_this._config.mode == 'editor') {
                            var statInfo = _this._getTextStat(_this._$content.get(0));
                            var pathInfo = _this._getPath($target, _this._$content, false);

                            if(!reset) {
                                switch (pathInfo['tags'][0]) {
                                    case 'b' :
                                        _this._$toolbar.find('[data-action="text"]').removeClass('active');
                                        _this._$toolbar.find('[data-action="text"][data-value="bold"]').addClass('active');
                                        break;

                                    case 'u' :
                                        _this._$toolbar.find('[data-action="text"]').removeClass('active');
                                        _this._$toolbar.find('[data-action="text"][data-value="underline"]').addClass('active');
                                        break;

                                    case 'sub' :
                                        _this._$toolbar.find('[data-action="text"]').removeClass('active');
                                        _this._$toolbar.find('[data-action="text"][data-value="subscript"]').addClass('active');
                                        break;

                                    case 'sup' :
                                        _this._$toolbar.find('[data-action="text"]').removeClass('active');
                                        _this._$toolbar.find('[data-action="text"][data-value="superscript"]').addClass('active');
                                        break;

                                    case 'i' :
                                        _this._$toolbar.find('[data-action="text"]').removeClass('active');
                                        _this._$toolbar.find('[data-action="text"][data-value="italic"]').addClass('active');
                                        break;

                                    case 'a' :
                                        _this._$toolbar.find('[data-action="insert"]').removeClass('active');
                                        _this._$toolbar.find('[data-action="insert"][data-value="link"]').addClass('active');
                                        break;

                                    case 'p' :
                                        _this._$toolbar.find('[data-action="align"]').removeClass('active');

                                        if ($target.css('text-align') == 'center')
                                            _this._$toolbar.find('[data-action="align"][data-value="center"]').addClass('active');
                                        else if ($target.css('text-align') == 'right')
                                            _this._$toolbar.find('[data-action="align"][data-value="right"]').addClass('active');
                                        else if ($target.css('text-align') == 'justify')
                                            _this._$toolbar.find('[data-action="align"][data-value="justify"]').addClass('active');
                                        else
                                            _this._$toolbar.find('[data-action="align"][data-value="left"]').addClass('active');

                                        break;

                                    default :
                                        _this._$toolbar.find('[data-action="text"]').removeClass('active');
                                        _this._$toolbar.find('[data-action="align"]').removeClass('active');
                                        _this._$toolbar.find('[data-action="insert"]').removeClass('active');
                                        break;
                                }
                            } else {
                                _this._$toolbar.find('button[data-action]').removeClass('active');
                            }

                            _this._$statusbar.path.text(pathInfo['path']);
                            _this._$statusbar.stat.text('Length: ' + statInfo['length'] + ', chars: ' + statInfo['chars'] + ', words: ' +  statInfo['words']);

                        } else {

                            var position = _this._getTextPosition(_this._$content.get(0));
                            _this._$statusbar.path.empty();

                            if(parseInt(position['selected']) > 0)
                                _this._$statusbar.stat.text('Line: ' + position['line'] + ', column: ' + position['end'] + ', selected: ' + position['selected']);
                            else
                                _this._$statusbar.stat.text('Line: ' + position['line'] + ', column: ' + position['end']);

                        }

                        return _this._$element;

                    }
                },
            }, {
                Default: {
                    get: function() {
                        return defaults;
                    }
                },
                _jQueryInterface: {
                    value: function _jQueryInterface(config) {
                        var _this = this;
                        config = config || {};
                        return _this.each(function() {
                            var $this = $(_this);
                            var _config = $.extend({}, WYSIWYG.Default, $this.data(), typeof config === "object" && config);
                            new Editor(_this, _config);
                        });
                    }
                }
            });

            return Editor;

        })();

        $.fn[className] = Editor._jQueryInterface;
        $.fn[className].Constructor = Editor;
        $.fn[className].noConflict = function() {
            $.fn[className] = _jQueryNoConflict;
            return Editor._jQueryInterface;
        };

        return Editor;

    })(jQuery);
}(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd5c2l3eWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ3eXNpd3lnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTaW1wbGUgV1lTSVdZRyBlZGl0b3IgZm9yIEJvb3RzdHJhcDNcbiAqXG4gKiBAY2F0ZWdvcnkgICAgICAgIGpRdWVyeSBQbHVnaW5cbiAqIEB2ZXJzaW9uICAgICAgICAgMS4xLjNcbiAqIEBhdXRob3IgICAgICAgICAgQWxleHNhbmRlciBWeXNobnl2ZXRza3l5IDxhbGV4LnZ5c2hueXZldHNreXlAZ21haWwuY29tPlxuICogQGxpbmsgICAgICAgICAgICBodHRwOi8vd2RtZy5naXRodWIuaW8vYm9vdHN0cmFwLXd5c2l3eWdcbiAqIEBjb3B5cmlnaHQgICAgICAgQ29weXJpZ2h0IChjKSAyMDE5IC0gMjAyMCBXLkQuTS5Hcm91cCwgVWtyYWluZVxuICogQGxpY2Vuc2UgICAgICAgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVCBNYXNzYWNodXNldHRzIEluc3RpdHV0ZSBvZiBUZWNobm9sb2d5IChNSVQpIExpY2Vuc2VcbiAqXG4gKi9cblxuK2Z1bmN0aW9uKCQpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBwcm9wc1trZXldO1xuICAgICAgICAgICAgICAgIHByb3AuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAocHJvcC52YWx1ZSkgcHJvcC53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICAgICAgICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgICAgICAgICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICB2YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24oaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gICAgICAgIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBXWVNJV1lHID0gKGZ1bmN0aW9uKCQpIHtcblxuICAgICAgICB2YXIgY2xhc3NOYW1lID0gXCJ3eXNpd3lnXCI7XG4gICAgICAgIHZhciBfalF1ZXJ5Tm9Db25mbGljdCA9ICQuZm5bY2xhc3NOYW1lXTtcbiAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgdG9vbGJhcjogW1xuICAgICAgICAgICAgICAgIFsnbW9kZSddLFxuICAgICAgICAgICAgICAgIFsnb3BlcmF0aW9ucycsIFsndW5kbycsICdyZW5kbycsICdjdXQnLCAnY29weScsICdwYXN0ZSddXSxcbiAgICAgICAgICAgICAgICBbJ3N0eWxlcyddLFxuICAgICAgICAgICAgICAgIFsnZm9udHMnLCBbJ3NlbGVjdCcsICdzaXplJ11dLFxuICAgICAgICAgICAgICAgIFsndGV4dCcsIFsnYm9sZCcsICdpdGFsaWMnLCAndW5kZXJsaW5lJywgJ3N0cmlrZScsICdzdWJzY3JpcHQnLCAnc3VwZXJzY3JpcHQnLCAnZm9udC1jb2xvcicsICdiZy1jb2xvciddXSxcbiAgICAgICAgICAgICAgICBbJ2FsaWduJywgWydsZWZ0JywgJ2NlbnRlcicsICdyaWdodCcsICdqdXN0aWZ5J11dLFxuICAgICAgICAgICAgICAgIFsnbGlzdHMnLCBbJ3Vub3JkZXJlZCcsICdvcmRlcmVkJywgJ2luZGVudCcsICdvdXRkZW50J11dLFxuICAgICAgICAgICAgICAgIFsnY29tcG9uZW50cycsIFsndGFibGUnLCAvKidjaGFydCcqL11dLFxuICAgICAgICAgICAgICAgIFsnaW50ZXJ2YWxzJywgWydsaW5lLWhlaWdodCcsICdsZXR0ZXItc3BhY2luZyddXSxcbiAgICAgICAgICAgICAgICBbJ2luc2VydCcsIFsnZW1vamknLCAnbGluaycsICdpbWFnZScsICd2aWRlbycsICdzeW1ib2wnLCAvKidib29rbWFyaycqL11dLFxuICAgICAgICAgICAgICAgIFsnc3BlY2lhbCcsIFsncHJpbnQnLCAndW5mb3JtYXQnLCAndmlzdWFsJywgJ2NsZWFuJ11dLFxuICAgICAgICAgICAgICAgIC8qWydmdWxsc2NyZWVuJ10sKi9cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBmb250U2l6ZXM6IFsnOHB4JywgJzlweCcsICcxMHB4JywgJzExcHgnLCAnMTJweCcsICcxNHB4JywgJzE1cHgnLCAnMTZweCcsICcxOHB4JywgJzIwcHgnLCAnMjRweCcsICczMHB4JywgJzMycHgnLCAnMzZweCcsICc0OHB4J10sXG4gICAgICAgICAgICBmb250U2l6ZURlZmF1bHQ6ICcxMnB4JyxcbiAgICAgICAgICAgIGZvbnRGYW1pbGllczogWydPcGVuIFNhbnMnLCAnQXJpYWwnLCAnQXJpYWwgQmxhY2snLCAnQ291cmllcicsICdDb3VyaWVyIE5ldycsICdDb21pYyBTYW5zIE1TJywgJ0hlbHZldGljYScsICdJbXBhY3QnLCAnTHVjaWRhIEdyYW5kZScsICdMdWNpZGEgU2FucycsICdUYWhvbWEnLCAnVGltZXMnLCAnVGltZXMgTmV3IFJvbWFuJywgJ1ZlcmRhbmEnXSxcbiAgICAgICAgICAgIGZvbnRGYW1pbHlEZWZhdWx0OiAnT3BlbiBTYW5zJyxcbiAgICAgICAgICAgIGVtb2ppRGVmYXVsdDogW1wiXFx1ezFmNjAwfVwiLCBcIlxcdXsxZjYyY31cIiwgXCJcXHV7MWY2MDF9XCIsIFwiXFx1ezFmNjAyfVwiLCBcIlxcdXsxZjYwM31cIiwgXCJcXHV7MWY2MDR9XCIsIFwiXFx1ezFmNjA1fVwiLCBcIlxcdXsxZjYwNn1cIiwgXCJcXHV7MWY2MDd9XCIsIFwiXFx1ezFmNjA5fVwiLCBcIlxcdXsxZjYwYX1cIiwgXCJcXHV7MWY2NDJ9XCIsIFwiXFx1ezFmNjQzfVwiLCBcIlxcdXsxZjYwYn1cIiwgXCJcXHV7MWY2MGN9XCIsIFwiXFx1ezFmNjBkfVwiLCBcIlxcdXsxZjYxOH1cIiwgXCJcXHV7MWY2MTd9XCIsIFwiXFx1ezFmNjE5fVwiLCBcIlxcdXsxZjYxYX1cIiwgXCJcXHV7MWY2MWN9XCIsIFwiXFx1ezFmNjFkfVwiLCBcIlxcdXsxZjYxYn1cIiwgXCJcXHV7MWY5MTF9XCIsIFwiXFx1ezFmOTEzfVwiLCBcIlxcdXsxZjYwZX1cIiwgXCJcXHV7MWY5MTd9XCIsIFwiXFx1ezFmNjBmfVwiLCBcIlxcdXsxZjYzNn1cIiwgXCJcXHV7MWY2MTB9XCIsIFwiXFx1ezFmNjExfVwiLCBcIlxcdXsxZjYxMn1cIiwgXCJcXHV7MWY2NDR9XCIsIFwiXFx1ezFmOTE0fVwiLCBcIlxcdXsxZjYzM31cIiwgXCJcXHV7MWY2MWV9XCIsIFwiXFx1ezFmNjFmfVwiLCBcIlxcdXsxZjYyMH1cIiwgXCJcXHV7MWY2MjF9XCIsIFwiXFx1ezFmNjE0fVwiLCBcIlxcdXsxZjYxNX1cIiwgXCJcXHV7MWY2NDF9XCIsIFwiXFx1ezFmNjIzfVwiLCBcIlxcdXsxZjYxNn1cIiwgXCJcXHV7MWY2MmJ9XCIsIFwiXFx1ezFmNjI5fVwiLCBcIlxcdXsxZjYyNH1cIiwgXCJcXHV7MWY2MmV9XCIsIFwiXFx1ezFmNjMxfVwiLCBcIlxcdXsxZjYyOH1cIiwgXCJcXHV7MWY2MzB9XCIsIFwiXFx1ezFmNjJmfVwiLCBcIlxcdXsxZjYyNn1cIiwgXCJcXHV7MWY2Mjd9XCIsIFwiXFx1ezFmNjIyfVwiLCBcIlxcdXsxZjYyNX1cIiwgXCJcXHV7MWY2MmF9XCIsIFwiXFx1ezFmNjEzfVwiLCBcIlxcdXsxZjYyZH1cIiwgXCJcXHV7MWY2MzV9XCIsIFwiXFx1ezFmNjMyfVwiLCBcIlxcdXsxZjkxMH1cIiwgXCJcXHV7MWY2Mzd9XCIsIFwiXFx1ezFmOTEyfVwiLCBcIlxcdXsxZjkxNX1cIiwgXCJcXHV7MWY2MzR9XCIsIFwiXFx1ezFmNGE0fVwiXSxcbiAgICAgICAgICAgIHN5bWJvbHNEZWZhdWx0OiBbXCImbHQ7XCIsIFwiJmd0O1wiLCBcIiZsYXF1bztcIiwgXCImcmFxdW87XCIsIFwiJmxzYXF1bztcIiwgXCImcnNhcXVvO1wiLCBcIiZxdW90O1wiLCBcIiZwcmltZTtcIiwgXCImUHJpbWU7XCIsIFwiJmxzcXVvO1wiLCBcIiZyc3F1bztcIiwgXCImc2JxdW87XCIsIFwiJmxkcXVvO1wiLCBcIiZyZHF1bztcIiwgXCImYmRxdW87XCIsIFwiJiMxMDA3NjtcIiwgXCImIzEwMDc1O1wiLCBcIiZhbXA7XCIsIFwiJmFwb3M7XCIsIFwiJnNlY3Q7XCIsIFwiJmNvcHk7XCIsIFwiJm5vdDtcIiwgXCImcmVnO1wiLCBcIiZtYWNyO1wiLCBcIiZkZWc7XCIsIFwiJnBsdXNtbjtcIiwgXCImc3VwMTtcIiwgXCImc3VwMjtcIiwgXCImc3VwMztcIiwgXCImZnJhYzE0O1wiLCBcIiZmcmFjMTI7XCIsIFwiJmZyYWMzNDtcIiwgXCImYWN1dGU7XCIsIFwiJm1pY3JvO1wiLCBcIiZwYXJhO1wiLCBcIiZtaWRkb3Q7XCIsIFwiJmlxdWVzdDtcIiwgXCImZm5vZjtcIiwgXCImdHJhZGU7XCIsIFwiJmJ1bGw7XCIsIFwiJmhlbGxpcDtcIiwgXCImb2xpbmU7XCIsIFwiJm5kYXNoO1wiLCBcIiZtZGFzaDtcIiwgXCImcGVybWlsO1wiLCBcIiYjMTI1O1wiLCBcIiYjMTIzO1wiLCBcIiYjNjE7XCIsIFwiJm5lO1wiLCBcIiZjb25nO1wiLCBcIiZhc3ltcDtcIiwgXCImbGU7XCIsIFwiJmdlO1wiLCBcIiZhbmc7XCIsIFwiJnBlcnA7XCIsIFwiJnJhZGljO1wiLCBcIiZzdW07XCIsIFwiJmludDtcIiwgXCImIzgyNTE7XCIsIFwiJmRpdmlkZTtcIiwgXCImaW5maW47XCIsIFwiJiM2NDtcIiwgXCImIzkxO1wiLCBcIiYjOTM7XCIsIFwiJmxhcnI7XCIsIFwiJnVhcnI7XCIsIFwiJnJhcnI7XCIsIFwiJmRhcnI7XCIsIFwiJmhhcnI7XCIsIFwiJmNyYXJyO1wiLCBcIiZsQXJyO1wiLCBcIiZ1QXJyO1wiLCBcIiZyQXJyO1wiLCBcIiZkQXJyO1wiLCBcIiZoQXJyO1wiLCBcIiYjMTAxNDQ7XCIsIFwiJiMxMDE0ODtcIiwgXCImIzEwMTQ5O1wiLCBcIiYjMTAxNTA7XCIsIFwiJiMxMDE2MztcIiwgXCImIzg2MzQ7XCIsIFwiJiM4NjM1O1wiLCBcIiYjODY3OTtcIiwgXCImIzg2MTc7XCIsIFwiJiMxMTAxNTtcIiwgXCImIzExMDE0O1wiLCBcIiZzcGFkZXM7XCIsIFwiJmNsdWJzO1wiLCBcIiZoZWFydHM7XCIsIFwiJmRpYW1zO1wiLCBcIiYjOTgyNTtcIiwgXCImIzk4MjY7XCIsIFwiJiM5ODI4O1wiLCBcIiYjOTgzMTtcIiwgXCImIzgzNzI7XCIsIFwiJmV1cm87XCIsIFwiJmRvbGxhcjtcIiwgXCImY2VudDtcIiwgXCImcG91bmQ7XCIsIFwiJiM4MzgxO1wiLCBcIiZ5ZW47XCIsIFwiJiM4Mzc3O1wiLCBcIiYjMjIyOTE7XCIsIFwiJiM4Mzc2O1wiXSxcbiAgICAgICAgICAgIGNvbG9yUGFsZXR0ZTogW1tcInJnYigwLCAwLCAwKVwiLFwicmdiKDY3LCA2NywgNjcpXCIsXCJyZ2IoMTAyLCAxMDIsIDEwMilcIixcInJnYigxNTMsIDE1MywgMTUzKVwiLFwicmdiKDE4MywgMTgzLCAxODMpXCIsXCJyZ2IoMjA0LCAyMDQsIDIwNClcIixcInJnYigyMTcsIDIxNywgMjE3KVwiLFwicmdiKDIzOSwgMjM5LCAyMzkpXCIsXCJyZ2IoMjQzLCAyNDMsIDI0MylcIixcInJnYigyNTUsIDI1NSwgMjU1KVwiXSxbXCJyZ2IoMTUyLCAwLCAwKVwiLFwicmdiKDI1NSwgMCwgMClcIixcInJnYigyNTUsIDE1MywgMClcIixcInJnYigyNTUsIDI1NSwgMClcIixcInJnYigwLCAyNTUsIDApXCIsXCJyZ2IoMCwgMjU1LCAyNTUpXCIsXCJyZ2IoNzQsIDEzNCwgMjMyKVwiLFwicmdiKDAsIDAsIDI1NSlcIixcInJnYigxNTMsIDAsIDI1NSlcIixcInJnYigyNTUsIDAsIDI1NSlcIl0sW1wicmdiKDIzMCwgMTg0LCAxNzUpXCIsXCJyZ2IoMjQ0LCAyMDQsIDIwNClcIixcInJnYigyNTIsIDIyOSwgMjA1KVwiLFwicmdiKDI1NSwgMjQyLCAyMDQpXCIsXCJyZ2IoMjE3LCAyMzQsIDIxMSlcIixcInJnYigyMDgsIDIyNCwgMjI3KVwiLFwicmdiKDIwMSwgMjE4LCAyNDgpXCIsXCJyZ2IoMjA3LCAyMjYsIDI0MylcIixcInJnYigyMTcsIDIxMCwgMjMzKVwiLFwicmdiKDIzNCwgMjA5LCAyMjApXCIsXCJyZ2IoMjIxLCAxMjYsIDEwNylcIixcInJnYigyMzQsIDE1MywgMTUzKVwiLFwicmdiKDI0OSwgMjAzLCAxNTYpXCIsXCJyZ2IoMjU1LCAyMjksIDE1MylcIixcInJnYigxODIsIDIxNSwgMTY4KVwiLFwicmdiKDE2MiwgMTk2LCAyMDEpXCIsXCJyZ2IoMTY0LCAxOTQsIDI0NClcIixcInJnYigxNTksIDE5NywgMjMyKVwiLFwicmdiKDE4MCwgMTY3LCAyMTQpXCIsXCJyZ2IoMjEzLCAxNjYsIDE4OSlcIixcInJnYigyMDQsIDY1LCAzNylcIixcInJnYigyMjQsIDEwMiwgMTAyKVwiLFwicmdiKDI0NiwgMTc4LCAxMDcpXCIsXCJyZ2IoMjU1LCAyMTcsIDEwMilcIixcInJnYigxNDcsIDE5NiwgMTI1KVwiLFwicmdiKDExOCwgMTY1LCAxNzUpXCIsXCJyZ2IoMTA5LCAxNTgsIDIzNSlcIixcInJnYigxMTEsIDE2OCwgMjIwKVwiLFwicmdiKDE0MiwgMTI0LCAxOTUpXCIsXCJyZ2IoMTk0LCAxMjMsIDE2MClcIixcInJnYigxNjYsIDI4LCAwKVwiLFwicmdiKDIwNCwgMCwgMClcIixcInJnYigyMzAsIDE0NSwgNTYpXCIsXCJyZ2IoMjQxLCAxOTQsIDUwKVwiLFwicmdiKDEwNiwgMTY4LCA3OSlcIixcInJnYig2OSwgMTI5LCAxNDIpXCIsXCJyZ2IoNjAsIDEyMCwgMjE2KVwiLFwicmdiKDYxLCAxMzMsIDE5OClcIixcInJnYigxMDMsIDc4LCAxNjcpXCIsXCJyZ2IoMTY2LCA3NywgMTIxKVwiLFwicmdiKDEzMywgMzIsIDEyKVwiLFwicmdiKDE1MywgMCwgMClcIixcInJnYigxODAsIDk1LCA2KVwiLFwicmdiKDE5MSwgMTQ0LCAwKVwiLFwicmdiKDU2LCAxMTgsIDI5KVwiLFwicmdiKDE5LCA3OSwgOTIpXCIsXCJyZ2IoMTcsIDg1LCAyMDQpXCIsXCJyZ2IoMTEsIDgzLCAxNDgpXCIsXCJyZ2IoNTMsIDI4LCAxMTcpXCIsXCJyZ2IoMTE2LCAyNywgNzEpXCIsXCJyZ2IoOTEsIDE1LCAwKVwiLFwicmdiKDEwMiwgMCwgMClcIixcInJnYigxMjAsIDYzLCA0KVwiLFwicmdiKDEyNywgOTYsIDApXCIsXCJyZ2IoMzksIDc4LCAxOSlcIixcInJnYigxMiwgNTIsIDYxKVwiLFwicmdiKDI4LCA2OSwgMTM1KVwiLFwicmdiKDcsIDU1LCA5OSlcIixcInJnYigzMiwgMTgsIDc3KVwiLFwicmdiKDc2LCAxNywgNDgpXCJdXSxcbiAgICAgICAgICAgIG1vZGU6ICdlZGl0b3InLFxuICAgICAgICAgICAgbGFuZ3VhZ2U6ICdlbi11cycsXG4gICAgICAgICAgICB0cmFuc2xhdGlvbnM6IHt9LFxuICAgICAgICAgICAgaGlnaGxpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgZGVidWc6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgU3R5bGVzID0ge1xuICAgICAgICAgICAgJ0hlYWRlciBIMSc6IHtcbiAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2Zvcm1hdGJsb2NrJyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAnaDEnLFxuICAgICAgICAgICAgICAgICd3cmFwJzogJzxoMSAvPicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ0hlYWRlciBIMic6IHtcbiAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2Zvcm1hdGJsb2NrJyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAnaDInLFxuICAgICAgICAgICAgICAgICd3cmFwJzogJzxoMiAvPicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ0hlYWRlciBIMyc6IHtcbiAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2Zvcm1hdGJsb2NrJyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAnaDMnLFxuICAgICAgICAgICAgICAgICd3cmFwJzogJzxoMyAvPicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ0hlYWRlciBINCc6IHtcbiAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2Zvcm1hdGJsb2NrJyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAnaDQnLFxuICAgICAgICAgICAgICAgICd3cmFwJzogJzxoNCAvPicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ0hlYWRlciBINSc6IHtcbiAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2Zvcm1hdGJsb2NrJyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAnaDUnLFxuICAgICAgICAgICAgICAgICd3cmFwJzogJzxoNSAvPicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ0hlYWRlciBINic6IHtcbiAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2Zvcm1hdGJsb2NrJyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAnaDYnLFxuICAgICAgICAgICAgICAgICd3cmFwJzogJzxoNiAvPicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ1BhcmFncmFwaCc6IHtcbiAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2Zvcm1hdGJsb2NrJyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAncCcsXG4gICAgICAgICAgICAgICAgJ3dyYXAnOiAnPHAgLz4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdCbG9ja3F1b3RlJzoge1xuICAgICAgICAgICAgICAgICdhY3Rpb24nOiAnZm9ybWF0YmxvY2snLFxuICAgICAgICAgICAgICAgICd2YWx1ZSc6ICdibG9ja3F1b3RlJyxcbiAgICAgICAgICAgICAgICAnd3JhcCc6ICc8YmxvY2txdW90ZSAvPicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ1ByZWZvcm1hdHRlZCc6IHtcbiAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2Zvcm1hdGJsb2NrJyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAncHJlJyxcbiAgICAgICAgICAgICAgICAnd3JhcCc6ICc8cHJlIC8+JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnRGl2IGJsb2NrJzoge1xuICAgICAgICAgICAgICAgICdhY3Rpb24nOiAnZm9ybWF0YmxvY2snLFxuICAgICAgICAgICAgICAgICd2YWx1ZSc6ICdkaXYnLFxuICAgICAgICAgICAgICAgICd3cmFwJzogJzxkaXYgLz4nLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmlkZW9TZXJ2aWNlcyA9IHtcbiAgICAgICAgICAgIHlvdXR1YmU6ICdZb3VUdWJlJyxcbiAgICAgICAgICAgIHZpbWVvOiAnVmltZW8nLFxuICAgICAgICAgICAgZGFpbHltb3Rpb246ICdEYWlseW1vdGlvbicsXG4gICAgICAgICAgICAvKmh1bHU6ICdIdWx1JyxcbiAgICAgICAgICAgIHR3aXRjaDogJ1R3aXRjaCcsXG4gICAgICAgICAgICBmYWNlYm9vazogJ0ZhY2Vib29rJyxcbiAgICAgICAgICAgIHZrb250YWt0ZTogJ3ZLb250YWt0ZScsXG4gICAgICAgICAgICB0d2l0dGVyOiAnVHdpdHRlcicsXG4gICAgICAgICAgICB1c3RyZWFtOiAnVXN0cmVhbScsKi9cbiAgICAgICAgICAgIHNvdXJjZTogJ1NvdXJjZSBtZWRpYScsXG4gICAgICAgICAgICAvKmVtYmVkOiAnRW1iZWQgY29kZScqL1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHVybFNjaGVtZXMgPSB7XG4gICAgICAgICAgICBodHRwczogJ2h0dHBzOi8vJyxcbiAgICAgICAgICAgIGh0dHA6ICdodHRwOi8vJyxcbiAgICAgICAgICAgIG1haWx0bzogJ21haWx0bzovLycsXG4gICAgICAgICAgICBmdHA6ICdmdHA6Ly8nLFxuICAgICAgICAgICAgZmVlZDogJ2ZlZWQ6Ly8nLFxuICAgICAgICAgICAgbmV3czogJ25ld3M6Ly8nLFxuICAgICAgICAgICAgdGVsOiAndGVsOicsXG4gICAgICAgICAgICBza3lwZTogJ3NreXBlOicsXG4gICAgICAgICAgICB0ZWxlZ3JhbTogJ3RnOi8vJyxcbiAgICAgICAgICAgIHdoYXRzYXBwOiAnd2hhdHNhcHA6JyxcbiAgICAgICAgICAgIHZpYmVyOiAndmliZXI6JyxcbiAgICAgICAgICAgIG90aGVyOiAnb3RoZXInXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdXJsTGlua1RhcmdldCA9IHtcbiAgICAgICAgICAgIGJsYW5rOiAnTmV3IHRhYicsXG4gICAgICAgICAgICB0b3A6ICdNYWluIHRhYicsXG4gICAgICAgICAgICBzZWxmOiAnQ3VycmVudCB0YWInLFxuICAgICAgICAgICAgcGFyZW50OiAnUGFyZW50IHRhYicsXG4gICAgICAgICAgICAvKmlmcmFtZTogJ0lmcmFtZScsXG4gICAgICAgICAgICBwb3B1cDogJ1BvcFVwJywqL1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHVybExpbmtSZWwgPSB7XG4gICAgICAgICAgICBub2ZvbGxvdzogJ0RvIG5vdCBmb2xsb3cgKGZvciByb2JvdHMpJyxcbiAgICAgICAgICAgIG5vcmVmZXJyZXI6ICdEbyBub3QgcGFzcyBIVFRQLXJlZmVycmVyJyxcbiAgICAgICAgICAgIC8qYXJjaGl2ZXM6ICdMaW5rIHRvIHRoZSBzaXRlIGFyY2hpdmUnLFxuICAgICAgICAgICAgYXV0aG9yOiAnTGluayB0byB0aGUgcGFnZSBhYm91dCB0aGUgYXV0aG9yIG9uIHRoZSBzYW1lIGRvbWFpbicsXG4gICAgICAgICAgICBib29rbWFyazogJ1Blcm1hbGluayB0byBhIHNlY3Rpb24gb3IgcG9zdCcsXG4gICAgICAgICAgICBmaXJzdDogJ0xpbmsgdG8gdGhlIGZpcnN0IHBhZ2UnLFxuICAgICAgICAgICAgaGVscDogJ0hlbHAgZG9jdW1lbnQgbGluaycsXG4gICAgICAgICAgICBpbmRleDogJ0NvbnRlbnQgTGluaycsXG4gICAgICAgICAgICBsYXN0OiAnTGluayB0byB0aGUgbGFzdCBwYWdlJyxcbiAgICAgICAgICAgIGxpY2Vuc2U6ICdMaW5rIHRvIHBhZ2Ugd2l0aCBsaWNlbnNlIGFncmVlbWVudCBvciBjb3B5cmlnaHQnLFxuICAgICAgICAgICAgbWU6ICdMaW5rIHRvIHRoZSBhdXRob3LigJlzIHBhZ2Ugb24gYW5vdGhlciBkb21haW4nLFxuICAgICAgICAgICAgbmV4dDogJ0xpbmsgdG8gdGhlIG5leHQgcGFnZSBvciBzZWN0aW9uJyxcbiAgICAgICAgICAgIHByZWZldGNoOiAnSW5kaWNhdGVzIHRoYXQgdGhlIHNwZWNpZmllZCByZXNvdXJjZSBtdXN0IGJlIGNhY2hlZCBpbiBhZHZhbmNlLicsXG4gICAgICAgICAgICBwcmV2OiAnTGluayB0byBwcmV2aW91cyBwYWdlIG9yIHNlY3Rpb24nLFxuICAgICAgICAgICAgc2VhcmNoOiAnU2VhcmNoIExpbmsnLFxuICAgICAgICAgICAgc2lkZWJhcjogJ0FkZCBsaW5rIHRvIGJyb3dzZXIgZmF2b3JpdGVzJyxcbiAgICAgICAgICAgIHRhZzogJ0luZGljYXRlcyB0aGF0IHRoZSBsYWJlbCAodGFnKSBpcyByZWxhdGVkIHRvIHRoZSBjdXJyZW50IGRvY3VtZW50LicsXG4gICAgICAgICAgICB1cDogJ0xpbmsgdG8gdGhlIHBhcmVudCBwYWdlJyxcbiAgICAgICAgICAgIGFuc3dlcjogJ0Fuc3dlciB0byB0aGUgcXVlc3Rpb24nLFxuICAgICAgICAgICAgY2hhcHRlcjogJ1NlY3Rpb24gb3IgY2hhcHRlciBvZiB0aGUgY3VycmVudCBkb2N1bWVudCcsXG4gICAgICAgICAgICBjby13b3JrZXI6ICdMaW5rIHRvIGNvbGxlYWd1ZeKAmXMgcGFnZScsXG4gICAgICAgICAgICBjb2xsZWFndWU6ICdMaW5rIHRvIGNvbGxlYWd1ZeKAmXMgcGFnZSAobm90IGZvciB3b3JrKScsXG4gICAgICAgICAgICBjb250YWN0OiAnTGluayB0byB0aGUgcGFnZSB3aXRoIGNvbnRhY3QgaW5mb3JtYXRpb24nLFxuICAgICAgICAgICAgZGV0YWlsczogJ0xpbmsgdG8gdGhlIHBhZ2Ugd2l0aCBkZXRhaWxzJyxcbiAgICAgICAgICAgIGVkaXQ6ICdFZGl0YWJsZSB2ZXJzaW9uIG9mIHRoZSBjdXJyZW50IGRvY3VtZW50JyxcbiAgICAgICAgICAgIGZyaWVuZDogJ0xpbmsgdG8gZnJpZW5k4oCZcyBwYWdlJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uOiAnTGluayB0byB0aGUgcXVlc3Rpb24gcGFnZScsKi9cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgRWRpdG9yID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBFZGl0b3IoJGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgX2NsYXNzQ2FsbENoZWNrKF90aGlzLCBFZGl0b3IpO1xuXG4gICAgICAgICAgICAgICAgLy8gTWVyZ2UgZGVmYXVsdCBhbmQgY3VzdG9tIG9wdGlvbnNcbiAgICAgICAgICAgICAgICBfdGhpcy5fY29uZmlnID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLl9jb25maWcuZGVidWcpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbml0IFdZU0lXWUcgZWRpdG9yLi4uJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBDb25maWd1cmUgdmFyaWFibGVzXG4gICAgICAgICAgICAgICAgX3RoaXMuX2VkaXRvcklkID0gJ3d5c2l3eWctJyArIChTdHJpbmcuZnJvbUNoYXJDb2RlKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDExKSkgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwKSkudHJpbSgpO1xuICAgICAgICAgICAgICAgIF90aGlzLl8kZWxlbWVudCA9ICRlbGVtZW50IGluc3RhbmNlb2YgalF1ZXJ5ID8gJGVsZW1lbnQgOiAkKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5faW5wdXRJZCA9IF90aGlzLl8kZWxlbWVudC5hdHRyKCdpZCcpO1xuXG4gICAgICAgICAgICAgICAgLy8gV3JhcCB0ZXh0IGlucHV0IHRvIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgIF90aGlzLl8kZWRpdG9yID0gJCgnPGRpdiBpZD1cIicgKyBfdGhpcy5fZWRpdG9ySWQgKyAnXCIgYXJpYS1kZXNjcmliZWRieT1cIiMnICsgX3RoaXMuX2lucHV0SWQgKyAnXCIgY2xhc3M9XCJ3eXNpd3lnLWVkaXRvclwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgX3RoaXMuXyRlbGVtZW50LndyYXAoX3RoaXMuXyRlZGl0b3IpO1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkIGNvbnRlbnQgdG8gZWRpdG9yXG4gICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50ID0gJCgnPGRpdiBjbGFzcz1cImVkaXRvci1jb250ZW50XCIgY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50Lmh0bWwoX3RoaXMuXyRlbGVtZW50LnZhbCgpKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fJGVsZW1lbnQuYmVmb3JlKF90aGlzLl8kY29udGVudCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3NvdXJjZSA9IF90aGlzLl8kZWxlbWVudC52YWwoKTtcblxuICAgICAgICAgICAgICAgIF90aGlzLl9zZWxlY3Rpb24gPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fcG9wb3ZlcklzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIF90aGlzLl8kbGFzdEZvY3VzID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIC8vIEFkZCB0b29sYmFyIHRvIGVkaXRvclxuICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhciA9ICQoJzxkaXYgY2xhc3M9XCJ3eXNpd3lnLXRvb2xiYXIgYnRuLXRvb2xiYXJcIiAvPicpO1xuICAgICAgICAgICAgICAgIF90aGlzLl8kY29udGVudC5iZWZvcmUoX3RoaXMuXyR0b29sYmFyKTtcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBzdGF0dXNiYXIgdG8gZWRpdG9yXG4gICAgICAgICAgICAgICAgX3RoaXMuXyRzdGF0dXNiYXIgPSAkKCc8ZGl2IGNsYXNzPVwiZWRpdG9yLXN0YXR1c2JhclwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgX3RoaXMuXyRzdGF0dXNiYXIuc3RhdCA9ICQoJzxzcGFuIGNsYXNzPVwiZWRpdG9yLXN0YXR1c2Jhci1zdGF0XCIgLz4nKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fJHN0YXR1c2Jhci5wYXRoID0gJCgnPHNwYW4gY2xhc3M9XCJlZGl0b3Itc3RhdHVzYmFyLXBhdGhcIiAvPicpO1xuICAgICAgICAgICAgICAgIF90aGlzLl8kc3RhdHVzYmFyLmFwcGVuZChfdGhpcy5fJHN0YXR1c2Jhci5zdGF0KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fJHN0YXR1c2Jhci5hcHBlbmQoX3RoaXMuXyRzdGF0dXNiYXIucGF0aCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50LmFmdGVyKF90aGlzLl8kc3RhdHVzYmFyKTtcblxuICAgICAgICAgICAgICAgIC8vIEhpZGUgaW5wdXQgZWRpdG9yXG4gICAgICAgICAgICAgICAgX3RoaXMuXyRlbGVtZW50LmFkZENsYXNzKCdoaWRlJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBCdWlsZCB0b29sYmFyIGJ5IGNvbmZpZ1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiAoX3RoaXMuX2NvbmZpZy50b29sYmFyKSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAkLmVhY2goX3RoaXMuX2NvbmZpZy50b29sYmFyLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW0pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICR0b29sYmFyID0gJCgnPGRpdiBpZD1cInRvb2xiYXJHcm91cC0nICsgZWxlbVswXSArICdcIiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiIC8+Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMF0gPT09ICdtb2RlJykgeyAvLyBFZGl0b3IgbW9kZSBzd2l0Y2hlclxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVkaXRvckJ1dHRvbiA9IF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ21vZGUnLCAnZWRpdG9yJywgXCJmYSBmYS1leWVcIiwgbnVsbCwgXCJFZGl0b3JcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1dHRvbiA9IF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ21vZGUnLCAnc291cmNlJywgXCJmYSBmYS1jb2RlXCIsIG51bGwsIFwiU291cmNlXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMuX2NvbmZpZy5tb2RlID09ICdlZGl0b3InKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3JCdXR0b24uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlQnV0dG9uLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChlZGl0b3JCdXR0b24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChzb3VyY2VCdXR0b24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZWxlbVswXSA9PT0gJ29wZXJhdGlvbnMnKSB7IC8vIE9wZXJhdGlvbnMgZWRpdG9yIGNvbnRyb2xzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignb3BlcmF0aW9ucycsICd1bmRvJywgXCJmYSBmYS1yZXBseVwiLCBudWxsLCBcIlVuZG9cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdvcGVyYXRpb25zJywgJ3JlbmRvJywgXCJmYSBmYS1zaGFyZVwiLCBudWxsLCBcIlJlbmRvXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignb3BlcmF0aW9ucycsICdjdXQnLCBcImZhIGZhLWN1dFwiLCBudWxsLCBcIkN1dFwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ29wZXJhdGlvbnMnLCAnY29weScsIFwiZmEgZmEtY29weVwiLCBudWxsLCBcIkNvcHlcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdvcGVyYXRpb25zJywgJ3Bhc3RlJywgXCJmYSBmYS1jbGlwYm9hcmRcIiwgbnVsbCwgXCJQYXN0ZVwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlbGVtWzBdID09PSAnc3R5bGVzJykgeyAvLyBFZGl0b3IgbW9kZSBzd2l0Y2hlclxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJEcm9wZG93bignc2VsZWN0LXN0eWxlJywgU3R5bGVzLCBcIlBhcmFncmFwaFwiLCBcIlRleHQgc3R5bGVcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZWxlbVswXSA9PT0gJ2ZvbnRzJykgeyAvLyBGb250IHNlbGVjdCBhbmQgc2l6ZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdzZWxlY3QnLCAwKSAhPT0gLTEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9udHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKF90aGlzLl9jb25maWcuZm9udEZhbWlsaWVzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRzW3ZhbHVlXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2ZvbnRuYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3R5bGUnOiBcImZvbnQtZmFtaWx5OiBcIiArIHZhbHVlICsgXCI7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyRHJvcGRvd24oJ2ZvbnQtc2VsZWN0JywgZm9udHMsIF90aGlzLl9jb25maWcuZm9udEZhbWlseURlZmF1bHQsIFwiRm9udCBmYW1pbHlcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignc2l6ZScsIDApICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2l6ZXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKF90aGlzLl9jb25maWcuZm9udFNpemVzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemVzW3ZhbHVlXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2ZvbnRzaXplJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyRHJvcGRvd24oJ2ZvbnQtc2l6ZScsIHNpemVzLCBfdGhpcy5fY29uZmlnLmZvbnRTaXplRGVmYXVsdCwgXCJGb250IHNpemVcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGVsZW1bMF0gPT09ICd0ZXh0JykgeyAvLyBUZXh0IGRlY29yYXRpb25cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignYm9sZCcsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ3RleHQnLCAnYm9sZCcsIFwiZmEgZmEtYm9sZFwiLCBudWxsLCBcIkJvbGRcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdpdGFsaWMnLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCd0ZXh0JywgJ2l0YWxpYycsIFwiZmEgZmEtaXRhbGljXCIsIG51bGwsIFwiSXRhbGljXCIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZigndW5kZXJsaW5lJywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbigndGV4dCcsICd1bmRlcmxpbmUnLCBcImZhIGZhLXVuZGVybGluZVwiLCBudWxsLCBcIlVuZGVybGluZVwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ3N0cmlrZScsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ3RleHQnLCAnc3RyaWtlJywgXCJmYSBmYS1zdHJpa2V0aHJvdWdoXCIsIG51bGwsIFwiU3RyaWtlZCB0ZXh0XCIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignc3Vic2NyaXB0JywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbigndGV4dCcsICdzdWJzY3JpcHQnLCBcImZhIGZhLXN1YnNjcmlwdFwiLCBudWxsLCBcIlN1YnNjcmlwdFwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ3N1cGVyc2NyaXB0JywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbigndGV4dCcsICdzdXBlcnNjcmlwdCcsIFwiZmEgZmEtc3VwZXJzY3JpcHRcIiwgbnVsbCwgXCJTdXBlcnNjcmlwdFwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ2JnLWNvbG9yJywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbigndGV4dCcsICdmb250LWNvbG9yJywgXCJmYSBmYS1mb250XCIsIG51bGwsIFwiRm9udCBjb2xvclwiLCBfdGhpcy5fYnVpbGRDb2xvclBhbGV0dGUoX3RoaXMuX2NvbmZpZy5jb2xvclBhbGV0dGUsIFwiZm9udC1jb2xvclwiLCBudWxsKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdiZy1jb2xvcicsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ3RleHQnLCAnYmctY29sb3InLCBcImZhIGZhLXBhaW50LWJydXNoXCIsIG51bGwsIFwiQmFja2dyb3VuZCBjb2xvclwiLCBfdGhpcy5fYnVpbGRDb2xvclBhbGV0dGUoX3RoaXMuX2NvbmZpZy5jb2xvclBhbGV0dGUsIFwiYmctY29sb3JcIiwgdHJ1ZSkpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGVsZW1bMF0gPT09ICdhbGlnbicpIHsgLy8gVGV4dCBhbGlnbWVudFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdsZWZ0JywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignYWxpZ24nLCAnbGVmdCcsIFwiZmEgZmEtYWxpZ24tbGVmdFwiLCBudWxsLCBcIkFsaWduIGxlZnRcIiwgbnVsbCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdjZW50ZXInLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdhbGlnbicsICdjZW50ZXInLCBcImZhIGZhLWFsaWduLWNlbnRlclwiLCBudWxsLCBcIkFsaWduIGNlbnRlclwiLCBudWxsKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ3JpZ2h0JywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignYWxpZ24nLCAncmlnaHQnLCBcImZhIGZhLWFsaWduLXJpZ2h0XCIsIG51bGwsIFwiQWxpZ24gcmlnaHRcIiwgbnVsbCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdqdXN0aWZ5JywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignYWxpZ24nLCAnanVzdGlmeScsIFwiZmEgZmEtYWxpZ24tanVzdGlmeVwiLCBudWxsLCBcIkp1c3RpZnkgY29udGVudFwiLCBudWxsKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlbGVtWzBdID09PSAnbGlzdHMnKSB7IC8vIExpc3RzICYmIG91dGRlbnRcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZigndW5vcmRlcmVkJywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignbGlzdHMnLCAndW5vcmRlcmVkJywgXCJmYSBmYS1saXN0LXVsXCIsIG51bGwsIFwiVW5vcmRlcmVkIGxpc3RcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdvcmRlcmVkJywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignbGlzdHMnLCAnb3JkZXJlZCcsIFwiZmEgZmEtbGlzdC1vbFwiLCBudWxsLCBcIk9yZGVyZWQgbGlzdFwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ2luZGVudCcsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2xpc3RzJywgJ2luZGVudCcsIFwiZmEgZmEtaW5kZW50XCIsIG51bGwsIFwiSW5kZW50XCIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignb3V0ZGVudCcsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2xpc3RzJywgJ291dGRlbnQnLCBcImZhIGZhLW91dGRlbnRcIiwgbnVsbCwgXCJPdXRkZW50XCIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGVsZW1bMF0gPT09ICdjb21wb25lbnRzJykgeyAvLyBDb21wb25lbnRzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ3RhYmxlJywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignY29tcG9uZW50cycsICd0YWJsZScsIFwiZmEgZmEtdGFibGVcIiwgbnVsbCwgXCJJbnNlcnQgdGFibGVcIiwgX3RoaXMuX2J1aWxkVGFibGVHcmlkKCkpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignY2hhcnQnLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdjb21wb25lbnRzJywgJ2NoYXJ0JywgXCJmYSBmYS1waWUtY2hhcnRcIiwgbnVsbCwgXCJBZGQgY2hhcnRcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZWxlbVswXSA9PT0gJ2ludGVydmFscycpIHsgLy8gVGV4dCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ2xpbmUtaGVpZ2h0JywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignaW50ZXJ2YWwnLCAnbGluZS1oZWlnaHQnLCBcImZhIGZhLXRleHQtaGVpZ2h0XCIsIG51bGwsIFwiTGluZXMgaW50ZXJ2YWxcIiwgX3RoaXMuX2J1aWxkTGluZUhlaWdodExpc3QoKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdsZXR0ZXItc3BhY2luZycsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2ludGVydmFsJywgJ2xldHRlci1zcGFjaW5nJywgXCJmYSBmYS10ZXh0LXdpZHRoXCIsIG51bGwsIFwiTGV0dGVyIHNwYWNpbmdcIiwgX3RoaXMuX2J1aWxkTGV0dGVyU3BhY2luZ0xpc3QoKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZWxlbVswXSA9PT0gJ2luc2VydCcpIHsgLy8gSW5zZXJ0c1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdlbW9qaScsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2luc2VydCcsICdlbW9qaScsIFwiZmEgZmEtc21pbGUgZmEtc21pbGUtb1wiLCBudWxsLCBcIkFkZCBlbW9qaVwiLCBfdGhpcy5fYnVpbGRFbW9qaUxpc3QoKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdsaW5rJywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignaW5zZXJ0JywgJ2xpbmsnLCBcImZhIGZhLWxpbmtcIiwgbnVsbCwgXCJBZGQgVVJMXCIsIF90aGlzLl9idWlsZFVybEZvcm0oJ2xpbmsnKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdpbWFnZScsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2luc2VydCcsICdpbWFnZScsIFwiZmEgZmEtaW1hZ2VcIiwgbnVsbCwgXCJBZGQgaW1hZ2VcIiwgX3RoaXMuX2J1aWxkVXJsRm9ybSgnaW1hZ2UnKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCd2aWRlbycsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2luc2VydCcsICd2aWRlbycsIFwiZmEgZmEtdmlkZW8tY2FtZXJhIGZhLXZpZGVvXCIsIG51bGwsIFwiQWRkIHZpZGVvXCIsIF90aGlzLl9idWlsZFVybEZvcm0oJ3ZpZGVvJykpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignc3ltYm9sJywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignaW5zZXJ0JywgJ3N5bWJvbCcsIFwiZmEgZmEtaGFzaHRhZ1wiLCBudWxsLCBcIkFkZCBzeW1ib2xcIiwgX3RoaXMuX2J1aWxkU3ltYm9sc0xpc3QoKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdib29rbWFyaycsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2luc2VydCcsICdib29rbWFyaycsIFwiZmEgZmEtYm9va21hcmtcIiwgbnVsbCwgXCJBZGQgYm9va21hcmtcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZWxlbVswXSA9PT0gJ3NwZWNpYWwnKSB7IC8vIEluc2VydHNcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZigncHJpbnQnLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdzcGVjaWFsJywgJ3ByaW50JywgXCJmYSBmYS1wcmludFwiLCBudWxsLCBcIlByaW50XCIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignY2xlYW4nLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdzcGVjaWFsJywgJ2NsZWFuJywgXCJmYSBmYS1lcmFzZXJcIiwgbnVsbCwgXCJFcmFzZSBzdHlsZVwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ3Zpc3VhbCcsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ3NwZWNpYWwnLCAndmlzdWFsJywgXCJmYSBmYS1zb2xhci1wYW5lbFwiLCBudWxsLCBcIlZpc3VhbCBibG9ja3NcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCd1bmZvcm1hdCcsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ3NwZWNpYWwnLCAndW5mb3JtYXQnLCBcImZhIGZhLXRyYXNoLW8gZmEtdHJhc2gtYWx0XCIsIG51bGwsIFwiQ2xlYXIgSFRNTFwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlbGVtWzBdID09PSAnZnVsbHNjcmVlbicpIHsgLy8gRnVsbHNjcmVlbiBtb2RlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hZGRDbGFzcygncHVsbC1yaWdodCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdmdWxsc2NyZWVuJywgdHJ1ZSwgXCJmYSBmYS1hcnJvd3MtYWx0XCIsIG51bGwsIFwiRnVsbHNjcmVlbiBtb2RlXCIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuYXBwZW5kKCR0b29sYmFyKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBTZXQgYmVoYXZpb3IgZm9yIHRvb2xiYXIgYnV0dG9uc1xuICAgICAgICAgICAgICAgIGlmKF90aGlzLl8kdG9vbGJhci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLm9uKCdjbGljaycsICdbZGF0YS1hY3Rpb25dJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IF90aGlzLl9zZWxlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSAkdGFyZ2V0LmRhdGEoJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9ICR0YXJnZXQuZGF0YSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChhY3Rpb24pICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgKHZhbHVlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY29uZmlnLmRlYnVnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3dpdGNoIGFjdGlvbjogYCcgKyBhY3Rpb24gKyAnYCB3aXRoIHZhbHVlOiBgJyArIHZhbHVlICsgJ2AnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW9kZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZWRpdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9jb25maWcubW9kZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9jb25maWcubW9kZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50Lmh0bWwoX3RoaXMuX3NvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwibW9kZVwiXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJtb2RlXCJdW2RhdGEtdmFsdWU9XCJlZGl0b3JcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJGNvbnRlbnQuYWRkQ2xhc3MoJ2VkaXRvci1tb2RlJykucmVtb3ZlQ2xhc3MoJ3NvdXJjZS1tb2RlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJGNvbnRlbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCcuYnRuLWdyb3VwJykucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzb3VyY2UnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCcuYnRuLWdyb3VwJykubm90KCcjdG9vbGJhckdyb3VwLScgKyBhY3Rpb24pLmFkZENsYXNzKCdoaWRlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9jb25maWcubW9kZSAhPT0gdmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2NvbmZpZy5tb2RlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc291cmNlID0gX3RoaXMuXyRjb250ZW50Lmh0bWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRzb3VyY2UgPSAkKCc8cHJlIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc291cmNlLnRleHQoX3RoaXMuX3NvdXJjZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kY29udGVudC5odG1sKF90aGlzLl90cmltU291cmNlKCRzb3VyY2UuaHRtbCgpKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY29uZmlnLmhpZ2hsaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhsanMuaW5pdEhpZ2hsaWdodGluZy5jYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobGpzLmNvbmZpZ3VyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZUJSOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZXM6IFsnaHRtbCcsICdqYXZhc2NyaXB0JywgJ2NzcyddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxqcy5oaWdobGlnaHRCbG9jayhfdGhpcy5fJGNvbnRlbnQuZ2V0KDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cIm1vZGVcIl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwibW9kZVwiXVtkYXRhLXZhbHVlPVwic291cmNlXCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJGNvbnRlbnQucmVtb3ZlQ2xhc3MoJ2VkaXRvci1tb2RlJykuYWRkQ2xhc3MoJ3NvdXJjZS1tb2RlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJGNvbnRlbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Zvcm1hdGJsb2NrJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ2Zvcm1hdGJsb2NrJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZm9udG5hbWUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygnZm9udG5hbWUnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdmb250c2l6ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJzaXplXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3NlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0eWxlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdHlsZXMgPSBfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5zdHlsZS5jc3NUZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzdHlsZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzICs9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlcyA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9zZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50LnN0eWxlID0gc3R5bGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZnVsbHNjcmVlbic6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY29uZmlnLmRlYnVnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGaXJlIGFjdGlvbjogJyArIGFjdGlvbiArICcgd2l0aCB2YWx1ZTogJyArIHZhbHVlICsgJyBpcyBub3Qgc3VwcG9ydGVkLicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvcGVyYXRpb25zJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd1bmRvJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygndW5kbycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbmRvJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygncmVuZG8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3V0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygnY3V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29weSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ2NvcHknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwYXN0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ3Bhc3RlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm9sZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ2JvbGQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpdGFsaWMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdpdGFsaWMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd1bmRlcmxpbmUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCd1bmRlcmxpbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpa2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdzdHJpa2VUaHJvdWdoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3Vic2NyaXB0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygnc3Vic2NyaXB0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3VwZXJzY3JpcHQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdzdXBlcnNjcmlwdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZm9udC1jb2xvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PSAndW5zZXQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9zZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5zdHlsZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9zZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJ0ZXh0XCJdW2RhdGEtdmFsdWU9XCJmb250LWNvbG9yXCJdID4gc3BhbicpLmNzcygnYm9yZGVyLWJvdHRvbS1jb2xvcicsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdmb3JlQ29sb3InLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdiZy1jb2xvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PSAndW5zZXQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9zZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5zdHlsZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9zZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJ0ZXh0XCJdW2RhdGEtdmFsdWU9XCJiZy1jb2xvclwiXSA+IHNwYW4nKS5jc3MoJ2JvcmRlci1ib3R0b20tY29sb3InLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygnaGlsaXRlQ29sb3InLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhbGlnbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ2p1c3RpZnlMZWZ0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygnanVzdGlmeUNlbnRlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygnanVzdGlmeVJpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnanVzdGlmeSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ2p1c3RpZnlGdWxsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdsaXN0cyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndW5vcmRlcmVkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygnaW5zZXJ0VW5vcmRlcmVkTGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29yZGVyZWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdpbnNlcnRPcmRlcmVkTGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2luZGVudCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ2luZGVudCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ291dGRlbnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdvdXRkZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaW5zZXJ0LXRhYmxlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKF90aGlzLl9zZWxlY3Rpb24uYW5jaG9yTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gdmFsdWUuc3BsaXQoJ3wnLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHBhcmVudCA9ICQoX3RoaXMuX3NlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gX3RoaXMuX2dlbmVyYXRlVGFibGUocGFyc2VGbG9hdChvcHRpb25zWzBdKSwgcGFyc2VGbG9hdChvcHRpb25zWzJdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZnRlcihjb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvbXBvbmVudHMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2hhcnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2NvbmZpZy5kZWJ1ZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGaXJlIGFjdGlvbjogJyArIGFjdGlvbiArICcgd2l0aCB2YWx1ZTogJyArIHZhbHVlICsgJyBpcyBub3Qgc3VwcG9ydGVkLicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGluZS1oZWlnaHQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMuX3NlbGVjdGlvbi5hbmNob3JOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmVIZWlnaHQgPSBwYXJzZUZsb2F0KHZhbHVlKSAqIDEwMCArIFwiJVwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRmxvYXQodmFsdWUpID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9zZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50LnN0eWxlLmxpbmVIZWlnaHQgPSBcImluaGVyaXRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9zZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50LnN0eWxlLmxpbmVIZWlnaHQgPSBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGV0dGVyLXNwYWNpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMuX3NlbGVjdGlvbi5hbmNob3JOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxldHRlclNwYWNpbmcgPSBwYXJzZUZsb2F0KHZhbHVlKSArIFwicHhcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUZsb2F0KHZhbHVlKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gXCJpbmhlcml0XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gbGV0dGVyU3BhY2luZztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYWRkLXVybCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IF90aGlzLl9zZWxlY3Rpb24udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKF90aGlzLl9zZWxlY3Rpb24gJiYgdGV4dCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc2NoZW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnNjaGVtZSA9PSAnaHR0cHMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8vJyArIHVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS5zY2hlbWUgPT0gJ2h0dHAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHA6Ly8nICsgdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLnNjaGVtZSA9PSAnbWFpbHRvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdtYWlsdG86Ly8nICsgdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLnNjaGVtZSA9PSAnZnRwJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdmdHA6Ly8nICsgdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLnNjaGVtZSA9PSAnZmVlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnZmVlZDovLycgKyB1cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEuc2NoZW1lID09ICduZXdzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICduZXdzOi8vJyArIHVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS5zY2hlbWUgPT0gJ3RlbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAndGVsOicgKyB1cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEuc2NoZW1lID09ICdza3lwZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnc2t5cGU6JyArIHVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS5zY2hlbWUgPT0gJ3RnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICd0ZzovLycgKyB1cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEuc2NoZW1lID09ICd3aGF0c2FwcCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnd2hhdHNhcHA6JyArIHVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS5zY2hlbWUgPT0gJ3ZpYmVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICd2aWJlcjonICsgdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlID0gJyB0aXRsZT1cIicgKyBkYXRhLnRpdGxlICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuY2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJyBjbGFzcz1cIicgKyBkYXRhLmNsYXNzICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnRhcmdldCA9PSAnYmxhbmsnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gJyB0YXJnZXQ9XCJfYmxhbmtcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudGFyZ2V0ID09ICd0b3AnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gJyB0YXJnZXQ9XCJfdG9wXCInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLnRhcmdldCA9PSAnc2VsZicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSAnIHRhcmdldD1cIl9zZWxmXCInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLnRhcmdldCA9PSAncGFyZW50JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9ICcgdGFyZ2V0PVwiX3BhcmVudFwiJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVsID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEucmVsYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEucmVsYXRpb24gPT0gJ25vZm9sbG93JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbCA9ICcgcmVsPVwibm9mb2xsb3dcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEucmVsYXRpb24gPT0gJ25vcmVmZXJyZXInKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsID0gJyByZWw9XCJub3JlZmVycmVyXCInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkbGluayA9ICQoJzxhIGhyZWY9XCInICsgdXJsICsgJ1wiJyArIHRpdGxlICsgY2xhc3NOYW1lICsgdGFyZ2V0ICsgcmVsICsgJyAvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsaW5rLnRleHQodGV4dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSBfdGhpcy5fc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5pbnNlcnROb2RlKCRsaW5rLmdldCgwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhZGQtdmlkZW8nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMuX3NlbGVjdGlvbiAmJiB2YWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnNlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc2VydmljZSA9PSAneW91dHViZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWRlb0lkID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWdFeHAgPSAvXi4qKHlvdXR1YmVcXC98eW91dHUuYmVcXC98dlxcL3x1XFwvXFx3XFwvfGVtYmVkXFwvfHdhdGNoXFw/dj18XFwmdj0pKFteI1xcJlxcP10qKS4qLztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHVybC5tYXRjaChyZWdFeHApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggIT09IG51bGwgJiYgbWF0Y2hbMl0ubGVuZ3RoID09IDExKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSWQgPSBtYXRjaFsyXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZpZGVvSWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycgKyB2aWRlb0lkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5zZXJ2aWNlID09ICd2aW1lbycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWRlb0lkID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWdFeHAgPSAvKD86d3d3XFwufHBsYXllclxcLik/dmltZW8uY29tXFwvKD86Y2hhbm5lbHNcXC8oPzpcXHcrXFwvKT98Z3JvdXBzXFwvKD86W15cXC9dKilcXC92aWRlb3NcXC98YWxidW1cXC8oPzpcXGQrKVxcL3ZpZGVvXFwvfHZpZGVvXFwvfCkoXFxkKykoPzpbYS16QS1aMC05X1xcLV0rKT8vaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHVybC5tYXRjaChyZWdFeHApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggIT09IG51bGwgJiYgbWF0Y2hbMV0ubGVuZ3RoID09IDkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9JZCA9IG1hdGNoWzFdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlkZW9JZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLycgKyBtYXRjaFsxXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuc2VydmljZSA9PSAnZGFpbHltb3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlkZW9JZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVnRXhwID0gL14uK2RhaWx5bW90aW9uLmNvbVxcLyh2aWRlb3xodWIpXFwvKFteX10rKVteI10qKCN2aWRlbz0oW15fJl0rKSk/LztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHVybC5tYXRjaChyZWdFeHApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hbNF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0lkID0gbWF0Y2hbNF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSWQgPSBtYXRjaFsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZpZGVvSWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8vd3d3LmRhaWx5bW90aW9uLmNvbS9lbWJlZC92aWRlby8nICsgdmlkZW9JZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbWJlZCA9ICQoJzxkaXYgY2xhc3M9XCJlbWJlZC1yZXNwb25zaXZlIGVtYmVkLXJlc3BvbnNpdmUtMTZieTlcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpZnJhbWUgY2xhc3M9XCJlbWJlZC1yZXNwb25zaXZlLWl0ZW1cIiBzcmM9XCInICsgdXJsICsgJ1wiPjwvaWZyYW1lPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSBfdGhpcy5fc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5pbnNlcnROb2RlKCRlbWJlZC5nZXQoMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYWRkLWltYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKF90aGlzLl9zZWxlY3Rpb24gJiYgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGltYWdlID0gJCgnPGltZyBzcmM9XCInICsgdmFsdWUgKyAnXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSBfdGhpcy5fc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5pbnNlcnROb2RlKCRpbWFnZS5nZXQoMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaW5zZXJ0LWh0bWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygnaW5zZXJ0SFRNTCcsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NwZWNpYWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3ByaW50JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3ByaW50RG9jKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdyZW1vdmVGb3JtYXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd2aXN1YWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuXyRjb250ZW50Lmhhc0NsYXNzKCd2aXN1YWwnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cInNwZWNpYWxcIl1bZGF0YS12YWx1ZT1cInZpc3VhbFwiXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kY29udGVudC5yZW1vdmVDbGFzcygndmlzdWFsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJGNvbnRlbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJzcGVjaWFsXCJdW2RhdGEtdmFsdWU9XCJ2aXN1YWxcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJGNvbnRlbnQuYWRkQ2xhc3MoJ3Zpc3VhbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd1bmZvcm1hdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ3NlbGVjdEFsbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdyZW1vdmVGb3JtYXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0cmluZyA9IF90aGlzLl8kY29udGVudC5odG1sKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyA9IF90aGlzLl9zdHJpcFRhZ3Moc3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhcXHJcXG58XFxufFxccikvZywgJzwhLS0gYnIgLS0+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC88IS0tIGJyIC0tPi9nLCAnPGJyLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50Lmh0bWwoc3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9jb25maWcuZGVidWcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdVbnJlY29nbml6ZWQgYWN0aW9uOiAnICsgYWN0aW9uICsgJyB3aXRoIHZhbHVlOiAnICsgdmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBPbiBzZWxlY3RlZCBjb250ZW50XG4gICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50Lm9uKCdtb3VzZXVwIGNsaWNrIGZvY3VzJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX3BvcG92ZXJJc1Zpc2libGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5faGlkZUFsbFBvcG92ZXJzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC50eXBlICE9PSBcInRleHRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9zZWxlY3Rpb24gPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX3NlbGVjdGlvbi5nZXRSYW5nZUF0ICYmIF90aGlzLl9zZWxlY3Rpb24ucmFuZ2VDb3VudCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX3NlbGVjdGlvbi5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKF90aGlzLl9zZWxlY3Rpb24ucGFyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3VwZGF0ZVN0YXRlKCR0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfdGhpcy5fc2VsZWN0aW9uLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHRhcmdldCA9ICQoX3RoaXMuX3NlbGVjdGlvbi5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdXBkYXRlU3RhdGUoJHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2NvbmZpZy5kZWJ1ZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDdXJyZW50IHNlbGVjdGlvbjogJywgX3RoaXMuX3NlbGVjdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl91cGRhdGVTdGF0ZSgkdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBPbiBjbGljayBvciBrZXlkb3duIGZyb20gY29udGVudCBhcmVhXG4gICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50Lm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihfdGhpcy5fcG9wb3ZlcklzVmlzaWJsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9oaWRlQWxsUG9wb3ZlcnMoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihldmVudC50YXJnZXQudHlwZSAhPT0gXCJ0ZXh0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9zZWxlY3Rpb24uZ2V0UmFuZ2VBdCAmJiBfdGhpcy5fc2VsZWN0aW9uLnJhbmdlQ291bnQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9zZWxlY3Rpb24ucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJChfdGhpcy5fc2VsZWN0aW9uLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl91cGRhdGVTdGF0ZSgkdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX3RoaXMuX3NlbGVjdGlvbi5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKF90aGlzLl9zZWxlY3Rpb24ucGFyZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3VwZGF0ZVN0YXRlKCR0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl91cGRhdGVTdGF0ZSgkdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9jb25maWcuZGVidWcpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnS2V5ZG93biBmaXJlZDogJyArIGV2ZW50LmtleUNvZGUpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBPbiBjb250ZW50IGNoYW5nZVxuICAgICAgICAgICAgICAgIF90aGlzLl8kY29udGVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9jb25maWcubW9kZSA9PSAnZWRpdG9yJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc291cmNlID0gJHRoaXMuaHRtbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9zb3VyY2UgPSAkdGhpcy50ZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKF90aGlzLl8kZWxlbWVudCkuaXMoXCJ0ZXh0YXJlYVwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJGVsZW1lbnQuaHRtbChfdGhpcy5fc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJGVsZW1lbnQudmFsKF90aGlzLl9zb3VyY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2NvbmZpZy5kZWJ1ZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29udGVudCBjaGFuZ2UuLi4nKTtcblxuICAgICAgICAgICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gT24gY29udGVudCBsb3N0IGZvY3VzXG4gICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50Lm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyRsYXN0Rm9jdXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY29uZmlnLmRlYnVnKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvbnRlbnQgbG9zdCBmb2N1czogJywgX3RoaXMuX3NlbGVjdGlvbik7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIFNldCBmb2N1cyBvbiBjb250ZW50XG4gICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50LmZvY3VzKCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2NyZWF0ZUNsYXNzKEVkaXRvciwge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGVsZW1lbnQoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLl8kZWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX3JlcGxhY2VBbGw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlcGxhY2VBbGwoc2VhcmNoLCByZXBsYWNlLCBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuc3BsaXQoc2VhcmNoKS5qb2luKHJlcGxhY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfc3RyaXBUYWdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzdHJpcFRhZ3Moc3RyaW5nLCB0YWdzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXksIGFsbG93ZWRfdGFncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dlZF90YWdzID0gdGFncy5tYXRjaCgvKFthLXpBLVpdKykvZ2kpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChzdHJpbmcpICE9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmcudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSBzdHJpbmcubWF0Y2goLyg8XFwvP1tcXFNdW14+XSo+KS9naSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIG1hdGNoZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc05hTihrZXkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBodG1sID0gbWF0Y2hlc1trZXldLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFsbG93ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIGFsbG93ZWRfdGFncykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YWcgPSBhbGxvd2VkX3RhZ3Nba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBodG1sLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignPCcrIHRhZyArJz4nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGh0bWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKCc8JysgdGFnICsnICcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICE9IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gaHRtbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJzwvJysgdGFnICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhbGxvd2VkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgPSB0aGlzLl9yZXBsYWNlQWxsKGh0bWwsIFwiXCIsIHN0cmluZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX3RyaW1Tb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRyaW1Tb3VyY2Uoc3RyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFxzezQsfS9nLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXHQvZywgJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ci50b1N0cmluZygpLnRyaW0oKS5yZXBsYWNlKC8oXFxyXFxufFxcbnxcXHIpL2csXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfZ2V0UGF0aDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UGF0aChub2RlLCB1bnRpbCwgd2l0aE5vZGVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoLCB0YWdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAobm9kZS5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlWzBdLmlzRXF1YWxOb2RlKHVudGlsWzBdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVhbE5vZGUgPSBub2RlWzBdLCBuYW1lID0gcmVhbE5vZGUubG9jYWxOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudHNVbnRpbCh1bnRpbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aXRoTm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNhbWVUYWdTaWJsaW5ncyA9IHBhcmVudC5jaGlsZHJlbihuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNhbWVUYWdTaWJsaW5ncy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWxsU2libGluZ3MgPSBwYXJlbnQuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGFsbFNpYmxpbmdzLmluZGV4KHJlYWxOb2RlKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSArPSAnOm50aC1jaGlsZCgnICsgaW5kZXggKyAnKSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdzLnB1c2gobmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSAkKHJlYWxOb2RlKS5hdHRyKFwiaWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lICs9IFwiI1wiICsgaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xhc3NuYW1lID0gJChyZWFsTm9kZSkuYXR0cihcImNsYXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc25hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgKz0gXCIuXCIgKyBjbGFzc25hbWUucmVwbGFjZSgvXFwuL2csICcuJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoID0gbmFtZSArIChwYXRoID8gJyA+ICcgKyBwYXRoIDogJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBwYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdzOiB0YWdzXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfZ2V0VGV4dFN0YXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFRleHRTdGF0KGVsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3b3JkcyA9IDAsIGxlbmd0aCA9IDAsIGNoYXJzID0gMCwgbm9ybWFsaXplZFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ29udGVudEVkaXRhYmxlID0gZWwgJiYgZWwuY29udGVudEVkaXRhYmxlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb250ZW50RWRpdGFibGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplZFZhbHVlID0gZWwuaW5uZXJUZXh0LnJlcGxhY2UoL1xcclxcbi9nLCBcIlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVkVmFsdWUgPSBlbC52YWx1ZS5yZXBsYWNlKC9cXHJcXG4vZywgXCJcXG5cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmRzID0gdGhpcy5fc3RyaXBUYWdzKG5vcm1hbGl6ZWRWYWx1ZSkuc3BsaXQoJyAnKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBub3JtYWxpemVkVmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnMgPSB0aGlzLl90cmltU291cmNlKG5vcm1hbGl6ZWRWYWx1ZS5yZXBsYWNlKC9cXHMvZywgXCJcIikpLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3Jkczogd29yZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBsZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnM6IGNoYXJzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9nZXRUZXh0UG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEN1cnNvclBvc2l0aW9uKGVsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0gMCwgc3RhcnQgPSAwLCBlbmQgPSAwLCBzZWxlY3RlZCA9IDAsIG5vcm1hbGl6ZWRWYWx1ZSwgcmFuZ2UsIHRleHRJbnB1dFJhbmdlLCBsZW4sIGVuZFJhbmdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ29udGVudEVkaXRhYmxlID0gZWwgJiYgZWwuY29udGVudEVkaXRhYmxlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJzZWxlY3Rpb25TdGFydFwiIGluIGVsICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT0gZWwpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gZWwuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gZWwuc2VsZWN0aW9uRW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRWYWx1ZSA9IGVsLnZhbHVlLnJlcGxhY2UoL1xcclxcbi9nLCBcIlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lID0gbm9ybWFsaXplZFZhbHVlLnN1YnN0cigwLCBlbC5zZWxlY3Rpb25TdGFydCkuc3BsaXQoXCJcXG5cIikubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQ29udGVudEVkaXRhYmxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5nZXRSYW5nZUF0KDApLnN0YXJ0T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5nZXRSYW5nZUF0KDApLmVuZE9mZnNldDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRWYWx1ZSA9IGVsLmlubmVyVGV4dC5yZXBsYWNlKC9cXHJcXG4vZywgXCJcXG5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSA9IChub3JtYWxpemVkVmFsdWUuc3Vic3RyKDAsIGVsLnNlbGVjdGlvblN0YXJ0KS5zcGxpdChcIlxcblwiKS5sZW5ndGggLSAxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxpbmUgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuX3NlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlICYmIHJhbmdlLnBhcmVudEVsZW1lbnQoKSA9PSBlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSBlbC52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRWYWx1ZSA9IGVsLnZhbHVlLnJlcGxhY2UoL1xcclxcbi9nLCBcIlxcblwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSB3b3JraW5nIFRleHRSYW5nZSB0aGF0IGxpdmVzIG9ubHkgaW4gdGhlIGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRJbnB1dFJhbmdlID0gZWwuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRJbnB1dFJhbmdlLm1vdmVUb0Jvb2ttYXJrKHJhbmdlLmdldEJvb2ttYXJrKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBzdGFydCBhbmQgZW5kIG9mIHRoZSBzZWxlY3Rpb24gYXJlIGF0IHRoZSB2ZXJ5IGVuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvZiB0aGUgaW5wdXQsIHNpbmNlIG1vdmVTdGFydC9tb3ZlRW5kIGRvZXNuJ3QgcmV0dXJuIHdoYXQgd2Ugd2FudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aG9zZSBjYXNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRSYW5nZSA9IGVsLmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRSYW5nZS5jb2xsYXBzZShmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRJbnB1dFJhbmdlLmNvbXBhcmVFbmRQb2ludHMoXCJTdGFydFRvRW5kXCIsIGVuZFJhbmdlKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IGVuZCA9IGxlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gLXRleHRJbnB1dFJhbmdlLm1vdmVTdGFydChcImNoYXJhY3RlclwiLCAtbGVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ICs9IG5vcm1hbGl6ZWRWYWx1ZS5zbGljZSgwLCBzdGFydCkuc3BsaXQoXCJcXG5cIikubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRJbnB1dFJhbmdlLmNvbXBhcmVFbmRQb2ludHMoXCJFbmRUb0VuZFwiLCBlbmRSYW5nZSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IGxlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gLXRleHRJbnB1dFJhbmdlLm1vdmVFbmQoXCJjaGFyYWN0ZXJcIiwgLWxlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kICs9IG5vcm1hbGl6ZWRWYWx1ZS5zbGljZSgwLCBlbmQpLnNwbGl0KFwiXFxuXCIpLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gKHRoaXMuX3NlbGVjdGlvbi50b1N0cmluZygpKS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBlbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9mb3JtYXREb2M6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGZvcm1hdERvYyhjb21tYW5kLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoY29tbWFuZCwgZmFsc2UsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuXyRjb250ZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9wcmludERvYzoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcHJpbnREb2MoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJpbnQgPSB3aW5kb3cub3BlbihcIlwiLFwiX2JsYW5rXCIsXCJ3aWR0aD00NTAsaGVpZ2h0PTQ3MCxsZWZ0PTQwMCx0b3A9MTAwLG1lbnViYXI9eWVzLHRvb2xiYXI9bm8sbG9jYXRpb249bm8sc2Nyb2xsYmFycz15ZXNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmludC5kb2N1bWVudC5vcGVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmludC5kb2N1bWVudC53cml0ZShcIjwhZG9jdHlwZSBodG1sPjxodG1sPjxoZWFkPjx0aXRsZT5QcmludDxcXC90aXRsZT48XFwvaGVhZD48Ym9keSBvbmxvYWQ9XFxcInByaW50KCk7XFxcIj5cIiArIHRoaXMuXyRjb250ZW50LmdldCgwKS5pbm5lckhUTUwgKyBcIjxcXC9ib2R5PjxcXC9odG1sPlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50LmRvY3VtZW50LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9oaWRlQWxsUG9wb3ZlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhpZGVBbGxQb3BvdmVycygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuXyR0b29sYmFyLmZpbmQoJy5wb3BvdmVyJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBvcG92ZXIoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9wb3ZlcklzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfZGV0ZWN0TGFuZ3VhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRldGVjdExhbmd1YWdlKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFuZ3VhZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hdmlnYXRvci5sYW5ndWFnZXMgJiYgbmF2aWdhdG9yLmxhbmd1YWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZSA9IG5hdmlnYXRvci5sYW5ndWFnZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlID0gbmF2aWdhdG9yLnVzZXJMYW5ndWFnZSB8fCBuYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLmJyb3dzZXJMYW5ndWFnZSB8fCAnZW4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfdHJhbnNsYXRlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB0cmFuc2xhdGUoc3RyaW5nKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFuZ3VhZ2UgPSBfdGhpcy5fY29uZmlnLmxhbmd1YWdlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChsYW5ndWFnZSkgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2UgPSBfdGhpcy5fZGV0ZWN0TGFuZ3VhZ2UoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9jb25maWcudHJhbnNsYXRpb25zLmhhc093blByb3BlcnR5KGxhbmd1YWdlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY29uZmlnLnRyYW5zbGF0aW9uc1tsYW5ndWFnZV1bc3RyaW5nLnRvU3RyaW5nKCldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyA9IF90aGlzLl9jb25maWcudHJhbnNsYXRpb25zW2xhbmd1YWdlXVtzdHJpbmcudG9TdHJpbmcoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9idWlsZFRvbGxiYXJCdXR0b246IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJ1aWxkVG9sbGJhckJ1dHRvbihhY3Rpb24sIHZhbHVlLCBpY29uLCBob3RrZXksIHRvb2x0aXAsIGNvbnRlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSBfdGhpcy5fc2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRidXR0b24gPSAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHRhYmluZGV4PVwiLTFcIiAvPicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRidXR0b24uYXR0cignZGF0YS1hY3Rpb24nLCBhY3Rpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ1dHRvbi5hdHRyKCdkYXRhLXZhbHVlJywgdmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaG90a2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRidXR0b24uYXR0cignZGF0YS1ob3RrZXknLCBob3RrZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9vbHRpcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRidXR0b24udG9vbHRpcCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogJ2JvZHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX3RoaXMuX3RyYW5zbGF0ZSh0b29sdGlwLnRvU3RyaW5nKCkudHJpbSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRidXR0b24ucG9wb3Zlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6ICdtYW51YWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3cG9ydDogJ2JvZHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoY29udGVudCkgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLm9uKCdzaG93bi5icy5wb3BvdmVyJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9wb3ZlcklkID0gJChldmVudC50YXJnZXQpLmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRwb3BvdmVyID0gX3RoaXMuXyR0b29sYmFyLmZpbmQoJyMnK3BvcG92ZXJJZCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gX3RoaXMuX3NlbGVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGVjdGlvbiAmJiByYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBvcG92ZXIuZmluZCgnaW5wdXQnKS5vbignYmx1cicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC50eXBlID09IFwidGV4dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fJGxhc3RGb2N1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJGxhc3RGb2N1cy5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9zZWxlY3RUZXh0KHNlbGVjdGlvbiwgcmFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBvcG92ZXIub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY29uZmlnLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BvcG92ZXIgZXZlbnQgdGFyZ2V0IHR5cGU6ICcgKyBldmVudC50YXJnZXQudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BvcG92ZXIgZXZlbnQgdGFyZ2V0IHRhZzogJyArIGV2ZW50LnRhcmdldC50YWdOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoZXZlbnQudGFyZ2V0LnR5cGUpICYmICEoZXZlbnQudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSAnYScpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5nZXQoMCkuaGFzQXR0cmlidXRlKCdkYXRhLWFjdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBvcG92ZXIucG9wb3ZlcignaGlkZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkcG9wb3Zlci5maW5kKCcudGFibGUtZ3JpZCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBvcG92ZXIuZmluZCgnLnRhYmxlLWdyaWQgdHIgPiB0ZCcpLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wcmV2QWxsKCkuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wcmV2QWxsKCkuZmluZCgndGQ6bHQoJysgKCQodGhpcykuaW5kZXgoKSArIDEpICsgJyknKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wcmV2QWxsKCkucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wcmV2QWxsKCkuZmluZCgndGQ6bHQoJysgKCQodGhpcykuaW5kZXgoKSArIDEpICsgJyknKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY29uZmlnLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRWxlbWVudCBldmVudCB0YXJnZXQgdHlwZTogJyArIGV2ZW50LnRhcmdldC50eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFbGVtZW50IGV2ZW50IHRhcmdldCB0YWc6ICcgKyBldmVudC50YXJnZXQudGFnTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfdGhpcy5fcG9wb3ZlcklzVmlzaWJsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9oaWRlQWxsUG9wb3ZlcnMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnV0dG9uLnBvcG92ZXIoJ3Nob3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3BvcG92ZXJJc1Zpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRidXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2hpZGVBbGxQb3BvdmVycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWNvbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnV0dG9uLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCInICsgaWNvbiArICdcIiAvPicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGJ1dHRvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2J1aWxkVG9sbGJhckRyb3Bkb3duOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidWlsZFRvbGxiYXJEcm9wZG93bihhY3Rpb24sIGxpc3QsIGxhYmVsLCB0b29sdGlwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZHJvcGRvd24gPSAkKCc8ZGl2IGNsYXNzPVwiZHJvcGRvd25cIiAvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRkcm9wZG93bkJ0biA9ICQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiAvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRkcm9wZG93bk1lbnUgPSAkKCc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZHJvcGRvd25JdGVtID0gJCgnPGxpIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGRyb3Bkb3duTGluayA9ICQoJzxhIGhyZWY9XCIjXCIgdGFiaW5kZXg9XCItMVwiIC8+Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGxpc3QpID09IFwib2JqZWN0XCIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChsaXN0LCBmdW5jdGlvbihpbmRleCwgZWxlbSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkbGluayA9ICRkcm9wZG93bkxpbmsuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpdGVtID0gJGRyb3Bkb3duSXRlbS5jbG9uZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGVsZW0pID09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtWydhY3Rpb24nXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbGluay5hdHRyKCdkYXRhLWFjdGlvbicsIGVsZW1bJ2FjdGlvbiddKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1bJ3ZhbHVlJ10pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxpbmsuYXR0cignZGF0YS12YWx1ZScsIGVsZW1bJ3ZhbHVlJ10pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbVsnd3JhcCddKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsaW5rLmh0bWwoJChlbGVtWyd3cmFwJ10pLnRleHQoaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbGluay50ZXh0KGluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1bJ3N0eWxlJ10pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxpbmsuYXR0cignc3R5bGUnLCBlbGVtWydzdHlsZSddLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleCA9PSBsYWJlbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaXRlbS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtLmFwcGVuZCgkbGluayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25NZW51LmFwcGVuZCgkaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxpbmsudGV4dChlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsaW5rLmF0dHIoJ2RhdGEtYWN0aW9uJywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsaW5rLmF0dHIoJ2RhdGEtdmFsdWUnLCBlbGVtKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbSA9PSBsYWJlbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaXRlbS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtLmFwcGVuZCgkbGluayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25NZW51LmFwcGVuZCgkaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbGluay5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duQnRuLnRleHQobGFiZWwgKyAnICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkJ0bi50ZXh0KCdEcm9wZG93biAnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duQnRuLmFwcGVuZCgnPGIgY2xhc3M9XCJjYXJldFwiIC8+Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b29sdGlwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duQnRuLnRvb2x0aXAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5fdHJhbnNsYXRlKHRvb2x0aXAudG9TdHJpbmcoKS50cmltKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5hcHBlbmQoJGRyb3Bkb3duQnRuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5hcHBlbmQoJGRyb3Bkb3duTWVudSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGRyb3Bkb3duO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfYnVpbGRDb2xvclBhbGV0dGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJ1aWxkQ29sb3JQYWxldHRlKHBhbGV0dGUsIGFjdGlvbiwgcmVzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gocGFsZXR0ZSwgZnVuY3Rpb24gKG91dGVyLCBjb2xvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8dGFibGUgY2xhc3M9XCJjb2xvci1wYWxldHRlXCI+PHRyPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGNvbG9ycywgZnVuY3Rpb24gKGlubmVyLCBjb2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8dGQ+PGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cIicgKyBhY3Rpb24gKyAnXCIgZGF0YS12YWx1ZT1cIicgKyBjb2xvciArICdcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICcgKyBjb2xvciArICdcIj4mbmJzcDs8L2E+PC90ZD4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gKChwYXJzZUludChpbm5lcikgKyAxKSUxMCA/ICcnIDogJzwvdHI+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gKChwYXJzZUludChpbm5lcikgKyAxKSUxMCA/ICcnIDogJzx0cj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8L3RyPjwvdGFibGU+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8cD48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tYmxvY2tcIiBkYXRhLWFjdGlvbj1cIicgKyBhY3Rpb24gKyAnXCIgZGF0YS12YWx1ZT1cInVuc2V0XCI+UmVzZXQgY29sb3I8L2E+PC9wPic7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfYnVpbGRUYWJsZUdyaWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJ1aWxkQ29sb3JQYWxldHRlKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9ICc8dGFibGUgY2xhc3M9XCJ0YWJsZS1ncmlkXCI+JztcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciByb3cgPSAxOyByb3cgPD0gNjsgcm93KyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzx0cj4nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBjb2x1bW4gPSAxOyBjb2x1bW4gPD0gODsgY29sdW1uKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPHRkPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJpbnNlcnQtdGFibGVcIiBkYXRhLXZhbHVlPVwiJyArIHJvdyArICd8JysgY29sdW1uICsnXCI+Jm5ic3A7PC9hPjwvdGQ+J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzwvdHI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPC90YWJsZT4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9idWlsZExldHRlclNwYWNpbmdMaXN0OiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidWlsZExldHRlclNwYWNpbmdMaXN0KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSAnPHVsIGNsYXNzPVwibmF2IG5hdi1waWxscyBuYXYtc3RhY2tlZFwiPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cImxldHRlci1zcGFjaW5nXCIgZGF0YS12YWx1ZT1cIi01XCI+LTU8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsZXR0ZXItc3BhY2luZ1wiIGRhdGEtdmFsdWU9XCItM1wiPi0zPC9hPjwvbGk+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwibGV0dGVyLXNwYWNpbmdcIiBkYXRhLXZhbHVlPVwiLTJcIj4tMjwvYT48L2xpPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cImxldHRlci1zcGFjaW5nXCIgZGF0YS12YWx1ZT1cIi0xXCI+LTE8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsZXR0ZXItc3BhY2luZ1wiIGRhdGEtdmFsdWU9XCIwXCI+MDwvYT48L2xpPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cImxldHRlci1zcGFjaW5nXCIgZGF0YS12YWx1ZT1cIjFcIj4xPC9hPjwvbGk+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwibGV0dGVyLXNwYWNpbmdcIiBkYXRhLXZhbHVlPVwiMlwiPjI8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsZXR0ZXItc3BhY2luZ1wiIGRhdGEtdmFsdWU9XCIzXCI+MzwvYT48L2xpPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cImxldHRlci1zcGFjaW5nXCIgZGF0YS12YWx1ZT1cIjVcIj41PC9hPjwvbGk+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwibGV0dGVyLXNwYWNpbmdcIiBkYXRhLXZhbHVlPVwiOFwiPjg8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsZXR0ZXItc3BhY2luZ1wiIGRhdGEtdmFsdWU9XCIxMFwiPjEwPC9hPjwvbGk+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwibGV0dGVyLXNwYWNpbmdcIiBkYXRhLXZhbHVlPVwiMTJcIj4xMjwvYT48L2xpPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cImxldHRlci1zcGFjaW5nXCIgZGF0YS12YWx1ZT1cIjE1XCI+MTU8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsZXR0ZXItc3BhY2luZ1wiIGRhdGEtdmFsdWU9XCIyNVwiPjI1PC9hPjwvbGk+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwibGV0dGVyLXNwYWNpbmdcIiBkYXRhLXZhbHVlPVwiNTBcIj41MDwvYT48L2xpPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3VsPic7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfYnVpbGRMaW5lSGVpZ2h0TGlzdDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnVpbGRMaW5lSGVpZ2h0TGlzdCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gJzx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHMgbmF2LXN0YWNrZWRcIj5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsaW5lLWhlaWdodFwiIGRhdGEtdmFsdWU9XCIwLjVcIj4wLjU8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsaW5lLWhlaWdodFwiIGRhdGEtdmFsdWU9XCIxLjBcIj4xLjA8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsaW5lLWhlaWdodFwiIGRhdGEtdmFsdWU9XCIxLjE1XCI+MS4xNTwvYT48L2xpPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cImxpbmUtaGVpZ2h0XCIgZGF0YS12YWx1ZT1cIjEuNVwiPjEuNTwvYT48L2xpPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cImxpbmUtaGVpZ2h0XCIgZGF0YS12YWx1ZT1cIjIuMFwiPjIuMDwvYT48L2xpPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3VsPic7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfc2VsZWN0VGV4dDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2VsZWN0VGV4dChzZWxlY3Rpb24sIHJhbmdlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFzZWxlY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFyYW5nZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfYnVpbGRFbW9qaUxpc3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJ1aWxkRW1vamlMaXN0KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVtb2ppcyA9IHRoaXMuX2NvbmZpZy5lbW9qaURlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlbW9qaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXhSb3dzID0gTWF0aC5yb3VuZChlbW9qaXMubGVuZ3RoIC8gOCkrMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9ICc8dGFibGUgY2xhc3M9XCJlbW9qaXMtbGlzdFwiPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciByb3cgPSAxLCBpbmRleCA9IDA7IHJvdyA8PSBtYXhSb3dzOyByb3crKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8dHI+JztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGNvbHVtbiA9IDE7IGNvbHVtbiA8PSA4OyBjb2x1bW4rKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleCA9PSBlbW9qaXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8dGQ+PGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cImluc2VydC1odG1sXCIgZGF0YS12YWx1ZT1cIicgKyBlbW9qaXNbaW5kZXhdLnRvU3RyaW5nKCkgKyAnXCI+JysgZW1vamlzW2luZGV4XSArJzwvYT48L3RkPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzwvdHI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPC90YWJsZT4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2J1aWxkU3ltYm9sc0xpc3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJ1aWxkU3ltYm9sc0xpc3QoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzeW1ib2xzID0gdGhpcy5fY29uZmlnLnN5bWJvbHNEZWZhdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzeW1ib2xzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF4Um93cyA9IE1hdGgucm91bmQoc3ltYm9scy5sZW5ndGggLyAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSAnPHRhYmxlIGNsYXNzPVwic3ltYm9scy1saXN0XCI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHJvdyA9IDEsIGluZGV4ID0gMDsgcm93IDw9IG1heFJvd3M7IHJvdysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzx0cj4nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgY29sdW1uID0gMTsgY29sdW1uIDw9IDEwOyBjb2x1bW4rKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleCA9PSBzeW1ib2xzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPHRkPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJpbnNlcnQtaHRtbFwiIGRhdGEtdmFsdWU9XCInICsgc3ltYm9sc1tpbmRleF0gKyAnXCIgc3R5bGU9XCJtaW4td2lkdGg6MTZweDt0ZXh0LWFsaWduOmNlbnRlcjtcIj4nKyBzeW1ib2xzW2luZGV4XSArJzwvYT48L3RkPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzwvdHI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPC90YWJsZT4nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9idWlsZERkcm9wZG93bjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnVpbGREZHJvcGRvd24oZHJvcGRvd25JZCwgYnV0dG9uVGV4dCwgYnV0dG9uQ2FyZXQsIG1lbnVJdGVtcywgZGVmYXVsdFZhbHVlLCBkYXRhQXR0cikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnV0dG9uVGV4dCA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvblRleHQgPSAnTm90IHNldCc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidXR0b25DYXJldCA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbkNhcmV0ID0gJzxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+JztcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lbnVJdGVtcyA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbkNhcmV0ID0ge307XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhQXR0ciA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFBdHRyID0gJ2RhdGEtdmFsdWUnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGRyb3Bkb3duID0gJCgnPGRpdiBjbGFzcz1cImRyb3Bkb3duXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZHJvcGRvd25CdXR0b24gPSAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkJ1dHRvbi5hdHRyKCdpZCcsIGRyb3Bkb3duSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duQnV0dG9uLmh0bWwoYnV0dG9uVGV4dCArICcgJyArIGJ1dHRvbkNhcmV0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQnVpbGQgZHJvcGRvd24gbWVudVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRkcm9wZG93bk1lbnUgPSAkKCc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiJyArIGRyb3Bkb3duSWQgKyAnXCIgLz4nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkZWZhdWx0VmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTWVudS5hcHBlbmQoJzxsaSBjbGFzcz1cImFjdGl2ZVwiPjxhIGhyZWY9XCIjXCI+JyArIGJ1dHRvblRleHQgKyAnPC9hPjwvbGk+Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IFtpZCwgbmFtZV0gb2YgT2JqZWN0LmVudHJpZXMobWVudUl0ZW1zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZC50b1N0cmluZygpID09ICdzZXBhcmF0b3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bk1lbnUuYXBwZW5kKCc8bGkgcm9sZT1cInNlcGFyYXRvclwiIGNsYXNzPVwiZGl2aWRlclwiPjwvbGk+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWZhdWx0VmFsdWUgPT0gaWQudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25NZW51LmFwcGVuZCgnPGxpIGNsYXNzPVwiYWN0aXZlXCI+PGEgaHJlZj1cIiNcIiAnICsgZGF0YUF0dHIgKyAnPVwiJyArIGlkICsgJ1wiPicgKyBuYW1lICsgJzwvYT48L2xpPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bk1lbnUuYXBwZW5kKCc8bGk+PGEgaHJlZj1cIiNcIiAnICsgZGF0YUF0dHIgKyAnPVwiJyArIGlkICsgJ1wiPicgKyBuYW1lICsgJzwvYT48L2xpPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2xpY2sgYnkgZHJvcGRvd24gbWVudSBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTWVudS5maW5kKCdsaScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTWVudS5maW5kKCdsaScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25CdXR0b24uaHRtbCgkKHRoaXMpLnRleHQoKSArICcgJyArIGJ1dHRvbkNhcmV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24uYXBwZW5kKCRkcm9wZG93bkJ1dHRvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24uYXBwZW5kKCRkcm9wZG93bk1lbnUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRkcm9wZG93bjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2J1aWxkVXJsRm9ybToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnVpbGRVcmxGb3JtKHR5cGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5kZWJ1ZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQnVpbGQgVVJMIGZvcm0gZm9yIHR5cGU6ICcgKyB0eXBlKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGZvcm0gPSAkKCc8Zm9ybSBjbGFzcz1cImZvcm0taG9yaXpvbnRhbFwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGZvcm1Hcm91cCA9ICQoJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkY29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cImNvbC14cy0xMiBjb2wtc20tMTJcIiAvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dEdyb3VwID0gJCgnPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGlucHV0LWdyb3VwLXNtXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZHJvcGRvd24gPSAkKCc8ZGl2IGNsYXNzPVwiZHJvcGRvd25cIiAvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRkcm9wZG93bkJ1dHRvbiA9ICQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tc2Vjb25kYXJ5IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIC8+Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09IFwiaW1hZ2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEdyb3VwLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiPkltYWdlOjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBcInZpZGVvXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGRyb3Bkb3duID0gX3RoaXMuX2J1aWxkRGRyb3Bkb3duKCd2aWRlb1NlcnZpY2VzJywgJ1lvdVR1YmUnLCBudWxsLCB2aWRlb1NlcnZpY2VzLCAneW91dHViZScsICdkYXRhLXNlcnZpY2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24uYXR0cignY2xhc3MnLCAnaW5wdXQtZ3JvdXAtYnRuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLmZpbmQoJy5idG5bZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXScpLnRvZ2dsZUNsYXNzKCdidG4tZGVmYXVsdCcsICdidG4tc2Vjb25kYXJ5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0R3JvdXAuYXBwZW5kKCRkcm9wZG93bik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJsaW5rXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGRyb3Bkb3duID0gX3RoaXMuX2J1aWxkRGRyb3Bkb3duKCd1cmxTY2hlbWVzJywgJ2h0dHBzOi8vJywgbnVsbCwgdXJsU2NoZW1lcywgJ2h0dHBzJywgJ2RhdGEtc2NoZW1lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLmF0dHIoJ2NsYXNzJywgJ2lucHV0LWdyb3VwLWJ0bicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5maW5kKCcuYnRuW2RhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIl0nKS50b2dnbGVDbGFzcygnYnRuLWRlZmF1bHQnLCAnYnRuLXNlY29uZGFyeScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEdyb3VwLmFwcGVuZCgkZHJvcGRvd24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCgnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlR5cGUgeW91ciBVUkwuLi5cIiAvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJpbWFnZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmF0dHIoJ2lkJywgXCJpbWFnZVVybFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBcInZpZGVvXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQuYXR0cignaWQnLCBcInZpZGVvVXJsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IFwibGlua1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmF0dHIoJ2lkJywgXCJ1cmxJbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEdyb3VwLmFwcGVuZCgkaW5wdXQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGJ1dHRvbldyYXAgPSAkKCc8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGJ1dHRvbiA9ICQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tcHJpbWFyeVwiPkFkZDwvYnV0dG9uPicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSBcImltYWdlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnV0dG9uLmF0dHIoJ2RhdGEtYWN0aW9uJywgXCJhZGQtaW1hZ2VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJ2aWRlb1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ1dHRvbi5hdHRyKCdkYXRhLWFjdGlvbicsIFwiYWRkLXZpZGVvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnV0dG9uLmF0dHIoJ2RhdGEtYWN0aW9uJywgXCJhZGQtdXJsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9ICQoZXZlbnQudGFyZ2V0KS5kYXRhKCdhY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuZGF0YSgndmFsdWUnLCAkaW5wdXQudmFsKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSBcImFkZC11cmxcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJsU2NoZW1lID0gJGZvcm0uZmluZCgnW2FyaWEtbGFiZWxsZWRieT1cInVybFNjaGVtZXNcIl0gbGkuYWN0aXZlIGFbZGF0YS1zY2hlbWVdJykuZmlyc3QoKS5kYXRhKCdzY2hlbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmRhdGEoJ3NjaGVtZScsICh1cmxTY2hlbWUpID8gdXJsU2NoZW1lIDogbnVsbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybFRpbGUgPSAkZm9ybS5maW5kKCcjdXJsVGlsZScpLnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuZGF0YSgndGl0bGUnLCAodXJsVGlsZSkgPyB1cmxUaWxlIDogbnVsbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybENsYXNzID0gJGZvcm0uZmluZCgnI3VybENsYXNzJykudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5kYXRhKCdjbGFzcycsICh1cmxDbGFzcykgPyB1cmxDbGFzcyA6IG51bGwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cmxMaW5rVGFyZ2V0ID0gJGZvcm0uZmluZCgnW2FyaWEtbGFiZWxsZWRieT1cInVybExpbmtUYXJnZXRcIl0gbGkuYWN0aXZlIGFbZGF0YS10YXJnZXRdJykuZmlyc3QoKS5kYXRhKCd0YXJnZXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmRhdGEoJ3RhcmdldCcsICh1cmxMaW5rVGFyZ2V0KSA/IHVybExpbmtUYXJnZXQgOiBudWxsKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJsTGlua1JlbCA9ICRmb3JtLmZpbmQoJ1thcmlhLWxhYmVsbGVkYnk9XCJ1cmxMaW5rUmVsXCJdIGxpLmFjdGl2ZSBhW2RhdGEtcmVsXScpLmZpcnN0KCkuZGF0YSgncmVsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5kYXRhKCdyZWxhdGlvbicsICh1cmxMaW5rUmVsKSA/IHVybExpbmtSZWwgOiBudWxsKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09IFwiYWRkLXZpZGVvXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZGVvU2VydmljZSA9ICRmb3JtLmZpbmQoJ1thcmlhLWxhYmVsbGVkYnk9XCJ2aWRlb1NlcnZpY2VzXCJdIGxpLmFjdGl2ZSBhW2RhdGEtc2VydmljZV0nKS5maXJzdCgpLmRhdGEoJ3NlcnZpY2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmRhdGEoJ3NlcnZpY2UnLCAodmlkZW9TZXJ2aWNlKSA/IHZpZGVvU2VydmljZSA6IG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRidXR0b24uZGF0YSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnV0dG9uV3JhcC5hcHBlbmQoJGJ1dHRvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRHcm91cC5hcHBlbmQoJGJ1dHRvbldyYXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoJGlucHV0R3JvdXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGZvcm1Hcm91cC5hcHBlbmQoJGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZm9ybS5hcHBlbmQoJGZvcm1Hcm91cCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09IFwibGlua1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBmb3JtLWdyb3VwLXNtXCI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICcgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICcgICAgICAgIDxsYWJlbCBjbGFzcz1cImNvbC14cy0xMiBjb2wtc20tNFwiPlRpbGU6PC9sYWJlbD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJyAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0xMiBjb2wtc20tOFwiPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInVybFRpbGVcIiBwbGFjZWhvbGRlcj1cIlRpdGxlIG9mIGxpbmsuLi5cIiAvPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnICAgICAgICA8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJyAgICA8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBmb3JtLWdyb3VwLXNtXCI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICcgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICcgICAgICAgIDxsYWJlbCBjbGFzcz1cImNvbC14cy0xMiBjb2wtc20tNFwiPkNsYXNzOjwvbGFiZWw+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICcgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMTIgY29sLXNtLThcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJyAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJ1cmxDbGFzc1wiIHBsYWNlaG9sZGVyPVwiQ1NTIGNsYXNzIG5hbWUuLi5cIiAvPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnICAgICAgICA8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJyAgICA8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZm9ybS5hcHBlbmQoY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMaW5rIHRhcmdldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZm9ybUdyb3VwID0gJCgnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1zbVwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dEdyb3VwID0gJCgnPGRpdiBjbGFzcz1cImZvcm0tcm93IGlucHV0LWdyb3VwLXNtXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0TGFiZWwgPSAkKCc8bGFiZWwgY2xhc3M9XCJjb2wteHMtMTIgY29sLXNtLTRcIiAvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dExhYmVsLnRleHQoJ1RhcmdldDonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRHcm91cC5hcHBlbmQoJGlucHV0TGFiZWwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRkcm9wZG93biA9IF90aGlzLl9idWlsZERkcm9wZG93bigndXJsTGlua1RhcmdldCcsICdOb3Qgc2V0JywgbnVsbCwgdXJsTGlua1RhcmdldCwgbnVsbCwgJ2RhdGEtdGFyZ2V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLmFkZENsYXNzKCdjb2wteHMtMTIgY29sLXNtLTgnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24uZmluZCgnLmJ0bltkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJykuYWRkQ2xhc3MoJ2J0bi1zbScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0R3JvdXAuYXBwZW5kKCRkcm9wZG93bik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZvcm1Hcm91cC5hcHBlbmQoJGlucHV0R3JvdXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmb3JtLmFwcGVuZCgkZm9ybUdyb3VwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExpbmsgcmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRmb3JtR3JvdXAgPSAkKCc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBmb3JtLWdyb3VwLXNtXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0R3JvdXAgPSAkKCc8ZGl2IGNsYXNzPVwiZm9ybS1yb3cgaW5wdXQtZ3JvdXAtc21cIiAvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXRMYWJlbCA9ICQoJzxsYWJlbCBjbGFzcz1cImNvbC14cy0xMiBjb2wtc20tNFwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0TGFiZWwudGV4dCgnUmVsYXRpb246Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0R3JvdXAuYXBwZW5kKCRpbnB1dExhYmVsKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZHJvcGRvd24gPSBfdGhpcy5fYnVpbGREZHJvcGRvd24oJ3VybExpbmtSZWwnLCAnTm90IHNldCcsIG51bGwsIHVybExpbmtSZWwsIG51bGwsICdkYXRhLXJlbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLmFkZENsYXNzKCdjb2wteHMtMTIgY29sLXNtLTgnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24uZmluZCgnLmJ0bltkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJykuYWRkQ2xhc3MoJ2J0bi1zbScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0R3JvdXAuYXBwZW5kKCRkcm9wZG93bik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZvcm1Hcm91cC5hcHBlbmQoJGlucHV0R3JvdXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmb3JtLmFwcGVuZCgkZm9ybUdyb3VwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGZvcm07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9nZW5lcmF0ZVRhYmxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZW5lcmF0ZVRhYmxlKHJvd3MsIGNvbHVtbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcm93cyA9IHBhcnNlSW50KHJvd3MpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMgPSBwYXJzZUludChyb3dzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWNvbHVtbnMpIGNvbHVtbnMgPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9ICc8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPic7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcm93ID0gMTsgcm93IDw9IHJvd3M7IHJvdysrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzx0aGVhZD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJvdyA9PSAoKHJvd3MgLSByb3cpIC0gMSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzx0Ym9keT4nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPHRyPic7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGNvbHVtbiA9IDE7IGNvbHVtbiA8PSBjb2x1bW5zOyBjb2x1bW4rKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzx0aD5IZWFkZXIgJyArIGNvbHVtbiArICc8L3RoPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzx0ZD4mbmJzcDs8L3RkPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPC90cj4nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8L3RoZWFkPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocm93ID09IHJvd3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzwvdGJvZHk+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPC90YWJsZT4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF91cGRhdGVTdGF0ZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlU3RhdGUoJHRhcmdldCwgcmVzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2NvbmZpZy5tb2RlID09ICdlZGl0b3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXRJbmZvID0gX3RoaXMuX2dldFRleHRTdGF0KF90aGlzLl8kY29udGVudC5nZXQoMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoSW5mbyA9IF90aGlzLl9nZXRQYXRoKCR0YXJnZXQsIF90aGlzLl8kY29udGVudCwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXJlc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocGF0aEluZm9bJ3RhZ3MnXVswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYicgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJ0ZXh0XCJdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJ0ZXh0XCJdW2RhdGEtdmFsdWU9XCJib2xkXCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd1JyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cInRleHRcIl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cInRleHRcIl1bZGF0YS12YWx1ZT1cInVuZGVybGluZVwiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3ViJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cInRleHRcIl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cInRleHRcIl1bZGF0YS12YWx1ZT1cInN1YnNjcmlwdFwiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3VwJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cInRleHRcIl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cInRleHRcIl1bZGF0YS12YWx1ZT1cInN1cGVyc2NyaXB0XCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cInRleHRcIl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cInRleHRcIl1bZGF0YS12YWx1ZT1cIml0YWxpY1wiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYScgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJpbnNlcnRcIl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cImluc2VydFwiXVtkYXRhLXZhbHVlPVwibGlua1wiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJhbGlnblwiXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkdGFyZ2V0LmNzcygndGV4dC1hbGlnbicpID09ICdjZW50ZXInKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwiYWxpZ25cIl1bZGF0YS12YWx1ZT1cImNlbnRlclwiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgkdGFyZ2V0LmNzcygndGV4dC1hbGlnbicpID09ICdyaWdodCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJhbGlnblwiXVtkYXRhLXZhbHVlPVwicmlnaHRcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoJHRhcmdldC5jc3MoJ3RleHQtYWxpZ24nKSA9PSAnanVzdGlmeScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJhbGlnblwiXVtkYXRhLXZhbHVlPVwianVzdGlmeVwiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJhbGlnblwiXVtkYXRhLXZhbHVlPVwibGVmdFwiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwidGV4dFwiXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwiYWxpZ25cIl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cImluc2VydFwiXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdidXR0b25bZGF0YS1hY3Rpb25dJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kc3RhdHVzYmFyLnBhdGgudGV4dChwYXRoSW5mb1sncGF0aCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHN0YXR1c2Jhci5zdGF0LnRleHQoJ0xlbmd0aDogJyArIHN0YXRJbmZvWydsZW5ndGgnXSArICcsIGNoYXJzOiAnICsgc3RhdEluZm9bJ2NoYXJzJ10gKyAnLCB3b3JkczogJyArICBzdGF0SW5mb1snd29yZHMnXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBfdGhpcy5fZ2V0VGV4dFBvc2l0aW9uKF90aGlzLl8kY29udGVudC5nZXQoMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kc3RhdHVzYmFyLnBhdGguZW1wdHkoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KHBvc2l0aW9uWydzZWxlY3RlZCddKSA+IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kc3RhdHVzYmFyLnN0YXQudGV4dCgnTGluZTogJyArIHBvc2l0aW9uWydsaW5lJ10gKyAnLCBjb2x1bW46ICcgKyBwb3NpdGlvblsnZW5kJ10gKyAnLCBzZWxlY3RlZDogJyArIHBvc2l0aW9uWydzZWxlY3RlZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kc3RhdHVzYmFyLnN0YXQudGV4dCgnTGluZTogJyArIHBvc2l0aW9uWydsaW5lJ10gKyAnLCBjb2x1bW46ICcgKyBwb3NpdGlvblsnZW5kJ10pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5fJGVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgRGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfalF1ZXJ5SW50ZXJmYWNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQoX3RoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfY29uZmlnID0gJC5leHRlbmQoe30sIFdZU0lXWUcuRGVmYXVsdCwgJHRoaXMuZGF0YSgpLCB0eXBlb2YgY29uZmlnID09PSBcIm9iamVjdFwiICYmIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEVkaXRvcihfdGhpcywgX2NvbmZpZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gRWRpdG9yO1xuXG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgJC5mbltjbGFzc05hbWVdID0gRWRpdG9yLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgICAgICQuZm5bY2xhc3NOYW1lXS5Db25zdHJ1Y3RvciA9IEVkaXRvcjtcbiAgICAgICAgJC5mbltjbGFzc05hbWVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQuZm5bY2xhc3NOYW1lXSA9IF9qUXVlcnlOb0NvbmZsaWN0O1xuICAgICAgICAgICAgcmV0dXJuIEVkaXRvci5falF1ZXJ5SW50ZXJmYWNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBFZGl0b3I7XG5cbiAgICB9KShqUXVlcnkpO1xufShqUXVlcnkpOyJdfQ==
