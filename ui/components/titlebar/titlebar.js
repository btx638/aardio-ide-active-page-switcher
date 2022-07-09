export class TitleBar extends Element{
    render(props){
        return  <header styleset={__DIR__ + "titlebar.css#titlebar"}>
                    <window-caption role="window-caption">{props.title}</window-caption>
                    <window-buttons>
                        <window-button role="window-minimize"></window-button>
                        <window-button role="window-maximize"></window-button>
                        <window-button role="window-close"></window-button>
                    </window-buttons>
                </header> 
    }
}