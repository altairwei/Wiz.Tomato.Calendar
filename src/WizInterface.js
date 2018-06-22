export {WizExplorerApp, WizExplorerWindow, WizDatabase, WizCommonUI};

//TODO: 判断window.external是否为WizHtmlEditorApp
const WizExplorerApp = window.external;
const WizExplorerWindow = objApp.Window;
const WizDatabase = objApp.Database;
const WizCommonUI = objApp.CreateWizObject("WizKMControls.WizCommonUI");
