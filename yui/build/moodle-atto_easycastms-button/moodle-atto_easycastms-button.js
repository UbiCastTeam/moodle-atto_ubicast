YUI.add('moodle-atto_easycastms-button', function (Y, NAME) {


/**
* @package    atto_easycastms
* @copyright  2018 UbiCast {@link http://ubicast.eu}
* @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
*/

/**
* @module moodle-atto_easycastms-button
*/

/**
* Atto text editor easycastms plugin.
*
* @namespace M.atto_easycastms
* @class button
* @extends M.editor_atto.EditorPlugin
*/

var PLUGINNAME = 'atto_easycastms';

Y.namespace('M.atto_easycastms').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    initializer: function() {
        this.addButton({
            icon: 'icon',
            iconComponent: PLUGINNAME,
            title: 'title',
            callback: this.openChoicesDialogue
        });
    },

    // A reference to the cursor position when button is pressed
    _currentSelection: null,

    _form: null,

    /**
    * Open a modal to offer different choices.
    *
    * @method openChoicesDialogue
    */
    openChoicesDialogue: function() {
        this._showDialogue();
    },

    _showDialogue: function() {
        this._currentSelection = this.get('host').getSelection();
        if (this._currentSelection === false) {
            return;
        }

        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('pluginname', PLUGINNAME),
            width: '98%',
            focusAfterHide: true
        });

        // Set the dialogue content, and then show the dialogue.
        dialogue.set('bodyContent', this._getDialogueContent())
        .show();
    },

    /**
    * Return the dialogue content for the tool.
    *
    * @method _getDialogueContent
    * @private
    * @return {Node} The content to place in the dialogue.
    */
    _getDialogueContent: function() {
        var content = Y.Node.create('<div style="word-wrap: break-word;"></div>');
        var label =  M.util.get_string('inputlabel', PLUGINNAME);
        var placeholder =  M.util.get_string('inputplaceholder', PLUGINNAME);
        var submit =  M.util.get_string('inputsubmit', PLUGINNAME);

        this._form = Y.Node.create(
            '<form class="atto_form">'
            +'<label for="mediaId">' + label + '</label>'
            + '<input type="text" name="mediaId" id="mediaId" placeholder="' + placeholder + '"/>'
            + '<input type="submit" class="submit" value="'+ submit + '" />'
            + '</form>'
        );

        this._form.one('.submit').on('click', this._setVideo, this);

        content.append(this._form);

        return content;
    },

    /**
    * The video was inserted, so make changes to the editor source.
    *
    * @method _setVideo
    * @param {EventFacade} e
    * @private
    */
    _setVideo: function(e) {
        e.preventDefault();

        this.getDialogue({
            focusAfterHide: null
        }).hide();

        var input = this._form.one('#mediaId');
        var mediaId = input.get('value');
        if (mediaId !== '') {

            // We add a prefix if it is not already prefixed.
            mediaId = mediaId.trim();

            var host = this.get('host');
            this.editor.focus();
            host.setSelection(this._currentSelection);

            var parameters = window.location.search.split('?')[1].split('&');
            var courseId = -1;

            for (var i = 0; i < parameters.length; i++) {
                var param = parameters[i];
                var key = param.split('=')[0];
                var value = param.split('=')[1];

                if (key === 'update') {
                    courseId = value;
                }
            }

            var videoTemplate = '<iframe id="mediaserver_iframe" style="width: 100%; height: 800px;" src="'
                + '/mod/easycastms/launch.php?id={{ courseId }}&mediaId={{ mediaId }}'
            + '" frameborder="0" allowfullscreen="allowfullscreen"></iframe>'
            + '<script type="text/javascript" src="/mod/easycastms/statics/javascripts/jquery.min.js?_=1"></script>'
            + '<script type="text/javascript" src="/mod/easycastms/statics/javascripts/iframe_manager.js?_=1"></script>';

            var template = Y.Handlebars.compile(videoTemplate);
            var video = template({
                courseId: courseId,
                mediaId: mediaId,
            });

            host.insertContentAtFocusPoint(video);

            this.markUpdated();
        }
    }
});


}, '@VERSION@', {"requires": ["promise", "moodle-editor_atto-plugin", "event-valuechange"]});
