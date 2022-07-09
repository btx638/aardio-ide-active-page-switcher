export class FormFooter extends Element{
    constructor(props){
        super()
        this.getFormValue = props.getFormValue;
    }

    render(){
        return <div class="footer" styleset={__DIR__ + "formFooter.css#formFooter"}>
            <div class="aaz-h">
                <div class="aaz-button normal" cmd="ok">确认</div>
                <div class="aaz-button normal" cmd="cancel">取消</div>
            </div>
        </div>
    }

    componentDidMount(){
        this.parentWindow.document.body.on("^keydown", (evt)=>{
            if (evt.code == "Escape") {
                this.parentWindow.close()
            }
            else if (evt.code == "Enter") {
                let value = this.getFormValue()
                if (value) {
                    this.parentWindow.close(value)
                }
            }
        }) 
    }

    ["on click at [cmd=ok]"](evt, ele){
        let values = this.getFormValue()
        if (values) {
            this.parentWindow.close(values)
        } 
    }

    ["on click at [cmd=cancel]"](evt, ele){
        this.parentWindow.close()
    }
}