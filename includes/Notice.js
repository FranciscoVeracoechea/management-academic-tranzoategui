const moment = require('moment');
const content = `
<div class="tab-pane fade" id="newNotice" role="tabpanel" aria-labelledby="newNotice-tab">
  <section class="container">
    <div class="row">
        <div class="col-md-12">
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
                    <label class="col-form-label col-sm-2 pt-0">Tipo de noticia</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="inputType" maxlength="48" placeholder="Tipo">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-form-label col-sm-2 pt-0">Imagen</label>
                    <div class="col-sm-10">
                      <input type="file" class="form-control" id="inputImage" accept="image/*" required>
                    </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-12 text-center">
                    <button type="submit" class="btn btn-danger">Sign in</button>
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
  <a class="nav-link text-white" id="newNotice-tab" data-toggle="tab" href="#newNotice" role="tab" aria-controls="newNotice" aria-selected="false">
    Nueva Noticia
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
        <p class="card-text"><small>${notice.content}</small></p>
        <p><small class="text-info">${notice.type}</small></p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" data-notice="${notice.id}" class="btn btn-sm btn-outline-secondary view-notice">View</button>
            ${
              (role === 'ADMIN')
              ?
                `<button type="button" data-notice="${notice.id}" class="btn btn-sm btn-outline-secondary edit-notice">Edit</button>`
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
module.exports = {
  content,
  tab,
  showNotice
}