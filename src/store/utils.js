import Vue from 'vue';

// Bootstrap-notify(http://bootstrap-growl.remabledesigns.com)
export function notifyAlert(msg, type, icon, title, url, target) {
  if (type === '' || type === undefined) {
    type = 'danger';
  }
  if (icon === '' || icon === undefined) {
    switch (type) {
      case 'success':
        icon = 'fas fa-check-circle';
        break;
      case 'info':
        icon = 'fas fa-info-circle';
        break;
      case 'warning':
        icon = 'fas fa-exclamation-triangle';
        break;
      case 'danger':
        icon = 'fas fa-times-circle';
        break;
      default:
        icon = 'fas fa-question-circle';
        break;
    }
  }

  window.$.notify(
    // options
    {
      icon: icon,
      title: title,
      message: msg,
      url: url,
      target: target
    },
    // settings
    {
      element: 'body',
      position: null,
      type: type,
      allow_dismiss: true,
      newest_on_top: false,
      showProgressbar: false,
      placement: {
        from: 'top',
        align: 'center'
      },
      offset: 20,
      spacing: 10,
      z_index: 9999,
      delay: 5000,
      timer: 1000,
      url_target: '_blank',
      mouse_over: null,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
      template:
        '<div data-notify="container" class="col-11 col-sm-6 col-lg-4 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<i data-notify="icon"></i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    }
  );
};

/**
 * Ajax other settings.
 * post/patch: { 'method': 'post or patch', 'url': '/api/...', 'data': params }
 * get: { 'method': 'get', 'url': '/api/...', 'params': urlParams }
 * @param {*} config
 * @param {*} nextFn  下一步驟執行的function
 */
export const vueAjaxSubmit = new Vue({
  methods: {
    ajaxSubmit(config, nextFn) {
      this.$http(config)
        .then(response => {
          if (response.status) {
            // 下一步驟執行的function
            nextFn(response.data);
          }
        })
        .catch(error => {
          console.log(error);
          // notifyAlert(error.response.data.errors[0], 'danger');
        });
    },
    validateToken() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (!token) {
        return false;
      } else {
        this.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
        return true;
      }
    }
  }
});
