import React from 'react';
import {connect} from "react-redux";
import {
    clearALLCheckedProduct,
    clearCheckedProduct,
    closeModal, deleteCollumCheckTable,
    fetchProduct,
    openModal,
    setModalMessage,
    updateNewProduct,
} from "../redux/action";
import {deleteFromCheckTable, pushNewProduct} from "../redux/helpFunction";

const mapStateToProps = (state) => ({
    loading: state.main.loading,
    selectName: state.main.selectName,
    selectArt: state.main.selectArt,
    NewProduct: state.main.NewProduct,
})
const mapDispatchToProps = ({
    setModalMessage,
    openModal,closeModal,
    fetchProduct,
    clearCheckedProduct,
    clearALLCheckedProduct,
    updateNewProduct,
    deleteCollumCheckTable
})

const $ProductsForCheck = (props) => {
    const formatBlockTime = (dateString) => {
        if (!dateString) {
            return '-'
        }
        let allDate = dateString.split('T')
        let time = allDate[1].substring(0, 5)
        let date = allDate[0].split('-')

        return `${time} ${date[2]}.${date[1]}.${date[0]}`
    }
    const obj = {
        id: props.selectName?.id,
        Partner_ID: props.selectName?.partner_ID,
        codeSKUPartner: props.selectName?.codeSKU,
        nameSKU911: props.selectArt?.Name,
        artCode: props.selectArt?.Artcode,
        nameSKUPartner: props.selectName?.nameSKU,
        producer: props.selectName?.producer,
        vat: props.selectName?.vat
    }
    const checkProduct = () => {
        if(!props.selectName || !props.selectArt){
            return props.setModalMessage('выберите позиции для сопоставления')
        }
        if (props.NewProduct.find(item => item.artCode === obj.artCode) || props.NewProduct.find(item => item.nameSKUPartner === obj.nameSKUPartner)) {
            return props.setModalMessage('такая позиция уже добавлена в таблицу сопоставления')
        }
        props.fetchProduct(obj)
        props.clearCheckedProduct()
    }
    let array = []
    const newCheckProduct = async () => {
        if(props.NewProduct.length<1){
            return props.setModalMessage('нет сопоставляемых данных')
        }
        for(let i= 0; i<props.NewProduct.length; i++){

            let result = await pushNewProduct(props.NewProduct[i])
            array?.push(result[0].id)
            if(array.length<1){
                return props.setModalMessage('ошибка записи данных')
            }
        }
        props.updateNewProduct(array)
        props.setModalMessage('данные записаны в основную таблицу')
        props.clearALLCheckedProduct()
    }

    const deleteCollum = async (post) => {
        let result =await deleteFromCheckTable({id: post.id})
        props.deleteCollumCheckTable(result)
    }
    return (
        <div className='wrapper_products'>
            <button className='nice_button butt' onClick={checkProduct}>Сопоставить</button>
            <button className='nice_button butt' onClick={newCheckProduct}>Подтвердить</button>
            <table className='table'>
                <thead>
                <tr>
                    <th className='textCenter'></th>
                    <th className='check_small_coll'>artCode</th>
                    <th className='check_small_midl'>Date</th>
                    <th className='table_art_producer_title'>nameSKUPartner</th>
                    <th className='table_art_producer_title'>nameSKU911</th>
                    <th className='table_art_prod_product'>producer</th>
                </tr>
                </thead>
                <tbody>
                    {props.NewProduct && props.NewProduct.map((post, index) => {
                            return (
                                <tr key={index} className={post.isSelectedArt ? "selectedRow" : 'nonSelectedRow'}>
                                    <td className="iconDelete"
                                    onClick={()=> deleteCollum(post)}
                                    ></td>
                                    <td className="check_small_coll">{post.artCode}</td>
                                    <td className="check_small_midl">{formatBlockTime(post.insDate)}</td>
                                    <td className="table_art_prod_last">{post.nameSKUPartner}</td>
                                    <td className="table_art_prod_last">{post.nameSKU911}</td>
                                    <td className="table_art_prod_product">{post.producer}</td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </div>
    );
};

const ProductsForCheck = connect(mapStateToProps, mapDispatchToProps)($ProductsForCheck)

export default ProductsForCheck;