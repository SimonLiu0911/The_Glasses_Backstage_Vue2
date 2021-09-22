<script>
import * as utils from '@/store/utils';

export default {
  components: {
    Layout: () => import('@layout/main')
  },
  data() {
    return {
      orderList: [],
      pagination: {},
      isLoading: false
    };
  },
  methods: {
    // onSignOut() {
    //   // 清除Token
    //   document.cookie = 'myToken=;expires=;';
    //   this.$router.push({ name: 'Login' });
    // },
    getOrderData(num = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`;
      this.$http.get(url, {
        params: {
          page: num
        }
      })
        .then((response) => {
          this.orderList = response.data.data;
          this.pagination = response.data.meta.pagination;
          this.isLoading = false;
        })
        .catch(error => {
          utils.notifyAlert(error, 'danger');
        });
    }
  },
  created() {
    // TODO 優化
    if (utils.vueAjaxSubmit.validateToken()) {
      this.getOrderData();
    } else {
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<template>
  <Layout>
    <section id="orderList" class="mt-5">
      <div class="orders_management container">
        <!-- <div class="mt-5">
          <BaseButton
            class="btn btn-dark rounded-0 float-left"
            type="button"
            @click="onSignOut"
          >
            SIGN OUT
          </BaseButton>
        </div> -->
        <table class="table table-responsive-xl mt-3">
          <thead>
            <tr class="text-center">
              <th>#</th>
              <th>Order(id)</th>
              <th>Payment</th>
              <th>Paid</th>
              <th>Time</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orderList" :key="item.id">
              <td class="align-middle">{{ index + 1 }}</td>
              <td class="align-middle overflow-auto">{{ item.id }}</td>
              <td class="align-middle text-center">{{ item.payment }}</td>
              <td class="align-middle text-center">
                <span class="text-danger" v-if="item.paid === false">{{
                  item.paid
                }}</span>
                <span class="text-success" v-else>{{ item.paid }}</span>
              </td>
              <td class="align-middle text-center">{{ item.created.datetime }}</td>
              <td class="align-middle">
                <BaseButton
                  class="btn btn-outline-dark btn-sm rounded-0"
                  :to="{ name: 'OrderDetail', params: { id: `${item.id}` } }"
                >
                  Detail
                </BaseButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <BasePagination :pages="pagination" @update="getOrderData"></BasePagination>

      <!-- Vue Loading -->
      <Loading :active.sync="this.isLoading"></Loading>

    </section>
  </Layout>
</template>
