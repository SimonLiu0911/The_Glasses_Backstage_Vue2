
<script>
export default {
  props: {
    singleProduct: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    delProduct() {
      // DELETE api/{uuid}/admin/ec/product/{id}
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.singleProduct.id}`;
      this.$http.delete(url).then((response) => {
        this.$emit('update');
      });
      window.$('#delProductModal').modal('hide');
    },
    onCancelLoadingCircle() {
      this.$emit('unactiveloading');
    }
  }
};
</script>

<template>
  <div
    id="delProductModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span>Delete</span>
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="onCancelLoadingCircle"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-left">
          If delete
          <strong class="text-danger">{{ singleProduct.title }}</strong
          >, it can't recovery.
        </div>
        <div class="modal-footer">
          <BaseButton
            type="button"
            class="btn btn-dark rounded-0"
            data-dismiss="modal"
            @click="onCancelLoadingCircle"
          >
            Cancel
          </BaseButton>
          <BaseButton
            type="button"
            class="btn btn-outline-danger rounded-0"
            @click="delProduct"
          >
            Delete
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
