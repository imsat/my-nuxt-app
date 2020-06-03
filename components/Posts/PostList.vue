<template>
  <section class="post-list">
    <PostPreview
      id="1"
      :is-admin="isAdmin"
      title="Hello there!"
      previewText="This is my 1st post"
      thumbnail="https://i1.wp.com/blog.codacy.com/wp-content/uploads/2018/10/20181002_WhyCodingStandardsMatter.jpg?fit=750%2C400&ssl=1"
    />

    <PostPreview
      id="2"
      :is-admin="isAdmin"
      title="Hello there - the second time!"
      previewText="This is my second post"
      thumbnail="https://i1.wp.com/blog.codacy.com/wp-content/uploads/2018/10/20181002_WhyCodingStandardsMatter.jpg?fit=750%2C400&ssl=1"
    />
    <PostPreview
      id="3"
      :is-admin="isAdmin"
      title="Hello there - the third time!"
      previewText="This is my third post"
      thumbnail="https://i1.wp.com/blog.codacy.com/wp-content/uploads/2018/10/20181002_WhyCodingStandardsMatter.jpg?fit=750%2C400&ssl=1"
    />
  </section>
</template>

<script>
  import PostPreview from "~/components/Posts/PostPreview";

  export default {
    name: "PostList",
    components: {
      PostPreview
    },
    props: {
      isAdmin: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .post-list {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>
