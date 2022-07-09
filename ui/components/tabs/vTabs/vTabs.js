import { Tabs } from "../tabs";

export class VTabs extends Tabs{
    constructor(props, kids){
        super(props, kids)
        this.styleset = __DIR__ + "vTabs.css#vTabs";
    }
}