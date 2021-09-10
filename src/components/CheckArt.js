import React from 'react';
import useInput from "./hooks/useInput";
import {fetchArt, setModalMessage, setSelectedArt} from "../redux/action";
import {connect} from "react-redux";
import ModalMessage from "./modalMessage";
import Loader from "./Loader";

const mapStateToProps = (state) => ({
    loading: state.main.loading,
    newArts: state.main.newArts
})
const mapDispatchToProps = ({
    fetchArt, setModalMessage, setSelectedArt
})

const $CheckArt = (props) => {
    const inputName = useInput('')
    const inputArt = useInput('')
    const inputProducer = useInput('')
    const checkedArt = () => {
        if(inputName.value.length === 0 && inputArt.value.length === 0){
            return props.setModalMessage('нет данных для поиска')
        }
        if(!inputArt.value && inputName.value && inputName.value.length<4){
            return props.setModalMessage('введите название больше 3-х символов')
        }
        props.fetchArt({
            ArtCode: inputArt.value,
            Name: inputName.value,
            Producer: inputProducer.value
        })
    }
    const cleanArt = () => {
        inputArt.onChange({target: {value: ''}})
        inputName.onChange({target: {value: ''}})
        inputProducer.onChange({target: {value: ''}})
    }
    const selectArt = (index, post) => {
        props.setSelectedArt(index, post)
    }

    return (
        <div className='wrapper_check_art'>
            <ModalMessage/>
            {props.loading ? <Loader/> : null}
            <div className='wrapper_check_art'>
                <h4 className='wrapper_title_title'>Выберите арткод и наименование</h4>
                <input placeholder='    арткод'
                       type='number'
                       {...inputArt}
                       className='input_art_code'/>
                <input placeholder='    наименование'
                       type='text'
                       {...inputName}
                       className='input_art_code'/>
                {/*<input placeholder='    партнер'*/}
                {/*       type='text'*/}
                {/*       {...inputProducer}*/}
                {/*       className='input_art_code'/>*/}
                <div>
                    <button className='nice_button'
                            onClick={checkedArt}
                    >Получить
                    </button>
                    <button className='nice_button'
                            onClick={cleanArt}
                    >Очистить
                    </button>
                </div>
            </div>
            <div className='table_wrapper'>
                <table className='table'>
                    <thead>
                    <tr>
                        <th className='table_art_name'>Арткод</th>
                        <th className='table_art_producer_title'>Название</th>
                        <th className='table_art_prod_last'>Производитель</th>
                    </tr>
                    </thead>
                    <tbody >
                    {props.newArts && props.newArts.map((post, index) => {
                            return (
                                <tr key={index} className={post.isSelectedArt ? "selectedRow" : 'nonSelectedRow'}
                                    onDoubleClick={(e) => selectArt(index, post)}>
                                    <td className='textCentr'>{post.Artcode}</td>
                                    <td className='table_art_prod_last'>{post.Name}</td>
                                    <td className="table_art_prod_last">{post.Producer}</td>
                                </tr>
                            )
                        }
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CheckArt = connect(mapStateToProps, mapDispatchToProps)($CheckArt)

export default CheckArt;