

export function getRedirectTo(type,header){
    let path = '';
    //type
    if (type==='laoBan'){
        path = '/laoban'
    }else {
        path = 'dashen'
    }
    //header
    if (!header){//没有值,返回信息信心完善界面的path
        path += 'info'
    }

    return path;
}