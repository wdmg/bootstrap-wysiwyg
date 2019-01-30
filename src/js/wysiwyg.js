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
            ]
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

                // Add to editor toolbar
                _this._$toolbar = $('<div class="wysiwyg-toolbar btn-toolbar" />');
                _this._$element.before(_this._$toolbar);

                _this._$content = $('<div class="editor-content" contenteditable="true" />');
                _this._$content.html(_this._$element.val());
                _this._$element.before(_this._$content);

                // Hide input editor
                _this._$element.addClass('hide');

                // Build toolbar by config
                if(typeof (_this._config.toolbar) == 'object') {

                    $.each(_this._config.toolbar, function (index, elem) {
                        //console.log(elem + ' comes at ' + index);
                        var $toolbar = $('<div class="btn-group" role="group" aria-label="..." />');

                        if(elem[0] === 'mode') { // Editor mode switcher

                            $toolbar.append($('<button class="btn btn-default" data-action="change-view" data-value="editor">' +
                                '              <span class="fa fa-eye"></span>' +
                                '            </button>'));

                            $toolbar.append($('<button class="btn btn-default" data-action="change-view" data-value="source">' +
                                '              <span class="fa fa-code"></span>' +
                                '            </button>'));

                            _this._$toolbar.append($toolbar);

                        } else if(elem[0] === 'styles') { // Editor mode switcher

                            $toolbar.append($('<div class="dropdown">' +
                                '            <a class="btn btn-default dropdown-toggle " data-toggle="dropdown">' +
                                '              <span class="fa fa-header"></span>' +
                                '              <b class="caret"></b>' +
                                '            </a>' +
                                '            <ul class="dropdown-menu">' +
                                '              <li>' +
                                '                <a data-action="" data-value="" tabindex="-1">' +
                                '                Open Sans' +
                                '                </a>' +
                                '              </li>' +
                                '            </ul>' +
                                '          </div>'));

                            _this._$toolbar.append($toolbar);

                        } else if(elem[0] === 'fonts') { // Font select and size

                            if(elem[1].indexOf('select', 0) !== -1)
                                $toolbar.append($('<div class="dropdown">' +
                                    '            <a class="btn btn-default dropdown-toggle " data-toggle="dropdown">' +
                                    '              <span class="current-font">Font Name</span>' +
                                    '              <b class="caret"></b>' +
                                    '            </a>' +
                                    '            <ul class="dropdown-menu">' +
                                    '              <li>' +
                                    '                <a data-action="" data-value="" tabindex="-1">' +
                                    '                Open Sans' +
                                    '                </a>' +
                                    '              </li>' +
                                    '            </ul>' +
                                    '          </div>'));

                            if(elem[1].indexOf('size', 0) !== -1)
                                $toolbar.append($('<div class="dropdown">' +
                                    '            <a class="btn btn-default dropdown-toggle " data-toggle="dropdown">' +
                                    '              <span class="current-font">12 px</span>' +
                                    '              <b class="caret"></b>' +
                                    '            </a>' +
                                    '            <ul class="dropdown-menu">' +
                                    '              <li>' +
                                    '                <a data-action="" data-value="" tabindex="-1">' +
                                    '                12 px' +
                                    '                </a>' +
                                    '              </li>' +
                                    '            </ul>' +
                                    '          </div>'));

                            if(_this._$toolbar)
                                _this._$toolbar.append($toolbar);

                        } else if(elem[0] === 'text') { // Text decoration

                            if(elem[1].indexOf('bold', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-bold"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('italic', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-italic"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('underline', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-underline"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('color', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-font"></span>' +
                                    '            </button>'));

                            if(_this._$toolbar)
                                _this._$toolbar.append($toolbar);

                        } else if(elem[0] === 'align') { // Text aligment

                            if(elem[1].indexOf('left', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-align-left"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('center', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-align-center"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('right', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-align-right"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('justify', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-align-justify"></span>' +
                                    '            </button>'));

                            if(_this._$toolbar)
                                _this._$toolbar.append($toolbar);

                        } else if(elem[0] === 'lists') { // Lists

                            if(elem[1].indexOf('default', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-list-ul"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('numeric', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-list-ol"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('level-indent', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-indent"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('level-outdent', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-outdent"></span>' +
                                    '            </button>'));

                            if(_this._$toolbar)
                                _this._$toolbar.append($toolbar);

                        } else if(elem[0] === 'components') { // Components

                            if(elem[1].indexOf('table', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-table"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('chart', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-pie-chart"></span>' +
                                    '            </button>'));

                            if(_this._$toolbar)
                                _this._$toolbar.append($toolbar);

                        } else if(elem[0] === 'props') { // Text properties

                            if(elem[1].indexOf('interval', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-bars"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('line-height', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-text-height"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('letter-spacing', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-text-width"></span>' +
                                    '            </button>'));

                            if(_this._$toolbar)
                                _this._$toolbar.append($toolbar);

                        } else if(elem[0] === 'insert') { // Inserts

                            if(elem[1].indexOf('emoji', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-smile-o"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('link', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-link"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('image', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-image"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('video', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-video-camera"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('symbol', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-code fa-hashtag"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('bookmark', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-bookmark"></span>' +
                                    '            </button>'));

                            if(_this._$toolbar)
                                _this._$toolbar.append($toolbar);

                        } else if(elem[0] === 'special') { // Inserts

                            if(elem[1].indexOf('print', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-print"></span>' +
                                    '            </button>'));

                            if(elem[1].indexOf('clean', 0) !== -1)
                                $toolbar.append($('<button class="btn btn-default" data-action="" tabindex="-1">' +
                                    '              <span class="fa fa-eraser"></span>' +
                                    '            </button>'));

                            if(_this._$toolbar)
                                _this._$toolbar.append($toolbar);

                        } else if(elem[0] === 'fullscreen') { // Fullscreen mode

                            $toolbar.append($('<button class="btn btn-default" data-action="change-view" data-value="editor">' +
                                '              <span class="fa fa-arrows-alt"></span>' +
                                '            </button>'));

                            $toolbar.addClass('pull-right');
                            _this._$toolbar.append($toolbar);

                        }

                    });
                }


                /*
                _this._$toolbar.append($('<a href="#" class="btn btn-default" />'));
*/



            }

            _createClass(Editor, {
                element: {
                    value: function element() {
                        var _this = this;
                        return _this._$element;
                    }
                }
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