<script>
export default {
  data() {
    return {
      navbarMenus: [
        {
          name: 'ProductList',
          alias: 'ProductList'
        },
        {
          name: 'OrderList',
          alias: 'OrderList'
        },
        {
          name: 'CouponList',
          alias: 'CouponList'
        }
      ],
      currentPage: this.$route.name
    };
  },
  mounted() {
  }
};
</script>

<template>
  <nav
    id="navBar"
    :class="$style['navbar_style']"
    class="navbar navbar-expand-lg navbar-light bg-white"
  >
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbar" class="collapse navbar-collapse justify-content-center">
        <ul class="navbar-nav navbar-nav__position">
          <li
            v-for="(menu, index) in navbarMenus"
            :key="index"
            id="about"
            class="nav-item mr-2 ml-2"
            :class="{ 'active': currentPage === menu.alias }"
          >
            <BaseButton class="nav-link" :to="{ name:menu.alias }">
              {{ menu.name }}
            </BaseButton>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" module>
.navbar_style {
  border-bottom: 1px solid black;
}
</style>
