YUI.add("moodle-atto_ubicast-button",function(e,t){function u(){for(var e=0;e<window.document.body.classList.length;e++)if(window.document.body.classList[e].startsWith("course")){var t=window.document.body.classList[e].split("-");return t.length==2&&parseInt(t[1],10)||0}return 0}var n="atto_ubicast",r=".atto_ubicast_button",i=0,s=!0,o=window.$;e.namespace("M.atto_ubicast").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{initializer:function(){this.addButton({icon:"icon",iconComponent:n,callback:this.openChoicesDialogue}),s&&(o("<link>").appendTo(o("head")).attr({type:"text/css",rel:"stylesheet"}).attr("href","/mod/ubicast/statics/odm/odm.css"),o("<link>").appendTo(o("head")).attr({type:"text/css",rel:"stylesheet"}).attr("href","/mod/ubicast/statics/overlay.css"),o.getScript("/mod/ubicast/statics/jquery.min.js"),o.getScript("/mod/ubicast/statics/utils.js"),o.getScript("/mod/ubicast/statics/odm/odm.js"),o.getScript("/mod/ubicast/statics/media_selector.js"),i=u(),u()<2&&o(r).hide(),s=!1)},_currentSelection:null,_form:null,openChoicesDialogue:function(){this._showDialogue()},_showDialogue:function(){this._currentSelection=this.get("host").getSelection();if(this._currentSelection===!1)return;var t=this.getDialogue({headerContent:M.util.get_string("pluginname",n),width:"350px",focusAfterHide:!0}),r="/lib/editor/atto/plugins/ubicast/media.php",s=this._getDialogueContent();o.ajax({url:r,type:"GET",success:function(n){window.media_selector=new window.MediaSelector({moodleURL:window.M.cfg.wwwroot+"/mod/ubicast/lti.php?id="+i,mediaserverURL:o(n).find("#ms_mediaserverURL").val(),title:M.util.get_string("form_resource_pick","mod_ubicast")});var r=e.Node.create(n);r.append(s),t.set("bodyContent",r).show()}})},_getDialogueContent:function(){var t=e.Node.create('<div style="word-wrap: break-word;"></div>'),r=M.util.get_string("inputsubmit",n);return this._form=e.Node.create('<form class="atto_form"><button type="submit" class="submit">'+r+"</button>"+"</form>"),this._form.one(".submit").on("click",this._setVideo,this),t.append(this._form),t},_setVideo:function(t){t.preventDefault(),this.getDialogue({focusAfterHide:null}).hide();var n=o("#id_mediaid").val(),r=o("#media_width").val(),s=o("#media_height").val();if(n){var u=this.get("host");this.editor.focus(),u.setSelection(this._currentSelection);var a='<iframe class="mediaserver-iframe" style="width: {{ media_w }}; height: {{ media_h }}; background-color: #ddd;" src="/lib/editor/atto/plugins/ubicast/view.php?course={{ course_id }}&video={{ media_id }}/" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe>',f=e.Handlebars.compile(a),l={course_id:i,media_id:n,media_w:r,media_h:s},c=f(l);u.insertContentAtFocusPoint(c),this.markUpdated()}}})},"@VERSION@",{requires:["promise","moodle-editor_atto-plugin","event-valuechange"]});
