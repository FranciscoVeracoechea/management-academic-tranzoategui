const content = `
<div class="tab-pane fade container" id="profile" role="tabpanel" aria-labelledby="profile-tab">
  <br>
  <div class="row">
    <div class=" offset-md-1 col-md-10">
      <div class="card bg-dark text-light">
        <div class="card-body row">
          <div class="col-md-6 text-center">
              <img src="" alt="profile-image" class="img-rounded img-responsive avatar img-thumbnail rounded-circle"/>
              <h5 id="userRole"></h5>
          </div>
          <div class="col-md-6">
            <h4 id="userFullname"></h4>
            <p><cite id="userDirection"><i class="fa fa-map-marker"></i></cite></p>
            <p>
              <i class="fa fa-envelope" aria-hidden="true"></i> <span id="userEmail"></span>
            </p>
            <p>
              <i class="fa fa-id-card"></i> <span id="userCi"></span>
            </p>
            <p>
              <i class="fa fa-calendar"></i> <span id="userCreatedAt"></span>
            </p>
            <p>
              <b>Edad</b> <span id="userAge"></span>
            </p>
            <!-- Split button -->
            <a type="button" class="btn btn-danger">
              <i class="fa fa-phone" aria-hidden="true"></i>
              <span id="userPhone"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>
  <div class="row">
    <div class="offset-md-1 col-md-10">
      <div class="card">
          <div class="card-header">
            <h5 class="card-title">Biografía o descripción</h5>
          </div>
          <div class="card-body ">
            <p class="card-text" id="userBiography">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
      </div>
    </div>
  </div>
  <div class="row" id="evaluationsContainer"></div>
</div>
`;

const tab = `
<li class="nav-item">
  <a data-tip="tooltip" data-placement="bottom" title="Mi Perfil" class="nav-link text-white" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
  <i class="fa fa-user-circle" aria-hidden="true"></i>
  </a>
</li>
`;

const profileEvaluations = (evaluations) =>{
  console.log(evaluations)
  let html =  ` 
      <div class="col-md-12">
        <div class="table-responsive">
        <br/>
        <br/>
          <h5>Evaluaciones</h5>
          <table class="table table-hover table-sm bg-ligth" id="userEvaluationsTable">
            <thead class="bg-info text-light">
              <tr>
                <th>Nro de control</th>
                <th>Descripción</th>
                <th>calificación</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody id="userEvaluationsTbody">
              ${
                evaluations.map( ev => `
                  <tr>
                    <td>${ev.id}</td>
                    <td>${ev.description}</td>
                    <td>${ev.qualification}</td>
                    <td>${moment(ev.created_at).format("L")}</td>
                  </tr>
                `)
              }
            </tbody>
          </table>
        </div>
      </div>
  `;
  $("div#evaluationsContainer").append(html);
}
module.exports = {
  content, tab, profileEvaluations
}