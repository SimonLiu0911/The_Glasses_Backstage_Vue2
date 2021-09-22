<script>
import * as utils from '@/store/utils';

export default {
  components: {
    Layout: () => import('@layout/main'),
    ProductModal: () => import('./components/ProductModal'),
    DelProductModal: () => import('./components/DelProductModal.vue')
  },
  data() {
    return {
      productList: [],
      pagination: {},
      deleteBtn: '',
      isLoading: false,
      singleProduct: {},
      modalType: 'new'
    };
  },
  methods: {
    getProductList(num = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products`;
      this.$http.get(url, {
        params: {
          page: num
        }
      }).then((response) => {
        this.productList = response.data.data;
        this.pagination = response.data.meta.pagination;
        // if (this.tempProduct.id) {
        //   this.tempProduct = {
        //     imageUrl: []
        //   };
        // window.$('#productModal').modal('hide');
        // }
        this.isLoading = false;
      });
      // const config = {
      //   method: 'GET',
      //   url: `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products`,
      //   param: {
      //     page: num
      //   }
      // };
      // utils.vueAjaxSubmit.ajaxSubmit(config, response => {
      //   this.productList = response.data;
      //   this.pagination = response.meta.pagination;
      //   console.log(this.pagination);
      //   this.isLoading = false;
      // });
    },
    onSignOut() {
      document.cookie = 'myToken=;expires=;';
      this.$router.push({ name: 'Login' });
    },
    onOpenProductModal(type, item) {
      switch (type) {
        case 'new':
          this.modalType = 'new';
          break;
        case 'edit':
          this.modalType = 'edit';
          this.singleProduct = item;
          break;
        case 'delete':
          this.modalType = 'delete';
          this.singleProduct = item;
          break;
        default:
          break;
      }
    },
    onPatchItem(item) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`;
      this.$http
        .patch(url, {
          enabled: !item.enabled
        })
        .then((response) => {
          console.log(response.data.data.enabled);
        });
    }
  },
  created() {
    // TODO 登出後Token仍在？
    // // POST api/auth/check
    // const url = `${process.env.VUE_APP_APIPATH}/api/auth/check`;
    // const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // console.log(document.cookie);
    // this.$http.post(url, token)
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // utils.vueAjaxSubmit.validateToken();
    console.log(utils.vueAjaxSubmit.validateToken());
    if (utils.vueAjaxSubmit.validateToken()) {
      this.getProductList();
    } else {
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<template>
  <Layout>
    <section class="productsmanagement">
      <div class="container">
        <div class="mt-5 clearfix">
          <button
            class="btn btn-outline-dark rounded-0 float-right"
            type="button"
            @click="onOpenProductModal('new', 0)"
            data-toggle="modal" data-target="#productModal"
          >
            NEW PRODUCT
          </button>
          <button
            class="btn btn-dark rounded-0 float-left"
            type="button"
            @click="onSignOut"
          >
            SIGN OUT
          </button>
        </div>
        <table class="table table-responsive-xl mt-3">
          <thead>
            <tr>
              <th width="50">#</th>
              <th width="120">Product</th>
              <th>Sort</th>
              <th width="120">Price</th>
              <th width="150">Discount Price</th>
              <th width="100">Active</th>
              <th width="150">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in productList" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td class="text-right">{{ item.origin_price }}</td>
              <td class="text-right">{{ item.price }}</td>
              <td>
                <input
                  type="checkbox"
                  :id="`switch-${index}`"
                  class="switch"
                  v-model="item.enabled"
                  @click="onPatchItem(item)"
                />
                <label class="slider" :for="`switch-${index}`"></label>
              </td>
              <td>
                <div class="btn-group">
                  <BaseButton
                    class="btn btn-outline-dark btn-sm rounded-0"
                    @click="onOpenProductModal('edit', item)"
                    data-toggle="modal"
                    data-target="#productModal"
                  >
                    Edit
                  </BaseButton>
                  <BaseButton
                    class="btn btn-outline-danger btn-sm rounded-0"
                    @click="onOpenProductModal('delete', item)"
                    :disabled="deleteBtn === item.id"
                    data-toggle="modal"
                    data-target="#delProductModal"
                  >
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                      v-if="deleteBtn === item.id"
                    ></span>
                    Delete
                  </BaseButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Vue Loading -->
        <Loading :active.sync="this.isLoading"></Loading>

        <!-- Pagination -->
        <BasePagination :pages="pagination" @update="getProductList"></BasePagination>

        <!-- Modal -->
        <ProductModal
          :single-product="singleProduct"
          :modal-type="modalType"
          @update="getProductList"
        ></ProductModal>
        <DelProductModal @update="getProductList" :single-product="singleProduct"></DelProductModal>
      </div>
    </section>
  </Layout>
</template>

<style lang="scss">
/* Switch Style */
.switch {
  position: absolute;
  left: -9999px;
}
.slider {
  position: relative;
  display: block;
  width: 3.5em;
  height: 1.5em;
  cursor: pointer;
  border-radius: 0.75em;
  transition: 350ms;
  background: #ddd;
}
.slider:after {
  position: absolute;
  content: "";
  width: 1em;
  height: 1em;
  top: 0.25em;
  left: 0.25em;
  border-radius: 0.75em;
  transition: width 200ms ease-out, height 300ms 50ms ease-in,
    top 300ms 50ms ease-in, left 250ms 50ms ease-in, background 300ms ease-in,
    box-shadow 300ms ease-in;
  background: #f2f2f2;
  box-shadow: 0 0 0 1.5em #f2f2f2 inset;
}
.switch:checked + .slider::after {
  width: 2em;
  height: 1.5em;
  top: 0;
  left: 1.5em;
  background: #4c6;
  box-shadow: 0 0 0 0 #f2f2f2 inset;
}

/* Checkbox Style */
.styled-checkbox {
  position: absolute;
  opacity: 0;
}
.styled-checkbox + label {
  position: relative;
  cursor: pointer;
  padding: 0;
}
.styled-checkbox + label:before {
  content: "";
  margin-right: 10px;
  display: inline-block;
  vertical-align: text-top;
  width: 20px;
  height: 20px;
  background: gray;
}
.styled-checkbox:hover + label:before {
  background: #f35429;
}
.styled-checkbox:focus + label:before {
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
}
.styled-checkbox:checked + label:before {
  background: #f35429;
}
.styled-checkbox:checked + label:after {
  content: "";
  position: absolute;
  left: 5px;
  top: 13px;
  background: white;
  width: 2px;
  height: 2px;
  box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white,
    4px -6px 0 white, 4px -8px 0 white;
  transform: rotate(45deg);
}
</style>
