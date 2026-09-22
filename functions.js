
window.ReplaceDisk = () =>{
    mdui.dialog({
        title:"驱动器管理",
        content:"<b>请选择你想要更换的可移动设备类别，2025.10.3已全部实现。</b>",
        buttons:[{
          text:"CD-ROM(建议)",
          onClick:e => change_source("cdrom")
        },{
            text:"软盘1(建议)",
          onClick:e => change_source("fda")
        },{
            text:"软盘2",
          onClick:e => change_source("fdb")
        },{
          text:"仅弹出CD",
          onClick: e => {if(!emulator.disk_images.cdrom){return};emulator.eject_cdrom();new Audio('/assets/floppy_eject.wav').play();}
        },{
          text:"仅弹出软盘1",
          onClick: e =>{if(!emulator.disk_images.fda){return};globalThis.emulator.eject_fda();new Audio('/assets/floppy_eject.wav').play();}
        },{
          text:"弹出软盘2",
          onClick:e =>{if(!emulator.disk_images.fdb){return};globalThis.emulator.eject_fdb();new Audio('/assets/floppy_eject.wav').play();}
        },{
          text:"取消"
        }]
     })
}

window.change_source = (pa) =>{
  if(pa == "fda"){
    var f = document.createElement(
      "input"
   );
   f.type = "file";
   f.accept = ".iso,.img,.dsk";
   f.onchange = async function(){
      const a = f.files[0]
      emulator.set_fda({
        url:window.URL.createObjectURL(a)
      });
      new Audio('/assets/floppy_insert.wav').play()
   }
   f.click()
      return;
  }else if(pa == "cdrom"){
    var f = document.createElement(
      "input"
   );
   f.type = "file";
   f.accept = ".iso,.img";
   f.onchange = async function(){
      const a = f.files[0]
      emulator.set_cdrom({
        url:window.URL.createObjectURL(a)
      });
      new Audio('/assets/floppy_insert.wav').play()
   }
   f.click()
    return;
  }else if(pa == "fdb"){
    var f = document.createElement(
      "input"
   );
   f.type = "file";
   f.accept = ".iso,.img,.dsk";
   f.onchange = async function(){
      const a = f.files[0]
      emulator.set_fdb({
        url:window.URL.createObjectURL(a)
      });
      new Audio('/assets/floppy_insert.wav').play()
   }
   f.click()
      return;
  }
  
  if(!emulator.disk_images[pa]){
    mdui.alert("这个虚拟机未装载对应模拟驱动器,不能进行'换盘'操作","不能换盘");
    return;
  }
     var f = document.createElement(
        "input"
     );
     f.type = "file";
     f.accept = ".iso,.img,.dsk";
     f.onchange = async function(){
        const a = f.files[0]
        emulator.disk_images[pa].set_state([a.size,(new Uint8Array((await a.arrayBuffer())))]);
     }
     f.click()
} 

window.checkDrive = function(){
  var str = [];
 var list = ['fda','fdb'];
 for(var num of list){
     
   str.push(num+'软驱：装有介质 '+(emulator['get_disk_'+num]()||[]).length+' 字节')

 }
 str.push(`光驱：含介质（cd-rom）共`+(emulator.v86.cpu.devices.cdrom.buffer||{byteLength:0}).byteLength+'字节')
 mdui.alert(str.join(';<br />'),'可移动设备信息')
}
//失去焦点，防止在画布中输入到框中
   document.onpointerlockchange = function(){
      document.querySelectorAll("input").forEach(e =>e.blur())
   }

window.chsize = function(){
 //incomplete
}