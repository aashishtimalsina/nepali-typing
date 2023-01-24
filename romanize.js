 var browser = navigator.appName;
function LTrim(value) {

    var re = /\s*((\S+\s*)*)/;
    return value.replace(re, "$1");

}

// Removes ending whitespaces
function RTrim(value) {
    var re = /((\s*\S+)*)\s*/;
    return value.replace(re, "$1");

}
// Removes leading and ending whitespaces
function trim(value) {
    return LTrim(RTrim(value));

}
function setUnicode(e, field) {
   
    if (e.ctrlKey) {
        return true;
    }
    try {
        (eval('obj_' + field.id));
    }
    catch (ex) {
        eval('obj_' + field.id + '=new unicode_const()');
    }


    var unicode = e.charCode ? e.charCode : e.keyCode;

    var check = true;
    if (browser == "Netscape" && e.keyCode != 0) {
        e.preventDefault();
    }

    if (check) {
      
        new_value = eval('obj_' + field.id + '.toUnicode(String.fromCharCode(unicode),unicode,field)');
    
        if (new_value == null)
            return false;
        if (new_value == "")
            new_value = String.fromCharCode(unicode);
       
        eval('obj_' + field.id + '.insertAtCursor(field,"",0)');
        eval('obj_' + field.id + '.insertAtCursor(field,new_value,0)');
        //var txtVal = $("#" + field.id).val();
        //var repval = txtVal.substr(0, txtVal.length - 1)
        //$("#" + field.id).val(repval); 
        return false; //disable key press
    }
}

function ascii_value(c) {
    // restrict input to a single character
    c = c.charAt(0);

    // loop through all possible ASCII values
    var i;
    for (i = 0; i < 256; ++i) {
        // convert i into a 2-digit hex string
        var h = i.toString(16);
        if (h.length == 1)
            h = "0" + h;

        // insert a % character into the string
        h = "%" + h;

        // determine the character represented by the escape code
        h = unescape(h);

        // if the characters match, we've found the ASCII value
        if (h == c)
            break;
    }
    return i;
}

function unicode_const() {
    this.buffer = '';
    this.found = false;
    this.buffStart = false;
    this.stepBack = 0;
    this.cursor_position_before_hand = 0;
    this.cursor_position_after_hand = 0;
    this.toUnicode = toUnicode;
    this.insertAtCursor = insertAtCursor;
}

function insertAtCursor(myField, myValue, back_track) {
    pos = doGetCaretPosition(myField);
    if (document.selection) {
        if (!this.found) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
            sel.select();
        }
        else {
            myField.value = myField.value.substring(0, pos - back_track) + myValue + myField.value.substring(pos, myField.value.length);
            var range = myField.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos - this.stepBack);
            range.moveStart('character', pos - this.stepBack);
            range.select();
            this.found = false;
            this.stepBack = 0;
        }
    }
    //MOZILLA/NETSCAPE support
    else if (myField.selectionStart || myField.selectionStart == '0') {

        var startPos = myField.selectionStart - back_track;
        var endPos = myField.selectionEnd;

        var newEndPos = startPos + myValue.length;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
        myField.setSelectionRange(newEndPos, newEndPos);
    }
    else {
        var newEndPos = myField.value.length + myValue.length;
        myField.value += myValue;
        myField.setSelectionRange(newEndPos, newEndPos);
    }
}

/* -- End Hiding Here --> */

function caseA(val) {
    var index_case_a = new Array('em', 'If', 'if', ')f', 'f]', 'f}', 'cf', 'cf]', 'cf}', 'Qm', 'km', 'O{', 'qm');
    var value_case_a = new Array('झ', 'क्ष ', 'ष', 'ण', 'ो', 'ौ', 'आ', 'ओ', 'औ', 'क्त', 'फ', 'ई', 'क्र');
    if (getUcIndex(index_case_a, val) != -1)
        return value_case_a[getUcIndex(index_case_a, val)];
    else
        return false;
}

