import React, {useRef} from 'react';
import ModalMessage from "./modalMessage";
import Loader from "./Loader";
import {fetchName, resetFilter, setFilter, setFilterID, setModalMessage, setSelectedName} from "../redux/action";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    loading: state.main.loading,
    NewNames: state.main.NewNames
})
const mapDispatchToProps = ({
    fetchName, setModalMessage, setSelectedName, resetFilter, setFilter,setFilterID
})

const $ArtCodePartner = (props) => {
    const cleanName = () => {
        props.resetFilter()
        inputName.current.value = ''
        inputProducer.current.value = ''
    }
    const selectName = (index, post) => {
        props.setSelectedName(index, post)
    }
    const filterInfo = () => {
        if (inputName.current.value.length < 3) {
            props.resetFilter()
        }
        if(inputName.current.value.length > 3)
            props.setFilter(inputName.current.value)

        if(inputProducer.current.value.length)
            props.setFilterID(inputProducer.current.value)
    }
    const inputName = useRef(null)
    const inputProducer = useRef(null)
    return (
        <div className='wrapper_partner_art'>
            <ModalMessage/>
            {props.loading ? <Loader/> : null}
            <div className='wrapper_check_art wrapper_name'>
                <h4 className='wrapper_title_title'>Выберите наименование</h4>
                <input placeholder='название препарата'
                       type='text'
                       ref={inputName}
                       onChange={filterInfo}
                       className='input_art_code'/>
                <input placeholder='ID партнера'
                       type='number'
                       ref={inputProducer}
                       onChange={filterInfo}
                       className='input_art_code'/>
                <button className='nice_button' onClick={cleanName}>Очистить</button>
            </div>
            <div className='table_wrapper'>
                <table className='table table_name'>
                    <thead>
                    <tr>
                        <th className='textCenter'>ID</th>
                        <th className='table_art_producer_title'>Название</th>
                        <th className='check_small_midl'>Производитель</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.NewNames && props.NewNames.map((post, index) => {
                        let className = ''
                        if(post.isSelectedName){
                            className = "selectedRow"
                        }
                        if(post.noForSelectName){
                            className = "noSelectedRow"
                        }
                            if (post.isFilter && post.isFilterProduct) {
                                return (
                                    <tr key={index}
                                        className={className}
                                        onDoubleClick={(e) => selectName(index, post)}>
                                        <td className='textCenter'>{post.partner_ID}</td>
                                        <td className='table_art_name'>{post.nameSKU}</td>
                                        <td className='check_product_midl'>{post.producer}</td>
                                    </tr>
                                )
                            } else {return null}
                        }
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ArtCodePartner = connect(mapStateToProps, mapDispatchToProps)($ArtCodePartner)

export default ArtCodePartner;