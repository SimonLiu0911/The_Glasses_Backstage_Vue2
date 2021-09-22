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
      }
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
