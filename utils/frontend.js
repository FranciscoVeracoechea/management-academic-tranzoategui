const slugify = require("./slugify");

const isArray = (variable) =>  {
  return variable instanceof Array;
}

const isDefined = (variable) => {
  return typeof variable !== 'undefined' && variable !== null;
}

const isFunction = (variable) =>  {
  return typeof variable === 'function';
}

const isObject = (variable) => {
  return isDefined(variable) && typeof variable === 'object';
}

const isFirstRender = (items) => {
  return (items && items.length === 0) || !isDefined(items);
}

const infiniteScroll = (element) => {
  let scrollTop = element.scrollTop;
  let scrollHeight = element.scrollHeight;
  let clientHeight = document.documentElement.clientHeight || window.innerHeight;
  return(Math.ceil(scrollTop + clientHeight) >= scrollHeight - 100 /* offset */);
}
const removeLoader = () =>{
  let loader = document.getElementById("main-loader");
  loader.parentNode.removeChild(loader);
}
const addLoader = () =>{
  document.body.insertAdjacentHTML('afterbegin', `
    <div id="main-loader">
      <div class="main-loader-modal">
        <div class="loader-wrapper">
            <div class="loader">Loading...</div>
        </div>
      </div>
    </div>
  `);
}
const showAlert = (title, message = '', type = 'success') => {
  let alertId = `alert-${type}-${slugify(title)}`;
  let $alertContainer = $("div#alertContainer");
  $alertContainer.append(
  ` <div style="display:none;" class="alert alert-${type} alert-dismissible fade show" role="alert" id="${alertId}">
      <h6>${title}</h6>
      ${message}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
  );
  let $alert = $(`#${alertId}`);
  $alert.slideToggle(400);
  setTimeout(()=>  $alert.slideToggle(400), 5000);
  setTimeout(()=> { 
    $alert.remove();
  },5400);
}
//exports
module.exports = {
  isArray,
  isDefined,
  isFunction,
  isObject,
  isFirstRender,
  infiniteScroll,
  removeLoader,
  addLoader,
  showAlert
};