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
            <cite id="userDirection"><i class="fa fa-map-marker"></i></cite>
            <p>
                <i class="fa fa-envelope" aria-hidden="true"></i> <span id="userEmail"></span>
                <br />
                <i class="fa fa-id-card"></i> <span id="userCi"></span>
                <br />
                <i class="fa fa-calendar"></i> <span id="userCreatedAt"></span>
                <br>
                <b>Edad</b> <span id="userAge"></span>
            </p>
            <!-- Split button -->
            <div class="btn-group">
                <button type="button" class="btn btn-danger">
                    Social</button>
                <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                    <span class="caret"></span><span class="sr-only">Social</span>
                </button>
                <ul class="dropdown-menu" role="menu">
                    <li><a href="#">Twitter</a></li>
                    <li><a href="https://plus.google.com/+Jquery2dotnet/posts">Google +</a></li>
                    <li><a href="https://www.facebook.com/jquery2dotnet">Facebook</a></li>
                    <li class="divider"></li>
                    <li><a href="#">Github</a></li>
                </ul>
            </div>
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
</div>
`;

const tab = `
<li class="nav-item">
  <a class="nav-link text-white" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Perfil</a>
</li>
`;
module.exports = {
  content, tab
}