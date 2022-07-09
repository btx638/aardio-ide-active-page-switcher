import {TitleBar} from "../components/titleBar/titleBar.js";
import { Container } from "./container/container.js";
export class App extends Element{
    render(){
        return <div style="size:*">
            <TitleBar title="活动页面切换器" />
            <Container />
        </div>
    } 
}