var langs = [
    ["Afrikaans", ["af-ZA"]],
    ["Bahasa Indonesia", ["id-ID"]],
    ["Bahasa Melayu", ["ms-MY"]],
    ["Català", ["ca-ES"]],
    ["Čeština", ["cs-CZ"]],
    ["Deutsch", ["de-DE"]],
    ["English", ["en-AU", "Australia"],
        ["en-CA", "Canada"],
        ["en-IN", "India"],
        ["en-NZ", "New Zealand"],
        ["en-ZA", "South Africa"],
        ["en-GB", "United Kingdom"],
        ["en-US", "United States"]
    ],
    ["Español", ["es-AR", "Argentina"],
        ["es-BO", "Bolivia"],
        ["es-CL", "Chile"],
        ["es-CO", "Colombia"],
        ["es-CR", "Costa Rica"],
        ["es-EC", "Ecuador"],
        ["es-SV", "El Salvador"],
        ["es-ES", "España"],
        ["es-US", "Estados Unidos"],
        ["es-GT", "Guatemala"],
        ["es-HN", "Honduras"],
        ["es-MX", "México"],
        ["es-NI", "Nicaragua"],
        ["es-PA", "Panamá"],
        ["es-PY", "Paraguay"],
        ["es-PE", "Perú"],
        ["es-PR", "Puerto Rico"],
        ["es-DO", "República Dominicana"],
        ["es-UY", "Uruguay"],
        ["es-VE", "Venezuela"]
    ],
    ["Euskara", ["eu-ES"]],
    ["Français", ["fr-FR"]],
    ["Galego", ["gl-ES"]],
    ["Hrvatski", ["hr_HR"]],
    ["IsiZulu", ["zu-ZA"]],
    ["Íslenska", ["is-IS"]],
    ["Italiano", ["it-IT", "Italia"],
        ["it-CH", "Svizzera"]
    ],
    ["Magyar", ["hu-HU"]],
    ["Nederlands", ["nl-NL"]],
    ["Norsk bokmål", ["nb-NO"]],
    ["Polski", ["pl-PL"]],
    ["Português", ["pt-BR", "Brasil"],
        ["pt-PT", "Portugal"]
    ],
    ["Română", ["ro-RO"]],
    ["Slovenčina", ["sk-SK"]],
    ["Suomi", ["fi-FI"]],
    ["Svenska", ["sv-SE"]],
    ["Türkçe", ["tr-TR"]],
    ["български", ["bg-BG"]],
    ["Pусский", ["ru-RU"]],
    ["Српски", ["sr-RS"]],
    ["한국어", ["ko-KR"]],
    ["中文", ["cmn-Hans-CN", "普通话 (中国大陆)"],
        ["cmn-Hans-HK", "普通话 (香港)"],
        ["cmn-Hant-TW", "中文 (台灣)"],
        ["yue-Hant-HK", "粵語 (香港)"]
    ],
    ["日本語", ["ja-JP"]],
    ["Lingua latīna", ["la"]]
];
var CKWebSpeechCommandVoice = function(a) {
    this._editor = a;
    this._commandvoice = false;
    this._commands = false;
    this._regexpcommand = false;
    this.CKWebSpeechCommandVoice(this._editor.config)
};
CKWebSpeechCommandVoice.prototype.CKWebSpeechCommandVoice = function(a) {
    if (typeof this._editor.config.ckwebspeech == "undefined") {
        this._editor.config.ckwebspeech = {}
    }
    this.setCommands(this._editor.config)
};
CKWebSpeechCommandVoice.prototype.setCommands = function(b) {
    var c = false;
    var a = false;
    if (b.ckwebspeech.commandvoice) {
        c = b.ckwebspeech.commandvoice
    }
    if (b.ckwebspeech.commands) {
        a = this.makeCommands(b.ckwebspeech.commands)
    }
    if (c && a) {
        this._regexpcommand = new RegExp("(" + c + "){1}\\s{1}(" + a + ")", "gi");
        this._commands = b.ckwebspeech.commands;
        this._commandvoice = c
    }
};
CKWebSpeechCommandVoice.prototype.makeCommands = function(a) {
    var c = "";
    if (a instanceof Array) {
        for (var b = 0; b < a.length; b++) {
            var d = a[b];
            c += this.makeValidCommand(d)
        }
        return c == "" ? false : c.replace(/\|$/gi, "")
    } else {
        return false
    }
};
CKWebSpeechCommandVoice.prototype.makeValidCommand = function(b) {
    var c = new RegExp("(newline|newparagraph|undo|redo)");
    if (typeof b == "object") {
        for (var a in b) {
            if (c.test(a)) {
                return b[a] + "|"
            }
        }
    }
    return ""
};
CKWebSpeechCommandVoice.prototype.buildResult = function(a) {
    if (this._regexpcommand) {
        var b;
        var e = [];
        while ((b = this._regexpcommand.exec(a)) != null) {
            e.push(b[2])
        }
        for (var c = 0; c < e.length; c++) {
            var f = new String(e[c]);
            var d = this.getCommandForResult(f);
            a = this.execCmd(d, f, a)
        }
        return a
    } else {
        return a
    }
};
CKWebSpeechCommandVoice.prototype.execCmd = function(c, d, a) {
    var b = new RegExp(this._commandvoice + " " + d + "\\s?", "gi");
    switch (c) {
        case "new line":
            return a.replace(b, "\n");
        case "new paragraph":
            return a.replace(b, "\n\n");
        case "undo":
            this._editor.execCommand("undo");
            return false;
        case "redo":
            this._editor.execCommand("redo");
            return false;
        default:
            return a
    }
};
CKWebSpeechCommandVoice.prototype.getCommandForResult = function(c) {
    this._commands;
    for (var b = 0; b < this._commands.length; b++) {
        for (var a in this._commands[b]) {
            if (this._commands[b][a] == c) {
                return a
            }
        }
    }
    return ""
};
var CKWebSpeechHandler = function(a) {
    CKWebSpeechCommandVoice.call(this, a);
    this._currentCulture = {
        val: "en-US",
        langVal: 6
    };
    this._elmtPlugIcon;
    this._plugPath;
    this._recognizing;
    this._recognition;
    this._ignoreOnend;
    this._start_timestamp;
    this._working;
    this.CKWebSpeechHandler()
};
CKWebSpeechHandler.prototype = Object.create(CKWebSpeechCommandVoice.prototype);
CKWebSpeechHandler.prototype.CKWebSpeechHandler = function() {
    this._recognition;
    this._plugPath = this._editor.plugins.ckwebspeech.path;
    this._recognizing = false;
    this._ignoreOnend = false;
    this._working = false;
    this.getElementPluginIcon();
    this.initServiceSpeech()
};
CKWebSpeechHandler.prototype.isUnlockedService = function() {
    if (!("webkitSpeechRecognition" in window)) {
        return false
    }
    return true
};
CKWebSpeechHandler.prototype.getElementPluginIcon = function() {
    var c = this;
    var a = 0;
    var b = setInterval(function() {
        a++;
        var d;
        try {
            d = document.getElementById(c._editor.ui.instances.webSpeechEnabled._.id)
        } catch (e) {
            d = null
        }
        if (d !== null) {
            c._elmtPlugIcon = d.getElementsByClassName("cke_button__webspeechenabled_icon")[0];
            clearInterval(b)
        }
        if (a == 500) {
            clearInterval(b)
        }
    }, 1)
};

