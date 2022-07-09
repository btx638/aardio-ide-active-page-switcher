import { FormFooter } from "../formFooter/formFooter.js";

function FormError(props) {
    const name = props.inputName;
    const error = props.errors?.[name];  
    if( error ) {
        return <div class="error">{error}</div>;
    }
    else{
        return <div class="error"></div>;
    }   
}

export class FormHelper extends Element{
    errors = {};
    constructor(props, kids){
        super()
    }
    renderItem = (label, inputName, inputType, min, step)=>{
        return <div key={inputName} class="aaz-h item">
                    <div class="item-name">{label}</div>
                    <div><input name={inputName} type={inputType} min={min} step={step}/></div>
                    {this.mounted &&  <FormError inputName={inputName} errors = {this.errors} />}  
        </div>       
    }
    renderForm = (data)=>{
        let f = []
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            f.push(
               this.renderItem(item.label, item.name, item.type, item.min, item.step)
            )
        }
        return f;
    }
    setFormDefaultValue = (data, form)=>{
        let o = {}
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            o[item.name] = item.default
        }
        form.value = o
    }

    validate(values, data){
        const errors = {};
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            if (item.valid) {
                if( !item.valid(values[item.name]) ){
                    errors[item.name] = "请填写"
                }
            }
        }
        return errors;       
    }

    hasError(errors){
        if (Object.keys(errors).length) {
            return true;
        }
        return false;
    }    
}

export class ModalForm extends Element{
    shareData = {};
    constructor(props, kids){
        super()
    }
    this(props, kids){
        this.formValue = props.formValue
    }
    render(){
        return <div class="form-right">
            <Douyu shareData={this.shareData} formValue={this.formValue} />
            <FormFooter class="footer" shareData={this.shareData}/>
        </div>
    }
}