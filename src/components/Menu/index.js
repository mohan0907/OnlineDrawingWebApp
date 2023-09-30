import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import style from './index.module.css'
import { MENU_ITEMS } from '../constant'
import { menuItemClick, actionItemClick } from '@/slice/menuSlice'

const Menu = () => {
    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItems);
    const handleMenuClick = (itemMenu) => {
        dispatch(menuItemClick(itemMenu))
    }

    return (
        <div className={style.menuContainer}>
            <div className={cx(style.iconWrapper,{[style.active]: activeMenuItem === MENU_ITEMS.PENCIL})} onClick={()=> handleMenuClick(MENU_ITEMS.PENCIL)}>
                <FontAwesomeIcon icon={faPencil} className={style.icon} />
            </div>
            <div className={cx(style.iconWrapper,{[style.active]: activeMenuItem === MENU_ITEMS.ERASER})} onClick={()=> handleMenuClick(MENU_ITEMS.ERASER)}>
                <FontAwesomeIcon icon={faEraser} className={style.icon} />
            </div>
            <div className={style.iconWrapper}>
                <FontAwesomeIcon icon={faRotateLeft} className={style.icon}  />
            </div>
            <div className={style.iconWrapper}>
                <FontAwesomeIcon icon={faRotateRight} className={style.icon}  />
            </div>
            <div className={style.iconWrapper}>
                <FontAwesomeIcon icon={faFileArrowDown} />
            </div>
        </div>
    )
}
export default Menu;