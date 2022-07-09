function Content(props, kids) {
    if (props.checked) {
        return <i class="fa-solid fa-gear">{kids}</i>
    }
    else{
        return <i class="fa-solid fa-house">{kids}</i>
    }
}

export class Radio extends Element{
    render(props, kids){
        return <div styleset={__DIR__ + "radio.css#radio"}>
            <Content checked={this.value}>{kids}</Content>
        </div>
    }
    componentDidMount(){
      
    }

    ["on click"](){
    }

    ["on change"](){      
    }
}