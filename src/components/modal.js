import React from "react";
import '../style/modal.css'
import {setModalMessage} from "../redux/action";
import {connect} from "react-redux";


const mapStateToProps = (state) => ({
    modalMessage: state.main.modalMessage,
})
const mapDispatchToProps = ({
    setModalMessage
})
const $Modale = (props) =>{

    return(
        <div className={props.modalPage ? 'services active' : 'services'}
             onMouseDown={props.closeModal}>
            <div className={props.modalPage ? 'services_content active' : 'services_content'}
                 onMouseDown={e => e.stopPropagation()}>
                <div className='services_text'>
                    <div>
                        <p>{props.selectArt?.Name}</p>
                        <hr/>
                        <p>{props.selectName?.nameSKU}</p>
                        <hr/>
                    </div>
                    <button className='nice_button'>Подтвердить</button>
                </div>
            </div>
        </div>
    )
}

const Modale = connect(mapStateToProps, mapDispatchToProps)($Modale)

export default Modale