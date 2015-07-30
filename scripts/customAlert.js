function CustomAlert() {
    var dialogBox = document.createElement('div'),
        dialogOverLay = document.createElement('div'),
        nestedDialogBox = document.createElement('div'),
        dialogAlertHeader = document.createElement('div'),
        dialogAlertBody = document.createElement('div'),
        dialogAlertFooter = document.createElement('div');
    dialogBox.appendChild(nestedDialogBox);
    nestedDialogBox.appendChild(dialogAlertHeader);
    nestedDialogBox.appendChild(dialogAlertBody);
    nestedDialogBox.appendChild(dialogAlertFooter);
    dialogOverLay.style.display = 'none';
    dialogOverLay.style.opacity = '0.8';
    dialogOverLay.style.position = 'fixed';
    dialogOverLay.style.top = '0px';
    dialogOverLay.style.left = '0px';
    dialogOverLay.style.background = '#FFF';
    dialogOverLay.style.width = '100%';
    dialogOverLay.style.zIndex = '10';
    dialogBox.style.display = 'none';
    dialogBox.style.position = 'fixed';
    dialogBox.style.background = '#000';
    dialogBox.style.borderRadius = '9px';
    dialogBox.style.width = '550px';
    dialogBox.style.zIndex = '10';
    dialogAlertHeader.style.background = '#666';
    dialogAlertHeader.style.fontSize = '19px';
    dialogAlertHeader.style.padding = '10px';
    dialogAlertHeader.style.color = '#CCC';
    dialogAlertHeader.style.borderTopLeftRadius = '10px';
    dialogAlertHeader.style.borderTopRightRadius = '10px';
    dialogAlertBody.style.background = '#333';
    dialogAlertBody.style.padding = '20px';
    dialogAlertBody.style.color = '#FFF';
    dialogAlertFooter.style.background = '#666';
    dialogAlertFooter.style.padding = '10px';
    dialogAlertFooter.style.textAlign = 'right';
    dialogAlertFooter.style.borderBottomLeftRadius = '10px';
    dialogAlertFooter.style.borderBottomRightRadius = '10px';
    document.body.appendChild(dialogOverLay);
    document.body.appendChild(dialogBox);
    this.render = function(dialog) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;

        dialogOverLay.style.display = "block";
        dialogOverLay.style.height = winH + "px";
        dialogBox.style.left = (winW / 2) - (550 * .5) + "px";
        dialogBox.style.top = "100px";
        dialogBox.style.display = "block";
        dialogAlertHeader.innerHTML = "Message from the magician:";
        dialogAlertBody.innerHTML = dialog;
        dialogAlertFooter.innerHTML = '<button id="btnOK">OK</button>';
        var btnOK = document.getElementById('btnOK');
        btnOK.addEventListener('click', this.ok);
    },
        this.ok = function() {
            dialogBox.style.display = "none";
            dialogOverLay.style.display = "none";
        };
}