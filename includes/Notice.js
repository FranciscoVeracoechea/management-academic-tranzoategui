const moment = require('moment');
const content = `
<div class="tab-pane fade" id="newNotice" role="tabpanel" aria-labelledby="newNotice-tab">
  <section class="container">
    <div class="row">
        <div class="offset-md-1 col-md-10">
          <div class="card mt-4">
            <div class="card-header bg-dark text-light">
              <h3><i class="fa fa-newspaper-o" aria-hidden="true"></i> Crear Nueva Noticia</h3>
            </div>
            <div class="card-body">
              <form id="formNewNotice">
                <div class="form-group row">
                  <label for="inputTitle" class="col-sm-2 col-form-label">Título</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputTitle" maxlength="68" placeholder="Título" required>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputContent" class="col-sm-2 col-form-label">Contenido</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" id="inputContent" placeholder="Contenido" rows="5" required></textarea>
                  </div>
                </div>
                <div class="form-group row">
                    <label for="inputType" class="col-form-label col-sm-2 pt-0">Tipo de noticia</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="inputType" maxlength="48" placeholder="Tipo">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputImage" class="col-form-label col-sm-2 pt-0">Imagen</label>
                    <div class="col-sm-10">
                      <input type="file" class="form-control" id="inputImage" accept="image/*" required>
                    </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-12 text-center">
                    <button type="submit" class="btn btn-danger">Crear Noticia</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <script src="./../js/newNotice.js"></script>
  </section>
</div>
`;

const tab = `
<li class="nav-item">
  <a data-tip="tooltip" title="Crear Nueva Noticia" data-placement="bottom" class="nav-link text-white" id="newNotice-tab" data-toggle="tab" href="#newNotice" role="tab" aria-controls="newNotice" aria-selected="false">
    <i class="fa fa-plus-square" aria-hidden="true"></i>
  </a>
</li>
`;
const showNotice = (notice, role, $containerElement)=>{
  let html = `
  <div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src="${notice.image}" alt="Card image cap">
      <div class="card-body">
        <h5>${notice.title}</h5>
        <p class="card-text">
          <small>${notice.content.substr(0, 149)}...</small> 
          <br/>
          <small class="text-info">${notice.type}</small>
        </p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" data-notice="${notice.id}" class="btn btn-sm btn-outline-danger view-notice-button">Ver más</button>
            ${
              (role === 'ADMIN')
              ?
                `<button type="button" data-notice="${notice.id}" class="btn btn-sm btn-outline-dark edit-notice">Editar</button>`
                : ''
            }
          </div>
          <small class="text-muted">${moment.duration(moment(notice.created_at).diff(moment())).humanize()}</small>
        </div>
      </div>
    </div>
  </div>`;
  $containerElement.append(html);
}
const showModalNotice = (notice)=>{
  let html= `
  <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="noticeModal" id="noticeModal" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-light">${notice.title}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img class="card-img-top" src="${notice.image}" alt="${notice.title}" class=""/>
          <p class="mt-2">${notice.content}</p>
          <small class="text-info">${notice.type}</small>
          <div className="text-right">
            <small class="text-muted">${moment.duration(moment(notice.created_at).diff(moment())).humanize()}</small>
          </div>
        </div>
      </div>
    </div>
  </div>  
  `;
  document.querySelector("#showNoticeModalContainer").innerHTML = html;
  $("div#noticeModal").modal("show");
}

const editNoticeModal = `
  <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="noticeEditModal" id="noticeEditModal" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-light">Editar Noticia</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card-body">
            <form id="formEditNotice">
              <div class="form-group row">
                <label for="editNoticeTitle" class="col-sm-2 col-form-label">Título</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="editNoticeTitle" maxlength="68" placeholder="Título" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="editNoticeContent" class="col-sm-2 col-form-label">Contenido</label>
                <div class="col-sm-10">
                  <textarea class="form-control" id="editNoticeContent" placeholder="Contenido" rows="5" required></textarea>
                </div>
              </div>
              <div class="form-group row">
                  <label for="editNoticeType" class="col-form-label col-sm-2 pt-0">Tipo de noticia</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="editNoticeType" maxlength="48" placeholder="Tipo">
                  </div>
              </div>
              <div class="form-group row">
                  <label for="editNoticeImage" class="col-form-label col-sm-2 pt-0">Imagen</label>
                  <div class="col-sm-10">
                    <input type="file" class="form-control" id="editNoticeImage" accept="image/*">
                  </div>
              </div>
              <div class="form-group">
                <div class="col-sm-12 text-center">
                  <button type="submit" class="btn btn-danger">Editar Noticia</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const header = `
<div class="col-md-12">
  <h4><i class="fa fa-newspaper-o" aria-hidden="true"></i>
    Ultimas Noticias
  </h4>
</div>
`;
module.exports = {
  content,
  tab,
  showNotice,
  header,
  showModalNotice,
  editNoticeModal
};