import { useEffect, useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MENU_ITEMS } from '../constant';
import { actionItemClick } from '@/slice/menuSlice'
import { socket } from '../socket';

const Board = () => {
    const dispatch = useDispatch()
    const canvasRef = useRef(null);
    const shouldDraw = useRef(false);
    const drawHistory = useRef([]);
    const historyPointer = useRef(0);
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
        } else if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
            if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1
            if (historyPointer.current < drawHistory.current.length -1 &&  actionMenuItem === MENU_ITEMS.REDO ) historyPointer.current += 1
            const imageData = drawHistory.current[historyPointer.current]
            context.putImageData(imageData,0,0)
        } else {
            
        }
        dispatch(actionItemClick(null))
    },[actionMenuItem, dispatch])
    
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const changeConfig = (color,size) => {
            context.strokeStyle = color;
            context.lineWidth = size;
        }
       
        const handleChangeConfig = (config) => {
            changeConfig(config.size, config.color)
        }
        
        changeConfig(color,size)
        socket.on('changeConfig', handleChangeConfig)

        return () => {
            socket.off('changeConfig', handleChangeConfig)
        }
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
            socket.emit('beginPath', {x: e.clientX, y: e.clientY})
        }
        const handleMouseMove = (e) => {
            if (!shouldDraw.current) return;
            drawLine(e.clientX, e.clientY);
            socket.emit('drawline', {x: e.clientX, y: e.clientY})

        }
        const handleBeginPath = (path) => {
            beginPath(path.x, path.y)
        }
        const handleDrawLine = (line) => {
            drawLine(line.x, line.y)
        }
        const handleMouseUp = (e) => {
            shouldDraw.current = false;
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            drawHistory.current.push(imageData);
            historyPointer.current = drawHistory.current.length - 1;
        }
        // first time create path
        // context.beginPath();
        // context.moveTo(0, 0);
        // context.lineTo(100, 100);
        // context.stroke()
        socket.on('beginPath', handleBeginPath);
        socket.on('drawline', handleDrawLine);

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseDown);

            socket.off('begin', handleBeginPath);
            socket.off('drawline', handleDrawLine);
        }
    }, [])

    return (
        <>
            <canvas ref={canvasRef}></canvas>
        </>
    )
}
export default Board;



