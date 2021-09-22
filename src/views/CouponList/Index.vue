<script>
import * as utils from '@/store/utils';

export default {
  components: {
    Layout: () => import('@layout/main'),
    DatePicker: () => import('vue-bootstrap-datetimepicker')
  },
  data() {
    return {
      couponList: [],
      newCoupon: {
        title: '',
        code: '',
        percent: 0,
        enabled: false,
        deadline_at: ''
      },
      isLoading: false,
      options: {
        format: 'YYYY-MM-DD',
        locale: 'zh-tw'
      },
      dateline: {
        date: '',
        hr: 0,
        min: 0,
        sec: 0
      }
    };
  },
  computed: {
    convertNum() {
      return parseInt(this.newCoupon.percent, 10);
    }
  },
  methods: {
    getCouponList() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupons`;
      this.$http.get(url).then((response) => {
        this.couponList = response.data.data;
        this.isLoading = false;
      });
    },
    onAddNewCoupon() {
      this.isLoading = true;
      this.newCoupon.deadline_at = `${this.dateline.date} ${this.dateline.hr}:${this.dateline.min}:${this.dateline.sec}`;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      this.$http.post(url, this.newCoupon)
        .then(() => {
          this.getCouponList();
          this.newCoupon = {
            title: '',
            code: '',
            percent: 0,
            enabled: false,
            deadline_at: ''
          };
          this.isLoading = false;
          utils.notifyAlert('Success to add a Coupon', 'success');
        })
        .catch(error => {
          this.isLoading = false;
          utils.notifyAlert(error.errors.message, 'danger');
        });
    }
  },
  created() {
    // TODO 優化
    if (utils.vueAjaxSubmit.validateToken()) {
      this.getCouponList();
    } else {
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<template>
  <Layout>
    <section id="couponList">
      <div class="container my-5">
        <div class="row">
          <div class="col-md-6 pb-5 text-left">
            <form>
              <div class="form-group">
                <label for="coupon_title">
                  Title
                  <span class="text-danger">*</span>
                </label>
                <input
                  type="string"
                  class="form-control input_style rounded-0"
                  id="coupon_title"
                  v-model="newCoupon.title"
                  placeholder="Coupon Title"
                />
              </div>
              <div class="form-group">
                <label for="coupon_code">
                  Code
                  <span class="text-danger">*</span>
                </label>
                <input
                  type="string"
                  class="form-control input_style rounded-0"
                  id="coupon_code"
                  v-model="newCoupon.code"
                  placeholder="Coupon Code"
                />
              </div>
              <div class="form-group">
                <label for="coupon_percent">
                  Percent(%)
                  <span class="text-danger">*</span>
                </label>
                <input
                  type="number"
                  class="form-control input_style rounded-0"
                  id="coupon_percent"
                  v-model.number="newCoupon.percent"
                  placeholder="Percent"
                  onKeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
                />
              </div>
              <div class="form-group">
                <label for="coupon_deadline">
                  Deadline
                  <span class="text-danger">*</span>
                </label>
                <DatePicker
                  id="coupon_deadline"
                  class="form-control input_style rounded-0"
                  :config="options"
                  v-model="dateline.date"
                  placeholder="YYYY-MM-DD"
                ></DatePicker>
              </div>
              <div class="form-group">
                <div class="container px-0 mb-2">
                  <div class="row">
                    <div class="col-8">
                      <input
                      type="number"
                      class="form-control input_style rounded-0"
                      min="0"
                      max="24"
                      v-model.number="dateline.hr"
                      onKeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
                      >
                    </div>
                    <div class="col-4 d-flex align-items-center">
                      <span>
                        hour
                      </span>
                    </div>
                  </div>
                </div>
                <div class="container px-0 mb-2">
                  <div class="row">
                    <div class="col-8">
                      <input
                      type="number"
                      class="form-control input_style rounded-0"
                      min="0"
                      max="59"
                      v-model.number="dateline.min"
                      onKeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
                      >
                    </div>
                    <div class="col-4 d-flex align-items-center">
                      <span>
                        mins
                      </span>
                    </div>
                  </div>
                </div>
                <div class="container px-0 mb-2">
                  <div class="row">
                    <div class="col-8">
                      <input
                      type="number"
                      class="form-control input_style rounded-0"
                      min="0"
                      max="59"
                      v-model.number="dateline.sec"
                      onKeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
                      >
                    </div>
                    <div class="col-4 d-flex align-items-center">
                      <span>
                        sec
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group form-check text-left ml-4">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="coupon_enabled"
                  v-model="newCoupon.enabled"
                />
                <label class="form-check-label" for="coupon_enabled"
                  >Enabled</label
                >
              </div>
              <BaseButton
                type="button"
                class="btn btn-block btn-dark rounded-0"
                @click="onAddNewCoupon"
              >
                Submit
              </BaseButton>
            </form>
          </div>
          <div class="col-md-6 pb-5">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Percent</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Enabled</th>
                </tr>
              </thead>
              <tbody>
                <!-- TODO tag -->
                <router-link
                  v-for="(item, index) in couponList"
                  :to="{ name: 'CouponDetail', params: { id: `${item.id}` } }"
                  tag="tr"
                  :key="item.id"
                >
                  <th>{{ index + 1 }}</th>
                  <td>{{ item.title }}</td>
                  <td>{{ item.percent }}</td>
                  <td>{{ item.deadline.datetime }}</td>
                  <td>
                    <span class="text-success" v-if="item.enabled === true"
                      >Active</span
                    >
                    <span class="text-danger" v-else>Unactive</span>
                  </td>
                </router-link>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Vue loading -->
      <Loading :active.sync="this.isLoading"></Loading>

    </section>
  </Layout>
</template>

<style lang="scss">
#couponList {
  .input_style:focus {
    border-style: solid;
    border-color: gray;
    box-shadow: 0 0 3px gray;
  }
  td:hover,
  th:hover {
    cursor: pointer;
  }
}
</style>
