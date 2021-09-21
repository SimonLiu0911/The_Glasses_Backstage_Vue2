<template>
  <div class="pagination">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
          <a
          class="page-link"
          href="#"
          @click.prevent="updatePage(pages.current_page - 1)"
          >
            Previous
          </a>
        </li>
        <li
          class="page-item"
          :class="{ active: pages.current_page === i }"
          v-for="i in pages.total_pages"
          :key="i"
        >
          <a class="page-link" href="#" @click.prevent="updatePage(i)">{{ i }}</a>
        </li>
        <li class="page-item" :class="{ disabled: pages.current_page ===  pages.total_pages}">
          <a
          class="page-link"
          href="#"
          @click.prevent="updatePage(pages.current_page + 1)"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
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
      console.log(num);
      this.$emit('update', num);
    }
  }
};
</script>

<style lang="scss">
nav {
  margin: 0 auto;
}
</style>
