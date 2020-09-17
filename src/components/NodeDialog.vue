<template>
    <div>
        <div class="modal" v-if="visible">
            <div class="header">
                <span>Edit</span>
            </div>
            <div class="body">
                <!-- <label for="thumbnail">image(thumbnail)</label>
                <input id="thumbnail" v-model="nodeForm.thumbnail"/> -->
                <div class="thumbnail" id="thumbnail">
                  <img v-bind:src="nodeForm.thumbnail" alt="">
                </div>
                <input class="form-control" id="thumbnail" v-model="nodeForm.thumbnail"/>
                <label for="approver">URL</label>
                <input class="form-control" id="url" v-model="nodeForm.url"/>
                <label for="name">Title</label>
                <!-- <label for="name">Title(Name)</label> -->
                <input class="form-control" id="title" v-model="nodeForm.name"/>
                <!-- <select class="form-control" id="thumbnail" v-model="nodeForm.thumbnail">
                    <option :key="'node-thumbnail-' + item.id" :value="item.id"
                            v-for="item in [ { name: 'Start', id: 'start' }, { name: 'End', id: 'end' }, { name: 'Operation', id: 'operation' } ]"
                    >
                        {{item.name}}
                    </option>
                </select> -->
                <label for="approver">Summary</label>
                <!-- <label for="approver">Summary(Approver)</label> -->
                <input class="form-control" id="approver" v-model="nodeForm.summary"/>
                <!-- <textarea class="form-control" id="approver" v-model="nodeForm.summary"></textarea> -->
                <!-- <select class="form-control" id="approver" :value="nodeForm.approver.id"
                        @change="handleChangeApprover($event)">
                    <option :value="item.id" :key="'approver-' + item.id" v-for="item in approvers">
                        {{item.name}}
                    </option>
                </select> -->
            </div>
            <div class="footer">
                <button @click="handleClickCancelSaveNode">Cancel</button>
                <button @click="handleClickSaveNode">Save</button>
                <button @click="handleClickGetInfo">Get</button>
            </div>
        </div>
    </div>
</template>
<script>
  import '../assets/modal.css';
  // Ajax通信ライブラリ
  import axios from 'axios';

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      node: {
        type: Object,
        default: null,
      },
    },
    data: function() {
      return {
        nodeForm: {id: null, thumbnail: null, url:null, name: null, summary: null},
        // nodeForm: {name: null, id: null, type: null, approver: []},
        // approvers: [{id: 1, name: 'Joyce'}, {id: 2, name: 'Allen'}, {id: 3, name: 'Teresa'}],
      };
    },
    methods: {
      handleClickGetInfo() {
        // Json取得のベースURL
        const URL_BASE = 'http://127.0.0.1:8000/newsapp/get';
        // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        // return axios.get(this.nodeForm.url)
        // console.log(document.getElementsByName('csrf-token')[0].content)
        console.log(this.nodeForm.url);
        return axios({
          method: 'POST',
          url: URL_BASE,
          data: {
            url: this.nodeForm.url,
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST PUT, DELETE, PATCH',
            'xsrfHeaderName': 'X-CSRF-Token',
            'withCredentials': true,
            // 'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].content
            // 'X-CSRF-TOKEN': getCookieValue('XSRF-TOKEN')
            // 'X-CSRF-TOKEN': csrf_token()
          }
        // }).post(URL_BASE, {
          // withCredentials: true,
        }).then((res) => {
          console.log(res.data[0]);
          this.nodeForm.thumbnail = res.data[0][2];
          this.nodeForm.name = res.data[0][0];
          this.nodeForm.summary = res.data[0][1];
          // Vue.set(this, name, res.data);
          // this.$emit('GET_AJAX_COMPLETE');
        });
      },
      // save押下時に実行される
      handleClickSaveNode() {
        console.log('koko');
        this.$emit('update:node', Object.assign(this.node, {
          name: this.nodeForm.name,
          thumbnail: this.nodeForm.thumbnail,
          summary: this.nodeForm.summary,
          url: this.nodeForm.url,
          // approvers: [Object.assign({}, this.nodeForm.approver)],
        }));
        // console.log(this.nodeForm.url);
        this.$emit('update:visible', false);
      },
      handleClickCancelSaveNode() {
        this.$emit('update:visible', false);
      },
      handleChangeApprover(e) {
        // this.nodeForm.approver = this.approvers.filter(i => i.id === parseInt(e.target.value))[0];
        this.nodeForm.summary = this.approvers.filter(i => i.id === parseInt(e.target.value))[0];
      },
    },
    watch: {
      node: {
        immediate: true,
        handler(val) {
          if (!val) { return; }
          this.nodeForm.id = val.id;
          this.nodeForm.thumbnail = val.thumbnail;
          this.nodeForm.url = val.url;
          this.nodeForm.name = val.name;
          this.nodeForm.summary = val.summary;
          // if (val.approvers && val.approvers.length > 0) {
          //   this.nodeForm.approver = val.approvers[0];
          // }
        },
      },
    },
  };
</script>
