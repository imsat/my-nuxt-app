<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{loadedPost.title}}</h1>
      <div class="post-details">
        <div class="post-detail">Last updated on {{loadedPost.updatedDate | date }}</div>
        <div class="post-detail">Written by {{loadedPost.author}}</div>
      </div>
      <p class="post-content">{{loadedPost.content}}</p>
    </section>
    <section class="post-feedback">
      <p>Let me know what you think about the post, send a mail to <a
        href="mailto:feedbacl@mail.com">feedbacl@mail.com</a></p>
    </section>
  </div>
</template>

<script>
  export default {
    head: {
      title: 'A Blog Post'
    },
    asyncData(context) {
      if(context.payload) {
        return {
          loadedPost: context.payload.postData
        }
      }
      return context.app.$axios.$get('/posts/' + context.params.id + '.json')
        .then(data => {
          return {
            loadedPost: {...data, id: context.params.postId}
          }

        })
        .catch(e => context.error(e))


      // return new Promise((resolve,reject) => {
      //
      //   setTimeout(() => {
      //     resolve( {
      //       loadedPost: {
      //         id: 1,
      //         title: 'First post (ID: '+ context.params.id +')',
      //         // title: 'First post (ID: '+ context.route.params.id +')',
      //         previewText: 'This is my first post',
      //         author: 'Satyajit',
      //         updatedDate: new Date(),
      //         content: 'Fetching the data in the web is an asynchronous task which is dreaded by many due to its a-synchronousness.',
      //         thumbnail: 'https://i1.wp.com/blog.codacy.com/wp-content/uploads/2018/10/20181002_WhyCodingStandardsMatter.jpg?fit=750%2C400&ssl=1',
      //       }
      //     })
      //   },1000);
      //
      // })
      //   .then(res => {
      //     return res
      //   })
      //   .catch(e => {
      //   context.error(new Error())
      // })

    },
  }
</script>

<style scoped>
  .single-post-page {
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
  }

  .post {
    width: 100%;
  }

  @media (min-width: 768px) {
    .post {
      width: 600px;
      margin: auto;
    }
  }

  .post-title {
    margin: 0;
  }

  .post-details {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .post-details {
      flex-direction: row;
    }
  }

  .post-detail {
    color: rgb(88, 88, 88);
    margin: 0 10px;
  }

  .post-feedback a {
    color: red;
    text-decoration: none;
  }

  .post-feedback a:hover,
  .post-feedback a:active {
    color: salmon;
  }
</style>
