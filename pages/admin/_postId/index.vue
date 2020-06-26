<template>
  <div class="admin-post-page">
    <section class="update-post-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
  import AdminPostForm from "~/components/Admin/AdminPostForm";
  import axios from 'axios';
  import { mapActions } from 'vuex'
    export default {
      layout: 'admin',
      components: {
        AdminPostForm
      },
      data() {
        return {
          // loadedPost: {
          //   author: '',
          //   title: '',
          //   content: '',
          //   thumbnail: '',
          //   previewText: ''
          // }0
        }
      },
      asyncData(context) {
        return axios.get(process.env.baseUrl +  '/posts/' + context.params.postId + '.json')
          .then(res => {
            return {
              loadedPost: {...res.data, id: context.params.postId}
            }

          })
          .catch(e => context.error(e))
      },
      methods: {
        ...mapActions(['editedPost']),
        onSubmitted(editedPost){
          this.editedPost(editedPost).then(() => {
            this.$router.push('/admin')
          })
        }
      }
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
