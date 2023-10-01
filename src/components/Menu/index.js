import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import style from './index.module.css'
import { MENU_ITEMS } from '../constant'
import { menuItemClick, actionItemClick } from '@/slice/menuSlice'

const Menu = () => {
    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const handleMenuClick = (itemMenu) => {
        dispatch(menuItemClick(itemMenu))
    }
    
    const handleActionItemClick = (itemName) => {
        dispatch(actionItemClick(itemName))
    }

    return (
        <div className={style.menuContainer}>
            <div className={cx(style.iconWrapper,{[style.active]: activeMenuItem === MENU_ITEMS.PENCIL})} onClick={()=> handleMenuClick(MENU_ITEMS.PENCIL)}>
                <FontAwesomeIcon icon={faPencil} className={style.icon} />
            </div>
            <div className={cx(style.iconWrapper,{[style.active]: activeMenuItem === MENU_ITEMS.ERASER})} onClick={()=> handleMenuClick(MENU_ITEMS.ERASER)}>
                <FontAwesomeIcon icon={faEraser} className={style.icon} />
            </div>
            <div className={style.iconWrapper} onClick={()=> handleActionItemClick(MENU_ITEMS.UNDO)} >
                <FontAwesomeIcon icon={faRotateLeft} className={style.icon}  />
            </div>
            <div className={style.iconWrapper} onClick={()=> handleActionItemClick(MENU_ITEMS.REDO)}  >
                <FontAwesomeIcon icon={faRotateRight} className={style.icon}  />
            </div>
            <div className={style.iconWrapper} onClick={()=> handleActionItemClick(MENU_ITEMS.DOWNLOAD)}>
                <FontAwesomeIcon icon={faFileArrowDown} />
            </div>
        </div>
    )
}
export default Menu;