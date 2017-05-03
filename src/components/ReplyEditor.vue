<template>
  <div>
    <quill-editor v-model="content"
                  :options="editorOption"
                  @change="onEditorChange($event)">
    </quill-editor>
    <mu-raised-button label="发表新评论" primary @click="postReply" />
  </div>
</template>

<script>

  var toolbarOptions = [
    { 'header': [1, 2, 3, 4, 5, 6, false] },
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'
  ];

  export default {
    name: 'reply-editor',
    data() {
      return {
        content: '',
        editorOption: {
          name: 'reply-editor',
          modules: {
            toolbar: toolbarOptions
          }
        }
      }
    },
    methods: {
      onEditorChange(e) {
        // console.log(e)
      },
      postReply() {
        this.$store.dispatch("createReply", {
          content: this.content
        })
      }
    }
  }
</script>
