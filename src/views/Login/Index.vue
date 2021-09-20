<script>
import * as utils from '@/store/utils';

export default {
  components: {
    // Layout: () => import('@layout/main')
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
    // TODO
    signIn() {
      utils.notifyAlert('Success to sign in!', 'success');
      console.log('signIn');
    }
  }
};
</script>

<template>
  <!-- <Layout> -->
  <div id="login">
    <div class="container">
      <div class="row">
        <div class="col-4 m-auto">
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
            <button
              class="btn btn-lg btn-dark btn-block rounded-0"
              type="submit"
            >
              Sign In
            </button>
            <button
              class="btn btn-lg btn-outline-dark btn-block rounded-0"
              type="submit"
            >
              Go Back to Front Page
            </button>
            <p class="my-3 text-muted text-center">&copy; 2020~∞ - 練習用</p>
          </form>
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
