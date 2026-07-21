var lay, web, customDlg;

function OnStart() {
    lay = app.CreateLayout("Linear", "VCenter,FillXY");

    web = app.CreateWebView(1, 1, "Progress");
    web.SetOnProgress(web_OnProgess);
    lay.AddChild(web);

    app.AddLayout(lay);
    web.LoadUrl("index.html");

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
    cardDlg.SetCornerRadius(12); 
    cardDlg.SetBackGradient("#1e1e2e", "#0f0f1a", null, "Top-Bottom");

    // Inner Linear layout for content arrangement
    var layDlg = app.CreateLayout("Linear", "Vertical");
    layDlg.SetPadding(0.05, 0.04, 0.05, 0.035); 

    var txtTitle = app.CreateText("[fa-exclamation-triangle]  TERMINATE?", 0.75, -1, "Left,Bold,FontAwesome");
    txtTitle.SetTextColor("#00ff66"); 
    txtTitle.SetTextSize(22); 
    txtTitle.SetMargins(0.02, 0, 0.02, 0.015);
    layDlg.AddChild(txtTitle);

    var txtMsg = app.CreateText("Connection will be severed. Do you want to close this instance?", 0.75, -1, "Left,MultiLine");
    txtMsg.SetTextColor("#ffffff"); 
    txtMsg.SetTextSize(14);
    txtMsg.SetMargins(0.02, 0, 0.02, 0.05);
    layDlg.AddChild(txtMsg);

    var layBtn = app.CreateLayout("Linear", "Horizontal,Right");
    layBtn.SetSize(0.75, -1); 
    
    // CANCEL Button
    var btnNo = app.CreateButton("ABORT", 0.24, 0.055, "Custom");
    btnNo.SetStyle("#2a2a3c", "#2a2a3c", 12, "#2a2a3c", 0, 0); 
    btnNo.SetTextColor("#89b4fa"); 
    btnNo.SetTextSize(12);
    btnNo.SetMargins(0, 0, 0.03, 0); 
    btnNo.SetOnTouch(btnNo_OnTouch);
    layBtn.AddChild(btnNo);

    // EXIT Button
    var btnYes = app.CreateButton("CONFIRM", 0.26, 0.055, "Custom");
    btnYes.SetStyle("#f38ba8", "#f38ba8", 12, "#f38ba8", 0, 0); 
    btnYes.SetTextColor("#11111b"); 
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
}