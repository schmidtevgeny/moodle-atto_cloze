YUI.add("moodle-atto_cloze-button",function(e,t){var n="atto_cloze",r={ANSWER:"atto_cloze_answer",ANSWERS:"atto_cloze_answers",ADD:"atto_cloze_add",CANCEL:"atto_cloze_cancel",DELETE:"atto_cloze_delete",FEEDBACK:"atto_cloze_feedback",FRACTION:"atto_cloze_fraction",LEFT:"atto_cloze_col0",RIGHT:"atto_cloze_col1",MARKS:"atto_cloze_marks",DUPLICATE:"atto_cloze_duplicate",SUBMIT:"atto_cloze_submit",SUMMARY:"atto_cloze_summary",TOLERANCE:"atto_cloze_tolerance",TYPE:"atto_cloze_qtype"},i={FORM:'<div class="atto_cloze"><form class="atto_form"><p>{{qtype}}<label for="{{elementid}}_mark">{{get_string "defaultmark" "core_question"}}</label><input id="{{elementid}}_mark" type="text" class="{{CSS.MARKS}}" value="{{marks}}" /><div class="{{CSS.ANSWERS}}"><ol>{{#answerdata}}<li><div><div class="{{../CSS.LEFT}}"><button class="{{../CSS.ADD}}" title="{{get_string "addmoreanswerblanks" "qtype_calculated"}}">+</button><button class="{{../CSS.DELETE}}" title="{{get_string "delete" "core"}}">-</button><br /><label id="{{id}}_grade">{{get_string "grade" "core"}}</label><select id="{{id}}_grade" value="{{fraction}}" class="{{../CSS.FRACTION}}" selected>{{#if fraction}}<option value="{{../fraction}}">{{../fraction}}%</option>{{/if}}<option value="">{{get_string "incorrect" "core_question"}}</option>{{#../fractions}}<option value="{{fraction}}">{{fraction}}%</option>{{/../fractions}}</select></div><div class="{{../CSS.RIGHT}}"><label for="{{id}}_answer">{{get_string "answer" "core"}}</label><input id="{{id}}_answer" type="text" class="{{../CSS.ANSWER}}" value="{{answer}}" />{{#if ../numerical}}<label for="{{id}}_tolerance">{{{get_string "tolerance" "qtype_calculated"}}}</label><input id="{{id}}_tolerance" type="text" class="{{../../CSS.TOLERANCE}}" value="{{tolerance}}" />{{/if}}<label for="{{id}}_feedback">{{get_string "feedback" "core"}}</label><input id="{{id}}_feedback" type="text" class="{{../CSS.FEEDBACK}}" value="{{feedback}}" /></div></div>{{/answerdata}}</ol><p><button class="{{CSS.ADD}}" title="{{get_string "addmoreanswerblanks" "qtype_calculated"}}">+</button></div></p><p><button type="submit" class="{{CSS.SUBMIT}}" title="{{get_string "common:insert" "editor_tinymce"}}">{{get_string "common:insert" "editor_tinymce"}}</button><button type="submit" class="{{CSS.CANCEL}}">{{get_string "cancel" "core"}}</button></p></form></div>',OUTPUT:"&#123;{{marks}}:{{qtype}}:{{#answerdata}}~{{#if fraction}}%{{../fraction}}%{{/if}}{{answer}}{{#if tolerance}}:{{tolerance}}{{/if}}{{#if feedback}}#{{feedback}}{{/if}}{{/answerdata}}&#125;",TYPE:'<div class="atto_cloze">{{get_string "chooseqtypetoadd" "question"}}<form ="atto_form"><div class="{{CSS.TYPE}}">{{#types}}<div class="option"><input name="qtype" id="qtype_qtype_{{type}}" value="{{type}}" type="radio"><label for="qtype_qtype_{{type}}"><span class="typename">{{type}}</span><span class="{{../CSS.SUMMARY}}"><h6>{{name}}</h6><p>{{summary}}</p><ul>{{#options}}<li>{{option}}</li>{{/options}}</ul></span></label></div>{{/types}}</div><p><button type="submit" class="{{CSS.SUBMIT}}" title="{{get_string "add" "core"}}">{{get_string "add" "core"}}</button>{{#qtype}}<button type="submit" class="{{../CSS.DUPLICATE}}">{{get_string "duplicate" "core"}}</button>{{/qtype}}<button type="submit" class="{{CSS.CANCEL}}">{{get_string "cancel" "core"}}</button></p></form></div>'},s=[{fraction:100},{fraction:50},{fraction:33.33333},{fraction:25},{fraction:20},{fraction:16.66667},{fraction:14.28571},{fraction:12.5},{fraction:11.11111},{fraction:10},{fraction:5},{fraction:0},{fraction:-5},{fraction:-10},{fraction:-11.11111},{fraction:-12.5},{fraction:-14.28571},{fraction:-16.66667},{fraction:-20},{fraction:-25},{fraction:-33.333},{fraction:-50},{fraction:-100}];e.namespace("M.atto_cloze").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{_form:null,_answerdata:null,_qtype:null,_selectedText:null,_marks:null,_currentSelection:null,initializer:function(){this._groupFocus={};var e=this.get("host").editor.ancestor("body#page-question-type-multianswer form");if(!e||!this.get("host").editor.compareTo(e.one(".editor_atto_content"))||!e.test('[action="question.php"]'))return;this.addButton({icon:"icon",iconComponent:"qtype_multianswer",callback:this._displayDialogue}),this._marks=1,this._answerDefault="",this.get("host").on("atto:selectionchanged",function(){this._resolveSubquestion()?this.highlightButtons():this.unHighlightButtons()},this)},_displayDialogue:function(){var e=this.get("host");e.editor.focus(),this._currentSelection=e.getSelection();if(this._currentSelection===!1)return;this._selectedText=this._currentSelection.toString();var t=this.getDialogue({headerContent:M.util.get_string("pluginname",n),bodyContent:'<div style="height:500px"></div>',width:500},!0),r=this._resolveSubquestion();r?(this._parseSubquestion(r),t.set("bodyContent",this._getDialogueContent(null,this._qtype))):t.set("bodyContent",this._getDialogueContent()),t.show(),this._dialogue=t},_getDialogueContent:function(t,n){var o,u;return this._form&&this._form.remove().destroy(!0),n?(o=e.Handlebars.compile(i.FORM),u=e.Node.create(o({CSS:r,answerdata:this._answerdata,elementid:e.guid(),fractions:s,qtype:this._qtype,marks:this._marks,numerical:this._qtype==="NUMERICAL"||this._qtype==="NM"})),this._form=u,u.one("."+r.SUBMIT).on("click",this._setSubquestion,this),u.one("."+r.CANCEL).on("click",this._cancel,this),u.delegate("click",this._deleteAnswer,"."+r.DELETE,this),u.delegate("click",this._addAnswer,"."+r.ADD,this),u):(o=e.Handlebars.compile(i.TYPE),u=e.Node.create(o({CSS:r,qtype:this._qtype,types:this.get("questiontypes")})),this._form=u,u.delegate("click",this._choiceHandler,"."+r.SUBMIT+", ."+r.DUPLICATE,this),u.one("."+r.CANCEL).on("click",this._cancel,this),u)},_getAnswerDefault:function(){switch(this._qtype){case"SHORTANSWER":case"SA":case"NUMERICAL":case"NM":this._answerDefault=100;break;default:this._answerDefault=""}},_choiceHandler:function(t){t.preventDefault();var n=this._form.one("input[name=qtype]:checked"
);n&&(this._qtype=n.get("value"),this._getAnswerDefault()),t&&t.currentTarget&&t.currentTarget.hasClass(r.SUBMIT)&&(this._answerdata=[{id:e.guid(),answer:this._selectedText,feedback:"",fraction:100,tolerance:0}]),this._dialogue.set("bodyContent",this._getDialogueContent(t,this._qtype)),this._form.one("."+r.ANSWER).focus()},_parseSubquestion:function(t){var n=/\{([0-9]*):([_A-Z]+):(.*?)\}$/g,r=n.exec(t);if(!r)return;this._marks=r[1],this._qtype=r[2],this._getAnswerDefault(),this._answerdata=[];var i=r[3].match(/(\\.|[^~])*/g);if(!i)return;i.forEach(function(t){var n=/^(%(-?[\.0-9]+)%|(=?))((\\.|[^#])*)#?(.*)/.exec(t);if(n&&n[4]){if(this._qtype==="NUMERICAL"||this._qtype==="NM"){var r=/^([^:]*):?(.*)/.exec(n[4])[2]||0;this._answerdata.push({answer:this._decode(n[4].replace(/:.*/,"")),id:e.guid(),feedback:this._decode(n[6]),tolerance:r,fraction:n[3]?100:n[2]||0});return}this._answerdata.push({answer:this._decode(n[4]),id:e.guid(),feedback:this._decode(n[6]),fraction:n[3]?100:n[2]||0})}},this)},_addAnswer:function(t){t.preventDefault();var n=this._form.all("."+r.ADD).indexOf(t.target);this._getFormData()._answerdata.splice(n,0,{answer:"",id:e.guid(),feedback:"",fraction:this._answerDefault,tolerance:0}),this._dialogue.set("bodyContent",this._getDialogueContent(t,this._qtype)),this._form.all("."+r.ANSWER).item(n).focus()},_deleteAnswer:function(e){e.preventDefault();var t=this._form.all("."+r.DELETE).indexOf(e.target);this._getFormData()._answerdata.splice(t,1),this._dialogue.set("bodyContent",this._getDialogueContent(e,this._qtype));var n=this._form.all("."+r.ANSWER);t=Math.min(t,n.size()-1),n.item(t).focus()},_cancel:function(e){e.preventDefault(),this._dialogue.hide()},_setSubquestion:function(t){t.preventDefault();var n=e.Handlebars.compile(i.OUTPUT);this._getFormData(),this._answerdata.forEach(function(e){e.answer=this._encode(e.answer),e.feedback=this._encode(e.feedback)},this);var s=n({CSS:r,answerdata:this._answerdata,qtype:this._qtype,marks:this._marks}),o=this.get("host");this._dialogue.hide(),o.focus(),o.setSelection(this._currentSelection);var u=window.rangy.saveSelection();o.insertContentAtFocusPoint(s),window.rangy.restoreSelection(u)},_getFormData:function(){this._answerdata=[];var t,n=this._form.all("."+r.ANSWER),i=this._form.all("."+r.FEEDBACK),s=this._form.all("."+r.FRACTION),o=this._form.all("."+r.TOLERANCE);for(var u=0;u<n.size();u++){t=n.item(u).getDOMNode().value;if(this._qtype==="NM"||this._qtype==="NUMERICAL")t=Number(t);this._answerdata.push({answer:t,id:e.guid(),feedback:i.item(u).getDOMNode().value,fraction:s.item(u).getDOMNode().value,tolerance:o.item(u)?o.item(u).getDOMNode().value:0}),this._marks=this._form.one("."+r.MARKS).getDOMNode().value}return this},_getAnchor:function(e,t){if(!e.hasChildNodes())return{anchor:e,offset:t};var n=e.firstChild;while(t>n.textContent.length)t-=n.textContent.length,n=n.nextSibling;return this._getAnchor(n,t)},_getOffset:function(e,t){if(e===t)return 0;if(!e.contains(t))return;var n=0,r=e.firstChild;while(!r.contains(t))n+=r.textContent.length,r=r.nextSibling;return n+this._getOffset(r,t)},_encode:function(e){return String(e).replace(/(#|\}|~)/g,"\\$1")},_decode:function(e){return String(e).replace(/\\(#|\}|~)/g,"$1")},_resolveSubquestion:function(){var e=this.get("host"),t=e.getSelectionParentNode(),n=/\{[0-9]*:(\\.|[^}])*?\}/g;if(!t)return;var r=t.textContent.match(n);if(!r)return;var i,s=this.get("host").getSelection(),o="",u=0;if(!s||s.length===0)return!1;var a=this._getOffset(t,s[0].startContainer)+s[0].startOffset,f;return s[0].endContainer.firstChild?f=this._getOffset(t,s[0].endContainer.childNodes[s[0].endOffset]):f=this._getOffset(t,s[0].endContainer)+s[0].endOffset,r.forEach(function(e){i=t.textContent.indexOf(e,u),u=i+e.length;if(i<=a&&f<=u){o=e;var n=this._getAnchor(t,i),r=this._getAnchor(t,u);s[0].setStart(n.anchor,n.offset),s[0].setEnd(r.anchor,r.offset),this._currentSelection=s}},this),o}},{ATTRS:{questiontypes:[]}})},"@VERSION@",{requires:["escape","moodle-tinymce_cloze-editor"]});
