<template>
  <div class="post-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
  import PostList from "~/components/Posts/PostList";

  export default {
    components: {
      PostList
    },
    // Failed to run asyncData
   /* async asyncData ({ params }) {
      console.log(params)
      return  await setTimeout(() => {
        callback(null, {
          loadedPosts: [
            {
              id: 1,
              title: 'First post',
              previewText: 'This is my first post',
              thumbnail: 'https://i1.wp.com/blog.codacy.com/wp-content/uploads/2018/10/20181002_WhyCodingStandardsMatter.jpg?fit=750%2C400&ssl=1',
            },
            {
              id: 2,
              title: 'Second post',
              previewText: 'This is my second post',
              thumbnail: 'https://i1.wp.com/blog.codacy.com/wp-content/uploads/2018/10/20181002_WhyCodingStandardsMatter.jpg?fit=750%2C400&ssl=1',
            },
            {
              id: 3,
              title: 'Third post',
              previewText: 'This is my third post',
              thumbnail: 'https://i1.wp.com/blog.codacy.com/wp-content/uploads/2018/10/20181002_WhyCodingStandardsMatter.jpg?fit=750%2C400&ssl=1',
            },
          ]
        })

      }, 1500);
    },*/

    asyncData(context, callback) {
      console.log(context)
      setTimeout(() => {
        callback(null, {
          loadedPosts: [
            {
              id: 1,
              title: 'First post',
              previewText: 'This is my first post',
              thumbnail: 'https://i1.wp.com/blog.codacy.com/wp-content/uploads/2018/10/20181002_WhyCodingStandardsMatter.jpg?fit=750%2C400&ssl=1',
            },
            {
              id: 2,
              title: 'Second post',
              previewText: 'This is my second post',
              thumbnail: 'https://i1.wp.com/blog.codacy.com/wp-content/uploads/2018/10/20181002_WhyCodingStandardsMatter.jpg?fit=750%2C400&ssl=1',
            },
            {
              id: 3,
              title: 'Third post',
              previewText: 'This is my third post',
              thumbnail: 'https://i1.wp.com/blog.codacy.com/wp-content/uploads/2018/10/20181002_WhyCodingStandardsMatter.jpg?fit=750%2C400&ssl=1',
            },
          ]
        })

      }, 1500);

    },
    created() {
      this.$store.dispatch('getPosts', this.loadedPosts)
    }
  }
</script>

<style scoped>
  .post-page {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
