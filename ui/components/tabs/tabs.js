export class Tabs extends Element{
    constructor(props, kids) {
        super();
        this.kids = kids;
    }
    componentDidMount() { 
        if( ! this.firstElementChild )
          return; 
        // 可获得焦点, 接收焦点事件
        this.state.focusable = true;
        
        // 如果html代码中有 selected 属性则为默认选中项，否则是第一个
        let label = this.$(">strip>label[selected]") ||
                    this.$(">strip>label:first-child");
        
        // 根据 for 属性找出默认的面板
        let name = label.attributes["for"];
        // 根据 name 或者 id 找出面板
        let panel = this.$(`>panels>[name='${name}'],>panels>#${name}`);

        console.assert(panel,"Tab panel with the name %s not found",name);

        if(label) 
          // 元素挂在后，也就是 componentDidMount 之后会调用
          this.post( () => {
            if( !this.$(">strip>label:current") ) // if it was not set by code
               this.activate(label, false);       // proceed with initialization.
          });
      }
       
      // 获取当前选项卡的 for 属性值
      get current() {
        let label = this.$(">strip>label:current");
        return label ? label.attributes["for"] : undefined;
      }
      
      // 设置当前选项卡的 for 属性值
      set current(v) {
        let label = this.$(`>strip>label[for='${v}']`); 
        this.activate(label,false);
      }
  
      ["on ^mousedown at >strip>label:not(:current)"](event, label) {
        return this.activate( label );
      }
  
      ["on ^keydown"](event) { 
        if(!this.state.focus)
          return false;
  
          let currentLabel = this.$(">strip>label:current");
        
        switch( event.code )
        {
          case "Tab": 
            if( event.ctrlKey ){
                return this.activate( event.shiftKey? currentLabel.previousElementSibling : currentLabel.nextElementSibling );
            } 
              
            break;
          case "ArrowLeft": return this.activate( currentLabel.previousElementSibling );
          case "ArrowRight": return this.activate( currentLabel.nextElementSibling );
          case "Home": return this.activate( currentLabel.parentElement.firstElementChild );
          case "End": return this.activate( currentLabel.parentElement.lastElementChild );
        }
        return false; 
      }
  
      // a.k.a. select tab, label here is a <label> inside <strip> 
      activate( label, notify = true ) {
        if( !label )
          return false;
        if(label.state.current)
          // already selected, nothing to do...
          return true; // but we've handled it.
       
        let strip = this.$(">strip");
       
        //find currently selected element (tab and panel) and remove "selected" from them
        let currentPanel = this.$(">panels>[name]:expanded,:root>panels>[id]:expanded");
        let currentLabel = strip.$("label:current");
  
        // find new tab and panel       
        let name = label.attributes["for"];
        let panel = this.$(`>panels>[name='${name}'],:root>panels>#${name}`);
        
        console.assert(panel,"panel %s not found",name);
  
        if( currentPanel ) {
          currentPanel.state.collapsed = true; // set collapsed in case of someone use it for styling
          currentPanel.postEvent(new Event("collapsed",{bubbles:true}));
        }
        if( currentLabel )
          currentLabel.state.current = false; 
  
        panel.dispatchEvent(new Event("expanded",{bubbles:true}));
        strip.state.current = true; 
        panel.state.expanded = true; // expand it
        label.state.current = true;
        
        if(notify)
          this.postEvent(new Event("statechange",{bubbles:true}));
        
        return true;
      }

    render(props, kids){
       return  <tabs styleset = {this.styleset}>{this.kids}</tabs>
    }
}

