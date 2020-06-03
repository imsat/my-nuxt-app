<template>
  <div class="admin-post-page">
    <section class="update-post-form">
      <AdminPostForm :post="loadedPost" />
    </section>
  </div>
</template>

<script>
  import AdminPostForm from "~/components/Admin/AdminPostForm";
    export default {
      layout: 'admin',
      components: {
        AdminPostForm
      },
      data() {
        return {
          loadedPost: {
            author: 'Satyajit',
            title: 'My awesome post',
            content: 'Super amazing, thanks for that!',
            thumbnailLink: 'https://i1.wp.com/blog.codacy.com/wp-content/uploads/2018/10/20181002_WhyCodingStandardsMatter.jpg?fit=750%2C400&ssl=1',
          }
        }
      },
    }
</script>

<style scoped>
  .update-post-form {
    width: 90%;
    margin: 20px auto;
  }

  @media (min-width: 768px) {
    .update-post-form {
      width: 500px;
    }
  }
</style>
