<script>
import * as utils from '@/store/utils';

export default {
  components: {
    TheFooter: () => import('@layout/TheFooter')
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      isLoading: false
    };
  },
  methods: {
    signIn() {
      const url = `${process.env.VUE_APP_APIPATH}/api/auth/login`;
      this.$http
        .post(url, this.user)
        .then((response) => {
          console.log(response);
          const { token, expired } = response.data;
          // 伺服器回傳token和expired後，將其存到cookie裡面
          document.cookie = `myToken=${token}; expires=${new Date(
            expired * 1000
          )}; path=/`;
          console.log(document.cookie);
          this.$router.push({ name: 'ProductList' });
        })
        // milkjhang@hotmail.com
        .catch(() => {
          utils.notifyAlert('Failed to Sign in');
          window.location.reload();
        });
    }
  }
};
</script>

<template>
  <!-- <Layout> -->
  <div id="login">
    <div class="container">
      <div class="row">
        <div class="col-md-6 m-auto">
            <form class="form-signin p-3 m-auto" @submit.prevent="signIn">
              <h1 class="h3 mb-3 font-weight-normal text-center">Sign in</h1>
              <div class="form-group">
                <label for="inputEmail" class="sr-only">Email address</label>
                <input
                  id="inputEmail"
                  type="email"
                  class="form-control rounded-0"
                  :class="$style.input_style"
                  placeholder="Email address"
                  v-model="user.email"
                  autofocus
                />
              </div>
              <div class="form-group">
                <label for="inputPassword" class="sr-only">Password</label>
                <input
                  id="inputPassword"
                  type="password"
                  class="form-control rounded-0"
                  :class="$style.input_style"
                  placeholder="Password"
                  v-model="user.password"
                />
              </div>
              <BaseButton
                class="btn btn-lg btn-dark btn-block rounded-0"
                type="submit"
              >
                Sign In
              </BaseButton>
              <!-- <button
                class="btn btn-lg btn-outline-dark btn-block rounded-0"
                type="submit"
              >
                Go Back to Front Page
              </button> -->
            </form>
          <TheFooter></TheFooter>
        </div>
      </div>
    </div>
    <!-- Vue Loading -->
    <Loading :active.sync="this.isLoading"></Loading>
  </div>
  <!-- </Layout> -->
</template>

<style lang="scss" module>
.input_style:focus {
  border-style: solid;
  border-color: gray;
  box-shadow: 0 0 3px gray;
}
</style>