function toUnicode(char, keyChar, fld) {
// debugger
    var font = '﻿splasplbsplcspldsplesplfsplgsplhsplispljsplkspllsplmsplsplnsplosplpsplqsplrsplsspltsplusplvsplwsplxsplysplzsplAsplBsplCsplDsplEsplFsplGsplHsplIsplJsplKsplLsplMsplNsplOsplPsplQsplRsplSsplTsplUsplVsplWsplXsplYsplZspl1spl2spl3spl4spl5spl6spl7spl8spl9spl0spl.spl:spl,spl;spl(spl*spl!spl@spl?spl\'spl)spl]spl[spl}spl{spl`spl~spl#spl$spl%spl^spl&spl-spl_spl+spl=spl|spl/spl"spl\\spl<spl>splªspl«spl§spl°spl±spl´splµspl¶spl¯spl¸spl¹splÅsplÆsplÈsplËsplÌsplÍsplÎsplÏsplÒsplÓsplÕsplÖspl×splØsplÙsplÚsplÛsplÜsplÝsplÞsplßsplàsplásplâsplãsplåsplæsplçsplèsplésplêsplësplìsplísplîsplïsplðsplñsplòsplósplôsplõsplöspl÷spløsplùsplˆsplˉspl˜splμspl‐spl–spl—spl‘spl„spl•spl…spl‰spl›spl«';
    var unicode = 'splाsplबsplचsplदsplेsplउsplगsplहsplिsplजsplकsplलsplमsplsplनsplोsplपsplटsplरsplसsplतsplुsplवsplौsplडsplयsplषsplआsplभsplछsplधsplैsplऊsplघsplअsplीsplझsplखsplsplंsplणsplओsplफsplठsplृsplशsplथsplूsplँsplऔsplढsplञsplऋspl१spl२spl३spl४spl५spl६spl७spl८spl९spl०spl।splspl,splsplsplsplsplsplsplsplsplएsplइsplऐsplईsplsplsplsplsplsplsplspl-splsplsplsplःspl्splsplॐsplङsplsplsplsplsplsplsplsplsplsplspl(spl)splहृspl"splरूsplङ्गsplन्नsplङ्गsplङ्खsplङ्घsplsplsplक्कspl=spl×splspl;spl\'spl!spl%splsplsplद्मsplsplsplय्splक्षsplद्वsplsplॐsplsplsplषsplिँsplफ्splऊsplज्जsplत्रsplत्त्splद्भsplझsplझ्splॅsplल्लsplऋsplsplच्चsplत्र्splsplsplऽsplsplsplsplsplॅsplध्रsplड्डsplsplsplद्रspl्र';
    //var unicode = 'splबsplदsplअsplमsplभsplाsplनsplजsplष्splवsplपsplिsplऽsplsplलsplयsplउsplत्रsplचsplकsplतsplगsplखsplधsplहsplथsplशsplब्splद्यsplऋsplम्splभ्splँsplन्splज्splक्ष्splव्splप्splीsplःsplल्splइsplएsplत्तsplच्splक्splत्splग्splख्splध्splह्splथ्splश्spl१spl२spl३spl४spl५spl६spl७spl८spl९spl०spl।splस्spl,splसsplढsplडsplज्ञsplद्दsplरुsplुsplण्splेsplृsplैsplर्splञsplञ्splघsplद्धsplछsplटsplठspl-spl)splंspl॰spl्रsplरsplूspl्spl?splश्रsplङsplsplट्टsplड्ढspl+splsplsplठ्ठsplspl(spl)splहृspl"splरूsplङ्गsplन्नsplङ्गsplङ्खsplङ्घsplsplsplक्कspl=spl×splspl;spl\'spl!spl%splsplsplद्मsplsplsplय्splक्षsplद्वsplsplॐsplsplsplषsplिँsplफ्splऊsplज्जsplत्रsplत्त्splद्भsplझsplझ्splॅsplल्लsplऋsplsplच्चsplत्र्splsplsplऽsplsplsplsplsplॅsplध्रsplड्डsplsplsplद्रspl्र';
    font = (font.split('spl'));
    unicode = (unicode.split('spl'));

    var init_check = Array('e', 'I', 'i', ')', 'f', 'c', 'Q', 'k', 'O', 'q');

    if (getUcIndex(init_check, char) != -1)
        this.buffStart = true;
    if (this.buffStart)
        this.buffer += char;
    if (trim(char) == '') {
        this.buffStart = false;
        this.buffer = '';
    }
    this.cursor_position_before_hand = this.cursor_position_after_hand;
    this.cursor_position_after_hand = doGetCaretPosition(fld);
    if (caseA(this.buffer)) {
        buffer_text = caseA(this.buffer);
        this.found = true;
        if (buffer_text == 'ष' || buffer_text == 'ण') {
            back_track = 2;
            this.stepBack = 1;
        }
        else if (trim(buffer_text) == 'क्ष') {
            back_track = 4;
            this.stepBack = 1;
        }
        else if (trim(buffer_text) == 'क्त' || trim(buffer_text) == 'क्र')
            back_track = 3;
        else
            back_track = 1;
        if (this.cursor_position_after_hand == this.cursor_position_before_hand + back_track || this.cursor_position_after_hand == this.cursor_position_before_hand) {
            this.insertAtCursor(fld, trim(buffer_text), back_track);
            return null;
        }
        else {
            this.buffStart = false;
            this.buffer = '';
        }
    }
    else if (this.buffer.length > 1) {
        this.buffStart = false;
        this.buffer = '';
        if (getUcIndex(init_check, char) != -1) {
            this.buffStart = true;
            this.buffer += char;
        }
    }

    if (unicode[getUcIndex(font, char)] != 'undefined')
        return unicode[getUcIndex(font, char)];
}
function getUcIndex(arr, ch) {

    var myPosition = -1;
    for (var i = 0; i < arr.length; i++) {
        if (trim(arr[i]) == trim(ch)) {
            myPosition = i;
            break;
        }
    }

    return myPosition;
}
function doGetCaretPosition(ctrl) {

    var CaretPos = 0;
    // IE Support
    if (document.selection) {

        ctrl.focus();
        var Sel = document.selection.createRange();

        Sel.moveStart('character', -ctrl.value.length);

        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;

    return (CaretPos);

}