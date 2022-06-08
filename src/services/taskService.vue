<script>
import axios from "axios";

export default {
    GetTaskList(ATH){
        var config = {
            method: 'get',
            url: 'https://localhost:7139/Task',
            headers: {
                UID: ATH.UID,
                TOKEN: ATH.TOKEN
            }
        };
        return axios(config);
    },
    SaveTask(tk,ATH){
        var config = {
            method: 'put',
            url: 'https://localhost:7139/Task',
            headers: {
                UID: ATH.UID,
                TOKEN: ATH.TOKEN
            },
            data:tk
        };
        return axios(config);
    },
    DeleteTask(tkid,ATH){
        var config = {
            method: 'delete',
            url: 'https://localhost:7139/Task/'+tkid,
            headers: {
                UID: ATH.UID,
                TOKEN: ATH.TOKEN
            }
        };
        return axios(config);
    },
    UpdateStatus(tkid,status,ATH){
        var config = {
            method: 'patch',
            url: 'https://localhost:7139/Task/'+tkid+'/'+status,
            headers: {
                UID: ATH.UID,
                TOKEN: ATH.TOKEN
            }
        };
        return axios(config);
    }
}

</script>