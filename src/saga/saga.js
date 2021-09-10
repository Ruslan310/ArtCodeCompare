import {
    FETCH_ART,
    FETCH_ART_RESIVED,
    LOG_IN_FAILED,
    FETCH_NAME,
    FETCH_NAME_RESIVED,
    FETCH_PRODUCT,
    FETCH_PRODUCT_RESIVED,
} from "../redux/action";

import {put, takeLatest, all} from 'redux-saga/effects';
let userToken = localStorage.getItem('currentUserToken');
//users?id=25&name=vasya&
/**saga getArtCode */
function* fetchArt(action) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userToken,
        },
        body: JSON.stringify(action.value)
    }
    try {
        let newArt = []
    let data = yield fetch(process.env.REACT_APP_SAGA_API+'checkArtcode', options)
        .then(response => response.json());
    data.map(item => {
        let parsed = {}
        parsed.Name = item.nameSKU911
        parsed.Artcode = item.artCode
        parsed.Producer = item.Producer
        parsed.isSelectedArt = false
        return newArt.push(parsed)
    })
    yield put({type: FETCH_ART_RESIVED, data: newArt});
    } catch (error) {
        yield put({type: LOG_IN_FAILED, data: false});
    }
}

function* fetchGetArtWatcher() {
    yield takeLatest(FETCH_ART, fetchArt)
}

/**saga getNameProduct */
function* fetchName() {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userToken,
        }
    }
    try {
        let newName = []
        let response = yield fetch(process.env.REACT_APP_SAGA_API+'getListName', options)

        if(response.status === 200){
            let data = yield response.json()
            data.map(item => {
                let parsed = {}
                parsed.id = item.id
                parsed.partner_ID = item.Partner_ID
                parsed.codeSKU = item.codeSKUPartner
                parsed.nameSKU = item.nameSKUPartner
                parsed.producer = item.producer
                parsed.vat = item.vat
                parsed.isSelectedName = false
                parsed.isFilter = true
                parsed.isFilterProduct = true
                parsed.noForSelect = false
                return newName.push(parsed)
            })
        }
        yield put({type: FETCH_NAME_RESIVED, data: newName});
    } catch (error) {
        console.log(error)
        yield put({type: LOG_IN_FAILED, data: false});
    }
}

function* fetchGetNameWatcher() {
    yield takeLatest(FETCH_NAME, fetchName)
}

/**saga запись в временную таблицу  forCheck*/
function* fetchProduct(action) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userToken,
        },
        body: JSON.stringify(action.value)
    }
    try {
        let data = yield fetch(process.env.REACT_APP_SAGA_API+'forCheck', options)
            .then(response => response.json());
        let newName = []
        data.map(item => {
            let parsed = {}
            parsed.id = item.id
            parsed.Partner_ID = item.Partner_ID
            parsed.artCode = item.artCode
            parsed.codeSKUPartner = item.codeSKUPartner
            parsed.insDate = item.insDate
            parsed.nameSKUPartner = item.nameSKUPartner
            parsed.producer = item.producer
            parsed.vat = item.vat
            parsed.nameSKU911 = item.nameSKU911
            parsed.oldId = action.value.id
            return newName.push(parsed)
        })
        yield put({type: FETCH_PRODUCT_RESIVED, data: newName[0]});
    } catch (error) {
        yield put({type: LOG_IN_FAILED, data: false});
    }
}


function* getProductWatcher() {
    yield takeLatest(FETCH_PRODUCT, fetchProduct)
}
export default function* rootSaga() {
    yield all([
        fetchGetArtWatcher(),
        fetchGetNameWatcher(),
        getProductWatcher(),
    ])
}
  