import Axios from 'axios'
import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {auth} from "../_actions/user_action"

export default function (SpecificComponent,option,adminRoute=null){


    // null      =   아무나 출입 가능
    // true      =   로그인 출입 가능
    // false     =   로그인 출입 불가능
    function AuthenticationCheck(props){
        const dispatch = useDispatch()
        useEffect(() => {
            dispatch(auth()).then(response => {
                //로그인 x
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push("/login")
                    }
                //로그인 o
                }else{
                    if(adminRoute && response.payload.isAdmin){
                        props.history.push("/")
                    }else{
                        if(option===false){
                            props.history.push("/")
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent {...props}/>
        )
    }

    return AuthenticationCheck
}