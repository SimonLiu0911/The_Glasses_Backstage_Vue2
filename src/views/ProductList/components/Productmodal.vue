<script>
export default {
  props: {
    singleProduct: {
      type: Object,
      default() {
        return {};
      }
    },
    modalType: {
      type: String,
      default: 'new'
    }
  },
  data() {
    return {
      isLoading: false,
      productInfo: {
        title: '',
        category: '',
        description: '',
        content: '',
        imageUrl: [],
        enabled: false,
        origin_price: null,
        price: null,
        unit: ''
      }
    };
  },
  methods: {
    onLoadProduct() {
      if (this.modalType === 'new') {
        this.isLoading = true;
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product`;
        this.$http.post(url, this.productInfo).then((response) => {
          window.$('#productModal').modal('hide');
          this.$emit('update');
          this.isLoading = false;
        });
      } else if (this.modalType === 'edit') {
        this.isLoading = true;
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.productInfo.id}`;
        this.$http.patch(url, this.productInfo).then((response) => {
          window.$('#productModal').modal('hide');
          this.$emit('update');
          this.isLoading = false;
        });
      }
    }
  },
  mounted() {
    window.$('#productModal').on('shown.bs.modal', () => {
      if (this.modalType === 'edit') {
        this.productInfo = this.singleProduct;
      }
    });
    window.$('#productModal').on('hidden.bs.modal', () => {
      Object.assign(this.$data, this.$options.data()); // 清空資料
    });
  }
};
</script>

<template>
  <div id="productModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl text-left">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">
            {{ this.modalType === 'edit'? productInfo.title : 'New Product' }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="imageUrl">
                Image URL
                <span class="text-danger">*</span>
              </label>
              <input
                id="imageUrl"
                type="text"
                class="form-control"
                placeholder="請輸入圖片連結"
                v-model="productInfo.imageUrl[0]"
              />
            </div>
            <img class="img-fluid" :src="productInfo.imageUrl[0]" alt="preview" />
          </div>
          <img class="img-fluid" alt />

          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">
                Title
                <span class="text-danger">*</span>
              </label>
              <input
                id="title"
                type="text"
                class="form-control"
                placeholder="請輸入標題"
                v-model="productInfo.title"
              />
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">
                  Category
                  <span class="text-danger">*</span>
                </label>
                <input
                  id="category"
                  type="text"
                  class="form-control"
                  placeholder="請輸入分類"
                  v-model="productInfo.category"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="unit">Unit</label>
                <input
                  id="unit"
                  type="unit"
                  class="form-control"
                  placeholder="請輸入單位"
                  v-model="productInfo.unit"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="origin_price">Price</label>
                <input
                  id="origin_price"
                  type="number"
                  class="form-control"
                  placeholder="請輸入原價"
                  v-model.number="productInfo.origin_price"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="price">Selling Price</label>
                <input
                  id="price"
                  type="number"
                  class="form-control"
                  placeholder="請輸入售價"
                  v-model.number="productInfo.price"
                />
              </div>
            </div>

            <hr />

            <div class="form-group">
              <label for="description">
                Product Description
                <span class="text-danger">*</span>
              </label>
              <textarea
                id="description"
                type="text"
                class="form-control"
                placeholder="請輸入產品描述"
                v-model="productInfo.description"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="content">
                Content
                <span class="text-danger">*</span>
              </label>
              <textarea
                id="description"
                type="text"
                class="form-control"
                placeholder="請輸入說明內容"
                v-model="productInfo.content"
              ></textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="styled-checkbox"
                  id="is_enabled"
                  type="checkbox"
                  v-model="productInfo.enabled"
                />
                <label class="styledLabel" for="is_enabled">Enabled</label>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="modal-footer">
          <BaseButton
            type="button"
            class="btn btn-danger rounded-0"
            data-dismiss="modal"
          >
            Close
          </BaseButton>
          <BaseButton
            type="button"
            class="btn btn-outline-dark rounded-0"
            @click="onLoadProduct"
          >
            UpLoad
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
textarea {
  resize: none;
}
</style>
