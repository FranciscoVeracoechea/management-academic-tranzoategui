const tab = `
<li class="nav-item">
  <a data-tip="tooltip" data-placement="bottom" title="Programas de Formación" class="nav-link text-white" id="subjects-tab" data-toggle="tab" href="#subjects" role="tab" aria-controls="subjects" aria-selected="false">
    <i class="fa fa-book" aria-hidden="true"></i>
  </a>
</li>
`;

const content = `
<div class="tab-pane fade" id="subjects" role="tabpanel" aria-labelledby="subjects-tab">
  <section class="container-fluid p-4">
    <div class="row">
      <div class="col-sm-4 col-md-3 col-lg-2 mb-4">
        <ul class="nav nav-tabs nav-pills list-group" id="myTab" role="tablist">
          <li class="nav-item">
            <div class="list-group-item bg-dark text-light d-flex justify-content-between">
              <h5>Opciones</h5> <h5><i class="fa fa-bars" aria-hidden="true"></i></h5>
            </div>
          </li>
          <li class="nav-item ">
            <a class="nav-link active list-group-item list-group-item-action" id="all-subjects-tab" data-toggle="tab" href="#all-subjects-content" role="tab" aria-controls="all-subjects-content" aria-selected="true">
              Todos
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link list-group-item list-group-item-action" id="new-subjects-tab" data-toggle="tab" href="#new-subjects-content" role="tab" aria-controls="new-subjects-content" aria-selected="false">
              Crear Nuevo
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link list-group-item list-group-item-action" id="my-subjects-tab" data-toggle="tab" href="#my-subjects-content" role="tab" aria-controls="my-subjects-content" aria-selected="false">
              Mis Programas de Formación
            </a>
          </li>
        </ul>
      </div>
      <div class="col-sm-8 col-md-9 col-lg-10">
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="all-subjects-content" role="tabpanel" aria-labelledby="home-tab">
          <div class="row">
            <div class="col-md-12">
              <h2>Programas de Formación</h2>
              <div class="row">
                <div class="col-md-5">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Que buscas?" aria-label="Username" aria-describedby="basic-addon1">
                    <div class="input-group-prepend">
                      <i id="basic-addon1" class="input-group-text fa fa-search" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-hover bg-light">
                  <thead class="bg-dark text-light">
                    <tr>
                      <th>Nombre</th>
                      <th>Evaluaciones</th>
                      <th>Profesores</th>
                      <th>Estudiantes</th>
                      <th><i class="fa fa-cogs" aria-hidden="true"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Mark</th>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>
                        <div class="btn-group btn-group-sm" role="group">
                          <button id="btnGroupDrop1" type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Acciones
                          </button>
                          <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <a class="dropdown-item" href="#">Acciones link</a>
                            <a class="dropdown-item" href="#">Acciones link</a>
                            <a class="dropdown-item" href="#">Acciones link</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Jacob</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>
                        <div class="btn-group btn-group-sm" role="group">
                          <button id="btnGroupDrop1" type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Acciones
                          </button>
                          <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <a class="dropdown-item" href="#">Acciones link</a>
                            <a class="dropdown-item" href="#">Acciones link</a>
                            <a class="dropdown-item" href="#">Acciones link</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Larry the Bird</th>
                      <td >Larry the Bird</td>
                      <td >Larry the Bird</td>
                      <td>@twitter</td>
                      <td>
                        <div class="btn-group btn-group-sm" role="group">
                          <button id="btnGroupDrop1" type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Acciones
                          </button>
                          <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <a class="dropdown-item" href="#">Acciones link</a>
                            <a class="dropdown-item" href="#">Acciones link</a>
                            <a class="dropdown-item" href="#">Acciones link</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="new-subjects-content" role="tabpanel" aria-labelledby="subjects-tab">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header bg-dark text-light">
                  <h5><i class="fa fa-plus" aria-hidden="true"></i>  Nuevo programa de Formación</h5>
                </div>
                <form class="card-body" id="formNewNotice">
                  <div class="form-group row">
                    <label for="" class="col-sm-2 col-form-label">Título</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="" maxlength="68" placeholder="Título" required>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-2 col-form-label">Número de Evaluaciones</label>
                    <div class="col-sm-10">
                      <input type="number" value="1" class="form-control" id="" min="1" max="99" placeholder="Número de Evaluaciones" required>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-2 col-form-label">Contenido Programático</label>
                    <div class="col-sm-10">
                      <textarea class="form-control" id="" placeholder="Contenido Programático" rows="5" required></textarea>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12 text-center">
                      <button type="submit" class="btn btn-danger">Crear Programa</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="my-subjects-content" role="tabpanel" aria-labelledby="contact-tab">Mis Programas de Formación</div>
      </div>
      </div>
    </div>
  </section>
</div>
`;

module.exports = {
  tab,
  content
}