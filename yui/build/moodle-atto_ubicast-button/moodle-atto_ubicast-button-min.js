YUI.add("moodle-atto_ubicast-button",function(a,e){var d="atto_ubicast",i=!0;a.namespace("M.atto_ubicast").Button=a.Base.create("button",a.M.editor_atto.EditorPlugin,[],{initializer:function(){var e,t;if(this.get("enabled")&&(this.addButton({icon:"icon",iconComponent:d,callback:this.openChoicesDialogue}),i)){if(this.getCourseId()<2)for(e=document.getElementsByClassName("atto_ubicast_button"),t=0;t<e.length;t++)e[t].style.display="none";i=!1}},_currentSelection:null,_dialogContent:null,_courseId:null,getCourseId:function(){var e,t,i;if(null===this._courseId){for(t=e=0;t<window.document.body.classList.length;t++)if(window.document.body.classList[t].startsWith("course-")){e=2===(i=window.document.body.classList[t].split("-")).length&&parseInt(i[1],10)||0;break}this._courseId=e}return this._courseId},openChoicesDialogue:function(){this._showDialogue()},_showDialogue:function(){var n,s,e;this._currentSelection=this.get("host").getSelection(),!1!==this._currentSelection&&(n=this.getDialogue({headerContent:M.util.get_string("pluginname",d),width:"450px",fixedcenter:!0,focusAfterHide:!0}),window.MediaSelector||((e=document.createElement("script")).type="text/javascript",e.src=window.M.cfg.wwwroot+"/mod/ubicast/statics/media_selector.js?_=14",document.getElementsByTagName("body")[0].appendChild(e)),s=this,(e=new XMLHttpRequest).onreadystatechange=function(){var e,t,i,o;4===this.readyState&&200===this.status&&(e="id_resource_atto_ubicast_"+(new Date).getTime(),(t=a.Node.create(this.responseText)).set("id",e),i=a.Node.create('<div style="text-align: center;"></div>'),o=M.util.get_string("inputsubmit",d),i.append(a.Node.create('<button type="submit" class="btn btn-primary">'+o+"</button>")),t.append(i),(s._dialogContent=t).on("submit",s._setVideo,s),(o=t.one("fieldset"))&&(o.setStyle("overflow","auto"),o.setStyle("padding","20px"),o.setStyle("max-height",.7*$(window).height())),n.set("bodyContent",t).show(),setTimeout(function(){window.mediaSelector=new window.MediaSelector({moodleURL:window.M.cfg.wwwroot+"/mod/ubicast/lti.php?id="+s.getCourseId(),nudgisURL:s.get("ubicastURL"),filterBySpeaker:"1"===s.get("speakerContent"),target:e})},window.MediaSelector?10:2e3))},e.open("GET",window.M.cfg.wwwroot+"/lib/editor/atto/plugins/ubicast/media.php",!0),e.send())},_setVideo:function(e){var t,i,o,n;return e.preventDefault(),this.getDialogue({focusAfterHide:null}).hide(),e=this._dialogContent.one("#id_mediaid").get("value"),t=this._dialogContent.one("#id_mediawidth").get("value"),i=this._dialogContent.one("#id_mediaheight").get("value"),n=this._dialogContent.one("#id_mediaimg").get("value")||"/static/mediaserver/images/video.svg",e&&(o=this.get("host"),this.editor.focus(),o.setSelection(this._currentSelection),n="1"===this.get("useFilter")?'<img class="atto_ubicast mediaid_{{ mediaId }}"style="display: block; width: {{ mediaW }}; height: {{ mediaH }};" src="'+(this.get("ubicastURL")+n)+'"/>':'<iframe class="nudgis-iframe" style="width: {{ mediaW }}; height: {{ mediaH }}; background-color: #ddd;" src="'+window.M.cfg.wwwroot+'/lib/editor/atto/plugins/ubicast/view.php?course={{ courseId }}&video={{ mediaId }}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe>',n=a.Handlebars.compile(n)({courseId:this.getCourseId(),mediaId:e,mediaW:t,mediaH:i}),o.insertContentAtFocusPoint(n),this.markUpdated()),!1}},{ATTRS:{enabled:null,ubicastURL:null,speakerContent:null,useFilter:null}})},"@VERSION@",{requires:["promise","moodle-editor_atto-plugin","event-valuechange"]});