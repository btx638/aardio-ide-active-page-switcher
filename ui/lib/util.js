//  file:///@/res/lib/modal.htm
//let modalWindowPath = __DIR__ + "../../../" + "lib/modal.htm";

//let modalWindowPath = "file:///@/res/ui/lib/modal.htm"
let modalWindowPath = __DIR__ + "modal.htm"

export function newModal(content, caption, width, height) {
    return Window.this.modal({ 
        url: modalWindowPath,
        type: Window.TOOL_WINDOW,
        width:width,
        height:height,
        alignment: -5,
        parameters: {
            caption:caption,
            content:content
        }
    })     
}