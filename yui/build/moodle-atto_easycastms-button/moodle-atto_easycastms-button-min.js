YUI.add("moodle-atto_easycastms-button",function(e,t){function u(){for(var e=0;e<window.document.body.classList.length;e++)if(window.document.body.classList[e].startsWith("course")){var t=window.document.body.classList[e].split("-");return t.length==2&&parseInt(t[1],10)||0}return 0}var n="atto_easycastms",r=".atto_easycastms_button",i=0,s=!0,o=window.$;e.namespace("M.atto_easycastms").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{initializer:function(){this.addButton({icon:"icon",iconComponent:n,callback:this.openChoicesDialogue}),s&&(o("<link>").appendTo(o("head")).attr({type:"text/css",rel:"stylesheet"}).attr("href","/mod/easycastms/statics/odm/odm.css"),o("<link>").appendTo(o("head")).attr({type:"text/css",rel:"stylesheet"}).attr("href","/mod/easycastms/statics/overlay.css"),o.getScript("/mod/easycastms/statics/jquery.min.js"),o.getScript("/mod/easycastms/statics/utils.js"),o.getScript("/mod/easycastms/statics/odm/odm.js"),o.getScript("/mod/easycastms/statics/media_selector.js"),i=u(),u()<2&&o(r).hide(),s=!1)},_currentSelection:null,_form:null,openChoicesDialogue:function(){this._showDialogue()},_showDialogue:function(){this._currentSelection=this.get("host").getSelection();if(this._currentSelection===!1)return;var t=this.getDialogue({headerContent:M.util.get_string("pluginname",n),width:"350px",focusAfterHide:!0}),r="/lib/editor/atto/plugins/easycastms/media.php",s=this._getDialogueContent();o.ajax({url:r,type:"GET",success:function(n){window.media_selector=new window.MediaSelector({moodleURL:window.M.cfg.wwwroot+"/mod/easycastms/lti.php?id="+i,mediaserverURL:o(n).find("#ms_mediaserverURL").val(),title:M.util.get_string("form_resource_pick","atto_easycastms")});var r=e.Node.create(n);r.append(s),t.set("bodyContent",r).show()}})},_getDialogueContent:function(){var t=e.Node.create('<div style="word-wrap: break-word;"></div>'),r=M.util.get_string("inputsubmit",n);return this._form=e.Node.create('<form class="atto_form"><input type="submit" class="submit" value="'+r+'" />'+"</form>"),this._form.one(".submit").on("click",this._setVideo,this),t.append(this._form),t},_setVideo:function(t){t.preventDefault(),this.getDialogue({focusAfterHide:null}).hide();var n=o("#id_mediaid").val();if(n){var r=this.get("host");this.editor.focus(),r.setSelection(this._currentSelection);var s='<iframe class="mediaserver-iframe" style="width: 100%; height: 800px; background-color: #ddd;" src="/lib/editor/atto/plugins/easycastms/view.php?course={{ course_id }}&video={{ media_id }}/" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe>',u=e.Handlebars.compile(s),a={course_id:i,media_id:n},f=u(a);r.insertContentAtFocusPoint(f),this.markUpdated()}}})},"@VERSION@",{requires:["promise","moodle-editor_atto-plugin","event-valuechange"]});
