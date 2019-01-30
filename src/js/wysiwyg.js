/**
 *
 * Simple WYSIWYG editor for Bootstrap3
 * copyright 2019 W.D.M.Group, Ukraine
 * email: wdmg.com.ua@gmail.com
 * license: MIT
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
                ['styles'],
                ['fonts', ['select', 'size']],
                ['text', ['bold', 'italic', 'underline', 'color']],
                ['align', ['left', 'center', 'right', 'justify']],
                ['lists', ['default', 'numeric', 'level-indent', 'level-outdent']],
                ['components', ['table', 'chart']],
                ['props', ['interval', 'line-height', 'letter-spacing']],
                ['insert', ['emoji', 'link', 'image', 'video', 'symbol', 'bookmark']],
                ['special', ['print', 'clean']],
                ['fullscreen'],
            ],
            fontSizes: ['8px', '9px', '10px', '11px', '12px', '13px', '14px', '15px', '16px', '17px', '18px'],
            fontSizeDefault: ['12px'],
            fontFamilies: ['Open Sans', 'Arial', 'Arial Black', 'Courier', 'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times', 'Times New Roman', 'Verdana'],
            fontFamilyDefault: ['Open Sans'],
        };

        var Editor = (function() {

            function Editor($element, config) {
                var _this = this;
                _classCallCheck(_this, Editor);

                // Merge default and custom options
                _this._config = $.extend({}, defaults, config);

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

                // Add toolbar to editor
                _this._$toolbar = $('<div class="wysiwyg-toolbar btn-toolbar" />');
                _this._$content.before(_this._$toolbar);

                // Add statusbar to editor
                _this._$statusbar = $('<div class="editor-statusbar" />');
                _this._$content.after(_this._$statusbar);

                // Hide input editor
                _this._$element.addClass('hide');

                // Build toolbar by config
                if(typeof (_this._config.toolbar) == 'object') {
                    $.each(_this._config.toolbar, function (index, elem) {
                        //console.log(elem + ' comes at ' + index);
                        var $toolbar = $('<div class="btn-group" role="group" aria-label="..." />');

                        if(elem[0] === 'mode') { // Editor mode switcher

                            $toolbar.append(_this._buildTollbarButton('mode', 'editor', "fa fa-eye", null));
                            $toolbar.append(_this._buildTollbarButton('mode', 'source', "fa fa-code", null));

                        } else if(elem[0] === 'styles') { // Editor mode switcher

                            var styles = {
                                'Header H1': {
                                    'action': 'wrap',
                                    'value': '<h1 />',
                                },
                                'Header H2': {
                                    'action': 'wrap',
                                    'value': '<h2 />',
                                },
                                'Header H3': {
                                    'action': 'wrap',
                                    'value': '<h3 />',
                                },
                            };

                            $toolbar.append(_this._buildTollbarDropdown('select-style', styles, "fa fa-header", "Style"));

                        } else if(elem[0] === 'fonts') { // Font select and size

                            if(elem[1].indexOf('select', 0) !== -1) {

                                var fonts = {};
                                $.each(_this._config.fontFamilies, function(index, value) {
                                    fonts[value] = {
                                        'action': 'style',
                                        'value': "font-family:'" + value + "';"
                                    };
                                });

                                $toolbar.append(_this._buildTollbarDropdown('font-select', fonts, "fa fa-underline", _this._config.fontFamilyDefault));
                            }

                            if(elem[1].indexOf('size', 0) !== -1) {
                                var sizes = {};
                                $.each(_this._config.fontSizes, function(index, value) {
                                    sizes[value] = {
                                        'action': 'style',
                                        'value': "font-size: " + value + ";"
                                    };
                                });
                                $toolbar.append(_this._buildTollbarDropdown('font-size', sizes, null, _this._config.fontSizeDefault));
                            }


                                var test = ['test1', 'test2', 'test3', 'test4', 'test5'];
                                $toolbar.append(_this._buildTollbarDropdown('font-size', test, "fa fa-underline", 'test3'));


                        } else if(elem[0] === 'text') { // Text decoration

                            if(elem[1].indexOf('bold', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('text', 'bold', "fa fa-bold", null));

                            if(elem[1].indexOf('italic', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('text', 'italic', "fa fa-italic", null));

                            if(elem[1].indexOf('underline', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('text', 'underline', "fa fa-underline", null));

                            if(elem[1].indexOf('color', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('text', 'color', "fa fa-font", null));

                        } else if(elem[0] === 'align') { // Text aligment

                            if(elem[1].indexOf('left', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('align', 'left', "fa fa-align-left", null));

                            if(elem[1].indexOf('center', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('align', 'center', "fa fa-align-center", null));

                            if(elem[1].indexOf('right', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('align', 'right', "fa fa-align-right", null));

                            if(elem[1].indexOf('justify', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('align', 'justify', "fa fa-align-justify", null));

                        } else if(elem[0] === 'lists') { // Lists

                            if(elem[1].indexOf('default', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('lists', 'default', "fa fa-list-ul", null));

                            if(elem[1].indexOf('numeric', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('lists', 'numeric', "fa fa-list-ol", null));

                            if(elem[1].indexOf('level-indent', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('lists', 'level-indent', "fa fa-indent", null));

                            if(elem[1].indexOf('level-outdent', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('lists', 'level-outdent', "fa fa-outdent", null));

                        } else if(elem[0] === 'components') { // Components

                            if(elem[1].indexOf('table', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('components', 'table', "fa fa-table", null));

                            if(elem[1].indexOf('chart', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('components', 'chart', "fa fa-pie-chart", null));

                        } else if(elem[0] === 'props') { // Text properties

                            if(elem[1].indexOf('interval', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('props', 'interval', "fa fa-bars", null));

                            if(elem[1].indexOf('line-height', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('props', 'line-height', "fa fa-text-height", null));

                            if(elem[1].indexOf('letter-spacing', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('props', 'letter-spacing', "fa fa-text-width", null));

                        } else if(elem[0] === 'insert') { // Inserts

                            if(elem[1].indexOf('emoji', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('insert', 'emoji', "fa fa-smile-o", null));

                            if(elem[1].indexOf('link', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('insert', 'link', "fa fa-link", null));

                            if(elem[1].indexOf('image', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('insert', 'image', "fa fa-image", null));

                            if(elem[1].indexOf('video', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('insert', 'video', "fa fa-video-camera", null));

                            if(elem[1].indexOf('symbol', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('insert', 'symbol', "fa fa-hashtag", null));

                            if(elem[1].indexOf('bookmark', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('insert', 'bookmark', "fa fa-bookmark", null));

                        } else if(elem[0] === 'special') { // Inserts

                            if(elem[1].indexOf('print', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('special', 'print', "fa fa-print", null));

                            if(elem[1].indexOf('clean', 0) !== -1)
                                $toolbar.append(_this._buildTollbarButton('special', 'clean', "fa fa-eraser", null));

                        } else if(elem[0] === 'fullscreen') { // Fullscreen mode

                            $toolbar.addClass('pull-right');
                            $toolbar.append(_this._buildTollbarButton('fullscreen', true, "fa fa-arrows-alt", null));

                        }

                        _this._$toolbar.append($toolbar);

                    });
                }

                // Set behavior for toolbar buttons
                if(_this._$toolbar.length) {
                    _this._$toolbar.on('click', '[data-action]', function(event) {
                        var $target = $(event.currentTarget);
                        var action = $target.data('action');
                        var value = $target.data('value');

                        if (action && value) {

                            switch (action) {

                                case 'mode':
                                    switch (value) {
                                        case 'editor':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'source':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;
                                    }
                                    break;

                                case 'wrap':
                                    console.log('Fire action: ' + action + ' with value: ' + value);
                                    break;

                                case 'style':
                                    console.log('Fire action: ' + action + ' with value: ' + value);
                                    break;

                                case 'fullscreen':
                                    console.log('Fire action: ' + action + ' with value: ' + value);
                                    break;

                                case 'text':
                                    switch (value) {
                                        case 'bold':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'italic':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'underline':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'color':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;
                                    }
                                    break;

                                case 'align':
                                    switch (value) {
                                        case 'left':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'center':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'right':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'justify':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;
                                    }
                                    break;


                                case 'lists':
                                    switch (value) {
                                        case 'default':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'numeric':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'level-indent':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'level-outdent':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;
                                    }
                                    break;

                                case 'components':
                                    switch (value) {
                                        case 'table':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'chart':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;
                                    }
                                    break;

                                case 'props':
                                    switch (value) {
                                        case 'interval':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'line-height':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'letter-spacing':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;
                                    }
                                    break;

                                case 'insert':
                                    switch (value) {
                                        case 'emoji':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'link':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'image':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'video':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'symbol':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'bookmark':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;
                                    }
                                    break;

                                case 'special':
                                    switch (value) {
                                        case 'print':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;

                                        case 'clean':
                                            console.log('Fire action: ' + action + ' with value: ' + value);
                                            break;
                                    }
                                    break;

                                default:
                                    console.warn('Unrecognized action: ' + action + ' with value: ' + value);
                                    break;
                            }

                        }

                    });
                }
            }

            _createClass(Editor, {
                element: {
                    value: function element() {
                        var _this = this;
                        return _this._$element;
                    }
                },
                _buildTollbarButton: {
                    value: function buildTollbarButton(action, value, icon, hotkey) {

                        var $button = $('<button type="button" class="btn btn-default" tabindex="-1" />');

                        if (action)
                            $button.attr('data-action', action);

                        if (value)
                            $button.attr('data-value', value);

                        if (hotkey)
                            $button.attr('data-hotkey', hotkey);

                        if (icon)
                            $button.append('<span class="' + icon + '" />');

                        return $button;
                    }
                },
                _buildTollbarDropdown: {
                    value: function buildTollbarDropdown(action, list, icon, label) {

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

                                    if (elem['action'] == 'wrap')
                                        $link.html($(elem['value']).text(index));
                                    else
                                        $link.text(index);

                                    if (elem['action'] == 'style')
                                        $link.attr('style', elem['value'].toString());

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

                            });
                        }

                        if (icon)
                            $dropdownBtn.prepend('<span class="' + icon + '" /> ');

                        if (label)
                            $dropdownBtn.text(label + ' ');
                        else
                            $dropdownBtn.text('Dropdown ');

                        $dropdownBtn.append('<b class="caret" />');

                        $dropdown.append($dropdownBtn);
                        $dropdown.append($dropdownMenu);
                        return $dropdown;
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