//dependencies

//utils
const loadNotices = require("./../../utils/loadNotices");


// let user = JSON.parse(sessionStorage.user);
let user = JSON.parse('{"id":1,"ci":"25257248","fullname":"Francisco Veracoechea","password":"591eac8920f14465","email":"veracoechea@gmail.com","role":"ADMIN","age":18,"direction":"barcelona","biography":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut magnam similique perferendis minus maiores, nostrum aperiam cumque, at ea, quaerat quis qui ad sed architecto optio blanditiis consequuntur deserunt odio?","status":"ACTIVE","created_at":"2018-07-14T01:14:49.000Z","updated_at":"2018-07-14T02:26:47.000Z"}');

$(()=>{
  let $formNewNotice = $("form#formNewNotice"),
      $inputImage = $("input#inputImage"),
      $inputTitle = $("input#inputTitle"),
      $inputContent = $("textarea#inputContent"),
      $inputType = $("input#inputType"),
      base64Image = false;

  $inputImage.on("change", (e)=>{
    let files = e.target.files || e.dataTransfer.files;
    if(!files.length) return;
    base64Image = false;
    if(files[0].size >= 460800){
      frontend.showAlert("La imagen es demasiado grande", '', 'warning');
    } else {
      let fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.onload = function() { 
        base64Image = fr.result; 
      };
    }
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
        e.target.reset();
        document.querySelector('#tabsNav a[href="#home"]').click();
        loadNotices(user.role)
        .then(()=>{
          frontend.removeLoader();
          frontend.showAlert(`Noticia #${results.insertId} creada con éxito!`);
        })
      });
    } else {
      frontend.showAlert("La imagen es demasiado grande");
    }
  });
});