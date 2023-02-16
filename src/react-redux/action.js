import * as types from './actionType';

import axios from 'axios'

const getMusicRecordRequest=() => {
    return {
        type:types.GET_MUSIC_RECORD_REQUEST
    }
}

 const getMusicRecord =(queryParams) => (dispatch) => {
    dispatch(getMusicRecordRequest());

    return axios.get('http://localhost:8080/albums', queryParams).then(res => {
        dispatch({
            type:types.GET_MUSIC_RECORD_SUCCESS,
            payload:res.data
        })
    } ).catch(e=> {
        dispatch({
            type:types.GET_MUSIC_RECORD_FAILURE
        })
    })
}


export {getMusicRecord}


