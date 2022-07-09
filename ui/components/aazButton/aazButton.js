function Buttona(props) {
    return <div class="aaz-button">{props.text}</div>
}

function ButtonLoading(params) {
    return <div class="aaz-button">
        <object data="loading.svg" type="image/svg+xml"></object>
        {props.text}
    </div>
}
class Buttonn extends Element{
    constructor(props){
        super()
        this._initText = props.text
        this.onclick = props.onclick
    }
    get buttonText(){
        if (this._busyText) {
            return this.busyText
        }
        else{
            return this._initText
        }
    }
    set buttonText(v){
        this.textContent = v;
    }

    get busyText(){
        return this._busyText;
    }

    set busyText(v){
        if (v == null) {
            this.disabled = false;
            this.buttonText = this._initText
            this._busyText = null;
        }
        else{
            this.disabled = true;
            this._busyText = v;
            this.buttonText = v;
        }
    }
}

export class Button extends Buttonn{
    constructor(props){
        super(props)
        
    }
    render(props, kids){ 
        return <div class="aaz-button">{this.buttonText}</div>
    }
}

export class BigButton extends Buttonn{
    constructor(props){
        super(props)
    }
    render(props, kids){ 
        return <div class="aaz-big-button">{this.buttonText}</div>
    }
}