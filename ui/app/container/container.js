import * as sys from "@sys";

export class Container extends Element{
    pathMap = {};
    pathList = [];
    render(){
        return <div styleset={__DIR__ + "container.css#container"}>
            <div class="button-container">
                <button cmd="add-active-page">添加活动页</button>
                <button cmd="add-file">添加 *.aardio 文件</button>
                <button cmd="add-dir">添加目录</button>
            </div>
            <div class="file-list">
                {
                    this.renderList()
                }
            </div>
        </div>
    }
    renderList(){
        let ret = []
        for (const dir in this.pathList) {
            ret.push(<div class="dir">{dir}</div>)
            this.pathList[dir].map((item) => {
                ret.push(<li key={item.path} class="file-item" name="file-item" value={item.path}>{item.name}</li>)
            })
        }
        return ret;
    }
    componentDidMount(){
    }

    ["on click at button[cmd=add-active-page]"](){
        let path =  Window.this.xcall("add")
        if (path) {
            this.addFile(path)
        }
    }

    ["on click at button[cmd=add-file]"](){
        let fileUrls = Window.this.selectFile({
            mode:"open-multiple",
            caption:"选择 aardio 代码文件",
            filter:"aardio 代码文件|*.aardio|"
        })

        if (fileUrls) {
            if (typeof fileUrls == "string") {
                let path = URL.toPath(fileUrls) 
                this.addFile(path)
            }
            else if (typeof fileUrls == "object") {
                for (let index = 0; index < fileUrls.length; index++) {
                    const fileUrl = fileUrls[index];
                    
                    let path = URL.toPath(fileUrl) 
                    this.addFile(path)
                }
            }

        }
    }

    ["on click at button[cmd=add-dir]"](){
        let dirUrl = Window.this.selectFolder()
        if (dirUrl) { 
            let dir = URL.toPath(dirUrl) 
            let fileList = sys.fs.$readdir(dir);
            for (const item of fileList) {
                if (item.type == sys.fs.UV_DIRENT_FILE) {
                    if (sys.fs.match(item.name, "*.aardio")) {
                        let filePath = dir + "/" + item.name
                        this.addFile(filePath)  
                    }

                }
            }
        }
        
    }

    ["on change at li.file-item"](evt, dom){
        Window.this.xcall("active", dom.value)
    }

    addFile(path){
        if (path) {
            path = path.replace(/\//g,"\\");
            if (!this.pathMap[path]) {
                this.pathMap[path] = true;

                let [dir, name] = Window.this.xcall("splitpath", path)
                if (!this.pathList[dir]) {
                    this.pathList[dir] = []
                }
                this.pathList[dir].push({
                    name:name,
                    path:path
                })

                this.componentUpdate()
            }
        } 
    }
}