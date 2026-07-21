document.addEventListener("DOMContentLoaded", function () {

    const defaultPreset = {
        useAppIcon: "false",
        appIconPath: "Img/logo.png",
        appIconSize: "0.16",
        iconType: "remix",
        iconUnicode: "\\uEA4A",
        faTag: "[fa-exclamation-triangle]",
        titleText: "TERMINATE?",
        msgText: "Connection will be severed. Do you want to close this instance?",
        cancelText: "ABORT",
        exitText: "CONFIRM",
        bgType: "gradient",
        bgColor: "#1E1E2E",
        bgColor2: "#0F0F1A",
        gradOrient: "Top-Bottom",
        titleColor: "#00FF66",
        msgColor: "#FFFFFF",
        btnRadius: 12,
        cancelBg: "#2A2A3C",
        cancelTextClr: "#89B4FA",
        exitBg: "#F38BA8",
        exitTextClr: "#11111B"
    };

    const elements = {
        resetPresetBtn: document.getElementById("resetPresetBtn"),
        useAppIcon: document.getElementById("useAppIcon"),
        appIconPath: document.getElementById("appIconPath"),
        appIconSize: document.getElementById("appIconSize"),
        iconType: document.getElementById("iconType"),
        iconUnicode: document.getElementById("iconUnicode"),
        faTag: document.getElementById("faTag"),
        titleText: document.getElementById("titleText"),
        msgText: document.getElementById("msgText"),
        cancelText: document.getElementById("cancelText"),
        exitText: document.getElementById("exitText"),
        bgType: document.getElementById("bgType"),
        bgColor: document.getElementById("bgColor"),
        bgColor2: document.getElementById("bgColor2"),
        gradOrient: document.getElementById("gradOrient"),
        titleColor: document.getElementById("titleColor"),
        msgColor: document.getElementById("msgColor"),
        btnRadius: document.getElementById("btnRadius"),
        cancelBg: document.getElementById("cancelBg"),
        cancelTextClr: document.getElementById("cancelTextClr"),
        exitBg: document.getElementById("exitBg"),
        exitTextClr: document.getElementById("exitTextClr"),
        
        appIconGroup: document.getElementById("appIconGroup"),
        remixGroup: document.getElementById("remixGroup"),
        faGroup: document.getElementById("faGroup"),
        gradColorGroup: document.getElementById("gradColorGroup"),
        gradOrientGroup: document.getElementById("gradOrientGroup"),
        
        previewDialog: document.getElementById("previewDialog"),
        prevAppIconContainer: document.getElementById("prevAppIconContainer"),
        prevAppIcon: document.getElementById("prevAppIcon"),
        prevTitle: document.getElementById("prevTitle"),
        prevMsg: document.getElementById("prevMsg"),
        prevCancelBtn: document.getElementById("prevCancelBtn"),
        prevExitBtn: document.getElementById("prevExitBtn"),
        
        codeOutput: document.getElementById("codeOutput"),
        copyBtn: document.getElementById("copyBtn")
    };

    function handleToggles() {
        // App Icon Toggle
        if (elements.useAppIcon.value === "true") {
            elements.appIconGroup.classList.remove("hidden");
        } else {
            elements.appIconGroup.classList.add("hidden");
        }

        // Title Icon Toggle
        elements.remixGroup.classList.add("hidden");
        elements.faGroup.classList.add("hidden");
        if (elements.iconType.value === "remix") elements.remixGroup.classList.remove("hidden");
        else if (elements.iconType.value === "fontawesome") elements.faGroup.classList.remove("hidden");

        // Background / Gradient Toggle
        if (elements.bgType.value === "gradient") {
            elements.gradColorGroup.classList.remove("hidden");
            elements.gradOrientGroup.classList.remove("hidden");
        } else {
            elements.gradColorGroup.classList.add("hidden");
            elements.gradOrientGroup.classList.add("hidden");
        }

        updateGenerator();
    }

    function loadBasePreset() {
        elements.useAppIcon.value = defaultPreset.useAppIcon;
        elements.appIconPath.value = defaultPreset.appIconPath;
        elements.appIconSize.value = defaultPreset.appIconSize;
        elements.iconType.value = defaultPreset.iconType;
        elements.iconUnicode.value = defaultPreset.iconUnicode;
        elements.faTag.value = defaultPreset.faTag;
        elements.titleText.value = defaultPreset.titleText;
        elements.msgText.value = defaultPreset.msgText;
        elements.cancelText.value = defaultPreset.cancelText;
        elements.exitText.value = defaultPreset.exitText;
        elements.bgType.value = defaultPreset.bgType;
        elements.bgColor.value = defaultPreset.bgColor;
        elements.bgColor2.value = defaultPreset.bgColor2;
        elements.gradOrient.value = defaultPreset.gradOrient;
        elements.titleColor.value = defaultPreset.titleColor;
        elements.msgColor.value = defaultPreset.msgColor;
        elements.btnRadius.value = defaultPreset.btnRadius;
        elements.cancelBg.value = defaultPreset.cancelBg;
        elements.cancelTextClr.value = defaultPreset.cancelTextClr;
        elements.exitBg.value = defaultPreset.exitBg;
        elements.exitTextClr.value = defaultPreset.exitTextClr;

        handleToggles();
    }

    function parseUnicode(unicodeStr) {
        try {
            if (unicodeStr.startsWith("\\u")) {
                const hex = unicodeStr.replace("\\u", "");
                return String.fromCharCode(parseInt(hex, 16));
            }
        } catch (e) {
            return "";
        }
        return unicodeStr;
    }

    function updatePreview() {
        // 1. App Icon
        if (elements.useAppIcon.value === "true") {
            elements.prevAppIconContainer.classList.remove("hidden");
            elements.prevAppIcon.style.display = "block";
            elements.prevAppIcon.src = elements.appIconPath.value;
        } else {
            elements.prevAppIconContainer.classList.add("hidden");
        }

        // 2. Background Fill
        elements.previewDialog.style.borderRadius = elements.btnRadius.value + "px";
        if (elements.bgType.value === "gradient") {
            let cssDir = "to bottom";
            if (elements.gradOrient.value === "Left-Right") cssDir = "to right";
            else if (elements.gradOrient.value === "TL-BR") cssDir = "to bottom right";
            else if (elements.gradOrient.value === "BL-TR") cssDir = "to top right";

            elements.previewDialog.style.background = `linear-gradient(${cssDir}, ${elements.bgColor.value}, ${elements.bgColor2.value})`;
        } else {
            elements.previewDialog.style.background = elements.bgColor.value;
        }

        // 3. Title Icon + Text
        elements.prevTitle.style.color = elements.titleColor.value;
        if (elements.iconType.value === "remix") {
            const symbol = parseUnicode(elements.iconUnicode.value);
            elements.prevTitle.textContent = `${symbol} ${elements.titleText.value}`;
        } else if (elements.iconType.value === "fontawesome") {
            elements.prevTitle.textContent = `⚠️ ${elements.titleText.value}`;
        } else {
            elements.prevTitle.textContent = elements.titleText.value;
        }

        // 4. Message & Buttons
        elements.prevMsg.style.color = elements.msgColor.value;
        elements.prevMsg.textContent = elements.msgText.value;

        elements.prevCancelBtn.style.backgroundColor = elements.cancelBg.value;
        elements.prevCancelBtn.style.color = elements.cancelTextClr.value;
        elements.prevCancelBtn.style.borderRadius = elements.btnRadius.value + "px";
        elements.prevCancelBtn.textContent = elements.cancelText.value;

        elements.prevExitBtn.style.backgroundColor = elements.exitBg.value;
        elements.prevExitBtn.style.color = elements.exitTextClr.value;
        elements.prevExitBtn.style.borderRadius = elements.btnRadius.value + "px";
        elements.prevExitBtn.textContent = elements.exitText.value;
    }

    function generateCode() {
        // 1. Top App Icon Block
        let appIconCode = "";
        if (elements.useAppIcon.value === "true") {
            appIconCode = `    // Centered Top App Logo Icon
    var imgAppIcon = app.CreateImage("${elements.appIconPath.value}", ${elements.appIconSize.value}, -1);
    imgAppIcon.SetMargins(0, 0.01, 0, 0.02);
    layDlg.AddChild(imgAppIcon);

`;
        }

        // 2. Title Block
        let titleCode = "";
        if (elements.iconType.value === "remix") {
            titleCode = `    var txtTitle = app.CreateText("${elements.iconUnicode.value}  ${elements.titleText.value}", 0.75, -1, "Left,Bold");
    txtTitle.SetFontFile("assets/fonts/remixicon.ttf"); 
    txtTitle.SetTextColor("${elements.titleColor.value}"); 
    txtTitle.SetTextSize(22); 
    txtTitle.SetMargins(0.02, 0, 0.02, 0.015);
    layDlg.AddChild(txtTitle);`;
        } else if (elements.iconType.value === "fontawesome") {
            titleCode = `    var txtTitle = app.CreateText("${elements.faTag.value}  ${elements.titleText.value}", 0.75, -1, "Left,Bold,FontAwesome");
    txtTitle.SetTextColor("${elements.titleColor.value}"); 
    txtTitle.SetTextSize(22); 
    txtTitle.SetMargins(0.02, 0, 0.02, 0.015);
    layDlg.AddChild(txtTitle);`;
        } else {
            titleCode = `    var txtTitle = app.CreateText("${elements.titleText.value}", 0.75, -1, "Left,Bold");
    txtTitle.SetTextColor("${elements.titleColor.value}"); 
    txtTitle.SetTextSize(22); 
    txtTitle.SetMargins(0.02, 0, 0.02, 0.015);
    layDlg.AddChild(txtTitle);`;
        }

        // 3. Background / Gradient Block using DroidScript's native SetBackGradient method
        let bgCode = "";
        if (elements.bgType.value === "gradient") {
            bgCode = `cardDlg.SetBackGradient("${elements.bgColor.value}", "${elements.bgColor2.value}", null, "${elements.gradOrient.value}");`;
        } else {
            bgCode = `cardDlg.SetBackColor("${elements.bgColor.value}");`;
        }

        const code = `var lay, web, customDlg;

function OnStart() {
    lay = app.CreateLayout("Linear", "VCenter,FillXY");

    web = app.CreateWebView(1, 1, "Progress");
    web.SetOnProgress(web_OnProgess);
    lay.AddChild(web);

    app.AddLayout(lay);
    web.LoadUrl("https://google.com");

    app.EnableBackKey(false);
    
    // Initialize Dialog Engine
    CreateExitDialog();
    
    app.ShowPopup("Press the back key to test");
}

function web_OnProgess(progress) {
    app.Debug("progress = " + progress);
}

function CreateExitDialog() {
    customDlg = app.CreateDialog("", "NoTitle");
    // Transparent window background eliminates rectangular outer borders
    customDlg.SetBackColor("#00000000"); 

    // Outer Card layout container for native rounded corners & shadows
    var cardDlg = app.CreateLayout("Card");
    cardDlg.SetCornerRadius(${elements.btnRadius.value}); 
    ${bgCode}

    // Inner Linear layout for content arrangement
    var layDlg = app.CreateLayout("Linear", "Vertical");
    layDlg.SetPadding(0.05, 0.04, 0.05, 0.035); 

${appIconCode}${titleCode}

    var txtMsg = app.CreateText("${elements.msgText.value}", 0.75, -1, "Left,MultiLine");
    txtMsg.SetTextColor("${elements.msgColor.value}"); 
    txtMsg.SetTextSize(14);
    txtMsg.SetMargins(0.02, 0, 0.02, 0.05);
    layDlg.AddChild(txtMsg);

    var layBtn = app.CreateLayout("Linear", "Horizontal,Right");
    layBtn.SetSize(0.75, -1); 
    
    // CANCEL Button
    var btnNo = app.CreateButton("${elements.cancelText.value}", 0.24, 0.055, "Custom");
    btnNo.SetStyle("${elements.cancelBg.value}", "${elements.cancelBg.value}", ${elements.btnRadius.value}, "${elements.cancelBg.value}", 0, 0); 
    btnNo.SetTextColor("${elements.cancelTextClr.value}"); 
    btnNo.SetTextSize(12);
    btnNo.SetMargins(0, 0, 0.03, 0); 
    btnNo.SetOnTouch(btnNo_OnTouch);
    layBtn.AddChild(btnNo);

    // EXIT Button
    var btnYes = app.CreateButton("${elements.exitText.value}", 0.26, 0.055, "Custom");
    btnYes.SetStyle("${elements.exitBg.value}", "${elements.exitBg.value}", ${elements.btnRadius.value}, "${elements.exitBg.value}", 0, 0); 
    btnYes.SetTextColor("${elements.exitTextClr.value}"); 
    btnYes.SetTextSize(12);
    btnYes.SetOnTouch(btnYes_OnTouch);
    layBtn.AddChild(btnYes);

    // Assemble Nesting: Linear -> Card -> CustomDialog
    layDlg.AddChild(layBtn);
    cardDlg.AddChild(layDlg);
    customDlg.AddLayout(cardDlg);
}

function OnBack() {
    if (web.CanGoBack()) {
        web.Back();
        return;
    }
    customDlg.Show();
}

function btnNo_OnTouch() {
    customDlg.Dismiss();
}

function btnYes_OnTouch() {
    customDlg.Dismiss();
    app.Exit();
}`;

        elements.codeOutput.textContent = code;
    }

    function updateGenerator() {
        updatePreview();
        generateCode();
    }

    elements.useAppIcon.addEventListener("change", handleToggles);
    elements.iconType.addEventListener("change", handleToggles);
    elements.bgType.addEventListener("change", handleToggles);

    const inputs = [
        elements.appIconPath, elements.appIconSize, elements.iconUnicode,
        elements.faTag, elements.titleText, elements.msgText, elements.cancelText,
        elements.exitText, elements.bgColor, elements.bgColor2, elements.gradOrient,
        elements.titleColor, elements.msgColor, elements.btnRadius,
        elements.cancelBg, elements.cancelTextClr, elements.exitBg, elements.exitTextClr
    ];

    inputs.forEach(input => {
        input.addEventListener("input", updateGenerator);
    });

    elements.resetPresetBtn.addEventListener("click", loadBasePreset);

    elements.copyBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(elements.codeOutput.textContent).then(() => {
            const originalText = elements.copyBtn.textContent;
            elements.copyBtn.textContent = "Copied!";
            elements.copyBtn.style.backgroundColor = "#22C55E";
            setTimeout(() => {
                elements.copyBtn.textContent = originalText;
                elements.copyBtn.style.backgroundColor = "";
            }, 2000);
        });
    });

    loadBasePreset();
});
