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
/* global M */

var PLUGINNAME = 'atto_ubicast';
var courseId = 0;
var loadFiles = true;

function getCourseId() {
    for (var i = 0; i < window.document.body.classList.length; i++) {
        if (window.document.body.classList[i].startsWith('course')) {
            var arr = window.document.body.classList[i].split('-');
            return arr.length === 2 && parseInt(arr[1], 10) || 0;
        }
    }
    return 0;
}

Y.namespace('M.atto_ubicast').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    initializer: function() {
        if (!this.get('enabled')) {
            return;
        }
        this.addButton({
            icon: 'icon',
            iconComponent: PLUGINNAME,
            callback: this.openChoicesDialogue
        });
        if (loadFiles) {
            courseId = getCourseId();
            if (getCourseId() < 2) {
                var btns = document.getElementsByClassName('atto_ubicast_button');
                for (var i=0; i < btns.length; i ++) {
                    btns[i].style.display = 'none';
                }
            }
            loadFiles = false;
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

        // Load MediaSelector if not already done
        if (!window.MediaSelector) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = window.M.cfg.wwwroot + '/mod/ubicast/statics/media_selector.js?_=13';
            var body = document.getElementsByTagName('body');
            body[0].appendChild(script);
        }

        // Get the dialogue content, and then show the dialogue.
        var self = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var formId = 'id_resource_atto_ubicast_' + new Date().getTime();
                var content = Y.Node.create(this.responseText);
                content.set('id', formId);
                var bottom = Y.Node.create('<div style="text-align: center;"></div>');
                var submit = M.util.get_string('inputsubmit', PLUGINNAME);
                bottom.append(Y.Node.create('<button type="submit" class="submit">' + submit + '</button>'));
                content.append(bottom);
                content.on('submit', self._setVideo, self);
                self._dialogContent = content;
                dialogue.set('bodyContent', content).show();
                setTimeout(function () {
                    // Use setTimeout to wait for MediaSelector loading.
                    window.mediaSelector = new window.MediaSelector({
                       moodleURL: window.M.cfg.wwwroot + '/mod/ubicast/lti.php?id=' + courseId,
                       mediaserverURL: content.one('#ms_mediaserverURL').get('value'),
                       target: formId
                    });
                }, (window.MediaSelector ? 10 : 2000));
            }
        };
        xhttp.open('GET', window.M.cfg.wwwroot + '/lib/editor/atto/plugins/ubicast/media.php', true);
        xhttp.send();
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

        var mediaId = this._dialogContent.one('#id_mediaid').get('value');
        var mediaW = this._dialogContent.one('#media_width').get('value');
        var mediaH = this._dialogContent.one('#media_height').get('value');
        var mediaThumb = this._dialogContent.one('input[name=mediaimg]').get('value');
        var videoTemplate;
        if (mediaId) {
            var host = this.get('host');
            this.editor.focus();
            host.setSelection(this._currentSelection);
            if (this.get('usefilter') == 1) {
                // var permalink = this.get('ubicast_url') + '/permalink/' + mediaId + '/';
                var thumburl = this.get('ubicast_url') + mediaThumb;
                videoTemplate = '<img class="atto_ubicast courseid_{{ courseId }}_mediaid_{{ mediaId }}"' +
                    'style="display: block; width: {{ mediaW }}; height: {{ mediaH }};"' +
                    ' src="' + thumburl + '"/>';
            } else {
                var url = '/lib/editor/atto/plugins/ubicast/view.php?course={{ courseId }}&video={{ mediaId }}';
                videoTemplate = '<iframe class="mediaserver-iframe" ' +
                    'style="width: {{ mediaW }}; height: {{ mediaH }}; background-color: #ddd;" ' +
                    'src="' + window.M.cfg.wwwroot + url + '" ' +
                    'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen">' +
                    '</iframe>';
            }
            var template = Y.Handlebars.compile(videoTemplate);
            var data = {
                courseId: courseId,
                mediaId: mediaId,
                mediaW: mediaW,
                mediaH: mediaH
            };
            var video = template(data);
            host.insertContentAtFocusPoint(video);

            this.markUpdated();
        }
        return false;
    }
},
    {
        ATTRS: {
            enabled: null,
            ubicast_url: null,
            usefilter: null
        }
    }
);
