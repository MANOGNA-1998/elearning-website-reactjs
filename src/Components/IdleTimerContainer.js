import IdleTimer from 'react-idle-timer'
import React,{ useRef, useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function IdleTimerContainer() {
    const[isLoggedIn, setisLoggedIn]= useState(true)
    const [modalIsOpen,setModalIsOpen]= useState(false)
    const idleTimerRef= useRef(null)
    const sessionTimeoutRef= useRef(null)
    const onIdle=()=>{
        console.log('user is idle')
        setModalIsOpen(true)
        sessionTimeoutRef.current=setTimeout(logOut,5000)
    }

    const stayActive=()=>{
        setModalIsOpen(false)
        clearTimeout(sessionTimeoutRef.current)
        console.log('user is active')

    }
    const logOut=()=>{
        setModalIsOpen(false)
        setisLoggedIn(false)
        clearTimeout(sessionTimeoutRef.current)
        console.log('user has logged out' )
    }
    return (
        

        <div>
            {
                isLoggedIn? <h2>Hello username</h2>: <h2>hello guest</h2> 
            }
            <Modal isOpen={modalIsOpen}> 
                <h2>'you've been idle for a while!'</h2>
                <p>'you'll be logged out soon'</p>
                <div>
                    <button onClick={logOut}> log me out</button>
                    <button onClick={stayActive}> keep me signed in</button>
                </div>

            </Modal>

            <IdleTimer 
            ref={idleTimerRef}
            timeout={5*1000}
            onIdle={onIdle}></IdleTimer>
        
        </div>
    )
}

export default IdleTimerContainer
