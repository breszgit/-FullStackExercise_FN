<template>
  <div>
      <b-row>
          <b-col lg="12">
              <b-button @click="OpenNewTask()" class="mb-2 mt-2 float-left" variant="primary"><BIconPencilFill></BIconPencilFill> New Task</b-button>
              <b-table-simple responsive>
                    <b-thead>
                        <b-tr>
                            <b-th sticky-column>CMD</b-th>
                            <b-th>TaskID</b-th>
                            <b-th>TaskName</b-th>
                            <b-th>Description</b-th>
                            <b-th>Status</b-th>
                            <b-th>CreateDate</b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody>
                        <b-tr v-for="(tk, idx) in TKList" :key="idx">
                            <b-th>
                                <b-button variant="info" @click="EditTask(tk)" class="mx-2"><BIconPencilFill></BIconPencilFill></b-button>
                                <b-button variant="danger" @click="ReqDeleteTask(tk.dtkId)"><BIconTrash></BIconTrash></b-button>
                            </b-th>
                            <b-td>{{tk.dtkId}}</b-td>
                            <b-td>{{tk.dtkTaskName}}</b-td>
                            <b-td>{{tk.dtkDescription}}</b-td>
                            <b-td>{{tk.dtkStatus}}</b-td>
                            <b-td>{{tk.dtkCreatedate}}</b-td>
                        </b-tr>                        
                    </b-tbody>                
                </b-table-simple>
          </b-col>
      </b-row>      

      <b-modal v-model="mdEdit" title="Task Edit"  no-close-on-esc no-close-on-backdrop hide-header hide-footer>
        <b-row>
            <b-col lg="12">
                <h5>Task Edit</h5>
                
                <b-row>
                    <b-col lg="6">
                        <b-form-group label="ID:" disabled>
                            <b-form-input
                                v-model="TK.dtkId"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col lg="6">
                        <b-form-group label="Type:">
                            <b-form-input
                                v-model="TK.dtkTktId"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                
                <b-form-group label="Name:">
                    <b-form-input
                        v-model="TK.dtkTaskName"
                    ></b-form-input>
                </b-form-group>              

                <b-form-group label="Description:">
                    <b-form-input
                        v-model="TK.dtkDescription"
                    ></b-form-input>
                </b-form-group>

                <b-row>
                    <b-col lg="6">
                        <b-form-group label="Priority:">
                            <b-form-input type="number"
                                v-model.number="TK.dtkPriority"
                            ></b-form-input>
                        </b-form-group>  
                    </b-col>

                    <b-col lg="6">
                        <b-form-group label="Status:">
                            <b-form-select @change="UpdateTaskStatus()"
                            v-model="TK.dtkStatus"
                            :options="optStatus"
                            ></b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>       

                <b-button variant="success" class="mx-3" @click="SaveTask()">Save</b-button>
                <b-button @click="mdEdit=false">Cancel</b-button>
            </b-col>
        </b-row>
        
    </b-modal>
  </div>
</template>

<script>
import taskService from '../services/taskService.vue'
import { BIconPencilFill,BIconTrash } from 'bootstrap-icons-vue';

export default {
    components:{
        BIconPencilFill,
        BIconTrash
    },
    data(){
        return{
            TKList:[],
            mdEdit:false,
            TK:{
                dtkId: 0,
                dtkTaskName: "",
                dtkTktId: 1,
                dtkPriority: 0,
                dtkCreatedate: null,
                dtkDuration: 0,
                dtkDurationType: "HOUR",
                dtkDescription: "",
                dtkCreateByUid: "",
                dtkAssignToUid: "",
                dtkStatus: "PREVIEW",
                dtkComplete: 0
            },
            optStatus:[
                {value: 'PREVIEW', text: 'PREVIEW'},
                {value: 'ASSIGNED', text: 'ASSIGNED'},
                {value: 'PROCESSING', text: 'PROCESSING'},
                {value: 'COMPLETE', text: 'COMPLETE'}
            ],
            ATH:{
                UID:"",
                TOKEN:""
            }
        }
    },
    methods:{
        GetTasks(){
            taskService.GetTaskList(this.ATH)
                .then(res => {
                    this.TKList = res.data;
                    // console.log(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        },
        OpenNewTask(){
            this.mdEdit = true;
            this.TK = {
                dtkId: 0,
                dtkTaskName: "",
                dtkTktId: 1,
                dtkPriority: 0,
                dtkCreatedate: null,
                dtkDuration: 0,
                dtkDurationType: "HOUR",
                dtkDescription: "",
                dtkCreateByUid: "",
                dtkAssignToUid: "",
                dtkStatus: "PREVIEW",
                dtkComplete: 0
            }
        },
        EditTask(_TK){
            this.TK = _TK;
            this.mdEdit = true;
        },
        SaveTask(){
            taskService.SaveTask(this.TK, this.ATH)
                .then(res => {
                    this.GetTasks();
                    this.mdEdit = false;
                    console.log(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        },
        ReqDeleteTask(TKID){
            this.$swal({
                title: 'Delete Task!!!',
                text: 'Are you sure to delete TaskID:'+TKID+'?',
                icon: 'question',
                confirmButtonText: 'Sure',
                confirmButtonColor: 'red',
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    this.DeleteTask(TKID);
                }
            })
        },
        DeleteTask(TKID){
            taskService.DeleteTask(TKID, this.ATH)
                .then(res => {
                    this.GetTasks();
                    console.log(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        },
        UpdateTaskStatus(){
            let _TK = this.TK;

            if(_TK.dtkId == 0)
                return;

            taskService.UpdateStatus(_TK.dtkId, _TK.dtkStatus, this.ATH)
                .then(res => {
                    this.$swal({
                        title: 'Update Status Task!!!',
                        text: res.data,
                        icon: 'success'
                    });
                })
                .catch(err => {
                    console.error(err);
                });
        }
    },
    mounted(){                
        const UID = this.$cookies.get("X_UID");
        const TOKEN = this.$cookies.get("X_TOKEN");
        if(UID == null || TOKEN == null)
            this.$router.push('/');

        let _ATH = {
            UID,
            TOKEN
        };
        this.ATH = _ATH;
        console.log(_ATH);

        this.GetTasks();
    }
}
</script>

<style>

</style>