import { useEffect, useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MENU_ITEMS } from '../constant';
import { actionItemClick } from '@/slice/menuSlice'

const Board = () => {
    const dispatch = useDispatch()
    const canvasRef = useRef(null);
    const shouldDraw = useRef(false);
    const { actionMenuItem, activeMenuItem }= useSelector((state) => state.menu);
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem])

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
            const URL = canvas.toDataURL()
            const anchor = document.createElement('a')
            anchor.href = URL
            anchor.download = 'sketch.jpg'
            anchor.click();
            console.log(URL);
        }
        dispatch(actionItemClick(null))
    },[actionMenuItem, dispatch])
    
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const changeConfig = () => {
            context.strokeStyle = color;
            context.lineWidth = size;
        }
        changeConfig()
    }, [color, size])
    // before brower pain
    useLayoutEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        // when mounting 
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const beginPath = (x, y) => {
            context.beginPath();
            context.moveTo(x, y);
        }
        
        const drawLine = (x, y) => {
            context.lineTo(x, y)
            context.stroke()
        }
        const handleMouseDown = (e) => {
            shouldDraw.current = true;
            beginPath(e.clientX, e.clientY);
        }
        const handleMouseMove = (e) => {
            if (!shouldDraw.current) return;
            drawLine(e.clientX, e.clientY);

        }
        const handleMouseUp = (e) => {
            shouldDraw.current = false;

        }
        // first time create path
        // context.beginPath();
        // context.moveTo(0, 0);
        // context.lineTo(100, 100);
        // context.stroke()

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseDown);

        }
    }, [])

    return (
        <>
            <canvas ref={canvasRef}></canvas>
        </>
    )
}
export default Board;



