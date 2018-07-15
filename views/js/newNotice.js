//dependencies
const remote = require('electron').remote;
const main = remote.require('./main.js');
//database connecions
const pool = main.pool;
//utils
const frontend = require("./../../utils/frontend");

$(()=>{
  let $formNewNotice = $("form#formNewNotice"),
      $inputImage = $("input#inputImage"),
      $inputTitle = $("input#inputTitle"),
      $inputContent = $("textarea#inputContent"),
      $inputType = $("input#inputType"),
      base64Image;

  $inputImage.on("change", (e)=>{
    let files = e.target.files || e.dataTransfer.files;
    if(!files.length) return;
    base64Image = false;
    if(files[0].size >= 460800){
      frontend.showAlert("La imagen es demasiado grande", '', 'warning');
    }
    let fr = new FileReader();
    fr.readAsDataURL(files[0]);
    fr.onload = function() { 
      base64Image = fr.result; 
    };
  });
  
  $formNewNotice.on("submit", (e)=>{
    e.preventDefault();
    if(base64Image){
      let notice = {
        title: $inputTitle.val(),
        content: $inputContent.val(),
        type:  $inputType.val(),
        image: base64Image
      }
      frontend.addLoader();
      pool.query(`INSERT INTO notices SET ?`, notice, (error, results, fields)=>{
        if (error) throw error;
        console.log(results);
        e.target.reset();
        document.querySelector('#tabsNav a[href="#home"]').click();
        frontend.showAlert(`Noticia #${results.insertId} creada con éxito!`);
        frontend.removeLoader();
      });
    } else {
      frontend.showAlert("La imagen es demasiado grande");
    }
  });
});
