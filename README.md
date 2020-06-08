# Bootstrap WYSIWYG
Simple editor plugin for Bootstrap

# Installation

    $ npm install bootstrap-wysiwyg-editor
    $ bower install bootstrap-wysiwyg-editor
    $ yarn add bootstrap-wysiwyg-editor
    $ composer require bootstrap-wysiwyg-editor

# Usage example

For example use the input-group:

    <div class="form-group">
        <label class="control-label" for="editor">Message:</label>
        <textarea id="editor" class="form-control" rows="3"></textarea>
    </div>

... and init from script:

    <script type="text/javascript">
        $(document).ready(function () {
            $('#editor').wysiwyg({
                toolbar: [
                    ['mode'],
                    ['operations', ['undo', 'rendo', 'cut', 'copy', 'paste']],
                    ['styles'],
                    ['fonts', ['select', 'size']],
                    ['text', ['bold', 'italic', 'underline', 'strike', 'subscript', 'superscript', 'font-color', 'bg-color']],
                    ['align', ['left', 'center', 'right', 'justify']],
                    ['lists', ['unordered', 'ordered', 'indent', 'outdent']],
                    ['components', ['table']],
                    ['intervals', ['line-height', 'letter-spacing']],
                    ['insert', ['emoji', 'link', 'image', 'video', 'symbol']],
                    ['special', ['print', 'unformat', 'visual', 'clean']],
                ],
                fontSizes: ['8px', ... '48px'],
                fontSizeDefault: '12px',
                fontFamilies: ['Open Sans', 'Arial', ... 'Times New Roman', 'Verdana'],
                fontFamilyDefault: 'Open Sans',
                emojiDefault: [...],
                symbolsDefault: [...],
                colorPalette: [...],
                mode: 'editor',
                highlight: true,
                debug: false
            });
        });
    </script>

# Options

| Name                | Type      | Description                   |
|:------------------- |:---------:|:----------------------------- |
| toolbar             | array     | List of available editor features. |
| fontSizes           | array     | List of available font sizes. |
| fontSizeDefault     | string    | The default font size. |
| fontFamilies        | array     | List of font families. |
| fontFamilyDefault   | string    | Default font. |
| emojiDefault        | array     | List of emojis. |
| symbolsDefault      | array     | List of characters (spec. symbols). |
| colorPalette        | array     | Color picker. |
| mode                | string    | The default editor mode. |
| debug               | boolean   | Flag if debugging is required. |


# Status and version
* v.1.1.3 - Fixed path info in footer
* v.1.1.2 - Added visual blocks view mode, fixed some bugs
* v.1.1.1 - Bugfix
* v.1.1.0 - Plugin in progress development