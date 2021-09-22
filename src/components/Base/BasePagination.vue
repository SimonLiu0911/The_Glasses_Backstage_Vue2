<template>
  <nav :id="$style.pagination">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
        <BaseButton
          class="page-link border-0  bg-transparent text-dark shadow-none"
          href="javascript:;"
          @click="updatePage(pages.current_page - 1)"
        >
          <i class="fas fa-angle-double-left"></i>
        </BaseButton>
      </li>
      <li
        class="page-item"
        :class="{ active: pages.current_page === i }"
        v-for="i in pages.total_pages"
        :key="i"
      >
        <BaseButton
          class="page-link border-0 bg-transparent text-dark shadow-none"
          href="javascript:;"
          @click="updatePage(i)"
        >
          {{ i }}
        </BaseButton>
      </li>
      <li class="page-item" :class="{ disabled: pages.current_page ===  pages.total_pages}">
        <BaseButton
          class="page-link border-0  bg-transparent text-dark shadow-none"
          href="javascript:;"
          @click="updatePage(pages.current_page + 1)"
        >
          <i class="fas fa-angle-double-right"></i>
        </BaseButton>
      </li>
    </ul>
  </nav>
</template>

<script>
/**
 * @param {*} pages 傳進來的pagination
 * 用 update 傳出去更新table
 */
export default {
  data() {
    return {};
  },
  props: {
    pages: {
      type: Object,
      require: true,
      default() {
        return {};
      }
    }
  },
  methods: {
    updatePage(num) {
      this.$emit('update', num);
    }
  }
};
</script>

<style lang="scss" module>
#pagination {
  :global {
    .page-item {
      &:hover {
        cursor: pointer;
      }
      &.active {
        font-weight: bolder;
      }
    }
  }
}
</style>
