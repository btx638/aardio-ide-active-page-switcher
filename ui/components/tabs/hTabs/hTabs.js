import { Tabs } from "../tabs";

export class HTabs extends Tabs{
    
    constructor(props, kids){
        super(props, kids)
        this.styleset = __DIR__ + "hTabs.css#hTabs";
    }
}