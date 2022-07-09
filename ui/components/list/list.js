export function ListWrapper(props, kids) {
    return  <div class="aaz-list-wrapper" styleset={props.styleset}>
                {kids}
    </div>      
}

export function ListContent(params, kids) {
    return <div class="aaz-list-content">
        {kids}
    </div>    
}

export  function ListHeader(props, kids) {
    return <div class="aaz-list-header">
            {kids}
    </div>
}


export function ListCards(params, kids) {
    return <div class="aaz-list-cards">
        {kids}
    </div>    
}

export  function ListCard(props, kids) {
    return <div class="aaz-list-card">
            {kids}
    </div>
}

export  function ListCardDetails(props, kids) {
    return <div class="aaz-list-card-details">
            {kids}
    </div>
}

export function CardComposer(props, kids) {
    return <div class="card-composer-container">
            <div class="open-card-composer">
                    {props.composer}
            </div>
    </div>
}

export function List(props) {
    return <div class="aaz-list-wrapper" styleset={props.styleset}>
                <div  class="aaz-list-content">
                    <div class="aaz-list-header">{props.header}</div>
                    <div class="aaz-list-cards">
                        { props.cards.map( (item) => 
                            <div class="aaz-list-card"> 
                                <div class="aaz-list-card-details">
                                    {item}
                                </div>
                            </div>)
                         }
                    </div>
                    {props.cardComposer && <CardComposer composer={props.cardComposer}/>}
                </div>
    </div>
}