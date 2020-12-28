import axios from "axios";

export default function ajax(url, data={}, type='GET'){
    if (type==='GET'){
        let paramaStr = '';
        Object.keys(data).forEach(key => {
            paramaStr += key + '=' + data[key]  + '&';
        })
        if (paramaStr){
            paramaStr = paramaStr.substring(0,paramaStr.length-1);
        }
        return axios.get(url+'?'+paramaStr);
    }else {
        return axios.post(url,data);
    }
}