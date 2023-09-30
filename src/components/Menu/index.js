import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import style from './index.module.css'

const Menu = () => {
    return (
        <div className={style.menuContainer}>
            <div className={style.iconWrapper}>
                <FontAwesomeIcon icon={faPencil} />
            </div>
            <div className={style.iconWrapper}>
                <FontAwesomeIcon icon={faEraser} />
            </div>
            <div className={style.iconWrapper}>
                <FontAwesomeIcon icon={faRotateLeft} />
            </div>
            <div className={style.iconWrapper}>
                <FontAwesomeIcon icon={faRotateRight} />
            </div>
            <div className={style.iconWrapper}>
                <FontAwesomeIcon icon={faFileArrowDown} />
            </div>
        </div>
    )
}
export default Menu;