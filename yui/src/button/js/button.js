/**
* @package    atto_ubicast
* @copyright  2019 UbiCast {@link https://www.ubicast.eu}
* @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
*/

/**
* @module moodle-atto_ubicast-button
*/

/**
* Atto text editor ubicast plugin.
*
* @namespace M.atto_ubicast
* @class button
* @extends M.editor_atto.EditorPlugin
*/
/* global $ */
/* global M */
"use strict";

var PLUGINNAME = 'atto_ubicast';
var BUTTON_SELECTOR = '.atto_ubicast_button';
var course_id = 0;
var load_files = true;

function get_course_id(){
    for (var i = 0; i < window.document.body.classList.length; i++){
        if (window.document.body.classList[i].startsWith('course')){
            var arr = window.document.body.classList[i].split('-');
            return arr.length === 2 && parseInt(arr[1], 10) || 0;
        }
    }
    return 0;
}

Y.namespace('M.atto_ubicast').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    initializer: function() {
        this.addButton({
            icon: 'icon',
            iconComponent: PLUGINNAME,
            callback: this.openChoicesDialogue
        });
        if (load_files){
            $.getScript("/mod/ubicast/statics/jquery.min.js?_=9");
            $.getScript("/mod/ubicast/statics/media_selector.js?_=9");
            course_id = get_course_id();
            if (get_course_id() < 2) {
                $(BUTTON_SELECTOR).hide();
            }
            load_files = false;
        }
    },

    // A reference to the cursor position when button is pressed
    _currentSelection: null,

    _dialogContent: null,

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
            width: '425px',
            focusAfterHide: true
        });

        // Set the dialogue content, and then show the dialogue.
        var url ='/lib/editor/atto/plugins/ubicast/media.php';
        var self = this;
        $.ajax({
            url: url,
            type: 'GET',
            success: function(data){
                var content = Y.Node.create(data);
                var bottom = Y.Node.create('<div style="text-align: center;"></div>');
                var submit =  M.util.get_string('inputsubmit', PLUGINNAME);
                bottom.append(Y.Node.create('<button type="submit" class="submit">' + submit + '</button>'));
                content.append(bottom);
                content.on('submit', self._setVideo, self);
                self._dialogContent = content;
                dialogue.set('bodyContent', content).show();
                window.media_selector = new window.MediaSelector({
                   moodleURL:  window.M.cfg.wwwroot + '/mod/ubicast/lti.php?id=' + course_id,
                   mediaserverURL: $(data).find("#ms_mediaserverURL").val(),
                   target: "atto-ubicast"
                });
            }
        });
    },

    /**
    * The video was inserted, so make changes to the editor source.
    *
    * @method _setVideo
    * @param {EventFacade} event
    * @private
    */
    _setVideo: function(event) {
        event.preventDefault();

        this.getDialogue({
            focusAfterHide: null
        }).hide();

        var media_id = this._dialogContent.one('#id_mediaid').get('value');
        var media_w = this._dialogContent.one('#media_width').get('value');
        var media_h = this._dialogContent.one('#media_height').get('value');
        if (media_id){
            var host = this.get('host');
            this.editor.focus();
            host.setSelection(this._currentSelection);
            var videoTemplate = '<iframe class="mediaserver-iframe" ' +
                'style="width: {{ media_w }}; height: {{ media_h }}; background-color: #ddd;" ' +
                'src="/lib/editor/atto/plugins/ubicast/view.php?course={{ course_id }}&video={{ media_id }}/" ' +
                'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen">' +
                '</iframe>';

            var template = Y.Handlebars.compile(videoTemplate);
            var data = {
                course_id: course_id,
                media_id: media_id,
                media_w: media_w,
                media_h: media_h
            };
            var video = template(data);
            host.insertContentAtFocusPoint(video);

            this.markUpdated();
        }
        return false;
    }
});
