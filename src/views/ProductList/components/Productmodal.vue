<script>
export default {
  data() {
    return {
      isLoading: false
    };
  },
  props: {
    singleProduct: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    updateProduct() {
      // this.isLoading = true;
      // PATCH api/{uuid}/admin/ec/product/{id}
      // const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.singleProduct.id}`;
      // this.$http.patch(url, this.singleProduct).then(() => {
      //   // console.log(response);
      //   window.$('#productModal').modal('hide');
      //   this.$emit('update');
      //   this.isLoading = false;
      // });
    }
  }
};
</script>

<template>
  <div class="modal-dialog modal-xl text-left" role="document">
    <div class="modal-content">
      <div class="modal-header border-bottom-0">
        <h5 id="exampleModalLabel" class="modal-title">UpLoad New Product</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="imageUrl">Image URL</label>
              <input
                id="imageUrl"
                v-model="singleProduct.imageUrl[0]"
                type="text"
                class="form-control"
                placeholder="請輸入圖片連結"
              />
            </div>
            <img class="img-fluid" :src="singleProduct.imageUrl[0]" alt />
          </div>
          <img class="img-fluid" alt />

          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                id="title"
                type="text"
                class="form-control"
                v-model="singleProduct.title"
                placeholder="請輸入標題"
              />
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">Category</label>
                <input
                  id="category"
                  type="text"
                  class="form-control"
                  v-model="singleProduct.category"
                  placeholder="請輸入分類"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="price">Unit</label>
                <input
                  id="unit"
                  type="unit"
                  class="form-control"
                  v-model="singleProduct.unit"
                  placeholder="請輸入單位"
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
                  v-model="singleProduct.origin_price"
                  placeholder="請輸入原價"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="price">Selling Price</label>
                <input
                  id="price"
                  type="number"
                  class="form-control"
                  v-model="singleProduct.price"
                  placeholder="請輸入售價"
                />
              </div>
            </div>
            <hr />

            <div class="form-group">
              <label for="description">Product Description</label>
              <textarea
                id="description"
                type="text"
                class="form-control"
                v-model="singleProduct.description"
                placeholder="請輸入產品描述"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="content">Content</label>
              <textarea
                id="description"
                type="text"
                class="form-control"
                v-model="singleProduct.content"
                placeholder="請輸入說明內容"
              ></textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="styled-checkbox"
                  id="is_enabled"
                  type="checkbox"
                  v-model="singleProduct.enabled"
                />
                <label class="styledLabel" for="is_enabled">Enabled</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger rounded-0" data-dismiss="modal">
            Close
          </button>
          <button
            type="button"
            class="btn btn-outline-dark rounded-0"
            @click="updateProduct(singleProduct)"
          >
            UpDate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
textarea {
  resize:none;
}
</style>
