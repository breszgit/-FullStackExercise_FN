<script>
import axios from "axios";

export default {
    AuthCheck(UNAME,PWD){
        var config = {
            method: 'post',
            url: 'https://localhost:7139/Auth/UserAuth?Username='+UNAME+'&PWD='+PWD
        };
        return axios(config);
    }    
}

</script>