CKWebSpeechHandler.prototype.updateIcons = function() {
    if (this._recognizing) {
        this._editor.ui.get("webSpeechEnabled").label = "Disable";
        this._editor.ui.get("webSpeechEnabled").icon = this._plugPath + "icons/webspeech.png";
        this._elmtPlugIcon.style.backgroundImage = "url(" + this._plugPath + "icons/webspeech-enable.gif)"
    } else {
        this._editor.ui.get("webSpeechEnabled").label = "Enable";
        this._editor.ui.get("webSpeechEnabled").icon = this._plugPath + "icons/webspeech-enable.gif";
        this._elmtPlugIcon.style.backgroundImage = "url(" + this._plugPath + "icons/webspeech.png)"
    }
};
CKWebSpeechHandler.prototype.initServiceSpeech = function() {
    if (this.isUnlockedService()) {
        this._recognition = new webkitSpeechRecognition();
        this._recognition.continuous = true;
        this._recognition.interimResults = true;
        var a = this;
        this._recognition.onstart = function() {
            a.onStart()
        };
        this._recognition.onerror = function(b) {
            a.onError(b)
        };
        this._recognition.onend = function() {
            a.onEnd()
        };
        this._recognition.onresult = function(b) {
            a.onResult(b)
        };
        this._recognition.onspeechstart = function(b) {
            a.onSpeech()
        };
        this._recognition.onspeechend = function(b) {
            a.onSpeechEnd()
        }
    }
};
CKWebSpeechHandler.prototype.onStart = function() {
    this._recognizing = true;
    this.updateIcons()
};
CKWebSpeechHandler.prototype.onError = function(a) {
    if (a.error == "no-speech") {
        this._ignore_onend = true
    }
    if (a.error == "audio-capture") {
        this._ignore_onend = true
    }
    if (a.error == "not-allowed") {
        if (a.timeStamp - this._start_timestamp < 100) {} else {}
        this._ignore_onend = true
    }
    this.updateIcons()
};
CKWebSpeechHandler.prototype.onEnd = function() {
    this._recognizing = false;
    if (this._ignoreOnend) {
        return
    }
    this.updateIcons()
};
CKWebSpeechHandler.prototype.onSpeech = function(a) {
    this._elmtPlugIcon.style.backgroundImage = "url(" + this._plugPath + "icons/speech.gif)"
};
CKWebSpeechHandler.prototype.onSpeechEnd = function(a) {
    this.updateIcons()
};
CKWebSpeechHandler.prototype.onResult = function(c) {
    if (typeof(c.results) == "undefined") {
        this._recognizing = false;
        this._recognition.onend = null;
        this._recognition.stop();
        this.updateIcons();
        return
    }
    this._elmtPlugIcon.style.backgroundImage = "url(" + this._plugPath + "icons/speech.gif)";
    for (var b = c.resultIndex; b < c.results.length; ++b) {
        if (c.results[b].isFinal) {
            var a = this.buildResult(c.results[b][0].transcript);
            if (a) {
                this._editor.insertText(a)
            }
            this.updateIcons()
        }
    }
};
CKWebSpeechHandler.prototype.toogleSpeech = function() {
    if (!this._recognizing) {
        this._recognition.lang = this._currentCulture.val;
        this._recognition.start();
        this._ignore_onend = false;
        this._start_timestamp = new Date().getTime()
    } else {
        this._recognition.stop()
    }
};
var CKWebSpeech = function(a) {
    CKWebSpeechHandler.call(this, a);
    this._langs = langs;
    this.CKWebSpeech()
};
CKWebSpeech.prototype = Object.create(CKWebSpeechHandler.prototype);
CKWebSpeech.prototype.CKWebSpeech = function() {
    if (typeof this._editor.config.ckwebspeech == "undefined") {
        this._editor.config.ckwebspeech = {}
    }
    if (this._editor.config.ckwebspeech.culture) {
        this.setDialectByCulture(this._editor.config.ckwebspeech.culture)
    }
};
CKWebSpeech.prototype.setDialectByCulture = function(c) {
    for (var b = 0; b < this._langs.length; b++) {
        for (var a = 1; a < this._langs[b].length; a++) {
            if (this._langs[b][a][0].toLowerCase() == c.toLowerCase()) {
                this._currentCulture = {
                    val: this._langs[b][a][0],
                    langVal: b
                };
                return this._currentCulture
            }
        }
    }
    return this._currentCulture
};
CKWebSpeech.prototype.setDialectByLanguage = function(a) {
    this.setDialectByCulture(this._langs[a][1][0])
};
CKWebSpeech.prototype.getLanguages = function() {
    var b = new Array();
    for (var a = 0; a < this._langs.length; a++) {
        b.push(new Array(this._langs[a][0], a))
    }
    return b
};
CKWebSpeech.prototype.getCultures = function(a) {
    if (typeof a === "undefined") {
        a = this._currentCulture.langVal
    }
    var c = new Array();
    for (var b = 1; b < this._langs[a].length; b++) {
        c.push(new Array(this._langs[a][b][0]))
    }
    return c
};
CKEDITOR.plugins.add("ckwebspeech", {
    icons: "webspeech",
    init: function(b) {
        b.ckWebSpeech = new CKWebSpeech(b);
        var a = this.path;
        b.addCommand("webspeechDialog", new CKEDITOR.dialogCommand("webspeechDialog"));
        b.addCommand("webspeechToogle", {
            exec: function(c) {
                c.ckWebSpeech.toogleSpeech()
            }
        });
        b.ui.addButton("webSpeechEnabled", {
            label: "Enable",
            icon: a + "icons/webspeech.png",
            command: "webspeechToogle",
            toolbar: "ckwebspeech"
        });
        b.ui.addButton("webSpeechSettings", {
            label: "Settings",
            icon: a + "icons/webspeech-settings.png",
            command: "webspeechDialog",
            toolbar: "ckwebspeech"
        });
        CKEDITOR.dialog.add("webspeechDialog", this.path + "dialogs/ckwebspeech.js")
    }
});