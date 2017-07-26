/**
 * Created by Administrator on 2017/7/20 0020.
 */
SPA_RESOLVE_INIT = (transition) => {
    document.querySelector('#content').innerHTML = 'detail: detail-'+transition.query.detail;
}