/**
 * Simple WYSIWYG editor for Bootstrap3
 *
 * @category        jQuery Plugin
 * @version         1.1.4
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
                        let _this = this;
                        config = config || {};

                        if (/destroy|hide/.test(config)) {
                            let element = $(_this);
                            element.removeClass('hide');

                            let editor = element.parent('.wysiwyg-editor');
                            editor.replaceWith(element);

                            return;
                        }

                        return _this.each(function() {
                            let $this = $(_this);
                            let _config = $.extend({}, WYSIWYG.Default, $this.data(), typeof config === "object" && config);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd5c2l3eWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoid3lzaXd5Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU2ltcGxlIFdZU0lXWUcgZWRpdG9yIGZvciBCb290c3RyYXAzXG4gKlxuICogQGNhdGVnb3J5ICAgICAgICBqUXVlcnkgUGx1Z2luXG4gKiBAdmVyc2lvbiAgICAgICAgIDEuMS40XG4gKiBAYXV0aG9yICAgICAgICAgIEFsZXhzYW5kZXIgVnlzaG55dmV0c2t5eSA8YWxleC52eXNobnl2ZXRza3l5QGdtYWlsLmNvbT5cbiAqIEBsaW5rICAgICAgICAgICAgaHR0cDovL3dkbWcuZ2l0aHViLmlvL2Jvb3RzdHJhcC13eXNpd3lnXG4gKiBAY29weXJpZ2h0ICAgICAgIENvcHlyaWdodCAoYykgMjAxOSAtIDIwMjAgVy5ELk0uR3JvdXAsIFVrcmFpbmVcbiAqIEBsaWNlbnNlICAgICAgICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQgTWFzc2FjaHVzZXR0cyBJbnN0aXR1dGUgb2YgVGVjaG5vbG9neSAoTUlUKSBMaWNlbnNlXG4gKlxuICovXG5cbitmdW5jdGlvbigkKSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wID0gcHJvcHNba2V5XTtcbiAgICAgICAgICAgICAgICBwcm9wLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHByb3AudmFsdWUpIHByb3Aud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgICAgICAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICAgICAgICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgdmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICAgICAgICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgV1lTSVdZRyA9IChmdW5jdGlvbigkKSB7XG5cbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IFwid3lzaXd5Z1wiO1xuICAgICAgICB2YXIgX2pRdWVyeU5vQ29uZmxpY3QgPSAkLmZuW2NsYXNzTmFtZV07XG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIHRvb2xiYXI6IFtcbiAgICAgICAgICAgICAgICBbJ21vZGUnXSxcbiAgICAgICAgICAgICAgICBbJ29wZXJhdGlvbnMnLCBbJ3VuZG8nLCAncmVuZG8nLCAnY3V0JywgJ2NvcHknLCAncGFzdGUnXV0sXG4gICAgICAgICAgICAgICAgWydzdHlsZXMnXSxcbiAgICAgICAgICAgICAgICBbJ2ZvbnRzJywgWydzZWxlY3QnLCAnc2l6ZSddXSxcbiAgICAgICAgICAgICAgICBbJ3RleHQnLCBbJ2JvbGQnLCAnaXRhbGljJywgJ3VuZGVybGluZScsICdzdHJpa2UnLCAnc3Vic2NyaXB0JywgJ3N1cGVyc2NyaXB0JywgJ2ZvbnQtY29sb3InLCAnYmctY29sb3InXV0sXG4gICAgICAgICAgICAgICAgWydhbGlnbicsIFsnbGVmdCcsICdjZW50ZXInLCAncmlnaHQnLCAnanVzdGlmeSddXSxcbiAgICAgICAgICAgICAgICBbJ2xpc3RzJywgWyd1bm9yZGVyZWQnLCAnb3JkZXJlZCcsICdpbmRlbnQnLCAnb3V0ZGVudCddXSxcbiAgICAgICAgICAgICAgICBbJ2NvbXBvbmVudHMnLCBbJ3RhYmxlJywgLyonY2hhcnQnKi9dXSxcbiAgICAgICAgICAgICAgICBbJ2ludGVydmFscycsIFsnbGluZS1oZWlnaHQnLCAnbGV0dGVyLXNwYWNpbmcnXV0sXG4gICAgICAgICAgICAgICAgWydpbnNlcnQnLCBbJ2Vtb2ppJywgJ2xpbmsnLCAnaW1hZ2UnLCAndmlkZW8nLCAnc3ltYm9sJywgLyonYm9va21hcmsnKi9dXSxcbiAgICAgICAgICAgICAgICBbJ3NwZWNpYWwnLCBbJ3ByaW50JywgJ3VuZm9ybWF0JywgJ3Zpc3VhbCcsICdjbGVhbiddXSxcbiAgICAgICAgICAgICAgICAvKlsnZnVsbHNjcmVlbiddLCovXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZm9udFNpemVzOiBbJzhweCcsICc5cHgnLCAnMTBweCcsICcxMXB4JywgJzEycHgnLCAnMTRweCcsICcxNXB4JywgJzE2cHgnLCAnMThweCcsICcyMHB4JywgJzI0cHgnLCAnMzBweCcsICczMnB4JywgJzM2cHgnLCAnNDhweCddLFxuICAgICAgICAgICAgZm9udFNpemVEZWZhdWx0OiAnMTJweCcsXG4gICAgICAgICAgICBmb250RmFtaWxpZXM6IFsnT3BlbiBTYW5zJywgJ0FyaWFsJywgJ0FyaWFsIEJsYWNrJywgJ0NvdXJpZXInLCAnQ291cmllciBOZXcnLCAnQ29taWMgU2FucyBNUycsICdIZWx2ZXRpY2EnLCAnSW1wYWN0JywgJ0x1Y2lkYSBHcmFuZGUnLCAnTHVjaWRhIFNhbnMnLCAnVGFob21hJywgJ1RpbWVzJywgJ1RpbWVzIE5ldyBSb21hbicsICdWZXJkYW5hJ10sXG4gICAgICAgICAgICBmb250RmFtaWx5RGVmYXVsdDogJ09wZW4gU2FucycsXG4gICAgICAgICAgICBlbW9qaURlZmF1bHQ6IFtcIlxcdXsxZjYwMH1cIiwgXCJcXHV7MWY2MmN9XCIsIFwiXFx1ezFmNjAxfVwiLCBcIlxcdXsxZjYwMn1cIiwgXCJcXHV7MWY2MDN9XCIsIFwiXFx1ezFmNjA0fVwiLCBcIlxcdXsxZjYwNX1cIiwgXCJcXHV7MWY2MDZ9XCIsIFwiXFx1ezFmNjA3fVwiLCBcIlxcdXsxZjYwOX1cIiwgXCJcXHV7MWY2MGF9XCIsIFwiXFx1ezFmNjQyfVwiLCBcIlxcdXsxZjY0M31cIiwgXCJcXHV7MWY2MGJ9XCIsIFwiXFx1ezFmNjBjfVwiLCBcIlxcdXsxZjYwZH1cIiwgXCJcXHV7MWY2MTh9XCIsIFwiXFx1ezFmNjE3fVwiLCBcIlxcdXsxZjYxOX1cIiwgXCJcXHV7MWY2MWF9XCIsIFwiXFx1ezFmNjFjfVwiLCBcIlxcdXsxZjYxZH1cIiwgXCJcXHV7MWY2MWJ9XCIsIFwiXFx1ezFmOTExfVwiLCBcIlxcdXsxZjkxM31cIiwgXCJcXHV7MWY2MGV9XCIsIFwiXFx1ezFmOTE3fVwiLCBcIlxcdXsxZjYwZn1cIiwgXCJcXHV7MWY2MzZ9XCIsIFwiXFx1ezFmNjEwfVwiLCBcIlxcdXsxZjYxMX1cIiwgXCJcXHV7MWY2MTJ9XCIsIFwiXFx1ezFmNjQ0fVwiLCBcIlxcdXsxZjkxNH1cIiwgXCJcXHV7MWY2MzN9XCIsIFwiXFx1ezFmNjFlfVwiLCBcIlxcdXsxZjYxZn1cIiwgXCJcXHV7MWY2MjB9XCIsIFwiXFx1ezFmNjIxfVwiLCBcIlxcdXsxZjYxNH1cIiwgXCJcXHV7MWY2MTV9XCIsIFwiXFx1ezFmNjQxfVwiLCBcIlxcdXsxZjYyM31cIiwgXCJcXHV7MWY2MTZ9XCIsIFwiXFx1ezFmNjJifVwiLCBcIlxcdXsxZjYyOX1cIiwgXCJcXHV7MWY2MjR9XCIsIFwiXFx1ezFmNjJlfVwiLCBcIlxcdXsxZjYzMX1cIiwgXCJcXHV7MWY2Mjh9XCIsIFwiXFx1ezFmNjMwfVwiLCBcIlxcdXsxZjYyZn1cIiwgXCJcXHV7MWY2MjZ9XCIsIFwiXFx1ezFmNjI3fVwiLCBcIlxcdXsxZjYyMn1cIiwgXCJcXHV7MWY2MjV9XCIsIFwiXFx1ezFmNjJhfVwiLCBcIlxcdXsxZjYxM31cIiwgXCJcXHV7MWY2MmR9XCIsIFwiXFx1ezFmNjM1fVwiLCBcIlxcdXsxZjYzMn1cIiwgXCJcXHV7MWY5MTB9XCIsIFwiXFx1ezFmNjM3fVwiLCBcIlxcdXsxZjkxMn1cIiwgXCJcXHV7MWY5MTV9XCIsIFwiXFx1ezFmNjM0fVwiLCBcIlxcdXsxZjRhNH1cIl0sXG4gICAgICAgICAgICBzeW1ib2xzRGVmYXVsdDogW1wiJmx0O1wiLCBcIiZndDtcIiwgXCImbGFxdW87XCIsIFwiJnJhcXVvO1wiLCBcIiZsc2FxdW87XCIsIFwiJnJzYXF1bztcIiwgXCImcXVvdDtcIiwgXCImcHJpbWU7XCIsIFwiJlByaW1lO1wiLCBcIiZsc3F1bztcIiwgXCImcnNxdW87XCIsIFwiJnNicXVvO1wiLCBcIiZsZHF1bztcIiwgXCImcmRxdW87XCIsIFwiJmJkcXVvO1wiLCBcIiYjMTAwNzY7XCIsIFwiJiMxMDA3NTtcIiwgXCImYW1wO1wiLCBcIiZhcG9zO1wiLCBcIiZzZWN0O1wiLCBcIiZjb3B5O1wiLCBcIiZub3Q7XCIsIFwiJnJlZztcIiwgXCImbWFjcjtcIiwgXCImZGVnO1wiLCBcIiZwbHVzbW47XCIsIFwiJnN1cDE7XCIsIFwiJnN1cDI7XCIsIFwiJnN1cDM7XCIsIFwiJmZyYWMxNDtcIiwgXCImZnJhYzEyO1wiLCBcIiZmcmFjMzQ7XCIsIFwiJmFjdXRlO1wiLCBcIiZtaWNybztcIiwgXCImcGFyYTtcIiwgXCImbWlkZG90O1wiLCBcIiZpcXVlc3Q7XCIsIFwiJmZub2Y7XCIsIFwiJnRyYWRlO1wiLCBcIiZidWxsO1wiLCBcIiZoZWxsaXA7XCIsIFwiJm9saW5lO1wiLCBcIiZuZGFzaDtcIiwgXCImbWRhc2g7XCIsIFwiJnBlcm1pbDtcIiwgXCImIzEyNTtcIiwgXCImIzEyMztcIiwgXCImIzYxO1wiLCBcIiZuZTtcIiwgXCImY29uZztcIiwgXCImYXN5bXA7XCIsIFwiJmxlO1wiLCBcIiZnZTtcIiwgXCImYW5nO1wiLCBcIiZwZXJwO1wiLCBcIiZyYWRpYztcIiwgXCImc3VtO1wiLCBcIiZpbnQ7XCIsIFwiJiM4MjUxO1wiLCBcIiZkaXZpZGU7XCIsIFwiJmluZmluO1wiLCBcIiYjNjQ7XCIsIFwiJiM5MTtcIiwgXCImIzkzO1wiLCBcIiZsYXJyO1wiLCBcIiZ1YXJyO1wiLCBcIiZyYXJyO1wiLCBcIiZkYXJyO1wiLCBcIiZoYXJyO1wiLCBcIiZjcmFycjtcIiwgXCImbEFycjtcIiwgXCImdUFycjtcIiwgXCImckFycjtcIiwgXCImZEFycjtcIiwgXCImaEFycjtcIiwgXCImIzEwMTQ0O1wiLCBcIiYjMTAxNDg7XCIsIFwiJiMxMDE0OTtcIiwgXCImIzEwMTUwO1wiLCBcIiYjMTAxNjM7XCIsIFwiJiM4NjM0O1wiLCBcIiYjODYzNTtcIiwgXCImIzg2Nzk7XCIsIFwiJiM4NjE3O1wiLCBcIiYjMTEwMTU7XCIsIFwiJiMxMTAxNDtcIiwgXCImc3BhZGVzO1wiLCBcIiZjbHVicztcIiwgXCImaGVhcnRzO1wiLCBcIiZkaWFtcztcIiwgXCImIzk4MjU7XCIsIFwiJiM5ODI2O1wiLCBcIiYjOTgyODtcIiwgXCImIzk4MzE7XCIsIFwiJiM4MzcyO1wiLCBcIiZldXJvO1wiLCBcIiZkb2xsYXI7XCIsIFwiJmNlbnQ7XCIsIFwiJnBvdW5kO1wiLCBcIiYjODM4MTtcIiwgXCImeWVuO1wiLCBcIiYjODM3NztcIiwgXCImIzIyMjkxO1wiLCBcIiYjODM3NjtcIl0sXG4gICAgICAgICAgICBjb2xvclBhbGV0dGU6IFtbXCJyZ2IoMCwgMCwgMClcIixcInJnYig2NywgNjcsIDY3KVwiLFwicmdiKDEwMiwgMTAyLCAxMDIpXCIsXCJyZ2IoMTUzLCAxNTMsIDE1MylcIixcInJnYigxODMsIDE4MywgMTgzKVwiLFwicmdiKDIwNCwgMjA0LCAyMDQpXCIsXCJyZ2IoMjE3LCAyMTcsIDIxNylcIixcInJnYigyMzksIDIzOSwgMjM5KVwiLFwicmdiKDI0MywgMjQzLCAyNDMpXCIsXCJyZ2IoMjU1LCAyNTUsIDI1NSlcIl0sW1wicmdiKDE1MiwgMCwgMClcIixcInJnYigyNTUsIDAsIDApXCIsXCJyZ2IoMjU1LCAxNTMsIDApXCIsXCJyZ2IoMjU1LCAyNTUsIDApXCIsXCJyZ2IoMCwgMjU1LCAwKVwiLFwicmdiKDAsIDI1NSwgMjU1KVwiLFwicmdiKDc0LCAxMzQsIDIzMilcIixcInJnYigwLCAwLCAyNTUpXCIsXCJyZ2IoMTUzLCAwLCAyNTUpXCIsXCJyZ2IoMjU1LCAwLCAyNTUpXCJdLFtcInJnYigyMzAsIDE4NCwgMTc1KVwiLFwicmdiKDI0NCwgMjA0LCAyMDQpXCIsXCJyZ2IoMjUyLCAyMjksIDIwNSlcIixcInJnYigyNTUsIDI0MiwgMjA0KVwiLFwicmdiKDIxNywgMjM0LCAyMTEpXCIsXCJyZ2IoMjA4LCAyMjQsIDIyNylcIixcInJnYigyMDEsIDIxOCwgMjQ4KVwiLFwicmdiKDIwNywgMjI2LCAyNDMpXCIsXCJyZ2IoMjE3LCAyMTAsIDIzMylcIixcInJnYigyMzQsIDIwOSwgMjIwKVwiLFwicmdiKDIyMSwgMTI2LCAxMDcpXCIsXCJyZ2IoMjM0LCAxNTMsIDE1MylcIixcInJnYigyNDksIDIwMywgMTU2KVwiLFwicmdiKDI1NSwgMjI5LCAxNTMpXCIsXCJyZ2IoMTgyLCAyMTUsIDE2OClcIixcInJnYigxNjIsIDE5NiwgMjAxKVwiLFwicmdiKDE2NCwgMTk0LCAyNDQpXCIsXCJyZ2IoMTU5LCAxOTcsIDIzMilcIixcInJnYigxODAsIDE2NywgMjE0KVwiLFwicmdiKDIxMywgMTY2LCAxODkpXCIsXCJyZ2IoMjA0LCA2NSwgMzcpXCIsXCJyZ2IoMjI0LCAxMDIsIDEwMilcIixcInJnYigyNDYsIDE3OCwgMTA3KVwiLFwicmdiKDI1NSwgMjE3LCAxMDIpXCIsXCJyZ2IoMTQ3LCAxOTYsIDEyNSlcIixcInJnYigxMTgsIDE2NSwgMTc1KVwiLFwicmdiKDEwOSwgMTU4LCAyMzUpXCIsXCJyZ2IoMTExLCAxNjgsIDIyMClcIixcInJnYigxNDIsIDEyNCwgMTk1KVwiLFwicmdiKDE5NCwgMTIzLCAxNjApXCIsXCJyZ2IoMTY2LCAyOCwgMClcIixcInJnYigyMDQsIDAsIDApXCIsXCJyZ2IoMjMwLCAxNDUsIDU2KVwiLFwicmdiKDI0MSwgMTk0LCA1MClcIixcInJnYigxMDYsIDE2OCwgNzkpXCIsXCJyZ2IoNjksIDEyOSwgMTQyKVwiLFwicmdiKDYwLCAxMjAsIDIxNilcIixcInJnYig2MSwgMTMzLCAxOTgpXCIsXCJyZ2IoMTAzLCA3OCwgMTY3KVwiLFwicmdiKDE2NiwgNzcsIDEyMSlcIixcInJnYigxMzMsIDMyLCAxMilcIixcInJnYigxNTMsIDAsIDApXCIsXCJyZ2IoMTgwLCA5NSwgNilcIixcInJnYigxOTEsIDE0NCwgMClcIixcInJnYig1NiwgMTE4LCAyOSlcIixcInJnYigxOSwgNzksIDkyKVwiLFwicmdiKDE3LCA4NSwgMjA0KVwiLFwicmdiKDExLCA4MywgMTQ4KVwiLFwicmdiKDUzLCAyOCwgMTE3KVwiLFwicmdiKDExNiwgMjcsIDcxKVwiLFwicmdiKDkxLCAxNSwgMClcIixcInJnYigxMDIsIDAsIDApXCIsXCJyZ2IoMTIwLCA2MywgNClcIixcInJnYigxMjcsIDk2LCAwKVwiLFwicmdiKDM5LCA3OCwgMTkpXCIsXCJyZ2IoMTIsIDUyLCA2MSlcIixcInJnYigyOCwgNjksIDEzNSlcIixcInJnYig3LCA1NSwgOTkpXCIsXCJyZ2IoMzIsIDE4LCA3NylcIixcInJnYig3NiwgMTcsIDQ4KVwiXV0sXG4gICAgICAgICAgICBtb2RlOiAnZWRpdG9yJyxcbiAgICAgICAgICAgIGxhbmd1YWdlOiAnZW4tdXMnLFxuICAgICAgICAgICAgdHJhbnNsYXRpb25zOiB7fSxcbiAgICAgICAgICAgIGhpZ2hsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgIGRlYnVnOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IFN0eWxlcyA9IHtcbiAgICAgICAgICAgICdIZWFkZXIgSDEnOiB7XG4gICAgICAgICAgICAgICAgJ2FjdGlvbic6ICdmb3JtYXRibG9jaycsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogJ2gxJyxcbiAgICAgICAgICAgICAgICAnd3JhcCc6ICc8aDEgLz4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdIZWFkZXIgSDInOiB7XG4gICAgICAgICAgICAgICAgJ2FjdGlvbic6ICdmb3JtYXRibG9jaycsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogJ2gyJyxcbiAgICAgICAgICAgICAgICAnd3JhcCc6ICc8aDIgLz4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdIZWFkZXIgSDMnOiB7XG4gICAgICAgICAgICAgICAgJ2FjdGlvbic6ICdmb3JtYXRibG9jaycsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogJ2gzJyxcbiAgICAgICAgICAgICAgICAnd3JhcCc6ICc8aDMgLz4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdIZWFkZXIgSDQnOiB7XG4gICAgICAgICAgICAgICAgJ2FjdGlvbic6ICdmb3JtYXRibG9jaycsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogJ2g0JyxcbiAgICAgICAgICAgICAgICAnd3JhcCc6ICc8aDQgLz4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdIZWFkZXIgSDUnOiB7XG4gICAgICAgICAgICAgICAgJ2FjdGlvbic6ICdmb3JtYXRibG9jaycsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogJ2g1JyxcbiAgICAgICAgICAgICAgICAnd3JhcCc6ICc8aDUgLz4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdIZWFkZXIgSDYnOiB7XG4gICAgICAgICAgICAgICAgJ2FjdGlvbic6ICdmb3JtYXRibG9jaycsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogJ2g2JyxcbiAgICAgICAgICAgICAgICAnd3JhcCc6ICc8aDYgLz4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdQYXJhZ3JhcGgnOiB7XG4gICAgICAgICAgICAgICAgJ2FjdGlvbic6ICdmb3JtYXRibG9jaycsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogJ3AnLFxuICAgICAgICAgICAgICAgICd3cmFwJzogJzxwIC8+JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnQmxvY2txdW90ZSc6IHtcbiAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2Zvcm1hdGJsb2NrJyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAnYmxvY2txdW90ZScsXG4gICAgICAgICAgICAgICAgJ3dyYXAnOiAnPGJsb2NrcXVvdGUgLz4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdQcmVmb3JtYXR0ZWQnOiB7XG4gICAgICAgICAgICAgICAgJ2FjdGlvbic6ICdmb3JtYXRibG9jaycsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogJ3ByZScsXG4gICAgICAgICAgICAgICAgJ3dyYXAnOiAnPHByZSAvPicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ0RpdiBibG9jayc6IHtcbiAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2Zvcm1hdGJsb2NrJyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiAnZGl2JyxcbiAgICAgICAgICAgICAgICAnd3JhcCc6ICc8ZGl2IC8+JyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZpZGVvU2VydmljZXMgPSB7XG4gICAgICAgICAgICB5b3V0dWJlOiAnWW91VHViZScsXG4gICAgICAgICAgICB2aW1lbzogJ1ZpbWVvJyxcbiAgICAgICAgICAgIGRhaWx5bW90aW9uOiAnRGFpbHltb3Rpb24nLFxuICAgICAgICAgICAgLypodWx1OiAnSHVsdScsXG4gICAgICAgICAgICB0d2l0Y2g6ICdUd2l0Y2gnLFxuICAgICAgICAgICAgZmFjZWJvb2s6ICdGYWNlYm9vaycsXG4gICAgICAgICAgICB2a29udGFrdGU6ICd2S29udGFrdGUnLFxuICAgICAgICAgICAgdHdpdHRlcjogJ1R3aXR0ZXInLFxuICAgICAgICAgICAgdXN0cmVhbTogJ1VzdHJlYW0nLCovXG4gICAgICAgICAgICBzb3VyY2U6ICdTb3VyY2UgbWVkaWEnLFxuICAgICAgICAgICAgLyplbWJlZDogJ0VtYmVkIGNvZGUnKi9cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB1cmxTY2hlbWVzID0ge1xuICAgICAgICAgICAgaHR0cHM6ICdodHRwczovLycsXG4gICAgICAgICAgICBodHRwOiAnaHR0cDovLycsXG4gICAgICAgICAgICBtYWlsdG86ICdtYWlsdG86Ly8nLFxuICAgICAgICAgICAgZnRwOiAnZnRwOi8vJyxcbiAgICAgICAgICAgIGZlZWQ6ICdmZWVkOi8vJyxcbiAgICAgICAgICAgIG5ld3M6ICduZXdzOi8vJyxcbiAgICAgICAgICAgIHRlbDogJ3RlbDonLFxuICAgICAgICAgICAgc2t5cGU6ICdza3lwZTonLFxuICAgICAgICAgICAgdGVsZWdyYW06ICd0ZzovLycsXG4gICAgICAgICAgICB3aGF0c2FwcDogJ3doYXRzYXBwOicsXG4gICAgICAgICAgICB2aWJlcjogJ3ZpYmVyOicsXG4gICAgICAgICAgICBvdGhlcjogJ290aGVyJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHVybExpbmtUYXJnZXQgPSB7XG4gICAgICAgICAgICBibGFuazogJ05ldyB0YWInLFxuICAgICAgICAgICAgdG9wOiAnTWFpbiB0YWInLFxuICAgICAgICAgICAgc2VsZjogJ0N1cnJlbnQgdGFiJyxcbiAgICAgICAgICAgIHBhcmVudDogJ1BhcmVudCB0YWInLFxuICAgICAgICAgICAgLyppZnJhbWU6ICdJZnJhbWUnLFxuICAgICAgICAgICAgcG9wdXA6ICdQb3BVcCcsKi9cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB1cmxMaW5rUmVsID0ge1xuICAgICAgICAgICAgbm9mb2xsb3c6ICdEbyBub3QgZm9sbG93IChmb3Igcm9ib3RzKScsXG4gICAgICAgICAgICBub3JlZmVycmVyOiAnRG8gbm90IHBhc3MgSFRUUC1yZWZlcnJlcicsXG4gICAgICAgICAgICAvKmFyY2hpdmVzOiAnTGluayB0byB0aGUgc2l0ZSBhcmNoaXZlJyxcbiAgICAgICAgICAgIGF1dGhvcjogJ0xpbmsgdG8gdGhlIHBhZ2UgYWJvdXQgdGhlIGF1dGhvciBvbiB0aGUgc2FtZSBkb21haW4nLFxuICAgICAgICAgICAgYm9va21hcms6ICdQZXJtYWxpbmsgdG8gYSBzZWN0aW9uIG9yIHBvc3QnLFxuICAgICAgICAgICAgZmlyc3Q6ICdMaW5rIHRvIHRoZSBmaXJzdCBwYWdlJyxcbiAgICAgICAgICAgIGhlbHA6ICdIZWxwIGRvY3VtZW50IGxpbmsnLFxuICAgICAgICAgICAgaW5kZXg6ICdDb250ZW50IExpbmsnLFxuICAgICAgICAgICAgbGFzdDogJ0xpbmsgdG8gdGhlIGxhc3QgcGFnZScsXG4gICAgICAgICAgICBsaWNlbnNlOiAnTGluayB0byBwYWdlIHdpdGggbGljZW5zZSBhZ3JlZW1lbnQgb3IgY29weXJpZ2h0JyxcbiAgICAgICAgICAgIG1lOiAnTGluayB0byB0aGUgYXV0aG9y4oCZcyBwYWdlIG9uIGFub3RoZXIgZG9tYWluJyxcbiAgICAgICAgICAgIG5leHQ6ICdMaW5rIHRvIHRoZSBuZXh0IHBhZ2Ugb3Igc2VjdGlvbicsXG4gICAgICAgICAgICBwcmVmZXRjaDogJ0luZGljYXRlcyB0aGF0IHRoZSBzcGVjaWZpZWQgcmVzb3VyY2UgbXVzdCBiZSBjYWNoZWQgaW4gYWR2YW5jZS4nLFxuICAgICAgICAgICAgcHJldjogJ0xpbmsgdG8gcHJldmlvdXMgcGFnZSBvciBzZWN0aW9uJyxcbiAgICAgICAgICAgIHNlYXJjaDogJ1NlYXJjaCBMaW5rJyxcbiAgICAgICAgICAgIHNpZGViYXI6ICdBZGQgbGluayB0byBicm93c2VyIGZhdm9yaXRlcycsXG4gICAgICAgICAgICB0YWc6ICdJbmRpY2F0ZXMgdGhhdCB0aGUgbGFiZWwgKHRhZykgaXMgcmVsYXRlZCB0byB0aGUgY3VycmVudCBkb2N1bWVudC4nLFxuICAgICAgICAgICAgdXA6ICdMaW5rIHRvIHRoZSBwYXJlbnQgcGFnZScsXG4gICAgICAgICAgICBhbnN3ZXI6ICdBbnN3ZXIgdG8gdGhlIHF1ZXN0aW9uJyxcbiAgICAgICAgICAgIGNoYXB0ZXI6ICdTZWN0aW9uIG9yIGNoYXB0ZXIgb2YgdGhlIGN1cnJlbnQgZG9jdW1lbnQnLFxuICAgICAgICAgICAgY28td29ya2VyOiAnTGluayB0byBjb2xsZWFndWXigJlzIHBhZ2UnLFxuICAgICAgICAgICAgY29sbGVhZ3VlOiAnTGluayB0byBjb2xsZWFndWXigJlzIHBhZ2UgKG5vdCBmb3Igd29yayknLFxuICAgICAgICAgICAgY29udGFjdDogJ0xpbmsgdG8gdGhlIHBhZ2Ugd2l0aCBjb250YWN0IGluZm9ybWF0aW9uJyxcbiAgICAgICAgICAgIGRldGFpbHM6ICdMaW5rIHRvIHRoZSBwYWdlIHdpdGggZGV0YWlscycsXG4gICAgICAgICAgICBlZGl0OiAnRWRpdGFibGUgdmVyc2lvbiBvZiB0aGUgY3VycmVudCBkb2N1bWVudCcsXG4gICAgICAgICAgICBmcmllbmQ6ICdMaW5rIHRvIGZyaWVuZOKAmXMgcGFnZScsXG4gICAgICAgICAgICBxdWVzdGlvbjogJ0xpbmsgdG8gdGhlIHF1ZXN0aW9uIHBhZ2UnLCovXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIEVkaXRvciA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgZnVuY3Rpb24gRWRpdG9yKCRlbGVtZW50LCBjb25maWcpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgIF9jbGFzc0NhbGxDaGVjayhfdGhpcywgRWRpdG9yKTtcblxuICAgICAgICAgICAgICAgIC8vIE1lcmdlIGRlZmF1bHQgYW5kIGN1c3RvbSBvcHRpb25zXG4gICAgICAgICAgICAgICAgX3RoaXMuX2NvbmZpZyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgY29uZmlnKTtcblxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY29uZmlnLmRlYnVnKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSW5pdCBXWVNJV1lHIGVkaXRvci4uLicpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ29uZmlndXJlIHZhcmlhYmxlc1xuICAgICAgICAgICAgICAgIF90aGlzLl9lZGl0b3JJZCA9ICd3eXNpd3lnLScgKyAoU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMSkpICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMCkpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fJGVsZW1lbnQgPSAkZWxlbWVudCBpbnN0YW5jZW9mIGpRdWVyeSA/ICRlbGVtZW50IDogJCgkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2lucHV0SWQgPSBfdGhpcy5fJGVsZW1lbnQuYXR0cignaWQnKTtcblxuICAgICAgICAgICAgICAgIC8vIFdyYXAgdGV4dCBpbnB1dCB0byBjb250YWluZXJcbiAgICAgICAgICAgICAgICBfdGhpcy5fJGVkaXRvciA9ICQoJzxkaXYgaWQ9XCInICsgX3RoaXMuX2VkaXRvcklkICsgJ1wiIGFyaWEtZGVzY3JpYmVkYnk9XCIjJyArIF90aGlzLl9pbnB1dElkICsgJ1wiIGNsYXNzPVwid3lzaXd5Zy1lZGl0b3JcIiAvPicpO1xuICAgICAgICAgICAgICAgIF90aGlzLl8kZWxlbWVudC53cmFwKF90aGlzLl8kZWRpdG9yKTtcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBjb250ZW50IHRvIGVkaXRvclxuICAgICAgICAgICAgICAgIF90aGlzLl8kY29udGVudCA9ICQoJzxkaXYgY2xhc3M9XCJlZGl0b3ItY29udGVudFwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiAvPicpO1xuICAgICAgICAgICAgICAgIF90aGlzLl8kY29udGVudC5odG1sKF90aGlzLl8kZWxlbWVudC52YWwoKSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuXyRlbGVtZW50LmJlZm9yZShfdGhpcy5fJGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIF90aGlzLl9zb3VyY2UgPSBfdGhpcy5fJGVsZW1lbnQudmFsKCk7XG5cbiAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3BvcG92ZXJJc1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fJGxhc3RGb2N1cyA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgdG9vbGJhciB0byBlZGl0b3JcbiAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIgPSAkKCc8ZGl2IGNsYXNzPVwid3lzaXd5Zy10b29sYmFyIGJ0bi10b29sYmFyXCIgLz4nKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fJGNvbnRlbnQuYmVmb3JlKF90aGlzLl8kdG9vbGJhcik7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgc3RhdHVzYmFyIHRvIGVkaXRvclxuICAgICAgICAgICAgICAgIF90aGlzLl8kc3RhdHVzYmFyID0gJCgnPGRpdiBjbGFzcz1cImVkaXRvci1zdGF0dXNiYXJcIiAvPicpO1xuICAgICAgICAgICAgICAgIF90aGlzLl8kc3RhdHVzYmFyLnN0YXQgPSAkKCc8c3BhbiBjbGFzcz1cImVkaXRvci1zdGF0dXNiYXItc3RhdFwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgX3RoaXMuXyRzdGF0dXNiYXIucGF0aCA9ICQoJzxzcGFuIGNsYXNzPVwiZWRpdG9yLXN0YXR1c2Jhci1wYXRoXCIgLz4nKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fJHN0YXR1c2Jhci5hcHBlbmQoX3RoaXMuXyRzdGF0dXNiYXIuc3RhdCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuXyRzdGF0dXNiYXIuYXBwZW5kKF90aGlzLl8kc3RhdHVzYmFyLnBhdGgpO1xuICAgICAgICAgICAgICAgIF90aGlzLl8kY29udGVudC5hZnRlcihfdGhpcy5fJHN0YXR1c2Jhcik7XG5cbiAgICAgICAgICAgICAgICAvLyBIaWRlIGlucHV0IGVkaXRvclxuICAgICAgICAgICAgICAgIF90aGlzLl8kZWxlbWVudC5hZGRDbGFzcygnaGlkZScpO1xuXG4gICAgICAgICAgICAgICAgLy8gQnVpbGQgdG9vbGJhciBieSBjb25maWdcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgKF90aGlzLl9jb25maWcudG9vbGJhcikgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKF90aGlzLl9jb25maWcudG9vbGJhciwgZnVuY3Rpb24gKGluZGV4LCBlbGVtKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdG9vbGJhciA9ICQoJzxkaXYgaWQ9XCJ0b29sYmFyR3JvdXAtJyArIGVsZW1bMF0gKyAnXCIgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIiAvPicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzBdID09PSAnbW9kZScpIHsgLy8gRWRpdG9yIG1vZGUgc3dpdGNoZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlZGl0b3JCdXR0b24gPSBfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdtb2RlJywgJ2VkaXRvcicsIFwiZmEgZmEtZXllXCIsIG51bGwsIFwiRWRpdG9yXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdXR0b24gPSBfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdtb2RlJywgJ3NvdXJjZScsIFwiZmEgZmEtY29kZVwiLCBudWxsLCBcIlNvdXJjZVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKF90aGlzLl9jb25maWcubW9kZSA9PSAnZWRpdG9yJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yQnV0dG9uLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZUJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoZWRpdG9yQnV0dG9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoc291cmNlQnV0dG9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGVsZW1bMF0gPT09ICdvcGVyYXRpb25zJykgeyAvLyBPcGVyYXRpb25zIGVkaXRvciBjb250cm9sc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ29wZXJhdGlvbnMnLCAndW5kbycsIFwiZmEgZmEtcmVwbHlcIiwgbnVsbCwgXCJVbmRvXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignb3BlcmF0aW9ucycsICdyZW5kbycsIFwiZmEgZmEtc2hhcmVcIiwgbnVsbCwgXCJSZW5kb1wiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ29wZXJhdGlvbnMnLCAnY3V0JywgXCJmYSBmYS1jdXRcIiwgbnVsbCwgXCJDdXRcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdvcGVyYXRpb25zJywgJ2NvcHknLCBcImZhIGZhLWNvcHlcIiwgbnVsbCwgXCJDb3B5XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignb3BlcmF0aW9ucycsICdwYXN0ZScsIFwiZmEgZmEtY2xpcGJvYXJkXCIsIG51bGwsIFwiUGFzdGVcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZWxlbVswXSA9PT0gJ3N0eWxlcycpIHsgLy8gRWRpdG9yIG1vZGUgc3dpdGNoZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyRHJvcGRvd24oJ3NlbGVjdC1zdHlsZScsIFN0eWxlcywgXCJQYXJhZ3JhcGhcIiwgXCJUZXh0IHN0eWxlXCIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGVsZW1bMF0gPT09ICdmb250cycpIHsgLy8gRm9udCBzZWxlY3QgYW5kIHNpemVcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignc2VsZWN0JywgMCkgIT09IC0xKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvbnRzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChfdGhpcy5fY29uZmlnLmZvbnRGYW1pbGllcywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250c1t2YWx1ZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FjdGlvbic6ICdmb250bmFtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0eWxlJzogXCJmb250LWZhbWlseTogXCIgKyB2YWx1ZSArIFwiO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckRyb3Bkb3duKCdmb250LXNlbGVjdCcsIGZvbnRzLCBfdGhpcy5fY29uZmlnLmZvbnRGYW1pbHlEZWZhdWx0LCBcIkZvbnQgZmFtaWx5XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ3NpemUnLCAwKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNpemVzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChfdGhpcy5fY29uZmlnLmZvbnRTaXplcywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplc1t2YWx1ZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FjdGlvbic6ICdmb250c2l6ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckRyb3Bkb3duKCdmb250LXNpemUnLCBzaXplcywgX3RoaXMuX2NvbmZpZy5mb250U2l6ZURlZmF1bHQsIFwiRm9udCBzaXplXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlbGVtWzBdID09PSAndGV4dCcpIHsgLy8gVGV4dCBkZWNvcmF0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ2JvbGQnLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCd0ZXh0JywgJ2JvbGQnLCBcImZhIGZhLWJvbGRcIiwgbnVsbCwgXCJCb2xkXCIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignaXRhbGljJywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbigndGV4dCcsICdpdGFsaWMnLCBcImZhIGZhLWl0YWxpY1wiLCBudWxsLCBcIkl0YWxpY1wiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ3VuZGVybGluZScsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ3RleHQnLCAndW5kZXJsaW5lJywgXCJmYSBmYS11bmRlcmxpbmVcIiwgbnVsbCwgXCJVbmRlcmxpbmVcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdzdHJpa2UnLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCd0ZXh0JywgJ3N0cmlrZScsIFwiZmEgZmEtc3RyaWtldGhyb3VnaFwiLCBudWxsLCBcIlN0cmlrZWQgdGV4dFwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ3N1YnNjcmlwdCcsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ3RleHQnLCAnc3Vic2NyaXB0JywgXCJmYSBmYS1zdWJzY3JpcHRcIiwgbnVsbCwgXCJTdWJzY3JpcHRcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdzdXBlcnNjcmlwdCcsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ3RleHQnLCAnc3VwZXJzY3JpcHQnLCBcImZhIGZhLXN1cGVyc2NyaXB0XCIsIG51bGwsIFwiU3VwZXJzY3JpcHRcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdiZy1jb2xvcicsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ3RleHQnLCAnZm9udC1jb2xvcicsIFwiZmEgZmEtZm9udFwiLCBudWxsLCBcIkZvbnQgY29sb3JcIiwgX3RoaXMuX2J1aWxkQ29sb3JQYWxldHRlKF90aGlzLl9jb25maWcuY29sb3JQYWxldHRlLCBcImZvbnQtY29sb3JcIiwgbnVsbCkpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignYmctY29sb3InLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCd0ZXh0JywgJ2JnLWNvbG9yJywgXCJmYSBmYS1wYWludC1icnVzaFwiLCBudWxsLCBcIkJhY2tncm91bmQgY29sb3JcIiwgX3RoaXMuX2J1aWxkQ29sb3JQYWxldHRlKF90aGlzLl9jb25maWcuY29sb3JQYWxldHRlLCBcImJnLWNvbG9yXCIsIHRydWUpKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlbGVtWzBdID09PSAnYWxpZ24nKSB7IC8vIFRleHQgYWxpZ21lbnRcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignbGVmdCcsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2FsaWduJywgJ2xlZnQnLCBcImZhIGZhLWFsaWduLWxlZnRcIiwgbnVsbCwgXCJBbGlnbiBsZWZ0XCIsIG51bGwpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignY2VudGVyJywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignYWxpZ24nLCAnY2VudGVyJywgXCJmYSBmYS1hbGlnbi1jZW50ZXJcIiwgbnVsbCwgXCJBbGlnbiBjZW50ZXJcIiwgbnVsbCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdyaWdodCcsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2FsaWduJywgJ3JpZ2h0JywgXCJmYSBmYS1hbGlnbi1yaWdodFwiLCBudWxsLCBcIkFsaWduIHJpZ2h0XCIsIG51bGwpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignanVzdGlmeScsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2FsaWduJywgJ2p1c3RpZnknLCBcImZhIGZhLWFsaWduLWp1c3RpZnlcIiwgbnVsbCwgXCJKdXN0aWZ5IGNvbnRlbnRcIiwgbnVsbCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZWxlbVswXSA9PT0gJ2xpc3RzJykgeyAvLyBMaXN0cyAmJiBvdXRkZW50XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ3Vub3JkZXJlZCcsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2xpc3RzJywgJ3Vub3JkZXJlZCcsIFwiZmEgZmEtbGlzdC11bFwiLCBudWxsLCBcIlVub3JkZXJlZCBsaXN0XCIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignb3JkZXJlZCcsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2xpc3RzJywgJ29yZGVyZWQnLCBcImZhIGZhLWxpc3Qtb2xcIiwgbnVsbCwgXCJPcmRlcmVkIGxpc3RcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdpbmRlbnQnLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdsaXN0cycsICdpbmRlbnQnLCBcImZhIGZhLWluZGVudFwiLCBudWxsLCBcIkluZGVudFwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ291dGRlbnQnLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdsaXN0cycsICdvdXRkZW50JywgXCJmYSBmYS1vdXRkZW50XCIsIG51bGwsIFwiT3V0ZGVudFwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlbGVtWzBdID09PSAnY29tcG9uZW50cycpIHsgLy8gQ29tcG9uZW50c1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCd0YWJsZScsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2NvbXBvbmVudHMnLCAndGFibGUnLCBcImZhIGZhLXRhYmxlXCIsIG51bGwsIFwiSW5zZXJ0IHRhYmxlXCIsIF90aGlzLl9idWlsZFRhYmxlR3JpZCgpKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ2NoYXJ0JywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignY29tcG9uZW50cycsICdjaGFydCcsIFwiZmEgZmEtcGllLWNoYXJ0XCIsIG51bGwsIFwiQWRkIGNoYXJ0XCIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGVsZW1bMF0gPT09ICdpbnRlcnZhbHMnKSB7IC8vIFRleHQgcHJvcGVydGllc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCdsaW5lLWhlaWdodCcsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2ludGVydmFsJywgJ2xpbmUtaGVpZ2h0JywgXCJmYSBmYS10ZXh0LWhlaWdodFwiLCBudWxsLCBcIkxpbmVzIGludGVydmFsXCIsIF90aGlzLl9idWlsZExpbmVIZWlnaHRMaXN0KCkpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignbGV0dGVyLXNwYWNpbmcnLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdpbnRlcnZhbCcsICdsZXR0ZXItc3BhY2luZycsIFwiZmEgZmEtdGV4dC13aWR0aFwiLCBudWxsLCBcIkxldHRlciBzcGFjaW5nXCIsIF90aGlzLl9idWlsZExldHRlclNwYWNpbmdMaXN0KCkpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGVsZW1bMF0gPT09ICdpbnNlcnQnKSB7IC8vIEluc2VydHNcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignZW1vamknLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdpbnNlcnQnLCAnZW1vamknLCBcImZhIGZhLXNtaWxlIGZhLXNtaWxlLW9cIiwgbnVsbCwgXCJBZGQgZW1vamlcIiwgX3RoaXMuX2J1aWxkRW1vamlMaXN0KCkpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignbGluaycsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2luc2VydCcsICdsaW5rJywgXCJmYSBmYS1saW5rXCIsIG51bGwsIFwiQWRkIFVSTFwiLCBfdGhpcy5fYnVpbGRVcmxGb3JtKCdsaW5rJykpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignaW1hZ2UnLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdpbnNlcnQnLCAnaW1hZ2UnLCBcImZhIGZhLWltYWdlXCIsIG51bGwsIFwiQWRkIGltYWdlXCIsIF90aGlzLl9idWlsZFVybEZvcm0oJ2ltYWdlJykpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZigndmlkZW8nLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdpbnNlcnQnLCAndmlkZW8nLCBcImZhIGZhLXZpZGVvLWNhbWVyYSBmYS12aWRlb1wiLCBudWxsLCBcIkFkZCB2aWRlb1wiLCBfdGhpcy5fYnVpbGRVcmxGb3JtKCd2aWRlbycpKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ3N5bWJvbCcsIDApICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYXBwZW5kKF90aGlzLl9idWlsZFRvbGxiYXJCdXR0b24oJ2luc2VydCcsICdzeW1ib2wnLCBcImZhIGZhLWhhc2h0YWdcIiwgbnVsbCwgXCJBZGQgc3ltYm9sXCIsIF90aGlzLl9idWlsZFN5bWJvbHNMaXN0KCkpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZignYm9va21hcmsnLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdpbnNlcnQnLCAnYm9va21hcmsnLCBcImZhIGZhLWJvb2ttYXJrXCIsIG51bGwsIFwiQWRkIGJvb2ttYXJrXCIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGVsZW1bMF0gPT09ICdzcGVjaWFsJykgeyAvLyBJbnNlcnRzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ3ByaW50JywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignc3BlY2lhbCcsICdwcmludCcsIFwiZmEgZmEtcHJpbnRcIiwgbnVsbCwgXCJQcmludFwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtWzFdLmluZGV4T2YoJ2NsZWFuJywgMCkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignc3BlY2lhbCcsICdjbGVhbicsIFwiZmEgZmEtZXJhc2VyXCIsIG51bGwsIFwiRXJhc2Ugc3R5bGVcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbVsxXS5pbmRleE9mKCd2aXN1YWwnLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdzcGVjaWFsJywgJ3Zpc3VhbCcsIFwiZmEgZmEtc29sYXItcGFuZWxcIiwgbnVsbCwgXCJWaXN1YWwgYmxvY2tzXCIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1bMV0uaW5kZXhPZigndW5mb3JtYXQnLCAwKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0b29sYmFyLmFwcGVuZChfdGhpcy5fYnVpbGRUb2xsYmFyQnV0dG9uKCdzcGVjaWFsJywgJ3VuZm9ybWF0JywgXCJmYSBmYS10cmFzaC1vIGZhLXRyYXNoLWFsdFwiLCBudWxsLCBcIkNsZWFyIEhUTUxcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZWxlbVswXSA9PT0gJ2Z1bGxzY3JlZW4nKSB7IC8vIEZ1bGxzY3JlZW4gbW9kZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRvb2xiYXIuYWRkQ2xhc3MoJ3B1bGwtcmlnaHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdG9vbGJhci5hcHBlbmQoX3RoaXMuX2J1aWxkVG9sbGJhckJ1dHRvbignZnVsbHNjcmVlbicsIHRydWUsIFwiZmEgZmEtYXJyb3dzLWFsdFwiLCBudWxsLCBcIkZ1bGxzY3JlZW4gbW9kZVwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmFwcGVuZCgkdG9vbGJhcik7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gU2V0IGJlaGF2aW9yIGZvciB0b29sYmFyIGJ1dHRvbnNcbiAgICAgICAgICAgICAgICBpZihfdGhpcy5fJHRvb2xiYXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5vbignY2xpY2snLCAnW2RhdGEtYWN0aW9uXScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0gJHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSBfdGhpcy5fc2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gJHRhcmdldC5kYXRhKCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSAkdGFyZ2V0LmRhdGEoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoYWN0aW9uKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mICh2YWx1ZSkgIT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2NvbmZpZy5kZWJ1ZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N3aXRjaCBhY3Rpb246IGAnICsgYWN0aW9uICsgJ2Agd2l0aCB2YWx1ZTogYCcgKyB2YWx1ZSArICdgJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vZGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VkaXRvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY29uZmlnLm1vZGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fY29uZmlnLm1vZGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kY29udGVudC5odG1sKF90aGlzLl9zb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cIm1vZGVcIl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwibW9kZVwiXVtkYXRhLXZhbHVlPVwiZWRpdG9yXCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50LmFkZENsYXNzKCdlZGl0b3ItbW9kZScpLnJlbW92ZUNsYXNzKCdzb3VyY2UtbW9kZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnLmJ0bi1ncm91cCcpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc291cmNlJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnLmJ0bi1ncm91cCcpLm5vdCgnI3Rvb2xiYXJHcm91cC0nICsgYWN0aW9uKS5hZGRDbGFzcygnaGlkZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY29uZmlnLm1vZGUgIT09IHZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9jb25maWcubW9kZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3NvdXJjZSA9IF90aGlzLl8kY29udGVudC5odG1sKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkc291cmNlID0gJCgnPHByZSAvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNvdXJjZS50ZXh0KF90aGlzLl9zb3VyY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJGNvbnRlbnQuaHRtbChfdGhpcy5fdHJpbVNvdXJjZSgkc291cmNlLmh0bWwoKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2NvbmZpZy5oaWdobGlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobGpzLmluaXRIaWdobGlnaHRpbmcuY2FsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxqcy5jb25maWd1cmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VCUjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VzOiBbJ2h0bWwnLCAnamF2YXNjcmlwdCcsICdjc3MnXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhsanMuaGlnaGxpZ2h0QmxvY2soX3RoaXMuXyRjb250ZW50LmdldCgwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJtb2RlXCJdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cIm1vZGVcIl1bZGF0YS12YWx1ZT1cInNvdXJjZVwiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50LnJlbW92ZUNsYXNzKCdlZGl0b3ItbW9kZScpLmFkZENsYXNzKCdzb3VyY2UtbW9kZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdmb3JtYXRibG9jayc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdmb3JtYXRibG9jaycsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZvbnRuYW1lJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ2ZvbnRuYW1lJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZm9udHNpemUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3NlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwic2l6ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9zZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHlsZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3R5bGVzID0gX3RoaXMuX3NlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQuc3R5bGUuY3NzVGV4dDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3R5bGVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlcyArPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXMgPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3NlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5zdHlsZSA9IHN0eWxlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bGxzY3JlZW4nOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2NvbmZpZy5kZWJ1ZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRmlyZSBhY3Rpb246ICcgKyBhY3Rpb24gKyAnIHdpdGggdmFsdWU6ICcgKyB2YWx1ZSArICcgaXMgbm90IHN1cHBvcnRlZC4nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnb3BlcmF0aW9ucyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndW5kbyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ3VuZG8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZW5kbyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ3JlbmRvJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2N1dCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ2N1dCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvcHknOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdjb3B5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFzdGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdwYXN0ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JvbGQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdib2xkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaXRhbGljJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygnaXRhbGljJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndW5kZXJsaW5lJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygndW5kZXJsaW5lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaWtlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygnc3RyaWtlVGhyb3VnaCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N1YnNjcmlwdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ3N1YnNjcmlwdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N1cGVyc2NyaXB0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygnc3VwZXJzY3JpcHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZvbnQtY29sb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodmFsdWUgPT0gJ3Vuc2V0Jykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMuX3NlbGVjdGlvbi5hbmNob3JOb2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMuX3NlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQuc3R5bGUubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwidGV4dFwiXVtkYXRhLXZhbHVlPVwiZm9udC1jb2xvclwiXSA+IHNwYW4nKS5jc3MoJ2JvcmRlci1ib3R0b20tY29sb3InLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygnZm9yZUNvbG9yJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYmctY29sb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodmFsdWUgPT0gJ3Vuc2V0Jykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMuX3NlbGVjdGlvbi5hbmNob3JOb2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMuX3NlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQuc3R5bGUubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwidGV4dFwiXVtkYXRhLXZhbHVlPVwiYmctY29sb3JcIl0gPiBzcGFuJykuY3NzKCdib3JkZXItYm90dG9tLWNvbG9yJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ2hpbGl0ZUNvbG9yJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYWxpZ24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdqdXN0aWZ5TGVmdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ2p1c3RpZnlDZW50ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ2p1c3RpZnlSaWdodCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2p1c3RpZnknOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdqdXN0aWZ5RnVsbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGlzdHMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Vub3JkZXJlZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ2luc2VydFVub3JkZXJlZExpc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvcmRlcmVkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygnaW5zZXJ0T3JkZXJlZExpc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpbmRlbnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdpbmRlbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvdXRkZW50JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygnb3V0ZGVudCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2luc2VydC10YWJsZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHZhbHVlLnNwbGl0KCd8JywgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRwYXJlbnQgPSAkKF90aGlzLl9zZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IF90aGlzLl9nZW5lcmF0ZVRhYmxlKHBhcnNlRmxvYXQob3B0aW9uc1swXSksIHBhcnNlRmxvYXQob3B0aW9uc1syXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWZ0ZXIoY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjb21wb25lbnRzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NoYXJ0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9jb25maWcuZGVidWcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRmlyZSBhY3Rpb246ICcgKyBhY3Rpb24gKyAnIHdpdGggdmFsdWU6ICcgKyB2YWx1ZSArICcgaXMgbm90IHN1cHBvcnRlZC4nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xpbmUtaGVpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKF90aGlzLl9zZWxlY3Rpb24uYW5jaG9yTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5lSGVpZ2h0ID0gcGFyc2VGbG9hdCh2YWx1ZSkgKiAxMDAgKyBcIiVcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUZsb2F0KHZhbHVlKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5zdHlsZS5saW5lSGVpZ2h0ID0gXCJpbmhlcml0XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudC5zdHlsZS5saW5lSGVpZ2h0ID0gbGluZUhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xldHRlci1zcGFjaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKF90aGlzLl9zZWxlY3Rpb24uYW5jaG9yTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZXR0ZXJTcGFjaW5nID0gcGFyc2VGbG9hdCh2YWx1ZSkgKyBcInB4XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VGbG9hdCh2YWx1ZSkgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3NlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQuc3R5bGUubGV0dGVyU3BhY2luZyA9IFwiaW5oZXJpdFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3NlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQuc3R5bGUubGV0dGVyU3BhY2luZyA9IGxldHRlclNwYWNpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FkZC11cmwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSBfdGhpcy5fc2VsZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfdGhpcy5fc2VsZWN0aW9uICYmIHRleHQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnNjaGVtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zY2hlbWUgPT0gJ2h0dHBzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovLycgKyB1cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEuc2NoZW1lID09ICdodHRwJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwOi8vJyArIHVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS5zY2hlbWUgPT0gJ21haWx0bycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnbWFpbHRvOi8vJyArIHVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS5zY2hlbWUgPT0gJ2Z0cCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnZnRwOi8vJyArIHVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS5zY2hlbWUgPT0gJ2ZlZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2ZlZWQ6Ly8nICsgdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLnNjaGVtZSA9PSAnbmV3cycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnbmV3czovLycgKyB1cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEuc2NoZW1lID09ICd0ZWwnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ3RlbDonICsgdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLnNjaGVtZSA9PSAnc2t5cGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ3NreXBlOicgKyB1cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEuc2NoZW1lID09ICd0ZycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAndGc6Ly8nICsgdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLnNjaGVtZSA9PSAnd2hhdHNhcHAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ3doYXRzYXBwOicgKyB1cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEuc2NoZW1lID09ICd2aWJlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAndmliZXI6JyArIHVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGl0bGUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA9ICcgdGl0bGU9XCInICsgZGF0YS50aXRsZSArICdcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmNsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICcgY2xhc3M9XCInICsgZGF0YS5jbGFzcyArICdcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS50YXJnZXQgPT0gJ2JsYW5rJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9ICcgdGFyZ2V0PVwiX2JsYW5rXCInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLnRhcmdldCA9PSAndG9wJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9ICcgdGFyZ2V0PVwiX3RvcFwiJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50YXJnZXQgPT0gJ3NlbGYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gJyB0YXJnZXQ9XCJfc2VsZlwiJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50YXJnZXQgPT0gJ3BhcmVudCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSAnIHRhcmdldD1cIl9wYXJlbnRcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlbGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlbGF0aW9uID09ICdub2ZvbGxvdycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWwgPSAnIHJlbD1cIm5vZm9sbG93XCInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLnJlbGF0aW9uID09ICdub3JlZmVycmVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbCA9ICcgcmVsPVwibm9yZWZlcnJlclwiJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGxpbmsgPSAkKCc8YSBocmVmPVwiJyArIHVybCArICdcIicgKyB0aXRsZSArIGNsYXNzTmFtZSArIHRhcmdldCArIHJlbCArICcgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbGluay50ZXh0KHRleHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gX3RoaXMuX3NlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZSgkbGluay5nZXQoMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYWRkLXZpZGVvJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKF90aGlzLl9zZWxlY3Rpb24gJiYgdmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnNlcnZpY2UgPT0gJ3lvdXR1YmUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlkZW9JZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVnRXhwID0gL14uKih5b3V0dWJlXFwvfHlvdXR1LmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fFxcJnY9KShbXiNcXCZcXD9dKikuKi87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSB1cmwubWF0Y2gocmVnRXhwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoICE9PSBudWxsICYmIG1hdGNoWzJdLmxlbmd0aCA9PSAxMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0lkID0gbWF0Y2hbMl07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aWRlb0lkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICsgdmlkZW9JZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuc2VydmljZSA9PSAndmltZW8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlkZW9JZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVnRXhwID0gLyg/Ond3d1xcLnxwbGF5ZXJcXC4pP3ZpbWVvLmNvbVxcLyg/OmNoYW5uZWxzXFwvKD86XFx3K1xcLyk/fGdyb3Vwc1xcLyg/OlteXFwvXSopXFwvdmlkZW9zXFwvfGFsYnVtXFwvKD86XFxkKylcXC92aWRlb1xcL3x2aWRlb1xcL3wpKFxcZCspKD86W2EtekEtWjAtOV9cXC1dKyk/L2k7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSB1cmwubWF0Y2gocmVnRXhwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoICE9PSBudWxsICYmIG1hdGNoWzFdLmxlbmd0aCA9PSA5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSWQgPSBtYXRjaFsxXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZpZGVvSWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8nICsgbWF0Y2hbMV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnNlcnZpY2UgPT0gJ2RhaWx5bW90aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZGVvSWQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZ0V4cCA9IC9eLitkYWlseW1vdGlvbi5jb21cXC8odmlkZW98aHViKVxcLyhbXl9dKylbXiNdKigjdmlkZW89KFteXyZdKykpPy87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSB1cmwubWF0Y2gocmVnRXhwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoWzRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9JZCA9IG1hdGNoWzRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0lkID0gbWF0Y2hbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aWRlb0lkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICdodHRwczovL3d3dy5kYWlseW1vdGlvbi5jb20vZW1iZWQvdmlkZW8vJyArIHZpZGVvSWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZW1iZWQgPSAkKCc8ZGl2IGNsYXNzPVwiZW1iZWQtcmVzcG9uc2l2ZSBlbWJlZC1yZXNwb25zaXZlLTE2Ynk5XCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8aWZyYW1lIGNsYXNzPVwiZW1iZWQtcmVzcG9uc2l2ZS1pdGVtXCIgc3JjPVwiJyArIHVybCArICdcIj48L2lmcmFtZT4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gX3RoaXMuX3NlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZSgkZW1iZWQuZ2V0KDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FkZC1pbWFnZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfdGhpcy5fc2VsZWN0aW9uICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbWFnZSA9ICQoJzxpbWcgc3JjPVwiJyArIHZhbHVlICsgJ1wiIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gX3RoaXMuX3NlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZSgkaW1hZ2UuZ2V0KDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2luc2VydC1odG1sJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9mb3JtYXREb2MoJ2luc2VydEhUTUwnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzcGVjaWFsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwcmludCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9wcmludERvYygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygncmVtb3ZlRm9ybWF0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndmlzdWFsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl8kY29udGVudC5oYXNDbGFzcygndmlzdWFsJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJzcGVjaWFsXCJdW2RhdGEtdmFsdWU9XCJ2aXN1YWxcIl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJGNvbnRlbnQucmVtb3ZlQ2xhc3MoJ3Zpc3VhbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwic3BlY2lhbFwiXVtkYXRhLXZhbHVlPVwidmlzdWFsXCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyRjb250ZW50LmFkZENsYXNzKCd2aXN1YWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kY29udGVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndW5mb3JtYXQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZm9ybWF0RG9jKCdzZWxlY3RBbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Zvcm1hdERvYygncmVtb3ZlRm9ybWF0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdHJpbmcgPSBfdGhpcy5fJGNvbnRlbnQuaHRtbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgPSBfdGhpcy5fc3RyaXBUYWdzKHN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oXFxyXFxufFxcbnxcXHIpL2csICc8IS0tIGJyIC0tPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvPCEtLSBiciAtLT4vZywgJzxici8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kY29udGVudC5odG1sKHN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY29uZmlnLmRlYnVnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignVW5yZWNvZ25pemVkIGFjdGlvbjogJyArIGFjdGlvbiArICcgd2l0aCB2YWx1ZTogJyArIHZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gT24gc2VsZWN0ZWQgY29udGVudFxuICAgICAgICAgICAgICAgIF90aGlzLl8kY29udGVudC5vbignbW91c2V1cCBjbGljayBmb2N1cycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9wb3BvdmVySXNWaXNpYmxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2hpZGVBbGxQb3BvdmVycygpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQudHlwZSAhPT0gXCJ0ZXh0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9zZWxlY3Rpb24uZ2V0UmFuZ2VBdCAmJiBfdGhpcy5fc2VsZWN0aW9uLnJhbmdlQ291bnQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9zZWxlY3Rpb24ucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJChfdGhpcy5fc2VsZWN0aW9uLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl91cGRhdGVTdGF0ZSgkdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX3RoaXMuX3NlbGVjdGlvbi5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKF90aGlzLl9zZWxlY3Rpb24ucGFyZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3VwZGF0ZVN0YXRlKCR0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9jb25maWcuZGVidWcpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ3VycmVudCBzZWxlY3Rpb246ICcsIF90aGlzLl9zZWxlY3Rpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdXBkYXRlU3RhdGUoJHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gT24gY2xpY2sgb3Iga2V5ZG93biBmcm9tIGNvbnRlbnQgYXJlYVxuICAgICAgICAgICAgICAgIF90aGlzLl8kY29udGVudC5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMuX3BvcG92ZXJJc1Zpc2libGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5faGlkZUFsbFBvcG92ZXJzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZXZlbnQudGFyZ2V0LnR5cGUgIT09IFwidGV4dFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3NlbGVjdGlvbiA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fc2VsZWN0aW9uLmdldFJhbmdlQXQgJiYgX3RoaXMuX3NlbGVjdGlvbi5yYW5nZUNvdW50KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fc2VsZWN0aW9uLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHRhcmdldCA9ICQoX3RoaXMuX3NlbGVjdGlvbi5wYXJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdXBkYXRlU3RhdGUoJHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF90aGlzLl9zZWxlY3Rpb24ucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJChfdGhpcy5fc2VsZWN0aW9uLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl91cGRhdGVTdGF0ZSgkdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdXBkYXRlU3RhdGUoJHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY29uZmlnLmRlYnVnKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0tleWRvd24gZmlyZWQ6ICcgKyBldmVudC5rZXlDb2RlKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gT24gY29udGVudCBjaGFuZ2VcbiAgICAgICAgICAgICAgICBfdGhpcy5fJGNvbnRlbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY29uZmlnLm1vZGUgPT0gJ2VkaXRvcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3NvdXJjZSA9ICR0aGlzLmh0bWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc291cmNlID0gJHRoaXMudGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChfdGhpcy5fJGVsZW1lbnQpLmlzKFwidGV4dGFyZWFcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyRlbGVtZW50Lmh0bWwoX3RoaXMuX3NvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyRlbGVtZW50LnZhbChfdGhpcy5fc291cmNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9jb25maWcuZGVidWcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvbnRlbnQgY2hhbmdlLi4uJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIE9uIGNvbnRlbnQgbG9zdCBmb2N1c1xuICAgICAgICAgICAgICAgIF90aGlzLl8kY29udGVudC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl8kbGFzdEZvY3VzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3NlbGVjdGlvbiA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2NvbmZpZy5kZWJ1ZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb250ZW50IGxvc3QgZm9jdXM6ICcsIF90aGlzLl9zZWxlY3Rpb24pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBTZXQgZm9jdXMgb24gY29udGVudFxuICAgICAgICAgICAgICAgIF90aGlzLl8kY29udGVudC5mb2N1cygpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9jcmVhdGVDbGFzcyhFZGl0b3IsIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBlbGVtZW50KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5fJGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9yZXBsYWNlQWxsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXBsYWNlQWxsKHNlYXJjaCwgcmVwbGFjZSwgc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLnNwbGl0KHNlYXJjaCkuam9pbihyZXBsYWNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX3N0cmlwVGFnczoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RyaXBUYWdzKHN0cmluZywgdGFncykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5LCBhbGxvd2VkX3RhZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWdzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93ZWRfdGFncyA9IHRhZ3MubWF0Y2goLyhbYS16QS1aXSspL2dpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3RyaW5nKSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nID0gc3RyaW5nLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gc3RyaW5nLm1hdGNoKC8oPFxcLz9bXFxTXVtePl0qPikvZ2kpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBtYXRjaGVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaHRtbCA9IG1hdGNoZXNba2V5XS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbGxvd2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBhbGxvd2VkX3RhZ3MpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFnID0gYWxsb3dlZF90YWdzW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gaHRtbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJzwnKyB0YWcgKyc+Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBodG1sLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignPCcrIHRhZyArJyAnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGh0bWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKCc8LycrIHRhZyApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWxsb3dlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nID0gdGhpcy5fcmVwbGFjZUFsbChodG1sLCBcIlwiLCBzdHJpbmcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF90cmltU291cmNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB0cmltU291cmNlKHN0cikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcc3s0LH0vZywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFx0L2csICcgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIudG9TdHJpbmcoKS50cmltKCkucmVwbGFjZSgvKFxcclxcbnxcXG58XFxyKS9nLFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2dldFBhdGg6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFBhdGgobm9kZSwgdW50aWwsIHdpdGhOb2Rlcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCwgdGFncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZVswXS5pc0VxdWFsTm9kZSh1bnRpbFswXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlYWxOb2RlID0gbm9kZVswXSwgbmFtZSA9IHJlYWxOb2RlLmxvY2FsTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnRzVW50aWwodW50aWwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2l0aE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzYW1lVGFnU2libGluZ3MgPSBwYXJlbnQuY2hpbGRyZW4obmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzYW1lVGFnU2libGluZ3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFsbFNpYmxpbmdzID0gcGFyZW50LmNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBhbGxTaWJsaW5ncy5pbmRleChyZWFsTm9kZSkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgKz0gJzpudGgtY2hpbGQoJyArIGluZGV4ICsgJyknO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFncy5wdXNoKG5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gJChyZWFsTm9kZSkuYXR0cihcImlkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSArPSBcIiNcIiArIGlkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsYXNzbmFtZSA9ICQocmVhbE5vZGUpLmF0dHIoXCJjbGFzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NuYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lICs9IFwiLlwiICsgY2xhc3NuYW1lLnJlcGxhY2UoL1xcLi9nLCAnLicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aCA9IG5hbWUgKyAocGF0aCA/ICcgPiAnICsgcGF0aCA6ICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnczogdGFnc1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2dldFRleHRTdGF0OiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRUZXh0U3RhdChlbCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd29yZHMgPSAwLCBsZW5ndGggPSAwLCBjaGFycyA9IDAsIG5vcm1hbGl6ZWRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0NvbnRlbnRFZGl0YWJsZSA9IGVsICYmIGVsLmNvbnRlbnRFZGl0YWJsZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29udGVudEVkaXRhYmxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRWYWx1ZSA9IGVsLmlubmVyVGV4dC5yZXBsYWNlKC9cXHJcXG4vZywgXCJcXG5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplZFZhbHVlID0gZWwudmFsdWUucmVwbGFjZSgvXFxyXFxuL2csIFwiXFxuXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JkcyA9IHRoaXMuX3N0cmlwVGFncyhub3JtYWxpemVkVmFsdWUpLnNwbGl0KCcgJykubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gbm9ybWFsaXplZFZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzID0gdGhpcy5fdHJpbVNvdXJjZShub3JtYWxpemVkVmFsdWUucmVwbGFjZSgvXFxzL2csIFwiXCIpKS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29yZHM6IHdvcmRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDogbGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzOiBjaGFyc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfZ2V0VGV4dFBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDdXJzb3JQb3NpdGlvbihlbCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGluZSA9IDAsIHN0YXJ0ID0gMCwgZW5kID0gMCwgc2VsZWN0ZWQgPSAwLCBub3JtYWxpemVkVmFsdWUsIHJhbmdlLCB0ZXh0SW5wdXRSYW5nZSwgbGVuLCBlbmRSYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0NvbnRlbnRFZGl0YWJsZSA9IGVsICYmIGVsLmNvbnRlbnRFZGl0YWJsZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwic2VsZWN0aW9uU3RhcnRcIiBpbiBlbCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09IGVsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IGVsLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IGVsLnNlbGVjdGlvbkVuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVkVmFsdWUgPSBlbC52YWx1ZS5yZXBsYWNlKC9cXHJcXG4vZywgXCJcXG5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSA9IG5vcm1hbGl6ZWRWYWx1ZS5zdWJzdHIoMCwgZWwuc2VsZWN0aW9uU3RhcnQpLnNwbGl0KFwiXFxuXCIpLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0NvbnRlbnRFZGl0YWJsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKS5lbmRPZmZzZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVkVmFsdWUgPSBlbC5pbm5lclRleHQucmVwbGFjZSgvXFxyXFxuL2csIFwiXFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUgPSAobm9ybWFsaXplZFZhbHVlLnN1YnN0cigwLCBlbC5zZWxlY3Rpb25TdGFydCkuc3BsaXQoXCJcXG5cIikubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihsaW5lID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUgPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLl9zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYW5nZSAmJiByYW5nZS5wYXJlbnRFbGVtZW50KCkgPT0gZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gZWwudmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVkVmFsdWUgPSBlbC52YWx1ZS5yZXBsYWNlKC9cXHJcXG4vZywgXCJcXG5cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgd29ya2luZyBUZXh0UmFuZ2UgdGhhdCBsaXZlcyBvbmx5IGluIHRoZSBpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0SW5wdXRSYW5nZSA9IGVsLmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0SW5wdXRSYW5nZS5tb3ZlVG9Cb29rbWFyayhyYW5nZS5nZXRCb29rbWFyaygpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgc3RhcnQgYW5kIGVuZCBvZiB0aGUgc2VsZWN0aW9uIGFyZSBhdCB0aGUgdmVyeSBlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2YgdGhlIGlucHV0LCBzaW5jZSBtb3ZlU3RhcnQvbW92ZUVuZCBkb2Vzbid0IHJldHVybiB3aGF0IHdlIHdhbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhvc2UgY2FzZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kUmFuZ2UgPSBlbC5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kUmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0SW5wdXRSYW5nZS5jb21wYXJlRW5kUG9pbnRzKFwiU3RhcnRUb0VuZFwiLCBlbmRSYW5nZSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBlbmQgPSBsZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IC10ZXh0SW5wdXRSYW5nZS5tb3ZlU3RhcnQoXCJjaGFyYWN0ZXJcIiwgLWxlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydCArPSBub3JtYWxpemVkVmFsdWUuc2xpY2UoMCwgc3RhcnQpLnNwbGl0KFwiXFxuXCIpLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0SW5wdXRSYW5nZS5jb21wYXJlRW5kUG9pbnRzKFwiRW5kVG9FbmRcIiwgZW5kUmFuZ2UpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSBsZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IC10ZXh0SW5wdXRSYW5nZS5tb3ZlRW5kKFwiY2hhcmFjdGVyXCIsIC1sZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZCArPSBub3JtYWxpemVkVmFsdWUuc2xpY2UoMCwgZW5kKS5zcGxpdChcIlxcblwiKS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9ICh0aGlzLl9zZWxlY3Rpb24udG9TdHJpbmcoKSkubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogZW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfZm9ybWF0RG9jOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBmb3JtYXREb2MoY29tbWFuZCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKGNvbW1hbmQsIGZhbHNlLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl8kY29udGVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfcHJpbnREb2M6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHByaW50RG9jKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByaW50ID0gd2luZG93Lm9wZW4oXCJcIixcIl9ibGFua1wiLFwid2lkdGg9NDUwLGhlaWdodD00NzAsbGVmdD00MDAsdG9wPTEwMCxtZW51YmFyPXllcyx0b29sYmFyPW5vLGxvY2F0aW9uPW5vLHNjcm9sbGJhcnM9eWVzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQuZG9jdW1lbnQub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQuZG9jdW1lbnQud3JpdGUoXCI8IWRvY3R5cGUgaHRtbD48aHRtbD48aGVhZD48dGl0bGU+UHJpbnQ8XFwvdGl0bGU+PFxcL2hlYWQ+PGJvZHkgb25sb2FkPVxcXCJwcmludCgpO1xcXCI+XCIgKyB0aGlzLl8kY29udGVudC5nZXQoMCkuaW5uZXJIVE1MICsgXCI8XFwvYm9keT48XFwvaHRtbD5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmludC5kb2N1bWVudC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfaGlkZUFsbFBvcG92ZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoaWRlQWxsUG9wb3ZlcnMoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl8kdG9vbGJhci5maW5kKCcucG9wb3ZlcicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wb3BvdmVyKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BvcG92ZXJJc1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2RldGVjdExhbmd1YWdlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRlY3RMYW5ndWFnZSgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmd1YWdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYXZpZ2F0b3IubGFuZ3VhZ2VzICYmIG5hdmlnYXRvci5sYW5ndWFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2UgPSBuYXZpZ2F0b3IubGFuZ3VhZ2VzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZSA9IG5hdmlnYXRvci51c2VyTGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLmxhbmd1YWdlIHx8IG5hdmlnYXRvci5icm93c2VyTGFuZ3VhZ2UgfHwgJ2VuJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX3RyYW5zbGF0ZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdHJhbnNsYXRlKHN0cmluZykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmd1YWdlID0gX3RoaXMuX2NvbmZpZy5sYW5ndWFnZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAobGFuZ3VhZ2UpID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlID0gX3RoaXMuX2RldGVjdExhbmd1YWdlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY29uZmlnLnRyYW5zbGF0aW9ucy5oYXNPd25Qcm9wZXJ0eShsYW5ndWFnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2NvbmZpZy50cmFuc2xhdGlvbnNbbGFuZ3VhZ2VdW3N0cmluZy50b1N0cmluZygpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgPSBfdGhpcy5fY29uZmlnLnRyYW5zbGF0aW9uc1tsYW5ndWFnZV1bc3RyaW5nLnRvU3RyaW5nKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy50b0xvY2FsZVN0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfYnVpbGRUb2xsYmFyQnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidWlsZFRvbGxiYXJCdXR0b24oYWN0aW9uLCB2YWx1ZSwgaWNvbiwgaG90a2V5LCB0b29sdGlwLCBjb250ZW50KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gX3RoaXMuX3NlbGVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkYnV0dG9uID0gJCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0YWJpbmRleD1cIi0xXCIgLz4nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnV0dG9uLmF0dHIoJ2RhdGEtYWN0aW9uJywgYWN0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRidXR0b24uYXR0cignZGF0YS12YWx1ZScsIHZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhvdGtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnV0dG9uLmF0dHIoJ2RhdGEtaG90a2V5JywgaG90a2V5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvb2x0aXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnV0dG9uLnRvb2x0aXAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXI6ICdib2R5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IF90aGlzLl90cmFuc2xhdGUodG9vbHRpcC50b1N0cmluZygpLnRyaW0oKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnV0dG9uLnBvcG92ZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiAnbWFudWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld3BvcnQ6ICdib2R5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGNvbnRlbnQpID09PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKGNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5vbignc2hvd24uYnMucG9wb3ZlcicsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvcG92ZXJJZCA9ICQoZXZlbnQudGFyZ2V0KS5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkcG9wb3ZlciA9IF90aGlzLl8kdG9vbGJhci5maW5kKCcjJytwb3BvdmVySWQpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IF90aGlzLl9zZWxlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxlY3Rpb24gJiYgcmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwb3BvdmVyLmZpbmQoJ2lucHV0Jykub24oJ2JsdXInLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQudHlwZSA9PSBcInRleHRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuXyRsYXN0Rm9jdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyRsYXN0Rm9jdXMuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VsZWN0VGV4dChzZWxlY3Rpb24sIHJhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwb3BvdmVyLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2NvbmZpZy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQb3BvdmVyIGV2ZW50IHRhcmdldCB0eXBlOiAnICsgZXZlbnQudGFyZ2V0LnR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQb3BvdmVyIGV2ZW50IHRhcmdldCB0YWc6ICcgKyBldmVudC50YXJnZXQudGFnTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGV2ZW50LnRhcmdldC50eXBlKSAmJiAhKGV2ZW50LnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT0gJ2EnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKGV2ZW50LnRhcmdldCkuZ2V0KDApLmhhc0F0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwb3BvdmVyLnBvcG92ZXIoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHBvcG92ZXIuZmluZCgnLnRhYmxlLWdyaWQnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwb3BvdmVyLmZpbmQoJy50YWJsZS1ncmlkIHRyID4gdGQnKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucHJldkFsbCgpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucHJldkFsbCgpLmZpbmQoJ3RkOmx0KCcrICgkKHRoaXMpLmluZGV4KCkgKyAxKSArICcpJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucHJldkFsbCgpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucHJldkFsbCgpLmZpbmQoJ3RkOmx0KCcrICgkKHRoaXMpLmluZGV4KCkgKyAxKSArICcpJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2NvbmZpZy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VsZW1lbnQgZXZlbnQgdGFyZ2V0IHR5cGU6ICcgKyBldmVudC50YXJnZXQudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRWxlbWVudCBldmVudCB0YXJnZXQgdGFnOiAnICsgZXZlbnQudGFyZ2V0LnRhZ05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMuX3BvcG92ZXJJc1Zpc2libGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5faGlkZUFsbFBvcG92ZXJzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ1dHRvbi5wb3BvdmVyKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9wb3BvdmVySXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9oaWRlQWxsUG9wb3ZlcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGljb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ1dHRvbi5hcHBlbmQoJzxzcGFuIGNsYXNzPVwiJyArIGljb24gKyAnXCIgLz4nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRidXR0b247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9idWlsZFRvbGxiYXJEcm9wZG93bjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnVpbGRUb2xsYmFyRHJvcGRvd24oYWN0aW9uLCBsaXN0LCBsYWJlbCwgdG9vbHRpcCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGRyb3Bkb3duID0gJCgnPGRpdiBjbGFzcz1cImRyb3Bkb3duXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZHJvcGRvd25CdG4gPSAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZHJvcGRvd25NZW51ID0gJCgnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGRyb3Bkb3duSXRlbSA9ICQoJzxsaSAvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRkcm9wZG93bkxpbmsgPSAkKCc8YSBocmVmPVwiI1wiIHRhYmluZGV4PVwiLTFcIiAvPicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChsaXN0KSA9PSBcIm9iamVjdFwiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gobGlzdCwgZnVuY3Rpb24oaW5kZXgsIGVsZW0pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGxpbmsgPSAkZHJvcGRvd25MaW5rLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaXRlbSA9ICRkcm9wZG93bkl0ZW0uY2xvbmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChlbGVtKSA9PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbVsnYWN0aW9uJ10pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxpbmsuYXR0cignZGF0YS1hY3Rpb24nLCBlbGVtWydhY3Rpb24nXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtWyd2YWx1ZSddKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsaW5rLmF0dHIoJ2RhdGEtdmFsdWUnLCBlbGVtWyd2YWx1ZSddKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1bJ3dyYXAnXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbGluay5odG1sKCQoZWxlbVsnd3JhcCddKS50ZXh0KGluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxpbmsudGV4dChpbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtWydzdHlsZSddKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsaW5rLmF0dHIoJ3N0eWxlJywgZWxlbVsnc3R5bGUnXS50b1N0cmluZygpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPT0gbGFiZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaXRlbS5hcHBlbmQoJGxpbmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTWVudS5hcHBlbmQoJGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsaW5rLnRleHQoZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbGluay5hdHRyKCdkYXRhLWFjdGlvbicsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbGluay5hdHRyKCdkYXRhLXZhbHVlJywgZWxlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW0gPT0gbGFiZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaXRlbS5hcHBlbmQoJGxpbmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTWVudS5hcHBlbmQoJGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxpbmsub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkJ0bi50ZXh0KGxhYmVsICsgJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25CdG4udGV4dCgnRHJvcGRvd24gJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkJ0bi5hcHBlbmQoJzxiIGNsYXNzPVwiY2FyZXRcIiAvPicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9vbHRpcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkJ0bi50b29sdGlwKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuX3RyYW5zbGF0ZSh0b29sdGlwLnRvU3RyaW5nKCkudHJpbSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24uYXBwZW5kKCRkcm9wZG93bkJ0bik7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24uYXBwZW5kKCRkcm9wZG93bk1lbnUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRkcm9wZG93bjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2J1aWxkQ29sb3JQYWxldHRlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidWlsZENvbG9yUGFsZXR0ZShwYWxldHRlLCBhY3Rpb24sIHJlc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHBhbGV0dGUsIGZ1bmN0aW9uIChvdXRlciwgY29sb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPHRhYmxlIGNsYXNzPVwiY29sb3ItcGFsZXR0ZVwiPjx0cj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChjb2xvcnMsIGZ1bmN0aW9uIChpbm5lciwgY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPHRkPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCInICsgYWN0aW9uICsgJ1wiIGRhdGEtdmFsdWU9XCInICsgY29sb3IgKyAnXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAnICsgY29sb3IgKyAnXCI+Jm5ic3A7PC9hPjwvdGQ+J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICgocGFyc2VJbnQoaW5uZXIpICsgMSklMTAgPyAnJyA6ICc8L3RyPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICgocGFyc2VJbnQoaW5uZXIpICsgMSklMTAgPyAnJyA6ICc8dHI+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPC90cj48L3RhYmxlPic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPHA+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0biBidG4tc20gYnRuLWJsb2NrXCIgZGF0YS1hY3Rpb249XCInICsgYWN0aW9uICsgJ1wiIGRhdGEtdmFsdWU9XCJ1bnNldFwiPlJlc2V0IGNvbG9yPC9hPjwvcD4nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2J1aWxkVGFibGVHcmlkOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidWlsZENvbG9yUGFsZXR0ZSgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSAnPHRhYmxlIGNsYXNzPVwidGFibGUtZ3JpZFwiPic7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcm93ID0gMTsgcm93IDw9IDY7IHJvdysrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8dHI+JztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgY29sdW1uID0gMTsgY29sdW1uIDw9IDg7IGNvbHVtbisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzx0ZD48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwiaW5zZXJ0LXRhYmxlXCIgZGF0YS12YWx1ZT1cIicgKyByb3cgKyAnfCcrIGNvbHVtbiArJ1wiPiZuYnNwOzwvYT48L3RkPidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8L3RyPic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzwvdGFibGU+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfYnVpbGRMZXR0ZXJTcGFjaW5nTGlzdDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnVpbGRMZXR0ZXJTcGFjaW5nTGlzdCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gJzx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHMgbmF2LXN0YWNrZWRcIj5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsZXR0ZXItc3BhY2luZ1wiIGRhdGEtdmFsdWU9XCItNVwiPi01PC9hPjwvbGk+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwibGV0dGVyLXNwYWNpbmdcIiBkYXRhLXZhbHVlPVwiLTNcIj4tMzwvYT48L2xpPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cImxldHRlci1zcGFjaW5nXCIgZGF0YS12YWx1ZT1cIi0yXCI+LTI8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsZXR0ZXItc3BhY2luZ1wiIGRhdGEtdmFsdWU9XCItMVwiPi0xPC9hPjwvbGk+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwibGV0dGVyLXNwYWNpbmdcIiBkYXRhLXZhbHVlPVwiMFwiPjA8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsZXR0ZXItc3BhY2luZ1wiIGRhdGEtdmFsdWU9XCIxXCI+MTwvYT48L2xpPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cImxldHRlci1zcGFjaW5nXCIgZGF0YS12YWx1ZT1cIjJcIj4yPC9hPjwvbGk+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwibGV0dGVyLXNwYWNpbmdcIiBkYXRhLXZhbHVlPVwiM1wiPjM8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsZXR0ZXItc3BhY2luZ1wiIGRhdGEtdmFsdWU9XCI1XCI+NTwvYT48L2xpPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cImxldHRlci1zcGFjaW5nXCIgZGF0YS12YWx1ZT1cIjhcIj44PC9hPjwvbGk+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwibGV0dGVyLXNwYWNpbmdcIiBkYXRhLXZhbHVlPVwiMTBcIj4xMDwvYT48L2xpPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cImxldHRlci1zcGFjaW5nXCIgZGF0YS12YWx1ZT1cIjEyXCI+MTI8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsZXR0ZXItc3BhY2luZ1wiIGRhdGEtdmFsdWU9XCIxNVwiPjE1PC9hPjwvbGk+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwibGV0dGVyLXNwYWNpbmdcIiBkYXRhLXZhbHVlPVwiMjVcIj4yNTwvYT48L2xpPlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cImxldHRlci1zcGFjaW5nXCIgZGF0YS12YWx1ZT1cIjUwXCI+NTA8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC91bD4nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2J1aWxkTGluZUhlaWdodExpc3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJ1aWxkTGluZUhlaWdodExpc3QoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9ICc8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzIG5hdi1zdGFja2VkXCI+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwibGluZS1oZWlnaHRcIiBkYXRhLXZhbHVlPVwiMC41XCI+MC41PC9hPjwvbGk+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwibGluZS1oZWlnaHRcIiBkYXRhLXZhbHVlPVwiMS4wXCI+MS4wPC9hPjwvbGk+XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwibGluZS1oZWlnaHRcIiBkYXRhLXZhbHVlPVwiMS4xNVwiPjEuMTU8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsaW5lLWhlaWdodFwiIGRhdGEtdmFsdWU9XCIxLjVcIj4xLjU8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJsaW5lLWhlaWdodFwiIGRhdGEtdmFsdWU9XCIyLjBcIj4yLjA8L2E+PC9saT5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC91bD4nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX3NlbGVjdFRleHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNlbGVjdFRleHQoc2VsZWN0aW9uLCByYW5nZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighc2VsZWN0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbiA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighcmFuZ2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2J1aWxkRW1vamlMaXN0OiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidWlsZEVtb2ppTGlzdCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbW9qaXMgPSB0aGlzLl9jb25maWcuZW1vamlEZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZW1vamlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF4Um93cyA9IE1hdGgucm91bmQoZW1vamlzLmxlbmd0aCAvIDgpKzE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSAnPHRhYmxlIGNsYXNzPVwiZW1vamlzLWxpc3RcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcm93ID0gMSwgaW5kZXggPSAwOyByb3cgPD0gbWF4Um93czsgcm93KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPHRyPic7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBjb2x1bW4gPSAxOyBjb2x1bW4gPD0gODsgY29sdW1uKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPT0gZW1vamlzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPHRkPjxhIGhyZWY9XCIjXCIgZGF0YS1hY3Rpb249XCJpbnNlcnQtaHRtbFwiIGRhdGEtdmFsdWU9XCInICsgZW1vamlzW2luZGV4XS50b1N0cmluZygpICsgJ1wiPicrIGVtb2ppc1tpbmRleF0gKyc8L2E+PC90ZD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8L3RyPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzwvdGFibGU+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9idWlsZFN5bWJvbHNMaXN0OiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidWlsZFN5bWJvbHNMaXN0KCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ltYm9scyA9IHRoaXMuX2NvbmZpZy5zeW1ib2xzRGVmYXVsdDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3ltYm9scy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heFJvd3MgPSBNYXRoLnJvdW5kKHN5bWJvbHMubGVuZ3RoIC8gMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gJzx0YWJsZSBjbGFzcz1cInN5bWJvbHMtbGlzdFwiPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciByb3cgPSAxLCBpbmRleCA9IDA7IHJvdyA8PSBtYXhSb3dzOyByb3crKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8dHI+JztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGNvbHVtbiA9IDE7IGNvbHVtbiA8PSAxMDsgY29sdW1uKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPT0gc3ltYm9scy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzx0ZD48YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwiaW5zZXJ0LWh0bWxcIiBkYXRhLXZhbHVlPVwiJyArIHN5bWJvbHNbaW5kZXhdICsgJ1wiIHN0eWxlPVwibWluLXdpZHRoOjE2cHg7dGV4dC1hbGlnbjpjZW50ZXI7XCI+Jysgc3ltYm9sc1tpbmRleF0gKyc8L2E+PC90ZD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8L3RyPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzwvdGFibGU+JztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfYnVpbGREZHJvcGRvd246IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJ1aWxkRGRyb3Bkb3duKGRyb3Bkb3duSWQsIGJ1dHRvblRleHQsIGJ1dHRvbkNhcmV0LCBtZW51SXRlbXMsIGRlZmF1bHRWYWx1ZSwgZGF0YUF0dHIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1dHRvblRleHQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25UZXh0ID0gJ05vdCBzZXQnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnV0dG9uQ2FyZXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25DYXJldCA9ICc8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPic7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZW51SXRlbXMgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25DYXJldCA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUF0dHIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhQXR0ciA9ICdkYXRhLXZhbHVlJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRkcm9wZG93biA9ICQoJzxkaXYgY2xhc3M9XCJkcm9wZG93blwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGRyb3Bkb3duQnV0dG9uID0gJCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25CdXR0b24uYXR0cignaWQnLCBkcm9wZG93bklkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkJ1dHRvbi5odG1sKGJ1dHRvblRleHQgKyAnICcgKyBidXR0b25DYXJldCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJ1aWxkIGRyb3Bkb3duIG1lbnVcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZHJvcGRvd25NZW51ID0gJCgnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIGFyaWEtbGFiZWxsZWRieT1cIicgKyBkcm9wZG93bklkICsgJ1wiIC8+Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGVmYXVsdFZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bk1lbnUuYXBwZW5kKCc8bGkgY2xhc3M9XCJhY3RpdmVcIj48YSBocmVmPVwiI1wiPicgKyBidXR0b25UZXh0ICsgJzwvYT48L2xpPicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBbaWQsIG5hbWVdIG9mIE9iamVjdC5lbnRyaWVzKG1lbnVJdGVtcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQudG9TdHJpbmcoKSA9PSAnc2VwYXJhdG9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25NZW51LmFwcGVuZCgnPGxpIHJvbGU9XCJzZXBhcmF0b3JcIiBjbGFzcz1cImRpdmlkZXJcIj48L2xpPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVmYXVsdFZhbHVlID09IGlkLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTWVudS5hcHBlbmQoJzxsaSBjbGFzcz1cImFjdGl2ZVwiPjxhIGhyZWY9XCIjXCIgJyArIGRhdGFBdHRyICsgJz1cIicgKyBpZCArICdcIj4nICsgbmFtZSArICc8L2E+PC9saT4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25NZW51LmFwcGVuZCgnPGxpPjxhIGhyZWY9XCIjXCIgJyArIGRhdGFBdHRyICsgJz1cIicgKyBpZCArICdcIj4nICsgbmFtZSArICc8L2E+PC9saT4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENsaWNrIGJ5IGRyb3Bkb3duIG1lbnUgaXRlbXNcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bk1lbnUuZmluZCgnbGknKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bk1lbnUuZmluZCgnbGknKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duQnV0dG9uLmh0bWwoJCh0aGlzKS50ZXh0KCkgKyAnICcgKyBidXR0b25DYXJldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLmFwcGVuZCgkZHJvcGRvd25CdXR0b24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLmFwcGVuZCgkZHJvcGRvd25NZW51KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkZHJvcGRvd247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9idWlsZFVybEZvcm06IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJ1aWxkVXJsRm9ybSh0eXBlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jb25maWcuZGVidWcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0J1aWxkIFVSTCBmb3JtIGZvciB0eXBlOiAnICsgdHlwZSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRmb3JtID0gJCgnPGZvcm0gY2xhc3M9XCJmb3JtLWhvcml6b250YWxcIiAvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRmb3JtR3JvdXAgPSAkKCc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGNvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJjb2wteHMtMTIgY29sLXNtLTEyXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXRHcm91cCA9ICQoJzxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBpbnB1dC1ncm91cC1zbVwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGRyb3Bkb3duID0gJCgnPGRpdiBjbGFzcz1cImRyb3Bkb3duXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZHJvcGRvd25CdXR0b24gPSAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLXNlY29uZGFyeSBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiAvPicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSBcImltYWdlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRHcm91cC5hcHBlbmQoJzxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5JbWFnZTo8L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJ2aWRlb1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRkcm9wZG93biA9IF90aGlzLl9idWlsZERkcm9wZG93bigndmlkZW9TZXJ2aWNlcycsICdZb3VUdWJlJywgbnVsbCwgdmlkZW9TZXJ2aWNlcywgJ3lvdXR1YmUnLCAnZGF0YS1zZXJ2aWNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLmF0dHIoJ2NsYXNzJywgJ2lucHV0LWdyb3VwLWJ0bicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5maW5kKCcuYnRuW2RhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIl0nKS50b2dnbGVDbGFzcygnYnRuLWRlZmF1bHQnLCAnYnRuLXNlY29uZGFyeScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEdyb3VwLmFwcGVuZCgkZHJvcGRvd24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IFwibGlua1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRkcm9wZG93biA9IF90aGlzLl9idWlsZERkcm9wZG93bigndXJsU2NoZW1lcycsICdodHRwczovLycsIG51bGwsIHVybFNjaGVtZXMsICdodHRwcycsICdkYXRhLXNjaGVtZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5hdHRyKCdjbGFzcycsICdpbnB1dC1ncm91cC1idG4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24uZmluZCgnLmJ0bltkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJykudG9nZ2xlQ2xhc3MoJ2J0bi1kZWZhdWx0JywgJ2J0bi1zZWNvbmRhcnknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRHcm91cC5hcHBlbmQoJGRyb3Bkb3duKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQoJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJUeXBlIHlvdXIgVVJMLi4uXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09IFwiaW1hZ2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC5hdHRyKCdpZCcsIFwiaW1hZ2VVcmxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJ2aWRlb1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmF0dHIoJ2lkJywgXCJ2aWRlb1VybFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBcImxpbmtcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC5hdHRyKCdpZCcsIFwidXJsSW5wdXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRHcm91cC5hcHBlbmQoJGlucHV0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRidXR0b25XcmFwID0gJCgnPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIiAvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRidXR0b24gPSAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLXByaW1hcnlcIj5BZGQ8L2J1dHRvbj4nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJpbWFnZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ1dHRvbi5hdHRyKCdkYXRhLWFjdGlvbicsIFwiYWRkLWltYWdlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IFwidmlkZW9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRidXR0b24uYXR0cignZGF0YS1hY3Rpb24nLCBcImFkZC12aWRlb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ1dHRvbi5hdHRyKCdkYXRhLWFjdGlvbicsIFwiYWRkLXVybFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSAkKGV2ZW50LnRhcmdldCkuZGF0YSgnYWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmRhdGEoJ3ZhbHVlJywgJGlucHV0LnZhbCgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gXCJhZGQtdXJsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybFNjaGVtZSA9ICRmb3JtLmZpbmQoJ1thcmlhLWxhYmVsbGVkYnk9XCJ1cmxTY2hlbWVzXCJdIGxpLmFjdGl2ZSBhW2RhdGEtc2NoZW1lXScpLmZpcnN0KCkuZGF0YSgnc2NoZW1lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5kYXRhKCdzY2hlbWUnLCAodXJsU2NoZW1lKSA/IHVybFNjaGVtZSA6IG51bGwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cmxUaWxlID0gJGZvcm0uZmluZCgnI3VybFRpbGUnKS52YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmRhdGEoJ3RpdGxlJywgKHVybFRpbGUpID8gdXJsVGlsZSA6IG51bGwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cmxDbGFzcyA9ICRmb3JtLmZpbmQoJyN1cmxDbGFzcycpLnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuZGF0YSgnY2xhc3MnLCAodXJsQ2xhc3MpID8gdXJsQ2xhc3MgOiBudWxsKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJsTGlua1RhcmdldCA9ICRmb3JtLmZpbmQoJ1thcmlhLWxhYmVsbGVkYnk9XCJ1cmxMaW5rVGFyZ2V0XCJdIGxpLmFjdGl2ZSBhW2RhdGEtdGFyZ2V0XScpLmZpcnN0KCkuZGF0YSgndGFyZ2V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5kYXRhKCd0YXJnZXQnLCAodXJsTGlua1RhcmdldCkgPyB1cmxMaW5rVGFyZ2V0IDogbnVsbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybExpbmtSZWwgPSAkZm9ybS5maW5kKCdbYXJpYS1sYWJlbGxlZGJ5PVwidXJsTGlua1JlbFwiXSBsaS5hY3RpdmUgYVtkYXRhLXJlbF0nKS5maXJzdCgpLmRhdGEoJ3JlbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuZGF0YSgncmVsYXRpb24nLCAodXJsTGlua1JlbCkgPyB1cmxMaW5rUmVsIDogbnVsbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSBcImFkZC12aWRlb1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWRlb1NlcnZpY2UgPSAkZm9ybS5maW5kKCdbYXJpYS1sYWJlbGxlZGJ5PVwidmlkZW9TZXJ2aWNlc1wiXSBsaS5hY3RpdmUgYVtkYXRhLXNlcnZpY2VdJykuZmlyc3QoKS5kYXRhKCdzZXJ2aWNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5kYXRhKCdzZXJ2aWNlJywgKHZpZGVvU2VydmljZSkgPyB2aWRlb1NlcnZpY2UgOiBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkYnV0dG9uLmRhdGEoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ1dHRvbldyYXAuYXBwZW5kKCRidXR0b24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0R3JvdXAuYXBwZW5kKCRidXR0b25XcmFwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb250YWluZXIuYXBwZW5kKCRpbnB1dEdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRmb3JtR3JvdXAuYXBwZW5kKCRjb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGZvcm0uYXBwZW5kKCRmb3JtR3JvdXApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSBcImxpbmtcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1zbVwiPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnICAgICAgICA8bGFiZWwgY2xhc3M9XCJjb2wteHMtMTIgY29sLXNtLTRcIj5UaWxlOjwvbGFiZWw+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICcgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMTIgY29sLXNtLThcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJyAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJ1cmxUaWxlXCIgcGxhY2Vob2xkZXI9XCJUaXRsZSBvZiBsaW5rLi4uXCIgLz4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJyAgICAgICAgPC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICcgICAgPC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1zbVwiPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnICAgICAgICA8bGFiZWwgY2xhc3M9XCJjb2wteHMtMTIgY29sLXNtLTRcIj5DbGFzczo8L2xhYmVsPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTEyIGNvbC1zbS04XCI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICcgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwidXJsQ2xhc3NcIiBwbGFjZWhvbGRlcj1cIkNTUyBjbGFzcyBuYW1lLi4uXCIgLz4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJyAgICAgICAgPC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICcgICAgPC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZvcm0uYXBwZW5kKGNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGluayB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGZvcm1Hcm91cCA9ICQoJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGZvcm0tZ3JvdXAtc21cIiAvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXRHcm91cCA9ICQoJzxkaXYgY2xhc3M9XCJmb3JtLXJvdyBpbnB1dC1ncm91cC1zbVwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dExhYmVsID0gJCgnPGxhYmVsIGNsYXNzPVwiY29sLXhzLTEyIGNvbC1zbS00XCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRMYWJlbC50ZXh0KCdUYXJnZXQ6Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0R3JvdXAuYXBwZW5kKCRpbnB1dExhYmVsKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZHJvcGRvd24gPSBfdGhpcy5fYnVpbGREZHJvcGRvd24oJ3VybExpbmtUYXJnZXQnLCAnTm90IHNldCcsIG51bGwsIHVybExpbmtUYXJnZXQsIG51bGwsICdkYXRhLXRhcmdldCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5hZGRDbGFzcygnY29sLXhzLTEyIGNvbC1zbS04Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLmZpbmQoJy5idG5bZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXScpLmFkZENsYXNzKCdidG4tc20nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEdyb3VwLmFwcGVuZCgkZHJvcGRvd24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmb3JtR3JvdXAuYXBwZW5kKCRpbnB1dEdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZm9ybS5hcHBlbmQoJGZvcm1Hcm91cCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMaW5rIHJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZm9ybUdyb3VwID0gJCgnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1zbVwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dEdyb3VwID0gJCgnPGRpdiBjbGFzcz1cImZvcm0tcm93IGlucHV0LWdyb3VwLXNtXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0TGFiZWwgPSAkKCc8bGFiZWwgY2xhc3M9XCJjb2wteHMtMTIgY29sLXNtLTRcIiAvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dExhYmVsLnRleHQoJ1JlbGF0aW9uOicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEdyb3VwLmFwcGVuZCgkaW5wdXRMYWJlbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGRyb3Bkb3duID0gX3RoaXMuX2J1aWxkRGRyb3Bkb3duKCd1cmxMaW5rUmVsJywgJ05vdCBzZXQnLCBudWxsLCB1cmxMaW5rUmVsLCBudWxsLCAnZGF0YS1yZWwnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5hZGRDbGFzcygnY29sLXhzLTEyIGNvbC1zbS04Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLmZpbmQoJy5idG5bZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXScpLmFkZENsYXNzKCdidG4tc20nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEdyb3VwLmFwcGVuZCgkZHJvcGRvd24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmb3JtR3JvdXAuYXBwZW5kKCRpbnB1dEdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZm9ybS5hcHBlbmQoJGZvcm1Hcm91cCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRmb3JtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfZ2VuZXJhdGVUYWJsZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2VuZXJhdGVUYWJsZShyb3dzLCBjb2x1bW5zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3MgPSBwYXJzZUludChyb3dzKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zID0gcGFyc2VJbnQocm93cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFjb2x1bW5zKSBjb2x1bW5zID0gMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSAnPHRhYmxlIGNsYXNzPVwidGFibGVcIj4nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHJvdyA9IDE7IHJvdyA8PSByb3dzOyByb3crKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8dGhlYWQ+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyb3cgPT0gKChyb3dzIC0gcm93KSAtIDEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8dGJvZHk+JztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzx0cj4nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBjb2x1bW4gPSAxOyBjb2x1bW4gPD0gY29sdW1uczsgY29sdW1uKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8dGg+SGVhZGVyICcgKyBjb2x1bW4gKyAnPC90aD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8dGQ+Jm5ic3A7PC90ZD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzwvdHI+JztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSAnPC90aGVhZD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJvdyA9PSByb3dzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ICs9ICc8L3Rib2R5Pic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJzwvdGFibGU+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfdXBkYXRlU3RhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVN0YXRlKCR0YXJnZXQsIHJlc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9jb25maWcubW9kZSA9PSAnZWRpdG9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0SW5mbyA9IF90aGlzLl9nZXRUZXh0U3RhdChfdGhpcy5fJGNvbnRlbnQuZ2V0KDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aEluZm8gPSBfdGhpcy5fZ2V0UGF0aCgkdGFyZ2V0LCBfdGhpcy5fJGNvbnRlbnQsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFyZXNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHBhdGhJbmZvWyd0YWdzJ11bMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2InIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwidGV4dFwiXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwidGV4dFwiXVtkYXRhLXZhbHVlPVwiYm9sZFwiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndScgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJ0ZXh0XCJdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJ0ZXh0XCJdW2RhdGEtdmFsdWU9XCJ1bmRlcmxpbmVcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N1YicgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJ0ZXh0XCJdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJ0ZXh0XCJdW2RhdGEtdmFsdWU9XCJzdWJzY3JpcHRcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N1cCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJ0ZXh0XCJdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJ0ZXh0XCJdW2RhdGEtdmFsdWU9XCJzdXBlcnNjcmlwdFwiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaScgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJ0ZXh0XCJdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJ0ZXh0XCJdW2RhdGEtdmFsdWU9XCJpdGFsaWNcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2EnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwiaW5zZXJ0XCJdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJpbnNlcnRcIl1bZGF0YS12YWx1ZT1cImxpbmtcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3AnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwiYWxpZ25cIl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHRhcmdldC5jc3MoJ3RleHQtYWxpZ24nKSA9PSAnY2VudGVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cImFsaWduXCJdW2RhdGEtdmFsdWU9XCJjZW50ZXJcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoJHRhcmdldC5jc3MoJ3RleHQtYWxpZ24nKSA9PSAncmlnaHQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwiYWxpZ25cIl1bZGF0YS12YWx1ZT1cInJpZ2h0XCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCR0YXJnZXQuY3NzKCd0ZXh0LWFsaWduJykgPT0gJ2p1c3RpZnknKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwiYWxpZ25cIl1bZGF0YS12YWx1ZT1cImp1c3RpZnlcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnW2RhdGEtYWN0aW9uPVwiYWxpZ25cIl1bZGF0YS12YWx1ZT1cImxlZnRcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cInRleHRcIl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyR0b29sYmFyLmZpbmQoJ1tkYXRhLWFjdGlvbj1cImFsaWduXCJdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl8kdG9vbGJhci5maW5kKCdbZGF0YS1hY3Rpb249XCJpbnNlcnRcIl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHRvb2xiYXIuZmluZCgnYnV0dG9uW2RhdGEtYWN0aW9uXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHN0YXR1c2Jhci5wYXRoLnRleHQocGF0aEluZm9bJ3BhdGgnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuXyRzdGF0dXNiYXIuc3RhdC50ZXh0KCdMZW5ndGg6ICcgKyBzdGF0SW5mb1snbGVuZ3RoJ10gKyAnLCBjaGFyczogJyArIHN0YXRJbmZvWydjaGFycyddICsgJywgd29yZHM6ICcgKyAgc3RhdEluZm9bJ3dvcmRzJ10pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gX3RoaXMuX2dldFRleHRQb3NpdGlvbihfdGhpcy5fJGNvbnRlbnQuZ2V0KDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHN0YXR1c2Jhci5wYXRoLmVtcHR5KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwYXJzZUludChwb3NpdGlvblsnc2VsZWN0ZWQnXSkgPiAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHN0YXR1c2Jhci5zdGF0LnRleHQoJ0xpbmU6ICcgKyBwb3NpdGlvblsnbGluZSddICsgJywgY29sdW1uOiAnICsgcG9zaXRpb25bJ2VuZCddICsgJywgc2VsZWN0ZWQ6ICcgKyBwb3NpdGlvblsnc2VsZWN0ZWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fJHN0YXR1c2Jhci5zdGF0LnRleHQoJ0xpbmU6ICcgKyBwb3NpdGlvblsnbGluZSddICsgJywgY29sdW1uOiAnICsgcG9zaXRpb25bJ2VuZCddKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuXyRlbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIERlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2pRdWVyeUludGVyZmFjZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvZGVzdHJveXxoaWRlLy50ZXN0KGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9ICQoX3RoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlZGl0b3IgPSBlbGVtZW50LnBhcmVudCgnLnd5c2l3eWctZWRpdG9yJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnJlcGxhY2VXaXRoKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHRoaXMgPSAkKF90aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgX2NvbmZpZyA9ICQuZXh0ZW5kKHt9LCBXWVNJV1lHLkRlZmF1bHQsICR0aGlzLmRhdGEoKSwgdHlwZW9mIGNvbmZpZyA9PT0gXCJvYmplY3RcIiAmJiBjb25maWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBFZGl0b3IoX3RoaXMsIF9jb25maWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIEVkaXRvcjtcblxuICAgICAgICB9KSgpO1xuXG4gICAgICAgICQuZm5bY2xhc3NOYW1lXSA9IEVkaXRvci5falF1ZXJ5SW50ZXJmYWNlO1xuICAgICAgICAkLmZuW2NsYXNzTmFtZV0uQ29uc3RydWN0b3IgPSBFZGl0b3I7XG4gICAgICAgICQuZm5bY2xhc3NOYW1lXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkLmZuW2NsYXNzTmFtZV0gPSBfalF1ZXJ5Tm9Db25mbGljdDtcbiAgICAgICAgICAgIHJldHVybiBFZGl0b3IuX2pRdWVyeUludGVyZmFjZTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gRWRpdG9yO1xuXG4gICAgfSkoalF1ZXJ5KTtcbn0oalF1ZXJ5KTsiXX0=
