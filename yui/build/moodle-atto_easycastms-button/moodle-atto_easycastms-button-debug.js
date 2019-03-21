YUI.add('moodle-atto_easycastms-button', function (Y, NAME) {

/**
* @package    atto_easycastms
* @copyright  2019 UbiCast {@link https://www.ubicast.eu}
* @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
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
var $ = window.$;
var load_files = true;
var urlParams = new window.URLSearchParams(window.location.search);
var course = 0;
var urlParam = function (name) {
    if (urlParams.has(name)){
        return urlParams.get(name);
    } else {
        return false;
    }
};

Y.namespace('M.atto_easycastms').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    initializer: function() {
        this.addButton({
            icon: 'icon',
            iconComponent: PLUGINNAME,
            callback: this.openChoicesDialogue
        });
        if (load_files){
            $('<link>')
              .appendTo($('head'))
              .attr({type: 'text/css', rel: 'stylesheet'})
              .attr('href', '/mod/easycastms/statics/odm/odm.css');
            $('<link>')
              .appendTo($('head'))
              .attr({type: 'text/css', rel: 'stylesheet'})
              .attr('href', '/mod/easycastms/statics/overlay.css');
            $.getScript("/mod/easycastms/statics/jquery.min.js");
            $.getScript("/mod/easycastms/statics/utils.js");
            $.getScript("/mod/easycastms/statics/odm/odm.js");
            $.getScript("/mod/easycastms/statics/media_selector.js");
            load_files = false;
        }
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
            width: '350px',
            focusAfterHide: true
        });

        // Set the dialogue content, and then show the dialogue.
        var url ='/lib/editor/atto/plugins/easycastms/media.php?course=' + urlParam('course') + '&update=' + urlParam('update');
        var content = this._getDialogueContent();
        $.ajax({
                url: url,
                type: 'GET',
                success: function(data){
                    course = $(data).find("#ms_course").val();
                    window.media_selector = new window.MediaSelector({
                       moodleURL:  window.M.cfg.wwwroot + '/mod/easycastms/lti.php?id=' + course,
                       mediaserverURL: $(data).find("#ms_mediaserverURL").val(),
                       title: M.util.get_string('form_resource_pick', 'atto_easycastms')
                    });
                    var ajax_content = Y.Node.create(data);
                    ajax_content.append(content);
                    dialogue.set('bodyContent', ajax_content).show();
                }
        });
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
        var submit =  M.util.get_string('inputsubmit', PLUGINNAME);
        this._form = Y.Node.create(
            '<form class="atto_form">' +
            '<input type="submit" class="submit" value="'+ submit + '" />' +
            '</form>');
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

        var media_id = $('#id_mediaid').val();
        if (media_id){
            var host = this.get('host');
            this.editor.focus();
            host.setSelection(this._currentSelection);
            var videoTemplate = '<iframe class="mediaserver-iframe" ' +
                'style="width: 100%; height: 800px; background-color: #ddd;" ' +
                'src="/lib/editor/atto/plugins/easycastms/view.php?course={{ course_id }}&video={{ media_id }}" ' +
                'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen">' +
                '</iframe>';

            var template = Y.Handlebars.compile(videoTemplate);
            var data = {
                course_id: course,
                media_id: media_id
            };
            var video = template(data);
            host.insertContentAtFocusPoint(video);

            this.markUpdated();
        }
    }
});


}, '@VERSION@', {"requires": ["promise", "moodle-editor_atto-plugin", "event-valuechange"]});
