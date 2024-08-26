import React from "react";
// @ts-ignore
import errorImage from '../assets/images/error.png';
import {Button} from "antd";

const ErrorPage = () => {
    return (
        <div style={{
            background: '#7695FF',
            width: '100%',
            height: '100vh',
            paddingTop: '10px',
            display: 'flex',
        }}>
            <div style={{
                boxShadow: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px`,
                margin: 'auto',
                width: '50%',
                height: '50vh',
                background: '#9DBDFF',
                display: 'flex',
                flexDirection: 'row',
                borderRadius: '15px',
            }}>
                <div>
                    <img src={errorImage} style={{
                        width: '100%',
                        height: '50vh',
                        borderRadius: '15px'
                    }}
                     alt='error'/>
                </div>
                <div
                    style={{
                        width: '62%',
                        margin: 'auto 20px',
                        padding: '10px',
                        textAlign: 'center'
                    }}
                >
                    <h2>Oops! Something went wrong. Please try again later.</h2>
                    <a href='/' style={{
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        color: 'black',
                    }}>Go back home</a>
                </div>

            </div>
        </div>
    );
};

export default ErrorPage;