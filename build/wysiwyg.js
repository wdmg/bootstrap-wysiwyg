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

                        var $toolbar = $('<div class="btn-group" role="group" aria-label="..." />');

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

                            var styles = {
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

                            $toolbar.append(_this._buildTollbarDropdown('select-style', styles, "Paragraph", "Text style"));

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
                                $toolbar.append(_this._buildTollbarButton('insert', 'link', "fa fa-link", null, "Add URL", _this._buildUrlForm()));

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

                                            break;

                                        case 'source':
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
                                        //_this._$toolbar.find('[data-action="text"][data-value="font-color"]').css('color', value);
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
                                        var $link = $('<a href="' + value + '" />');
                                        $link.text(text);
                                        var range = _this._selection.getRangeAt(0);
                                        range.deleteContents();
                                        range.insertNode($link.get(0));
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

                                case 'add-video':
                                    if(_this._selection && value) {
                                        var $embed = $('<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="' + value + '"></iframe></div>');
                                        var range = _this._selection.getRangeAt(0);
                                        range.deleteContents();
                                        range.insertNode($embed.get(0));
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

                                    if(typeof (content) === "object")
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

                                    if(event.target.type !== "text")
                                        $popover.popover('hide');

                                });

                                if($popover.find('.table-grid').length) {
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
                _buildUrlForm: {
                    value: function buildUrlForm(type) {
                        var content = '<form class="form-inline">';

                        content += '<div class="form-group">';
                        content += '<div class="input-group input-group-sm">';

                        if(type == "image")
                            content += '<span class="input-group-addon">Image:</span>';
                        else if(type == "video")
                            content += '<span class="input-group-addon">YouTube:</span>';
                        else
                            content += '<span class="input-group-addon">URL:</span>';

                        content += '<input type="text" class="form-control" id="urlInput" placeholder="http://" />';
                        content += '<span class="input-group-btn">';

                        if(type == "image")
                            content += '<button type="button" data-action="add-image" onclick="javascript: this.setAttribute(\'data-value\', document.getElementById(\'urlInput\').value);" class="btn btn-block btn-primary">Add</button>';
                        else if(type == "video")
                            content += '<button type="button" data-action="add-video" onclick="javascript: this.setAttribute(\'data-value\', document.getElementById(\'urlInput\').value);" class="btn btn-block btn-primary">Add</button>';
                        else
                            content += '<button type="button" data-action="add-url" onclick="javascript: this.setAttribute(\'data-value\', document.getElementById(\'urlInput\').value);" class="btn btn-block btn-primary">Add</button>';

                        content += '</span>';

                        content += '</div>';
                        content += '</div>';

                        content += '</form>';
                        return content;
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