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
        <div class="tab-pane fade show active" id="all-subjects-content" role="tabpanel" aria-labelledby="home-tab">Todos</div>
        <div class="tab-pane fade" id="new-subjects-content" role="tabpanel" aria-labelledby="subjects-tab">Crear Nuevo</div>
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