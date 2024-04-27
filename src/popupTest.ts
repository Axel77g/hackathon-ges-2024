const popupTest = async () => {
    let board: any;
    
      WA.room.onEnterLayer("RediffClipAreaPopup").subscribe(async () => {
        
            board = await WA.ui.website.open({
                url: "./src/pages/popup.html",
                position: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                size: {
                  height: "30vh",
                  width: "45vw",
                },
                margin: {
                  top: "20vh",
                  left: "3vh",
                },
                allowApi: true,
              });
            });
    
        WA.room.onLeaveLayer("RediffClipAreaPopup").subscribe(() => {
            board.close();
        });
    }
    export default popupTest;
